export type BikeMetadata = {
  date: string   // DD / MM / YYYY
  author: string
  description: string
  cta: string
}

const AUTHORS = [
  'María García', 'James Okafor', 'Lena Brandt', 'Tomás Rivera',
  'Yuki Tanaka', 'Sara Lindqvist', 'Omar Benali', 'Priya Nair',
  'Finn Ó Briain', 'Camille Dubois', 'Diego Herrera', 'Noa Shapiro',
  'Aleksei Morozov', 'Fatima Al-Hassan', 'Jack Whitmore', 'Ana Pereira',
  'Liu Wei', 'Ingrid Holm', 'Kwame Mensah', 'Elena Vasquez',
]

const DESCRIPTIONS = [
  'Drawn in under two minutes, eyes closed for the first pass.',
  'Left-handed attempt. The wheels took three tries.',
  'Recalled from a childhood memory of a red bicycle in a garden.',
  'Drawn on a napkin, later scanned. The crease is part of it.',
  'First time holding a pencil in over a decade.',
  '"I wasn\'t sure where the pedals went," the author said.',
  'Completed during a ten-minute break. No erasing allowed.',
  'The chain was added last, almost as an afterthought.',
  'Three attempts on the same sheet. This is the third.',
  'Inspired by the bike leaning outside the window at the time.',
]

function seededInt(seed: number, max: number): number {
  return ((seed * 1664525 + 1013904223) & 0x7fffffff) % max
}

function seededDate(seed: number): string {
  const year = 2020 + seededInt(seed, 6)
  const month = 1 + seededInt(seed * 7, 12)
  const day = 1 + seededInt(seed * 13, 28)
  return `${String(day).padStart(2, '0')} / ${String(month).padStart(2, '0')} / ${year}`
}

export function getMetadata(index: number): BikeMetadata {
  return {
    date: seededDate(index + 1),
    author: AUTHORS[seededInt(index * 31, AUTHORS.length)],
    description: DESCRIPTIONS[seededInt(index * 17, DESCRIPTIONS.length)],
    cta: 'View full size',
  }
}
