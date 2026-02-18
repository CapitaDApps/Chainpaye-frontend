// Removed unused imports

interface PaymentLayoutProps {
  children: React.ReactNode;
  step:
    | "method"
    | "bank-details"
    | "verifying"
    | "success"
    | "sender-details"
    | "loading"
    | "error";
  onBack?: () => void;
  paymentData?: {
    name?: string;
    amount?: string;
    currency?: string;
    description?: string;
  } | null;
}

export function PaymentLayout({
  children,
  step,
  paymentData,
}: PaymentLayoutProps) {
  // Use payment data if available, otherwise use defaults
  const amount = paymentData?.amount
    ? `${paymentData.currency || "$"} ${Number(paymentData.amount).toLocaleString()}`
    : "$250";
  const name = paymentData?.name || "Blessing Idowu";
  const description = paymentData?.description || "Payment for website design";

  return (
    <div className="min-h-screen  bg-[#FDFDFD] md:bg-[#F5F5F5] flex items-center justify-center p-4 font-sans">
      {step === "method" ? (
        <div className="md:bg-white  md:rounded-[32px] w-full max-w-[1100px] min-h-[600px] flex justify-between flex-col md:flex-row md:p-8 md:p-12 gap-8 md:gap-20 md:shadow-sm relative pb-16">
          {/* Left Column: Summary */}
          <div className="flex flex-col justify-between w-full md:max-w-[400px] shrink-0">
            <div>
              <div className="text-gray-500 mb-6 font-medium">
                You&apos;re paying:
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-[#111528] mb-10">
                {amount}
              </h1>

              <div className="rounded-xl border border-gray-100 p-0 overflow-hidden">
                <div className="flex justify-between py-4 px-4 border-b border-gray-50  bg-white ">
                  <span className="text-gray-500 text-sm">Bill from</span>
                  <span className="font-medium text-[#111528] text-sm">
                    {name}
                  </span>
                </div>
                <div className="flex justify-between py-4 px-4 bg-white">
                  <span className="text-gray-500 text-sm">Purpose</span>
                  <span className="font-medium text-[#111528] text-sm text-right">
                    {description}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 w-fit text-nowrap md:mt-0 flex items-center gap-2 text-xs text-gray-400 md:relative absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <span>Powered by</span>
              <span className="font-bold text-[#111528]">Chainpaye</span>
              <span className="mx-2 text-gray-300">help</span>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="relative pt-2">{children}</div>
        </div>
      ) : (
        <div className="w-full md:bg-[#FDFDFD] rounded-xl min-h-175 max-w-[972px] md:py-10 flex flex-col items-center relative md:px-4">
          <div
            className={`max-w-125 ${
              step === "success" ? "rounded-t-4xl" : "rounded-4xl"
            }  w-full relative`}
          >
            {children}
          </div>

          <div className="flex items-center justify-center w-full mt-auto py-8 gap-2 text-xs text-gray-400 md:absolute md:bottom-8 md:left-14 md:justify-start md:w-auto md:py-0">
            <span>Powered by</span>
            <span className="font-bold text-[#111528]">Chainpaye</span>
            <div className="w-px h-3 bg-gray-200 mx-1 hidden md:block" />
            <span className="text-[#5A5F73] hidden md:block">|</span>
            <button className="hover:underline">help</button>
          </div>
        </div>
      )}
    </div>
  );
}
