import fs from "node:fs";
import path from "node:path";

import {
  inspectionPosture,
  payload,
  permitLane,
  readinessRisksLane,
  summary,
  verification
} from "../src/services/permitPackageReadinessHubService";
import {
  renderDocs,
  renderInspectionPosture,
  renderOverview,
  renderPermitLane,
  renderReadinessRisks,
  renderVerification
} from "../src/services/render";

const outputDir = path.resolve(__dirname, "..", "site");
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(outputDir, "api"), { recursive: true });
fs.copyFileSync(path.resolve(__dirname, "..", "CNAME"), path.join(outputDir, "CNAME"));

const pages: Record<string, string> = {
  "index.html": renderOverview(),
  "permit-lane.html": renderPermitLane(),
  "readiness-risks.html": renderReadinessRisks(),
  "inspection-posture.html": renderInspectionPosture(),
  "verification.html": renderVerification(),
  "docs.html": renderDocs()
};

const rewrites: Array<[string, string]> = [
  ['href="/permit-lane"', 'href="permit-lane.html"'],
  ['href="/readiness-risks"', 'href="readiness-risks.html"'],
  ['href="/inspection-posture"', 'href="inspection-posture.html"'],
  ['href="/verification"', 'href="verification.html"'],
  ['href="/docs"', 'href="docs.html"']
];

for (const [filename, html] of Object.entries(pages)) {
  let content = html;
  for (const [from, to] of rewrites) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(path.join(outputDir, filename), content, "utf8");
}

const apiPayloads: Record<string, unknown> = {
  "api/dashboard/summary.json": summary(),
  "api/permit-lane.json": permitLane(),
  "api/readiness-risks.json": readinessRisksLane(),
  "api/inspection-posture.json": inspectionPosture(),
  "api/verification.json": verification(),
  "api/sample.json": payload()
};

for (const [filename, data] of Object.entries(apiPayloads)) {
  fs.mkdirSync(path.dirname(path.join(outputDir, filename)), { recursive: true });
  fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(data, null, 2), "utf8");
}
