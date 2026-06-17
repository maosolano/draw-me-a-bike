import BackLink from '@/components/BackLink'
import DrawingCanvas from '@/components/DrawingCanvas'

export const metadata = { title: 'Draw Yours — Draw Me a Bike' }

export default function DrawPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <BackLink />

      <h1 className="mt-8 mb-2 text-3xl leading-tight" style={{ fontWeight: 700 }}>
        Draw yours
      </h1>
      <p className="text-xs tracking-widest text-zinc-400 mb-10">
        Draw a bike from memory. No instructions.
      </p>

      <DrawingCanvas />
    </main>
  )
}
