import Link from "next/link";
import { ArrowRight, Twitter, Disc, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
      {/* CTA Banner */}
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="rounded-3xl bg-blue-50 dark:bg-blue-900/10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl mb-4">
              Unlock Borderless Payments <br /> With Chainpaye
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Add seamless global and on-chain payments to your business with
              one lightweight integration — we handle compliance, settlement,
              liquidity, and infrastructure so you can focus on growth.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-blue-600 px-8 py-4 text-white font-semibold transition-colors hover:bg-blue-700 flex items-center gap-2"
          >
            Get in touch with us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white opacity-20 select-none">
            CHAINPAYE
          </div>

          <div className="flex gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              Solutions
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              Developers
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              Use cases
            </Link>
          </div>

          <div className="flex gap-4 text-zinc-400">
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              <Disc className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">
          <p>&copy; 2025 Chainpaye. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
