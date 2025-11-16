import CodeBlock from "@/components/CodeBlock";

export type Topic = {
  title: string;
  explanation: string;
  code: string;
  notes?: string[];
  moreExamples?: string[];
};

export type Module = {
  slug: string;
  title: string;
  description: string;
  topics: Topic[];
};

type Props = {
  mod: Module;
  index: number;
};

export default function ModuleCard({ mod, index }: Props) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <header className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">
          {index.toString().padStart(2, "0")} · {mod.title}
        </h3>
      </header>
      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        {mod.description}
      </p>
      <div className="space-y-6">
        {mod.topics.map((t, i) => (
          <section key={i} className="space-y-2">
            <h4 className="text-base font-medium">{t.title}</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t.explanation}
            </p>
            <CodeBlock code={t.code} />
          </section>
        ))}
      </div>
    </article>
  );
}
