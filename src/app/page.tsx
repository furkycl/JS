import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Modern JavaScript, Taught in Modules
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Learn JavaScript with up-to-date, example-driven modules. Move from
          fundamentals to advanced design and performance topics across three
          tracks: Junior, Mid, and Senior.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/junior"
          className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h2 className="mb-1 text-lg font-semibold">Junior Level</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Variables, functions, arrays/objects, control flow, DOM basics
            with hands-on examples.
          </p>
          <span className="mt-3 inline-block text-sm text-blue-600 group-hover:underline dark:text-blue-400">
            Start learning →
          </span>
        </Link>

        <Link
          href="/mid"
          className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h2 className="mb-1 text-lg font-semibold">Mid Level</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Async JS, modules, classes, error handling, event loop, fetch.
          </p>
          <span className="mt-3 inline-block text-sm text-blue-600 group-hover:underline dark:text-blue-400">
            Explore modules →
          </span>
        </Link>

        <Link
          href="/senior"
          className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
        >
          <h2 className="mb-1 text-lg font-semibold">Senior Level</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Patterns, performance, architecture, testing, advanced tooling,
            and scalability.
          </p>
          <span className="mt-3 inline-block text-sm text-blue-600 group-hover:underline dark:text-blue-400">
            Go deeper →
          </span>
        </Link>
      </div>
    </section>
  );
}
