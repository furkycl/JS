"use client";

import Link from "next/link";
import { useProgress } from "@/components/ProgressContext";

const levels = [
  {
    id: "junior",
    title: "Junior Level",
    subtitle: "Temeller",
    description: "Variables, functions, arrays, objects, DOM manipulation ve temel JavaScript konseptleri.",
    href: "/junior",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    hoverBg: "group-hover:from-emerald-500/20 group-hover:to-teal-500/20",
    iconBg: "bg-emerald-500",
    modules: 9,
    topics: 27,
  },
  {
    id: "mid",
    title: "Mid Level",
    subtitle: "Async & Modules",
    description: "Promises, async/await, ES modules, classes, error handling ve event loop.",
    href: "/mid",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    hoverBg: "group-hover:from-blue-500/20 group-hover:to-cyan-500/20",
    iconBg: "bg-blue-500",
    modules: 8,
    topics: 23,
  },
  {
    id: "senior",
    title: "Senior Level",
    subtitle: "Patterns & Performance",
    description: "Design patterns, performance optimization, testing, bundling ve production-ready kod yazımı.",
    href: "/senior",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    hoverBg: "group-hover:from-purple-500/20 group-hover:to-pink-500/20",
    iconBg: "bg-purple-500",
    modules: 7,
    topics: 20,
  },
];

function ProgressRing({ percentage, color }: { percentage: number; color: string }) {
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-zinc-200 dark:text-zinc-700"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className={color}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
        {percentage}%
      </span>
    </div>
  );
}

export default function Home() {
  const { getProgress } = useProgress();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 sm:p-12 mb-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Modern JavaScript - 2024+ Edition
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            JavaScript{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mastery
            </span>{" "}
            Hub
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mb-8">
            Junior'dan Senior'a, modern JavaScript'i adim adim ogren.
            Pratik ornekler, interaktif kodlar ve ilerleme takibi ile.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/junior"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100 hover:scale-105"
            >
              Ogrenmeye Basla
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://github.com/furkycl/JS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Modül", value: "24", icon: "M4 6h16M4 12h16M4 18h16" },
          { label: "Konu", value: "70+", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
          { label: "Kod Örnegi", value: "150+", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
          { label: "Not", value: "50+", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-zinc-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Levels Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Seviyeler</h2>
          <p className="text-sm text-zinc-500">Seviyeni sec, ogrenmeye basla</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {levels.map((level, index) => {
            const progress = getProgress(level.id);

            return (
              <Link
                key={level.id}
                href={level.href}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all card-hover dark:border-zinc-800 dark:bg-zinc-900"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${level.bgGradient} ${level.hoverBg} transition-all opacity-50`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${level.iconBg} rounded-xl p-3 text-white`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <ProgressRing
                      percentage={progress.percentage}
                      color={level.id === "junior" ? "text-emerald-500" : level.id === "mid" ? "text-blue-500" : "text-purple-500"}
                    />
                  </div>

                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${level.gradient} text-white mb-2`}>
                    {level.subtitle}
                  </span>

                  <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                    {level.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <div className="flex gap-4 text-sm text-zinc-500">
                      <span>{level.modules} Modül</span>
                      <span>{level.topics} Konu</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${level.gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all`}>
                      Basla
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Neden Bu Platform?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Pratik Odakli",
              description: "Her konu gercek dunya ornekleriyle desteklenmis.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
            },
            {
              title: "Ilerleme Takibi",
              description: "Tamamladığin konulari isaretle, ilerlemeni gor.",
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Modern JavaScript",
              description: "ES6+ ve guncel best practice'ler.",
              icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
            },
            {
              title: "Seviyeli Yapi",
              description: "Junior'dan Senior'a yapilandirilmis ogrenme yolu.",
              icon: "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2 w-fit mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
