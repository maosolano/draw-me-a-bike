import BackLink from '@/components/BackLink'

export const metadata = { title: 'About — Draw Me a Bike' }

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <BackLink />

      {/* Hero */}
      <div className="mt-8 mb-10 aspect-[16/9] bg-zinc-100 border border-black flex items-center justify-center">
        <span className="text-xs tracking-widest text-zinc-400">Hero image</span>
      </div>

      <h1 className="text-3xl font-700 mb-6 leading-tight" style={{ fontWeight: 700 }}>
        About the project
      </h1>

      <div className="space-y-4 text-sm leading-7 text-zinc-700">
        <p>
          <em>Draw Me a Bike</em> is an ongoing visual archive that began in 2020 as a simple experiment:
          ask people—strangers, friends, colleagues—to draw a bicycle from memory, with whatever
          tool they have at hand.
        </p>
        <p>
          No instructions, no time limit, no skill required. The request is always the same.
          The results never are.
        </p>
        <p>
          Over five years and nearly three hundred drawings, a quiet taxonomy has emerged —
          engineers who draw with ruler-straight spokes, children who give bikes wings, adults
          who haven't touched a pencil in decades and betray it in every line.
        </p>
        <p>
          The collection is not about bicycles. It is about memory, confidence, and the gap
          between what we know and what we can show.
        </p>
      </div>
    </main>
  )
}
