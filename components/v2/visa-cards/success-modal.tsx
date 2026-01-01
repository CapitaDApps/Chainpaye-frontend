"use client";

import HomeIcon from "@/components/home-icon";
import { X } from "lucide-react";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1A1A1E] rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center justify-center py-8">
          <h3 className="text-xl font-bold text-[#111528] dark:text-white mb-2">
            <span className="text-4xl mb-6">🎉</span>Request Received!
          </h3>

          <p className="text-xl font-medium text-[#5A5F73] dark:text-[#BDBFC7] mb-8">
            We have received your request. Check your email for next steps.
          </p>

          <Link
            href="/"
            className="bg-[#003DFF] text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors w-full flex items-center justify-center gap-2"
          >
            Go Back to Home <HomeIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
