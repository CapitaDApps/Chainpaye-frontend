import useSWR from 'swr';

interface VerificationParams {
  currency: string;
  txid: string;
  paymenttype: string;
}

interface ToronetVerificationResponse {
  success?: boolean;
  result?: boolean;
  status?: string;
  message?: string;
  error?: string;
  data?: any;
}

// Fetcher function for SWR
const verificationFetcher = async (url: string, params: VerificationParams): Promise<ToronetVerificationResponse> => {
  console.log('Verifying payment with Toronet API:', params);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
      'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
    },
    body: JSON.stringify({
      op: 'recordfiattransaction',
      params: [
        { name: 'currency', value: params.currency },
        { name: 'txid', value: params.txid },
        { name: 'paymenttype', value: params.paymenttype },
      ],
    }),
  });

  const result = await response.json();
  console.log('Toronet verification response:', result);

  // Check if payment was successful
  if (result.success === true || result.result === true || result.status === 'completed') {
    return { ...result, success: true };
  }

  // If not successful yet, throw error to trigger retry
  throw new Error(result.message || result.error || 'Payment not confirmed yet');
};

export function usePaymentVerification(
  params: VerificationParams | null,
  enabled: boolean
) {
  const shouldFetch = enabled && params !== null;
  
  // Use SWR with polling configuration
  const { data, error, isValidating } = useSWR(
    shouldFetch ? ['https://www.toronet.org/api/payment/toro/', params] : null,
    ([url, params]) => verificationFetcher(url, params),
    {
      refreshInterval: 5000, // Poll every 5 seconds
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryInterval: 5000, // Retry every 5 seconds on error
      dedupingInterval: 2000, // Prevent duplicate requests within 2 seconds
      onSuccess: (data) => {
        console.log('Payment verification successful:', data);
      },
      onError: (error) => {
        console.log('Payment verification pending:', error.message);
      },
    }
  );

  const isSuccess = data?.success === true || data?.result === true;

  return {
    data,
    error: error as Error | null,
    isSuccess,
    isValidating,
  };
}
