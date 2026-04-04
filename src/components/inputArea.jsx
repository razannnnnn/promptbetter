"use client";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function inputArea({ setResult, setLoading, loading }) {
  const [userPrompt, setUserPrompt] = useState("");

  const handleSubmit = async () => {
    if (!userPrompt.trim()) return;

    setLoading(true);

    const res = await fetch("/api/improvePrompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt }), // dilempar ke backend
    });

    const { result } = await res.json();
    setResult(result);
    setLoading(false);
  };

  const charCount = userPrompt.length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="space-y-6"
      >
        <div className="relative glass rounded-3xl p-6 glow-hover transition-all group">
          <textarea
            placeholder="Masukkan prompt Anda di sini..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            maxLength={1000}
            className="focus:outline-none w-full bg-transparent border-none focus:ring-0 text-lg min-h-[150px] resize-none placeholder:text-white/20"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-xs text-white/30">
              {charCount} / 1000 karakter
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-brand text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all glow"
            >
              <>
                <Send size={18} />
                {loading ? "Improving..." : "Improve Prompt"}
              </>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
