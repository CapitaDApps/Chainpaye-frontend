import { NextRequest, NextResponse } from 'next/server';

/**
 * Backend API Proxy Route
 * 
 * This route acts as a secure proxy between the frontend and your backend API.
 * 
 * WHY THIS EXISTS:
 * - Keeps admin credentials server-side only (never exposed to browser)
 * - Frontend calls this route, which then calls your backend with credentials
 * - Credentials are stored without NEXT_PUBLIC_ prefix, so they stay on the server
 * 
 * FLOW:
 * Browser → /api/proxy/toronet → Your Backend API (with credentials) → Response back to browser
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, method = 'POST', data } = body;
    
    // Get credentials from server-side environment variables
    // These are NOT prefixed with NEXT_PUBLIC_, so they never reach the browser
    const admin = process.env.TORONET_ADMIN;
    const adminpwd = process.env.TORONET_ADMIN_PWD;
    
    if (!admin || !adminpwd) {
      console.error('Missing Toronet credentials in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Validate that the endpoint is from your backend (security check)
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://chainpaye-backend.onrender.com';
    if (!endpoint.startsWith(apiBaseUrl)) {
      console.error('Invalid endpoint:', endpoint);
      return NextResponse.json(
        { error: 'Invalid endpoint' },
        { status: 400 }
      );
    }
    
    console.log(`[Proxy] ${method} request to:`, endpoint);
    
    // Make the actual request to your backend with credentials
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'admin': admin,  // Credentials added here, server-side only
        'adminpwd': adminpwd,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    const result = await response.json();
    
    // Return the backend response to the frontend
    return NextResponse.json(result, { status: response.status });
    
  } catch (error) {
    console.error('[Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

/**
 * Handle GET requests (for status checks)
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint');
    
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint parameter required' },
        { status: 400 }
      );
    }
    
    // Get server-side credentials
    const admin = process.env.TORONET_ADMIN;
    const adminpwd = process.env.TORONET_ADMIN_PWD;
    
    if (!admin || !adminpwd) {
      console.error('Missing Toronet credentials in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Validate endpoint
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://chainpaye-backend.onrender.com';
    if (!endpoint.startsWith(apiBaseUrl)) {
      console.error('Invalid endpoint:', endpoint);
      return NextResponse.json(
        { error: 'Invalid endpoint' },
        { status: 400 }
      );
    }
    
    console.log('[Proxy] GET request to:', endpoint);
    
    // Make request with credentials
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'admin': admin,
        'adminpwd': adminpwd,
      },
    });
    
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
    
  } catch (error) {
    console.error('[Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
