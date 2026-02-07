// Example of how to use lazy-loaded components with Suspense
// This is for reference - not currently used in the main payment flow

"use client";

import React, { Suspense } from 'react';
import { PaymentSkeleton } from '@/components/ui/skeleton';
import { 
  LazyBankTransfer, 
  LazyMethodSelection, 
  LazyConfirmation, 
  LazySuccessReceipt 
} from './lazy-components';

// Example usage with Suspense
export function LazyPaymentFlow() {
  return (
    <div>
      {/* Method Selection with lazy loading */}
      <Suspense fallback={<PaymentSkeleton />}>
        <LazyMethodSelection
          selectedMethod={null}
          onSelectMethod={() => {}}
          onPay={() => {}}
          paymentData={{} as any}
          availableMethods={{ card: true, bank: true }}
        />
      </Suspense>

      {/* Bank Transfer with lazy loading */}
      <Suspense fallback={<PaymentSkeleton />}>
        <LazyBankTransfer
          onSent={() => {}}
          onChangeMethod={() => {}}
          paymentData={{} as any}
          senderName=""
          setSenderName={() => {}}
          senderPhone=""
          setSenderPhone={() => {}}
          validationErrors={[]}
          isSubmitting={false}
        />
      </Suspense>

      {/* Confirmation with lazy loading */}
      <Suspense fallback={<PaymentSkeleton />}>
        <LazyConfirmation
          isVerifying={true}
          verificationError={null}
        />
      </Suspense>

      {/* Success Receipt with lazy loading */}
      <Suspense fallback={<PaymentSkeleton />}>
        <LazySuccessReceipt
          amount="$100"
          refNumber="123456"
          date="Today"
          method="Bank Transfer"
          senderName="John Doe"
        />
      </Suspense>
    </div>
  );
}

// Benefits of lazy loading:
// 1. Reduces initial bundle size
// 2. Components load only when needed
// 3. Better performance for users who don't complete the full flow
// 4. Automatic code splitting by Next.js

// To implement in the main payment page:
// 1. Import the lazy components instead of regular ones
// 2. Wrap each component usage with <Suspense fallback={<PaymentSkeleton />}>
// 3. The fallback component shows while the lazy component loads