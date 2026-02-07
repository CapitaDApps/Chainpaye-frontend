// Lazy-loaded components for better performance
import { createLazyComponent } from "@/lib/utils/performance";

// Lazy load heavy components that might not be needed immediately
export const LazySuccessReceipt = createLazyComponent(
  () => import("./confirmation-success").then(module => ({ default: module.SuccessReceipt })),
  "SuccessReceipt"
);

export const LazyBankTransfer = createLazyComponent(
  () => import("./bank-transfer").then(module => ({ default: module.BankTransfer })),
  "BankTransfer"
);

export const LazyMethodSelection = createLazyComponent(
  () => import("./method-selection").then(module => ({ default: module.MethodSelection })),
  "MethodSelection"
);

export const LazyConfirmation = createLazyComponent(
  () => import("./confirmation-success").then(module => ({ default: module.Confirmation })),
  "Confirmation"
);