import Link from 'next/link'

export default function BackLink() {
  return (
    <Link
      href="/"
      className="inline-block text-xs tracking-widest font-medium border-b border-black hover:opacity-50 transition-opacity"
    >
      ← Back
    </Link>
  )
}
