// Progress indicator for payment flow

interface PaymentProgressProps {
  step: "method" | "bank-details" | "verifying" | "success" | "loading" | "error";
}

export function PaymentProgress({ step }: PaymentProgressProps) {
  const steps = [
    { id: "method", label: "Select Method" },
    { id: "bank-details", label: "Bank Details" },
    { id: "verifying", label: "Verifying" },
    { id: "success", label: "Complete" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((s, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    isActive ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-all ${
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
