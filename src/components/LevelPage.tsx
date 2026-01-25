"use client";

import Link from "next/link";
import type { Module } from "@/components/ModuleCard";
import { useProgress } from "@/components/ProgressContext";

type LevelConfig = {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  textGradient: string;
  accentColor: string;
  bgGradient: string;
};

const levelConfigs: Record<string, LevelConfig> = {
  junior: {
    id: "junior",
    title: "Junior Level",
    subtitle: "JavaScript Temelleri",
    gradient: "from-emerald-500 to-teal-500",
    textGradient: "from-emerald-400 to-teal-400",
    accentColor: "emerald",
    bgGradient: "from-emerald-500/5 to-teal-500/5",
  },
  mid: {
    id: "mid",
    title: "Mid Level",
    subtitle: "Async & Modules",
    gradient: "from-blue-500 to-cyan-500",
    textGradient: "from-blue-400 to-cyan-400",
    accentColor: "blue",
    bgGradient: "from-blue-500/5 to-cyan-500/5",
  },
  senior: {
    id: "senior",
    title: "Senior Level",
    subtitle: "Patterns & Performance",
    gradient: "from-purple-500 to-pink-500",
    textGradient: "from-purple-400 to-pink-400",
    accentColor: "purple",
    bgGradient: "from-purple-500/5 to-pink-500/5",
  },
};

type Props = {
  level: "junior" | "mid" | "senior";
  intro: string;
  modules: Module[];
};

function ProgressBar({ percentage, color }: { percentage: number; color: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function LevelPage({ level, intro, modules }: Props) {
  const config = levelConfigs[level];
  const { getProgress } = useProgress();

  const levelProgress = getProgress(level);

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <header className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.bgGradient} border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 mb-8`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl" />

        <div className="relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Ana Sayfa
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className={`bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent font-medium`}>
              {config.title}
            </span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${config.gradient} text-white mb-3`}>
                {config.subtitle}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">{config.title}</h1>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">{intro}</p>
            </div>

            {/* Progress Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 min-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Ilerleme</span>
                <span className={`text-2xl font-bold bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent`}>
                  {levelProgress.percentage}%
                </span>
              </div>
              <ProgressBar percentage={levelProgress.percentage} color={config.gradient} />
              <p className="text-xs text-zinc-500 mt-2">
                {levelProgress.completed} / {levelProgress.total} konu tamamlandi
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Modules Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Moduller</h2>
          <p className="text-sm text-zinc-500">{modules.length} modul</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, index) => {
            const moduleProgress = getProgress(level, mod.slug);

            return (
              <Link
                key={mod.slug}
                href={`/${level}/${mod.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 transition-all card-hover dark:border-zinc-800 dark:bg-zinc-900"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Progress indicator */}
                {moduleProgress.percentage > 0 && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`} style={{ width: `${moduleProgress.percentage}%` }} />
                )}

                <div className="flex items-start justify-between mb-3">
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} text-white text-sm font-bold`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {moduleProgress.percentage === 100 ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Tamamlandi
                    </span>
                  ) : moduleProgress.percentage > 0 ? (
                    <span className="text-xs text-zinc-500">
                      {moduleProgress.percentage}%
                    </span>
                  ) : null}
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                  {mod.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs text-zinc-500">
                    {mod.topics.length} konu
                  </span>
                  <span className={`inline-flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent group-hover:gap-2 transition-all`}>
                    Baslat
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
