import { ErrorBoundary } from "@/components/error-boundary";

export default function PaymentRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
