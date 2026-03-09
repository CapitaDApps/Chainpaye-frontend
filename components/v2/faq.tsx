"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

const faqs = [
  {
    question: "How do I get started",
    answer:
      "Simply send a message to our WhatsApp AI agent to initiate a transaction. Our agent guides you through the process step-by-step. No app download required",
  },
  {
    question: "How fast are transactions really?",
    answer:
      "Most conversions settle in under 50 seconds, depending on network and banking conditions.",
  },
  {
    question: "What are the fees?",
    answer:
      `Cross-border: 1.5% fee (capped at ₦2,500) \n 
Crypto–Fiat: $0.75 per transaction\n
In-app transfers: Free`,
  },
  {
    question: "Do I need a wallet?",
    answer:
      "No, Chainpaye auto creates a wallet when you create an account. Support can be contacted for further assistance.",
  },
  {
    question: "How do exchange rates work?",
    answer: "We use real-time market data for our exchange rates",
  },
  {
    question: "What happens if a transaction fails?",
    answer:
      "Failed transactions are monitored and resolved or reversed based on settlement stage.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>();

  return (
    <section className="mt-14 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528] mb-4">
            Frequently Ask Questions
          </h2>
          <p className="text-[#5A5F73] text-base md:text-lg font-medium">
            Got any more questions? Click{" "}
            <Link
              href="mailto:business@chainpaye.com"
              className="text-[#003DFF] underline"
            >
              here
            </Link>
            to message support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={clsx(
                "group shadow-sm bg-white transition-all duration-300",
                openIndex === index
                  ? "shadow-xl border-transparent"
                  : "hover:border-gray-200",
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center gap-3 md:p-6 p-3 text-left"
              >
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-[#52BD95]" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#1B1139]" />
                  )}
                </div>
                <span className="text-lg font-medium text-[#1B1139]">
                  {faq.question}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-[#5A5F73] text-base leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
