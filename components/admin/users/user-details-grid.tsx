import { User } from "@/lib/utils/mock-data";

interface UserDetailsGridProps {
  user: User;
}

export function UserDetailsGrid({ user }: UserDetailsGridProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E3E3E3] py-6 px-8 ">
      <h3 className="text-sm font-semibold text-[#5A5F73] mb-6">
        User Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
        {/* Row 1 */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] text-[#5A5F73]">First Name</p>
          <p className="text-[15px] font-medium text-[#3D3D3D]">
            {user.firstName}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] text-[#5A5F73]">Last Name</p>
          <p className="text-[15px] font-medium text-[#3D3D3D]">
            {user.lastName}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] text-[#5A5F73]">Date of Birth</p>
          <p className="text-[15px] font-medium text-[#3D3D3D]">{user.dob}</p>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] text-[#5A5F73]">Account number</p>
          <p className="text-[15px] font-medium text-[#3D3D3D]">
            {user.accountNumber}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] text-[#5A5F73]">Phone Number</p>
          <p className="text-[15px] font-medium text-[#3D3D3D]">{user.phone}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] text-[#5A5F73]">Wallet Address</p>
          <p className="text-[15px] font-medium text-[#3D3D3D] break-all leading-relaxed max-w-[320px]">
            {user.fullWalletAddress}
          </p>
        </div>
      </div>
    </div>
  );
}
