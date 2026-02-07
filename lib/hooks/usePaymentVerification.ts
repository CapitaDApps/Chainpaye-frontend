import useSWR from 'swr';

interface PaymentVerificationParams {
  currency: string;
  txid: string;
  paymenttype: string;
}

interface PaymentVerificationResponse {
  success?: boolean;
  status?: string;
  result?: boolean;
  error?: string;
  responseText?: string;
  // Add other response fields as needed
}

const fetcher = async (url: string, params: PaymentVerificationParams): Promise<PaymentVerificationResponse> => {
  console.log('Making payment verification request:', { url, params });
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
        'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
      },
      body: JSON.stringify({
        op: "recordfiattransaction",
        params: [
          { name: "currency", value: params.currency },
          { name: "txid", value: params.txid },
          { name: "paymenttype", value: params.paymenttype }
        ]
      }),
    });

    console.log('Payment verification response status:', response.status);
    
    // Get response text for better error handling
    const responseText = await response.text();
    console.log('Payment verification response text:', responseText);

    if (!response.ok) {
      console.error('Payment verification failed:', {
        status: response.status,
        statusText: response.statusText,
        responseText
      });
      
      // Don't throw error - return failed response to allow SWR retries
      return {
        success: false,
        status: 'failed',
        error: `HTTP ${response.status}: ${response.statusText}`,
        responseText
      };
    }

    // Try to parse JSON
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      return {
        success: false,
        status: 'failed',
        error: 'Invalid JSON response'
      };
    }
    
    console.log('Payment verification response:', result);
    return result;
    
  } catch (networkError) {
    console.error('Network error during payment verification:', networkError);
    return {
      success: false,
      status: 'failed',
      error: networkError instanceof Error ? networkError.message : 'Network error'
    };
  }
};

export function usePaymentVerification(
  params: PaymentVerificationParams | null,
  shouldPoll: boolean = false
) {
  const { data, error, isLoading } = useSWR(
    shouldPoll && params ? ['https://www.toronet.org/api/payment/toro/', params] : null,
    ([url, params]) => fetcher(url, params),
    {
      refreshInterval: shouldPoll ? 3000 : 0, // Poll every 3 seconds when active
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false, // Handle errors in fetcher instead
      dedupingInterval: 2000, // Prevent duplicate requests
    }
  );

  // Check for success in multiple possible response formats
  const isSuccess = data?.success === true || 
                   data?.status === 'success' || 
                   data?.result === true ||
                   (data && !data.error && data.status !== 'failed');

  return {
    data,
    error,
    isLoading,
    isSuccess,
  };
}
