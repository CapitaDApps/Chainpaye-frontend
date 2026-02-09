"use client";

import { useState, useEffect } from "react";
import { PaymentLayout } from "@/components/v2/payment/payment-layout";
import { MethodSelection } from "@/components/v2/payment/method-selection";
import { BankTransfer } from "@/components/v2/payment/bank-transfer";
import {
  Confirmation,
  SuccessReceipt,
} from "@/components/v2/payment/confirmation-success";
import { useParams } from "next/navigation";
import { usePaymentVerification } from "@/lib/hooks/usePaymentVerification";
import { PaymentSkeleton } from "@/components/ui/skeleton";
import { PaymentProgress } from "@/components/ui/progress-indicator";
import { fetchWithRetry, handleApiError, trackEvent, reportError, createSession, validateSession, clearSession } from "@/lib/utils/api";
import { validateSenderInfo, sanitizeName, sanitizePhoneNumber, ValidationError } from "@/lib/utils/validation";
import { paymentCache, cachedFetch, CACHE_KEYS } from "@/lib/utils/cache";
import { performanceMonitor, measureAsync } from "@/lib/utils/performance";
import { registerServiceWorker, setupOnlineOfflineListeners, isOnline } from "@/lib/utils/service-worker";

interface PaymentData {
  id: string;
  name: string;
  amount: string;
  currency: string;
  selectedCurrency: string;
  description: string;
  address: string;
  token: string;
  paymentType: string;
  successUrl: string;
  redirectUrl?: string; // For card payments
  toronetReference: string;
  transactionId: string;
  paymentInitialization: {
    id: string;
    status: string;
    toronetResponse: {
      result: boolean;
      txid: string;
      bankname?: string; // For NGN payments
      accountnumber?: string; // For NGN payments
      accountname?: string; // For NGN payments
      newwallet?: boolean; // For NGN payments
      amount?: number; // For NGN payments
      instruction: string; // For both NGN and USD payments
      url?: string; // For card payments
    };
  };
}

export default function PaymentPage() {
  const [step, setStep] = useState<
    "method" | "bank-details" | "confirming" | "success" | "loading" | "error"
  >("loading");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | null>(
    null
  );
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationTimeout, setVerificationTimeout] = useState<NodeJS.Timeout | null>(null);
  const [senderName, setSenderName] = useState<string>("");
  const [senderPhone, setSenderPhone] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isOffline, setIsOffline] = useState(false);
  const params = useParams();
  const paymentId = params?.id as string;

  // Initialize session, performance monitoring, and service worker
  useEffect(() => {
    if (paymentId) {
      // Register service worker
      registerServiceWorker();
      
      // Setup online/offline listeners
      const cleanup = setupOnlineOfflineListeners(
        () => setIsOffline(false),
        () => setIsOffline(true)
      );
      
      // Check initial online status
      setIsOffline(!isOnline());
      
      // Create or validate session
      if (!validateSession(paymentId)) {
        const newSessionId = createSession(paymentId);
        setSessionId(newSessionId);
      }

      // Track page view
      trackEvent('payment_page_view', {
        paymentId,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        isOnline: isOnline()
      });

      // Start performance monitoring
      performanceMonitor.startTiming('payment_page_load', { paymentId });
      
      return cleanup;
    }

    return () => {
      performanceMonitor.endTiming('payment_page_load');
    };
  }, [paymentId]);

  // Payment verification hook - must be called before early returns
  // Use safe access to avoid errors when paymentData is null
  const verificationParams = isVerifying && paymentData?.paymentInitialization?.toronetResponse ? {
    currency: paymentData.currency,
    txid: paymentData.paymentInitialization.toronetResponse.txid,
    paymenttype: paymentData.paymentType
  } : null;
  
  const { data: verificationData, error: verificationError, isSuccess } = usePaymentVerification(
    verificationParams,
    isVerifying
  );

  // Fetch payment data on mount - must be before early returns
  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!paymentId) {
        setError("Payment ID is required");
        setStep("error");
        trackEvent('payment_error', { error: 'missing_payment_id' });
        return;
      }

      try {
        console.log("Fetching payment data for ID:", paymentId);
        
        // Try to get from cache first
        const cacheKey = CACHE_KEYS.PAYMENT_DATA(paymentId);
        const cachedData = paymentCache.get<PaymentData>(cacheKey);
        
        if (cachedData) {
          console.log("Using cached payment data");
          setPaymentData(cachedData);
          setStep("method");
          trackEvent('payment_data_cached', { paymentId });
          return;
        }

        // Fetch with performance monitoring
        const data = await measureAsync('fetch_payment_data', async () => {
          const response = await fetchWithRetry(`/api/v1/payment-links/${paymentId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }, 3);

          console.log("Response status:", response.status);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Response error:", errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
          }

          const result = await response.json();
          console.log("API Response:", result);
          
          if (result.success) {
            return result.data;
          } else {
            // Handle API configuration errors
            if (result.message?.includes('API configuration error')) {
              throw new Error(`Configuration Error: ${result.message}. Please contact support.`);
            }
            // Log debug info if available
            if (result.debug) {
              console.error("API Debug Info:", result.debug);
            }
            throw new Error(result.message || "Payment link is invalid");
          }
        }, { paymentId });

        console.log("Payment data received:", data);
        
        // Cache the data
        paymentCache.set(cacheKey, data, 5 * 60 * 1000); // Cache for 5 minutes
        
        setPaymentData(data);
        setStep("method");
        
        trackEvent('payment_data_loaded', {
          paymentId,
          currency: data.currency,
          amount: data.amount,
          paymentType: data.paymentType
        });
        
      } catch (err) {
        console.error("Fetch error:", err);
        const errorMessage = handleApiError(err, 'payment data fetch');
        setError(errorMessage);
        setStep("error");
        
        // Report error
        reportError(err as Error, {
          context: 'payment_data_fetch',
          paymentId,
          timestamp: Date.now()
        });
        
        trackEvent('payment_error', {
          error: 'fetch_failed',
          paymentId,
          message: errorMessage
        });
      }
    };

    fetchPaymentData();
  }, [paymentId]);

  // Debug logging - must be before early returns
  useEffect(() => {
    if (isVerifying) {
      console.log('Verification status:', {
        isVerifying,
        verificationData,
        verificationError,
        isSuccess,
        paymentData: paymentData ? {
          currency: paymentData.currency,
          txid: paymentData.paymentInitialization?.toronetResponse?.txid,
          paymentType: paymentData.paymentType
        } : null
      });
    }
  }, [isVerifying, verificationData, verificationError, isSuccess, paymentData]);

  // Handle successful payment verification - must be before early returns
  useEffect(() => {
    if (isSuccess && isVerifying) {
      console.log("Payment verification successful:", verificationData);
      handlePaymentSuccess();
    }
  }, [isSuccess, isVerifying, verificationData]);

  // Handle verification errors - must be before early returns
  useEffect(() => {
    if (verificationError && isVerifying) {
      console.error("Payment verification error:", verificationError);
      // Continue polling - errors are handled in the fetcher
    }
  }, [verificationError, isVerifying]);

  // Cleanup timeout on unmount - must be before early returns
  useEffect(() => {
    return () => {
      if (verificationTimeout) {
        clearTimeout(verificationTimeout);
      }
      
      // Clear session on unmount (optional - you might want to keep it)
      if (paymentId && step === "success") {
        clearSession(paymentId);
      }
      
      // Disconnect performance monitoring
      performanceMonitor.endTiming('payment_page_session');
    };
  }, [verificationTimeout, paymentId, step]);

  // Auto-select payment method if only one is available - must be before early returns
  useEffect(() => {
    if (paymentData && !selectedMethod) {
      // Determine available payment methods
      const isNGN = paymentData?.currency === "NGN";
      const isUSDBank = paymentData?.currency === "USD" && paymentData?.paymentType === "bank" && paymentData?.token === "USD";
      const isCardPayment = paymentData?.paymentType === "card" && paymentData?.token && 
        ["GBP", "EUR", "USD"].includes(paymentData?.currency || "");
      
      const availableMethods = {
        card: !isNGN && !isUSDBank,
        bank: !isCardPayment,
      };

      const availableCount = Object.values(availableMethods).filter(Boolean).length;
      if (availableCount === 1) {
        if (availableMethods.card) {
          setSelectedMethod("card");
        } else if (availableMethods.bank) {
          setSelectedMethod("bank");
        }
      }
    }
  }, [paymentData, selectedMethod]);

  // Define functions before early returns
  const handlePaymentSuccess = async () => {
    console.log("Processing payment success");
    setIsVerifying(false);
    
    trackEvent('payment_verification_success', {
      paymentId,
      currency: paymentData?.currency,
      amount: paymentData?.amount,
      verificationData
    });
    
    // Clear timeout
    if (verificationTimeout) {
      clearTimeout(verificationTimeout);
      setVerificationTimeout(null);
    }
    
    // Save transaction result to backend
    await saveTransactionResult();
    
    setStep("success");
  };

  const handlePay = () => {
    console.log("handlePay called with:", { selectedMethod, paymentData });
    
    trackEvent('payment_method_selected', {
      method: selectedMethod,
      paymentId,
      currency: paymentData?.currency,
      amount: paymentData?.amount
    });
    
    if (selectedMethod === "bank") {
      setStep("bank-details");
    } else if (selectedMethod === "card") {
      // Get redirect URL from payment data
      const redirectUrl = paymentData?.redirectUrl || 
                         paymentData?.paymentInitialization?.toronetResponse?.url;
      
      console.log("Card payment redirect URL:", redirectUrl);
      console.log("Payment data for debugging:", {
        redirectUrl: paymentData?.redirectUrl,
        toronetUrl: paymentData?.paymentInitialization?.toronetResponse?.url,
        fullToronetResponse: paymentData?.paymentInitialization?.toronetResponse
      });
      
      if (redirectUrl) {
        console.log("Redirecting to card payment provider:", redirectUrl);
        trackEvent('card_payment_redirect', {
          paymentId,
          redirectUrl,
          currency: paymentData?.currency
        });
        // Redirect to external card payment provider
        window.location.href = redirectUrl;
      } else {
        // Fallback if no redirect URL is provided
        console.error("No redirect URL found for card payment");
        console.error("Available payment data:", paymentData);
        const errorMsg = "Card payment redirect URL not available. Please contact support.";
        reportError(new Error(errorMsg), {
          context: 'card_payment_redirect',
          paymentId,
          paymentData
        });
        alert(errorMsg);
      }
    }
  };

  const handleBankTransferSent = () => {
    // Validate sender information
    const errors = validateSenderInfo(senderName, senderPhone);
    if (errors.length > 0) {
      setValidationErrors(errors);
      trackEvent('validation_error', {
        paymentId,
        errors: errors.map(e => e.field)
      });
      return;
    }
    
    // Clear any previous validation errors
    setValidationErrors([]);
    
    console.log("Starting payment verification...");
    trackEvent('payment_verification_started', {
      paymentId,
      currency: paymentData?.currency,
      txid: paymentData?.paymentInitialization?.toronetResponse?.txid
    });
    
    setStep("confirming");
    setIsVerifying(true);
    
    // Set a timeout to stop verification after 15 minutes
    const timeout = setTimeout(() => {
      console.log("Payment verification timeout reached");
      setIsVerifying(false);
      const errorMsg = "Payment verification timed out. Please contact support if your payment was successful.";
      setError(errorMsg);
      setStep("error");
      
      trackEvent('payment_verification_timeout', {
        paymentId,
        duration: 15 * 60 * 1000
      });
      
      reportError(new Error(errorMsg), {
        context: 'payment_verification_timeout',
        paymentId,
        duration: 15 * 60 * 1000
      });
    }, 15 * 60 * 1000); // 15 minutes
    
    setVerificationTimeout(timeout);
  };

  const handleSenderNameChange = (name: string) => {
    const sanitized = sanitizeName(name);
    setSenderName(sanitized);
    
    // Clear validation errors for this field
    setValidationErrors(prev => prev.filter(error => error.field !== 'name'));
  };

  const handleSenderPhoneChange = (phone: string) => {
    const sanitized = sanitizePhoneNumber(phone);
    setSenderPhone(sanitized);
    
    // Clear validation errors for this field
    setValidationErrors(prev => prev.filter(error => error.field !== 'phone'));
  };

  const handleBack = () => {
    if (step === "bank-details") setStep("method");
  };

  const saveTransactionResult = async () => {
    if (!paymentData) {
      console.error('No payment data available');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Saving transaction result...');
      
      const transactionData = {
        amount: paymentData.amount,
        currency: paymentData.currency,
        senderName: sanitizeName(senderName) || 'Anonymous',
        senderPhone: sanitizePhoneNumber(senderPhone) || '',
        paidAt: new Date().toISOString(),
      };
      
      const response = await measureAsync('save_transaction', async () => {
        return await fetchWithRetry(`/api/v1/record-transaction/${paymentData.transactionId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
            'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
          },
          body: JSON.stringify(transactionData),
        }, 2);
      }, { paymentId, transactionId: paymentData.transactionId });

      const result = await response.json();
      console.log('Transaction save response:', result);

      if (!response.ok) {
        // Check if it's an 'already recorded' error - treat as success
        if (result.message?.toLowerCase().includes('already recorded') || 
            result.error?.toLowerCase().includes('already recorded')) {
          console.log('Transaction already recorded, treating as success');
          
          trackEvent('transaction_already_recorded', {
            paymentId,
            transactionId: paymentData.transactionId
          });
          
          // Redirect to success URL
          if (paymentData.successUrl) {
            setTimeout(() => {
              window.location.href = paymentData.successUrl;
            }, 2000);
          }
          return;
        }
        
        console.error('Failed to save transaction result:', result);
        reportError(new Error(`Transaction save failed: ${result.message || result.error}`), {
          context: 'save_transaction',
          paymentId,
          transactionId: paymentData.transactionId,
          response: result
        });
        // Don't block the success flow, just log the error
      } else {
        console.log('Transaction result saved successfully');
        
        trackEvent('transaction_saved', {
          paymentId,
          transactionId: paymentData.transactionId,
          amount: paymentData.amount,
          currency: paymentData.currency
        });
        
        // Redirect to success URL after showing success page
        if (paymentData.successUrl) {
          setTimeout(() => {
            window.location.href = paymentData.successUrl;
          }, 3000); // Wait 3 seconds to show success page
        }
      }
    } catch (error) {
      console.error('Error saving transaction result:', error);
      reportError(error as Error, {
        context: 'save_transaction_error',
        paymentId,
        transactionId: paymentData?.transactionId
      });
      // Don't block the success flow, just log the error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state - early return after all hooks
  if (step === "loading") {
    return <PaymentSkeleton />;
  }

  // Error state - early return after all hooks  
  if (step === "error") {
    return <ErrorState error={error} onBack={() => window.location.reload()} />;
  }

  // Determine available payment methods based on currency and payment type
  const isNGN = paymentData?.currency === "NGN";
  const isUSDBank = paymentData?.currency === "USD" && paymentData?.paymentType === "bank" && paymentData?.token === "USD";
  const isCardPayment = paymentData?.paymentType === "card" && paymentData?.token && 
    ["GBP", "EUR", "USD"].includes(paymentData?.currency || "");
  
  console.log("Payment method logic:", {
    currency: paymentData?.currency,
    paymentType: paymentData?.paymentType,
    token: paymentData?.token,
    isNGN,
    isUSDBank,
    isCardPayment
  });
  
  const availableMethods = {
    card: !isNGN && !isUSDBank, // Card disabled for NGN or USD bank payments
    bank: !isCardPayment, // Bank transfer disabled for card payments (GBP/EUR/USD)
  };
  
  console.log("Available methods:", availableMethods);

  return (
    <PaymentLayout step={step} paymentData={paymentData}>
      {/* Offline Indicator */}
      {isOffline && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">
                You're currently offline. Some features may not work properly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator - only show for main flow steps */}
      {["method", "bank-details", "confirming", "success"].includes(step) && (
        <PaymentProgress step={step} />
      )}

      {step === "method" && paymentData && (
        <MethodSelection
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
          onPay={handlePay}
          paymentData={paymentData}
          availableMethods={availableMethods}
        />
      )}

      {step === "bank-details" && paymentData && (
        <BankTransfer
          onSent={handleBankTransferSent}
          onChangeMethod={() => setStep("method")}
          paymentData={paymentData}
          senderName={senderName}
          setSenderName={handleSenderNameChange}
          senderPhone={senderPhone}
          setSenderPhone={handleSenderPhoneChange}
          validationErrors={validationErrors}
          isSubmitting={isSubmitting}
        />
      )}

      {step === "confirming" && (
        <Confirmation 
          isVerifying={isVerifying}
          verificationError={verificationError}
        />
      )}

      {step === "success" && paymentData && (
        <SuccessReceipt
          amount={`${paymentData.currency} ${Number(paymentData.amount).toLocaleString()}`}
          refNumber={paymentData.transactionId}
          date={new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
          method={selectedMethod === "card" ? "Card Payment" : "Bank Transfer"}
          senderName={senderName || "User"}
        />
      )}
    </PaymentLayout>
  );
}

// Error state component
function ErrorState({ error, onBack }: { error: string; onBack: () => void }) {
  return (
    <PaymentLayout step="method" paymentData={null}>
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <h3 className="text-lg font-semibold mb-2">Payment Link Error</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    </PaymentLayout>
  );
}