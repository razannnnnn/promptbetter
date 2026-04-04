"use client";
import { useState } from "react";
import { motion } from "motion/react";
import InputArea from "@/components/inputArea";
import Result from "@/components/Result";

export default function Hero() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="w-full max-w-3xl flex flex-col gap-8">
      <section className="text-center space-y-4 mb-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
        >
          Ubah Prompt Biasa Menjadi <br />
          <span className="text-brand italic">Luar Biasa.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/50 text-lg max-w-xl mx-auto"
        >
          Optimalkan instruksi AI Anda untuk hasil yang lebih akurat, efisien,
          dan profesional.
        </motion.p>
      </section>
      {/* Input Area */}
      <InputArea
        setResult={setResult}
        setLoading={setLoading}
        loading={loading}
      />

      {/* Results Area */}
      <Result result={result} loading={loading} />
    </main>
  );
}
