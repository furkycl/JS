"use client";

import { useState } from "react";
import type { Module, Topic } from "@/components/ModuleCard";
import CodeBlock from "@/components/CodeBlock";

type Props = {
  mod: Module;
};

function TopicSection({ topic, idx }: { topic: Topic; idx: number }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <header
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setOpen((o) => !o)}
      >
        <h3 className="text-base font-semibold">
          {String(idx + 1).padStart(2, "0")} · {topic.title}
        </h3>
        <span className="text-xs text-zinc-500">{open ? "Hide" : "Show"}</span>
      </header>
      {open && (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            {topic.explanation}
          </p>
          <CodeBlock code={topic.code} />
          {topic.notes && topic.notes.length > 0 && (
            <div>
              <h4 className="mb-1 text-sm font-medium tracking-tight">Notes</h4>
              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                {topic.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}
          {topic.moreExamples && topic.moreExamples.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium tracking-tight">More examples</h4>
              {topic.moreExamples.map((ex, i) => (
                <CodeBlock key={i} code={ex} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function ModuleDetail({ mod }: Props) {
  return (
    <article className="space-y-6">
      <header className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-purple-50 p-5 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {mod.title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-700 dark:text-zinc-300">
          {mod.description}
        </p>
      </header>
      <div className="grid gap-4 lg:grid-cols-[240px,1fr]">
        <aside className="sticky top-24 h-fit space-y-1 rounded-xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-2 px-2 text-xs uppercase text-zinc-500">Topics</div>
          {mod.topics.map((t, i) => (
            <a
              key={i}
              href={`#t-${i}`}
              className="block rounded px-2 py-1 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              {String(i + 1).padStart(2, "0")} · {t.title}
            </a>
          ))}
        </aside>
        <div className="space-y-4">
          {mod.topics.map((t, i) => (
            <div id={`t-${i}`} key={i}>
              <TopicSection topic={t} idx={i} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

