import Link from "next/link";
import ModuleDetail from "@/components/ModuleDetail";
import { redirect } from "next/navigation";
import { seniorModules } from "@/content/levels";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return seniorModules.map((m) => ({ slug: m.slug }));
}

export default function Page({ params }: Params) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const mod = seniorModules.find((m) => m.slug.toLowerCase() === slug);
  if (!mod) {
    const distance = (a: string, b: string) => {
      const dp: number[][] = Array(a.length + 1)
        .fill(0)
        .map(() => Array(b.length + 1).fill(0));
      for (let i = 0; i <= a.length; i++) dp[i][0] = i;
      for (let j = 0; j <= b.length; j++) dp[0][j] = j;
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
        }
      }
      return dp[a.length][b.length];
    };
    const best = seniorModules
      .map((m) => ({ m, d: distance(slug, m.slug.toLowerCase()) }))
      .sort((a, b) => a.d - b.d)[0];
    if (best && best.d <= 3) {
      redirect(`/senior/${best.m.slug}`);
    }
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Topic not found</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Available topics:</p>
        <ul className="list-disc pl-5 text-sm">
          {seniorModules.map((m) => (
            <li key={m.slug}>
              <Link className="text-blue-600 underline" href={`/senior/${m.slug}`}>
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
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
