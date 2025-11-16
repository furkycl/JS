import Link from "next/link";
import ModuleDetail from "@/components/ModuleDetail";
import { midModules } from "@/content/levels";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return midModules.map((m) => ({ slug: m.slug }));
}

export default function Page({ params }: Params) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const mod = midModules.find((m) => m.slug.toLowerCase() === slug);
  if (!mod) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Topic not found</h1>
        <Link className="text-blue-600 underline" href="/mid">
          Back to Mid topics
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <nav className="text-sm text-zinc-600 dark:text-zinc-400">
        <Link href="/mid" className="hover:underline">
          Mid
        </Link>
        <span className="px-1">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{mod.title}</span>
      </nav>
      <ModuleDetail mod={mod} />
    </div>
  );
}
