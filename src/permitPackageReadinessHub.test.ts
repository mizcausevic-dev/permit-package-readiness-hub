import { describe, expect, test } from "vitest";

import {
  inspectionPosture,
  permitLane,
  readinessRisksLane,
  summary,
  verification
} from "./services/permitPackageReadinessHubService";

describe("permit-package-readiness-hub", () => {
  test("returns a permit-readiness recommendation", () => {
    expect(summary().recommendation).toMatch(/permit|schedule|inspection|revision/i);
  });

  test("maps permit packages and blockers", () => {
    expect(permitLane().length).toBeGreaterThan(2);
    expect(readinessRisksLane().some((risk) => risk.readiness === "red")).toBe(true);
  });

  test("inspection posture stays buyer-readable", () => {
    expect(inspectionPosture().every((packet) => packet.audience.length > 0)).toBe(true);
    expect(verification().some((item) => item.toLowerCase().includes("synthetic"))).toBe(true);
  });
});
