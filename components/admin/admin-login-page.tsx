"use client";

import LoginForm from "@/components/admin/login-form";
import Logo from "@/components/ui/logo";
import Image from "next/image";

export function AdminLoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row font-sans bg-white">
      {/* Left Section: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-8 lg:p-16 xl:p-24">
        <div className="w-full max-w-md flex flex-col h-full justify-between py-12">
          <div className="flex justify-start overflow-hidden">
            <Logo />
          </div>

          <div className="grow flex flex-col justify-center">
            <LoginForm />
          </div>

          {/* Footer spacer to match design balance */}
          <div className="hidden md:block h-20" />
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="hidden md:block w-1/2 relative h-screen overflow-hidden">
        <Image
          src="/assets/signing-asset.png"
          alt="Chainpaye Admin Portal"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
      </div>
    </main>
  );
}
