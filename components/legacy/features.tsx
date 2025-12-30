import { ShieldCheck, Zap, Headset, Banknote } from "lucide-react";

const features = [
  {
    icon: Banknote,
    title: "Multi-Currency Support",
    description:
      "Receive funds in NGN, GHS, ZAR, KES, USD and convert seamlessly.",
    color:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description:
      "Our customer support team is readily available to assist you whenever needed.",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description:
      "Experience lightning-fast settlements, ensuring your funds are available when you need them.",
    color:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description:
      "We use state-of-the-art encryption to ensure your data and funds are always protected.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-50 dark:bg-black/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            Transforming cross-border <br /> payments in Africa
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            We enable simple for businesses and individuals to receive, send and
            sell instantly in their local currency — with low fees, transparent
            transactions, and real-time access to funds.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-md dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
