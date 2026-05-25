// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";

import {
  inspectionPosture,
  payload,
  permitLane,
  readinessRisksLane,
  summary,
  verification
} from "./services/permitPackageReadinessHubService";
import {
  renderDocs,
  renderInspectionPosture,
  renderOverview,
  renderPermitLane,
  renderReadinessRisks,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5550);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/permit-lane", (_req, res) => res.type("html").send(renderPermitLane()));
app.get("/readiness-risks", (_req, res) => res.type("html").send(renderReadinessRisks()));
app.get("/inspection-posture", (_req, res) => res.type("html").send(renderInspectionPosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/permit-lane", (_req, res) => res.json(permitLane()));
app.get("/api/readiness-risks", (_req, res) => res.json(readinessRisksLane()));
app.get("/api/inspection-posture", (_req, res) => res.json(inspectionPosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, host, () => {
    console.log(`Permit Package Readiness Hub listening on http://${host}:${port}`);
  });
}

export default app;
