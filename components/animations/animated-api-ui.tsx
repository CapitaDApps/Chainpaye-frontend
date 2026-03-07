"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export function AnimatedApiUi() {
  const [globalApiStep, setGlobalApiStep] = useState(0);

  // Global Payment API Animation Loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runGlobalApiSequence = () => {
      setGlobalApiStep(0);
      timeout = setTimeout(() => {
        setGlobalApiStep(1);
        timeout = setTimeout(() => {
          setGlobalApiStep(2);
          timeout = setTimeout(() => {
            setGlobalApiStep(3);
            timeout = setTimeout(() => {
              runGlobalApiSequence();
            }, 3000);
          }, 1000);
        }, 1500);
      }, 1500);
    };

    runGlobalApiSequence();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* API Key View */}
      <div
        className={`w-full p-5 transition-all duration-500 absolute ${
          globalApiStep < 2
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="text-sm font-medium text-gray-500 mb-2">
          API Key
        </div>
        <div className="border border-gray-600 rounded-lg p-3 flex items-center justify-between">
          <div
            className={`font-mono text-sm text-gray-600 transition-all duration-300 ${
              globalApiStep === 0 ? "blur-xs" : "blur-0"
            }`}
          >
            pk_live_51Msz...
          </div>
          {globalApiStep === 0 ? (
            <EyeOff className="w-4 h-4 text-gray-400" />
          ) : (
            <Eye className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Notifications View */}
      {/* Deposit 1: Bethy */}
      <div
        className={`absolute left-4 right-4 rounded-xl p-3 flex items-center gap-3 transition-all duration-500 ${
          globalApiStep >= 2
            ? "opacity-100 top-4"
            : "opacity-0 -top-full"
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-xs">
          B
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-500">
            From Bethy/Vendor
          </div>
          <div className="text-xs text-gray-400">22 April</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">
            +$10,000.00
          </div>
          <div className="text-[10px] text-green-500 font-medium">
            Successful
          </div>
        </div>
      </div>

      {/* Deposit 2: Chris */}
      <div
        className={`absolute left-4 right-4 rounded-xl p-3 flex items-center gap-3 transition-all duration-500 ${
          globalApiStep >= 3
            ? "opacity-100 top-24" // Moved down visually
            : globalApiStep === 2
              ? "opacity-0 top-4" // Starts from first position?
              : "opacity-0 -top-full"
        }`}
        style={{
          zIndex: globalApiStep >= 3 ? 10 : 0,
        }}
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-xs">
          C
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-500">From Chris/User</div>
          <div className="text-xs text-gray-400">24 April</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">
            +£245.00
          </div>
          <div className="text-[10px] text-green-500 font-medium">
            Successful
          </div>
        </div>
      </div>
    </>
  );
}
