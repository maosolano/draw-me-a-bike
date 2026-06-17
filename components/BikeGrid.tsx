'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { shuffle } from '@/lib/shuffle'
import { getMetadata, type BikeMetadata } from '@/lib/metadata'
import BikeOverlay from '@/components/BikeOverlay'

type SpecialCard = {
  kind: 'special'
  id: string
  label: string
  href?: string
  isTitle?: boolean
  isOrange?: boolean
}

type ImageCard = {
  kind: 'image'
  id: string
  src: string
  index: number
}

type Card = SpecialCard | ImageCard

const ORANGE = '#FF5500'

const SPECIAL_CARDS: SpecialCard[] = [
  { kind: 'special', id: 'title', label: 'Draw me a bike', isTitle: true },
  { kind: 'special', id: 'about', label: 'About', href: '/about' },
  { kind: 'special', id: 'author', label: 'Author', href: '/author' },
  { kind: 'special', id: 'draw', label: 'Draw yours', href: '/draw', isOrange: true },
]

const INTERVAL_MS = 21000
const FADE_MS = 350

export default function BikeGrid({ images }: { images: string[] }) {
  const imageCards: ImageCard[] = images.map((src, i) => ({
    kind: 'image',
    id: `img-${i}`,
    src,
    index: i,
  }))

  const buildDeck = (): Card[] => shuffle([...SPECIAL_CARDS, ...imageCards])

  const [cards, setCards] = useState<Card[]>(() => buildDeck())
  const [visible, setVisible] = useState(true)
  const [selected, setSelected] = useState<{ src: string; meta: BikeMetadata } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const cycle = () => {
      setVisible(false)
      timerRef.current = setTimeout(() => {
        setCards(buildDeck())
        setVisible(true)
        timerRef.current = setTimeout(cycle, INTERVAL_MS)
      }, FADE_MS)
    }

    timerRef.current = setTimeout(cycle, INTERVAL_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const open = (src: string, index: number) =>
    setSelected({ src, meta: getMetadata(index) })

  return (
    <>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.98)',
          transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
        }}
      >
        {cards.map((card, i) =>
          card.kind === 'special' ? (
            <SpecialCardEl key={card.id} card={card} />
          ) : (
            <ImageCardEl
              key={card.id}
              card={card}
              priority={i < 12}
              onClick={() => open(card.src, card.index)}
            />
          )
        )}
      </div>

      {selected && (
        <BikeOverlay
          src={selected.src}
          meta={selected.meta}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}

function SpecialCardEl({ card }: { card: SpecialCard }) {
  const bg = card.isTitle ? '#000' : card.isOrange ? ORANGE : '#fff'
  const fg = card.isTitle || card.isOrange ? '#fff' : '#000'
  const hoverBg = card.isTitle || card.isOrange ? bg : '#000'
  const hoverFg = card.isTitle || card.isOrange ? fg : '#fff'

  const inner = (
    <div
      className="aspect-[210/148] flex items-center justify-center border border-black transition-colors duration-200 cursor-pointer group"
      style={{ backgroundColor: bg, color: fg }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.backgroundColor = hoverBg
        el.style.color = hoverFg
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.backgroundColor = bg
        el.style.color = fg
      }}
    >
      <span
        className="text-center px-3 leading-tight tracking-widest"
        style={{ fontWeight: card.isTitle ? 700 : 500, fontSize: card.isTitle ? '1.1rem' : '0.8rem' }}
      >
        {card.label}
      </span>
    </div>
  )

  if (card.href) {
    return <Link href={card.href} className="block">{inner}</Link>
  }
  return <div>{inner}</div>
}

function ImageCardEl({
  card,
  priority,
  onClick,
}: {
  card: ImageCard
  priority?: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      className="aspect-[210/148] relative overflow-hidden border border-black w-full block cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="View bike drawing"
    >
      <Image
        src={card.src}
        alt="hand-drawn bike"
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className="object-cover grayscale"
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
      />
      {/* Orange hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          backgroundColor: ORANGE,
          opacity: hovered ? 0.85 : 0,
          pointerEvents: 'none',
        }}
      />
    </button>
  )
}
