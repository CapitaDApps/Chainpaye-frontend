// Removed unused imports

interface PaymentLayoutProps {
  children: React.ReactNode;
  step: "method" | "bank-details" | "confirming" | "success" | "loading" | "error";
  paymentData?: {
    amount: string;
    currency: string;
    description: string;
    paymentType: string;
    name: string;
  } | null;
}

export function PaymentLayout({ children, step, paymentData }: PaymentLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-2 sm:p-4 font-sans">
      {step === "method" ? (
        <div className="bg-white dark:bg-[#1A1F36] rounded-2xl sm:rounded-[32px] w-full max-w-[1100px] min-h-[600px] flex justify-between flex-col lg:flex-row p-4 sm:p-8 md:p-12 gap-6 sm:gap-8 md:gap-20 shadow-sm relative pb-16">
          {/* Left Column: Summary */}
          <div className="flex flex-col justify-between w-full lg:max-w-[400px] shrink-0 order-2 lg:order-1">
            <div>
              <div className="text-gray-500 mb-4 sm:mb-6 font-medium text-sm sm:text-base">
                You&apos;re paying:
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111528] mb-6 sm:mb-10 break-words">
                {paymentData ? `${paymentData.currency} ${Number(paymentData.amount).toLocaleString()}` : "$250"}
              </h1>

              <div className="rounded-xl border border-gray-100 p-0 overflow-hidden">
                <div className="flex justify-between py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-50 bg-white">
                  <span className="text-gray-500 text-xs sm:text-sm">Bill from</span>
                  <span className="font-medium text-[#111528] text-xs sm:text-sm text-right">
                    {paymentData?.name || "Merchant"}
                  </span>
                </div>
                <div className="flex justify-between py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-50 bg-white">
                  <span className="text-gray-500 text-xs sm:text-sm">Purpose</span>
                  <span className="font-medium text-[#111528] text-xs sm:text-sm text-right max-w-[60%]">
                    {paymentData?.description || "Payment for website design"}
                  </span>
                </div>
                <div className="flex justify-between py-3 sm:py-4 px-3 sm:px-4 bg-white">
                  <span className="text-gray-500 text-xs sm:text-sm">Payment Type</span>
                  <span className="font-medium text-[#111528] text-xs sm:text-sm">
                    {paymentData?.paymentType === 'bank' ? 'Bank Transfer' : 'Card Payment'}
                  </span>
                </div>
              </div>

              {/* Transaction Details */}
              {paymentData && (
                <div className="mt-4 sm:mt-6 rounded-xl border border-gray-100 p-0 overflow-hidden">
                  <div className="flex justify-between py-2 sm:py-3 px-3 sm:px-4 border-b border-gray-50 bg-gray-50">
                    <span className="text-gray-600 text-xs font-medium uppercase">Transaction Details</span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 px-3 sm:px-4 border-b border-gray-50 bg-white">
                    <span className="text-gray-500 text-xs">Currency</span>
                    <span className="font-medium text-[#111528] text-xs">
                      {paymentData.currency}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 sm:py-3 px-3 sm:px-4 bg-white">
                    <span className="text-gray-500 text-xs">Amount</span>
                    <span className="font-medium text-[#111528] text-xs">
                      {paymentData.currency} {Number(paymentData.amount).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 sm:mt-8 w-fit text-nowrap lg:mt-0 flex items-center gap-2 text-xs text-gray-400 lg:relative absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:translate-x-0">
              <span>Powered by</span>
              <span className="font-bold text-[#111528]">
                Chainpaye
              </span>
              <span className="mx-2 text-gray-300">help</span>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="relative pt-2 order-1 lg:order-2 flex-1">{children}</div>
        </div>
      ) : (
        <div className="w-full bg-[#FDFDFD] rounded-xl min-h-[400px] sm:min-h-[500px] h-[80vh] max-w-[972px] justify-center flex flex-col items-center relative px-2 sm:px-4">
          <div
            className={`max-w-full sm:max-w-125 ${
              step === "success" ? "rounded-t-4xl" : "rounded-4xl"
            } w-full relative`}
          >
            {children}
          </div>

          {/* Footer Outside */}
          <div className="flex items-start absolute md:left-14 left-1/2 transform -translate-x-1/2 md:translate-x-0 bottom-6 gap-2 text-xs text-gray-400">
            <span>Powered by</span>
            <span className="font-normal text-[#111528]">
              Chainpaye
            </span>
            <span className="mx-2 text-[#5A5F73]">help</span>
          </div>
        </div>
      )}
    </div>
  );
}
