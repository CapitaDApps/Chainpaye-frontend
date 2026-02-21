import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chainpaye-six.vercel.app"),
  title: "Chainpaye - Global Payments for Africa",
  description:
    "For Individuals. Send and receive money instantly via a simple WhatsApp message, just like chatting with a friend. No extra apps needed. Pay friends, family, or split bills with ChainPaye fast, secure, and easy. By CAPITDAPPS BRIDGE LIMITED",
  keywords: [
    "cross-border payments",
    "Chainpaye",
    "WhatsApp payments",
    "stablecoins",
    "remittance",
    "Africa payments",
    "Web3 payment",
    "crypto cashout",
    "CAPITDAPPS",
    "CAPITDAPPS BRIDGE LIMITED",
    "capital",
  ],
  openGraph: {
    title: "Chainpaye - Global Payments for Africa",
    description:
      "For Individuals. Send and receive money instantly via a simple WhatsApp message, just like chatting with a friend. No extra apps needed. Pay friends, family, or split bills with ChainPaye fast, secure, and easy. By CAPITDAPPS BRIDGE LIMITED",
    url: "https://chainpaye.com",
    siteName: "Chainpaye",
    images: [
      {
        url: "/assets/chainpaye.png",
        width: 1200,
        height: 630,
        alt: "Chainpaye - Global Payments",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chainpaye - Global Payments for Africa",
    description:
      "For Individuals. Send and receive money instantly via a simple WhatsApp message, just like chatting with a friend. No extra apps needed. Pay friends, family, or split bills with ChainPaye fast, secure, and easy. By CAPITDAPPS BRIDGE LIMITED",
    images: ["/assets/chainpaye.png"],
    creator: "@chainpaye",
  },
  icons: {
    icon: [
      { url: "/assets/Favicon.png" },
      {
        url: "/assets/Favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/assets/Favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/Favicon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${manrope.className} ${manrope.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
