"use client";
import { useState } from "react";
import { Sparkles, X, Heart, Menu } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

function DonateModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass rounded-3xl p-8 w-full max-w-sm border border-white/10 flex flex-col items-center gap-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            className="w-16 h-16 rounded-2xl bg-brand/20 border border-brand/30 flex items-center justify-center"
          >
            <Heart className="text-brand w-8 h-8" fill="currentColor" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center space-y-2"
          >
            <h2 className="text-xl font-bold">Support PromptBetter</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Kalau kamu merasa terbantu, traktir saya kopi ya! ☕ <br />
              Support kecilmu sangat berarti.
            </p>
          </motion.div>
          <motion.a
            href="https://saweria.co/razn"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#FFAC41] hover:bg-[#ffb84d] text-black font-bold rounded-2xl transition-colors"
          >
            <span className="text-xl">🎁</span>
            Donate via Saweria
          </motion.a>
          <p className="text-white/20 text-xs">saweria.co/razn</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Header() {
  const { data: session, status } = useSession();
  const [showDonate, setShowDonate] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="w-full max-w-5xl flex justify-between items-center mb-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center glow">
            <Sparkles className="text-black w-6 h-6" />
          </div>
          {/* Teks disembunyikan di mobile */}
          <h1 className="hidden sm:block text-2xl font-bold tracking-tighter">
            PROMPT<span className="text-brand">BETTER</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => setShowDonate(true)}
            className="px-5 py-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full transition-colors"
          >
            Donate
          </button>

          {status === "loading" ? null : session ? (
            <div className="flex items-center gap-3">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-white/70 hidden md:block">
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm text-white/60 hover:text-white border border-white/10 rounded-full transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => signIn("github")}
                className="px-5 py-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-full transition-colors"
              >
                GitHub
              </button>
              <button
                onClick={() => signIn("google")}
                className="px-5 py-2 bg-brand hover:opacity-90 text-black text-sm font-medium rounded-full transition-opacity"
              >
                Google
              </button>
            </div>
          )}
        </div>

        {/* Mobile: avatar (kalau login) + hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 rounded-full transition-colors hover:bg-white/10"
          >
            <AnimatePresence mode="wait">
              {showMenu ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="sm:hidden fixed top-20 right-4 z-30 bg-[#111111] border border-white/10 rounded-2xl p-4 w-52 flex flex-col gap-2 shadow-xl"
          >
            {/* Donate */}
            <button
              onClick={() => {
                setShowMenu(false);
                setShowDonate(true);
              }}
              className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              🎁 Donate
            </button>

            <div className="border-t border-white/10 my-1" />

            {/* Auth */}
            {status === "loading" ? null : session ? (
              <>
                <p className="px-4 py-1 text-xs text-white/30 truncate">
                  {session.user.name}
                </p>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    signOut();
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    signIn("github");
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  Login GitHub
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    signIn("google");
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  Login Google
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donate Modal */}
      {showDonate && <DonateModal onClose={() => setShowDonate(false)} />}
    </>
  );
}