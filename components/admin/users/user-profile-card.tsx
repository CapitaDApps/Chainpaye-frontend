import { BadgeCheck, Pencil } from "lucide-react";
import { User } from "@/lib/utils/mock-data";

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E3E3E3] p-6 flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] font-medium text-xl shrink-0">
          {initials}
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium text-[#3D3D3D]">
              {user.firstName} {user.lastName}
            </h2>
            {user.kycStatus === "Verified" && (
              <BadgeCheck size={18} className="text-[#003DFF] fill-blue-50" />
            )}
          </div>
          <p className="text-sm text-[#999999]">00012</p>{" "}
          {/* Updated to match design as per instruction */}
          <p className="text-sm text-[#999999]">{user.country}</p>
        </div>
      </div>

      <button className="flex items-center gap-2 px-5 py-2 bg-[#E8EDFF] text-[#00174F] rounded-xl text-sm font-medium hover:bg-[#d4dcff] transition-colors shrink-0">
        Edit profile <Pencil size={14} />
      </button>
    </div>
  );
}
