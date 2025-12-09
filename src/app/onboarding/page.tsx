/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Leaf,
  Shield,
  Sparkles,
  X,
  Loader2
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { FileUploadModal } from '@/components/ui/FileUploadModal';

// Rwanda Districts
const rwandaDistricts = [
  "Gasabo", "Kicukiro", "Nyarugenge", "Bugesera", "Gatsibo", "Kayonza", "Kirehe",
  "Ngoma", "Nyagatare", "Rwamagana", "Burera", "Gakenke", "Gicumbi", "Musanze",
  "Rulindo", "Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi",
  "Rutsiro", "Huye", "Gisagara", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza",
  "Nyaruguru", "Ruhango"
].sort();

const companySchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  district: z.string().refine(val => rwandaDistricts.includes(val), {
    message: 'Please select a valid district in Rwanda',
  }),
});

type CompanyFormData = z.infer<typeof companySchema>;

const steps = [
  { number: 1, label: 'Company Info' },
  { number: 2, label: 'Documents' },
  { number: 3, label: 'Complete' },
];

interface UploadedDocument {
  name: string;
  file: File;
}

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [companyData, setCompanyData] = useState<CompanyFormData | null>(null);
  const [rdbDocument, setRdbDocument] = useState<UploadedDocument | null>(null);
  const [remaDocument, setRemaDocument] = useState<UploadedDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState<'rdb' | 'rema' | null>(null);
  const [districtOpen, setDistrictOpen] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    mode: 'onChange',
  });

  const watchedDistrict = watch('district');

  const onCompanySubmit = (data: CompanyFormData) => {
    setCompanyData(data);
    setStep(2);
  };

  const handleRdbUpload = (files: File[]) => {
    if (files.length > 0) {
      setRdbDocument({ name: files[0].name, file: files[0] });
    }
  };

  const handleRemaUpload = (files: File[]) => {
    if (files.length > 0) {
      setRemaDocument({ name: files[0].name, file: files[0] });
    }
  };

  const onFinalSubmit = async () => {
    if (!companyData || !rdbDocument || !remaDocument) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('companyName', companyData.companyName);
      formData.append('district', companyData.district);
      formData.append('rdbCertificate', rdbDocument.file);
      formData.append('remaCertificate', remaDocument.file);

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      console.log('Registration successful:', result);
      setStep(3);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Leaf className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Greenex</h1>
                <p className="text-xs text-muted-foreground">Powering Rwanda's Green Future</p>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          {step !== 3 && (
            <div className="mb-10 animate-fade-in-up animate-delay-100">
              <StepIndicator steps={steps} currentStep={step} />
            </div>
          )}

          {/* Step 1 - Company Info */}
          {step === 1 && (
            <div className="animate-fade-in-up animate-delay-200">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-accent mb-6">
                  <Building2 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Let's Get Started
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Tell us about your company to begin your journey with Greenex
                </p>
              </div>

              {/* Form Card */}
              <form
                onSubmit={handleSubmit(onCompanySubmit)}
                className="glass-card p-8 md:p-10"
              >
                <div className="space-y-8">
                  {/* Company Name */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold flex items-center gap-2 text-foreground">
                      <Building2 className="w-5 h-5 text-primary" />
                      Official Company Name
                    </Label>
                    <Input
                      {...register('companyName')}
                      placeholder="e.g. Green Energy Rwanda Ltd"
                      className="h-14 text-base bg-input/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    {errors.companyName && (
                      <p className="text-destructive text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>

                  {/* District */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold flex items-center gap-2 text-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      District Location
                    </Label>

                    <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={districtOpen}
                          className="w-full justify-between h-14 text-base bg-input/50 border-border hover:border-primary hover:bg-input transition-all"
                        >
                          <span className={cn(!watchedDistrict && "text-muted-foreground")}>
                            {watchedDistrict || "Select your district..."}
                          </span>
                          <MapPin className="ml-2 h-5 w-5 text-muted-foreground" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search district..." className="h-12" />
                          <CommandList>
                            <CommandEmpty>No district found.</CommandEmpty>
                            <CommandGroup className="max-h-64 overflow-auto">
                              {rwandaDistricts.map((district) => (
                                <CommandItem
                                  key={district}
                                  value={district}
                                  onSelect={() => {
                                    setValue('district', district, { shouldValidate: true });
                                    setDistrictOpen(false);
                                  }}
                                  className="py-3"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      watchedDistrict === district ? "opacity-100 text-primary" : "opacity-0"
                                    )}
                                  />
                                  {district}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {errors.district && (
                      <p className="text-destructive text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  {/* Info Card */}
                  <div className="p-4 rounded-xl bg-accent/50 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Your data is secure</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          All information is encrypted and stored securely following international standards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-border">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="lg"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={!isValid}
                    className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none px-8"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2 - Document Upload */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-accent mb-6">
                  <FileText className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Upload Your Documents
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  We need these certificates to verify your company
                </p>
              </div>

              {/* Upload Cards */}
              <div className="glass-card p-8 md:p-10">
                <div className="space-y-6">
                  {/* RDB Certificate */}
                  <div
                    onClick={() => setUploadModalOpen('rdb')}
                    className={cn(
                      "upload-zone group",
                      rdbDocument && "border-primary bg-accent/30"
                    )}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                        rdbDocument ? "bg-primary" : "bg-accent group-hover:bg-primary/10"
                      )}>
                        {rdbDocument ? (
                          <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                        ) : (
                          <Upload className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-semibold text-foreground">
                          RDB Certificate of Incorporation
                        </h3>
                        {rdbDocument ? (
                          <p className="text-sm text-primary font-medium mt-1">
                            {rdbDocument.name}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">
                            PDF format, max 5MB
                          </p>
                        )}
                      </div>

                      {!rdbDocument && (
                        <Button
                          type="button"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      )}

                      {rdbDocument && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRdbDocument(null);
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* REMA Certificate */}
                  <div
                    onClick={() => setUploadModalOpen('rema')}
                    className={cn(
                      "upload-zone group",
                      remaDocument && "border-primary bg-accent/30"
                    )}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                        remaDocument ? "bg-primary" : "bg-accent group-hover:bg-primary/10"
                      )}>
                        {remaDocument ? (
                          <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                        ) : (
                          <Upload className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-semibold text-foreground">
                          REMA Environmental License
                        </h3>
                        {remaDocument ? (
                          <p className="text-sm text-primary font-medium mt-1">
                            {remaDocument.name}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">
                            PDF format, max 5MB
                          </p>
                        )}
                      </div>

                      {!remaDocument && (
                        <Button
                          type="button"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      )}

                      {remaDocument && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRemaDocument(null);
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="p-4 rounded-xl bg-accent/50 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Quick Tips</p>
                        <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                          <li>• Ensure documents are clearly legible</li>
                          <li>• Documents should be current and not expired</li>
                          <li>• Both documents are required to complete registration</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={() => setStep(1)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <Button
                    size="lg"
                    onClick={onFinalSubmit}
                    disabled={!rdbDocument || !remaDocument || isUploading}
                    className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none px-8"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Success */}
          {step === 3 && (
            <div className="animate-fade-in-up text-center">
              {/* Success Animation */}
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-accent mx-auto flex items-center justify-center animate-scale-in">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-soft">
                    <Check className="w-12 h-12 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border-4 border-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
              </div>

              {/* Success Message */}
              <div className="glass-card p-10 md:p-12 max-w-lg mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Application Submitted!
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Thank you for registering with Greenex. Your application has been submitted successfully.
                </p>

                <div className="p-4 rounded-xl bg-accent border border-primary/20 mb-8">
                  <p className="text-base font-medium text-foreground">
                    We'll review your documents and get back to you within
                  </p>
                  <p className="text-2xl font-bold text-primary mt-2">
                    3–5 Business Days
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <a href="/signin" className="text-primary font-semibold hover:underline">
                      Sign in
                    </a>
                  </p>

                  <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="text-primary hover:text-primary/80"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-8 animate-pulse-soft">
                  Redirecting to homepage in 8 seconds...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modals */}
      <FileUploadModal
        open={uploadModalOpen === 'rdb'}
        onOpenChange={(open) => !open && setUploadModalOpen(null)}
        onUpload={handleRdbUpload}
        title="Upload RDB Certificate"
        accept=".pdf"
        maxSize={5 * 1024 * 1024}
      />

      <FileUploadModal
        open={uploadModalOpen === 'rema'}
        onOpenChange={(open) => !open && setUploadModalOpen(null)}
        onUpload={handleRemaUpload}
        title="Upload REMA License"
        accept=".pdf"
        maxSize={5 * 1024 * 1024}
      />
    </div>
  );
}
