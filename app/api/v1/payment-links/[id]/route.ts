import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Payment link ID is required' },
        { status: 400 }
      );
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://chainpaye-backend.onrender.com';
    const url = `${apiBaseUrl}/api/v1/payment-links/${id}`;

    console.log('Fetching payment link from:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Payment link fetch failed:', data);
      
      // Return specific error messages based on status code
      let errorMessage = data.message || 'Failed to fetch payment link';
      
      if (response.status === 404) {
        errorMessage = 'Payment link not found';
      } else if (response.status === 410) {
        errorMessage = 'Payment link has expired';
      } else if (response.status === 400) {
        errorMessage = 'Invalid payment link';
      } else if (response.status === 500) {
        errorMessage = 'Payment service error';
      } else if (response.status === 503) {
        errorMessage = 'Payment service temporarily unavailable';
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage,
          statusCode: response.status,
          debug: data
        },
        { status: response.status }
      );
    }

    console.log('Payment link fetched successfully:', data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching payment link:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Internal server error',
        error: String(error)
      },
      { status: 500 }
    );
  }
}
