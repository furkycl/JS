import Link from "next/link";
import ModuleDetail from "@/components/ModuleDetail";
import { seniorModules } from "@/content/levels";

type Params = { params: { slug: string } };

export default function Page({ params }: Params) {
  const mod = seniorModules.find((m) => m.slug === params.slug);
  if (!mod) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Topic not found</h1>
        <Link className="text-blue-600 underline" href="/senior">
          Back to Senior topics
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <nav className="text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/senior" className="hover:underline">
          Senior
        </Link>
        <span className="px-1">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{mod.title}</span>
      </nav>
      <ModuleDetail mod={mod} />
    </div>
  );
}

