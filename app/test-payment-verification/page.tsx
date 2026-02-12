"use client";

import { useState } from 'react';

export default function TestPaymentVerification() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const testAPI = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://www.toronet.org/api/payment/toro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
          'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
        },
        body: JSON.stringify({
          op: "recordfiattransaction",
          params: [
            { name: "currency", value: "USD" },
            { name: "txid", value: "test-transaction-id" },
            { name: "paymenttype", value: "bank" }
          ]
        }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      setResult({
        status: response.status,
        statusText: response.statusText,
        responseText,
        headers: Object.fromEntries(response.headers.entries())
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Payment Verification API</h1>
      
      <div className="mb-6">
        <button
          onClick={testAPI}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API Call'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded">
          <h3 className="font-bold mb-2">API Response:</h3>
          <pre className="whitespace-pre-wrap text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <h3 className="font-bold mb-2">Environment Variables:</h3>
        <p>NEXT_PUBLIC_TORONET_ADMIN: {process.env.NEXT_PUBLIC_TORONET_ADMIN ? '✓ Set' : '✗ Not set'}</p>
        <p>NEXT_PUBLIC_TORONET_ADMIN_PWD: {process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD ? '✓ Set' : '✗ Not set'}</p>
      </div>
    </div>
  );
}