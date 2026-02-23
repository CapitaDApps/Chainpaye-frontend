"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, Check, AlertCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RECENT_TRANSACTIONS } from "@/lib/utils/mock-data";

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const txId = params.id as string;

  const tx = RECENT_TRANSACTIONS.find(
    (t) => t.id === txId || t.fullId === txId,
  );

  if (!tx) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="relative w-28 h-28">
          <Image
            src="/assets/Empty box.png"
            alt="Not found"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-[#667085] text-sm">Transaction not found.</p>
        <button
          onClick={() => router.push("/admin/transactions")}
          className="flex items-center gap-2 text-[#003DFF] text-sm font-medium hover:underline"
        >
          <ArrowLeft size={14} /> Back to Transactions
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl space-y-4">
      <div className="bg-white rounded-2xl border border-[#E3E3E3] p-4 md:p-8">
        <h2 className="text-sm font-medium text-[#667085] mb-8">
          Transaction Details
        </h2>

        <div className="space-y-10">
          {/* Status Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-[#9CA3AF]">Status</p>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                    tx.status === "Pending" && "bg-[#D9D4FF] text-[#6C63FF]",
                    tx.status === "Completed" && "bg-[#DDFBE7] text-[#22A753]",
                    tx.status === "Failed" && "bg-[#F9DADA] text-[#D43939]",
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      tx.status === "Pending" && "bg-[#6C63FF]",
                      tx.status === "Completed" && "bg-[#22A753]",
                      tx.status === "Failed" && "bg-[#D43939]",
                    )}
                  />
                  {tx.status}
                </span>
                {tx.status === "Pending" && (
                  <span className="text-sm text-[#667085]">
                    Awaiting confirmation
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {tx.status === "Pending" && (
                <>
                  <button className="flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Retry transaction <RefreshCw size={16} />
                  </button>
                  <button className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Mark as completed <Check size={16} />
                  </button>
                </>
              )}
              {tx.status === "Failed" && (
                <button className="flex items-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  View error details <AlertCircle size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="w-full border-t border-gray-100" />

          {/* Amount / Type / Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">Total Amount</p>
              <p className="text-[20px] font-bold text-[#111528]">
                {tx.amount}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">Transaction type</p>
              <p className="text-[15px] font-medium text-[#374151]">
                {tx.type.toLowerCase()}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">Time</p>
              <p className="text-[15px] text-[#374151] font-medium">
                {tx.time}
              </p>
            </div>
          </div>

          <div className="w-full border-t border-gray-100" />

          {/* From / To Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-[#9CA3AF]">From</p>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-medium text-[#111528]">
                  {tx.fromUser?.name || "Blessing Jeremiah"}
                </span>
                <span className="text-[13px] font-medium text-[#10B981]">
                  verified
                </span>
                <button className="ml-2 text-[13px] font-medium text-[#003DFF] hover:underline">
                  View Profile
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-[#9CA3AF]">To</p>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-medium text-[#111528]">
                  {tx.toUser?.name || "Josiah Dennis"}
                </span>
                <span className="text-[13px] font-medium text-[#EF4444]">
                  unverified
                </span>
                <button className="ml-2 text-[13px] font-medium text-[#003DFF] hover:underline">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-gray-100" />

          {/* Gross / Fee / Net */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">Gross</p>
              <p className="text-[15px] font-bold text-[#111528]">
                {tx.gross || tx.amount}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">Fee</p>
              <p className="text-[15px] font-bold text-[#111528]">
                {tx.fee || "$10.00"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">Net credited</p>
              <p className="text-[15px] font-bold text-[#111528]">
                {tx.netCredited || "$99,990.00"}
              </p>
            </div>
          </div>

          <div className="w-full border-t border-gray-100" />

          {/* Network Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">From</p>
              <p className="text-[14px] font-mono text-[#374151] break-all leading-relaxed">
                {tx.fromAddress || "0x19188ce63b174028A7690a0C9984Ac86EDb4B325"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">To</p>
              <p className="text-[14px] font-mono text-[#374151] break-all leading-relaxed">
                {tx.toAddress || "0x19188ce63b174028A7690a0C9984Ac86EDb4B325"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">From</p>
              <p className="text-[14px] font-mono text-[#374151] break-all leading-relaxed">
                {tx.fromAddress || "0x19188ce63b174028A7690a0C9984Ac86EDb4B325"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] text-[#9CA3AF]">To</p>
              <p className="text-[14px] font-mono text-[#374151] break-all leading-relaxed">
                016810999 GTBANK
              </p>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[12px] text-[#9CA3AF]">Transaction ID</p>
            <p className="text-[14px] font-mono text-[#111528] break-all max-w-125">
              010455757583839_aec43bdjfhr87hghghfg4678sbsbn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
