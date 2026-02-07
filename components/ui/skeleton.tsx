function Skeleton({
  className,
  delay = 0,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { delay?: number }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer ${className || ''}`}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    />
  );
}

export { Skeleton };

// Payment-specific skeleton components
export function PaymentSkeleton() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-2 sm:p-4 font-sans">
      <div className="bg-white rounded-2xl sm:rounded-[32px] w-full max-w-[1100px] min-h-[600px] flex justify-between flex-col lg:flex-row p-4 sm:p-8 md:p-12 gap-6 sm:gap-8 md:gap-20 shadow-sm relative pb-16 animate-fade-in-up">
        {/* Left Column Skeleton - matches PaymentLayout structure */}
        <div className="flex flex-col justify-between w-full lg:max-w-[400px] shrink-0 order-2 lg:order-1">
          <div>
            {/* "You're paying:" text skeleton */}
            <Skeleton className="h-4 w-28 mb-4 sm:mb-6" delay={100} />
            
            {/* Large amount skeleton */}
            <Skeleton className="h-12 sm:h-16 lg:h-20 w-40 sm:w-48 lg:w-56 mb-6 sm:mb-10 rounded-lg" delay={200} />
            
            {/* Payment details card skeleton */}
            <div className="rounded-xl border border-gray-100 p-0 overflow-hidden mb-4 sm:mb-6">
              <div className="flex justify-between py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-50 bg-white">
                <Skeleton className="h-3 w-16" delay={300} />
                <Skeleton className="h-3 w-20" delay={350} />
              </div>
              <div className="flex justify-between py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-50 bg-white">
                <Skeleton className="h-3 w-12" delay={400} />
                <Skeleton className="h-3 w-32" delay={450} />
              </div>
              <div className="flex justify-between py-3 sm:py-4 px-3 sm:px-4 bg-white">
                <Skeleton className="h-3 w-20" delay={500} />
                <Skeleton className="h-3 w-24" delay={550} />
              </div>
            </div>

            {/* Transaction details card skeleton */}
            <div className="rounded-xl border border-gray-100 p-0 overflow-hidden">
              <div className="flex justify-between py-2 sm:py-3 px-3 sm:px-4 border-b border-gray-50 bg-gray-50">
                <Skeleton className="h-3 w-32" delay={600} />
              </div>
              <div className="flex justify-between py-2 sm:py-3 px-3 sm:px-4 border-b border-gray-50 bg-white">
                <Skeleton className="h-3 w-16" delay={650} />
                <Skeleton className="h-3 w-12" delay={700} />
              </div>
              <div className="flex justify-between py-2 sm:py-3 px-3 sm:px-4 bg-white">
                <Skeleton className="h-3 w-12" delay={750} />
                <Skeleton className="h-3 w-20" delay={800} />
              </div>
            </div>
          </div>

          {/* Footer skeleton */}
          <div className="mt-6 sm:mt-8 w-fit flex items-center gap-2 lg:relative absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:translate-x-0">
            <Skeleton className="h-3 w-16" delay={900} />
            <Skeleton className="h-3 w-20" delay={950} />
            <Skeleton className="h-3 w-8" delay={1000} />
          </div>
        </div>
        
        {/* Right Column Skeleton - matches method selection */}
        <div className="relative pt-2 order-1 lg:order-2 flex-1">
          {/* Header skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-36 mb-2" delay={150} />
            <Skeleton className="h-4 w-64" delay={200} />
          </div>

          {/* Payment method selection skeleton */}
          <div className="space-y-4 mb-8">
            <Skeleton className="h-4 w-28 mb-2" delay={250} />
            
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Card payment option skeleton */}
              <div className="flex items-center p-4 border-b border-gray-100">
                <Skeleton className="w-5 h-5 rounded-full mr-4" delay={300} />
                <Skeleton className="w-5 h-5 mr-3" delay={350} />
                <Skeleton className="h-4 w-24 flex-1" delay={400} />
                <div className="flex gap-1.5">
                  <Skeleton className="w-8 h-5 rounded" delay={450} />
                  <Skeleton className="w-8 h-5 rounded" delay={500} />
                  <Skeleton className="w-8 h-5 rounded" delay={550} />
                  <Skeleton className="w-8 h-5 rounded" delay={600} />
                </div>
              </div>
              
              {/* Bank transfer option skeleton */}
              <div className="flex items-center p-4">
                <Skeleton className="w-5 h-5 rounded-full mr-4" delay={650} />
                <Skeleton className="w-5 h-5 mr-3" delay={700} />
                <Skeleton className="h-4 w-32" delay={750} />
              </div>
            </div>
          </div>

          {/* Pay button skeleton */}
          <Skeleton className="h-12 w-full rounded-xl" delay={800} />
        </div>
      </div>
    </div>
  );
}

export function BankTransferSkeleton() {
  return (
    <div className="flex flex-col h-full max-w-[400px] mx-auto animate-fade-in-up">
      {/* Header with back button skeleton */}
      <div className="flex gap-3 items-center mb-6">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="h-5 w-40" />
      </div>
      
      {/* Transfer amount section skeleton */}
      <div className="text-center mb-6">
        <Skeleton className="h-5 w-48 mx-auto mb-1" />
        <Skeleton className="h-4 w-52 mx-auto" />
      </div>
      
      {/* Instructions skeleton (for USD payments) */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Bank details card skeleton */}
      <div className="bg-[#F9FAFB] rounded-xl p-6 pb-10 space-y-5 mb-8 relative border-2 border-dashed border-gray-200">
        {/* Bank name */}
        <div>
          <Skeleton className="h-3 w-20 mb-1" />
          <Skeleton className="h-5 w-32" />
        </div>
        
        {/* Account name */}
        <div>
          <Skeleton className="h-3 w-24 mb-1" />
          <Skeleton className="h-5 w-40" />
        </div>
        
        {/* Routing/Account number with copy button */}
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-3 w-28 mb-1" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="w-4 h-4 rounded" />
        </div>
        
        {/* Account number with copy button */}
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-3 w-28 mb-1" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="w-4 h-4 rounded" />
        </div>
        
        {/* Amount with copy button */}
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="w-4 h-4 rounded" />
        </div>
        
        {/* Transaction ID (for USD payments) */}
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-3 w-28 mb-1" />
            <Skeleton className="h-5 w-48" />
          </div>
          <Skeleton className="w-4 h-4 rounded" />
        </div>
      </div>
      
      {/* Sender information form skeleton */}
      <div className="mb-6 space-y-4">
        <Skeleton className="h-5 w-32 mb-3" />
        
        {/* Full name field */}
        <div>
          <Skeleton className="h-3 w-20 mb-1" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        
        {/* Phone field */}
        <div>
          <Skeleton className="h-3 w-32 mb-1" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
      
      {/* Action buttons skeleton */}
      <Skeleton className="h-12 w-full rounded-xl mb-4" />
      <Skeleton className="h-8 w-full rounded-xl" />
    </div>
  );
}

export function ConfirmationSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-fade-in-up">
      {/* Logo skeleton */}
      <div className="relative mb-6">
        <Skeleton className="w-24 h-24 rounded-full" />
      </div>
      
      {/* Title skeleton */}
      <Skeleton className="h-6 w-48 mb-6 rounded-lg" />
      
      {/* Loading spinner area skeleton */}
      <div className="flex flex-col items-center mb-6">
        <Skeleton className="w-8 h-8 rounded-full mb-4" />
        <Skeleton className="h-4 w-80 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      
      {/* Optional error message area skeleton */}
      <div className="w-full max-w-md">
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function SuccessSkeleton() {
  return (
    <div className="flex flex-col items-center shadow-2xl rounded-t-4xl mx-auto relative px-4 py-8 max-w-100 animate-fade-in-up">
      {/* Success icon skeleton */}
      <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
        <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
      </div>

      {/* Title section skeleton */}
      <div className="my-8 text-center">
        <Skeleton className="h-6 w-40 mb-2 mx-auto" />
        <Skeleton className="h-4 w-56 mx-auto" />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#E8EAED] mb-8" />

      {/* Amount section skeleton */}
      <div className="text-center mb-8">
        <Skeleton className="h-4 w-24 mb-2 mx-auto" />
        <Skeleton className="h-8 w-32 mx-auto" />
      </div>

      {/* Details grid skeleton */}
      <div className="w-full grid grid-cols-2 gap-4 gap-y-6 text-left mb-10 px-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-3 border border-[#F3F4F6] rounded-lg">
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Download button skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  );
}