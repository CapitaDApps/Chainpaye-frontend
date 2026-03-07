"use client";

import { Globe, Headset } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedApiUi } from "../animations/animated-api-ui";

export function Features() {
  const [step, setStep] = useState(0);
  const [supportStep, setSupportStep] = useState(0);
  const [apiStep, setApiStep] = useState(0);

  // Chat Loop Logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSequence = () => {
      setStep(1);
      timeout = setTimeout(() => {
        setStep(2);
        timeout = setTimeout(() => {
          setStep(3);
          timeout = setTimeout(() => {
            setStep(0);
            timeout = setTimeout(() => {
              runSequence();
            }, 500);
          }, 2000);
        }, 1000);
      }, 1000);
    };

    runSequence();

    return () => clearTimeout(timeout);
  }, []);

  // Support Loop Logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSupportSequence = () => {
      setSupportStep(1);
      timeout = setTimeout(() => {
        setSupportStep(2);
        timeout = setTimeout(() => {
          setSupportStep(3);
          timeout = setTimeout(() => {
            setSupportStep(4);
            timeout = setTimeout(() => {
              setSupportStep(0);
              timeout = setTimeout(() => {
                runSupportSequence();
              }, 500);
            }, 2000);
          }, 500);
        }, 500);
      }, 500);
    };

    runSupportSequence();

    return () => clearTimeout(timeout);
  }, []);

  // API Notification Loop Logic
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runApiSequence = () => {
      setApiStep(1);
      timeout = setTimeout(() => {
        setApiStep(2);
        timeout = setTimeout(() => {
          setApiStep(3);
          timeout = setTimeout(() => {
            setApiStep(0);
            timeout = setTimeout(() => {
              runApiSequence();
            }, 500);
          }, 2000);
        }, 1200);
      }, 1200);
    };

    runApiSequence();

    return () => clearTimeout(timeout);
  }, []);



  return (
    <section id="about" className="pt-24 pb-8 md:py-24 px-4 bg-[#EFEFF1]">
      <div className="container mx-auto max-w-112.5  md:max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#111528]">
            Transforming cross-border <br /> payments in Africa
          </h2>
          <p className="text-gray-500">Simple instant and low fees</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-gradient-to-b from-[#003DEF] to-[#101980] rounded-xl md:rounded-[40px] p-8 relative overflow-hidden min-h-[500px] flex flex-col justify-center items-center ">
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
            <div className=" md:p-8 rounded-[32px] flex flex-col justify-between">
              <div className="h-44 bg-[#F5F7FA] rounded-t-xl mb-6 relative overflow-hidden flex items-center justify-center">
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
                <h3 className="font-bold text-lg mb-2 text-[#111528]">
                  Seamless WhatsApp Payments
                </h3>
                <p className="text-sm text-[#5A5F73]">
                  Send and receive payments inside WhatsApp — chat, tap, done.
                </p>
              </div>
            </div>

            <div className="md:p-8 rounded-[32px] flex flex-col justify-between">
              <div className="h-44 bg-[#F5F7FA] rounded-t-xl mb-6 relative overflow-hidden flex flex-col justify-center items-center p-6">
                <AnimatedApiUi />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528]">
                  Global Payment API
                </h3>
                <p className="text-sm text-[#5A5F73]">
                  Accept global payments easily and focus on growth with quick
                  Chainpaye integration.
                </p>
              </div>
            </div>

            <div className="md:p-8 rounded-[32px] flex flex-col justify-between">
              <div className="h-44 bg-[#F5F7FA] rounded-t-xl mb-6 p-4 relative overflow-hidden flex justify-center">
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
                  className={`absolute top-8 left-1/2 -translate-x-1/2 w-[85%] bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 z-10 transition-all duration-500 ${
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
                    <div className="text-xs font-bold text-gray-900">
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
                  className={`absolute top-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 z-20 transition-all duration-500 ${
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
                    <div className="text-xs font-bold text-gray-900">
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
                  className={`absolute top-5 left-1/2 -translate-x-1/2 w-[85%] bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 z-30 transition-all duration-500 ${
                    apiStep >= 3
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 -translate-y-10 scale-95"
                  }`}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">
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
                <h3 className="font-bold text-lg mb-2 text-[#111528]">
                  Multi-Currency Support
                </h3>
                <p className="text-sm text-[#5A5F73]">
                  Receive funds in NGN, GHS, ZAR, KES, USD and convert
                  seamlessly.
                </p>
              </div>
            </div>

            <div className="md:p-8 rounded-[32px] flex flex-col justify-between">
              <div className="h-44 bg-[#F5F7FA] rounded-t-xl mb-6 flex items-center justify-center">
                <div className="flex items-center gap-6">
                  {/* Headset in Circle */}
                  <div
                    className={`bg-white p-3 rounded-full transition-all duration-500 transform ${
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
                      className={`h-1 w-24 bg-gray-200 rounded-full transition-all duration-500 ${
                        supportStep >= 2
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    ></div>
                    <div
                      className={`h-1 w-32 bg-gray-200 rounded-full transition-all duration-500 ${
                        supportStep >= 3
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    ></div>
                    <div
                      className={`h-1 w-20 bg-gray-200 rounded-full transition-all duration-500 ${
                        supportStep >= 4
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528]">
                  24/7 customer support
                </h3>
                <p className="text-sm text-[#5A5F73]">
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
