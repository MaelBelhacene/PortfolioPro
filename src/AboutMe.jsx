import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/video.mp4";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const ABOUT_COPY = {
  fr: {
    revealContent: [
      {
        upper: [
          "Mael Belhacene",
          "IT Security Assistant & Développeur Web",
          "Énergie terrain : rapide, fiable, orienté impact.",
        ],
        lower: "Voir mes projets • Me contacter",
      },
      {
        upper: [
          "Actuellement Assistant en sécurité informatique chez DOMPLUS Groupe.",
          "Étudiant en Bachelor Administrateur Systèmes et Réseaux au CESI.",
          "Expertise à la croisée du développement applicatif et de la cybersécurité.",
        ],
        lower: "Approche : action, discipline et amélioration continue SI",
      },
      {
        upper: [
          "Objectif : évoluer vers la cybersécurité et le management d’infrastructures.",
          "Vision orientée performance, sécurité et scalabilité.",
          "Approche mêlant technique (dev/infra) et stratégie (GRC/conformité).",
        ],
        lower: "Roadmap : sécurité offensive/défensive et architecture système",
      },
    ],
    footer: {
      select: "SÉLECTIONNER",
      show: "AFFICHER",
      back: "RETOUR",
    },
    labels: ["FICHE IDENTITÉ", "MENTALITÉ", "OBJECTIF"],
    roles: ["ONI", "FLUX", "OBJECTIF"],
  },
  en: {
    revealContent: [
      {
        upper: [
          "Mael Belhacene",
          "IT Security Assistant & Web Developer",
          "Hands-on mindset: fast execution, reliability, and impact.",
        ],
        lower: "Explore my projects • Get in touch",
      },
      {
        upper: [
          "Currently IT Security Assistant at DOMPLUS Groupe.",
          "Bachelor student in Systems & Networks Administration at CESI.",
          "Expertise at the intersection of app development and cybersecurity.",
        ],
        lower: "Approach: action, discipline, and continuous IT improvement",
      },
      {
        upper: [
          "Goal: grow into cybersecurity and infrastructure management roles.",
          "Vision focused on performance, security, and scalability.",
          "Method blending technical delivery and governance strategy.",
        ],
        lower: "Roadmap: offensive/defensive security and system architecture",
      },
    ],
    footer: {
      select: "SELECT",
      show: "DISPLAY",
      back: "BACK",
    },
    labels: ["PROFILE CARD", "MINDSET", "GOAL"],
    roles: ["ONI", "FLOW", "GOAL"],
  },
};

const BASE_ROLES = [
  { color: "#ffd230", bg: "rgba(255,210,48,0.12)", border: "rgba(255,210,48,0.5)" },
  { color: "#d32828", bg: "rgba(211,40,40,0.12)", border: "rgba(211,40,40,0.45)" },
  { color: "#ffd230", bg: "rgba(255,210,48,0.12)", border: "rgba(255,210,48,0.5)" },
];

const ITEMS = [
  {
    id: "twitch", label: "FICHE IDENTITÉ", handle: "@mael", href: "https://twitch.tv/yourname", icon: "🎮", barIcon: icon1, bars: 1, newBars: [0], counts: ["56"],
    links: ["twitch.tv/videos/2041837265"],
    stats: [
      { tag: "FOL", value: "1.2K", color: "#9147ff" },
      { tag: "VWR", value: "042",  color: "#bf94ff" },
    ],
  },
  {
    id: "instagram", label: "MENTALITÉ", handle: "@mael", href: "https://instagram.com/yourhandle", icon: "📷", barIcon: icon2, bars: 5, newBars: [1, 2], counts: ["3.4M", "2.5M", "676K", "412K", "198K"],
    links: ["instagram.com/p/C4xQmRrNk2a", "instagram.com/p/C3wLpBsOj7f", "instagram.com/reel/C2vKoArMi6e", "instagram.com/p/C1uJnZqLh5d", "instagram.com/reel/C0tImYpKg4c"],
    stats: [
      { tag: "FOL", value: "3.4K", color: "#e1306c" },
      { tag: "PST", value: "128",  color: "#f77737" },
    ],
  },
  {
    id: "tiktok", label: "OBJECTIF", handle: "@mael", href: "https://tiktok.com/@yourhandle", icon: "🎵", barIcon: icon3, bars: 7, newBars: [0, 3, 5, 6], counts: ["5.1M", "3.7M", "2.2M", "1.4M", "831K", "490K", "217K"],
    links: ["tiktok.com/@yourhandle/video/7318492016374859054", "tiktok.com/@yourhandle/video/7305837261940183342", "tiktok.com/@yourhandle/video/7291046385720348974", "tiktok.com/@yourhandle/video/7278392047163820334", "tiktok.com/@yourhandle/video/7264819203847165742", "tiktok.com/@yourhandle/video/7251047382916430126", "tiktok.com/@yourhandle/video/7237294018463851822"],
    stats: [
      { tag: "FOL", value: "8.9K", color: "#00f2ea" },
      { tag: "LKS", value: "52K",  color: "#ff0050" },
    ],
  },
];

export default function AboutMe({ lang = "fr" }) {
  const locale = lang === "en" ? "en" : "fr";
  const copy = ABOUT_COPY[locale];
  const items = ITEMS.map((item, index) => ({ ...item, label: copy.labels[index] }));
  const roles = BASE_ROLES.map((role, index) => ({ ...role, text: copy.roles[index] }));
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  const openItem = (index) => {
    setActive(index);
    setRevealed(true);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(items.length - 1, i + 1));
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed, items.length]);

  return (
    <div id="menu-screen" className="gto-about-screen">
      <video className="gto-about-video" src={bgVideo} autoPlay loop muted playsInline />
      {revealed && <div key={`dim-${active}`} className="sc-dim" />}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {copy.revealContent[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">{copy.revealContent[active].lower}</div>
        </div>
      )}
      {revealed && (
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}
      {revealed && (
        <div key={`portrait-${active}`} className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[active]}
            alt=""
          />
        </div>
      )}
      <style>{`
        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
        }
        .sc-root::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            -10deg,
            rgba(255, 210, 48, 0.04) 0 8px,
            rgba(0, 0, 0, 0) 8px 22px
          );
          mix-blend-mode: soft-light;
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 12;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.62), rgba(35, 30, 8, 0.76));
          pointer-events: none;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(-120px) rotate(-20deg) scaleX(0.72);
          }
          60% {
            opacity: 0.96;
            transform: translateX(18px) rotate(-20deg) scaleX(1.03);
          }
          100% {
            opacity: 0.92;
            transform: translateX(0) rotate(-20deg) scaleX(1);
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(78px) skewX(-8deg) scale(0.94);
            filter: blur(8px);
          }
          55% {
            opacity: 0.9;
            transform: translateX(-8px) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 0.96;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-main-portrait-shell {
          position: absolute;
          top: 0;
          right: -3vw;
          z-index: 13;
          pointer-events: none;
          width: 43vw;
          height: 100vh;
          overflow: hidden;
          opacity: 0;
          transform: translateX(24px) skewX(-8deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-reveal-panel {
          position: absolute;
          top: 44vh;
          left: -6vw;
          width: 88vw;
          height: 60vh;
          z-index: 12;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255, 244, 204, 0.98) 0%, rgba(252, 238, 176, 0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(211, 40, 40, 0.92),
            28px 0 0 rgba(20,20,20,0.3);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0%;
          width: 100%;
          height: 40%;
          background: rgba(20, 20, 20, 0.94);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #ffe9a4;
          text-align: center;
        }
        .sc-reveal-upper-line {
          font-family: var(--gto-font-text);
          font-weight: 300;
          font-size: 20px;
          letter-spacing: 0.5px;
          line-height: 1.15;
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 48%;
          height: 20%;
          background: rgba(211, 40, 40, 0.95);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #fff4cc;
          font-family: var(--gto-font-text);
          font-weight: 300;
          font-size: 22px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          padding-left: 22px;
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #d32828;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
          transform-origin: top right;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
          border: 1px solid rgba(255, 210, 48, 0.2);
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          pointer-events: auto;
          touch-action: manipulation;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer:hover {
          transform: translateX(4px);
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #d32828;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffd230;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: var(--gto-font-display);
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.4);
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 78px;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: var(--gto-font-ui);
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,244,204,0.95);
          transition: color 0.2s ease;
          user-select: none;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.45);
        }
        .sc-bar-outer.active .sc-label { color: #181818; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255, 244, 204, 0.5);
        }
        .sc-footer-key {
          border: 1px solid rgba(255, 210, 48, 0.35);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .gto-about-screen::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 11;
          background: repeating-linear-gradient(
            -12deg,
            rgba(255, 210, 48, 0.06) 0 10px,
            rgba(0, 0, 0, 0) 10px 26px
          );
          mix-blend-mode: soft-light;
        }

        .gto-about-video {
          object-position: center 30%;
          transform: scale(1.03);
          filter: contrast(1.03) saturate(1.04) brightness(0.86);
        }

        @media (max-width: 1024px) {
          .sc-bar,
          .sc-bar-red {
            width: 58vw;
          }
          .sc-main {
            padding-left: 58px;
          }
          .sc-char {
            left: 78px;
            max-width: 124px;
          }
          .sc-right-nav .sc-nav-btn {
            font-size: 72px;
          }
          .sc-reveal-upper-line {
            font-size: 16px;
          }
          .sc-reveal-lower-bar {
            font-size: 17px;
          }
        }

        @media (max-width: 768px) {
          .sc-root {
            justify-content: flex-start;
            padding-top: 15vh;
            gap: 4px;
          }
          .sc-bar,
          .sc-bar-red {
            width: 92vw;
            height: 58px;
          }
          .sc-bar-outer.active .sc-bar,
          .sc-bar-outer.active .sc-bar-red {
            height: 72px;
          }
          .sc-main {
            padding-left: 14px;
          }
          .sc-char {
            display: none;
          }
          .sc-role {
            font-size: 34px;
            padding-left: 4px;
          }
          .sc-label {
            font-size: 22px;
            letter-spacing: 2px;
          }
          .sc-main-portrait-shell {
            width: 56vw;
            right: -16vw;
            opacity: 0.78;
          }
          .sc-reveal-panel {
            top: 54vh;
            left: -24vw;
            width: 122vw;
            height: 44vh;
            transform: translateX(0) rotate(-12deg);
          }
          .sc-reveal-upper-line {
            font-size: 13px;
            line-height: 1.2;
          }
          .sc-reveal-lower-bar {
            width: 72%;
            font-size: 13px;
            padding-left: 10px;
          }
          .sc-right-nav {
            top: 8vh;
            left: 4vw;
          }
          .sc-right-nav .sc-nav-btn {
            font-size: 42px;
            -webkit-text-stroke: 1px #000;
            padding: 0 3px;
          }
          .sc-right-nav .sc-nav-dot {
            width: 10px;
            height: 10px;
            margin: 0 4px;
          }
          .sc-footer {
            right: 10px;
            bottom: 10px;
          }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              openItem(i);
            }}
            onPointerDown={() => {
              openItem(i);
            }}
            onTouchStart={() => {
              openItem(i);
            }}
            onMouseEnter={() => {
              setActive(i);
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{roles[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>{copy.footer.select}</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>{copy.footer.show}</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>{copy.footer.back}</span></div>
      </div>
    </div>
  );
}
