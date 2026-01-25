"use client";

import { useState } from "react";

type Props = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
};

function highlightCode(code: string): string {
  const keywords = /\b(const|let|var|function|return|if|else|for|while|class|extends|import|export|from|default|async|await|try|catch|finally|throw|new|typeof|instanceof|this|super|static|get|set|of|in)\b/g;
  const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g;
  const comments = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const functions = /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g;
  const operators = /([+\-*/%=<>!&|?:]+|=>)/g;

  let result = code;

  // Preserve order: comments first, then strings, then others
  const replacements: { start: number; end: number; replacement: string }[] = [];

  // Find comments
  let match;
  const commentRegex = new RegExp(comments.source, 'g');
  while ((match = commentRegex.exec(code)) !== null) {
    replacements.push({
      start: match.index,
      end: match.index + match[0].length,
      replacement: `<span class="comment">${match[0]}</span>`,
    });
  }

  // Find strings
  const stringRegex = new RegExp(strings.source, 'g');
  while ((match = stringRegex.exec(code)) !== null) {
    const overlaps = replacements.some(r =>
      (match!.index >= r.start && match!.index < r.end) ||
      (match!.index + match![0].length > r.start && match!.index + match![0].length <= r.end)
    );
    if (!overlaps) {
      replacements.push({
        start: match.index,
        end: match.index + match[0].length,
        replacement: `<span class="string">${match[0]}</span>`,
      });
    }
  }

  // Sort replacements by position (descending) to replace from end to start
  replacements.sort((a, b) => b.start - a.start);

  for (const r of replacements) {
    result = result.slice(0, r.start) + r.replacement + result.slice(r.end);
  }

  // Apply other highlighting (simpler approach for remaining)
  result = result
    .replace(keywords, '<span class="keyword">$1</span>')
    .replace(numbers, '<span class="number">$1</span>')
    .replace(functions, '<span class="function">$1</span>')
    .replace(operators, '<span class="operator">$1</span>');

  return result;
}

export default function CodeBlock({ code, language = "js", showLineNumbers = true }: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const trimmedCode = code.trim();
  const lines = trimmedCode.split("\n");
  const isLong = lines.length > 15;

  const highlighted = highlightCode(trimmedCode);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(trimmedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-700/50 bg-zinc-800/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200 transition-colors"
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
          )}
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 rounded-md px-3 py-1 text-xs text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200 transition-all"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className={`overflow-x-auto ${isLong && !expanded ? 'max-h-[300px]' : ''}`}>
        <pre className="code-block p-4 text-zinc-100">
          {showLineNumbers ? (
            <code className="block">
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 inline-block w-8 select-none text-right text-zinc-500">
                    {i + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: highlightCode(line) || '&nbsp;' }} />
                </div>
              ))}
            </code>
          ) : (
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          )}
        </pre>
      </div>

      {/* Expand gradient overlay */}
      {isLong && !expanded && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
