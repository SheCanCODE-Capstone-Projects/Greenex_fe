'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building2, MapPin, FileText, Shield, ArrowLeft, ArrowRight, ChevronDown, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import { authService } from '@/lib/auth-service';

const kigaliSectors = [
  "Bumbogo", "Gatsata", "Gikomero", "Gisozi", "Jabana", "Jali", "Kacyiru",
  "Kimihurura", "Kimironko", "Kinyinya", "Ndera", "Nduba", "Remera", "Rusororo", "Rutunga",
  "Gahanga", "Gatenga", "Gikondo", "Kagarama", "Kanombe", "Kicukiro", "Kigarama",
  "Masaka", "Niboye", "Nyarugunga",
  "Gitega", "Kanyinya", "Kigali", "Kimisagara", "Mageragere", "Muhima",
  "Nyakabanda", "Nyamirambo", "Nyarugenge", "Rwezamenyo"
].sort();

const companySchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  sectors: z.array(z.string()).min(1, "Please select at least one sector"),
  contractNumber: z.string().min(2, "Contract number must be at least 2 characters"),
});

export type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyInfoStepProps {
  onNext: (data: CompanyFormData) => void;
  onBack: () => void;
}

export function CompanyInfoStep({ onNext, onBack }: CompanyInfoStepProps) {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, formState: { isValid } } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    mode: 'onChange',
    defaultValues: { sectors: [] },
  });

  const toggleSector = (sector: string) => {
    const newSectors = selectedSectors.includes(sector)
      ? selectedSectors.filter(s => s !== sector)
      : [...selectedSectors, sector];

    setSelectedSectors(newSectors);
    setValue('sectors', newSectors, { shouldValidate: true });
  };

  const onSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: data.companyName,
        contractNumber: data.contractNumber,
        sectorCoverage: data.sectors.join(', ')
      };

      await authService.registerCompany(payload);

      toast.success('Company information saved successfully!');
      onNext(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to register company info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center lg:text-left mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Company Registration
        </h2>
        <p className="text-base text-muted-foreground">
          Tell us about your waste management company
        </p>
      </div>

      <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Name */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Company Name
            </Label>
            <Input
              {...register('companyName')}
              placeholder="e.g. Green Waste Solutions Ltd"
              className="h-12 text-base rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Sector Coverage */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Sector Coverage in Kigali
              <span className="text-sm font-normal text-muted-foreground ml-1">(Select areas you operate in)</span>
            </Label>

            <div className="relative">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSectorsOpen(!sectorsOpen)}
                className="w-full h-12 justify-between text-left rounded-xl border-border"
              >
                <span className={selectedSectors.length === 0 ? "text-muted-foreground" : ""}>
                  {selectedSectors.length === 0
                    ? "Select sectors you cover..."
                    : `${selectedSectors.length} sector${selectedSectors.length > 1 ? 's' : ''} selected`
                  }
                </span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", sectorsOpen && "rotate-180")} />
              </Button>

              {sectorsOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                  {kigaliSectors.map((sector) => (
                    <div
                      key={sector}
                      onClick={() => toggleSector(sector)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-accent cursor-pointer"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center",
                        selectedSectors.includes(sector)
                          ? "bg-primary border-primary"
                          : "border-border"
                      )}>
                        {selectedSectors.includes(sector) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{sector}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedSectors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSectors.map((sector) => (
                  <span
                    key={sector}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {sector}
                    <button
                      type="button"
                      onClick={() => toggleSector(sector)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Contract Number */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Contract Number
            </Label>
            <Input
              {...register('contractNumber')}
              placeholder="e.g. CN-2024-001"
              className="h-12 text-base rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Security Notice */}
          <div className="p-4 rounded-xl bg-accent border border-border">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Your data is secure</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All information is encrypted and stored securely following international data protection standards.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              disabled={isSubmitting}
              className="text-muted-foreground hover:text-foreground px-6 py-3 order-2 sm:order-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-gradient-to-r from-primary to-secondary-green text-primary-foreground px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 order-1 sm:order-2"
            >
              {isSubmitting ? 'Saving...' : 'Continue to Documents'}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}