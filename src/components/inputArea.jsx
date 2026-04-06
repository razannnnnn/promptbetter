"use client";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function InputArea({ setResult, setLoading, loading }) {
  const [userPrompt, setUserPrompt] = useState("");
  const [error, setError] = useState(null);
  const [remaining, setRemaining] = useState(null);

  const handleSubmit = async () => {
    if (!userPrompt.trim()) return;

    setLoading(true);
    setError(null);

    const res = await fetch("/api/improvePrompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError({ message: data.error, isLoggedIn: data.isLoggedIn });
      setLoading(false);
      return;
    }

    setResult(data.result);
    setRemaining(data.remaining);
    setLoading(false);
  };

  const charCount = userPrompt.length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="space-y-3"
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
              {remaining !== null && (
                <span className="ml-3 text-brand/70">
                  {remaining} request tersisa hari ini
                </span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-brand text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all glow"
            >
              <Send size={18} />
              {loading ? "Improving..." : "Improve Prompt"}
            </button>
          </div>
        </div>

        {/* Error / Limit exceeded */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl px-5 py-4 border border-red-500/20 flex items-center justify-between gap-4"
          >
            <p className="text-sm text-red-400">{error.message}</p>
            {!error.isLoggedIn && (
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => signIn("github")}
                  className="px-4 py-2 text-xs border border-white/10 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  GitHub
                </button>
                <button
                  onClick={() => signIn("google")}
                  className="px-4 py-2 text-xs bg-brand text-black font-medium rounded-full hover:opacity-90 transition-opacity"
                >
                  Google
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}