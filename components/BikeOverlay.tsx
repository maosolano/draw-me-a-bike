'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import type { BikeMetadata } from '@/lib/metadata'

const ORANGE = '#FF5500'

type Props = {
  src: string
  meta: BikeMetadata
  onClose: () => void
}

export default function BikeOverlay({ src, meta, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-xs tracking-widest hover:opacity-50 transition-opacity"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[210/148]">
          <Image
            src={src}
            alt="hand-drawn bike"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 640px) 100vw, 672px"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 border-t border-black">
          {/* Date pill */}
          <span
            className="inline-block text-white text-xs font-medium px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: ORANGE }}
          >
            {meta.date}
          </span>

          {/* Author */}
          <h2 className="text-xl mb-3 leading-tight" style={{ fontWeight: 700 }}>
            {meta.author}
          </h2>

          {/* Description */}
          <p className="text-sm leading-6 text-zinc-600 mb-6">
            {meta.description}
          </p>

          {/* CTA */}
          <button
            className="text-xs tracking-widest font-medium border border-black px-5 py-2 hover:bg-black hover:text-white transition-colors duration-150"
          >
            {meta.cta}
          </button>
        </div>
      </div>
    </div>
  )
}
