import Link from "next/link";
import { Check, ArrowRight, Settings, Code2, Clock } from "lucide-react";

export function DeveloperSection() {
  return (
    <section
      id="developers"
      className="py-24 bg-blue-50/50 dark:bg-blue-900/10"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
              Get ready to scale <br /> with our payment APIs
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    Quick setup, easy integration
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Get up and running with just a few lines of code.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    Flexible APIs for any use case
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Build custom payment flows that suit your needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    Production-ready in under 30 minutes
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Launch faster with our robust infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right Code Mockup */}
          <div className="relative rounded-2xl bg-[#0d1117] p-6 shadow-2xl ring-1 ring-white/10">
            <div className="flex gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <pre className="overflow-x-auto text-sm font-mono leading-relaxed">
              <code className="text-zinc-300">
                <span className="text-[#ff7b72]">const</span>{" "}
                <span className="text-[#d2a8ff]">Chainpaye</span>{" "}
                <span className="text-[#ff7b72]">=</span>{" "}
                <span className="text-[#ff7b72]">new</span>{" "}
                <span className="text-[#79c0ff]">ChainpayeWidget</span>({`{`}{" "}
                <br />
                &nbsp;&nbsp;<span className="text-[#79c0ff]">env</span>:{" "}
                <span className="text-[#a5d6ff]">"production"</span>,<br />
                &nbsp;&nbsp;<span className="text-[#79c0ff]">action</span>:{" "}
                <span className="text-[#a5d6ff]">"send_payment"</span>,<br />
                &nbsp;&nbsp;<span className="text-[#79c0ff]">fromCurrency</span>
                : <span className="text-[#a5d6ff]">"USD"</span>,<br />
                &nbsp;&nbsp;<span className="text-[#79c0ff]">
                  toCurrency
                </span>: <span className="text-[#a5d6ff]">"NGN"</span>,<br />
                &nbsp;&nbsp;<span className="text-[#79c0ff]">apiKey</span>:{" "}
                <span className="text-[#a5d6ff]">
                  "ck_live_8911JK90sPqA00217x"
                </span>
                ,<br />
                {`}`});
                <br />
                <br />
                <span className="text-[#d2a8ff]">Chainpaye</span>.
                <span className="text-[#d2a8ff]">open</span>();
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
