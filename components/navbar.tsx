import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold text-stone-800"
        >
          Artcon Manager
        </Link>

        <div className="flex gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            Dashboard
          </Link>

          <Link
            href="/merch"
            className="rounded-lg px-3 py-2 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            Merch
          </Link>

          <Link
            href="/production"
            className="rounded-lg px-3 py-2 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
          >
            Production
          </Link>
        </div>
      </div>
    </nav>
  );
}