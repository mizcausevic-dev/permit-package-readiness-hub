import { payload, summary } from "../src/services/permitPackageReadinessHubService";

console.log("permit-package-readiness-hub demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().readinessRisks, null, 2));
