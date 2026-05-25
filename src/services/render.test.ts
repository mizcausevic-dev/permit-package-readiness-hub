import { describe, expect, test } from "vitest";

import {
  renderDocs,
  renderInspectionPosture,
  renderOverview,
  renderPermitLane,
  renderReadinessRisks,
  renderVerification
} from "./render";
import {
  inspectionPackets,
  permitPackages,
  readinessRisks
} from "../data/samplePermitPackages";

const renderers = [
  ["overview", renderOverview],
  ["permit-lane", renderPermitLane],
  ["readiness-risks", renderReadinessRisks],
  ["inspection-posture", renderInspectionPosture],
  ["verification", renderVerification],
  ["docs", renderDocs]
] as const;

describe("render", () => {
  test.each(renderers)("%s produces a full HTML document with nav", (_label, fn) => {
    const html = fn();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
    expect(html).toContain("Permit Package Readiness Hub");
    expect(html).toContain('href="/permit-lane"');
    expect(html).toContain('href="/docs"');
  });

  test("permit lane lists every package with a risk tag", () => {
    const html = renderPermitLane();
    for (const permitPackage of permitPackages) {
      expect(html).toContain(permitPackage.packageId);
    }
    expect(html).toContain('class="st needs"');
  });

  test("readiness risks list every blocker with readiness tags", () => {
    const html = renderReadinessRisks();
    for (const block of readinessRisks) {
      expect(html).toContain(block.riskId);
    }
    expect(html).toContain('class="bad"');
    expect(html).toContain("Jurisdiction acceptance");
  });

  test("inspection posture shows packets and confidence scores", () => {
    const html = renderInspectionPosture();
    for (const packet of inspectionPackets) {
      expect(html).toContain(packet.packetId);
      expect(html).toContain(String(packet.confidenceScore));
    }
  });

  test("verification renders proof statements", () => {
    const html = renderVerification();
    expect(html).toContain("Verification");
  });

  test("docs page enumerates the route surface", () => {
    const html = renderDocs();
    expect(html).toContain("/readiness-risks");
    expect(html).toContain("/inspection-posture");
  });
});
