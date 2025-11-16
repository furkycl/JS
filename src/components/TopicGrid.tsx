import TopicCard from "@/components/TopicCard";
import type { Module } from "@/components/ModuleCard";

type Props = {
  basePath: string; // e.g. "/junior"
  modules: Module[];
};

export default function TopicGrid({ basePath, modules }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((m, i) => (
        <TopicCard
          key={m.slug}
          href={`${basePath}/${m.slug}`}
          title={m.title}
          description={m.description}
          index={i + 1}
        />
      ))}
    </div>
  );
}

