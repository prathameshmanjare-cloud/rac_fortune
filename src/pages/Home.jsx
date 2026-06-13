import Hero from '../components/home/Hero'
import StatsCounter from '../components/home/StatsCounter'
import RecognitionStrip from '../components/home/RecognitionStrip'
import AboutSnapshot from '../components/home/AboutSnapshot'
import FeaturedProjects from '../components/home/FeaturedProjects'
import InstagramGrid from '../components/home/InstagramGrid'
import YouTubeFeature from '../components/home/YouTubeFeature'
import Testimonials from '../components/home/Testimonials'
import CSRCallout from '../components/home/CSRCallout'

function Home() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <RecognitionStrip />
      <AboutSnapshot />
      <FeaturedProjects />
      <InstagramGrid />
      <YouTubeFeature />
      <Testimonials />
      <CSRCallout />
    </>
  )
}

export default Home