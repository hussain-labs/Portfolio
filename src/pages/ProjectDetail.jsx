import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import projects from "../services/projects";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── tiny icon helpers ───────────────────────────────────────────── */
const ArrowLeft = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ExternalLink = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ─── component ───────────────────────────────────────────────────── */
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === id);
  const projectIndex = projects.findIndex((p) => p.id === id);
  const prevProject = projects[projectIndex - 1] || null;
  const nextProject = projects[projectIndex + 1] || null;

  // scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!project) {
    return (
      <div style={styles.notFound}>
        <Navbar />
        <div style={{ marginTop: "120px", textAlign: "center" }}>
          <h2 style={{ color: "#CDFC31", fontSize: "2rem", marginBottom: "1rem" }}>Project not found</h2>
          <Link to="/" style={styles.backLink}>← Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* ── animated background blobs ── */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* ── global top nav bar ── */}
      <Navbar />

      {/* ── Top Header (Back Button, Title) ── */}
      <header className="max-w-[1638px] mx-auto px-6 md:px-16 pt-[100px] md:pt-[140px]" style={styles.topHeader}>
        {/* Sleek Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="group inline-flex items-center gap-2 text-[#B0B0B0] text-sm md:text-base font-medium transition-colors hover:text-[#CDFC31] mb-6 md:mb-8"
        >
          <span className="transition-transform group-hover:-translate-x-1"><ArrowLeft className="w-5 h-5" /></span>
          <span>Back to Projects</span>
        </button>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-start mb-5 md:mb-6 mt-1 md:mt-2">
          <span className="inline-flex items-center gap-1.5 md:gap-2 bg-transparent text-[#CDFC31] border border-[#CDFC31] md:border-2 px-2.5 py-1 md:px-5 md:py-1.5 rounded-[12px] md:rounded-[15px] text-[10px] md:text-[0.85rem] font-medium md:font-semibold font-['Poppins',sans-serif]">
            <UserIcon className="w-3 h-3 md:w-4 md:h-4" /> 
            <span><span className="hidden sm:inline">Role: </span>{project.role}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 md:gap-2 bg-transparent text-[#B0B0B0] border border-[#B0B0B0] md:border-2 px-2.5 py-1 md:px-5 md:py-1.5 rounded-[12px] md:rounded-[15px] text-[10px] md:text-[0.85rem] font-medium font-['Poppins',sans-serif]">
            <CalendarIcon className="w-3 h-3 md:w-4 md:h-4" /> 
            <span><span className="hidden sm:inline">Timeline: </span>{project.date}</span>
          </span>
        </div>

        {/* Title & Short Intro */}
        <h1 style={styles.heroTitle}>{project.name}</h1>
        {project.desc && (
          <p style={styles.shortIntro}>{project.desc}</p>
        )}
      </header>

      {/* ── boxed max-width banner ── */}
      <div className="max-w-[1638px] mx-auto px-6 md:px-16 relative" style={styles.bannerContainer}>
        <div style={styles.boxedBanner}>

          {/* Banner Image */}
          {project.image ? (
            <img src={project.image} alt={project.name} style={styles.bannerImg} />
          ) : (
            <div style={styles.bannerPlaceholder}>
              <span style={styles.placeholderLetter}>{project.name[0]}</span>
              <div style={styles.placeholderGlow} />
            </div>
          )}
          <div style={styles.bannerOverlay} />
        </div>
      </div>

      {/* ── 2-Column Content Area (LinkedIn Style) ── */}
      <main className="max-w-[1638px] mx-auto px-6 md:px-16 pb-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative z-10">
        
        {/* ── Left Main Column ── */}
        <div className="flex-1 w-full">
          {/* Description */}
          <p className="text-[14.5px] md:text-[1.1rem] leading-[1.8] text-[#B0B0B0] max-w-[860px] mb-8 md:mb-12">
            {project.overview}
          </p>

          {/* Key Features */}
          <section className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-[1.3rem] font-bold text-white mb-5 md:mb-6 flex items-center gap-2">
              <span className="text-[#CDFC31] text-[1.1em] leading-none">✦</span> Key Features
            </h2>
            <ul className="flex flex-col gap-3 md:gap-4 pl-0 m-0 list-none">
              {(project.features || []).map((f) => (
                <li key={f} className="flex items-start gap-2.5 md:gap-3 text-[14px] md:text-[0.93rem] leading-[1.6] text-[#B0B0B0]">
                  <span className="text-[#CDFC31] mt-1 shrink-0"><CheckIcon className="w-4 h-4 md:w-5 md:h-5" /></span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ── Right Sidebar Column ── */}
        <aside className="w-full lg:w-[320px] xl:w-[400px] shrink-0">
          {/* Tech Stack Card */}
          <section style={styles.card}>
            <h2 style={styles.cardTitle}>
              <span style={styles.cardTitleAccent}>⚙</span> Tech Stack
            </h2>
            <div style={styles.techList}>
              {(project.tech || []).map((t) => (
                <span key={t} style={styles.techPill}>{t}</span>
              ))}
            </div>
          </section>

          {/* CTA */}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ ...styles.liveBtn, display: "flex", justifyContent: "center", width: "100%", marginTop: "1.5rem" }}
            >
              <ExternalLink />
              Visit Live Site
            </a>
          )}
        </aside>

      </main>

      {/* ── project navigation ── */}
      <nav className="max-w-[1638px] mx-auto px-6 md:px-16 pb-16 flex justify-between gap-4">
        {prevProject ? (
          <Link 
            to={`/project/${prevProject.id}`} 
            title={prevProject.name}
            className="flex items-center justify-center w-12 h-12 bg-[#16181C] border border-[#CDFC31]/20 rounded-full text-[#CDFC31] transition-all duration-300 hover:bg-[#CDFC31] hover:text-[#0A0C10] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(205,252,49,0.2)]"
          >
            <ArrowLeft />
          </Link>
        ) : <div />}

        {nextProject ? (
          <Link 
            to={`/project/${nextProject.id}`} 
            title={nextProject.name}
            className="flex items-center justify-center w-12 h-12 bg-[#16181C] border border-[#CDFC31]/20 rounded-full text-[#CDFC31] transition-all duration-300 hover:bg-[#CDFC31] hover:text-[#0A0C10] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(205,252,49,0.2)] ml-auto"
          >
            <ArrowRight />
          </Link>
        ) : <div />}
      </nav>

      {/* ── global footer ── */}
      <Footer />
    </div>
  );
};

/* ─── inline styles ────────────────────────────────────────────────── */
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0A0C10",
    color: "#FFFFFF",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  /* blobs */
  blob1: {
    position: "fixed",
    top: "-200px",
    left: "-200px",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(205,252,49,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  blob2: {
    position: "fixed",
    bottom: "-200px",
    right: "-200px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(205,252,49,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  /* top header */
  topHeader: {
    position: "relative",
    zIndex: 1,
    paddingBottom: "2rem",
    textAlign: "left",
  },
  heroTitle: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: 800,
    background: "linear-gradient(90deg, #CDFC31, #FFFFFF, #CDFC31)",
    backgroundSize: "200% 200%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "shimmer 5s ease-in-out infinite",
    margin: 0,
    lineHeight: 1.15,
  },
  shortIntro: {
    color: "#B0B0B0",
    fontSize: "1.2rem",
    lineHeight: 1.6,
    maxWidth: "800px",
    marginTop: "1.25rem",
    marginBottom: "0",
  },

  /* boxed banner */
  bannerContainer: {
    marginBottom: "3rem",
  },
  boxedBanner: {
    position: "relative",
    width: "100%",
    height: "auto", // Allow height to be dictated by the image aspect ratio
    borderRadius: "24px",
    overflow: "hidden",
    border: "1px solid rgba(205,252,49,0.15)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(205,252,49,0.05)",
  },
  bannerImg: {
    width: "100%",
    height: "auto", // Automatically scale height according to image width
    display: "block", // Removes bottom spacing issue
    objectFit: "contain",
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,12,16,0.5) 0%, rgba(10,12,16,0.1) 50%, rgba(10,12,16,0.05) 100%)",
  },
  bannerPlaceholder: {
    width: "100%",
    height: "100%",
    minHeight: "400px", // Ensures placeholder doesn't collapse
    background: "linear-gradient(135deg, #16181C 0%, #0F1115 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  placeholderLetter: {
    fontSize: "12rem",
    fontWeight: 800,
    color: "rgba(205,252,49,0.08)",
    userSelect: "none",
    position: "relative",
    zIndex: 1,
  },
  placeholderGlow: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(205,252,49,0.08) 0%, transparent 70%)",
  },

  /* post banner content (desc) */
  heroDesc: {
    color: "#B0B0B0",
    fontSize: "1.1rem",
    lineHeight: 1.8,
    maxWidth: "860px",
    marginBottom: "2rem",
  },
  liveBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    background: "#CDFC31",
    color: "#0A0C10",
    padding: "0.9rem 2.5rem",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "1rem",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 0 30px rgba(205,252,49,0.3)",
  },

  /* card */
  card: {
    background: "#16181C",
    border: "1px solid rgba(205,252,49,0.1)",
    borderRadius: "16px",
    padding: "2rem",
    backdropFilter: "blur(10px)",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  cardTitleAccent: {
    color: "#CDFC31",
    fontSize: "1rem",
  },

  /* tech pills */
  techList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.6rem",
  },
  techPill: {
    background: "rgba(205,252,49,0.08)",
    color: "#CDFC31",
    border: "1px solid rgba(205,252,49,0.2)",
    padding: "0.35rem 0.9rem",
    borderRadius: "8px",
    fontSize: "0.82rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
  },

  /* features */
  featureList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.6rem",
    color: "#B0B0B0",
    fontSize: "0.93rem",
    lineHeight: 1.6,
  },
  checkIcon: {
    color: "#CDFC31",
    marginTop: "2px",
    flexShrink: 0,
  },

  /* not found */
  notFound: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A0C10",
    color: "#fff",
  },
  backLink: {
    color: "#CDFC31",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

/* inject keyframe once */
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    @keyframes shimmer {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  if (!document.getElementById("pd-shimmer")) {
    styleEl.id = "pd-shimmer";
    document.head.appendChild(styleEl);
  }
}

export default ProjectDetail;
