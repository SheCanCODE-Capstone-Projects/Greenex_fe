'use client'
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-8">
        {steps.map((stepItem, index) => {
          const Icon = stepItem.icon;
          const isActive = currentStep === stepItem.number;
          const isCompleted = currentStep > stepItem.number;
          
          return (
            <div key={stepItem.number} className="flex items-center">
              <div className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300",
                isActive && "bg-primary/10 scale-105",
                isCompleted && "bg-accent"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  isActive && "bg-primary text-white shadow-lg",
                  isCompleted && "bg-primary text-white",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground"
                )}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={cn(
                  "font-medium text-base transition-colors",
                  isActive && "text-primary",
                  isCompleted && "text-primary",
                  !isActive && !isCompleted && "text-muted-foreground"
                )}>
                  {stepItem.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-16 h-0.5 mx-4 transition-colors",
                  currentStep > stepItem.number ? "bg-primary" : "bg-border"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}