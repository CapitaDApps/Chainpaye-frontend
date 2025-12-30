import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsappPrompt() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
          {/* Phone Mockup Placeholder */}
          <div className="relative w-full max-w-sm mx-auto md:mx-0">
            <div className="relative aspect-[9/19] rounded-[3rem] border-8 border-zinc-900 bg-zinc-900 overflow-hidden shadow-2xl">
              {/* Screen Content */}
              <div className="h-full w-full bg-white dark:bg-zinc-900 flex flex-col">
                {/* Header */}
                <div className="bg-[#075e54] p-4 text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  <span className="font-semibold">Chainpaye Bot</span>
                </div>
                {/* Chat area */}
                <div className="flex-1 p-4 bg-[#ece5dd] dark:bg-zinc-800 space-y-4 overflow-hidden">
                  <div className="bg-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[80%] text-sm shadow-sm dark:bg-zinc-700 dark:text-zinc-200">
                    Hi! 👋 I can help you send money.
                  </div>
                  <div className="bg-[#dcf8c6] p-3 rounded-tl-lg rounded-bl-lg rounded-br-lg max-w-[80%] ml-auto text-sm shadow-sm dark:bg-blue-600 dark:text-white">
                    Send $50 to @john
                  </div>
                  <div className="bg-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[80%] text-sm shadow-sm dark:bg-zinc-700 dark:text-zinc-200">
                    Transaction confirmed! ✅
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl mb-6">
              Send and receive Money <br /> instantly on Whatsapp
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto md:mx-0">
              With Chainpaye, anyone can send or receive money globally and
              withdraw to their local bank or mobile money — all inside a
              WhatsApp chat.
            </p>
            <Link
              href="https://wa.me/"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-white font-semibold transition-colors hover:bg-blue-700"
            >
              <MessageCircle className="h-5 w-5" />
              Start on WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
