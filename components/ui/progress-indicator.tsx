import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export function ProgressIndicator({ currentStep, steps, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                  index < currentStep
                    ? "bg-green-500 text-white"
                    : index === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Step Label */}
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center max-w-20",
                  index <= currentStep ? "text-gray-900" : "text-gray-500"
                )}
              >
                {step}
              </span>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-all duration-200",
                  index < currentStep ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Payment-specific progress component
export function PaymentProgress({ step }: { step: string }) {
  const steps = ["Method", "Details", "Verify", "Complete"];
  
  const getCurrentStepIndex = (currentStep: string): number => {
    switch (currentStep) {
      case "method": return 0;
      case "bank-details": return 1;
      case "confirming": return 2;
      case "success": return 3;
      default: return 0;
    }
  };
  
  const currentStepIndex = getCurrentStepIndex(step);
  
  return (
    <div className="mb-8">
      <ProgressIndicator 
        currentStep={currentStepIndex} 
        steps={steps}
        className="max-w-md mx-auto"
      />
    </div>
  );
}