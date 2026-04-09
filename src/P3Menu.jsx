import { useState, useEffect } from "react";

const MENU_ITEMS = [
  {
    id: "about",
    labels: { fr: "PROFIL", en: "PROFILE" },
    page: "about",
    fontSize: 96,
    offsetX: 0,
    offsetY: 0,
    skew: -6,
    skewY: 10,
  },
  {
    id: "resume",
    labels: { fr: "PARCOURS", en: "RESUME" },
    page: "resume",
    fontSize: 78,
    offsetX: 20,
    offsetY: 8,
    skew: -11,
    skewY: -10,
  },
  {
    id: "github",
    labels: { fr: "CODE SOURCE", en: "SOURCE CODE" },
    page: "github",
    href: "https://github.com/MaelBelhacene/PortfolioPro",
    fontSize: 72,
    offsetX: 8,
    offsetY: 6,
    skew: 0,
    skewY: -4,
  },
  {
    id: "socials",
    labels: { fr: "RÉSEAUX", en: "SOCIALS" },
    page: "socials",
    fontSize: 84,
    offsetX: 16,
    offsetY: 8,
    skew: -3,
    skewY: 5,
  },
  {
    id: "sideproj",
    labels: { fr: "PROJETS BONUS", en: "SIDE QUESTS" },
    page: "sideproj",
    href: "https://github.com/MaelBelhacene?tab=repositories",
    fontSize: 64,
    offsetX: 10,
    offsetY: 6,
    skew: -4,
    skewY: 7,
  },
];

const MENU_UI = {
  fr: { nav: "Menu principal", move: "NAVIGUER", confirm: "CONFIRMER", open: "Ouvrir", goTo: "Aller a", newTab: "dans un nouvel onglet" },
  en: { nav: "Main menu", move: "MOVE", confirm: "CONFIRM", open: "Open", goTo: "Go to", newTab: "in a new tab" },
};

const CLIP_SHAPES = [
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
  (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`,
];

export default function P3Menu({ onNavigate, lang = "fr" }) {
  const locale = lang === "en" ? "en" : "fr";
  const ui = MENU_UI[locale];
  const items = MENU_ITEMS.map((item) => ({ ...item, label: item.labels[locale] }));
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const activate = (idx) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(items.length - 1, active + 1));
      if (e.key === "Enter") {
        const item = items[active];
        if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
        else onNavigate?.(item.page);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onNavigate, items]);

  return (
    <>
      <style>{`
        .p3-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .p3-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:10; pointer-events:none; }
        .p3-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(245,122,139,0.22); z-index:10; pointer-events:none; }

        .p3-menu {
          position: relative;
          z-index: 20;
          padding: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: all;
        }
        .p3-menu::before {
          content: "";
          position: absolute;
          inset: -18px -24px;
          pointer-events: none;
          border: 2px solid rgba(255, 210, 48, 0.3);
          clip-path: polygon(0 0, 100% 0, 96% 100%, 0 100%);
          filter: drop-shadow(8px 8px 0 rgba(211, 40, 40, 0.45));
        }

        .p3-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-decoration: none;
          background: transparent;
          border: 0;
          padding: 0;
          font: inherit;
          opacity: 0;
          transform: translateX(var(--enter-x, 36px));
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1), filter 0.25s ease;
        }
        .p3-row.mounted {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        .p3-row:hover {
          transform: translateX(var(--hover-x, -4px)) rotate(var(--hover-rot, -0.25deg));
          filter: saturate(1.08);
        }
        .p3-row:focus-visible {
          outline: 2px solid #ffd230;
          outline-offset: 6px;
        }

        .p3-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 120%; height: 200%;
          background: radial-gradient(ellipse at center, rgba(255,210,48,0.4) 0%, transparent 70%);
          filter: blur(18px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .p3-row.active .p3-glow { opacity: 1; }

        .p3-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        @keyframes p3-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        .p3-shadow-tri {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: rgba(211, 40, 40, 0.9);
          z-index: 1;
          pointer-events: none;
          transform: translateY(-40%) translateX(-12px) scaleX(0);
          transition: transform 0.18s ease;
        }
        .p3-shadow-tri.pop {
          animation: p3-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .p3-highlight {
          position: absolute;
          top: 50%;
          transform-origin: left center;
          background: #ffffff;
          z-index: 2;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }

        .p3-label-wrap {
          position: relative;
          z-index: 3;
        }

        .p3-label-base {
          font-family: var(--gto-font-display);
          font-style: italic;
          letter-spacing: 2px;
          line-height: 0.85;
          display: block;
          white-space: nowrap;
          user-select: none;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.45);
        }

        .p3-label-dark {
          color: #ffe082;
          transition: color 0.12s ease;
        }
        .p3-row.active .p3-label-dark { color: #191919; }
        .p3-row:hover:not(.active) .p3-label-dark { color: #ffd230; }

        .p3-label-bright {
          color: #d32828;
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.12s ease;
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.45);
        }
        .p3-row.active .p3-label-bright { opacity: 1; }

        .p3-hint {
          position: absolute;
          bottom: 24px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .p3-hint.mounted { opacity: 1; }
        .p3-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255, 244, 204, 0.6);
        }
        .p3-hint-key {
          border: 1px solid rgba(255, 210, 48, 0.45);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .p3-name-tag {
          position: absolute;
          top: 18px;
          left: 22px;
          z-index: 20;
          font-family: 'Anton', sans-serif;
          font-style: italic;
          font-size: 108px;
          line-height: 0.88;
          letter-spacing: 2px;
          color: rgba(255, 210, 48, 0.58);
          transform: rotate(18deg);
          transform-origin: left top;
          user-select: none;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .p3-name-tag span:first-child {
          color: rgba(255, 244, 204, 0.9);
        }

        .gto-overlay::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(140deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 44%, rgba(0,0,0,0.65) 100%),
            repeating-linear-gradient(
              -16deg,
              rgba(255, 210, 48, 0.08) 0 14px,
              rgba(0, 0, 0, 0) 14px 34px
            );
          z-index: 0;
          pointer-events: none;
        }

        .gto-overlay .p3-menu,
        .gto-overlay .p3-name-tag,
        .gto-overlay .p3-hint,
        .gto-overlay .p3-stripe,
        .gto-overlay .p3-stripe2 {
          z-index: 2;
        }

        .gto-overlay .p3-stripe {
          right: 18px;
          top: 5%;
          bottom: 5%;
          width: 7px;
          border-radius: 2px;
          clip-path: polygon(0 1.2%, 100% 0, 100% 98.8%, 0 100%);
          background: linear-gradient(180deg, #fff1b3 0%, #ffd230 28%, #d8a900 100%);
          box-shadow:
            -10px 0 0 rgba(16, 16, 16, 0.72),
            0 0 18px rgba(255, 210, 48, 0.24);
        }

        .gto-overlay .p3-stripe2 {
          right: 29px;
          top: 9%;
          bottom: 9%;
          width: 2px;
          border-radius: 2px;
          clip-path: polygon(0 1.8%, 100% 0, 100% 98.2%, 0 100%);
          background: linear-gradient(180deg, rgba(255, 158, 158, 0.9) 0%, rgba(211, 40, 40, 0.88) 55%, rgba(120, 14, 14, 0.86) 100%);
          box-shadow: 0 0 9px rgba(211, 40, 40, 0.32);
        }

        .gto-overlay .p3-highlight {
          background: #ffd230;
          box-shadow: 8px 0 0 #d32828;
        }

        @media (max-width: 1024px) {
          .p3-menu {
            padding: 28px;
          }
          .p3-name-tag {
            font-size: 72px;
            top: 14px;
            left: 14px;
          }
          .p3-hint {
            bottom: 16px;
            right: 16px;
          }
        }

        @media (max-width: 768px) {
          .p3-menu {
            width: 92vw;
            align-items: flex-start;
            padding: 18px 16px;
            margin-top: 36px;
          }
          .p3-menu::before {
            inset: -10px -10px;
          }
          .p3-name-tag {
            font-size: 44px;
            transform: rotate(12deg);
            opacity: 0.86;
          }
          .gto-overlay .p3-stripe {
            right: 9px;
            width: 5px;
            top: 7%;
            bottom: 7%;
            box-shadow:
              -6px 0 0 rgba(16, 16, 16, 0.66),
              0 0 11px rgba(255, 210, 48, 0.2);
          }
          .gto-overlay .p3-stripe2 {
            right: 17px;
            top: 11%;
            bottom: 11%;
            width: 2px;
          }
          .p3-row {
            margin-left: 0 !important;
            margin-right: 0 !important;
            margin-top: 2px !important;
          }
          .p3-label-base {
            letter-spacing: 1px;
          }
          .p3-hint {
            right: 10px;
            bottom: 10px;
            gap: 3px;
          }
          .p3-hint-row {
            font-size: 11px;
          }
          .p3-hint-key {
            font-size: 10px;
            padding: 0 5px;
          }
        }
      `}</style>

      <div className="p3-overlay gto-overlay">
        <div className="p3-name-tag">
          <span>MAEL</span>
          <span>BELHACENE</span>
        </div>
        <div className="p3-stripe" />
        <div className="p3-stripe2" />

        <nav className="p3-menu" aria-label={ui.nav}>
          {items.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const dir = i % 2 === 0 ? -1 : 1;
            const skewX = Math.max(3, Math.abs(item.skew));
            const skewY = Math.max(2, Math.abs(item.skewY));
            const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
            const estW = item.label.length * item.fontSize * 0.6 + 80;
            const estH = item.fontSize * 0.94;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

            return (
              <button
                key={item.id}
                type="button"
                className={`p3-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  "--enter-x": `${dir * 36}px`,
                  "--hover-x": `${dir * -4}px`,
                  "--hover-rot": `${dir * -0.25}deg`,
                  marginLeft: dir < 0 ? item.offsetX : 0,
                  marginRight: dir > 0 ? item.offsetX : 0,
                  marginTop: item.offsetY,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                }}
                onClick={() => {
                  if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
                  else onNavigate?.(item.page);
                }}
                onMouseEnter={() => activate(i)}
                onFocus={() => activate(i)}
                aria-pressed={isActive}
                aria-label={item.href ? `${ui.open} ${item.label} ${ui.newTab}` : `${ui.goTo} ${item.label}`}
              >
                <div className="p3-glow" />
                <div
                  className="p3-skew-wrap"
                  style={{ transform: `skewX(${dir * skewX}deg) skewY(${dir * skewY}deg)` }}
                >
                  <div
                    key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                    className={`p3-shadow-tri${isActive ? ' pop' : ''}`}
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                    }}
                  />
                  <div
                    className="p3-highlight"
                    style={{
                      width: estW,
                      height: estH,
                      clipPath: clipFn(estW, estH),
                      transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                    }}
                  />
                  <div className="p3-label-wrap" style={{ opacity }}>
                    <span className="p3-label-base p3-label-dark" style={{ fontSize: item.fontSize }}>
                      {item.label}
                    </span>
                    <span
                      className="p3-label-base p3-label-bright"
                      style={{
                        fontSize: item.fontSize,
                        clipPath: clipFn(estW, estH),
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className={`p3-hint ${mounted ? "mounted" : ""}`}>
          <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>{ui.move}</span></div>
          <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>{ui.confirm}</span></div>
        </div>
      </div>
    </>
  );
}
