import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/gto.mp4'
import resumeVideo from './assets/video.mp4'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import './App.css'

const AboutMe = lazy(() => import('./AboutMe'))
const ResumePage = lazy(() => import('./ResumePage'))
const Socials = lazy(() => import('./Socials'))

function RouteLoader() {
  return <div className="route-loader" aria-hidden="true" />
}

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen" className="gto-screen">
      <video className="gto-main-video" src={menuVideo} autoPlay loop muted playsInline />
      <div className="gto-screen-overlay" aria-hidden="true" />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  const withSuspense = (node) => (
    <Suspense fallback={<RouteLoader />}>
      {node}
    </Suspense>
  )

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about">{withSuspense(<AboutMe />)}</PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition variant="resume">{withSuspense(<ResumePage src={resumeVideo} />)}</PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials">{withSuspense(<Socials />)}</PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
