/**
 * Home.tsx — Mesh Monitoring Landing Page
 * Design: "Radio Dark" — Dark Prestige / Operational Intelligence
 * Colors: Deep charcoal bg, electric blue (#3b82f6) + cyan (#06b6d4) accents
 * Typography: Outfit (display/body) + Fira Code (mono/technical)
 * Cards: Glassmorphism with hover glow, staggered fade-up entrance
 */

import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  badge: string;
  badgeColor: "blue" | "cyan" | "green" | "violet" | "amber" | "rose" | "sky" | "teal";
  icon: React.ReactNode;
  tag: string;
  note?: string;
  noteUrl?: string;
  note2?: string;
  note2Url?: string;
  qrCode?: string;
  qrLink?: string;
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

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function HeartbeatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.5l-2 7-4-14-2 7H2" />
    </svg>
  );
}

function TreeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 14c.83-1.17 1-2.5 1-3.5C18 6.91 15.31 4 12 4S6 6.91 6 10.5c0 1 .17 2.33 1 3.5" />
      <path d="M12 14v8" />
      <path d="M9 18h6" />
      <path d="M14.5 10.5C14 12 13 13 12 13s-2-1-2.5-2.5" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ─── Badge / style maps ───────────────────────────────────────────────────────

const badgeStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "bg-blue-500/15 text-blue-300 border border-blue-500/25",
  cyan:   "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
  green:  "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  violet: "bg-violet-500/15 text-violet-300 border border-violet-500/25",
  amber:  "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  rose:   "bg-rose-500/15 text-rose-300 border border-rose-500/25",
  sky:    "bg-sky-500/15 text-sky-300 border border-sky-500/25",
  teal:   "bg-teal-500/15 text-teal-300 border border-teal-500/25",
};

const iconBgStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "bg-blue-500/15 text-blue-400",
  cyan:   "bg-cyan-500/15 text-cyan-400",
  green:  "bg-emerald-500/15 text-emerald-400",
  violet: "bg-violet-500/15 text-violet-400",
  amber:  "bg-amber-500/15 text-amber-400",
  rose:   "bg-rose-500/15 text-rose-400",
  sky:    "bg-sky-500/15 text-sky-400",
  teal:   "bg-teal-500/15 text-teal-400",
};

const glowStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "group-hover:shadow-[0_0_30px_oklch(0.6_0.2_250/0.2)]",
  cyan:   "group-hover:shadow-[0_0_30px_oklch(0.72_0.18_210/0.2)]",
  green:  "group-hover:shadow-[0_0_30px_oklch(0.7_0.18_160/0.2)]",
  violet: "group-hover:shadow-[0_0_30px_oklch(0.65_0.2_290/0.2)]",
  amber:  "group-hover:shadow-[0_0_30px_oklch(0.75_0.18_80/0.2)]",
  rose:   "group-hover:shadow-[0_0_30px_oklch(0.65_0.2_15/0.2)]",
  sky:    "group-hover:shadow-[0_0_30px_oklch(0.7_0.18_230/0.2)]",
  teal:   "group-hover:shadow-[0_0_30px_oklch(0.7_0.15_185/0.2)]",
};

const borderHoverStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "group-hover:border-blue-500/50",
  cyan:   "group-hover:border-cyan-500/50",
  green:  "group-hover:border-emerald-500/50",
  violet: "group-hover:border-violet-500/50",
  amber:  "group-hover:border-amber-500/50",
  rose:   "group-hover:border-rose-500/50",
  sky:    "group-hover:border-sky-500/50",
  teal:   "group-hover:border-teal-500/50",
};

const openTextStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:   "text-blue-400 group-hover:text-blue-300",
  cyan:   "text-cyan-400 group-hover:text-cyan-300",
  green:  "text-emerald-400 group-hover:text-emerald-300",
  violet: "text-violet-400 group-hover:text-violet-300",
  amber:  "text-amber-400 group-hover:text-amber-300",
  rose:   "text-rose-400 group-hover:text-rose-300",
  sky:    "text-sky-400 group-hover:text-sky-300",
  teal:   "text-teal-400 group-hover:text-teal-300",
};

// ─── Service data ─────────────────────────────────────────────────────────────

const coreServices: ServiceCard[] = [
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
    note: "Open Firehose Feed",
    noteUrl: "https://yycmesh.meshmonitoring.com/firehose",
    qrCode: "https://d2xsxph8kpxj0f.cloudfront.net/310519663459784497/HNPJdRREoZxPBHo4cuB8dc/yyc-zapp-qr_65981a83.png",
    qrLink: "https://yycmesh.meshmonitoring.com/firehose",
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
    note: "Open Firehose Feed",
    noteUrl: "https://yyc.meshmonitoring.com/firehose",
    qrCode: "https://d2xsxph8kpxj0f.cloudfront.net/310519663459784497/HNPJdRREoZxPBHo4cuB8dc/yyc-wyk0-qr_1f445bc9.png",
    qrLink: "https://yyc.meshmonitoring.com/firehose",
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
    note: "Open Firehose Feed",
    noteUrl: "https://ca.meshmonitoring.com/firehose",
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

const resourceServices: ServiceCard[] = [
  {
    id: "mt-mc-relay",
    title: "Meshtastic\u2194MeshCore Relay",
    subtitle: "Protocol Bridge",
    description:
      "A relay bridge enabling seamless message passing between Meshtastic and MeshCore networks, allowing operators on both protocols to communicate across the mesh.",
    url: "https://meshnard.com/mesh/mt-mc_relay",
    badge: "Tool",
    badgeColor: "violet",
    icon: <NetworkIcon className="w-6 h-6" />,
    tag: "meshnard.com",
  },
  {
    id: "canadian-mesh-links",
    title: "Canadian Mesh Links",
    subtitle: "by MeshNard",
    description:
      "Curated directory of Canadian mesh network resources, tools, communities, and reference links compiled by MeshNard for Meshtastic and MeshCore operators across Canada.",
    url: "https://meshnard.com/meshlinks",
    badge: "Directory",
    badgeColor: "cyan",
    icon: <LinkIcon className="w-6 h-6" />,
    tag: "meshnard.com",
  },
  {
    id: "mesh-web-relay",
    title: "Mesh Web Relay",
    subtitle: "Northern BC",
    description:
      "A secure message relay bridging the internet, local Meshtastic and MeshCore networks in Northern BC, and the Canadaverse MQTT network \u2014 enabling cross-network communication.",
    url: "https://relay.meshnard.com/",
    badge: "Relay",
    badgeColor: "teal",
    icon: <RadioIcon className="w-6 h-6" />,
    tag: "relay.meshnard.com",
  },
  {
    id: "meshnard-software",
    title: "MeshNard Mesh Software",
    subtitle: "Open Source Tools",
    description:
      "A collection of open source mesh networking software tools developed by MeshNard for Meshtastic and MeshCore operators, including utilities, scripts, and integrations.",
    url: "https://meshnard.com/mesh/software",
    badge: "Software",
    badgeColor: "amber",
    icon: <AnalyzerIcon className="w-6 h-6" />,
    tag: "meshnard.com",
  },
  {
    id: "meshing-around",
    title: "Meshing Around",
    subtitle: "Mesh Bot",
    description:
      "An open source bot for Meshtastic network testing and BBS activities. Supports automated network health checks, message relay, and bulletin board system features for mesh operators.",
    url: "https://github.com/SpudGunMan/meshing-around",
    badge: "Bot",
    badgeColor: "rose",
    icon: <BotIcon className="w-6 h-6" />,
    tag: "github.com/SpudGunMan",
  },
  {
    id: "meshcore-bot",
    title: "MeshCore Bot",
    subtitle: "Python Automation Bot",
    description:
      "A Python bot connecting to MeshCore networks via serial, BLE, or TCP/IP. Responds to keywords, executes plugin-based commands, and provides weather, solar conditions, and satellite pass data. Includes Discord bridge, MQTT packet capture, map uploader, rate limiting, user management, and scheduled messages.",
    url: "https://github.com/agessaman/meshcore-bot",
    badge: "Bot",
    badgeColor: "sky",
    icon: <BotIcon className="w-6 h-6" />,
    tag: "github.com/agessaman",
  },
];

const communityServices: ServiceCard[] = [
  {
    id: "yyc-custom-mesh",
    title: "YYC Custom Mesh",
    subtitle: "YYCMesh Community",
    description:
      "Local HAMs and hobbyists running a public, off-grid communications mesh in Southern Alberta using Meshtastic. Come test the new YYC Mesh radio settings and participate in a fresh Meshtastic network!",
    url: "https://yycmesh.com/",
    badge: "Community",
    badgeColor: "sky",
    icon: <RadioIcon className="w-6 h-6" />,
    tag: "yycmesh.com",
    note: "YYC Mesh Radio Settings",
    noteUrl: "https://yycmesh.com/about",
    qrCode: "https://d2xsxph8kpxj0f.cloudfront.net/310519663459784497/HNPJdRREoZxPBHo4cuB8dc/yycmesh-join_6c2de6ec.png",
    qrLink: "https://meshtastic.org/e/#CgMSAQESGxAHGPQDIAsoCDgBQANIAVAeaAF1AKxhRMAGAQ",
  },
  {
    id: "canadaverse-dashboard",
    title: "Canadaverse",
    subtitle: "Dashboard",
    description:
      "Community mesh dashboard for the Canadaverse MQTT network. Explore node activity, message traffic, and network statistics. Guest access available with credentials guest / guest.",
    url: "https://dash.mt.gt",
    badge: "Dashboard",
    badgeColor: "sky",
    icon: <DashboardIcon className="w-6 h-6" />,
    tag: "dash.mt.gt",
    note: "Login: guest / guest — Maintainer: @tb0hdan",
    note2: "Canadaverse Meshtastic Metrics Exporter",
    note2Url: "https://dash.mt.gt/d/edqkge9mf7v28g/main-dashboard?orgId=1&refresh=5s&from=now-24h&to=now",
  },
  {
    id: "canadaverse-meshinfo",
    title: "Canadaverse MeshInfo",
    subtitle: "Node Information Portal",
    description:
      "Detailed node information portal for the Canadaverse mesh network. Look up node profiles, hardware details, telemetry history, and connectivity data for nodes seen on the Canadaverse MQTT server.",
    url: "https://mi.mt.gt/",
    badge: "Info",
    badgeColor: "teal",
    icon: <NetworkIcon className="w-6 h-6" />,
    tag: "mi.mt.gt",
  },
  {
    id: "ottawa-mesh",
    title: "Greater Ottawa Mesh Enthusiasts",
    subtitle: "Ottawa Mesh Community",
    description:
      "Hub for the Greater Ottawa area Meshtastic mesh community. Find local node information, community resources, and connect with Ottawa-area mesh operators.",
    url: "https://ottawamesh.ca/",
    badge: "Community",
    badgeColor: "green",
    icon: <GlobeIcon className="w-6 h-6" />,
    tag: "ottawamesh.ca",
  },
  {
    id: "node-map",
    title: "Meshtastic Node Map",
    subtitle: "map.mt.gt",
    description:
      "A nearly live map of Meshtastic nodes seen by the Canadaverse MQTT server. Discover active nodes across Canada, their positions, and signal reach on an interactive map.",
    url: "https://map.mt.gt/",
    badge: "Map",
    badgeColor: "violet",
    icon: <MapPinIcon className="w-6 h-6" />,
    tag: "map.mt.gt",
  },
  {
    id: "canadaverse-wiki",
    title: "Canadaverse Mesh Wiki",
    subtitle: "Community Knowledge Base",
    description:
      "Comprehensive wiki covering Canadaverse mesh setup, configuration guides, node best practices, and community documentation for Canadian Meshtastic operators.",
    url: "https://wiki.mt.gt/",
    badge: "Wiki",
    badgeColor: "teal",
    icon: <BookIcon className="w-6 h-6" />,
    tag: "wiki.mt.gt",
  },
  {
    id: "meshmon-kw",
    title: "MeshMonitor",
    subtitle: "KW / NEOSG2 Region",
    description:
      "Regional mesh health monitoring and node status dashboard for the Kitchener-Waterloo and NEOSG2 areas. Track node uptime, signal quality, and network health in real time.",
    url: "https://meshmon.canadaverse.org/#nodes",
    badge: "Monitor",
    badgeColor: "rose",
    icon: <HeartbeatIcon className="w-6 h-6" />,
    tag: "meshmon.canadaverse.org",
  },
  {
    id: "cedarmesh",
    title: "CedarMesh",
    subtitle: "GTA+ Community Hub",
    description:
      "Greater Toronto Area and surrounding region community hub featuring tools, setup guides, local mesh resources, and a welcoming space for GTA+ Meshtastic enthusiasts.",
    url: "https://cedarmesh.ca/",
    badge: "Community",
    badgeColor: "amber",
    icon: <TreeIcon className="w-6 h-6" />,
    tag: "cedarmesh.ca",
  },
  {
    id: "canadaverse-links",
    title: "Canadaverse Links Directory",
    subtitle: "Resource Index",
    description:
      "Curated directory of Canadaverse mesh network resources, tools, community links, and external references. The central index for everything in the Canadian mesh ecosystem.",
    url: "https://canadaverse.org/",
    badge: "Directory",
    badgeColor: "cyan",
    icon: <LinkIcon className="w-6 h-6" />,
    tag: "canadaverse.org",
  },
];

// ─── Animated mesh canvas ─────────────────────────────────────────────────────

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

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96, 165, 250, 0.7)";
        ctx.fill();

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grad.addColorStop(0, "rgba(96, 165, 250, 0.3)");
        grad.addColorStop(1, "rgba(96, 165, 250, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

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

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ card, index }: { card: ServiceCard; index: number }) {
  const delays = [
    "animation-delay-100",
    "animation-delay-200",
    "animation-delay-300",
    "animation-delay-400",
    "animation-delay-500",
    "animation-delay-600",
    "animation-delay-700",
  ];
  const delayClass = delays[index % delays.length];

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
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div className={`p-3 rounded-xl ${iconBgStyles[card.badgeColor]}`}>
            {card.icon}
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`mono-label px-2.5 py-1 rounded-full text-xs font-medium ${badgeStyles[card.badgeColor]}`}>
              {card.badge}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-3">
          <p className="mono-label text-white/40 uppercase tracking-widest text-xs mb-1">
            {card.title}
          </p>
          <h3 className="text-lg font-700 text-white leading-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
            {card.subtitle}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-white/55 leading-relaxed mb-4">
          {card.description}
        </p>

        {/* Note (optional) */}
        {card.note && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-white/4 border border-white/6">
            {card.noteUrl ? (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(card.noteUrl, "_blank", "noopener,noreferrer"); }}
                className="mono-label text-sky-400/70 hover:text-sky-300 text-xs underline underline-offset-2 transition-colors duration-150 bg-transparent border-0 p-0"
              >
                {card.note}
              </button>
            ) : (
              <p className="mono-label text-white/40 text-xs">{card.note}</p>
            )}
          </div>
        )}

        {/* Second note (optional) */}
        {card.note2 && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-white/4 border border-white/6">
            {card.note2Url ? (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(card.note2Url, "_blank", "noopener,noreferrer"); }}
                className="mono-label text-sky-400/70 hover:text-sky-300 text-xs underline underline-offset-2 transition-colors duration-150 bg-transparent border-0 p-0"
              >
                {card.note2}
              </button>
            ) : (
              <p className="mono-label text-white/40 text-xs">{card.note2}</p>
            )}
          </div>
        )}

        {/* QR code block (optional) */}
        {card.qrCode && card.qrLink && (
          <div className="mb-4 rounded-xl border border-white/8 bg-white/3 p-4 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(card.qrLink, "_blank", "noopener,noreferrer"); }}
              className="block bg-transparent border-0 p-0"
              title="Scan QR code or click to join YYCMesh radio settings"
            >
              <img
                src={card.qrCode}
                alt="YYCMesh radio settings QR code"
                className="w-28 h-28 rounded-lg"
                style={{ filter: "invert(1)" }}
              />
            </button>
            <p className="mono-label text-white/35 text-xs text-center">Scan the QR code or click below to join directly:</p>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(card.qrLink, "_blank", "noopener,noreferrer"); }}
              className="mono-label text-xs font-medium px-3 py-1.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:text-sky-200 hover:bg-sky-500/25 transition-all duration-150 tracking-widest uppercase"
            >
              YYCMESH RADIO SETTINGS
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/6">
          <span className="mono-label text-white/30 truncate max-w-[200px]">
            {card.tag}
          </span>
          <span className={`flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 ${openTextStyles[card.badgeColor]}`}>
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
    const target = 20;
    let current = 0;
    const step = () => {
      current++;
      setCount(current);
      if (current < target) setTimeout(step, 80);
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
          5+
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

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="flex-1 h-px bg-white/8" />
      <span className="mono-label text-white/30 text-xs uppercase tracking-widest px-3">{label}</span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6" style={{ background: "oklch(0.11 0.008 265 / 0.85)", backdropFilter: "blur(16px)" }}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
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
          {/* Section nav — hidden on mobile, visible md+ */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#services" className="mono-label text-white/40 hover:text-white/80 text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-white/6 transition-all duration-200">Services</a>
            <a href="#community" className="mono-label text-white/40 hover:text-white/80 text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-white/6 transition-all duration-200">Community</a>
            <a href="#resources" className="mono-label text-white/40 hover:text-white/80 text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-white/6 transition-all duration-200">Resources</a>
          </nav>

          {/* Hamburger — visible on mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white/90 hover:bg-white/8 transition-all duration-200"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/wykweb/meshmonitoring"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors duration-200"
              title="View on GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="mono-label text-emerald-400 text-xs hidden sm:inline">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/8 px-4 py-3 flex flex-col gap-1" style={{ background: "oklch(0.11 0.008 265 / 0.97)" }}>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="mono-label text-white/60 hover:text-white text-xs uppercase tracking-widest px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all duration-200">Services</a>
            <a href="#community" onClick={() => setMobileMenuOpen(false)} className="mono-label text-white/60 hover:text-white text-xs uppercase tracking-widest px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all duration-200">Community</a>
            <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="mono-label text-white/60 hover:text-white text-xs uppercase tracking-widest px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all duration-200">Resources</a>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <MeshCanvas />

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
            Monitoring the Canadian{" "}
            <span className="gradient-text">Mesh Networks</span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10 opacity-0 animate-fade-up animation-delay-300">
            Real-time firehose feeds, interactive maps, and network analyzers for the{" "}
            <span className="text-white/80">YYC</span> and{" "}
            <span className="text-white/80">Canada</span> Meshtastic &amp; Meshcore mesh communities.
          </p>

          {/* CTAs — now three buttons */}
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
            <a
              href="https://meshcore.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-500/8 hover:bg-cyan-500/15 text-cyan-300 hover:text-cyan-200 font-500 text-sm transition-all duration-200 hover:shadow-[0_0_18px_rgba(6,182,212,0.2)]"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}
            >
              About MeshCore
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </a>
          </div>

          <StatsBar />
        </div>
      </section>

      {/* ── Core Services ── */}
      <section id="services" className="py-20 relative">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="mono-label text-blue-400 uppercase tracking-widest text-xs mb-3">
              Core Services
            </p>
            <h2
              className="text-3xl sm:text-4xl font-700 text-white"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
            >
              YYC &amp; Canada Mesh Monitoring
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Live firehose feeds, mesh maps, and analyzers for the Calgary and national Meshtastic &amp; Meshcore networks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreServices.slice(0, 3).map((card, i) => (
              <ServiceCard key={card.id} card={card} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%+1.25rem)] lg:mx-auto">
            {coreServices.slice(3).map((card, i) => (
              <ServiceCard key={card.id} card={card} index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Services ── */}
      <section id="community" className="pb-20 relative">
        <div className="container">
          <SectionDivider label="Community Resources" />

          <div className="mb-10 text-center">
            <p className="mono-label text-cyan-400 uppercase tracking-widest text-xs mb-3">
              Community Network
            </p>
            <h2
              className="text-3xl sm:text-4xl font-700 text-white"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
            >
              Canadaverse &amp; Regional Hubs
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Dashboards, maps, wikis, and community hubs from across the Canadian mesh ecosystem.
            </p>
          </div>

          {/* ── Canadaverse Network sub-group ── */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-white/6" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/8">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
                </span>
                <span className="mono-label text-cyan-400/80 text-xs uppercase tracking-widest">Canadaverse Network</span>
              </div>
              <div className="h-px flex-1 bg-white/6" />
            </div>
            {/* First row: YYC Custom Mesh + Canadaverse Dashboard + Canadaverse MeshInfo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {communityServices.slice(0, 3).map((card, i) => (
                <ServiceCard key={card.id} card={card} index={i} />
              ))}
            </div>
            {/* Second row: Node Map + Wiki + Links Directory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {[communityServices[4], communityServices[5], communityServices[8]].map((card, i) => (
                <ServiceCard key={card.id} card={card} index={i + 3} />
              ))}
            </div>
          </div>

          {/* ── Regional Communities sub-group ── */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-white/6" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                <span className="mono-label text-emerald-400/80 text-xs uppercase tracking-widest">Regional Communities</span>
              </div>
              <div className="h-px flex-1 bg-white/6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[communityServices[3], communityServices[6], communityServices[7]].map((card, i) => (
                <ServiceCard key={card.id} card={card} index={i + 6} />
              ))}
            </div>
          </div>

          {/* ── Submit a Resource CTA ── */}
          <div className="flex flex-col items-center gap-4 pt-6 border-t border-white/6">
            <p className="mono-label text-white/30 text-xs uppercase tracking-widest">Know a resource we're missing?</p>
            <a
              href="https://github.com/wykweb/meshmonitoring/issues/new?template=submit-resource.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/12 bg-white/4 hover:bg-white/8 hover:border-white/20 text-white/60 hover:text-white/90 text-sm font-500 transition-all duration-200 group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Submit a Resource
              <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-80 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
            <p className="mono-label text-white/20 text-xs text-center max-w-sm">
              Open a GitHub issue or pull request to propose a new community service, tool, or regional hub to be listed on this page.
            </p>
          </div>
        </div>
      </section>

      {/* ── Resources ── */}
      <section id="resources" className="pb-20 relative">
        <div className="container">
          <SectionDivider label="Resources" />

          <div className="mb-10 text-center">
            <p className="mono-label text-amber-400 uppercase tracking-widest text-xs mb-3">
              Tools &amp; Software
            </p>
            <h2
              className="text-3xl sm:text-4xl font-700 text-white"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
            >
              Mesh Tools &amp; Resources
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Open source tools, protocol bridges, relays, and software for Meshtastic &amp; MeshCore operators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resourceServices.slice(0, 3).map((card, i) => (
              <ServiceCard key={card.id} card={card} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%+1.25rem)] lg:mx-auto">
            {resourceServices.slice(3).map((card, i) => (
              <ServiceCard key={card.id} card={card} index={i + 3} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
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
      <footer className="border-t border-white/6 pt-8 pb-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
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
        {/* Legal disclaimer */}
        <div className="container">
          <div className="border-t border-white/6 pt-5">
            <p className="mono-label text-white/20 text-xs text-center leading-relaxed max-w-3xl mx-auto">
              <span className="text-white/30 font-medium">Note:</span> We are not affiliated with Meshtastic or Meshcore.{" "}
              &copy; 2026 MeshMonitoring.com. MeshMonitoring.com is not affiliated with Meshtastic or Meshcore.{" "}
              Meshtastic and Meshcore are registered trademarks of the Meshtastic respective Meshcore Projects.{" "}
              MeshMonitoring.com makes reference to Meshtastic &amp; Meshcore under the M Powered community fair&#8209;use guidelines.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
