import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ transactionId: string }> }
) {
  try {
    const { transactionId } = await params;
    const body = await request.json();
    
    console.log('Recording transaction:', transactionId);
    console.log('Transaction data:', body);
    
    // Get admin credentials from headers
    const admin = request.headers.get('admin');
    const adminpwd = request.headers.get('adminpwd');
    
    // Replace this URL with your actual API endpoint
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    const apiUrl = `${API_BASE_URL}/api/v1/record-transaction/${transactionId}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin': admin || '',
        'adminpwd': adminpwd || '',
      },
      body: JSON.stringify(body),
    });

    console.log('Backend record response status:', response.status);

    const responseText = await response.text();
    console.log('Backend record response:', responseText);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      data = { message: responseText };
    }

    if (!response.ok) {
      // Check if it's an 'already recorded' error
      if (responseText.toLowerCase().includes('already recorded') || 
          data.message?.toLowerCase().includes('already recorded')) {
        console.log('Transaction already recorded, returning success');
        return NextResponse.json(
          { success: true, message: 'Transaction already recorded', data },
          { status: 200 }
        );
      }
      
      console.error('Backend record error response:', responseText);
      return NextResponse.json(
        { success: false, message: `Backend error: ${response.status}`, error: responseText, data },
        { status: response.status }
      );
    }

    console.log('Backend record response data:', data);
    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    console.error('Error in transaction record proxy:', error);
    return NextResponse.json(
      { success: false, message: `Proxy error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}