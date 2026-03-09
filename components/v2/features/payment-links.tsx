"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function PaymentLinksFeature() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const runSequence = () => {
      setStep(1);
      timeout = setTimeout(() => {
        setStep(2);
        timeout = setTimeout(() => {
          setStep(3);
          timeout = setTimeout(() => {
            setStep(0);
            timeout = setTimeout(() => {
              runSequence();
            }, 500);
          }, 2000);
        }, 1000);
      }, 1000);
    };
    runSequence();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="md:p-8 rounded-4xl flex flex-col justify-between">
      <div className="h-44 bg-[#F5F7FA] rounded-t-xl mb-6 relative overflow-hidden flex items-center justify-center">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            step >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/assets/bg.jpg"
            alt="Chat Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Bubble 1 (Green / Right) */}
        <div
          className={`absolute top-4 right-4 max-w-[70%] transition-all duration-500 transform ${
            step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Image
            src="/assets/Bubble.png"
            alt="Message 1"
            width={200}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Avatar (Left) */}
        <div
          className={`absolute bottom-4 left-4 max-w-[70%] transition-all duration-500 transform ${
            step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Image
            src="/assets/avatar.png"
            alt="Reply"
            width={200}
            height={60}
            className="object-contain"
          />
        </div>
      </div>
      <div>
        <h3 className="font-medium text-base mb-2 text-[#111528]">
          Payment Links
        </h3>
        <p className="text-base font-normal text-[#5A5F73]">
          Generate shareable payment links for easy money collection via
          WhatsApp.
        </p>
      </div>
    </div>
  );
}
