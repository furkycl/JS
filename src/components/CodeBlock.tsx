"use client";

import { useState } from "react";

type Props = {
  code: string;
  language?: string;
};

export default function CodeBlock({ code, language = "js" }: Props) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-1.5 text-xs text-zinc-500 dark:border-zinc-800">
        <span className="uppercase">{language}</span>
        <button
          onClick={onCopy}
          className="rounded px-2 py-0.5 text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

