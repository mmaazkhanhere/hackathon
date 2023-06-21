import Image from 'next/image'
import HeroBanner from './components/HeroBanner'
import Promotion from './components/Promotion'

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Promotion />
    </main>
  )
}
