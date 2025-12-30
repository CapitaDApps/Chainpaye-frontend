import {
  Twitter,
  Instagram,
  Linkedin,
  Disc as Discord,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#EFEFF1] dark:bg-[#202024] pt-12 pb-8 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Solutions
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Developers
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Use cases
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Theme ☀️
            </a>
          </div>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              <Discord className="h-5 w-5" />
            </a>

            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-[13vw] font-bold leading-none text-[#111528] dark:text-white/10 opacity-10 select-none tracking-tighter">
            CHAINPAYE
          </h1>
          <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-2">
            <span>© 2025 Chainpaye</span>
            <span>All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
