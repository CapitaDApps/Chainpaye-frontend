import Image from "next/image";
import { MessageSquare, Wallet, Globe2 } from "lucide-react";

const steps = [
  {
    kicker: "Step 1",
    title: "Start a WhatsApp Chat",
    description:
      "Click here to get directed to our WhatsApp AI agent. Our AI Agent greets you instantly — no app download required. Verify your identity securely inside WhatsApp.",
    icon: MessageSquare,
    imageParams: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    kicker: "Step 2",
    title: "Create Your Wallet",
    description:
      "Follow the prompts to create your Chainpaye wallet in seconds. Set your 4-digit PIN for secure transactions. Your wallet is instantly ready for global payments.",
    icon: Wallet,
    imageParams: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    kicker: "Step 3",
    title: "Start sending & receiving payments globally",
    description:
      "Chat, send, and receive money directly inside WhatsApp. Pay or get paid in multiple currencies — USD, EUR, GBP, NGN, and more. Track every transaction in real-time.",
    icon: Globe2,
    imageParams: "bg-green-50 dark:bg-green-900/20",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            Get started with Chainpaye in <br />
            Three Simple Steps
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Fast, transparent, and secure payments in minutes.
          </p>
        </div>

        <div className="flex flex-col gap-24 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-6">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {step.kicker}
                </span>
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {step.title}
                </h3>

                <ul className="space-y-4 text-lg text-zinc-600 dark:text-zinc-400">
                  {/* Simulating list items based on description for better visual hierarchy */}
                  {step.description.split(". ").map(
                    (sentence, i) =>
                      sentence && (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 text-xs font-bold">
                            {i + 1}
                          </span>
                          <span>{sentence}.</span>
                        </li>
                      )
                  )}
                </ul>
              </div>

              {/* Image Side (Placeholder) */}
              <div
                className={`flex-1 w-full aspect-[4/3] rounded-3xl ${step.imageParams} flex items-center justify-center relative overflow-hidden border border-zinc-100 dark:border-zinc-800`}
              >
                <step.icon className="w-32 h-32 text-zinc-300 dark:text-zinc-700 opacity-50" />
                {/* This would be the actual image/mockup */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-black/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
