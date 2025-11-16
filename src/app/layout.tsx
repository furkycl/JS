import type { Metadata } from "next";
// Removed remote Google fonts to avoid network fetches during build
import Link from "next/link";
import "./globals.css";

// Use system fonts via Tailwind's font-sans

export const metadata: Metadata = {
  title: "JavaScript Modules Learning Hub",
  description:
    "Modern JavaScript explained with rich, up-to-date examples across Junior, Mid, and Senior levels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100`}>
        <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold tracking-tight">
              JS Modules Hub
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/junior"
                className="rounded-full px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Junior
              </Link>
              <Link
                href="/mid"
                className="rounded-full px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Mid
              </Link>
              <Link
                href="/senior"
                className="rounded-full px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Senior
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">{children}</main>
        <footer className="border-t border-zinc-200/60 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
          Built with Next.js, TypeScript, and Tailwind CSS
        </footer>
      </body>
    </html>
  );
}
