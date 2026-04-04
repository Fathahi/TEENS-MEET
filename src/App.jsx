import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'

// Lazy load below-the-fold components
const About = lazy(() => import('./components/Objectives')) // Repurposed Objectives
const Gallery = lazy(() => import('./components/Gallery'))
const LocationSchedule = lazy(() => import('./components/LocationSchedule'))
const GuestPortal = lazy(() => import('./components/GuestPortal'))
const VideoFeedback = lazy(() => import('./components/VideoFeedback'))
const Sessions = lazy(() => import('./components/Speakers')) // Repurposed Speakers
const Registration = lazy(() => import('./components/Registration'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <div className="App bg-white">
      <a href="#home" className="skip-to-content">
        Skip to main content
      </a>
      <div className="bg-glow" aria-hidden="true"></div>
      <Nav />
      <main id="main-content">
        <Hero />
        <Suspense fallback={<div className="min-h-screen" />}>
          <About />
          <Gallery />
          <LocationSchedule />
          <GuestPortal />
          <VideoFeedback />
          <Sessions />
          <Registration />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App

