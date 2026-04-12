import { useState, useEffect } from "react";

const ITEMS = [
  { id: "about",  label: "A",    href: "#about",  fontSize: 130, offsetX: 0,  offsetY: 0  },
  { id: "resume", label: "RESUME",      href: "#resume", fontSize: 108, offsetX: 38, offsetY: -8 },
  { id: "github", label: "GITHUB LINK", href: "https://github.com/MaelBelhacene", fontSize: 88, offsetX: 14, offsetY: -6 },
];

const CLIP_SHAPES = [
  (w, h) => `polygon(0px ${h*0.06}px, ${w - h*0.55}px 0px, ${w}px ${h*0.42}px, ${w - h*0.18}px ${h}px, 0px ${h*0.94}px)`,
  (w, h) => `polygon(${h*0.12}px 0px, ${w - h*0.3}px ${h*0.04}px, ${w}px ${h*0.5}px, ${w - h*0.08}px ${h}px, 0px ${h*0.88}px)`,
  (w, h) => `polygon(0px ${h*0.1}px, ${w - h*0.4}px 0px, ${w}px ${h*0.45}px, ${w - h*0.25}px ${h}px, ${h*0.05}px ${h*0.9}px)`,
];

export default function GTOMenu() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter")     window.location.href = ITEMS[active].href;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .GTO-root {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background: #04060f;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .GTO-video {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.4;
          z-index: 0;
          pointer-events: none;
        }
        .GTO-circle {
          position: absolute;
          right: -15vw; top: 50%;
          transform: translateY(-50%);
          width: 65vw; height: 65vw;
          max-width: 700px; max-height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, #0d2560 0%, #060d2a 60%, transparent 100%);
          z-index: 1;
          pointer-events: none;
        }
        .GTO-bg-word {
          position: absolute;
          bottom: -2vw; left: -1vw;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(140px, 22vw, 300px);
          color: rgba(255,255,255,0.025);
          letter-spacing: -8px;
          pointer-events: none;
          z-index: 2;
          white-space: nowrap;
          user-select: none;
        }
        .GTO-scanlines {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
          );
          z-index: 3;
          pointer-events: none;
        }
        .GTO-mask {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(4,6,15,0.85) 0%, rgba(4,6,15,0.4) 50%, transparent 100%);
          z-index: 4;
          pointer-events: none;
        }
        .GTO-stripe  { position:absolute; right:0; top:0; bottom:0; width:5px; background:#c4001a; z-index:10; }
        .GTO-stripe2 { position:absolute; right:9px; top:0; bottom:0; width:2px; background:rgba(196,0,26,0.22); z-index:10; }

        .GTO-menu {
          position: relative;
          z-index: 20;
          padding: 48px 0 48px 48px;
          display: flex;
          flex-direction: column;
        }

        .GTO-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          line-height: 1;
          text-decoration: none;
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .GTO-row.mounted {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .GTO-highlight {
          position: absolute;
          left: -48px; top: 50%;
          transform: translateY(-50%) scaleX(0);
          transform-origin: left center;
          background: #f38493;
          z-index: -1;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
          pointer-events: none;
        }
        .GTO-row.active .GTO-highlight {
          transform: translateY(-50%) scaleX(1);
        }

        .GTO-label {
          font-family: 'Bebas Neue', sans-serif;
          display: block;
          color: #2a5ca8;
          letter-spacing: 2px;
          line-height: 0.85;
          position: relative;
          z-index: 1;
          transition: color 0.12s ease, opacity 0.12s ease;
        }
        .GTO-row.active .GTO-label { color: #ffffff; }
        .GTO-row:hover:not(.active) .GTO-label { color: #4a82c8; }

        .GTO-hint {
          position: absolute;
          bottom: 24px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .GTO-hint.mounted { opacity: 1; }
        .GTO-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.28);
        }
        .GTO-hint-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }
      `}</style>

      <div className="GTO-root">
        <video className="GTO-video" src="/bg.mp4" autoPlay loop muted playsInline />
        <div className="GTO-circle" />
        <div className="GTO-bg-word">SYSTEM</div>
        <div className="GTO-scanlines" />
        <div className="GTO-mask" />
        <div className="GTO-stripe" />
        <div className="GTO-stripe2" />

        <nav className="GTO-menu">
          {ITEMS.map((item, i) => {
            const isActive = active === i;
            const dist = Math.abs(i - active);
            const opacity = isActive ? 1 : Math.max(0.18, 1 - dist * 0.38);
            const estW = item.label.length * item.fontSize * 0.6 + 80;
            const estH = item.fontSize * 0.94;
            const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

            return (
              <a
                key={item.id}
                href={item.href}
                className={`GTO-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
                style={{
                  marginLeft: item.offsetX,
                  marginTop: item.offsetY,
                  transitionDelay: mounted ? `${i * 80}ms` : "0ms",
                }}
                onMouseEnter={() => setActive(i)}
                aria-current={isActive ? "page" : undefined}
              >
                <div
                  className="GTO-highlight"
                  style={{
                    width: estW,
                    height: estH,
                    clipPath: clipFn(estW, estH),
                  }}
                />
                <span
                  className="GTO-label"
                  style={{ fontSize: item.fontSize, opacity }}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div className={`GTO-hint ${mounted ? "mounted" : ""}`}>
          <div className="GTO-hint-row"><span className="GTO-hint-key">UP/DOWN</span><span>NAVIGATE</span></div>
          <div className="GTO-hint-row"><span className="GTO-hint-key">ENTER</span><span>CONFIRM</span></div>
        </div>
      </div>
    </>
  );
}

