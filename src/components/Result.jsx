"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Copy } from "lucide-react";

export default function Result({ result, loading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="space-y-6"
        >
          {/* Optimized Prompt Card */}
          <div className="glass rounded-3xl overflow-hidden border-brand/20">
            <div className="bg-brand/10 px-6 py-3 flex justify-between items-center border-b border-brand/20">
              <div className="flex items-center gap-2 text-brand text-sm font-bold">
                <Sparkles size={16} />
                PROMPT TEROPTIMASI{" "}
              </div>
              <button
                className="flex items-center gap-2 text-xs font-bold hover:text-brand transition-colors"
                onClick={handleCopy}
                disabled={loading || !result}
              >
                <>
                  <Copy size={14} /> {copied ? "Tersalin!" : "Salin"}
                </>
              </button>
            </div>
            <div className="p-6 text-lg leading-relaxed whitespace-pre-wrap">
              {loading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                </div>
              ) : result ? (
                <p className="text-white">{result}</p>
              ) : (
                <p className="text-white/20">
                  Hasil prompt akan muncul disini...
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
