"use client";

import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";

interface BankTransferProps {
  onSent: () => void;
  onChangeMethod: () => void;
  paymentData: {
    amount: string;
    currency: string;
    paymentType: string;
    token: string;
    transactionId: string;
    paymentInitialization: {
      toronetResponse: {
        bankname?: string; // For NGN payments
        accountnumber?: string; // For NGN payments
        accountname?: string; // For NGN payments
        amount?: number; // For NGN payments
        instruction: string;
        txid: string; // Transaction ID for USD payments
      };
    };
  };
}

export function BankTransfer({ onSent, onChangeMethod, paymentData }: BankTransferProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Check if this is a USD bank payment
  const isUSDBank = paymentData.currency === "USD" && paymentData.paymentType === "bank" && paymentData.token === "USD";
  
  // USD bank payment details
  const usdBankDetails = {
    bankName: "Chase Bank",
    routingNumber: "021000021",
    accountNumber: "839128227",
    accountName: "ConnectWorld Inc",
    amount: paymentData.amount,
    transactionId: paymentData.paymentInitialization.toronetResponse.txid
  };

  // NGN bank payment details (from API response)
  const ngnBankDetails = {
    bankName: paymentData.paymentInitialization.toronetResponse.bankname || "",
    accountNumber: paymentData.paymentInitialization.toronetResponse.accountnumber || "",
    accountName: paymentData.paymentInitialization.toronetResponse.accountname || "",
    amount: paymentData.paymentInitialization.toronetResponse.amount || 0,
  };

  return (
    <div className="flex flex-col h-full max-w-[400px] mx-auto">
      <div className="flex gap-3 items-center mb-6">
        <button onClick={onChangeMethod}>
          <ArrowLeft className="w-5 h-5 text-[#111528]" />
        </button>
        <span className="text-gray-900 font-medium">
          Pay with Bank Transfer
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="text-sm text-[#111528] mb-1">
          Transfer
          <span className="font-bold text-[#111528] ml-1">
            {isUSDBank 
              ? `${paymentData.currency} ${usdBankDetails.amount}`
              : `${paymentData.currency} ${ngnBankDetails.amount.toLocaleString()}`
            }
          </span>
        </div>
        <div className="text-xs text-blue-500">
          Account number expires in 30 Mins
        </div>
      </div>

      {/* Instructions for USD Bank Transfer */}
      {isUSDBank && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="text-sm text-blue-800">
            <strong>Instructions:</strong> Please proceed to pay the amount indicated to Chase Bank, Routing No 021000021, Account 839128227, Account Name: ConnectWorld Inc. and paste the transaction id in the payment description for faster processing of funds.
          </div>
        </div>
      )}

      <div className="bg-[#F9FAFB] rounded-xl p-6 pb-10 space-y-5 mb-8 relative">
        {/* Custom Dashed Border via SVG */}
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
          <svg className="w-full h-full">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="12"
              fill="none"
              stroke="#DEE2E6"
              strokeWidth="2"
              strokeDasharray="10 10"
              // className="dark:stroke-gray-800"
            />
          </svg>
        </div>

        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">BANK NAME</div>
          <div className="font-medium text-gray-900">
            {isUSDBank ? usdBankDetails.bankName : ngnBankDetails.bankName}
          </div>
        </div>

        {isUSDBank ? (
          // USD Bank Payment Fields
          <>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">ACCOUNT NAME</div>
              <div className="font-medium text-gray-900">{usdBankDetails.accountName}</div>
            </div>

            <div
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => copyToClipboard(usdBankDetails.routingNumber, "routing")}
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">ROUTING NUMBER</div>
                <div className="font-medium text-gray-900">{usdBankDetails.routingNumber}</div>
              </div>
              <button className="text-gray-400 hover:text-blue-500 transition">
                {copiedField === "routing" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => copyToClipboard(usdBankDetails.accountNumber, "account")}
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">ACCOUNT NUMBER</div>
                <div className="font-medium text-gray-900">{usdBankDetails.accountNumber}</div>
              </div>
              <button className="text-gray-400 hover:text-blue-500 transition">
                {copiedField === "account" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => copyToClipboard(usdBankDetails.amount, "amount")}
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">AMOUNT</div>
                <div className="font-medium text-gray-900">
                  {paymentData.currency} {usdBankDetails.amount}
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-500 transition">
                {copiedField === "amount" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => copyToClipboard(usdBankDetails.transactionId, "txid")}
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">TRANSACTION ID</div>
                <div className="font-medium text-gray-900 break-all">{usdBankDetails.transactionId}</div>
              </div>
              <button className="text-gray-400 hover:text-blue-500 transition">
                {copiedField === "txid" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </>
        ) : (
          // NGN Bank Payment Fields
          <>
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">ACCOUNT NAME</div>
              <div className="font-medium text-gray-900">{ngnBankDetails.accountName}</div>
            </div>

            <div
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => copyToClipboard(ngnBankDetails.accountNumber, "account")}
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">ACCOUNT NUMBER</div>
                <div className="font-medium text-gray-900">{ngnBankDetails.accountNumber}</div>
              </div>
              <button className="text-gray-400 hover:text-blue-500 transition">
                {copiedField === "account" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => copyToClipboard(ngnBankDetails.amount.toString(), "amount")}
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">AMOUNT</div>
                <div className="font-medium text-gray-900">
                  {paymentData.currency} {ngnBankDetails.amount.toLocaleString()}
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-500 transition">
                {copiedField === "amount" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <button
        onClick={onSent}
        className="w-full py-4 rounded-xl font-medium text-white bg-[#003DFF] hover:bg-[#002dbf] shadow-lg shadow-blue-500/20 transition-all mb-4"
      >
        I&apos;ve sent the money
      </button>

      <button
        onClick={onChangeMethod}
        className="w-full py-2 text-sm text-gray-500 hover:text-gray-900 transition"
      >
        Change Payment Method
      </button>

      {copiedField && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-full px-4 py-2 flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-5">
          <span className="text-green-500 text-sm font-medium">Copied</span>
          <Check className="w-4 h-4 text-green-500" />
        </div>
      )}
    </div>
  );
}
