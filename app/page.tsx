import BikeGrid from '@/components/BikeGrid'
import { getImagePaths } from '@/lib/images'

export default function Home() {
  const images = getImagePaths()
  return (
    <main>
      <BikeGrid images={images} />
    </main>
  )
}
