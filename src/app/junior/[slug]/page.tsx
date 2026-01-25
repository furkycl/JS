import Link from "next/link";
import ModuleDetail from "@/components/ModuleDetail";
import { redirect } from "next/navigation";
import { juniorModules } from "@/content/levels";

type Params = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return juniorModules.map((m) => ({ slug: m.slug }));
}

export default async function Page({ params }: Params) {
  const { slug: rawParam } = await params;
  const raw = decodeURIComponent(rawParam);
  const norm = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  const slug = norm(raw);
  const mod = juniorModules.find(
    (m) => norm(m.slug) === slug || norm(m.title) === slug
  );
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
    const best = juniorModules
      .map((m) => ({ m, d: distance(slug, norm(m.slug)) }))
      .sort((a, b) => a.d - b.d)[0];
    if (best && best.d <= 3) {
      redirect(`/junior/${best.m.slug}`);
    }
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold mb-2">Modul Bulunamadi</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Aradiginiz modul mevcut degil. Asagidaki modullerden birini secebilirsiniz:
          </p>
          <div className="grid gap-2 text-left">
            {juniorModules.map((m) => (
              <Link
                key={m.slug}
                href={`/junior/${m.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                  {juniorModules.indexOf(m) + 1}
                </span>
                <span className="font-medium">{m.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <ModuleDetail mod={mod} level="junior" />;
}
