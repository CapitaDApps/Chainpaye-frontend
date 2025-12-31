"use client";

import { Code2, Globe, Headset, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export function Features() {
  const [step, setStep] = useState(0);
  const [supportStep, setSupportStep] = useState(0);
  const [apiStep, setApiStep] = useState(0);
  const [globalApiStep, setGlobalApiStep] = useState(0);

  // Chat Loop Logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSequence = () => {
      setStep(1); // BG
      timeout = setTimeout(() => {
        setStep(2); // Bubble
        timeout = setTimeout(() => {
          setStep(3); // Avatar
          timeout = setTimeout(() => {
            setStep(0); // Vanish
            timeout = setTimeout(() => {
              runSequence(); // Loop
            }, 500); // Short blank state
          }, 2000); // Hold final state for 2s
        }, 1000); // 1s delay
      }, 1000); // 1s delay
    };

    runSequence();

    return () => clearTimeout(timeout);
  }, []);

  // Support Loop Logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSupportSequence = () => {
      setSupportStep(1); // Headset
      timeout = setTimeout(() => {
        setSupportStep(2); // Line 1
        timeout = setTimeout(() => {
          setSupportStep(3); // Line 2
          timeout = setTimeout(() => {
            setSupportStep(4); // Line 3
            timeout = setTimeout(() => {
              setSupportStep(0); // Vanish
              timeout = setTimeout(() => {
                runSupportSequence(); // Loop
              }, 500);
            }, 2000); // Hold
          }, 500); // 0.5s delay
        }, 500); // 0.5s delay
      }, 500); // 0.5s delay
    };

    runSupportSequence();

    return () => clearTimeout(timeout);
  }, []);

  // API Notification Loop Logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runApiSequence = () => {
      setApiStep(1); // USD
      timeout = setTimeout(() => {
        setApiStep(2); // GBP
        timeout = setTimeout(() => {
          setApiStep(3); // EUR
          timeout = setTimeout(() => {
            setApiStep(0); // Vanish
            timeout = setTimeout(() => {
              runApiSequence(); // Loop
            }, 500);
          }, 2000); // Hold
        }, 1200); // 1.2s delay
      }, 1200); // 1.2s delay
    };

    runApiSequence();

    return () => clearTimeout(timeout);
  }, []);

  // Global Payment API Animation Loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runGlobalApiSequence = () => {
      setGlobalApiStep(0); // Masked
      timeout = setTimeout(() => {
        setGlobalApiStep(1); // Unmasked
        timeout = setTimeout(() => {
          setGlobalApiStep(2); // Deposit 1
          timeout = setTimeout(() => {
            setGlobalApiStep(3); // Deposit 2
            timeout = setTimeout(() => {
              // Fade out/Reset handled by rendering logic, just loop back
              runGlobalApiSequence();
            }, 3000); // Hold final state
          }, 1000); // Delay for Dep 2
        }, 1500); // Delay for Dep 1
      }, 1500); // Delay for Unmask
    };

    runGlobalApiSequence();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-24 px-4 bg-[#EFEFF1] dark:bg-[#202024]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#111528] dark:text-white">
            Transforming cross-border <br /> payments in Africa
          </h2>
          <p className="text-gray-500">Simple instant and low fees</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-gradient-to-b from-[#003DEF] to-[#101980] rounded-[40px] p-8 relative overflow-hidden min-h-[500px] flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              className="absolute bottom-80 right-24 bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg"
            >
              Low cost
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                bounce: 0.5,
                duration: 0.8,
                delay: 0.1,
              }}
              className="absolute bottom-60 -rotate-12 right-[85px] md:right-28 bg-white text-[#6B7280] px-4 py-2 rounded-full text-xs font-bold shadow-lg"
            >
              Fast settlement
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                bounce: 0.5,
                duration: 0.8,
                delay: 0.2,
              }}
              className="absolute bottom-44 -rotate-3 left-16 bg-white text-[#6B7280] px-4 py-2 rounded-full text-xs font-bold shadow-lg"
            >
              Enhanced security
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                bounce: 0.5,
                duration: 0.8,
                delay: 0.3,
              }}
              className="absolute bottom-20 left-16 bg-white text-[#6B7280] px-4 py-2 rounded-full text-xs font-bold shadow-lg"
            >
              Multi-currency support
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -150, x: "-50%", scale: 0.5 }}
              whileInView={{ opacity: 1, y: "-50%", x: "-50%", scale: 0.9 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                bounce: 0.6,
                duration: 0.8,
                delay: 0.4,
              }}
              className="absolute top-[39%] md:top-[58%] rotate-[10deg] left-[30%] bg-white text-[#6B7280] px-4 py-2  rounded-full text-sm font-bold shadow-xl z-10"
            >
              Global Access
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                bounce: 0.5,
                duration: 0.8,
                delay: 0.5,
              }}
              className="absolute bottom-28 rotate-[25deg] left-[43%] translate-x-10 bg-white text-[#6B7280] px-4 py-2 rounded-full text-xs font-bold shadow-lg"
            >
              Easy payment
            </motion.div>

            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className=" p-8 rounded-[32px] flex flex-col justify-between">
              <div className="h-44 bg-[#F5F7FA] dark:bg-zinc-800 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
                {/* BG */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    step >= 1 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src="/assets/bg.jpg"
                    alt="Chat Background"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bubble 1 (Green / Right) */}
                <div
                  className={`absolute top-4 right-4 max-w-[70%] transition-all duration-500 transform ${
                    step >= 2
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <Image
                    src="/assets/Bubble.png"
                    alt="Message 1"
                    width={200}
                    height={60}
                    className="object-contain"
                  />
                </div>

                {/* Avatar (Left) */}
                <div
                  className={`absolute bottom-4 left-4 max-w-[70%] transition-all duration-500 transform ${
                    step >= 3
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <Image
                    src="/assets/avatar.png"
                    alt="Reply"
                    width={200}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528] dark:text-white">
                  Seamless WhatsApp Payments
                </h3>
                <p className="text-sm text-gray-500">
                  Send and receive payments inside WhatsApp — chat, tap, done.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[32px] flex flex-col justify-between">
              <div className="h-44 bg-[#F5F7FA] dark:bg-zinc-800 rounded-xl mb-6 relative overflow-hidden flex flex-col justify-center items-center p-6">
                {/* API Key View */}
                <div
                  className={`w-full p-5 transition-all duration-500 absolute ${
                    globalApiStep < 2
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    API Key
                  </div>
                  <div className="border border-gray-600 dark:border-zinc-700 rounded-lg p-3 flex items-center justify-between">
                    <div
                      className={`font-mono text-sm text-gray-600 dark:text-gray-300 transition-all duration-300 ${
                        globalApiStep === 0 ? "blur-[4px]" : "blur-0"
                      }`}
                    >
                      pk_live_51Msz...
                    </div>
                    {globalApiStep === 0 ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Notifications View */}
                {/* Deposit 1: Bethy */}
                <div
                  className={`absolute left-4 right-4 rounded-xl p-3 flex items-center gap-3  transition-all duration-500 ${
                    globalApiStep >= 2
                      ? "opacity-100 top-4"
                      : "opacity-0 -top-full"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src="/assets/avatar.png"
                      alt="Bethy"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">
                      From Bethy/Vendor
                    </div>
                    <div className="text-xs text-gray-400">22 April</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      +$10,000.00
                    </div>
                    <div className="text-[10px] text-green-500 font-medium">
                      Successful
                    </div>
                  </div>
                </div>

                {/* Deposit 2: Chris */}
                <div
                  className={`absolute left-4 right-4  rounded-xl p-3 flex items-center gap-3  transition-all duration-500 ${
                    globalApiStep >= 3
                      ? "opacity-100 top-24" // Moved down visually
                      : globalApiStep === 2
                      ? "opacity-0 top-4" // Starts from first position?
                      : "opacity-0 -top-full"
                  }`}
                  style={{
                    zIndex: globalApiStep >= 3 ? 10 : 0,
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-xs">
                    C
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">From Chris/User</div>
                    <div className="text-xs text-gray-400">24 April</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      +£245.00
                    </div>
                    <div className="text-[10px] text-green-500 font-medium">
                      Successful
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528] dark:text-white">
                  Global Payment API
                </h3>
                <p className="text-sm text-gray-500">
                  Accept global payments easily and focus on growth with quick
                  Chainpaye integration.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[32px] flex flex-col justify-between">
              <div className="h-44 bg-[#F5F7FA] dark:bg-zinc-800 rounded-xl mb-6 p-4 relative overflow-hidden flex justify-center">
                {/* iPhone Mockup */}
                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-40 h-full">
                  <Image
                    src="/assets/iphone.png"
                    alt="iPhone"
                    width={200}
                    height={300}
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Notification 1: USD */}
                <div
                  className={`absolute top-8 left-1/2 -translate-x-1/2 w-[85%] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-2 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 dark:border-zinc-700 z-10 transition-all duration-500 ${
                    apiStep >= 1
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-10 scale-80"
                  }`}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    <Image
                      src="/assets/us.png"
                      alt="USD"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      USD Received
                    </div>
                    <div className="text-[10px] text-gray-500">
                      You have received $1,500
                    </div>
                  </div>
                  <span className="ml-auto text-[8px] text-gray-400">Now</span>
                </div>

                {/* Notification 2: GBP */}
                <div
                  className={`absolute top-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 dark:border-zinc-700 z-20 transition-all duration-500 ${
                    apiStep >= 2
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-10 scale-95"
                  }`}
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    <Image
                      src="/assets/UK.png"
                      alt="GBP"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      GBP Received
                    </div>
                    <div className="text-[10px] text-gray-500">
                      You have received £75.80
                    </div>
                  </div>
                  <span className="ml-auto text-[8px] text-gray-400">Now</span>
                </div>

                {/* Notification 3: EUR */}
                <div
                  className={`absolute top-5 left-1/2 -translate-x-1/2 w-[85%] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 dark:border-zinc-700 z-30 transition-all duration-500 ${
                    apiStep >= 3
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-10 scale-95"
                  }`}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      EUR Received
                    </div>
                    <div className="text-[10px] text-gray-500">
                      You have received €2,000
                    </div>
                  </div>
                  <span className="ml-auto text-[8px] text-gray-400">Now</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528] dark:text-white">
                  Multi-Currency Support
                </h3>
                <p className="text-sm text-gray-500">
                  Receive funds in NGN, GHS, ZAR, KES, USD and convert
                  seamlessly.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[32px] flex flex-col justify-between">
              <div className="h-44 bg-[#F5F7FA] dark:bg-zinc-800 rounded-xl mb-6 flex items-center justify-center">
                <div className="flex items-center gap-6">
                  {/* Headset in Circle */}
                  <div
                    className={`bg-white dark:bg-zinc-700 p-3 rounded-full transition-all duration-500 transform ${
                      supportStep >= 1
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-50"
                    }`}
                  >
                    <Headset className="h-8 w-8 text-[#6B7280]" />
                  </div>

                  {/* Lines */}
                  <div className="space-y-3">
                    <div
                      className={`h-2 w-24 bg-gray-200 dark:bg-zinc-600 rounded-full transition-all duration-500 ${
                        supportStep >= 2
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    ></div>
                    <div
                      className={`h-2 w-32 bg-gray-200 dark:bg-zinc-600 rounded-full transition-all duration-500 ${
                        supportStep >= 3
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    ></div>
                    <div
                      className={`h-2 w-20 bg-gray-200 dark:bg-zinc-600 rounded-full transition-all duration-500 ${
                        supportStep >= 4
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528] dark:text-white">
                  24/7 customer support
                </h3>
                <p className="text-sm text-gray-500">
                  Our customer support team is readily available to assist you
                  whenever needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
