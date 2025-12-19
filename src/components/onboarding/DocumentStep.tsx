'use client'
import { ArrowLeft, ArrowRight, FileCheck, FileText, Truck, Sparkles, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUpload } from './FileUpload';
import { toast } from 'react-toastify';

interface DocumentStepProps {
  kigaliContract: File | null;
  setKigaliContract: (file: File | null) => void;
  remaDocument: File | null;
  setRemaDocument: (file: File | null) => void;
  rdbDocument: File | null;
  setRdbDocument: (file: File | null) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function DocumentStep({
  kigaliContract,
  setKigaliContract,
  remaDocument,
  setRemaDocument,
  rdbDocument,
  setRdbDocument,
  onBack,
  onSubmit,
  isSubmitting
}: DocumentStepProps) {
  const handleSubmit = () => {
    if (!kigaliContract) {
      toast.error('Umujyi wa Kigali contract is required');
      return;
    }
    onSubmit();
  };

  return (
    <div className="w-full">
      <div className="text-center lg:text-left mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Document Submission
        </h2>
        <p className="text-base text-muted-foreground">
          Upload your necessary operational and registration documents.
        </p>
      </div>

      <div className="bg-card rounded-2xl shadow-xl border border-border p-6">
        <div className="space-y-4">
          <FileUpload
            label="Umujyi wa Kigali Contract"
            description="City of Kigali waste management contract (Required)"
            file={kigaliContract}
            onFileChange={setKigaliContract}
            icon={<FileCheck className="w-6 h-6" />}
            required
          />

          <FileUpload
            label="REMA Environmental License"
            description="Rwanda Environment Management Authority license (Optional)"
            file={remaDocument}
            onFileChange={setRemaDocument}
            icon={<Truck className="w-6 h-6" />}
          />

          <FileUpload
            label="RDB Certificate of Incorporation"
            description="Rwanda Development Board registration (Optional)"
            file={rdbDocument}
            onFileChange={setRdbDocument}
            icon={<FileText className="w-6 h-6" />}
          />
        </div>

        {/* Tips */}
        <div className="p-3 rounded-xl bg-accent border border-border mt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Tips for Fast Approval</p>
              <p className="text-xs text-muted-foreground">
                The Kigali contract is mandatory. Ensure all PDFs are clear and under 5MB.
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
            className="text-muted-foreground hover:text-foreground px-4 py-2 order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!kigaliContract || isSubmitting}
            className="bg-gradient-to-r from-primary to-secondary-green text-primary-foreground px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 order-1 sm:order-2"
          >
            {isSubmitting ? (
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
  );
}