import ModuleCard, { Module } from "@/components/ModuleCard";

type Props = {
  title: string;
  intro: string;
  modules: Module[];
};

export default function LevelPage({ title, intro, modules }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {modules.map((m, idx) => (
          <ModuleCard key={m.slug} mod={m} index={idx + 1} />
        ))}
      </div>
    </div>
  );
}

