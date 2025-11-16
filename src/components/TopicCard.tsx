import Link from "next/link";

type Props = {
  href: string;
  title: string;
  description: string;
  index?: number;
};

export default function TopicCard({ href, title, description, index }: Props) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute -inset-12 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-blue-500/10 via-cyan-400/10 to-purple-500/10 blur-2xl" />
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight">
          {index != null ? `${String(index).padStart(2, "0")} · ` : null}
          {title}
        </h3>
        <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 transition-colors group-hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:group-hover:bg-zinc-900">
          Explore
        </span>
      </div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
        {description}
      </p>
    </Link>
  );
}

