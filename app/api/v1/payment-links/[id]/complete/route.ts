import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    console.log('Saving transaction result for payment ID:', id);
    console.log('Transaction data:', body);
    
    // Replace this URL with your actual API endpoint
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const apiUrl = `${API_BASE_URL}/api/v1/payment-links/${id}/complete`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    console.log('Backend save response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend save error response:', errorText);
      return NextResponse.json(
        { success: false, message: `Backend error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Backend save response data:', data);
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in transaction save proxy:', error);
    return NextResponse.json(
      { success: false, message: `Proxy error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}