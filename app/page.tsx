import Image from 'next/image'
import HeroBanner from './components/HeroBanner'
import Promotion from './components/Promotion'
import ProductSection from './components/ProductSection'
import Features from './components/Feature'
import NewsLetter from './components/NewsLetter'

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Promotion />
      <ProductSection />
      <Features />
      <NewsLetter />
    </main>
  )
}
