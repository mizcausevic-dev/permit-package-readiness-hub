export type RiskState = "red" | "yellow" | "green";

export type PermitPackage = {
  packageId: string;
  project: string;
  jurisdiction: string;
  permitType: string;
  excerpt: string;
  owner: string;
  nextAction: string;
  risk: RiskState;
};

export type ReadinessRisk = {
  riskId: string;
  blocker: string;
  source: string;
  impactArea: string;
  requiredEvidence: string;
  owner: string;
  readiness: RiskState;
  note: string;
};

export type InspectionPacket = {
  packetId: string;
  audience: string;
  confidenceScore: number;
  replyWindowHours: number;
  blocker: string;
  status: RiskState;
  decisionNote: string;
};

export const permitPackages: PermitPackage[] = [
  {
    packageId: "PRM-401",
    project: "Harbor Point Mixed Use",
    jurisdiction: "Boston ISD",
    permitType: "Core + shell revision",
    excerpt: "Stamped structural sheets are present, but the revised egress note set is still missing from the upload package scheduled for tomorrow morning.",
    owner: "Permitting manager",
    nextAction: "Lock the architect revision set and reassemble the AHJ-ready upload packet before 9 AM.",
    risk: "red"
  },
  {
    packageId: "PRM-402",
    project: "Mesa Logistics Hub",
    jurisdiction: "Phoenix Planning",
    permitType: "Civil site package",
    excerpt: "Utility coordination comments were accepted verbally, but the as-noted water service response is not yet attached to the submittal binder.",
    owner: "Civil coordinator",
    nextAction: "Attach utility sign-off and update the resubmittal matrix before the next jurisdiction intake window.",
    risk: "red"
  },
  {
    packageId: "PRM-403",
    project: "Riverline Apartments",
    jurisdiction: "Seattle SDCI",
    permitType: "Tenant improvement",
    excerpt: "Energy worksheet values changed after the MEP update and the inspection packet still reflects the earlier load assumptions.",
    owner: "MEP PM",
    nextAction: "Reconcile the worksheet and issue the corrected inspection-facing packet to field ops.",
    risk: "yellow"
  },
  {
    packageId: "PRM-404",
    project: "Summit Medical Office",
    jurisdiction: "Austin Development Services",
    permitType: "Fire review response",
    excerpt: "Fire marshal comments are mostly resolved, but the smoke-control narrative still needs owner sign-off before the final response memo is safe to send.",
    owner: "Life-safety lead",
    nextAction: "Secure owner sign-off and issue the final response memo with the drawing index attached.",
    risk: "yellow"
  }
];

export const readinessRisks: ReadinessRisk[] = [
  {
    riskId: "RR-41",
    blocker: "Revised egress sheets not attached to submission packet",
    source: "Architect revision lane",
    impactArea: "Jurisdiction acceptance",
    requiredEvidence: "Final stamped plan set, revision log, and upload manifest confirming sheet parity.",
    owner: "Permitting manager",
    readiness: "red",
    note: "Do not submit the package until the AHJ packet and revision register show the same sheet set."
  },
  {
    riskId: "RR-42",
    blocker: "Utility sign-off missing from civil resubmittal binder",
    source: "External utility coordination",
    impactArea: "Site work release",
    requiredEvidence: "Written utility approval, updated response matrix, and outbound cover memo.",
    owner: "Civil coordinator",
    readiness: "red",
    note: "Inspection and trench-release promises become unsafe if the utility response still lives outside the binder."
  },
  {
    riskId: "RR-43",
    blocker: "Energy worksheet and inspection packet no longer match",
    source: "MEP revision loop",
    impactArea: "Inspection posture",
    requiredEvidence: "Updated worksheet export and field packet revision synced to the same issue date.",
    owner: "MEP PM",
    readiness: "yellow",
    note: "Field teams need the same compliance assumptions as the permit desk or the inspection window will burn."
  },
  {
    riskId: "RR-44",
    blocker: "Owner sign-off pending on smoke-control narrative",
    source: "Executive approval lane",
    impactArea: "Final review clearance",
    requiredEvidence: "Signed approval memo, response narrative, and indexed exhibit set.",
    owner: "Life-safety lead",
    readiness: "yellow",
    note: "The response can clear quickly, but the packet is not buyer-safe until ownership is explicit."
  }
];

export const inspectionPackets: InspectionPacket[] = [
  {
    packetId: "IP-11",
    audience: "Boston intake counter",
    confidenceScore: 57,
    replyWindowHours: 14,
    blocker: "Stamped egress revision set still incomplete",
    status: "red",
    decisionNote: "Hold submission until the architect upload packet and revision register reconcile."
  },
  {
    packetId: "IP-12",
    audience: "Phoenix civil reviewer",
    confidenceScore: 66,
    replyWindowHours: 22,
    blocker: "Utility sign-off evidence incomplete",
    status: "yellow",
    decisionNote: "Stage the resubmittal packet, but do not promise a clean intake until the utility memo is attached."
  },
  {
    packetId: "IP-13",
    audience: "Seattle field inspection crew",
    confidenceScore: 81,
    replyWindowHours: 28,
    blocker: "Energy worksheet revision pending packet sync",
    status: "yellow",
    decisionNote: "Inspection readiness is recoverable if the field packet is reissued before tomorrow's coordination call."
  },
  {
    packetId: "IP-14",
    audience: "Austin final-review desk",
    confidenceScore: 93,
    replyWindowHours: 72,
    blocker: "Owner sign-off queued",
    status: "green",
    decisionNote: "The package stays healthy as long as the final memo and exhibit index remain bundled."
  }
];
