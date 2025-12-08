// 'use client';

// import { useState } from 'react';
// import { Upload, FileText, CheckCircle2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { cn } from '@/lib/utils';

// interface UploadedFile {
//   name: string;
//   size: number;
//   type: string;
// }

// type DocumentKey = 'rd8' | 'rema' | 'environmental' | 'tax';

// export default function UploadCertificates() {
//   const [files, setFiles] = useState<Record<DocumentKey, UploadedFile | null>>({
//     rd8: null,
//     rema: null,
//     environmental: null,
//     tax: null,
//   });

//   const handleFileChange = (key: DocumentKey, file: File | null) => {
//     if (!file) {
//       setFiles(prev => ({ ...prev, [key]: null }));
//       return;
//     }

//     // Validate file type and size (max 5MB)
//     if (!file.type.includes('pdf') && !file.type.includes('image')) {
//       alert('Only PDF and images are allowed');
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       alert('File size must be less than 5MB');
//       return;
//     }

//     setFiles(prev => ({
//       ...prev,
//       [key]: {
//         name: file.name,
//         size: file.size,
//         type: file.type,
//       },
//     }));
//   };

//   const allUploaded = Object.values(files).every(file => file !== null);

//   const onSubmit = () => {
//     if (!allUploaded) return;
//     console.log('All documents uploaded:', files);
//     alert('All certificates uploaded successfully! Submitting...');
//     // Proceed to dashboard or final step
//   };

//   const DocumentUpload = ({ 
//     label, 
//     keyName, 
//     subtitle 
//   }: { 
//     label: string; 
//     keyName: DocumentKey; 
//     subtitle?: string;
//   }) => {
//     const uploaded = files[keyName];

//     return (
//       <div className="group">
//         <Label className="text-foreground/90 text-base">{label}</Label>
//         <div className="mt-3 flex items-center justify-between bg-card border-2 border-dashed border-border/50 rounded-xl p-5 transition-all hover:border-primary-green/50">
//           <div className="flex items-center gap-4">
//             {uploaded ? (
//               <>
//                 <CheckCircle2 className="w-10 h-10 text-secondary-green" />
//                 <div>
//                   <p className="font-medium text-foreground">{uploaded.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {(uploaded.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <FileText className="w-10 h-10 text-primary-green/60" />
//                 <div>
//                   <p className="font-medium text-foreground">No file chosen</p>
//                   {subtitle && (
//                     <p className="text-sm text-muted-foreground">{subtitle}</p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           <label className="cursor-pointer">
//             <input
//               type="file"
//               accept=".pdf,image/*"
//               className="hidden"
//               onChange={(e) => handleFileChange(keyName, e.target.files?.[0] || null)}
//             />
//             <Button
//               size="sm"
//               className={cn(
//                 "bg-primary-green hover:bg-secondary-green text-white font-medium",
//                 uploaded && "bg-secondary-green"
//               )}
//             >
//               <Upload className="w-4 h-4 mr-2" />
//               {uploaded ? 'Change' : 'Upload'}
//             </Button>
//           </label>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-2xl">
//           {/* Animated Illustration */}
//           <div className="flex justify-center mb-10 animate-fade-in-up">
//             <div className="relative">
//               <div className="animate-float">
//                 <div className="bg-primary-green/10 rounded-full w-56 h-56 flex items-center justify-center">
//                   <div className="bg-primary-green/20 rounded-full w-44 h-44 flex items-center justify-center relative">
//                     <svg width="160" height="180" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       {/* Cloud */}
//                       <ellipse cx="80" cy="90" rx="60" ry="40" fill="#388E3C" opacity="0.15"/>
//                       <ellipse cx="80" cy="80" rx="50" ry="30" fill="#388E3C" opacity="0.25"/>
                      
//                       {/* Document with checkmarks */}
//                       <rect x="50" y="60" width="60" height="80" rx="8" fill="#388E3C"/>
//                       <rect x="55" y="65" width="50" height="70" fill="white"/>
//                       <path d="M65 85 L75 95 L95 75" stroke="#388E3C" strokeWidth="4" fill="none"/>
//                       <path d="M65 105 L73 113" stroke="#388E3C" strokeWidth="3" fill="none"/>
//                       <path d="M80 105 L88 113" stroke="#388E3C" strokeWidth="3" fill="none"/>
                      
//                       {/* Floating checkmarks */}
//                       <circle cx="40" cy="50" r="12" fill="#25b86a"/>
//                       <path d="M35 50 L39 54 L45 48" stroke="white" strokeWidth="3" fill="none"/>
//                       <circle cx="120" cy="120" r="10" fill="#25b86a"/>
//                       <path d="M116 120 L119 123 L124 118" stroke="white" strokeWidth="2.5" fill="none"/>
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Title */}
//           <div className="text-center mb-10 animate-fade-in-up animation-delay-200">
//             <h1 className="text-3xl md:text-4xl font-bold text-primary-green dark:text-secondary-green">
//               Upload Your Certificates
//             </h1>
//           </div>

//           {/* Upload Form */}
//           <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-xl">
//             <div className="p-8 space-y-8">
//               <DocumentUpload
//                 keyName="rd8"
//                 label="RD8 Certificate of Incorporation"
//               />

//               <DocumentUpload
//                 keyName="rema"
//                 label="REMA Certificate of Incorporation"
//                 subtitle="PDF, max. 5MB"
//               />

//               <DocumentUpload
//                 keyName="environmental"
//                 label="REMA Environmental License"
//               />

//               <DocumentUpload
//                 keyName="tax"
//                 label="Tax Clearance Certificate"
//                 subtitle="PDF, max. 5MB"
//               />
//             </div>

//             {/* Progress indicator */}
//             <div className="px-8 pb-6">
//               <div className="flex justify-between text-sm text-muted-foreground mb-2">
//                 <span>Completion</span>
//                 <span>{Object.values(files).filter(Boolean).length}/4 documents</span>
//               </div>
//               <div className="w-full bg-border/30 rounded-full h-3">
//                 <div
//                   className="bg-gradient-to-r from-primary-green to-secondary-green h-3 rounded-full transition-all duration-500"
//                   style={{ width: `${(Object.values(files).filter(Boolean).length / 4) * 100}%` }}
//                 />
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-between p-8 pt-4 border-t border-border/30">
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="lg"
//                 className="px-8"
//                 onClick={() => window.history.back()}
//               >
//                 Back
//               </Button>

//               <Button
//                 size="lg"
//                 className="px-12 bg-primary-green hover:bg-secondary-green text-white font-bold text-lg"
//                 disabled={!allUploaded}
//                 onClick={onSubmit}
//               >
//                 {allUploaded ? 'Submit Application' : 'Complete All Uploads'}
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </>
//   );
// }


'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

type DocumentKey = 'rd8' | 'rema' | 'environmental' | 'tax';

export default function UploadCertificates() {
  const [files, setFiles] = useState<Record<DocumentKey, UploadedFile | null>>({
    rd8: null,
    rema: null,
    environmental: null,
    tax: null,
  });

  const handleFileChange = (key: DocumentKey, file: File | null) => {
    if (!file) {
      setFiles(prev => ({ ...prev, [key]: null }));
      return;
    }

    // Validate file type (PDF or image)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, or PNG files are allowed');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setFiles(prev => ({
      ...prev,
      [key]: {
        name: file.name,
        size: file.size,
        type: file.type,
      },
    }));
  };

  const allUploaded = Object.values(files).every(file => file !== null);

  const onSubmit = () => {
    if (!allUploaded) return;
    console.log('All documents uploaded:', files);
    alert('Application submitted successfully!');
    // Redirect to dashboard or success page
    // router.push('/dashboard');
  };

  // Properly defined nested component
  function DocumentUpload({ 
    label, 
    keyName, 
    subtitle 
  }: { 
    label: string; 
    keyName: DocumentKey; 
    subtitle?: string;
  }) {
    const uploaded = files[keyName];

    return (
      <div className="group">
        <Label className="text-foreground/90 text-base font-medium">{label}</Label>
        <div className="mt-3 flex items-center justify-between bg-card border-2 border-dashed border-border/50 rounded-xl p-5 transition-all hover:border-primary-green/50 group-hover:shadow-md">
          <div className="flex items-center gap-4">
            {uploaded ? (
              <>
                <CheckCircle2 className="w-10 h-10 text-secondary-green animate-scale-in" />
                <div>
                  <p className="font-medium text-foreground truncate max-w-xs">{uploaded.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploaded.size / 1024 / 1024).toFixed(2)} MB • {uploaded.type.split('/')[1].toUpperCase()}
                  </p>
                </div>
              </>
            ) : (
              <>
                <FileText className="w-10 h-10 text-primary-green/60" />
                <div>
                  <p className="font-medium text-foreground">No file chosen</p>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => handleFileChange(keyName, e.target.files?.[0] || null)}
            />
            <Button
              size="sm"
              className={cn(
                "bg-primary-green hover:bg-secondary-green text-white font-medium transition-all",
                uploaded && "bg-secondary-green hover:bg-primary-green"
              )}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploaded ? 'Change' : 'Upload'}
            </Button>
          </label>
        </div>
      </div>
    );
  }

  const uploadedCount = Object.values(files).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Animated Illustration */}
        <div className="flex justify-center mb-10 animate-fade-in-up">
          <div className="relative">
            <div className="animate-float">
              <div className="bg-primary-green/10 rounded-full w-56 h-56 flex items-center justify-center">
                <div className="bg-primary-green/20 rounded-full w-44 h-44 flex items-center justify-center relative">
                  <svg width="160" height="180" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="80" cy="90" rx="60" ry="40" fill="#388E3C" opacity="0.15"/>
                    <ellipse cx="80" cy="80" rx="50" ry="30" fill="#388E3C" opacity="0.25"/>
                    <rect x="50" y="60" width="60" height="80" rx="8" fill="#388E3C"/>
                    <rect x="55" y="65" width="50" height="70" fill="white"/>
                    <path d="M65 85 L75 95 L95 75" stroke="#388E3C" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M65 105 L73 113" stroke="#388E3C" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <path d="M80 105 L88 113" stroke="#388E3C" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <circle cx="40" cy="50" r="12" fill="#25b86a"/>
                    <path d="M35 50 L39 54 L45 48" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="120" cy="120" r="10" fill="#25b86a"/>
                    <path d="M116 120 L119 123 L124 118" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-green dark:text-secondary-green">
            Upload Your Certificates
          </h1>
        </div>

        {/* Upload Form */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-xl">
          <div className="p-8 space-y-8">
            <DocumentUpload keyName="rd8" label="RD8 Certificate of Incorporation" />
            <DocumentUpload keyName="rema" label="REMA Certificate of Incorporation" subtitle="PDF, max. 5MB" />
            <DocumentUpload keyName="environmental" label="REMA Environmental License" />
            <DocumentUpload keyName="tax" label="Tax Clearance Certificate" subtitle="PDF, max. 5MB" />
          </div>

          {/* Progress Bar */}
          <div className="px-8 pb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Upload Progress</span>
              <span className="font-medium">{uploadedCount} of 4 documents</span>
            </div>
            <div className="w-full bg-border/30 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary-green to-secondary-green h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(uploadedCount / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between p-8 pt-0 border-t border-border/30">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="px-8"
              onClick={() => window.history.back()}
            >
              Back
            </Button>

            <Button
              size="lg"
              className="px-12 bg-primary-green hover:bg-secondary-green text-white font-bold text-lg shadow-lg"
              disabled={!allUploaded}
              onClick={onSubmit}
            >
              {allUploaded ? 'Submit Application' : `Complete All Uploads (${uploadedCount}/4)`}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}