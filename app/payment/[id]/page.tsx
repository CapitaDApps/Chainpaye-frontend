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
import { usePaymentVerification } from "@/hooks/usePaymentVerification";

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
      redirectUrl?: string; // For card payments
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
  const params = useParams();
  const paymentId = params?.id as string;

  // Payment verification hook
  const { data: verificationData, error: verificationError, isSuccess } = usePaymentVerification(
    isVerifying && paymentData ? {
      currency: paymentData.currency,
      txid: paymentData.paymentInitialization.toronetResponse.txid,
      paymenttype: paymentData.paymentType
    } : null,
    isVerifying
  );

  // Debug logging
  useEffect(() => {
    if (isVerifying) {
      console.log('Verification status:', {
        isVerifying,
        verificationData,
        verificationError,
        isSuccess,
        paymentData: paymentData ? {
          currency: paymentData.currency,
          txid: paymentData.paymentInitialization.toronetResponse.txid,
          paymentType: paymentData.paymentType
        } : null
      });
    }
  }, [isVerifying, verificationData, verificationError, isSuccess, paymentData]);

  // Handle successful payment verification
  useEffect(() => {
    if (isSuccess && isVerifying) {
      console.log("Payment verification successful:", verificationData);
      setIsVerifying(false);
      
      // Clear timeout
      if (verificationTimeout) {
        clearTimeout(verificationTimeout);
        setVerificationTimeout(null);
      }
      
      // Save transaction result to backend
      saveTransactionResult();
      
      setStep("success");
    }
  }, [isSuccess, isVerifying, verificationData, verificationTimeout]);

  // Handle verification errors
  useEffect(() => {
    if (verificationError && isVerifying) {
      console.error("Payment verification error:", verificationError);
      // Continue polling for now, but you might want to add a timeout
    }
  }, [verificationError, isVerifying]);

  const saveTransactionResult = async () => {
    try {
      const response = await fetch(`/api/v1/payment-links/${paymentId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verificationData,
          paymentData,
          selectedMethod,
        }),
      });

      if (!response.ok) {
        console.error('Failed to save transaction result');
      } else {
        console.log('Transaction result saved successfully');
      }
    } catch (error) {
      console.error('Error saving transaction result:', error);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (verificationTimeout) {
        clearTimeout(verificationTimeout);
      }
    };
  }, [verificationTimeout]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!paymentId) {
        setError("Payment ID is required");
        setStep("error");
        return;
      }

      try {
        console.log("Fetching payment data for ID:", paymentId);
        const response = await fetch(`/api/v1/payment-links/${paymentId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response error:", errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log("API Response:", result);
        
        if (result.success) {
          console.log("Payment data received:", result.data);
          console.log("Currency:", result.data.currency);
          console.log("Payment Type:", result.data.paymentType);
          console.log("Token:", result.data.token);
          setPaymentData(result.data);
          setStep("method");
        } else {
          throw new Error(result.message || "Payment link is invalid");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setStep("error");
      }
    };

    fetchPaymentData();
  }, [paymentId]);

  const handlePay = () => {
    console.log("handlePay called with:", { selectedMethod, paymentData });
    
    if (selectedMethod === "bank") {
      setStep("bank-details");
    } else if (selectedMethod === "card") {
      // Get redirect URL from payment data
      const redirectUrl = paymentData?.redirectUrl || 
                         paymentData?.paymentInitialization?.toronetResponse?.redirectUrl;
      
      console.log("Card payment redirect URL:", redirectUrl);
      
      if (redirectUrl) {
        console.log("Redirecting to card payment provider:", redirectUrl);
        // Redirect to external card payment provider
        window.location.href = redirectUrl;
      } else {
        // Fallback if no redirect URL is provided
        console.error("No redirect URL found for card payment");
        alert("Card payment redirect URL not available. Please contact support.");
      }
    }
  };

  const handleBankTransferSent = () => {
    console.log("Starting payment verification...");
    setStep("confirming");
    setIsVerifying(true);
    
    // Set a timeout to stop verification after 5 minutes
    const timeout = setTimeout(() => {
      console.log("Payment verification timeout reached");
      setIsVerifying(false);
      setError("Payment verification timed out. Please contact support if your payment was successful.");
      setStep("error");
    }, 15 * 60 * 1000); // 15 minutes
    
    setVerificationTimeout(timeout);
  };

  const handleBack = () => {
    if (step === "bank-details") setStep("method");
  };

  // Loading state
  if (step === "loading") {
    return (
      <PaymentLayout step="method" onBack={handleBack} paymentData={null}>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </PaymentLayout>
    );
  }

  // Error state
  if (step === "error") {
    return (
      <PaymentLayout step="method" onBack={handleBack} paymentData={null}>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-red-500 text-center">
            <h3 className="text-lg font-semibold mb-2">Payment Link Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </PaymentLayout>
    );
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

  // Auto-select payment method if only one is available
  useEffect(() => {
    if (paymentData && !selectedMethod) {
      const availableCount = Object.values(availableMethods).filter(Boolean).length;
      if (availableCount === 1) {
        if (availableMethods.card) {
          setSelectedMethod("card");
        } else if (availableMethods.bank) {
          setSelectedMethod("bank");
        }
      }
    }
  }, [paymentData, availableMethods, selectedMethod]);

  return (
    <PaymentLayout step={step} onBack={handleBack} paymentData={paymentData}>
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
          amount={`${paymentData.currency} ${paymentData.amount}`}
          refNumber={paymentData.transactionId}
          date={new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
          method={selectedMethod === "card" ? "Card Payment" : "Bank Transfer"}
          senderName="User" // You might want to get this from user context
        />
      )}
    </PaymentLayout>
  );
}
