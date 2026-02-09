import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get API base URL from environment variables
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // Log environment info for debugging
    console.log('Environment debug:', {
      NODE_ENV: process.env.NODE_ENV,
      API_BASE_URL,
      isProduction: process.env.NODE_ENV === 'production',
      vercelUrl: process.env.VERCEL_URL,
      vercelEnv: process.env.VERCEL_ENV
    });
    
    if (!API_BASE_URL) {
      console.error('NEXT_PUBLIC_API_BASE_URL is not configured');
      return NextResponse.json(
        { 
          success: false, 
          message: 'API configuration error: Backend URL not configured',
          debug: {
            NODE_ENV: process.env.NODE_ENV,
            hasApiBaseUrl: !!API_BASE_URL
          }
        },
        { status: 500 }
      );
    }
    
    // Handle localhost URL in production
    if (process.env.NODE_ENV === 'production' && API_BASE_URL.includes('localhost')) {
      console.error('Production environment detected but API_BASE_URL points to localhost');
      return NextResponse.json(
        { 
          success: false, 
          message: 'API configuration error: Cannot use localhost URL in production',
          debug: {
            API_BASE_URL,
            NODE_ENV: process.env.NODE_ENV
          }
        },
        { status: 500 }
      );
    }
    
    const apiUrl = `${API_BASE_URL}/api/v1/payment-links/${id}`;
    
    console.log('Proxying request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      // Add timeout for production
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    console.log('Backend response status:', response.status);
    console.log('Backend response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      return NextResponse.json(
        { 
          success: false, 
          message: `Backend error: ${response.status} - ${errorText}`,
          debug: {
            apiUrl,
            status: response.status,
            statusText: response.statusText
          }
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Backend response data:', JSON.stringify(data, null, 2));
    
    // Validate the response structure
    if (!data || typeof data !== 'object') {
      console.error('Invalid response format from backend');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid response format from backend',
          debug: { receivedData: data }
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in payment link proxy:', error);
    
    // Handle timeout errors
    if (error instanceof Error && error.name === 'TimeoutError') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Backend request timed out. Please try again.',
          debug: { error: 'timeout' }
        },
        { status: 504 }
      );
    }
    
    // Handle network errors
    if (error instanceof Error && error.message.includes('fetch')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Unable to connect to backend API. Please check your internet connection.',
          debug: { error: 'network_error', message: error.message }
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: `Proxy error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        debug: { 
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        }
      },
      { status: 500 }
    );
  }
}