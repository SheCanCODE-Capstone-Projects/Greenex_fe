'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Upload, CheckCircle2, Check, Building2, MapPin, Users, User, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';

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
  tinVat: z.string().regex(/^\d{9,10}$/, 'TIN must be 9-10 digits'),
  registrationDate: z.date({ message: 'Registration date is required' }),
  employees: z.string().regex(/^\d+$/, 'Must be a number').min(1, 'At least 1 employee'),
  contactPerson: z.string().min(3, 'Full name is required'),
  district: z.string().refine(val => rwandaDistricts.includes(val), {
    message: 'Please select a valid district in Rwanda',
  }),
});

type CompanyFormData = z.infer<typeof companySchema>;

export default function GreenexCompanyOnboarding() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [companyData, setCompanyData] = useState<CompanyFormData | null>(null);
  const [rdbFile, setRdbFile] = useState<File | null>(null);
  const [remaFile, setRemaFile] = useState<File | null>(null);
  const [taxFile, setTaxFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    mode: 'onChange',
  });

  const watchedDate = watch('registrationDate');

  const onCompanySubmit = (data: CompanyFormData) => {
    setCompanyData(data);
    setStep(2);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024 && file.type === 'application/pdf') {
      setter(file);
    } else {
      alert('Please upload a PDF file under 5MB');
    }
  };

  const onFinalSubmit = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      if (companyData) {
        formData.append('companyName', companyData.companyName);
        formData.append('tinVat', companyData.tinVat);
        formData.append('district', companyData.district);
        formData.append('registrationDate', companyData.registrationDate.toISOString());
        formData.append('employees', companyData.employees);
        formData.append('contactPerson', companyData.contactPerson);
      }
      if (rdbFile) formData.append('rdbCertificate', rdbFile);
      if (remaFile) formData.append('remaCertificate', remaFile);
      if (taxFile) formData.append('taxCertificate', taxFile);

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      // Success → Go to Step 3
      setStep(3);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Auto redirect after 8 seconds on success
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        router.push('/'); // Change to '/dashboard' when ready
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">

          {/* Progress Indicator (only show on steps 1 & 2) */}
          {step !== 3 && (
            <div className="flex justify-center mb-10">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all",
                  step >= 1 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600")}>
                  1
                </div>
                <div className={cn("w-24 h-1 rounded-full transition-all", step >= 2 ? "bg-green-600" : "bg-gray-300")} />
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all",
                  step >= 2 ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600")}>
                  2
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Company Info */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-28 h-28 bg-green-100 rounded-full mb-6">
                  <Building2 className="w-16 h-16 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Let's Get Started</h1>
                <p className="text-xl text-gray-600 mt-2">Tell Us About Your Company</p>
              </div>

              <form onSubmit={handleSubmit(onCompanySubmit)} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-green-100">
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-green-600" /> Official Company Name
                    </Label>
                    <Input {...register('companyName')} placeholder="e.g. Green Energy Rwanda Ltd" className="mt-2 h-12 text-lg" />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                  </div>

                  <div>
                    <Label className="text-lg font-semibold">Company TIN/VAT Number</Label>
                    <Input {...register('tinVat')} placeholder="123456789" className="mt-2 h-12 text-lg" />
                    {errors.tinVat && <p className="text-red-500 text-sm mt-1">{errors.tinVat.message}</p>}
                  </div>

                  <div>
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" /> District in Rwanda
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="w-full justify-between h-12 mt-2 text-lg">
                          {watch('district') || "Search district..."}
                          <MapPin className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search district..." />
                          <CommandEmpty>No district found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {rwandaDistricts.map((district) => (
                              <CommandItem
                                key={district}
                                onSelect={() => setValue('district', district, { shouldValidate: true })}
                              >
                                {district}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                  </div>

                  <div>
                    <Label className="text-lg font-semibold">Registration Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-12 mt-2 text-lg", !watchedDate && "text-muted-foreground")}>
                          <Calendar className="mr-2 h-5 w-5" />
                          {watchedDate ? format(watchedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={watchedDate}
                          onSelect={(date) => date && setValue('registrationDate', date, { shouldValidate: true })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.registrationDate && <p className="text-red-500 text-sm mt-1">Date is required</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-600" /> Number of Employees
                      </Label>
                      <Input {...register('employees')} placeholder="50" className="mt-2 h-12 text-lg" />
                      {errors.employees && <p className="text-red-500 text-sm mt-1">{errors.employees.message}</p>}
                    </div>
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <User className="w-5 h-5 text-green-600" /> Primary Contact Person
                      </Label>
                      <Input {...register('contactPerson')} placeholder="John Doe" className="mt-2 h-12 text-lg" />
                      {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-10">
                  <Button type="button" variant="outline" size="lg" onClick={() => window.history.back()}>
                    Back
                  </Button>
                  <Button type="submit" size="lg" disabled={!isValid} className="bg-green-600 hover:bg-green-700 text-white px-12 font-bold text-lg">
                    Next
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Document Upload */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-28 h-28 bg-green-100 rounded-full mb-6">
                  <FileText className="w-16 h-16 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Upload Your Certificates</h1>
                <p className="text-xl text-gray-600 mt-2">We need these to verify your company</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-green-100 space-y-8">
                {[
                  { id: "rdb", label: "RDB Certificate of Incorporation", setter: setRdbFile, file: rdbFile },
                  { id: "rema", label: "REMA Environmental License", setter: setRemaFile, file: remaFile },
                  { id: "tax", label: "Tax Clearance Certificate", setter: setTaxFile, file: taxFile },
                ].map(({ id, label, setter, file }) => (
                  <div key={id} className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 transition-all">
                    <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, setter)} className="hidden" id={id} />
                    <label htmlFor={id} className="cursor-pointer block">
                      {file ? (
                        <div className="flex items-center justify-center gap-3 text-green-600">
                          <CheckCircle2 className="w-10 h-10" />
                          <span className="font-semibold text-lg">{file.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 mx-auto text-green-500 mb-3" />
                          <p className="text-lg font-semibold">{label}</p>
                          <p className="text-sm text-gray-500">PDF, max 5MB</p>
                          <Button className="mt-4 bg-green-600 hover:bg-green-700">Upload</Button>
                        </>
                      )}
                    </label>
                  </div>
                ))}

                <div className="flex justify-between pt-6">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={onFinalSubmit}
                    disabled={isUploading}
                    className="bg-green-600 hover:bg-green-700 text-white px-12 font-bold text-lg"
                  >
                    {isUploading ? 'Submitting...' : 'Submit & Complete Registration'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success Screen */}
          {step === 3 && (
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-full max-w-2xl text-center animate-fade-in">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    GX
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                  Join Greenex
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                  Powering Rwanda's Green Future
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-lg mx-auto border border-green-100">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-14 h-14 text-green-600" strokeWidth={3} />
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    Account Created!
                  </h2>

                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Thank you! Your application has been submitted successfully.
                  </p>
                  <p className="text-lg font-medium text-green-600 mt-6">
                    We will review your documents and get back to you within{' '}
                    <span className="font-bold text-green-700">3–5 business days</span>.
                  </p>

                  <div className="mt-10 space-y-5">
                    <p className="text-sm text-gray-500">
                      Already have an account?{' '}
                      <Link href="/signin" className="text-green-600 font-semibold hover:underline">
                        Sign in
                      </Link>
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                      Back to home
                    </Link>
                  </div>
                </div>

                <p className="mt-10 text-sm text-gray-500">
                  Redirecting you to the homepage in 8 seconds...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}