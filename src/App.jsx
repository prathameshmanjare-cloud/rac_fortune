import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'

import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Projects from './pages/Projects'
import Calendar from './pages/Calendar'
import JoinUs from './pages/JoinUs'
import Partner from './pages/Partner'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Upcoming from './pages/Upcoming'
import Admin from './pages/Admin'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/join" element={<JoinUs />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App