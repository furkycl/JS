"use client";

import { useState } from "react";
import Link from "next/link";
import type { Module, Topic } from "@/components/ModuleCard";
import CodeBlock from "@/components/CodeBlock";
import { useProgress } from "@/components/ProgressContext";

type LevelConfig = {
  gradient: string;
  textGradient: string;
  bgGradient: string;
};

const levelConfigs: Record<string, LevelConfig> = {
  junior: {
    gradient: "from-emerald-500 to-teal-500",
    textGradient: "from-emerald-400 to-teal-400",
    bgGradient: "from-emerald-500/5 to-teal-500/5",
  },
  mid: {
    gradient: "from-blue-500 to-cyan-500",
    textGradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/5 to-cyan-500/5",
  },
  senior: {
    gradient: "from-purple-500 to-pink-500",
    textGradient: "from-purple-400 to-pink-400",
    bgGradient: "from-purple-500/5 to-pink-500/5",
  },
};

type Props = {
  mod: Module;
  level: "junior" | "mid" | "senior";
};

function TopicSection({
  topic,
  idx,
  level,
  moduleSlug,
}: {
  topic: Topic;
  idx: number;
  level: string;
  moduleSlug: string;
}) {
  const [open, setOpen] = useState(true);
  const { isComplete, toggleComplete } = useProgress();
  const config = levelConfigs[level];

  const topicId = `${level}:${moduleSlug}:${idx}`;
  const completed = isComplete(topicId);

  return (
    <section
      id={`topic-${idx}`}
      className={`rounded-2xl border bg-white dark:bg-zinc-900 overflow-hidden transition-all ${
        completed
          ? "border-emerald-500/50 dark:border-emerald-500/30"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      {/* Header */}
      <header
        className={`flex items-center justify-between p-5 cursor-pointer transition-colors ${
          completed ? "bg-emerald-500/5" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold ${
              completed
                ? "bg-emerald-500 text-white"
                : `bg-gradient-to-br ${config.gradient} text-white`
            }`}
          >
            {completed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              String(idx + 1).padStart(2, "0")
            )}
          </span>
          <div>
            <h3 className="text-lg font-semibold">{topic.title}</h3>
            {completed && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400">Tamamlandi</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleComplete(topicId);
            }}
            className={`p-2 rounded-lg transition-all ${
              completed
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
            title={completed ? "Tamamlanmadi olarak isaretle" : "Tamamlandi olarak isaretle"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={completed ? "M5 13l4 4L19 7" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}
              />
            </svg>
          </button>
          <span
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </header>

      {/* Content */}
      {open && (
        <div className="p-5 pt-0 space-y-5 animate-fade-in">
          {/* Explanation */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-l-4 border-zinc-300 dark:border-zinc-600">
            <p className="text-zinc-700 dark:text-zinc-300">{topic.explanation}</p>
          </div>

          {/* Code */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Kod Ornegi</h4>
            <CodeBlock code={topic.code} />
          </div>

          {/* Notes */}
          {topic.notes && topic.notes.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-400 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Notlar
              </h4>
              <ul className="space-y-2">
                {topic.notes.map((note, i) => (
                  <li key={i} className="flex gap-2 text-sm text-amber-900 dark:text-amber-300">
                    <span className="text-amber-500 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* More Examples */}
          {topic.moreExamples && topic.moreExamples.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ek Ornekler
              </h4>
              <div className="space-y-3">
                {topic.moreExamples.map((ex, i) => (
                  <CodeBlock key={i} code={ex} showLineNumbers={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function ModuleDetail({ mod, level }: Props) {
  const config = levelConfigs[level];
  const { getProgress } = useProgress();
  const moduleProgress = getProgress(level, mod.slug);

  const levelTitles = {
    junior: "Junior Level",
    mid: "Mid Level",
    senior: "Senior Level",
  };

  return (
    <article className="animate-fade-in">
      {/* Header */}
      <header className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.bgGradient} border border-zinc-200 dark:border-zinc-800 p-8 mb-8`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Ana Sayfa
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/${level}`} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              {levelTitles[level]}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className={`bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent font-medium`}>
              {mod.title}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{mod.title}</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl mb-4">{mod.description}</p>

          {/* Progress info */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-zinc-500">
              {mod.topics.length} konu
            </span>
            <span className="text-sm text-zinc-500">
              {moduleProgress.completed} / {moduleProgress.total} tamamlandi
            </span>
            <div className="h-2 w-32 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-500`}
                style={{ width: `${moduleProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:h-fit space-y-2 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="px-2 pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Konular
            </span>
          </div>
          {mod.topics.map((t, i) => {
            const topicId = `${level}:${mod.slug}:${i}`;
            const { isComplete } = useProgress();
            const completed = isComplete(topicId);

            return (
              <a
                key={i}
                href={`#topic-${i}`}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                  completed
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  completed
                    ? "bg-emerald-500 text-white"
                    : `bg-gradient-to-br ${config.gradient} text-white`
                }`}>
                  {completed ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="truncate">{t.title}</span>
              </a>
            );
          })}
        </aside>

        {/* Topics */}
        <div className="space-y-4">
          {mod.topics.map((t, i) => (
            <TopicSection
              key={i}
              topic={t}
              idx={i}
              level={level}
              moduleSlug={mod.slug}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
