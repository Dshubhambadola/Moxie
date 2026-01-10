import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Moxie - AI Communication Coach</h1>
      <Link
        href="/session"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
      >
        Go to Practice Session
      </Link>
    </div>
  );
}
