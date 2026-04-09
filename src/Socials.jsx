import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/gto.mp4";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "ONI", color: "#ffd230", bg: "rgba(255,210,48,0.12)", border: "rgba(255,210,48,0.5)" },
  { text: "CREW", color: "#d32828", bg: "rgba(211,40,40,0.12)", border: "rgba(211,40,40,0.45)" },
  { text: "ZONE", color: "#ffd230", bg: "rgba(255,210,48,0.12)", border: "rgba(255,210,48,0.5)" },
];

const ITEMS = [
  {
    id: "twitch", label: "GITHUB", handle: "@mael", href: "https://github.com/MaelBelhacene", icon: "💻", barIcon: icon1, bars: 1, newBars: [0], counts: ["56"],
    links: ["twitch.tv/videos/2041837265"],
    stats: [
      { tag: "FOL", value: "1.2K", color: "#9147ff" },
      { tag: "VWR", value: "042",  color: "#ffd230" },
    ],
  },
  {
    id: "instagram", label: "LINKEDIN", handle: "@mael", href: "https://www.linkedin.com/", icon: "💼", barIcon: icon2, bars: 5, newBars: [1, 2], counts: ["3.4M", "2.5M", "676K", "412K", "198K"],
    links: ["instagram.com/p/C4xQmRrNk2a", "instagram.com/p/C3wLpBsOj7f", "instagram.com/reel/C2vKoArMi6e", "instagram.com/p/C1uJnZqLh5d", "instagram.com/reel/C0tImYpKg4c"],
    stats: [
      { tag: "FOL", value: "3.4K", color: "#d32828" },
      { tag: "PST", value: "128",  color: "#ffd230" },
    ],
  },
  {
    id: "tiktok", label: "CONTACT", handle: "@mael", href: "https://github.com/MaelBelhacene", icon: "📨", barIcon: icon3, bars: 7, newBars: [0, 3, 5, 6], counts: ["5.1M", "3.7M", "2.2M", "1.4M", "831K", "490K", "217K"],
    links: ["tiktok.com/@yourhandle/video/7318492016374859054", "tiktok.com/@yourhandle/video/7305837261940183342", "tiktok.com/@yourhandle/video/7291046385720348974", "tiktok.com/@yourhandle/video/7278392047163820334", "tiktok.com/@yourhandle/video/7264819203847165742", "tiktok.com/@yourhandle/video/7251047382916430126", "tiktok.com/@yourhandle/video/7237294018463851822"],
    stats: [
      { tag: "FOL", value: "8.9K", color: "#ffd230" },
      { tag: "LKS", value: "52K",  color: "#d32828" },
    ],
  },
];

export default function Socials() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left"); // "left" | "right"
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp")    setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown")  setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter")      window.open(ITEMS[active].href, "_blank");
      } else {
        const barCount = ITEMS[active].bars;
        if (e.key === "ArrowUp")   setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter")     window.open("https://" + ITEMS[active].links[activeInfoBar], "_blank");
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, activeInfoBar, navigate, focus]);

  return (
    <div id="menu-screen" className="gto-social-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <style>{`
        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
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
          color: rgba(255, 244, 204, 0.95);
          transition: color 0.2s ease;
          user-select: none;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.45);
        }
        .sc-bar-outer.active .sc-label { color: #181818; }

        /* lb/rb nav row */
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: #ffd230;
          border: 1px solid rgba(0,0,0,0.35);
          padding: 1px 7px;
          line-height: 1.5;
          user-select: none;
        }
        .sc-nav-arrow {
          font-size: 12px;
          color: #d32828;
          display: inline-block;
        }
        .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

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
          color: #fff4cc;
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

        /* right-side nav bar */
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: fixed;
          top: 40px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 50;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: var(--gto-font-ui);
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
        .sc-right-nav .sc-nav-label {
          font-family: var(--gto-font-ui);
          font-size: 28px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #ffd230;
          padding: 0 8px;
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

        /* info bar under nav */
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-info-bar-wrap {
          position: fixed;
          right: 0;
          left: 65%;
          height: 46px;
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          z-index: 50;
          padding: 0;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
          transition: transform 0.18s ease;
        }
        .sc-info-bar-wrap:hover {
          transform: translateX(-4px);
        }
        .sc-info-bar-wrap.selected {
          background: #1a1a1a;
          padding: 1.5px;
          border-radius: 8px;
        }
        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: #fff4cc;
          border-radius: 7px;
        }
        .sc-info-bar-new {
          position: absolute;
          left: -40px;
          bottom: 0;
          height: 65%;
          width: auto;
          pointer-events: none;
          z-index: 3;
        }
        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #d32828;
          z-index: 1;
        }
        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: #111;
          padding: 0 14px;
          user-select: none;
        }
        .sc-info-bar-box {
          height: 70%;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #fff;
          flex-shrink: 0;
          border-radius: 6px;
          margin-right: 4px;
          user-select: none;
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;
          flex-shrink: 0;
          margin-left: 14px;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 1px;
          color: #111;
          margin-right: 80px;
          flex-shrink: 0;
          user-select: none;
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
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

        .gto-social-screen::after {
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

        @media (max-width: 1024px) {
          .sc-bar,
          .sc-bar-red {
            width: 58vw;
          }
          .sc-char {
            left: 74px;
            max-width: 122px;
          }
          .sc-right-nav .sc-nav-btn {
            font-size: 72px;
          }
          .sc-right-nav .sc-nav-label {
            font-size: 20px;
          }
          .sc-info-bar-wrap {
            left: 52%;
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
            height: 56px;
          }
          .sc-bar-outer.active .sc-bar,
          .sc-bar-outer.active .sc-bar-red {
            height: 68px;
          }
          .sc-char,
          .sc-stats {
            display: none;
          }
          .sc-role {
            font-size: 32px;
            padding-left: 4px;
          }
          .sc-label {
            font-size: 22px;
            letter-spacing: 2px;
          }
          .sc-main {
            align-items: flex-start;
          }
          .sc-right-nav {
            top: 8px;
            right: 8px;
            transform: scale(0.68);
            transform-origin: top right;
          }
          .sc-info-bar-wrap {
            left: 10%;
            right: 2%;
            height: 38px;
          }
          .sc-info-bar-text {
            font-size: 15px;
            letter-spacing: 1px;
            padding: 0 8px;
          }
          .sc-info-bar-box,
          .sc-info-bar-count {
            font-size: 14px;
          }
          .sc-info-bar-count {
            margin-right: 14px;
          }
          .sc-footer {
            right: 8px;
            bottom: 8px;
            transform: scale(0.9);
            transform-origin: bottom right;
          }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i) window.open(item.href, "_blank");
              else setActive(i);
            }}
            onMouseEnter={() => setActive(i)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted && Array.from({ length: ITEMS[active].bars }).map((_, i) => (
        <div
          className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
          key={`bar-${active}-${i}`}
          style={{ top: `${155 + i * 52}px`, animationDelay: `${i * 50}ms` }}
          onClick={() => setActiveInfoBar(i)}
          onMouseEnter={() => setActiveInfoBar(i)}
        >
          {ITEMS[active].newBars.includes(i) && (
            <img className="sc-info-bar-new" src={newsign} alt="" />
          )}
          <div className="sc-info-bar">
            <img className="sc-info-bar-icon" src={ITEMS[active].barIcon} alt="" />
            <span className="sc-info-bar-text">{ITEMS[active].links[i].slice(0, 10)}...</span>
            <span className="sc-info-bar-box">VUES</span>
            <span className="sc-info-bar-count">{ITEMS[active].counts[i]}</span>
          </div>
        </div>
      ))}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SÉLECTIONNER</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OUVRIR</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>RETOUR</span></div>
      </div>
    </div>
  );
}
