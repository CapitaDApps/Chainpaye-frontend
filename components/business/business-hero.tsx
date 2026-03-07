"use client";

import { Phone } from "lucide-react";
import React from 'react';

export function BusinessHero() {
  return (
    <section className="relative px-4 pt-12 pb-24 md:pt-24 min-h-[600px] flex items-center bg-[#F8F9FA]">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20 max-w-7xl">
        
        {/* Left Side: Copy */}
        <div className="flex-1 md:pr-12 text-center md:text-left">
          <h1 className="text-4xl md:text-[48px] md:leading-[1.1] font-semibold text-[#111528] mb-6">
            Transforming cross-border payments in Africa
          </h1>
          <p className="text-lg text-[#5A5F73] mb-8 font-medium">
            Receive payments from customers worldwide and get your money instantly in your local currency. Simple setup, no tools to learn.
          </p>
          <div className="flex justify-center md:justify-start">
            <a 
              href="https://calendly.com/chainpaye" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#003DFF] text-white px-8 py-3.5 rounded-lg font-medium transition-colors hover:bg-blue-700 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5" />
              Book a call
            </a>
          </div>
        </div>

        {/* Right Side: Code Block */}
        <div className="flex-1 w-full max-w-xl">
          <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-6 md:p-8 font-mono text-xs md:text-sm overflow-x-auto relative min-h-[400px]">
            {/* Syntax Highlighting Fake */}
            <div className="flex flex-col gap-1.5 text-[#5A5F73]">
              <div>
                <span className="text-gray-400 w-6 inline-block">1</span>
                <span className="text-[#8957E5]">const</span>{" "}
                <span className="text-[#111528]">Chainpaye</span> ={" "}
                <span className="text-[#003DFF]">new</span>{" "}
                <span className="text-[#003DFF]">ChainpayeWidget</span>({`{`}
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">2</span>
                <span className="ml-4 text-[#D97706]">env</span>:{" "}
                <span className="text-[#22C55E]">&quot;production&quot;</span>,
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">3</span>
                <span className="ml-4 text-[#D97706]">action</span>:{" "}
                <span className="text-[#22C55E]">&quot;send_payment&quot;</span>,
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">4</span>
                <span className="ml-4 text-[#D97706]">fromCurrency</span>:{" "}
                <span className="text-[#22C55E]">&quot;USD&quot;</span>,
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">5</span>
                <span className="ml-4 text-[#D97706]">toCurrency</span>:{" "}
                <span className="text-[#22C55E]">&quot;NGN&quot;</span>,
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">6</span>
                <span className="ml-4 text-[#D97706]">apiKey</span>:{" "}
                <span className="text-[#22C55E]">&quot;pk_live_891J...kSX2xPqA902I7x&quot;</span>,
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">7</span>
                {`},`}
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">8</span>
                <span className="text-[#D97706]">callback</span>: {`{`}
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">9</span>
                <span className="ml-4 text-[#D97706]">onStatus</span>: (status) ={`>`} {`{`}
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">10</span>
                <span className="ml-8 text-[#D97706]">console</span>.
                <span className="text-[#003DFF]">log</span>(
                <span className="text-[#22C55E]">&quot;Payment status: &quot;</span>, status);
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">11</span>
                <span className="ml-4">{`}`}</span>
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">12</span>
                {`}`}
              </div>
              <div>
                <span className="text-gray-400 w-6 inline-block">13</span>
                {`});`}
              </div>
              <div className="mt-4">
                <span className="text-gray-400 w-6 inline-block">14</span>
                <span className="text-[#111528]">Chainpaye</span>.
                <span className="text-[#003DFF]">open</span>();
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
