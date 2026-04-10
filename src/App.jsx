import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/gto.mp4'
import resumeVideo from './assets/video.mp4'
import musicFile from './assets/music.mp3'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import './App.css'

const AboutMe = lazy(() => import('./AboutMe'))
const ResumePage = lazy(() => import('./ResumePage'))
const Socials = lazy(() => import('./Socials'))
const MUSIC_STORAGE_KEY = 'gto-music-enabled'
let sharedMusicAudio = null

function getSharedMusicAudio() {
  if (typeof window === 'undefined') return null

  if (!sharedMusicAudio) {
    sharedMusicAudio = new window.Audio(musicFile)
    sharedMusicAudio.volume = 0.28
    sharedMusicAudio.loop = true
    sharedMusicAudio.preload = 'auto'
  }

  return sharedMusicAudio
}

function RouteLoader() {
  return <div className="route-loader" aria-hidden="true" />
}

function getLocale(langParam) {
  return langParam === 'en' ? 'en' : 'fr'
}

function isSupportedLocale(langParam) {
  return langParam === 'fr' || langParam === 'en'
}

function LanguageSwitch() {
  const navigate = useNavigate()
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const currentLang = getLocale(segments[0])
  const page = segments[1] ?? ''
  const nextLang = currentLang === 'fr' ? 'en' : 'fr'

  return (
    <button
      type="button"
      className="lang-switch"
      onClick={() => navigate(`/${nextLang}${page ? `/${page}` : ''}`)}
      aria-label={currentLang === 'fr' ? 'Switch to English' : 'Passer en francais'}
    >
      <span className={`lang-switch-chip ${currentLang === 'fr' ? 'active' : ''}`}>FR</span>
      <span className={`lang-switch-chip ${currentLang === 'en' ? 'active' : ''}`}>EN</span>
    </button>
  )
}

function MusicToggle() {
  const location = useLocation()
  const audioRef = useRef(null)
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(MUSIC_STORAGE_KEY) === '1'
  })

  const segments = location.pathname.split('/').filter(Boolean)
  const currentLang = getLocale(segments[0])

  useEffect(() => {
    audioRef.current = getSharedMusicAudio()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(MUSIC_STORAGE_KEY, enabled ? '1' : '0')
  }, [enabled])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!enabled) {
      audio.pause()
      return
    }

    const playPromise = audio.play()
    if (playPromise?.catch) {
      playPromise.catch(() => {
        setEnabled(false)
      })
    }
  }, [enabled])

  function handleMusicToggle() {
    const audio = audioRef.current ?? getSharedMusicAudio()
    if (!audio) {
      setEnabled((v) => !v)
      return
    }

    if (enabled) {
      audio.pause()
      setEnabled(false)
      return
    }

    const playPromise = audio.play()

    if (playPromise?.then) {
      playPromise
        .then(() => setEnabled(true))
        .catch(() => setEnabled(false))
      return
    }

    setEnabled(true)
  }

  return (
    <>
      <button
        type="button"
        className="music-switch"
        onClick={handleMusicToggle}
        aria-pressed={enabled}
        aria-label={
          currentLang === 'fr'
            ? (enabled ? 'Couper la musique' : 'Activer la musique')
            : (enabled ? 'Disable music' : 'Enable music')
        }
      >
        <span className="music-switch-icon" aria-hidden="true">♫</span>
        <span className={`music-switch-chip ${enabled ? 'active' : ''}`}>{enabled ? 'ON' : 'OFF'}</span>
      </button>
    </>
  )
}

function LocalizedDocument() {
  const { lang } = useParams()
  const locale = getLocale(lang)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}

function MenuScreen({ lang }) {
  const navigate = useNavigate()
  return (
    <div id="menu-screen" className="gto-screen">
      <video className="gto-main-video" src={menuVideo} autoPlay loop muted playsInline />
      <div className="gto-screen-overlay" aria-hidden="true" />
      <P3Menu lang={lang} onNavigate={(page) => navigate(`/${lang}/${page}`)} />
    </div>
  )
}

function LocalizedMenuRoute() {
  const { lang } = useParams()
  if (!isSupportedLocale(lang)) return <Navigate to="/fr" replace />
  const locale = getLocale(lang)
  return <PageTransition><MenuScreen lang={locale} /></PageTransition>
}

function LocalizedAboutRoute() {
  const { lang } = useParams()
  if (!isSupportedLocale(lang)) return <Navigate to="/fr/about" replace />
  const locale = getLocale(lang)
  return <PageTransition variant="about"><AboutMe lang={locale} /></PageTransition>
}

function LocalizedResumeRoute() {
  const { lang } = useParams()
  if (!isSupportedLocale(lang)) return <Navigate to="/fr/resume" replace />
  const locale = getLocale(lang)
  return <PageTransition variant="resume"><ResumePage lang={locale} src={resumeVideo} /></PageTransition>
}

function LocalizedSocialsRoute() {
  const { lang } = useParams()
  if (!isSupportedLocale(lang)) return <Navigate to="/fr/socials" replace />
  const locale = getLocale(lang)
  return <PageTransition variant="socials"><Socials lang={locale} /></PageTransition>
}

function AnimatedRoutes() {
  const location = useLocation()

  const withSuspense = (node) => (
    <Suspense fallback={<RouteLoader />}>
      {node}
    </Suspense>
  )

  return (
    <>
      <MusicToggle />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/fr" replace />} />
        <Route path="/about" element={<Navigate to="/fr/about" replace />} />
        <Route path="/resume" element={<Navigate to="/fr/resume" replace />} />
        <Route path="/socials" element={<Navigate to="/fr/socials" replace />} />

        <Route path="/:lang" element={
          <>
            <LocalizedDocument />
            <LanguageSwitch />
            {withSuspense(<LocalizedMenuRoute />)}
          </>
        } />
        <Route path="/:lang/about" element={
          <>
            <LocalizedDocument />
            <LanguageSwitch />
            {withSuspense(<LocalizedAboutRoute />)}
          </>
        } />
        <Route path="/:lang/resume" element={
          <>
            <LocalizedDocument />
            <LanguageSwitch />
            {withSuspense(<LocalizedResumeRoute />)}
          </>
        } />
        <Route path="/:lang/socials" element={
          <>
            <LocalizedDocument />
            <LanguageSwitch />
            {withSuspense(<LocalizedSocialsRoute />)}
          </>
        } />

        <Route path="*" element={<Navigate to="/fr" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
