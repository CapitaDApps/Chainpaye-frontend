import { useEffect, useState } from 'react';

interface VerificationParams {
  currency: string;
  txid: string;
  paymenttype: string;
}

interface VerificationResponse {
  success: boolean;
  data?: {
    status: string;
    amount?: number;
    currency?: string;
    [key: string]: any;
  };
  message?: string;
}

export function usePaymentVerification(
  params: VerificationParams | null,
  enabled: boolean
) {
  const [data, setData] = useState<VerificationResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!enabled || !params) {
      return;
    }

    let isMounted = true;
    let pollInterval: NodeJS.Timeout;

    const verifyPayment = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
        const url = `${apiBaseUrl}/api/v1/verify-payment`;

        console.log('Verifying payment with params:', params);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        const result = await response.json();
        console.log('Verification response:', result);

        if (!isMounted) return;

        if (result.success && result.data?.status === 'completed') {
          setData(result);
          setIsSuccess(true);
          setError(null);
          if (pollInterval) clearInterval(pollInterval);
        } else if (!response.ok) {
          throw new Error(result.message || 'Verification failed');
        }
      } catch (err) {
        console.error('Verification error:', err);
        if (isMounted) {
          setError(err as Error);
        }
      }
    };

    // Start polling every 5 seconds
    verifyPayment();
    pollInterval = setInterval(verifyPayment, 5000);

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [params, enabled]);

  return { data, error, isSuccess };
}
