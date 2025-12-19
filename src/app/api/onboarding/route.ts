import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const companyData = {
      companyName: formData.get('companyName'),
      phoneNumber: formData.get('phoneNumber'),
      sectors: JSON.parse(formData.get('sectors') as string || '[]'),
    };

    const files = {
      kigaliContract: formData.get('kigaliContract') as File,
      rdbCertificate: formData.get('rdbCertificate') as File,
      remaCertificate: formData.get('remaCertificate') as File,
    };



    console.log('Company Data:', companyData);
    console.log('Files:', {
      kigali: files.kigaliContract?.name,
      rdb: files.rdbCertificate?.name,
      rema: files.remaCertificate?.name,
    });

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Company registered successfully',
      companyId: Math.random().toString(36).substring(7),
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process registration' },
      { status: 500 }
    );
  }
}
