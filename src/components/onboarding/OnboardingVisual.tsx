'use client'
import { cn } from '@/lib/utils';
import { Truck, Layers, Route, Sparkles } from 'lucide-react';

interface OnboardingVisualProps {
  step: 1 | 2 | 3;
}

export function OnboardingVisual({ step }: OnboardingVisualProps) {
  const isStep1 = step === 1;
  const isStep2 = step === 2;

  return (
    <div className="hidden lg:block w-full max-w-lg p-8 relative">
      <div className={cn(
        "w-full h-[500px] bg-primary/10 rounded-3xl p-8 flex flex-col justify-center items-center relative overflow-hidden transition-all duration-700",
        isStep1 ? 'shadow-2xl shadow-primary/20' : 'shadow-2xl shadow-secondary-green/20'
      )}>
        <div className="absolute top-8 left-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-8 right-8 w-48 h-48 bg-secondary-green/5 rounded-3xl transform rotate-45 blur-3xl" />
        
        <div className="relative z-10 text-center">
          <div className={cn(
            "w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-500 mb-6",
            isStep1 ? "bg-gradient-to-br from-primary to-secondary-green" : "bg-gradient-to-br from-blue-500 to-primary/80"
          )}>
            {isStep1 ? (
              <Truck className="w-10 h-10 text-white animate-pulse" />
            ) : (
              <Layers className="w-10 h-10 text-white animate-bounce" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {isStep1 ? "Ready to Join the Green Network?" : "Compliance is Key"}
          </h2>
          <p className="text-muted-foreground mb-6 text-base">
            {isStep1 
              ? "Complete this step-by-step registration to start providing essential waste management services."
              : "Securely upload your contracts and licenses. We handle the rest to ensure full regulatory compliance."
            }
          </p>
          
          <div className="flex items-center justify-center gap-2 text-primary font-semibold">
            <Route className="w-5 h-5" />
            <span>Step {step} of 3</span>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i <= step ? "bg-primary" : "bg-primary/20"
                )}
              />
            ))}
          </div>

          {/* Floating elements */}
          <div className="absolute top-4 right-4">
            <Sparkles className="w-4 h-4 text-primary/40 animate-pulse" />
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="w-3 h-3 bg-secondary-green/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}