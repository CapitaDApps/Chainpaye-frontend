import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/assets/chainpaye.png"
        alt="Chainpaye Logo"
        width={180}
        height={50}
        priority
        className="-left-6.25 relative object-contain"
      />
    </div>
  );
}
