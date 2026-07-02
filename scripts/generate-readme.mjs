#!/usr/bin/env node
/**
 * generate-readme.mjs
 *
 * Parses all ServiceCard arrays from client/src/pages/Home.tsx and
 * regenerates the "## Listed Resources" section of README.md.
 *
 * Run:  node scripts/generate-readme.mjs
 *
 * The script is idempotent — it only rewrites the block between
 * the "## Listed Resources" heading and the next "---" separator,
 * leaving the rest of README.md untouched.
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const HOME_TSX = join(ROOT, "client/src/pages/Home.tsx");
const README   = join(ROOT, "README.md");

// ─── 1. Extract card arrays from Home.tsx ─────────────────────────────────────
const src = readFileSync(HOME_TSX, "utf8");

/**
 * Pull all ServiceCard objects out of the source text.
 * We match each object literal between `{` and the matching `},` that
 * follows a card-shaped block (must contain `id:` and `url:` fields).
 */
function extractCards(source) {
  const cards = [];
  // Match each object block inside the array literals
  const blockRe = /\{\s*\n(?:[^{}]|\{[^{}]*\})*?\}/gs;
  let m;
  while ((m = blockRe.exec(source)) !== null) {
    const block = m[0];
    if (!block.includes("id:") || !block.includes("url:")) continue;

    const get = (key) => {
      // Match  key: "value"  or  key: 'value'  (single or double quotes, no template literals)
      const re = new RegExp(`${key}:\\s*["']([^"'\\n]+)["']`);
      const hit = block.match(re);
      return hit ? hit[1] : null;
    };

    const id    = get("id");
    const title = get("title");
    const url   = get("url");
    const badge = get("badge");
    const subtitle = get("subtitle");
    const description = get("description");
    const tag   = get("tag");
    const note  = get("note");

    if (!id || !title || !url) continue;
    cards.push({ id, title, subtitle, description, url, badge, tag, note });
  }
  return cards;
}

const allCards = extractCards(src);

// ─── 2. Build a lookup map id → card ──────────────────────────────────────────
const byId = {};
for (const c of allCards) byId[c.id] = c;

// ─── 3. Section definitions (mirrors the rendering logic in Home.tsx) ──────────
// Each section has a heading and either:
//   ids: string[]  — explicit ordered list of card IDs
//   badge: string  — pick all cards with this badge from a given pool
//   pool: string   — "core" | "resource" | "community" | "usa" | "article"

// Helper: extract IDs from a named array in the source
function extractIds(varName) {
  const re = new RegExp(`const ${varName}\\s*=\\s*\\[([^\\]]+)\\]`);
  const m = src.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/["']([^"']+)["']/g)].map(x => x[1]);
}

// Pool arrays (by line range)
function extractPool(startLine, endLine) {
  const lines = src.split("\n");
  const chunk = lines.slice(startLine - 1, endLine).join("\n");
  return extractCards(chunk);
}

// Approximate line ranges (from grep output above)
const corePool      = extractPool(245,  654);
const resourcePool  = extractPool(655,  951);
const communityPool = extractPool(952,  1723);
const usaPool       = extractPool(1724, 2779);
const articlePool   = extractPool(2780, 2830);

// Sub-group ID lists (from the rendering block)
const canadaverseIds      = extractIds("canadaverseIds")      .length ? extractIds("canadaverseIds")      : ["yyc-custom-mesh","canadaverse-dashboard","canadaverse-meshinfo","canadaverse-node-map","canadaverse-wiki","canadaverse-links"];
const meshcoreCanadaIds   = ["meshcore-ca-hub","corescope-home","corescope-live","corescope-map","corescope-channels","corescope-observers","beacon-meshcore-ca"];
const canadaverseExtIds   = ["waterloo-meshview","waterloo-meshsense","canadaverse-adsb","canadaverse-meshmon","canadaverse-release-radar","beacon-canadaverse"];
const krabsLagoonIds      = ["krabs-lagoon","krabs-lagoon-room"];
const yycCorescopeIds     = ["corescope-yyc-live","corescope-yyc-map","corescope-yyc-observers"];
const meshcoreAnalyzerIds = ["corescope-sfbay","corescope-tennmesh","corescope-boston","corescope-cascadia","corescope-swbc","corescope-wcmesh","corescope-letsmesh","corescope-letsmesh-forum","corescope-meshcore-ca-live","corescope-cartolive-canada"];

const newYorkIds      = ["new-york-mesh","nyme-sh","cnymesh","nyc-mesh-wifi","mesh-ny-chat"];
const adjacentNYIds   = ["buffalora-snydermesh","discord-buffalo-ny","upstatemesh","discord-capital-region-ny","discord-long-island-ny","discord-rochester-ny","kaatskills-mesh","hudson-hams-discord","discord-westchester-ny"];
const midAtlanticIds  = ["cnjmesh","forest-edge-nj","ctmesh","ctmesh-discord","phillymesh","philly-radio-discord","discord-philly-pa","delaware-mesh","wpamesh","western-pa-mesh"];
const newEnglandIds   = ["bostonmesh","discord-ma-meshtastic","rimesh","vtmesh"];
const pnwIds          = ["oregon-mesh","central-oregon-mesh","washington-mesh"];
const floridaIds      = ["south-florida-mesh","tampa-bay-mesh","are-you-meshing-with-us","florida-mesh-discord","florida-mesh-chat","florida-mesh-firehose","florida-mesh-map"];
const southeastIds    = ["tennmesh","tennmesh-corescope","ncmesh","georgia-mesh-community","north-georgia-mesh","north-georgia-mesh-chat"];
const texasIds        = ["ntxmesh","austin-mesh","central-texas-mesh-discord","cypress-texas-mesh"];
const nevadaIds       = ["lasmesh-community","lasmesh-discord","lasmesh-meshbot-dashboard","lasmesh-nodes"];

const allGroupedUSA = new Set([...newYorkIds,...adjacentNYIds,...midAtlanticIds,...newEnglandIds,...pnwIds,...floridaIds,...southeastIds,...texasIds,...nevadaIds]);

// Community sub-group IDs (to exclude from catch-all)
const allGroupedCommunity = new Set([...canadaverseIds,...meshcoreCanadaIds,...canadaverseExtIds,...krabsLagoonIds,...yycCorescopeIds,...meshcoreAnalyzerIds]);

// ─── 4. Helpers ───────────────────────────────────────────────────────────────
function idsToRows(ids, pool) {
  // Prefer byId lookup (covers all pools), fall back to pool search
  return ids
    .map(id => byId[id] || pool.find(c => c.id === id))
    .filter(Boolean);
}

function poolExcluding(pool, excludeSet) {
  return pool.filter(c => !excludeSet.has(c.id));
}

function cardRow(c) {
  const display = c.tag || new URL(c.url).hostname.replace(/^www\./, "");
  return `| ${c.title} | [${display}](${c.url}) | ${c.description || c.subtitle || ""} |`;
}

function section(heading, cards, cols = ["Service","URL","Description"]) {
  if (!cards || cards.length === 0) return "";
  const header = `### ${heading}\n\n| ${cols.join(" | ")} |\n|${"---|".repeat(cols.length)}\n`;
  return header + cards.map(cardRow).join("\n") + "\n";
}

// ─── 5. Build the Listed Resources block ──────────────────────────────────────
const parts = [];

// Canada Core (coreServices)
parts.push(section("YYC, Canada & USA Monitoring", corePool));

// Community sub-groups
parts.push(section("Canadaverse Network",              idsToRows(canadaverseIds, communityPool)));
parts.push(section("Regional Communities",             poolExcluding(communityPool, allGroupedCommunity).filter(c => !canadaverseIds.includes(c.id) && c.badge !== "CoreScope" && c.badge !== "Social")));
parts.push(section("MeshCore Canada",                  idsToRows(meshcoreCanadaIds, communityPool)));
parts.push(section("Canadaverse Extended",             idsToRows(canadaverseExtIds, communityPool)));
parts.push(section("Krabs Lagoon",                     idsToRows(krabsLagoonIds, communityPool)));
parts.push(section("YYC Calgary — CoreScope",          idsToRows(yycCorescopeIds, communityPool)));
parts.push(section("MeshCore Analyzers — CoreScope",   idsToRows(meshcoreAnalyzerIds, communityPool)));

// Social
const socialCards = communityPool.filter(c => c.badge === "Social" || c.badge === "Discord" || c.badge === "Telegram");
parts.push(section("Chat Groups & Social", socialCards, ["Platform","URL","Description"]));

// Resources
parts.push(section("Mesh Tools & Resources", resourcePool));

// USA sub-groups
parts.push(section("USA — Dashboards",                 usaPool.filter(c => c.badge === "Dashboard")));
parts.push(section("USA — MeshView & Map Viewers",     usaPool.filter(c => c.badge === "MeshView")));
parts.push(section("USA — Pacific Northwest",          idsToRows(pnwIds, usaPool), ["Service","URL","Region"]));
parts.push(section("USA — New England",                idsToRows(newEnglandIds, usaPool), ["Service","URL","Region"]));
parts.push(section("USA — Mid-Atlantic (PA / NJ / CT / DE)", idsToRows(midAtlanticIds, usaPool), ["Service","URL","Region"]));
parts.push(section("USA — Adjacent Meshes (NY)",       idsToRows(adjacentNYIds, usaPool), ["Service","URL","Region"]));
parts.push(section("USA — New York Networks",          idsToRows(newYorkIds, usaPool), ["Service","URL","Region"]));
parts.push(section("USA — Southeast (TN / NC / GA)",   idsToRows(southeastIds, usaPool), ["Service","URL","Region"]));
parts.push(section("USA — Texas",                      idsToRows(texasIds, usaPool), ["Service","URL","Region"]));
parts.push(section("USA — Nevada / Las Vegas",         idsToRows(nevadaIds, usaPool), ["Service","URL","Region"]));
parts.push(section("USA — Florida",                    idsToRows(floridaIds, usaPool), ["Service","URL","Region"]));

// USA catch-all community hubs (not in any named sub-group)
const usaCatchAll = poolExcluding(usaPool, allGroupedUSA).filter(c => !["Dashboard","MeshView","MeshMonitor","MeshInfo"].includes(c.badge));
parts.push(section("USA — Community Hubs",             usaCatchAll, ["Service","URL","Region"]));

parts.push(section("USA — MeshInfo Instances",         usaPool.filter(c => c.badge === "MeshInfo"), ["Service","URL","Region"]));
parts.push(section("USA — MeshMonitor Instances",      usaPool.filter(c => c.badge === "MeshMonitor"), ["Service","URL","Region","Network"]));

// Articles — custom row formatter to include Author from note field
if (articlePool.length > 0) {
  const header = `### Community Articles\n\n| Article | URL | Author | Description |\n|---|---|---|---|\n`;
  const rows = articlePool.map(c => {
    const display = c.tag || new URL(c.url).hostname.replace(/^www\./, "");
    const author = c.note || "";
    return `| ${c.title} | [${display}](${c.url}) | ${author} | ${c.description || c.subtitle || ""} |`;
  }).join("\n");
  parts.push(header + rows + "\n");
}

const listedResourcesBlock =
  "## Listed Resources\n\n" +
  parts.filter(Boolean).join("\n") +
  "\n";

// ─── 6. Splice into README.md ─────────────────────────────────────────────────
const readme = readFileSync(README, "utf8");

// Find the "## Listed Resources" heading and the next "---" separator after it
const startMarker = "## Listed Resources";
const endMarker   = "\n---\n\n## Submit a Resource";

const startIdx = readme.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Could not find '## Listed Resources' in README.md");
  process.exit(1);
}

// Find the first "---" that comes AFTER the Listed Resources heading
const endIdx = readme.indexOf(endMarker, startIdx);
if (endIdx === -1) {
  console.error("Could not find closing '---' after Listed Resources in README.md");
  process.exit(1);
}

const before = readme.slice(0, startIdx);
const after  = "\n---\n\n## Submit a Resource" + readme.slice(endIdx + endMarker.length);

const updated = before + listedResourcesBlock + after;
writeFileSync(README, updated, "utf8");

// Count cards written
const totalCards = allCards.length;
console.log(`✅  README.md updated — ${totalCards} cards across all sections.`);
