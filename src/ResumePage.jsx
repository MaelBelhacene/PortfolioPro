import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gtoTransitionVideo from "./assets/gto-transition.mp4";

const ITEMS = [
  { id: "i", badge: "I", title: "FORMATION", subtitle: "Université / Cursus", rank: 3 },
  { id: "ii", badge: "II", title: "COMPÉTENCES", subtitle: "Frontend / Design / UI", rank: 4 },
  { id: "iii", badge: "III", title: "PROJETS", subtitle: "Travaux mis en avant", rank: 5 },
  { id: "iv", badge: "IV", title: "EXPÉRIENCE", subtitle: "Stages / Rôles", rank: 2 },
];

const DETAIL_CONTENT = [
  {
    index: "01",
    title: "FORMATION & CERTIFICATIONS",
    progress: "5/5",
    rows: [
      { index: "01", title: "Bachelor Administrateur Systèmes & Réseaux — CESI (2025–2026)", status: "En cours" },
      { index: "02", title: "Développement Informatique BAC+2 — CESI (2023–2025)", status: "120 ECTS" },
      { index: "03", title: "Bac Pro Systèmes Numériques — Lycée Thomas Edison (2020–2023)", status: "AB" },
      { index: "04", title: "Cybercriminalité — United Nations (2025)", status: "Certifié" }, 
      { index: "05", title: "SST — INRS (2025–2027)", status: "Valide" },
    ],
    bullets: [
      "- Compétences académiques : LAN/WAN, modèle OSI, Linux, VMware vSphere et gestion de projet.",
      "- Développement : PHP/Laravel, Node.js, SQL, Python, C, HTML/CSS/JavaScript, Github/GitLab.",
      "- Formation orientée infrastructures, cybersécurité et déploiements applicatifs robustes.",
    ],
  },
  {
    index: "02",
    title: "SOCLE TECHNIQUE",
    progress: "5/5",
    rows: [
      { index: "01", title: "Cybersécurité : GRC (PSSI, RGPD, ANSSI), incidents, phishing", status: "Avancé" },
      { index: "02", title: "Développement : PHP/Laravel, Node.js, API REST, MVC", status: "Avancé" },
      { index: "03", title: "Systèmes & Réseaux : Linux, Apache/LAMP, VMware, LAN/WAN", status: "Confirmé" },
      { index: "04", title: "Base de données : MySQL, modélisation, optimisation", status: "Confirmé" },
      { index: "05", title: "Outils : Linux, VS Code, SentinelOne, Sekoia", status: "Quotidien" },
    ],
    bullets: [
      "- Profil hybride développement + sécurité, orienté performance applicative et durcissement des environnements.",
      "- Capacité à intervenir sur des enjeux techniques et stratégiques (conformité, gouvernance et architecture).",
      "- Pratique de la collaboration transverse avec équipes infra, sécurité et métiers.",
    ],
  },
  {
    index: "03",
    title: "PROJETS & OBJECTIF",
    progress: "4/4",
    rows: [
      { index: "01", title: "Système de gestion d’utilisateurs sécurisé", status: "Projet" },
      { index: "02", title: "Plateforme de ticketing avec API EasyRedmine", status: "Projet" },
      { index: "03", title: "Pilotage et déploiement de mesures défensives (EDR/XDR)", status: "Projet" },
      { index: "04", title: "Applications Laravel sécurisées (auth, sessions, rôles)", status: "Projet" },
    ],
    bullets: [
      "- Objectif : évoluer vers un poste en cybersécurité et management des infrastructures IT.",
      "- Orientation sécurité offensive/défensive, architecture système et scalabilité des plateformes.",
      "- Approche pragmatique : fiabilité, disponibilité, conformité et amélioration continue.",
    ],
  },
  {
    index: "04",
    title: "PARCOURS PROFESSIONNEL",
    progress: "4/4",
    rows: [
      { index: "01", title: "IT Security Assistant — DOMPLUS Groupe (2026–auj.)", status: "Actuel" },
      { index: "02", title: "IT Infrastructure & Security Administrator (2025–2026)", status: "Terminé" },
      { index: "03", title: "Project & Application Manager (2023–2025)", status: "Terminé" },
      { index: "04", title: "IT & Cloud Technician — PROWEBCE (2023)", status: "Stage" },
    ],
    bullets: [
      "- Mise en œuvre de la stratégie sécurité : PSSI, RGPD, ANSSI/CNIL, comités sécurité et risques tiers.",
      "- Déploiement EDR/XDR, campagnes de phishing, sensibilisation interne et coordination SOC Orange Cyberdefense.",
      "- Développement d’applications web (Laravel, Node.js), plateforme de ticketing from scratch, intégration API EasyRedmine et participation ERP Sage X3.",
    ],
  },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [mounted, setMounted] = useState(false);
  const currentDetail = DETAIL_CONTENT[active] ?? DETAIL_CONTENT[0];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen" className="gto-resume-screen">
      <video className="resume-bg-video" src={src} autoPlay loop muted playsInline />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={gtoTransitionVideo} autoPlay loop muted playsInline />
      </div>
      <style>{`
        .resume-bg-video {
          position: absolute;
          inset: auto;
          top: -8%;
          left: -8%;
          width: 116%;
          height: 116%;
          object-fit: cover;
          transform: none;
        }

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #111;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: auto;
          top: -8%;
          left: -8%;
          width: 116%;
          height: 116%;
          object-fit: cover;
          transform: none;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #ffd230;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #1a1a1a;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffd230;
          box-shadow: 10px 8px 0 #d32828;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #121212;
          border: 3px solid #ffe082;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #fff4cc;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #fff4cc;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #ffe082;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #ffe082;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #fff4cc;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #1a1a1a;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(20, 20, 20, 0.96) 0%, rgba(10, 10, 10, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255, 210, 48, 0.2),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #ffd230 0%, #fff4cc 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #181818;
          box-shadow: 10px 0 0 rgba(211, 40, 40, 0.92);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(23, 23, 23, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255, 210, 48, 0.15);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(34, 34, 34, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #ffd230;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #fff4cc;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #121212;
          background: #ffd230;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(15, 15, 15, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255, 210, 48, 0.2);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #ffd230;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #fff4cc;
        }

        @media (max-width: 1024px) {
          .resume-stack {
            width: min(54vw, 620px);
            transform: scale(0.82);
          }
          .resume-detail-panel {
            width: min(44vw, 560px);
            right: 3vw;
          }
          .resume-title {
            font-size: 46px;
          }
          .resume-detail-top-title {
            font-size: 34px;
          }
          .resume-detail-row-title {
            font-size: 23px;
          }
        }

        @media (max-width: 768px) {
          .resume-stack {
            top: 4vh;
            left: 4vw;
            width: 92vw;
            transform: none;
            gap: 8px;
          }
          .resume-list-tag {
            font-size: 56px;
            margin-left: 4px;
          }
          .resume-card {
            height: 86px;
          }
          .resume-card-inner {
            padding: 10px 12px 10px 44px;
          }
          .resume-badge {
            width: 40px;
            height: 50px;
            left: -6px;
          }
          .resume-badge-text {
            font-size: 24px;
          }
          .resume-title {
            font-size: 29px;
            letter-spacing: 0.5px;
          }
          .resume-rank {
            gap: 6px;
          }
          .resume-rank-label {
            font-size: 18px;
          }
          .resume-rank-number {
            font-size: 40px;
          }
          .resume-subtitle-bar {
            left: 42px;
            right: 8px;
            bottom: 8px;
            height: 24px;
            padding: 0 10px;
          }
          .resume-subtitle {
            font-size: 18px;
          }
          .resume-detail-panel {
            top: 50vh;
            left: 4vw;
            right: auto;
            width: 92vw;
            min-height: 0;
            height: 46vh;
            padding: 14px;
            overflow: auto;
          }
          .resume-detail-top {
            grid-template-columns: 42px 1fr auto;
            min-height: 64px;
            padding: 0 10px;
            gap: 8px;
          }
          .resume-detail-top-index,
          .resume-detail-top-progress {
            font-size: 28px;
          }
          .resume-detail-top-title {
            font-size: 22px;
          }
          .resume-detail-list {
            gap: 6px;
            margin-top: 10px;
          }
          .resume-detail-row {
            grid-template-columns: 34px 1fr auto;
            min-height: 42px;
            gap: 8px;
            padding: 0 8px;
          }
          .resume-detail-row-index {
            font-size: 19px;
          }
          .resume-detail-row-title {
            font-size: 16px;
          }
          .resume-detail-status {
            font-size: 14px;
            padding: 5px 8px;
          }
          .resume-detail-bottom {
            margin-top: 10px;
            padding: 10px;
          }
          .resume-detail-bottom-title {
            font-size: 22px;
            margin-bottom: 8px;
          }
          .resume-detail-bullet {
            font-size: 14px;
            line-height: 1.25;
          }
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>MISSIONS</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANG</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-detail-panel">
          <div className="resume-detail-top">
            <div className="resume-detail-top-index">{currentDetail.index}</div>
            <div className="resume-detail-top-title">{currentDetail.title}</div>
            <div className="resume-detail-top-progress">{currentDetail.progress}</div>
          </div>

          <div className="resume-detail-list">
            {currentDetail.rows.map((row) => (
              <div className="resume-detail-row" key={row.index}>
                <div className="resume-detail-row-index">{row.index}</div>
                <div className="resume-detail-row-title">{row.title}</div>
                <div className="resume-detail-status">{row.status}</div>
              </div>
            ))}
          </div>

          <div className="resume-detail-bottom">
            <div className="resume-detail-bottom-title">DÉTAILS</div>
            <div className="resume-detail-bullets">
              {currentDetail.bullets.map((bullet, index) => (
                <div className="resume-detail-bullet" key={index}>{bullet}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
