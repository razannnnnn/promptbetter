import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { authFormAppearance } from "@/lib/clerkAppearance";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PromptBetter | By Razan",
  description: "PromptBetter By Razan",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen">
        <ClerkProvider
          appearance={authFormAppearance}
        >
          <div className="flex flex-col items-center p-4 md:p-8 min-h-screen">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
