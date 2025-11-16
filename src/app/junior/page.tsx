import TopicGrid from "@/components/TopicGrid";
import { juniorIntro, juniorModules } from "@/content/levels";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Junior Level
        </h1>
        <p className="mt-2 max-w-3xl text-zinc-600 dark:text-zinc-400">
          {juniorIntro}
        </p>
      </div>
      <TopicGrid basePath="/junior" modules={juniorModules} />
    </div>
  );
}
