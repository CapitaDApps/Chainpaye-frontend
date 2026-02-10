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
        instruction?: string;
        txid?: string; // Transaction ID for USD payments
      };
    };
  };
  senderName: string;
  setSenderName: (name: string) => void;
  senderPhone: string;
  setSenderPhone: (phone: string) => void;
  validationErrors: Array<{ field: string; message: string }>;
  isSubmitting: boolean;
}

export function BankTransfer({ 
  onSent, 
  onChangeMethod, 
  paymentData, 
  senderName, 
  setSenderName, 
  senderPhone, 
  setSenderPhone,
  validationErrors,
  isSubmitting
}: BankTransferProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const getFieldError = (fieldName: string) => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };

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
    bankAddress: "Chase Bank, NA. 270 Park Avenue, New York, NY 10017",
    amount: paymentData.amount,
    transactionId: paymentData.paymentInitialization.toronetResponse.txid || ""
  };

  // NGN bank payment details (from API response)
  let ngnBankDetails = {
    bankName: paymentData.paymentInitialization.toronetResponse.bankname || "",
    accountNumber: paymentData.paymentInitialization.toronetResponse.accountnumber || "",
    accountName: paymentData.paymentInitialization.toronetResponse.accountname || "",
    amount: paymentData.paymentInitialization.toronetResponse.amount || Number(paymentData.amount) || 0,
  };

  // Check if NGN bank details are missing
  const isNGNBankDetailsMissing = !isUSDBank && (
    !ngnBankDetails.bankName || 
    !ngnBankDetails.accountNumber || 
    !ngnBankDetails.accountName ||
    ngnBankDetails.amount === 0
  );

  // Try to extract bank details from instruction if structured fields are missing
  const instruction = paymentData.paymentInitialization.toronetResponse.instruction || "";
  
  if (!isUSDBank && isNGNBankDetailsMissing && instruction) {
    // Try to extract bank name, account number, and account name from instruction
    const accountNumberMatch = instruction.match(/account.*number[:\s]*(\d+)/i);
    const accountNameMatch = instruction.match(/account.*name[:\s]*([^.]+)/i);
    const bankNameMatch = instruction.match(/(\w+\s*Bank)/i);
    
    if (accountNumberMatch) {
      ngnBankDetails.accountNumber = accountNumberMatch[1].trim();
    }
    if (accountNameMatch) {
      ngnBankDetails.accountName = accountNameMatch[1].trim();
    }
    if (bankNameMatch) {
      ngnBankDetails.bankName = bankNameMatch[1].trim();
    }
  }

  // Debug logging for production issues
  console.log("Payment Data Debug:", {
    currency: paymentData.currency,
    paymentType: paymentData.paymentType,
    token: paymentData.token,
    isUSDBank,
    toronetResponse: paymentData.paymentInitialization.toronetResponse,
    ngnBankDetails,
    usdBankDetails,
    isNGNBankDetailsMissing,
    instruction
  });

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

      {/* Loading state for NGN bank details */}
      {!isUSDBank && !isNGNBankDetailsMissing && !ngnBankDetails.bankName && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="text-sm text-blue-800 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Loading bank account details...
          </div>
        </div>
      )}

      {/* Error message for missing NGN bank details */}
      {isNGNBankDetailsMissing && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="text-sm text-red-800">
            <strong>Error:</strong> Bank account details are not available. Please contact support or try refreshing the page.
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-2">
              <summary className="text-xs text-red-600 cursor-pointer">Debug info (dev only)</summary>
              <pre className="text-xs text-red-600 mt-1 overflow-auto max-h-32">
                {JSON.stringify(paymentData.paymentInitialization.toronetResponse, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      {/* Instructions for NGN Bank Transfer */}
      {!isUSDBank && paymentData.paymentInitialization.toronetResponse.instruction && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="text-sm text-blue-800">
            <strong>Instructions:</strong> {paymentData.paymentInitialization.toronetResponse.instruction}
          </div>
        </div>
      )}

      {/* Instructions for USD Bank Transfer */}
      {isUSDBank && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="text-sm text-blue-800">
            <strong>Instructions:</strong> Please proceed to pay the amount indicated to Chase Bank, Routing No 021000021, Account 839128227, Account Name: ConnectWorld Inc. and paste the transaction id in the payment description for faster processing of funds.
          </div>
        </div>
      )}

      <div className="bg-[#F9FAFB] rounded-xl p-6 pb-8 space-y-6 mb-8 relative">
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
            {isUSDBank ? usdBankDetails.bankName : (ngnBankDetails.bankName || "Loading...")}
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
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyToClipboard(usdBankDetails.routingNumber, "routing");
                }
              }}
              aria-label="Copy routing number to clipboard"
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">ROUTING NUMBER</div>
                <div className="font-medium text-gray-900">{usdBankDetails.routingNumber}</div>
              </div>
              <button 
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="Copy routing number"
                tabIndex={-1}
              >
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
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyToClipboard(usdBankDetails.accountNumber, "account");
                }
              }}
              aria-label="Copy account number to clipboard"
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">ACCOUNT NUMBER</div>
                <div className="font-medium text-gray-900">{usdBankDetails.accountNumber}</div>
              </div>
              <button 
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="Copy account number"
                tabIndex={-1}
              >
                {copiedField === "account" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div
              className="flex justify-between items-start group cursor-pointer"
              onClick={() => copyToClipboard(usdBankDetails.bankAddress, "address")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyToClipboard(usdBankDetails.bankAddress, "address");
                }
              }}
              aria-label="Copy bank address to clipboard"
            >
              <div className="flex-1 pr-3">
                <div className="text-xs text-gray-500 uppercase mb-1">BANK ADDRESS</div>
                <div className="font-medium text-gray-900 text-sm leading-relaxed break-words">
                  {usdBankDetails.bankAddress}
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-blue-500 transition flex-shrink-0 mt-5"
                aria-label="Copy bank address"
                tabIndex={-1}
              >
                {copiedField === "address" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => copyToClipboard(usdBankDetails.amount, "amount")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyToClipboard(usdBankDetails.amount, "amount");
                }
              }}
              aria-label="Copy amount to clipboard"
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">AMOUNT</div>
                <div className="font-medium text-gray-900">
                  {paymentData.currency} {Number(usdBankDetails.amount).toLocaleString()}
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="Copy amount"
                tabIndex={-1}
              >
                {copiedField === "amount" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div
              className="flex justify-between items-start group cursor-pointer"
              onClick={() => copyToClipboard(usdBankDetails.transactionId, "txid")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyToClipboard(usdBankDetails.transactionId, "txid");
                }
              }}
              aria-label="Copy transaction ID to clipboard"
            >
              <div className="flex-1 pr-3">
                <div className="text-xs text-gray-500 uppercase mb-1">TRANSACTION ID</div>
                <div className="font-medium text-gray-900 break-all text-sm">{usdBankDetails.transactionId}</div>
              </div>
              <button 
                className="text-gray-400 hover:text-blue-500 transition flex-shrink-0 mt-5"
                aria-label="Copy transaction ID"
                tabIndex={-1}
              >
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
              <div className="font-medium text-gray-900">{ngnBankDetails.accountName || "Loading..."}</div>
            </div>

            <div
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => copyToClipboard(ngnBankDetails.accountNumber, "account")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyToClipboard(ngnBankDetails.accountNumber, "account");
                }
              }}
              aria-label="Copy account number to clipboard"
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">ACCOUNT NUMBER</div>
                <div className="font-medium text-gray-900">{ngnBankDetails.accountNumber || "Loading..."}</div>
              </div>
              <button 
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="Copy account number"
                tabIndex={-1}
              >
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
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  copyToClipboard(ngnBankDetails.amount.toString(), "amount");
                }
              }}
              aria-label="Copy amount to clipboard"
            >
              <div>
                <div className="text-xs text-gray-500 uppercase mb-1">AMOUNT</div>
                <div className="font-medium text-gray-900">
                  {paymentData.currency} {ngnBankDetails.amount.toLocaleString()}
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-blue-500 transition"
                aria-label="Copy amount"
                tabIndex={-1}
              >
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

      {/* Sender Information Form */}
      <div className="mb-6 space-y-4">
        <div className="text-sm font-medium text-gray-700 mb-3">Your Information</div>
        
        <div>
          <label htmlFor="senderName" className="block text-xs text-gray-500 uppercase mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="senderName"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              getFieldError('name') ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            required
            aria-describedby={getFieldError('name') ? "name-error" : undefined}
            aria-invalid={!!getFieldError('name')}
          />
          {getFieldError('name') && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {getFieldError('name')}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="senderPhone" className="block text-xs text-gray-500 uppercase mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="senderPhone"
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            placeholder="+1-555-0123"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              getFieldError('phone') ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            aria-describedby={getFieldError('phone') ? "phone-error" : undefined}
            aria-invalid={!!getFieldError('phone')}
          />
          {getFieldError('phone') && (
            <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
              {getFieldError('phone')}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onSent}
        disabled={!senderName.trim() || isSubmitting}
        className="w-full py-4 rounded-xl font-medium text-white bg-[#003DFF] hover:bg-[#002dbf] shadow-lg shadow-blue-500/20 transition-all mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        aria-label={isSubmitting ? "Processing payment..." : "Confirm payment sent"}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          "I've sent the money"
        )}
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
