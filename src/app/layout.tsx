import type { Metadata } from "next";
import Link from "next/link";
import { ProgressProvider } from "@/components/ProgressContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "JavaScript Mastery Hub - Learn Modern JavaScript",
  description:
    "Master JavaScript from beginner to expert with interactive modules, real-world examples, and progress tracking across Junior, Mid, and Senior levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 min-h-screen flex flex-col">
        <ProgressProvider>
          {/* Header */}
          <header className="sticky top-0 z-50 glass border-b border-zinc-200/60 dark:border-zinc-800">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-zinc-900 dark:bg-zinc-950 rounded-lg px-2 py-1">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      JS
                    </span>
                  </div>
                </div>
                <span className="font-semibold tracking-tight hidden sm:block">
                  JavaScript Mastery
                </span>
              </Link>
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/junior"
                  className="relative rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <span className="relative z-10">Junior</span>
                </Link>
                <Link
                  href="/mid"
                  className="relative rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="relative z-10">Mid</span>
                </Link>
                <Link
                  href="/senior"
                  className="relative rounded-full px-3 py-1.5 text-sm font-medium transition-all hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <span className="relative z-10">Senior</span>
                </Link>
              </div>
            </nav>
          </header>

          {/* Main content */}
          <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-zinc-200/60 dark:border-zinc-800 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-zinc-500">
                  Built with Next.js, TypeScript & Tailwind CSS
                </p>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <Link href="/junior" className="hover:text-emerald-500 transition-colors">Junior</Link>
                  <Link href="/mid" className="hover:text-blue-500 transition-colors">Mid</Link>
                  <Link href="/senior" className="hover:text-purple-500 transition-colors">Senior</Link>
                </div>
              </div>
            </div>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}
