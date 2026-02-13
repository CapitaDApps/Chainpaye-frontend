"use client";

import { useState, useEffect } from "react";
import { PaymentLayout } from "@/components/v2/payment/payment-layout";
import { MethodSelection } from "@/components/v2/payment/method-selection";
import { BankTransfer } from "@/components/v2/payment/bank-transfer";
import { SuccessReceipt } from "@/components/v2/payment/confirmation-success";
import { VerificationPending } from "@/components/v2/payment/verification-pending";
import { useParams } from "next/navigation";
import { PaymentSkeleton } from "@/components/ui/skeleton";
import { PaymentProgress } from "@/components/ui/progress-indicator";
import { fetchWithRetry, handleApiError, trackEvent, reportError, createSession, validateSession, clearSession } from "@/lib/utils/api";
import { validateSenderInfo, sanitizeName, sanitizePhoneNumber, sanitizeEmail, ValidationError } from "@/lib/utils/validation";
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
  reference?: string; // Transaction reference (TXN_XXX format)
  paymentInitialization: {
    id: string;
    status: string;
    toronetResponse: {
      result?: boolean;
      txid?: string;
      bankname?: string; // For NGN payments
      accountnumber?: string; // For NGN payments
      accountname?: string; // For NGN payments
      newwallet?: boolean; // For NGN payments
      amount?: number; // For NGN payments
      instruction?: string; // For both NGN and USD payments
      url?: string; // For card payments
      // For failed responses
      success?: boolean;
      error?: string;
      message?: string;
    };
  };
}

export default function PaymentPage() {
  const [step, setStep] = useState<
    "method" | "bank-details" | "verifying" | "success" | "loading" | "error"
  >("loading");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | null>(
    null
  );
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [senderPhone, setSenderPhone] = useState<string>("");
  const [senderEmail, setSenderEmail] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isOffline, setIsOffline] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const params = useParams();
  const paymentId = params?.id as string;

  // Handle success redirect with POST request
  const handleSuccessRedirect = async (paymentData: PaymentData, transactionData: { transactionId: string; senderName: string; senderPhone: string }) => {
    try {
      console.log('Posting to success endpoint:', paymentData.successUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout
      
      const response = await fetch(paymentData.successUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentLinkId: paymentId,
          transactionId: transactionData.transactionId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          senderName: transactionData.senderName,
          senderPhone: transactionData.senderPhone,
          paymentMethod: paymentData.paymentType,
          status: 'completed',
          paidAt: new Date().toISOString(),
          name: paymentData.name
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log('Success endpoint notified successfully');
      } else {
        console.error('Failed to notify success endpoint:', response.status);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Success endpoint request timed out after 8 seconds');
      } else {
        console.error('Error calling success endpoint:', error);
      }
    } finally {
      // Always redirect regardless of POST success/failure since payment was successful
      console.log('Redirecting to success page:', paymentData.successUrl);
      window.location.href = paymentData.successUrl;
    }
  };

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

  // Fetch payment data on mount - must be before early returns
  useEffect(() => {
    const fetchPaymentData = async (retryCount = 0) => {
      if (!paymentId) {
        setError("Payment ID is required");
        setStep("error");
        trackEvent('payment_error', { error: 'missing_payment_id' });
        return;
      }

      try {
        console.log("Fetching payment data for ID:", paymentId, retryCount > 0 ? `(retry ${retryCount})` : '');
        
        // Try to get from cache first (skip cache on retry)
        if (retryCount === 0) {
          const cacheKey = CACHE_KEYS.PAYMENT_DATA(paymentId);
          const cachedData = paymentCache.get<PaymentData>(cacheKey);
          
          if (cachedData) {
            console.log("Using cached payment data");
            setPaymentData(cachedData);
            setStep("method");
            trackEvent('payment_data_cached', { paymentId });
            return;
          }
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
            
            // Parse error response
            let errorData;
            try {
              errorData = JSON.parse(errorText);
            } catch {
              errorData = { message: errorText };
            }
            
            // Handle specific HTTP status codes
            if (response.status === 404) {
              throw new Error('Payment link not found. Please check the link and try again.');
            } else if (response.status === 410) {
              throw new Error('This payment link has expired. Please request a new one.');
            } else if (response.status === 400) {
              throw new Error(errorData.message || 'Invalid payment link. Please check the link and try again.');
            } else if (response.status === 500) {
              throw new Error('Server error. Please try again in a few moments.');
            } else if (response.status === 503) {
              throw new Error('Payment service is temporarily unavailable. Please try again later.');
            } else {
              throw new Error(errorData.message || `Unable to load payment link (Error ${response.status})`);
            }
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
        
        // Check if payment initialization failed
        if (data.paymentInitialization?.status === 'FAILED') {
          const errorMsg = data.paymentInitialization.toronetResponse?.message || 
                          data.paymentInitialization.toronetResponse?.error || 
                          'Payment initialization failed';
          
          console.error("Payment initialization failed:", data.paymentInitialization);
          
          // Check for specific SSL errors and provide helpful guidance
          if (errorMsg.includes('SSL') || errorMsg.includes('TLS') || errorMsg.includes('EPROTO')) {
            // Retry SSL errors up to 2 times with delay
            if (retryCount < 2) {
              console.log(`SSL error detected, retrying in ${(retryCount + 1) * 2} seconds...`);
              setTimeout(() => fetchPaymentData(retryCount + 1), (retryCount + 1) * 2000);
              return;
            }
            throw new Error(`SSL Connection Error: Unable to connect securely to payment processor. This is a temporary server issue. Please try again in a few minutes or contact support if the problem persists.`);
          } else if (errorMsg.includes('timeout') || errorMsg.includes('ETIMEDOUT')) {
            throw new Error(`Connection Timeout: The payment processor is taking too long to respond. Please try again in a few minutes.`);
          } else if (errorMsg.includes('ENOTFOUND') || errorMsg.includes('DNS')) {
            throw new Error(`Connection Error: Unable to reach payment processor. Please check your internet connection and try again.`);
          } else {
            throw new Error(`Payment Setup Error: ${errorMsg}. Please try creating a new payment link or contact support.`);
          }
        }
        
        // Cache the data
        const cacheKey = CACHE_KEYS.PAYMENT_DATA(paymentId);
        paymentCache.set(cacheKey, data, 5 * 60 * 1000); // Cache for 5 minutes
        
        setPaymentData(data);
        setStep("method");
        
        trackEvent('payment_data_loaded', {
          paymentId,
          currency: data.currency,
          amount: data.amount,
          paymentType: data.paymentType,
          initializationStatus: data.paymentInitialization?.status,
          retryCount
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
          timestamp: Date.now(),
          retryCount
        });
        
        trackEvent('payment_error', {
          error: 'fetch_failed',
          paymentId,
          message: errorMessage,
          retryCount
        });
      }
    };

    fetchPaymentData();
  }, [paymentId]);

  // Cleanup polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

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
      // Check if payment initialization was successful
      if (paymentData?.paymentInitialization?.status === 'FAILED') {
        const errorMsg = paymentData.paymentInitialization.toronetResponse?.message || 
                        paymentData.paymentInitialization.toronetResponse?.error || 
                        'Payment initialization failed';
        console.error("Cannot proceed with card payment - initialization failed:", errorMsg);
        alert(`Payment setup failed: ${errorMsg}. Please try creating a new payment link.`);
        return;
      }
      
      // Get redirect URL from payment data
      const redirectUrl = paymentData?.paymentInitialization?.toronetResponse?.url;
      
      console.log("Card payment redirect URL:", redirectUrl);
      console.log("Payment data for debugging:", {
        redirectUrl: paymentData?.redirectUrl,
        toronetUrl: paymentData?.paymentInitialization?.toronetResponse?.url,
        initializationStatus: paymentData?.paymentInitialization?.status,
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
        
        // Check if this is due to failed initialization
        if (paymentData?.paymentInitialization?.status === 'FAILED') {
          const errorMsg = "Payment setup failed. Please try creating a new payment link.";
          alert(errorMsg);
        } else {
          const errorMsg = "Card payment redirect URL not available. Please contact support.";
          reportError(new Error(errorMsg), {
            context: 'card_payment_redirect',
            paymentId,
            paymentData
          });
          alert(errorMsg);
        }
      }
    }
  };

  // Check transaction status (for polling)
  const checkTransactionStatus = async () => {
    if (!paymentData?.transactionId && !paymentData?.reference) return;
    
    const transactionRef = paymentData?.transactionId || paymentData?.reference;
    
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://chainpaye-backend.onrender.com';
      
      const response = await fetch(
        `${apiBaseUrl}/api/v1/transactions/${transactionRef}/status`,
        {
          method: 'GET',
          headers: {
            'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
            'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
          },
        }
      );
      
      if (!response.ok) {
        console.error('Failed to check transaction status');
        return;
      }
      
      const result = await response.json();
      console.log('Transaction status:', result);
      
      // If payment is confirmed, show success
      if (result.data?.state === 'PAID' || result.data?.state === 'COMPLETED') {
        console.log('Payment confirmed!');
        setIsPolling(false);
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
        setStep('success');
        
        trackEvent('payment_confirmed_via_polling', {
          paymentId,
          transactionId: paymentData.transactionId,
        });
      }
    } catch (error) {
      console.error('Error checking transaction status:', error);
    }
  };

  const handleBankTransferSent = async () => {
    // Validate sender information including email
    const errors = validateSenderInfo(senderName, senderPhone, senderEmail);
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
    setIsSubmitting(true);
    
    try {
      console.log("Submitting payment verification request...");
      console.log("Sender info:", {
        name: sanitizeName(senderName),
        phone: sanitizePhoneNumber(senderPhone),
        email: sanitizeEmail(senderEmail)
      });
      
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ;
      
      // Get transaction reference

      const transactionRef = paymentData?.transactionId || paymentData?.reference;
      
      if (!transactionRef) {
        throw new Error('Transaction reference not found');
      }
      console.log("payment data", paymentData)
      console.log('Using transaction reference:', transactionRef);
      
      const response = await fetchWithRetry(
        `${apiBaseUrl}/api/v1/transactions/${transactionRef}/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
            'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
          },
          body: JSON.stringify({
            senderName: sanitizeName(senderName),
            senderPhone: sanitizePhoneNumber(senderPhone),
            senderEmail: sanitizeEmail(senderEmail),
            currency: paymentData?.currency,
            txid: paymentData?.paymentInitialization?.toronetResponse?.txid,
            paymentType: paymentData?.paymentType,
            amount: paymentData?.amount,
            successUrl: paymentData?.successUrl,
            paymentLinkId: paymentId,
          }),
        },
        2
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit verification request');
      }
      
      const result = await response.json();
      console.log("Verification request submitted:", result);
      
      // Show verifying screen
      setStep("verifying");
      
      // START POLLING for status updates
      setIsPolling(true);
      
      // Check immediately
      checkTransactionStatus();
      
      // Then check every 5 seconds
      const interval = setInterval(checkTransactionStatus, 5000);
      setPollingInterval(interval);
      
      // Stop polling after 20 minutes (backend handles the rest)
      setTimeout(() => {
        setIsPolling(false);
        if (interval) {
          clearInterval(interval);
          setPollingInterval(null);
        }
        console.log('Stopped frontend polling after 20 minutes. Backend will continue verification.');
      }, 20 * 60 * 1000);
      
      trackEvent('verification_request_submitted', {
        paymentId,
        transactionId: paymentData?.transactionId,
        email: senderEmail,
      });
      
    } catch (error) {
      console.error("Error submitting verification:", error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to submit verification request';
      setError(errorMsg);
      setStep("error");
      
      reportError(error as Error, {
        context: 'submit_verification',
        paymentId,
        transactionId: paymentData?.transactionId,
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const handleSenderEmailChange = (email: string) => {
    const sanitized = sanitizeEmail(email);
    setSenderEmail(sanitized);
    
    // Clear validation errors for this field
    setValidationErrors(prev => prev.filter(error => error.field !== 'email'));
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
      
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://chainpaye-backend.onrender.com';
      
      const response = await measureAsync('save_transaction', async () => {
        return await fetchWithRetry(`${apiBaseUrl}/api/v1/record-transaction/${paymentData.transactionId}`, {
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
          
          // POST to success endpoint then redirect
          if (paymentData.successUrl) {
            setTimeout(async () => {
              await handleSuccessRedirect(paymentData, { 
                transactionId: paymentData.transactionId,
                senderName,
                senderPhone 
              });
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
        
        // POST to success endpoint then redirect
        if (paymentData.successUrl) {
          setTimeout(async () => {
            await handleSuccessRedirect(paymentData, { 
              transactionId: paymentData.transactionId,
              senderName,
              senderPhone 
            });
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
      {["method", "bank-details", "verifying", "success"].includes(step) && (
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
          senderEmail={senderEmail}
          setSenderEmail={handleSenderEmailChange}
          validationErrors={validationErrors}
          isSubmitting={isSubmitting}
        />
      )}

      {step === "verifying" && paymentData && (
        <VerificationPending
          email={senderEmail}
          transactionId={paymentData.transactionId}
          isPolling={isPolling}
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
  // Determine error type and customize message
  const getErrorDetails = (errorMessage: string) => {
    if (errorMessage.includes('404') || errorMessage.includes('not found') || errorMessage.includes('invalid')) {
      return {
        title: 'Payment Link Not Found',
        message: 'This payment link doesn\'t exist or has expired. Please check the link and try again, or contact the sender for a new payment link.',
        icon: '🔍',
        showRetry: false,
      };
    } else if (errorMessage.includes('expired')) {
      return {
        title: 'Payment Link Expired',
        message: 'This payment link has expired. Please contact the sender to request a new payment link.',
        icon: '⏰',
        showRetry: false,
      };
    } else if (errorMessage.includes('Network') || errorMessage.includes('connection') || errorMessage.includes('fetch')) {
      return {
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your internet connection and try again.',
        icon: '📡',
        showRetry: true,
      };
    } else if (errorMessage.includes('SSL') || errorMessage.includes('TLS') || errorMessage.includes('EPROTO')) {
      return {
        title: 'Connection Security Error',
        message: 'There\'s a temporary issue with the secure connection. Please try again in a few minutes.',
        icon: '🔒',
        showRetry: true,
      };
    } else if (errorMessage.includes('timeout') || errorMessage.includes('ETIMEDOUT')) {
      return {
        title: 'Request Timeout',
        message: 'The server is taking too long to respond. Please try again.',
        icon: '⏱️',
        showRetry: true,
      };
    } else if (errorMessage.includes('Configuration Error') || errorMessage.includes('API configuration')) {
      return {
        title: 'Service Configuration Error',
        message: 'There\'s a configuration issue with the payment service. Please contact support for assistance.',
        icon: '⚙️',
        showRetry: false,
      };
    } else if (errorMessage.includes('Payment Setup Error')) {
      return {
        title: 'Payment Setup Failed',
        message: 'Unable to initialize the payment. Please try creating a new payment link or contact support.',
        icon: '❌',
        showRetry: false,
      };
    } else {
      return {
        title: 'Something Went Wrong',
        message: errorMessage || 'An unexpected error occurred. Please try again or contact support if the problem persists.',
        icon: '⚠️',
        showRetry: true,
      };
    }
  };

  const errorDetails = getErrorDetails(error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">{errorDetails.icon}</span>
          </div>

          {/* Error Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {errorDetails.title}
          </h3>

          {/* Error Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            {errorDetails.message}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            {errorDetails.showRetry && (
              <button
                onClick={onBack}
                className="w-full py-3 px-6 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Try Again
              </button>
            )}
            
            <button
              onClick={() => window.history.back()}
              className="w-full py-3 px-6 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Go Back
            </button>
          </div>

          {/* Support Link */}
          <div className="mt-6 text-sm text-gray-500">
            Need help?{' '}
            <a 
              href="mailto:support@chainpaye.com" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
