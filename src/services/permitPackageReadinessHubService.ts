import {
  inspectionPackets,
  permitPackages,
  readinessRisks
} from "../data/samplePermitPackages";

export function summary() {
  return {
    packages: permitPackages.length,
    urgentPackages: permitPackages.filter((item) => item.risk === "red").length,
    blockedReadiness: readinessRisks.filter((item) => item.readiness !== "green").length,
    fragileInspectionPackets: inspectionPackets.filter((item) => item.status !== "green").length,
    recommendation:
      "Clear revision parity, utility sign-off, and inspection packet drift first so permit posture stays safe before the next jurisdiction window burns schedule."
  };
}

export function permitLane() {
  return permitPackages;
}

export function readinessRisksLane() {
  return readinessRisks;
}

export function inspectionPosture() {
  return inspectionPackets;
}

export function verification() {
  return [
    "Permit packages map to concrete jurisdiction and inspection workflows, not just spreadsheet notes in a PMO lane.",
    "Readiness blockers surface the exact evidence needed before a submittal or inspection packet becomes unsafe.",
    "Inspection posture ties field coordination to revision control, owner sign-off, and AHJ-ready artifacts.",
    "The hub is buyer-readable and safe for embedded analytics tie-back.",
    "Synthetic data only; no real property owner, resident, or permit records are included."
  ];
}

export function payload() {
  return {
    summary: summary(),
    permitPackages: permitLane(),
    readinessRisks: readinessRisksLane(),
    inspectionPackets: inspectionPosture(),
    verification: verification()
  };
}
