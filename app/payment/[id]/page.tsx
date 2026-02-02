"use client";

import { useState } from "react";
import { PaymentLayout } from "@/components/v2/payment/payment-layout";
import { MethodSelection } from "@/components/v2/payment/method-selection";
import { BankTransfer } from "@/components/v2/payment/bank-transfer";
import {
  Confirmation,
  SuccessReceipt,
} from "@/components/v2/payment/confirmation-success";
import { useParams,} from "next/navigation";

export default function PaymentPage() {
  const [step, setStep] = useState<
    "method" | "bank-details" | "confirming" | "success"
  >("method");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | null>(
    null
  );
  const path = useParams()
  console.log(path?.id)
  const handlePay = () => {
    if (selectedMethod === "bank") {
      setStep("bank-details");
    } else if (selectedMethod === "card") {
      // Logic for Card Payment - redirects or opens external provider
      alert("Redirecting to Card Payment Provider...");
    }
  };

  const handleBankTransferSent = () => {
    setStep("confirming");
    // Simulate verification delay
    setTimeout(() => {
      setStep("success");
    }, 3000);
  };

  const handleBack = () => {
    if (step === "bank-details") setStep("method");
  };

  return (
    <PaymentLayout step={step} onBack={handleBack}>
      {step === "method" && (
        <MethodSelection
          selectedMethod={selectedMethod}
          onSelectMethod={setSelectedMethod}
          onPay={handlePay}
        />
      )}

      {step === "bank-details" && (
        <BankTransfer
          onSent={handleBankTransferSent}
          onChangeMethod={() => setStep("method")}
        />
      )}

      {step === "confirming" && <Confirmation />}

      {step === "success" && (
        <SuccessReceipt
          amount="$250"
          refNumber="000085752257"
          date="25 Feb 2025, 13:22"
          method={selectedMethod === "card" ? "Card Payment" : "Bank Transfer"}
          senderName="John Doe"
        />
      )}
    </PaymentLayout>
  );
}
