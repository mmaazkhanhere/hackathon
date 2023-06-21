import Image from 'next/image'
import HeroBanner from './components/HeroBanner'
import Promotion from './components/Promotion'
import ProductSection from './components/ProductSection'

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Promotion />
      <ProductSection />
    </main>
  )
}
