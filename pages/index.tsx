import { Inter } from 'next/font/google'
import HomeMian from '@/pages/home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <HomeMian />
}
