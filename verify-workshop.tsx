import { renderToString } from "react-dom/server";
import WorkshopModal from "@/components/WorkshopModal";
import OverworldMap from "@/components/OverworldMap";
import { WORKSHOP_PROJECTS } from "@/lib/workshopData";
import { ZONES } from "@/lib/gameData";

const results: string[] = [];
function check(name: string, ok: boolean, detail = "") {
  results.push(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
}

// --- WorkshopModal default (inventory grid) ---
const modalHtml = renderToString(<WorkshopModal onClose={() => {}} />);
check("modal renders", modalHtml.length > 1000, `${modalHtml.length} chars`);
check("modal title 'The Workshop'", modalHtml.includes("The Workshop"));
check("modal subtitle mentions 9", /9/.test(modalHtml));

for (const p of WORKSHOP_PROJECTS) {
  const nameInHtml = p.name.replace(/'/g, "&#x27;");
  check(`grid has project name "${p.name}"`, modalHtml.includes(p.name) || modalHtml.includes(nameInHtml));
  check(`grid has icon ${p.icon}`, modalHtml.includes(p.icon));
}

// No raw URLs visible in text: strip tags, look for http
const textOnly = modalHtml.replace(/<[^>]*>/g, " ");
check("no raw http(s) URLs in visible modal text", !/https?:\/\//.test(textOnly));
check("stock picker shows SOON badge in grid", modalHtml.includes(">SOON<"));

// --- OverworldMap: workshop hotspot + building sprite ---
const mapHtml = renderToString(<OverworldMap zones={ZONES} onZoneClick={() => {}} discoveredZones={new Set<string>()} />);
check("map renders", mapHtml.length > 1000, `${mapHtml.length} chars`);
check("map has THE WORKSHOP label", mapHtml.includes("THE WORKSHOP"));
check("map has 2024 badge", mapHtml.includes("2024"));
check("map references workshop-building.webp", mapHtml.includes("workshop-building.webp"));

// --- workshopData integrity ---
check("9 projects in data", WORKSHOP_PROJECTS.length === 9, `${WORKSHOP_PROJECTS.length}`);
const withLinks = WORKSHOP_PROJECTS.filter(p => p.demoUrl);
check("8 projects have demo URLs", withLinks.length === 8, `${withLinks.length}`);
const stockPicker = WORKSHOP_PROJECTS.find(p => p.id === "stock-picker");
check("stock picker has no demo URL", !!stockPicker && !stockPicker.demoUrl);
for (const p of withLinks) {
  check(`demo URL valid for ${p.id}`, /^https:\/\//.test(p.demoUrl!), p.demoUrl);
  check(`write-up has paragraphs for ${p.id}`, p.writeup.length >= 2, `${p.writeup.length} paras`);
}

const fails = results.filter(r => r.startsWith("FAIL"));
console.log(results.join("\n"));
console.log(`\n${results.length - fails.length}/${results.length} passed`);
process.exit(fails.length ? 1 : 0);
