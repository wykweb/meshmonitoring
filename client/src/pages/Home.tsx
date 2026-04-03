/**
 * Home.tsx — Mesh Monitoring Landing Page
 * Design: "Radio Dark" — Dark Prestige / Operational Intelligence
 * Colors: Deep charcoal bg, electric blue (#3b82f6) + cyan (#06b6d4) accents
 * Typography: Outfit (display/body) + Fira Code (mono/technical)
 * Cards: Glassmorphism with hover glow, staggered fade-up entrance
 */

import { useEffect, useState } from "react";

// ─── Service card data ────────────────────────────────────────────────────────

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  badge: string;
  badgeColor: "blue" | "cyan" | "green" | "violet" | "amber";
  icon: React.ReactNode;
  tag: string;
}

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663459784497/HNPJdRREoZxPBHo4cuB8dc/hero-bg-Cs5iT7R4yzJ86WeRFfbGvE.webp";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function RadioIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}

function FirehoseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function NetworkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function AnalyzerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

// ─── Badge color map ──────────────────────────────────────────────────────────

const badgeStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "bg-blue-500/15 text-blue-300 border border-blue-500/25",
  cyan:   "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
  green:  "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  violet: "bg-violet-500/15 text-violet-300 border border-violet-500/25",
  amber:  "bg-amber-500/15 text-amber-300 border border-amber-500/25",
};

const iconBgStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "bg-blue-500/15 text-blue-400",
  cyan:   "bg-cyan-500/15 text-cyan-400",
  green:  "bg-emerald-500/15 text-emerald-400",
  violet: "bg-violet-500/15 text-violet-400",
  amber:  "bg-amber-500/15 text-amber-400",
};

const glowStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "group-hover:shadow-[0_0_30px_oklch(0.6_0.2_250/0.2)]",
  cyan:   "group-hover:shadow-[0_0_30px_oklch(0.72_0.18_210/0.2)]",
  green:  "group-hover:shadow-[0_0_30px_oklch(0.7_0.18_160/0.2)]",
  violet: "group-hover:shadow-[0_0_30px_oklch(0.65_0.2_290/0.2)]",
  amber:  "group-hover:shadow-[0_0_30px_oklch(0.75_0.18_80/0.2)]",
};

const borderHoverStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "group-hover:border-blue-500/50",
  cyan:   "group-hover:border-cyan-500/50",
  green:  "group-hover:border-emerald-500/50",
  violet: "group-hover:border-violet-500/50",
  amber:  "group-hover:border-amber-500/50",
};

// ─── Service data ─────────────────────────────────────────────────────────────

const services: ServiceCard[] = [
  {
    id: "zapp-mobile",
    title: "YYC Mesh",
    subtitle: "Observer Zapp Mobile",
    description:
      "Live firehose data stream from the YYC Mesh network via the Zapp Mobile observer node. Monitor real-time packet activity, node telemetry, and message traffic across the Calgary mesh.",
    url: "https://yycmesh.meshmonitoring.com/firehose",
    badge: "Firehose",
    badgeColor: "blue",
    icon: <FirehoseIcon className="w-6 h-6" />,
    tag: "yycmesh.meshmonitoring.com",
  },
  {
    id: "wyk0-bot",
    title: "YYC Mesh",
    subtitle: "Observer WYK0 Bot",
    description:
      "Real-time firehose feed from the YYC Mesh network via the WYK0 bot observer. Track packet flow, signal quality, and node interactions across the YYC Meshtastic network.",
    url: "https://yyc.meshmonitoring.com/firehose",
    badge: "Firehose",
    badgeColor: "cyan",
    icon: <BotIcon className="w-6 h-6" />,
    tag: "yyc.meshmonitoring.com",
  },
  {
    id: "canada-mesh",
    title: "Canada Mesh",
    subtitle: "Meshtastic Network",
    description:
      "National-scale firehose stream aggregating Meshtastic mesh traffic from across Canada. Observe cross-regional packet propagation, node density, and network health at a country-wide level.",
    url: "https://ca.meshmonitoring.com/firehose",
    badge: "Firehose",
    badgeColor: "green",
    icon: <RadioIcon className="w-6 h-6" />,
    tag: "ca.meshmonitoring.com",
  },
  {
    id: "meshmapper",
    title: "YYC MeshMapper",
    subtitle: "YYC MeshCore Map",
    description:
      "Interactive geographic map of the YYC MeshCore network. Visualize node locations, signal paths, and network topology across the Calgary region in real time.",
    url: "https://yyc.meshmapper.net/",
    badge: "Map",
    badgeColor: "violet",
    icon: <MapPinIcon className="w-6 h-6" />,
    tag: "yyc.meshmapper.net",
  },
  {
    id: "meshcore-analyzer",
    title: "MeshCore Analyzer",
    subtitle: "Network Analysis Tool",
    description:
      "Advanced mesh network analysis and visualization tool. Explore node relationships, routing paths, signal metrics, and network performance data for MeshCore deployments.",
    url: "https://analyzer.letsmesh.net/map",
    badge: "Analyzer",
    badgeColor: "amber",
    icon: <AnalyzerIcon className="w-6 h-6" />,
    tag: "analyzer.letsmesh.net",
  },
];

// ─── Animated mesh node background (canvas) ───────────────────────────────────

function MeshCanvas() {
  useEffect(() => {
    const canvas = document.getElementById("mesh-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const NODE_COUNT = 40;
    const MAX_DIST = 180;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.5,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96, 165, 250, 0.7)";
        ctx.fill();

        // Glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grad.addColorStop(0, "rgba(96, 165, 250, 0.3)");
        grad.addColorStop(1, "rgba(96, 165, 250, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      id="mesh-canvas"
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
    />
  );
}

// ─── Service Card Component ───────────────────────────────────────────────────

function ServiceCard({ card, index }: { card: ServiceCard; index: number }) {
  const delayClass = [
    "animation-delay-100",
    "animation-delay-200",
    "animation-delay-300",
    "animation-delay-400",
    "animation-delay-500",
  ][index] ?? "";

  return (
    <a
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block opacity-0 animate-fade-up ${delayClass}`}
      aria-label={`Open ${card.title} — ${card.subtitle}`}
    >
      <div
        className={`
          relative h-full rounded-2xl p-6 glass-card
          border border-white/8
          ${borderHoverStyles[card.badgeColor]}
          ${glowStyles[card.badgeColor]}
          transition-all duration-300 ease-out
        `}
      >
        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={`p-3 rounded-xl ${iconBgStyles[card.badgeColor]}`}>
            {card.icon}
          </div>
          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`mono-label px-2.5 py-1 rounded-full text-xs font-medium ${badgeStyles[card.badgeColor]}`}>
              {card.badge}
            </span>
          </div>
        </div>

        {/* Title block */}
        <div className="mb-3">
          <p className="mono-label text-white/40 uppercase tracking-widest text-xs mb-1">
            {card.title}
          </p>
          <h3 className="text-lg font-700 text-white leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
            {card.subtitle}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-white/55 leading-relaxed mb-5">
          {card.description}
        </p>

        {/* URL footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/6">
          <span className="mono-label text-white/30 truncate max-w-[200px]">
            {card.tag}
          </span>
          <span className={`flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 ${
            card.badgeColor === "blue" ? "text-blue-400 group-hover:text-blue-300" :
            card.badgeColor === "cyan" ? "text-cyan-400 group-hover:text-cyan-300" :
            card.badgeColor === "green" ? "text-emerald-400 group-hover:text-emerald-300" :
            card.badgeColor === "violet" ? "text-violet-400 group-hover:text-violet-300" :
            "text-amber-400 group-hover:text-amber-300"
          }`}>
            Open
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Animate counter
    const target = 5;
    let current = 0;
    const step = () => {
      current++;
      setCount(current);
      if (current < target) setTimeout(step, 120);
    };
    setTimeout(step, 800);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-6 opacity-0 animate-fade-up animation-delay-700">
      <div className="text-center">
        <div className="text-3xl font-800 gradient-text" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
          {count}
        </div>
        <div className="mono-label text-white/40 mt-1">Active Services</div>
      </div>
      <div className="w-px h-10 bg-white/10 hidden sm:block" />
      <div className="text-center">
        <div className="text-3xl font-800 gradient-text" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
          2
        </div>
        <div className="mono-label text-white/40 mt-1">Regions</div>
      </div>
      <div className="w-px h-10 bg-white/10 hidden sm:block" />
      <div className="text-center">
        <div className="flex items-center gap-2 justify-center">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-3xl font-800 text-emerald-400" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
            Live
          </span>
        </div>
        <div className="mono-label text-white/40 mt-1">All Feeds</div>
      </div>
      <div className="w-px h-10 bg-white/10 hidden sm:block" />
      <div className="text-center">
        <div className="text-3xl font-800 gradient-text" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
          24/7
        </div>
        <div className="mono-label text-white/40 mt-1">Uptime</div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6" style={{ background: "oklch(0.11 0.008 265 / 0.85)", backdropFilter: "blur(16px)" }}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <NetworkIcon className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div>
              <span className="text-sm font-700 text-white" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                Mesh<span className="text-blue-400">Monitoring</span>
              </span>
              <span className="mono-label text-white/30 block leading-none">.com</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="mono-label text-emerald-400 text-xs">All systems operational</span>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* Animated mesh canvas */}
        <MeshCanvas />

        {/* Hero content */}
        <div className="relative z-10 container text-center px-4 py-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/10 mb-8 opacity-0 animate-fade-up animation-delay-100">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400"></span>
            </span>
            <span className="mono-label text-blue-300 text-xs">Community Mesh Network Monitoring</span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-800 text-white leading-tight tracking-tight mb-6 opacity-0 animate-fade-up animation-delay-200"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}
          >
            Monitor the{" "}
            <span className="gradient-text">Mesh</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10 opacity-0 animate-fade-up animation-delay-300">
            Real-time firehose feeds, interactive maps, and network analyzers for the{" "}
            <span className="text-white/80">YYC</span> and{" "}
            <span className="text-white/80">Canada</span> Meshtastic mesh communities.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-400">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-600 text-sm transition-all duration-200 hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] hover:-translate-y-0.5"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}
            >
              Explore Services
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <a
              href="https://meshtastic.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-500 text-sm transition-all duration-200"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}
            >
              About Meshtastic
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <StatsBar />
        </div>
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="py-20 relative">
        <div className="container">
          {/* Section header */}
          <div className="mb-12 text-center">
            <p className="mono-label text-blue-400 uppercase tracking-widest text-xs mb-3">
              Network Services
            </p>
            <h2
              className="text-3xl sm:text-4xl font-700 text-white"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
            >
              Live Monitoring Tools
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Five community-operated services providing real-time visibility into the YYC and Canada mesh networks.
            </p>
          </div>

          {/* Cards grid — 2 columns on md, 3 on lg for first 3, then 2 centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.slice(0, 3).map((card, i) => (
              <ServiceCard key={card.id} card={card} index={i} />
            ))}
          </div>

          {/* Bottom 2 cards — centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%+1.25rem)] lg:mx-auto">
            {services.slice(3).map((card, i) => (
              <ServiceCard key={card.id} card={card} index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="py-16 border-t border-white/6">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
              <RadioIcon className="w-4 h-4 text-cyan-400" />
              <span className="mono-label text-white/50 text-xs">About the Project</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-700 text-white mb-4"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
            >
              Community-Driven Mesh Intelligence
            </h2>
            <p className="text-white/50 leading-relaxed text-sm sm:text-base">
              MeshMonitoring.com is an open, community-operated platform providing real-time observability
              for Meshtastic and MeshCore radio mesh networks across Calgary (YYC) and Canada. All services
              are volunteer-run and designed to help mesh operators understand network health, node connectivity,
              and packet flow without requiring any proprietary infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/6 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <NetworkIcon className="w-4 h-4 text-blue-400" />
            <span className="mono-label text-white/30 text-xs">meshmonitoring.com</span>
          </div>
          <p className="mono-label text-white/20 text-xs text-center">
            Community mesh network monitoring — YYC &amp; Canada
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="mono-label text-emerald-500/60 text-xs">Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
