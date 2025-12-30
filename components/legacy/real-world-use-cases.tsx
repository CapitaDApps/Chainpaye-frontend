export function RealWorldUseCases() {
  return (
    <section id="use-cases" className="py-24 bg-zinc-50 dark:bg-zinc-900/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            Real world application
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Discover how people and businesses use Chainpaye
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
              For Individuals
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Send and receive money directly inside WhatsApp — no app installs
              or complex sign-ups. Whether you're paying a friend, sending money
              home, or splitting a bill, Chainpaye makes it instant and secure.
            </p>
          </div>

          {/* Card 2 - Featured/Middle */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-md ring-1 ring-blue-100 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900 dark:ring-blue-900/20 border-t-4 border-t-blue-600">
            <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
              For Businesses
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              Leverage our APIs to scale your business while accepting global
              payments in USD, EUR, GBP — and more coming soon.
            </p>
            <div className="flex gap-2 text-xs font-medium text-zinc-500">
              <span className="px-2 py-1 bg-zinc-100 rounded dark:bg-zinc-800">
                🇺🇸 USD
              </span>
              <span className="px-2 py-1 bg-zinc-100 rounded dark:bg-zinc-800">
                🇪🇺 EUR
              </span>
              <span className="px-2 py-1 bg-zinc-100 rounded dark:bg-zinc-800">
                🇬🇧 GBP
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
              For Freelancers & Creators
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Share your Chainpaye link and get paid by clients worldwide
              without hidden fees. Withdraw earnings straight to your bank
              account or mobile wallet — all inside WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
