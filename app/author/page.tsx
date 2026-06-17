import BackLink from '@/components/BackLink'

export const metadata = { title: 'Author — Draw Me a Bike' }

export default function AuthorPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <BackLink />

      {/* Hero */}
      <div className="mt-8 mb-10 aspect-square w-40 bg-zinc-100 border border-black flex items-center justify-center">
        <span className="text-xs tracking-widest text-zinc-400">Photo</span>
      </div>

      <h1 className="text-3xl font-700 mb-1 leading-tight" style={{ fontWeight: 700 }}>
        Your Name
      </h1>
      <p className="text-xs tracking-widest text-zinc-400 mb-8">Collector &amp; curator</p>

      <div className="space-y-4 text-sm leading-7 text-zinc-700">
        <p>
          Placeholder author bio. Replace this with a short paragraph about who you are,
          what drives this project, and why you started asking people to draw bikes.
        </p>
        <p>
          You can mention your background, your relationship to drawing or cycling,
          the moment that sparked the idea, or simply where you are in the world.
        </p>
        <p>
          Keep it personal. Keep it brief.
        </p>
      </div>
    </main>
  )
}
