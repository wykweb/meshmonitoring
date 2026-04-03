/**
 * Home.tsx — Mesh Monitoring Landing Page
 * Design: "Radio Dark" — Dark Prestige / Operational Intelligence
 * Colors: Deep charcoal bg, electric blue (#3b82f6) + cyan (#06b6d4) accents
 * Typography: Outfit (display/body) + Fira Code (mono/technical)
 * Cards: Glassmorphism with hover glow, staggered fade-up entrance
 */

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  badge: string;
  badgeColor: "blue" | "cyan" | "green" | "emerald" | "violet" | "amber" | "rose" | "sky" | "teal";
  icon?: React.ReactNode;
  tag: string;
  note?: string;
  noteUrl?: string;
  note2?: string;
  note2Url?: string;
  qrCode?: string;
  qrLink?: string;
  qrCaption?: string;
  addedAt?: string; // ISO date string e.g. "2026-04-03"
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

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

// ─── Badge / style maps ───────────────────────────────────────────────────────

const badgeStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:    "bg-blue-500/15 text-blue-300 border border-blue-500/25",
  cyan:    "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
  green:   "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  emerald: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
  violet:  "bg-violet-500/15 text-violet-300 border border-violet-500/25",
  amber:   "bg-amber-500/15 text-amber-300 border border-amber-500/25",
  rose:    "bg-rose-500/15 text-rose-300 border border-rose-500/25",
  sky:     "bg-sky-500/15 text-sky-300 border border-sky-500/25",
  teal:    "bg-teal-500/15 text-teal-300 border border-teal-500/25",
};

const iconBgStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:    "bg-blue-500/15 text-blue-400",
  cyan:    "bg-cyan-500/15 text-cyan-400",
  green:   "bg-emerald-500/15 text-emerald-400",
  emerald: "bg-emerald-500/15 text-emerald-400",
  violet:  "bg-violet-500/15 text-violet-400",
  amber:   "bg-amber-500/15 text-amber-400",
  rose:    "bg-rose-500/15 text-rose-400",
  sky:     "bg-sky-500/15 text-sky-400",
  teal:    "bg-teal-500/15 text-teal-400",
};

const glowStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:    "group-hover:shadow-[0_0_30px_oklch(0.6_0.2_250/0.2)]",
  cyan:    "group-hover:shadow-[0_0_30px_oklch(0.72_0.18_210/0.2)]",
  green:   "group-hover:shadow-[0_0_30px_oklch(0.7_0.18_160/0.2)]",
  emerald: "group-hover:shadow-[0_0_30px_oklch(0.7_0.18_160/0.2)]",
  violet:  "group-hover:shadow-[0_0_30px_oklch(0.65_0.2_290/0.2)]",
  amber:   "group-hover:shadow-[0_0_30px_oklch(0.75_0.18_80/0.2)]",
  rose:    "group-hover:shadow-[0_0_30px_oklch(0.65_0.2_15/0.2)]",
  sky:     "group-hover:shadow-[0_0_30px_oklch(0.7_0.18_230/0.2)]",
  teal:    "group-hover:shadow-[0_0_30px_oklch(0.7_0.15_185/0.2)]",
};

const borderHoverStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:    "group-hover:border-blue-500/50",
  cyan:    "group-hover:border-cyan-500/50",
  green:   "group-hover:border-emerald-500/50",
  emerald: "group-hover:border-emerald-500/50",
  violet:  "group-hover:border-violet-500/50",
  amber:   "group-hover:border-amber-500/50",
  rose:    "group-hover:border-rose-500/50",
  sky:     "group-hover:border-sky-500/50",
  teal:    "group-hover:border-teal-500/50",
};

const openTextStyles: Record<ServiceCard["badgeColor"], string> = {
  blue:    "text-blue-400 group-hover:text-blue-300",
  cyan:    "text-cyan-400 group-hover:text-cyan-300",
  green:   "text-emerald-400 group-hover:text-emerald-300",
  emerald: "text-emerald-400 group-hover:text-emerald-300",
  violet:  "text-violet-400 group-hover:text-violet-300",
  amber:   "text-amber-400 group-hover:text-amber-300",
  rose:    "text-rose-400 group-hover:text-rose-300",
  sky:     "text-sky-400 group-hover:text-sky-300",
  teal:    "text-teal-400 group-hover:text-teal-300",
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
    qrLink: "https://meshtastic.org/e/#CgMSAQESGxAHGPQDIAsoCDgBQANIAVAeaAF1AKxhRMAGAQ",
    qrCaption: "Scan to join the YYC Mesh Custom channel",
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
    qrLink: "https://meshtastic.org/e/#CgMSAQESGxAHGPQDIAsoCDgBQANIAVAeaAF1AKxhRMAGAQ",
    qrCaption: "Scan to join the YYC Mesh Custom channel",
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
  {
    id: "meshmonitor-org",
    title: "MeshMonitor",
    subtitle: "Your mesh. Your data.",
    description:
      "Self-hosted Meshtastic monitoring with real-time maps, alerts, and full network awareness.",
    url: "https://meshmonitor.org/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshmonitor.org",
  },
  {
    id: "meshsense-app",
    title: "MeshSense",
    subtitle: "Desktop Network Monitor",
    description:
      "A simple, open-source application that monitors, maps and graphically displays all the vital stats of your area's Meshtastic network — including connected nodes, signal reports, trace routes and more.",
    url: "https://affirmatech.com/meshsense",
    badge: "Software",
    badgeColor: "amber",
    icon: <AnalyzerIcon className="w-6 h-6" />,
    tag: "affirmatech.com",
  },
  {
    id: "meshtastic-metrics-exporter",
    title: "Meshtastic Metrics Exporter",
    subtitle: "MQTT → TimescaleDB + Grafana",
    description:
      "Collects and stores comprehensive data from Meshtastic MQTT servers into TimescaleDB, with pre-configured Grafana dashboards for visualization and analysis of node telemetry and network activity.",
    url: "https://github.com/tcivie/meshtastic-metrics-exporter",
    badge: "Tool",
    badgeColor: "violet",
    icon: <AnalyzerIcon className="w-6 h-6" />,
    tag: "github.com/tcivie",
  },
  {
    id: "tc2-bbs-mesh",
    title: "TC2-BBS-mesh",
    subtitle: "Meshtastic BBS System",
    description:
      "The TC\u00b2-BBS system integrated with Meshtastic devices. Supports message handling, bulletin boards, mail systems, and a channel directory for mesh network operators.",
    url: "https://github.com/TheCommsChannel/TC2-BBS-mesh",
    badge: "Bot",
    badgeColor: "rose",
    icon: <BotIcon className="w-6 h-6" />,
    tag: "github.com/TheCommsChannel",
  },
  {
    id: "meshcore-observer-onboard",
    title: "MeshCore Analyzer — Add an Observer",
    subtitle: "Network Analysis Tool",
    description:
      "Observers are MQTT-connected MeshCore nodes that report the packets they hear to the MeshCore Analyzer service. By collecting data from multiple Observers across different locations, the service analyzes network reliability, packet routing, and coverage from many perspectives. Observers can be MeshCore repeaters, room servers, or companion devices.",
    url: "https://analyzer.letsmesh.net/observer/onboard",
    badge: "Tool",
    badgeColor: "violet",
    icon: <NetworkIcon className="w-6 h-6" />,
    tag: "analyzer.letsmesh.net",
  },
  {
    id: "meshinfo-lite",
    title: "MeshInfo Lite",
    subtitle: "MQTT Visualizer — Python + MariaDB",
    description:
      "A highly customized Python application that connects to an MQTT server receiving Meshtastic messages for visualizing and inspecting traffic. Uses MariaDB to persist content. Docker Compose support included for easy self-hosted deployment.",
    url: "https://github.com/dadecoza/meshinfo-lite",
    badge: "MeshInfo",
    badgeColor: "emerald",
    icon: <AnalyzerIcon className="w-6 h-6" />,
    tag: "github.com/dadecoza",
    addedAt: "2026-04-03",
  },
  {
    id: "meshinfo",
    title: "MeshInfo",
    subtitle: "Real-time Mesh Web App",
    description:
      "A real-time web application for visualizing and monitoring Meshtastic mesh networks. Connects to one or more MQTT brokers, decodes protobuf and JSON messages in real time, stores everything in PostgreSQL, and serves it through a FastAPI backend and React frontend.",
    url: "https://github.com/MeshAddicts/meshinfo",
    badge: "MeshInfo",
    badgeColor: "emerald",
    icon: <AnalyzerIcon className="w-6 h-6" />,
    tag: "github.com/MeshAddicts",
    addedAt: "2026-04-03",
  },
  {
    id: "meshmapper-wardriving",
    title: "MeshMapper for MeshCore Wardriving",
    subtitle: "RF Coverage Visualizer — MeshCore",
    description:
      "Visualizes real-world MeshCore coverage using data collected by local mesh operators wardriving their area. Unlike simple node maps, MeshMapper shows actual RF coverage — answering 'Can I reach the mesh from here?', 'Which repeater gives the best coverage?', and 'Where are the dead zones?' Built with contributions from the Greater Ottawa Mesh Radio Enthusiasts.",
    url: "https://wiki.meshmapper.net/",
    badge: "Tool",
    badgeColor: "violet",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "wiki.meshmapper.net",
    note: "Community: Greater Ottawa Mesh Radio Enthusiasts — ottawamesh.ca",
    addedAt: "2026-04-03",
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
  {
    id: "discord-yyc-meshcore",
    title: "YYC MeshCore Network",
    subtitle: "Discord Community",
    description:
      "Join the YYC MeshCore Network Discord server — connect with local mesh operators, share node updates, get help with setup, and stay up to date with YYC mesh activity.",
    url: "https://discord.gg/CznDhsRWnJ",
    badge: "Discord",
    badgeColor: "violet",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
    tag: "discord.gg/CznDhsRWnJ",
    note: "Join the YYC MeshCore Network — open to all mesh enthusiasts",
  },
  {
    id: "salish-mesh",
    title: "Salish Mesh",
    subtitle: "🇨🇦 Salish Sea & Surrounding Area — Canada",
    description:
      "Community mesh network covering the Salish Sea and surrounding region, connecting Meshtastic operators across coastal British Columbia and the Pacific Northwest border area.",
    url: "https://salishmesh.net/",
    badge: "Community",
    badgeColor: "green",
    tag: "salishmesh.net",
  },
  {
    id: "vancouver-mesh",
    title: "Vancouver MESH",
    subtitle: "🇨🇦 Vancouver, BC & South Island — Canada",
    description:
      "Community group building a mesh network of solar-powered Meshtastic radios in Vancouver, BC and the South Island area. Focused on resilient, off-grid community communications.",
    url: "https://vancouvermesh.ca/",
    badge: "Community",
    badgeColor: "green",
    tag: "vancouvermesh.ca",
  },
  {
    id: "yeg-mesh",
    title: "YEG MESH",
    subtitle: "🇨🇦 Edmonton, Alberta — Canada",
    description:
      "Edmonton's core mesh community, following the Calgary community's lead and adopting the new \"Custom LongModTurbo\" settings for a fresh, high-performance Meshtastic network.",
    url: "https://yegmesh.ca/",
    badge: "Community",
    badgeColor: "green",
    tag: "yegmesh.ca",
  },
];

// ─── USA Meshtastic Networks ────────────────────────────────────────────────────

const usaServices: ServiceCard[] = [
  {
    id: "sf-bay-area",
    title: "SF Bay Area Mesh",
    subtitle: "San Francisco Bay Area — USA",
    description:
      "Meshtastic mesh network viewer for the San Francisco Bay Area. Explore active nodes, signal reports, and network activity across the Bay Area mesh community.",
    url: "https://meshview.bayme.sh",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.bayme.sh",
  },
  {
    id: "sacramento-valley",
    title: "Sacramento Valley Mesh",
    subtitle: "Sacramento Valley — USA",
    description:
      "Meshtastic mesh network viewer for the Sacramento Valley region. Monitor local nodes, trace routes, and track network coverage across the Sacramento Valley mesh.",
    url: "https://www.svme.sh",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "svme.sh",
  },
  {
    id: "new-york-mesh",
    title: "New York Mesh",
    subtitle: "New York — USA",
    description:
      "Meshtastic mesh network viewer for the New York area. Explore active nodes, message traffic, and signal coverage across the New York Meshtastic community.",
    url: "https://meshview.nyme.sh",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.nyme.sh",
  },
  {
    id: "los-angeles-mesh",
    title: "SoCal Mesh",
    subtitle: "Los Angeles — USA",
    description:
      "Meshtastic mesh network viewer for the Southern California / Los Angeles area. Track nodes, signal reports, and mesh activity across the SoCal Meshtastic network.",
    url: "https://meshview.socalmesh.org",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.socalmesh.org",
  },
  {
    id: "western-pa-mesh",
    title: "Western PA Mesh",
    subtitle: "Western Pennsylvania — USA",
    description:
      "Interactive map and node viewer for the Western Pennsylvania Meshtastic mesh network. Monitor local nodes and network coverage across the WPA mesh community.",
    url: "https://map.wpamesh.net",
    badge: "Map",
    badgeColor: "violet",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "map.wpamesh.net",
  },
  {
    id: "chicago-mesh",
    title: "Chicagoland Mesh",
    subtitle: "Chicago — USA",
    description:
      "Meshtastic mesh network viewer for the Chicagoland area. Explore active nodes, signal reports, and network activity across the Chicago and surrounding area mesh community.",
    url: "https://meshview.chicagolandmesh.org",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.chicagolandmesh.org",
  },
  {
    id: "salt-lake-city-mesh",
    title: "Freq51 Mesh",
    subtitle: "Salt Lake City — USA",
    description:
      "Meshtastic mesh network viewer for the Salt Lake City area. Monitor nodes, signal coverage, and mesh activity across the Freq51 Meshtastic community in Utah.",
    url: "https://meshview.freq51.net/",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.freq51.net",
  },
  {
    id: "north-georgia-mesh",
    title: "Mountain Mesh",
    subtitle: "North Georgia / East Tennessee — USA",
    description:
      "Meshtastic mesh network viewer for the North Georgia and East Tennessee mountain region. Explore nodes and signal coverage across the mtnme.sh mesh community.",
    url: "https://view.mtnme.sh",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "view.mtnme.sh",
  },
  {
    id: "pioneer-valley-mesh",
    title: "Pioneer Valley Mesh",
    subtitle: "Massachusetts — USA",
    description:
      "Meshtastic mesh network viewer for the Pioneer Valley region of Massachusetts. Track active nodes and network coverage across the PV Mesh community.",
    url: "https://meshview.pvmesh.org",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.pvmesh.org",
  },
  {
    id: "louisiana-mesh",
    title: "Louisiana Mesh",
    subtitle: "Louisiana — USA",
    description:
      "Meshtastic mesh network viewer for Louisiana. Monitor active nodes, signal reports, and mesh activity across the Louisiana Meshtastic community.",
    url: "https://meshview.louisianamesh.org",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.louisianamesh.org",
  },
  {
    id: "sw-louisiana-mesh",
    title: "SW Louisiana Mesh",
    subtitle: "Southwest Louisiana — USA",
    description:
      "Meshtastic mesh network hub for Southwest Louisiana. Connect with local mesh operators and explore the SWLA mesh network coverage and community resources.",
    url: "https://www.swlamesh.com",
    badge: "Community",
    badgeColor: "green",
    icon: <GlobeIcon className="w-6 h-6" />,
    tag: "swlamesh.com",
  },
  {
    id: "oregon-mesh",
    title: "Oregon Mesh",
    subtitle: "Oregon — USA",
    description:
      "Meshtastic mesh network viewer for Oregon. Explore active nodes, signal reports, and network coverage across the Oregon Meshtastic community.",
    url: "https://meshview.meshoregon.com",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.meshoregon.com",
  },
  {
    id: "georgia-mesh",
    title: "Georgia Mesh",
    subtitle: "Georgia — USA",
    description:
      "Meshtastic mesh network viewer for Georgia. Monitor active nodes, signal coverage, and mesh activity across the GA Mesh Meshtastic community.",
    url: "https://meshview.gamesh.net",
    badge: "MeshView",
    badgeColor: "sky",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshview.gamesh.net",
  },
  {
    id: "meshsense",
    title: "MeshSense",
    subtitle: "Network Monitor & Visualizer",
    description:
      "A simple, open-source application that monitors, maps, and graphically displays all the vital stats of your area's Meshtastic network — including connected nodes, signal reports, trace routes, and more.",
    url: "https://meshsense.affirmatech.com/",
    badge: "Software",
    badgeColor: "amber",
    icon: <AnalyzerIcon className="w-6 h-6" />,
    tag: "meshsense.affirmatech.com",
  },
  {
    id: "south-florida-mesh",
    title: "South Florida Mesh",
    subtitle: "South Florida — USA",
    description:
      "Monitoring the South Florida Meshtastic network with real-time updates and comprehensive coverage.",
    url: "https://meshmonitor.yeraze.com/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "areyoumeshingwith.us",
    addedAt: "2026-04-03",
    note: "Network: Are You Meshing With Us? — areyoumeshingwith.us",
  },
  {
    id: "tampa-bay-mesh",
    title: "Tampa Bay Area Mesh",
    subtitle: "Tampa Bay, Florida — USA",
    description:
      "Monitoring the Tampa Bay Area and surrounding Meshtastic Network with real-time updates and comprehensive coverage.",
    url: "https://mesh.axiom-labs.dev/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "areyoumeshingwith.us",
    addedAt: "2026-04-03",
    note: "Network: Are You Meshing With Us? — areyoumeshingwith.us",
  },
  {
    id: "central-oregon-mesh",
    title: "Central Oregon Mesh",
    subtitle: "Central Oregon — USA",
    description:
      "Community-maintained MeshMonitor instance monitoring the Central Oregon Meshtastic network.",
    url: "http://192.81.132.42:8080/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "Central Oregon, US",
    addedAt: "2026-04-03",
  },
  {
    id: "kansas-city-mesh",
    title: "Kansas City Mesh",
    subtitle: "Kansas City — USA",
    description:
      "Monitoring the Kansas City Meshtastic network with real-time updates and comprehensive coverage.",
    url: "https://map.kansascitymesh.live/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "kansascitymesh.live",
    addedAt: "2026-04-03",
    note: "Network: Kansas City Mesh",
  },
  {
    id: "milwaukee-mesh",
    title: "Milwaukee City Mesh",
    subtitle: "Milwaukee, Wisconsin — USA",
    description:
      "Monitoring Milwaukee City mesh network.",
    url: "https://mkemesh.my.id/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshconsin.org",
    addedAt: "2026-04-03",
    note: "Network: Meshconsin — meshconsin.org",
  },
  {
    id: "nwi-mesh",
    title: "NWI Mesh Net",
    subtitle: "Northwest Indiana — USA",
    description:
      "A regional mesh network serving Northwest Indiana (Lake, Porter, Newton, Jasper, and LaPorte counties) with a cross-lake link extending connectivity to Chicago.",
    url: "https://meshview.nwimesh.net/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "nwimesh.net",
    addedAt: "2026-04-03",
    note: "Network: NWIMesh.net — nwimesh.net",
  },
  {
    id: "indiana-mesh",
    title: "Indiana Mesh",
    subtitle: "Indiana — USA",
    description:
      "Monitoring the State of Indiana Meshtastic Network with real-time updates and comprehensive coverage.",
    url: "https://meshmap.tranziq.net/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "cimesh.net",
    addedAt: "2026-04-03",
    note: "Network: CIMesh — cimesh.net",
  },
  {
    id: "tulsa-mesh",
    title: "Tulsa/Broken Arrow Mesh",
    subtitle: "Tulsa/Broken Arrow, Oklahoma — USA",
    description:
      "Monitoring the Tulsa and Broken Arrow area Meshtastic network.",
    url: "https://mesh.b33rman.com/",
    badge: "MeshMonitor",
    badgeColor: "rose",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "tulsa-meshtastic.com",
    addedAt: "2026-04-03",
    note: "Networks: Tulsa Meshtastic — tulsa-meshtastic.com | OKMesh — okmesh.org",
  },
  {
    id: "central-valley-mesh",
    title: "Central Valley Mesh",
    subtitle: "Central Valley, California — USA",
    description:
      "MeshInfo-powered map and monitoring dashboard for the Central Valley Meshtastic mesh network in California.",
    url: "https://meshinfo.cvme.sh/map",
    badge: "MeshInfo",
    badgeColor: "emerald",
    icon: <MapIcon className="w-6 h-6" />,
    tag: "meshinfo.cvme.sh",
    addedAt: "2026-04-03",
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

  // "New" if addedAt is within the last 30 days
  const isNew = card.addedAt
    ? (Date.now() - new Date(card.addedAt).getTime()) < 30 * 24 * 60 * 60 * 1000
    : false;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => window.open(card.url, "_blank", "noopener,noreferrer")}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") window.open(card.url, "_blank", "noopener,noreferrer"); }}
      className={`group block opacity-0 animate-fade-up ${delayClass} cursor-pointer`}
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
            {card.icon ?? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isNew && (
              <span className="mono-label px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                New
              </span>
            )}
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
            <p className="mono-label text-white/35 text-xs text-center">{card.qrCaption ?? "Scan the QR code or click below to join directly:"}</p>
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
    </div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const [count, setCount] = useState(0);
  const [regionCount, setRegionCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Dynamically count unique geographic regions from all service arrays
        const allCards = [...coreServices, ...communityServices, ...resourceServices, ...usaServices];
        const geoRegions = new Set(
          allCards
            .map(c => c.subtitle)
            .filter(s => s.includes('\u2014'))
            .map(s => {
              const parts = s.split('\u2014');
              const region = parts[parts.length - 1].trim();
              return region === 'USA' || region === 'Canada' ? parts[0].trim().replace(/^[^a-zA-Z]+/, '') : region;
            })
            .filter(r => !['Dashboard','Mesh Bot','Python Automation Bot','Open Source Tools','Protocol Bridge','Network Analysis Tool','Network Monitor & Visualizer','Node Information Portal','Community Knowledge Base','Resource Index','Observer Zapp Mobile','Observer WYK0 Bot','YYC MeshCore Map','YYCMesh Community','Ottawa Mesh Community','GTA+ Community Hub','KW / NEOSG2 Region','Northern BC','by MeshNard','Discord Community','map.mt.gt','Meshtastic Network','Your mesh. Your data.'].includes(r))
        );
        const serviceTarget = allCards.length;
        let svc = 0;
        const svcStep = () => { svc++; setCount(svc); if (svc < serviceTarget) setTimeout(svcStep, 50); };
        setTimeout(svcStep, 300);
        const regionTarget = geoRegions.size;
        let reg = 0;
        const regStep = () => { reg++; setRegionCount(reg); if (reg < regionTarget) setTimeout(regStep, 60); };
        setTimeout(regStep, 400);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-8 py-6 opacity-0 animate-fade-up animation-delay-700">
      <div className="text-center group relative cursor-default">
        <div className="text-3xl font-800 gradient-text" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
          {count}
        </div>
        <div className="mono-label text-white/40 mt-1">Active Services</div>
        {/* Breakdown tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
          <div className="rounded-xl border border-white/10 bg-[oklch(0.13_0.01_265)] shadow-2xl p-3 text-left">
            <p className="mono-label text-white/30 text-xs uppercase tracking-widest mb-2">Breakdown</p>
            {([
              { label: 'Canada Core',  count: coreServices.length,      color: 'text-blue-400' },
              { label: 'Community',    count: communityServices.length,  color: 'text-cyan-400' },
              { label: 'Resources',    count: resourceServices.length,   color: 'text-amber-400' },
              { label: 'USA',          count: usaServices.length,        color: 'text-rose-400' },
            ] as const).map(row => (
              <div key={row.label} className="flex items-center justify-between py-0.5">
                <span className="text-white/50 text-xs">{row.label}</span>
                <span className={`mono-label text-xs font-semibold ${row.color}`}>{row.count}</span>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t border-white/8 flex items-center justify-between">
              <span className="text-white/30 text-xs">Total</span>
              <span className="mono-label text-xs font-semibold text-white/70">{coreServices.length + communityServices.length + resourceServices.length + usaServices.length}</span>
            </div>
          </div>
          <div className="w-2 h-2 bg-[oklch(0.13_0.01_265)] border-r border-b border-white/10 rotate-45 mx-auto -mt-1" />
        </div>
      </div>
      <div className="w-px h-10 bg-white/10 hidden sm:block" />
      <div className="text-center">
        <div className="text-3xl font-800 gradient-text" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
          {regionCount}
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

// ─── Search helpers ───────────────────────────────────────────────────────────

function matchesQuery(card: ServiceCard, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    card.title.toLowerCase().includes(lower) ||
    card.subtitle.toLowerCase().includes(lower) ||
    card.description.toLowerCase().includes(lower) ||
    card.badge.toLowerCase().includes(lower) ||
    card.tag.toLowerCase().includes(lower) ||
    (card.note?.toLowerCase().includes(lower) ?? false)
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSectionNav, setShowSectionNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("All");
  const searchRef = useRef<HTMLInputElement>(null);

  const TYPE_PILLS = ["All", "Firehose", "Map", "MeshView", "MeshMonitor", "MeshInfo", "Community", "Dashboard", "Bot", "Tool", "Software"];

  function matchesType(card: ServiceCard): boolean {
    if (activeType === "All") return true;
    return card.badge === activeType;
  }

  // Derived filtered arrays
  const filteredCore      = coreServices.filter(c => matchesQuery(c, searchQuery) && matchesType(c));
  const filteredCommunity = communityServices.filter(c => matchesQuery(c, searchQuery) && matchesType(c));
  const filteredResources = resourceServices.filter(c => matchesQuery(c, searchQuery) && matchesType(c));
  const filteredUSA       = usaServices.filter(c => matchesQuery(c, searchQuery) && matchesType(c));

  const totalVisible =
    filteredCore.length + filteredCommunity.length + filteredResources.length + filteredUSA.length;
  const isFiltering = searchQuery.trim().length > 0 || activeType !== "All";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowBackToTop(y > 600);
      // Show the sticky section mini-nav once user scrolls past the hero (~500px)
      setShowSectionNav(y > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Press "/" anywhere to focus the search bar; Escape to clear + blur it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (e.key === "Escape") {
        if (document.activeElement === searchRef.current) {
          setSearchQuery("");
          setActiveType("All");
          searchRef.current?.blur();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Sticky section mini-nav (appears after hero) ── */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
          showSectionNav ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ background: "oklch(0.10 0.008 265 / 0.75)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="container flex items-center justify-center gap-1 h-9">
          {([
            { label: "Services",  href: "#services",  color: "hover:text-blue-300 hover:bg-blue-500/10" },
            { label: "Community", href: "#community", color: "hover:text-cyan-300 hover:bg-cyan-500/10" },
            { label: "Resources", href: "#resources", color: "hover:text-amber-300 hover:bg-amber-500/10" },
            { label: "USA",       href: "#usa",       color: "hover:text-rose-300 hover:bg-rose-500/10" },
          ] as const).map(({ label, href, color }) => (
            <a
              key={href}
              href={href}
              className={`mono-label text-white/35 ${color} text-xs uppercase tracking-widest px-3 py-1 rounded-lg transition-all duration-150`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

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
            <a href="#usa" className="mono-label text-white/40 hover:text-white/80 text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-white/6 transition-all duration-200">USA</a>
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
              href="https://discord.gg/CznDhsRWnJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#5865F2] transition-colors duration-200"
              title="Join YYC MeshCore Network - Discord Channel"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
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
            <a href="#usa" onClick={() => setMobileMenuOpen(false)} className="mono-label text-white/60 hover:text-white text-xs uppercase tracking-widest px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all duration-200">USA</a>
            <div className="h-px bg-white/6 my-1" />
            <a
              href="https://discord.gg/CznDhsRWnJ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mono-label text-white/60 hover:text-[#5865F2] text-xs uppercase tracking-widest px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join YYC MeshCore Discord
            </a>
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
            Monitoring the Canadian &amp; USA{" "}
             <span className="gradient-text">Mesh Networks</span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10 opacity-0 animate-fade-up animation-delay-300">
            Real-time firehose feeds, interactive maps, and network analyzers for the{" "}
             <span className="text-white/80">YYC</span>,{" "}
             <span className="text-white/80">Canada</span>, and{" "}
             <span className="text-white/80">USA</span> Meshtastic &amp; Meshcore mesh communities.
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

      {/* ── Search Bar ── */}
      <div className="sticky top-16 z-40 border-b border-white/6" style={{ background: "oklch(0.10 0.008 265 / 0.92)", backdropFilter: "blur(16px)" }}>
        <div className="container py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xl">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Filter by name, region, type... press "/" to focus'
                className="w-full pl-9 pr-9 py-2 rounded-xl text-sm text-white/80 placeholder-white/25 bg-white/5 border border-white/10 focus:border-blue-500/40 focus:bg-white/8 focus:outline-none transition-all duration-200"
                style={{ fontFamily: "'Fira Code', monospace" }}
                aria-label="Filter services"
              />
              {isFiltering && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-white/30 hover:text-white/70 hover:bg-white/10 transition-all duration-150"
                  aria-label="Clear filter"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {isFiltering && (
              <span className="mono-label text-white/30 text-xs whitespace-nowrap">
                {totalVisible} result{totalVisible !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {/* Type filter pills */}
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            {TYPE_PILLS.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setActiveType(pill)}
                className={`mono-label text-xs px-3 py-1 rounded-full border transition-all duration-150 ${
                  activeType === pill
                    ? pill === "MeshMonitor"
                      ? "border-rose-500/60 bg-rose-500/15 text-rose-300"
                      : "border-blue-500/60 bg-blue-500/15 text-blue-300"
                    : "border-white/10 bg-white/4 text-white/35 hover:text-white/60 hover:bg-white/8 hover:border-white/20"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Core Services ── */}
      {(!isFiltering || filteredCore.length > 0) && (
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
              🇨🇦 YYC &amp; Canada Mesh Monitoring
            </h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Live firehose feeds, mesh maps, and analyzers for the Calgary and national Meshtastic &amp; Meshcore networks.
            </p>
          </div>

{(() => {
            const yycCards      = filteredCore.filter(c => c.badge === 'Firehose' || c.badge === 'Map');
            const nationalCards = filteredCore.filter(c => c.badge !== 'Firehose' && c.badge !== 'Map');

            const CaSubGroup = ({ label, color, cards, startIdx }: { label: string; color: string; cards: typeof filteredCore; startIdx: number }) => {
              if (cards.length === 0) return null;
              const colorMap: Record<string, { border: string; bg: string; dot: string; text: string }> = {
                blue:   { border: 'border-blue-500/20',   bg: 'bg-blue-500/8',   dot: 'bg-blue-400',   text: 'text-blue-400/80' },
                cyan:   { border: 'border-cyan-500/20',   bg: 'bg-cyan-500/8',   dot: 'bg-cyan-400',   text: 'text-cyan-400/80' },
                violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/8', dot: 'bg-violet-400', text: 'text-violet-400/80' },
              };
              const c = colorMap[color] ?? colorMap.blue;
              return (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-white/6" />
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${c.border} ${c.bg}`}>
                      <span className="relative flex h-1.5 w-1.5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-60`}></span>
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${c.dot}`}></span>
                      </span>
                      <span className={`mono-label ${c.text} text-xs uppercase tracking-widest`}>
                        {label} <span className="opacity-50">&middot; {cards.length}</span>
                      </span>
                    </div>
                    <div className="h-px flex-1 bg-white/6" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map((card, i) => (
                      <ServiceCard key={card.id} card={card} index={startIdx + i} />
                    ))}
                  </div>
                </div>
              );
            };

            if (isFiltering) {
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCore.map((card, i) => <ServiceCard key={card.id} card={card} index={i} />)}
                </div>
              );
            }

            return (
              <>
                <CaSubGroup label="YYC Firehose & Maps" color="blue"   cards={yycCards}      startIdx={0} />
                <CaSubGroup label="National Coverage"   color="cyan"   cards={nationalCards} startIdx={yycCards.length} />
              </>
            );
          })()}
        </div>
      </section>
      )}

      {/* ── Community Services ── */}
      {(!isFiltering || filteredCommunity.length > 0) && (
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

          {/* When filtering, show all matching community cards in one flat grid */}
          {isFiltering ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCommunity.map((card, i) => (
                <ServiceCard key={card.id} card={card} index={i} />
              ))}
            </div>
          ) : (
            <>
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
              {[communityServices[3], communityServices[6], communityServices[7], communityServices[9], communityServices[10], communityServices[11], communityServices[12]].map((card, i) => (
                <ServiceCard key={card.id} card={card} index={i + 6} />
              ))}
            </div>
          </div>
            </>
          )}

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
      )}

      {/* ── Resources ── */}
      {(!isFiltering || filteredResources.length > 0) && (
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

{(() => {
            const MONITORING_BADGES = new Set(["Software", "MeshMonitor", "Dashboard", "Info"]);
            const BOT_BADGES = new Set(["Bot"]);
            const PROTOCOL_BADGES = new Set(["Tool", "Relay", "Directory", "Firehose"]);

            const monitoringCards = filteredResources.filter(c => MONITORING_BADGES.has(c.badge));
            const botCards        = filteredResources.filter(c => BOT_BADGES.has(c.badge));
            const protocolCards   = filteredResources.filter(c => PROTOCOL_BADGES.has(c.badge));
            // Catch-all for any badge not in the above groups
            const otherCards      = filteredResources.filter(c => !MONITORING_BADGES.has(c.badge) && !BOT_BADGES.has(c.badge) && !PROTOCOL_BADGES.has(c.badge));

            const SubGroup = ({ label, color, cards, startIdx }: { label: string; color: string; cards: typeof filteredResources; startIdx: number }) => {
              if (cards.length === 0) return null;
              const colorMap: Record<string, { border: string; bg: string; dot: string; text: string }> = {
                amber:   { border: "border-amber-500/20",   bg: "bg-amber-500/8",   dot: "bg-amber-400",   text: "text-amber-400/80" },
                rose:    { border: "border-rose-500/20",    bg: "bg-rose-500/8",    dot: "bg-rose-400",    text: "text-rose-400/80" },
                violet:  { border: "border-violet-500/20",  bg: "bg-violet-500/8",  dot: "bg-violet-400",  text: "text-violet-400/80" },
                teal:    { border: "border-teal-500/20",    bg: "bg-teal-500/8",    dot: "bg-teal-400",    text: "text-teal-400/80" },
              };
              const c = colorMap[color] ?? colorMap.amber;
              return (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-white/6" />
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${c.border} ${c.bg}`}>
                      <span className="relative flex h-1.5 w-1.5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-60`}></span>
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${c.dot}`}></span>
                      </span>
                      <span className={`mono-label ${c.text} text-xs uppercase tracking-widest`}>
                        {label} <span className="opacity-50">&middot; {cards.length}</span>
                      </span>
                    </div>
                    <div className="h-px flex-1 bg-white/6" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map((card, i) => (
                      <ServiceCard key={card.id} card={card} index={startIdx + i} />
                    ))}
                  </div>
                </div>
              );
            };

            return (
              <>
                <SubGroup label="Monitoring Software" color="amber"  cards={monitoringCards} startIdx={0} />
                <SubGroup label="Bots &amp; Automation"  color="rose"   cards={botCards}        startIdx={monitoringCards.length} />
                <SubGroup label="Protocol Tools"       color="violet" cards={protocolCards}   startIdx={monitoringCards.length + botCards.length} />
                <SubGroup label="Other Resources"      color="teal"   cards={otherCards}      startIdx={monitoringCards.length + botCards.length + protocolCards.length} />
              </>
            );
          })()}
        </div>
      </section>
      )}

      {/* ── USA Meshtastic Networks ── */}
      {(!isFiltering || filteredUSA.length > 0) && (
      <section id="usa" className="py-16 border-t border-white/6">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/8 mb-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-400"></span>
                </span>
                <span className="mono-label text-rose-400/80 text-xs uppercase tracking-widest">USA Meshtastic Networks</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-700 text-white"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
              >
                🇺🇸 US Regional Mesh Communities
              </h2>
              <p className="text-white/40 text-sm mt-2">
                Regional Meshtastic mesh network viewers, maps, and community hubs across the United States.
              </p>
            </div>
          </div>
{(() => {
            const meshViewCards    = filteredUSA.filter(c => c.badge !== "MeshMonitor" && c.badge !== "MeshInfo");
            const meshMonitorCards = filteredUSA.filter(c => c.badge === "MeshMonitor");
            const meshInfoCards    = filteredUSA.filter(c => c.badge === "MeshInfo");

            const USASubGroup = ({ label, color, linkHref, cards, startIdx }: { label: string; color: string; linkHref?: string; cards: typeof filteredUSA; startIdx: number }) => {
              if (cards.length === 0) return null;
              const colorMap: Record<string, { border: string; bg: string; dot: string; text: string; hover: string }> = {
                sky:     { border: "border-sky-500/20",     bg: "bg-sky-500/8",     dot: "bg-sky-400",     text: "text-sky-400/80",     hover: "hover:text-sky-300" },
                rose:    { border: "border-rose-500/20",    bg: "bg-rose-500/8",    dot: "bg-rose-400",    text: "text-rose-400/80",    hover: "hover:text-rose-300" },
                emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/8", dot: "bg-emerald-400", text: "text-emerald-400/80", hover: "hover:text-emerald-300" },
              };
              const c = colorMap[color] ?? colorMap.sky;
              const labelEl = linkHref ? (
                <a href={linkHref} target="_blank" rel="noopener noreferrer"
                  className={`mono-label ${c.text} text-xs uppercase tracking-widest ${c.hover} transition-colors duration-150 flex items-center gap-1`}>
                  {label} <span className="opacity-50">&middot; {cards.length}</span>
                  <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                  </svg>
                </a>
              ) : (
                <span className={`mono-label ${c.text} text-xs uppercase tracking-widest`}>
                  {label} <span className="opacity-50">&middot; {cards.length}</span>
                </span>
              );
              return (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-white/6" />
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${c.border} ${c.bg}`}>
                      <span className="relative flex h-1.5 w-1.5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-60`}></span>
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${c.dot}`}></span>
                      </span>
                      {labelEl}
                    </div>
                    <div className="h-px flex-1 bg-white/6" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map((card, i) => <ServiceCard key={card.id} card={card} index={startIdx + i} />)}
                  </div>
                </div>
              );
            };

            return (
              <>
                <USASubGroup label="MeshView &amp; Map Viewers" color="sky"     cards={meshViewCards}    startIdx={0} />
                <USASubGroup label="MeshMonitor Instances"      color="rose"    linkHref="https://meshmonitor.org/" cards={meshMonitorCards} startIdx={meshViewCards.length} />
                <USASubGroup label="MeshInfo Instances"         color="emerald" linkHref="https://github.com/MeshAddicts/meshinfo" cards={meshInfoCards} startIdx={meshViewCards.length + meshMonitorCards.length} />
              </>
            );
          })()}
        </div>
      </section>
      )}

      {/* ── No results state ── */}
      {isFiltering && totalVisible === 0 && (
        <div className="py-24 flex flex-col items-center gap-4 text-center">
          <svg className="w-12 h-12 text-white/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <p className="text-white/40 text-sm">No services match <span className="text-white/70 font-medium">&ldquo;{searchQuery}&rdquo;</span></p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mono-label text-xs px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/8 transition-all duration-200"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* ── Submit a Resource CTA ── */}
      {!isFiltering && (
      <section className="py-14 border-t border-white/6">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              <span className="mono-label text-emerald-400/80 text-xs uppercase tracking-widest">Community Contributions</span>
            </div>
            <h2
              className="text-xl sm:text-2xl font-700 text-white mb-3"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}
            >
              Know a mesh resource we&apos;re missing?
            </h2>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              MeshMonitoring.com is community-maintained. If you operate or know of a mesh network tool,
              regional map, firehose feed, or community hub that should be listed here, open a GitHub issue
              and we&apos;ll review it for inclusion.
            </p>
            <a
              href="https://github.com/wykweb/meshmonitoring/issues/new?template=submit-resource.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-200 transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Submit a Resource
              <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      )}

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
        {/* Social links row */}
        <div className="container">
          <div className="flex items-center justify-center gap-5 mb-5">
            <a
              href="https://discord.gg/CznDhsRWnJ"
              target="_blank"
              rel="noopener noreferrer"
              title="Join YYC MeshCore Network - Discord Channel"
              className="text-white/30 hover:text-[#5865F2] transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://github.com/wykweb/meshmonitoring"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
              className="text-white/30 hover:text-white/70 transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </div>
        {/* Legal disclaimer */}
        <div className="container">
          <div className="border-t border-white/6 pt-5">
            <p className="mono-label text-white/30 text-xs text-center mb-3">
              Directory last updated: April 2026
            </p>
            <p className="mono-label text-white/20 text-xs text-center leading-relaxed max-w-3xl mx-auto">
              <span className="text-white/30 font-medium">Note:</span> We are not affiliated with Meshtastic or Meshcore.{" "}
              &copy; 2026 MeshMonitoring.com. MeshMonitoring.com is not affiliated with Meshtastic or Meshcore.{" "}
              Meshtastic and Meshcore are registered trademarks of the Meshtastic respective Meshcore Projects.{" "}
              MeshMonitoring.com makes reference to Meshtastic &amp; Meshcore under the M Powered community fair&#8209;use guidelines.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Back to top floating button ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full border border-white/15 bg-white/8 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/15 hover:border-white/30 shadow-lg transition-all duration-300"
        style={{
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? "auto" : "none",
          transform: showBackToTop ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

    </div>
  );
}
