'use client'
import { CheckCircle2, PartyPopper, Sparkles, Truck, Building2, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompanyFormData } from './CompanyInfoStep';

interface SuccessStepProps {
  companyData: CompanyFormData | null;
  onGoHome: () => void;
}

export function SuccessStep({ companyData, onGoHome }: SuccessStepProps) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Animated Success Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary-green flex items-center justify-center shadow-xl animate-pulse">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <PartyPopper className="absolute top-0 right-1/4 w-5 h-5 text-primary animate-bounce" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute bottom-1 left-1/4 w-4 h-4 text-primary animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      {/* Success Card */}
      <div className="bg-card rounded-2xl shadow-xl border border-border p-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary-green bg-clip-text text-transparent mb-2">
          Application Submitted!
        </h2>
        
        <p className="text-base text-muted-foreground mb-4">
          You are one step closer to powering Rwanda's green future.
        </p>

        {/* Review Timeline */}
        <div className="p-3 rounded-xl bg-accent border border-border mb-4">
          <p className="text-sm font-medium text-foreground mb-1">
            Our team is reviewing your documents.
          </p>
          <p className="text-xl font-bold text-primary">
            Review Time: 3–5 Business Days
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            We will notify you via the provided phone number.
          </p>
        </div>

        {/* Company Summary */}
        {companyData && (
          <div className="p-3 rounded-xl bg-accent border border-border mb-4 text-left">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Registration Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-3 h-3 text-primary shrink-0" />
                <span className="text-xs font-medium text-foreground truncate">{companyData.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-primary shrink-0" />
                <span className="text-xs font-medium text-foreground">{companyData.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                <span className="text-xs text-foreground">{companyData.sectors.length} Sectors</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={onGoHome}
            className="bg-gradient-to-r from-primary to-secondary-green text-primary-foreground px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>

          <p className="text-xs text-muted-foreground animate-pulse">
            Redirecting automatically in 10 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}