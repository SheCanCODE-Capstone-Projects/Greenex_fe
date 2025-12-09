import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all",
                currentStep > step.number
                  ? "bg-green-600 text-white"
                  : currentStep === step.number
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-600"
              )}
            >
              {currentStep > step.number ? (
                <Check className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <span className="text-xs mt-2 text-muted-foreground">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-24 h-1 mx-2 rounded-full transition-all",
                currentStep > step.number ? "bg-green-600" : "bg-gray-300"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
