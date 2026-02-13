"use client";

export interface VerificationPendingProps {
  email: string;
  transactionId: string;
  isPolling?: boolean;
}

export function VerificationPending({ 
  email, 
  transactionId, 
  isPolling = false 
}: VerificationPendingProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto text-center py-8">
      {/* Animated spinner */}
      <div className="w-20 h-20 mb-6 relative">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Verifying Your Payment
      </h2>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        We're verifying your payment with the bank. This usually takes a few minutes, but can take up to 24 hours.
      </p>
      
      {isPolling && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 w-full">
          <p className="text-xs text-green-700 flex items-center justify-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            Checking payment status...
          </p>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 w-full">
        <p className="text-sm text-blue-800 mb-2">
          <strong>What happens next?</strong>
        </p>
        <ul className="text-xs text-blue-700 text-left space-y-1">
          <li>✓ We'll send a confirmation email to <strong>{email}</strong></li>
          <li>✓ You'll receive your receipt once verified</li>
          <li>✓ You can safely close this page</li>
        </ul>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 w-full mb-6">
        <p className="text-xs text-gray-600">
          <strong>Transaction ID:</strong>
        </p>
        <p className="text-xs text-gray-900 font-mono mt-1 break-all">
          {transactionId}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Save this for your records
        </p>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 w-full">
        <p className="text-xs text-yellow-800">
          <strong>⏱️ Verification Timeline:</strong>
        </p>
        <p className="text-xs text-yellow-700 mt-1">
          Most payments confirm within 15 minutes. If not confirmed within 24 hours, we'll send you an update.
        </p>
      </div>
      
      <p className="text-sm text-gray-500 mt-6">
        Need help? Contact <a href="mailto:support@chainpaye.com" className="text-blue-600 hover:underline">support@chainpaye.com</a>
      </p>
    </div>
  );
}
