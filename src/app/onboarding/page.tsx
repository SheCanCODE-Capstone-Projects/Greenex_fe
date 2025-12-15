'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, FileText, CheckCircle2, Truck, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { CompanyInfoStep, CompanyFormData } from '@/components/onboarding/CompanyInfoStep';
import { DocumentStep } from '@/components/onboarding/DocumentStep';
import { SuccessStep } from '@/components/onboarding/SuccessStep';
import { OnboardingVisual } from '@/components/onboarding/OnboardingVisual';

const steps = [
  { number: 1, label: 'Company Info', icon: Building2 },
  { number: 2, label: 'Documents', icon: FileText },
  { number: 3, label: 'Complete', icon: CheckCircle2 },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [companyData, setCompanyData] = useState<CompanyFormData | null>(null);
  const [kigaliContract, setKigaliContract] = useState<File | null>(null);
  const [remaDocument, setRemaDocument] = useState<File | null>(null);
  const [rdbDocument, setRdbDocument] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleCompanySubmit = (data: CompanyFormData) => {
    setCompanyData(data);
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!companyData || !kigaliContract) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('companyName', companyData.companyName);
      formData.append('phoneNumber', companyData.phoneNumber);
      formData.append('sectors', JSON.stringify(companyData.sectors));
      formData.append('kigaliContract', kigaliContract);
      if (remaDocument) formData.append('remaCertificate', remaDocument);
      if (rdbDocument) formData.append('rdbCertificate', rdbDocument);

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      console.log('Registration successful:', result);
      toast.success('Registration completed successfully!');
      setStep(3);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="rounded-full w-10 h-10 p-0 bg-card/80 backdrop-blur-sm border-border"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-[90rem]">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary-green flex items-center justify-center shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary-green bg-clip-text text-transparent">
                  Greenex
                </h1>
                <p className="text-base text-muted-foreground">Powering Rwanda&apos;s Green Future</p>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          {step !== 3 && (
            <StepIndicator steps={steps} currentStep={step} />
          )}

          {/* Step Content */}
          {step !== 3 ? (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Visual Content */}
              <OnboardingVisual step={step} />
              
              {/* Right Side - Form Content */}
              <div className="w-full">
                {step === 1 && (
                  <CompanyInfoStep 
                    onNext={handleCompanySubmit}
                    onBack={() => router.push('/')}
                  />
                )}

                {step === 2 && (
                  <DocumentStep
                    kigaliContract={kigaliContract}
                    setKigaliContract={setKigaliContract}
                    remaDocument={remaDocument}
                    setRemaDocument={setRemaDocument}
                    rdbDocument={rdbDocument}
                    setRdbDocument={setRdbDocument}
                    onBack={() => setStep(1)}
                    onSubmit={handleFinalSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>
            </div>
          ) : (
            <SuccessStep
              companyData={companyData}
              onGoHome={() => router.push('/')}
            />
          )}
        </div>
      </div>
    </div>
  );
}