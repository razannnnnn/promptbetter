"use client";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full max-w-5xl flex justify-between items-center mb-12">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center glow">
          <Sparkles className="text-black w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tighter">
          PROMPT<span className="text-brand">BETTER</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-5 py-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full transition-colors">
          Donate
        </button>
      </div>
    </header>
  );
}
