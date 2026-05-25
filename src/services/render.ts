import {
  inspectionPosture,
  permitLane,
  readinessRisksLane,
  summary,
  verification
} from "./permitPackageReadinessHubService";

const STYLE = `
  :root{
    --bg:#070a0f; --panel:#0b1220; --panel2:#0a1426;
    --line:rgba(120,255,170,.18); --line2:rgba(120,255,170,.10);
    --text:#e9f3ff; --muted:rgba(233,243,255,.72); --muted2:rgba(233,243,255,.55);
    --bert:#37ff8b; --bert2:#19c7ff;
    --warn:#ffcc66; --bad:#ff5c7a; --good:#37ff8b; --plum:#b88cff;
    --shadow: 0 18px 60px rgba(0,0,0,.55);
    --radius: 18px;
    --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  }
  *{box-sizing:border-box}
  html,body{height:100%}
  body{
    margin:0; font-family:var(--sans); color:var(--text);
    background:
      radial-gradient(1200px 600px at 20% -10%, rgba(55,255,139,.18), transparent 60%),
      radial-gradient(900px 520px at 90% 0%, rgba(25,199,255,.16), transparent 55%),
      radial-gradient(1000px 600px at 50% 110%, rgba(55,255,139,.10), transparent 60%),
      linear-gradient(180deg, #05070c 0%, #070a0f 35%, #05070c 100%);
    overflow-x:hidden;
  }
  .grid-bg{
    position:fixed; inset:0; pointer-events:none; opacity:.12; z-index:-1;
    background-image:
      linear-gradient(to right, rgba(55,255,139,.14) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(55,255,139,.10) 1px, transparent 1px);
    background-size: 46px 46px;
    mask-image: radial-gradient(900px 600px at 40% 10%, #000 60%, transparent 100%);
  }
  .wrap{max-width:1280px; margin:0 auto; padding:24px 22px 80px}
  .topbar{
    display:flex; justify-content:space-between; align-items:flex-start; gap:14px;
    border-bottom:1px solid var(--line2); padding-bottom:14px; margin-bottom:22px;
    font-family:var(--mono); font-size:11px; letter-spacing:.16em; color:var(--muted);
    text-transform:uppercase;
  }
  .topbar .left{color:var(--bert)}
  .topbar .right{text-align:right; color:var(--muted)}
  .topbar .right div{margin-bottom:4px}
  .herorow{display:grid; grid-template-columns: 1.5fr .9fr; gap:18px}
  @media (max-width:1000px){.herorow{grid-template-columns:1fr}}
  .hero{
    background: linear-gradient(180deg, rgba(11,18,32,.95), rgba(8,14,26,.92));
    border:1px solid var(--line); border-radius:22px; padding:28px 28px 24px;
    box-shadow: var(--shadow); position:relative; overflow:hidden;
    border-top:2px solid var(--bert2);
  }
  .hero h1{ font-size:64px; line-height:.95; margin:0 0 18px; letter-spacing:-.5px; font-weight:800; }
  @media (max-width:700px){.hero h1{font-size:42px}}
  .hero p{color:var(--muted); font-size:15px; line-height:1.55; max-width:680px; margin:0 0 18px}
  .chiprow,.tabs{display:flex; flex-wrap:wrap; gap:8px}
  .meta-chip,.tab{
    font-family:var(--mono); font-size:11px; color:var(--muted);
    padding:7px 12px; border-radius:999px; border:1px solid var(--line);
    background:rgba(6,10,18,.4);
  }
  .tabs{margin-top:14px}
  .tab{letter-spacing:.08em; text-transform:uppercase}
  .tab.active{background:linear-gradient(135deg, rgba(55,255,139,.18), rgba(25,199,255,.18)); color:var(--text); border-color:rgba(25,199,255,.32)}
  .side{display:flex; flex-direction:column; gap:14px}
  .bluf{
    border:1px solid var(--warn); border-left:4px solid var(--warn);
    background: linear-gradient(180deg, rgba(255,204,102,.06), rgba(11,18,32,.92));
    border-radius:14px; padding:16px 18px;
  }
  .bluf b, .bluf strong{color:var(--text)}
  .bluf .lbl, .corr .lbl{font-family:var(--mono); font-size:10px; letter-spacing:.18em; text-transform:uppercase}
  .bluf .lbl{color:var(--warn)} .corr .lbl{color:var(--bert)}
  .bluf p, .corr p{color:var(--muted); font-size:13.5px; line-height:1.55; margin:6px 0 0}
  .corr{
    border:1px solid var(--bert); border-left:4px solid var(--bert);
    background: linear-gradient(180deg, rgba(55,255,139,.06), rgba(11,18,32,.92));
    border-radius:14px; padding:16px 18px;
  }
  .toolchips{display:flex; flex-wrap:wrap; gap:8px}
  .toolchip{
    font-family:var(--mono); font-size:11px; padding:6px 12px; border-radius:999px;
    border:1px solid currentColor; background:transparent;
  }
  .tc-claude{color:var(--bert2)} .tc-codex{color:var(--warn)} .tc-gpt{color:var(--bert)} .tc-perplex{color:var(--plum)}
  .section{margin-top:34px}
  .sh{
    display:flex; justify-content:space-between; align-items:baseline; gap:14px;
    padding-bottom:10px; border-bottom:1px solid var(--line2); margin-bottom:14px;
  }
  .sh h2{margin:0; font-size:24px; font-weight:600; letter-spacing:-.2px}
  .sh .note{font-family:var(--mono); font-size:11px; color:var(--muted2); letter-spacing:.16em; text-transform:uppercase}
  .kpis{display:grid; grid-template-columns: repeat(4, 1fr); gap:12px}
  @media (max-width:1100px){.kpis{grid-template-columns: repeat(2, 1fr)}}
  @media (max-width:640px){.kpis{grid-template-columns: 1fr}}
  .kpi{
    border:1px solid var(--line); border-radius:14px; padding:14px 14px 12px;
    background: linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65));
    position:relative; overflow:hidden;
  }
  .kpi:before{
    content:""; position:absolute; inset:-1px; border-radius:14px; pointer-events:none;
    background: radial-gradient(400px 100px at 20% 10%, rgba(55,255,139,.10), transparent 60%);
  }
  .kpi > *{position:relative}
  .kpi .v{font-family:var(--mono); font-size:26px; font-weight:600; letter-spacing:-.5px}
  .kpi.amber .v{color:var(--warn)} .kpi.cyan .v{color:var(--bert2)}
  .kpi.green .v{color:var(--bert)} .kpi.plum .v{color:var(--plum)}
  .kpi.red .v{color:var(--bad)} .kpi.white .v{color:var(--text)}
  .kpi .lbl{font-family:var(--mono); font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-top:6px}
  .kpi .h{font-size:12px; color:var(--muted); line-height:1.45; margin-top:8px}
  .stack{display:grid; grid-template-columns: repeat(4,1fr); gap:12px}
  @media (max-width:1100px){.stack{grid-template-columns: repeat(2,1fr)}}
  @media (max-width:640px){.stack{grid-template-columns: 1fr}}
  .src{
    border:1px solid var(--line); border-radius:16px; padding:16px;
    background: linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65));
  }
  .src .src-name{font-family:var(--mono); font-size:11px; color:var(--bert); letter-spacing:.2em; text-transform:uppercase}
  .src .src-tit{margin:8px 0 6px; font-size:17px; font-weight:600}
  .src p{margin:0; font-size:13px; color:var(--muted); line-height:1.55}
  .ledger{display:grid; grid-template-columns: 1fr 1fr; gap:14px}
  @media (max-width:1000px){.ledger{grid-template-columns:1fr}}
  .led{
    border:1px solid var(--line); border-radius:16px; padding:18px 20px;
    background: linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65));
  }
  .led-head{display:flex; align-items:center; gap:10px; font-family:var(--mono); font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:var(--bert)}
  .led-head.bad{color:var(--bad)}
  .led-head .dot{width:8px; height:8px; border-radius:50%; background:currentColor; box-shadow:0 0 10px currentColor}
  .led ul{list-style:none; padding:0; margin:14px 0 0}
  .led li{display:grid; grid-template-columns: 18px 1fr; gap:10px; padding:10px 0; border-bottom:1px dashed var(--line2); font-size:14px; line-height:1.55}
  .led li:last-child{border-bottom:none}
  .led li .pip{color:var(--bert); font-family:var(--mono); padding-top:2px}
  .led li.bad .pip{color:var(--bad)}
  .led li b{color:var(--text)}
  .led li, .led li *{color:var(--muted)}
  code{
    font-family:var(--mono); font-size:12px; color:var(--bert2);
    background:rgba(25,199,255,.08); padding:1px 6px; border-radius:5px;
    border:1px solid rgba(25,199,255,.18);
  }
  .board{display:grid; grid-template-columns: repeat(2,1fr); gap:14px}
  @media (max-width:1000px){.board{grid-template-columns: 1fr}}
  .pcard{
    border:1px solid var(--line); border-radius:16px; padding:18px 20px;
    background: linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65));
    display:flex; flex-direction:column;
  }
  .pcard .ptop{display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:10px}
  .pcard .pnum{font-family:var(--mono); font-size:22px; font-weight:600; color:var(--bert)}
  .pcard .ppri{font-family:var(--mono); font-size:10px; padding:5px 10px; border-radius:999px; border:1px solid var(--line); color:var(--bert); letter-spacing:.14em; background:rgba(55,255,139,.06)}
  .pcard h3{margin:6px 0 8px; font-size:19px; font-weight:600}
  .pcard .pdesc{font-size:13.5px; color:var(--muted); line-height:1.55; margin:0 0 14px}
  .pcard ul.check{list-style:none; padding:0; margin:0 0 14px}
  .pcard ul.check li{display:grid; grid-template-columns: 18px 1fr; gap:10px; padding:6px 0; font-size:13.5px; color:var(--muted); line-height:1.45}
  .pcard ul.check li:before{
    content:""; width:14px; height:14px; border:1px solid var(--line); border-radius:3px;
    background:rgba(6,10,18,.4); margin-top:3px;
  }
  .pcard .pfoot{margin-top:auto; display:flex; gap:8px; flex-wrap:wrap}
  .ttbl{
    width:100%; border-collapse:separate; border-spacing:0;
    border:1px solid var(--line); border-radius:14px; overflow:hidden;
  }
  .ttbl th, .ttbl td{padding:13px 14px; text-align:left; font-size:13.5px; vertical-align:top}
  .ttbl thead th{
    font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase;
    color:var(--muted2); border-bottom:1px solid var(--line); background:rgba(11,18,32,.5);
  }
  .ttbl tbody tr:hover{background:rgba(55,255,139,.03)}
  .st{font-family:var(--mono); font-size:10px; padding:4px 9px; border-radius:6px; letter-spacing:.1em; text-transform:uppercase; border:1px solid currentColor; display:inline-block}
  .st.shipped{color:var(--bert)} .st.built{color:var(--bert2)} .st.testers{color:var(--warn)}
  .st.needs{color:var(--bad)} .st.merge{color:var(--warn)}
  .ttbl b{color:var(--text)}
  .ttbl td, .ttbl td *{color:var(--muted)}
  .inv{display:grid; grid-template-columns: repeat(4,1fr); gap:12px}
  @media (max-width:1100px){.inv{grid-template-columns: repeat(2,1fr)}}
  @media (max-width:640px){.inv{grid-template-columns: 1fr}}
  .ivc{
    border:1px solid var(--line); border-radius:14px; padding:14px;
    background: linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65));
  }
  .ivt{display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px}
  .ivc h4{margin:0; font-size:15px; font-weight:600}
  .ivc p{margin:6px 0 0; font-size:12.5px; color:var(--muted); line-height:1.5}
  .pill{
    font-family:var(--mono); font-size:10px; padding:3px 8px; border-radius:6px;
    border:1px solid currentColor; letter-spacing:.1em; text-transform:uppercase;
  }
  .pill.shipped{color:var(--bert)} .pill.built{color:var(--bert2)} .pill.needs{color:var(--bad)} .pill.merge{color:var(--warn)}
  .quote{
    margin-top:24px; border:1px solid rgba(55,255,139,.22);
    background:
      radial-gradient(700px 200px at 0% 0%, rgba(55,255,139,.10), transparent 60%),
      linear-gradient(180deg, rgba(11,18,32,.92), rgba(8,14,26,.88));
    border-radius:18px; padding:24px 26px; position:relative; overflow:hidden;
  }
  .quote .lbl{font-family:var(--mono); font-size:11px; color:var(--bert); letter-spacing:.22em; text-transform:uppercase}
  .quote .q{margin-top:12px; font-size:32px; line-height:1.25; font-weight:600; max-width:1000px}
  .quote .a{margin-top:10px; font-family:var(--mono); font-size:12px; color:var(--muted2)}
  .quote .qm{position:absolute; right:18px; bottom:-30px; font-size:180px; line-height:1; font-family:Georgia, serif; color:rgba(55,255,139,.08); pointer-events:none}
`;

type NavLink = { href: string; label: string };

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>${STYLE}</style>
  </head>
  <body>
    <div class="grid-bg"></div>
    <div class="wrap">${body}</div>
  </body>
</html>`;
}

function topbar() {
  return `<div class="topbar"><div class="left">Kinetic Gain · Operator Surface</div><div class="right"><div>Site · permits.kineticgain.com</div><div>Lane · Construction Tech</div><div>Mode · Permit-safe jobsite operations</div></div></div>`;
}

function renderTabs(active: string, links: NavLink[]) {
  return `<div class="tabs">${links
    .map((link) => `<a class="tab ${active === link.href ? "active" : ""}" href="${link.href}">${link.label}</a>`)
    .join("")}</div>`;
}

function renderHero(active: string) {
  const links: NavLink[] = [
    { href: "/", label: "Overview" },
    { href: "/permit-lane", label: "Permit Lane" },
    { href: "/readiness-risks", label: "Readiness Risks" },
    { href: "/inspection-posture", label: "Inspection Posture" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  return `${topbar()}
  <div class="herorow">
    <section class="hero">
      <div class="chiprow">
        <span class="meta-chip">Permit readiness</span>
        <span class="meta-chip">Submittal governance</span>
        <span class="meta-chip">Inspection parity</span>
        <span class="meta-chip">Operator escalation</span>
      </div>
      <h1>Permit package and inspection-ready control plane.</h1>
      <p>Permit queues, submission blockers, and inspection posture in one operator surface for construction and field teams that need cleaner jurisdiction handoffs before schedule risk spills into the site.</p>
      ${renderTabs(active, links)}
    </section>
    <aside class="side">
      <div class="bluf">
        <div class="lbl">Current watch item</div>
        <p><strong>Revision parity, utility sign-off, and packet drift</strong> are the fastest ways to turn a manageable review cycle into a burned jurisdiction window.</p>
      </div>
      <div class="corr">
        <div class="lbl">Operator correction</div>
        <p>Map every package to evidence, owner, and inspection-safe posture before PMs, field teams, and reviewers start working from different packet assumptions.</p>
      </div>
      <div class="toolchips">
        <span class="toolchip tc-codex">codex</span>
        <span class="toolchip tc-claude">claude</span>
        <span class="toolchip tc-gpt">webops</span>
        <span class="toolchip tc-perplex">revops</span>
      </div>
    </aside>
  </div>`;
}

function statusClass(value: "red" | "yellow" | "green") {
  if (value === "red") return "needs";
  if (value === "yellow") return "merge";
  return "shipped";
}

function heroShell(active: string, content: string) {
  return `${renderHero(active)}${content}`;
}

export function renderOverview() {
  const metrics = summary();
  const packets = inspectionPosture();
  return layout(
    "Permit Package Readiness Hub",
    heroShell(
      "/",
      `<section class="section">
        <div class="sh"><h2>Control snapshot</h2><div class="note">Permit-safe construction ops</div></div>
        <div class="kpis">
          <div class="kpi cyan"><div class="v">${metrics.packages}</div><div class="lbl">Packages</div><div class="h">Active permit packages tied to jurisdiction, owner, and next action.</div></div>
          <div class="kpi red"><div class="v">${metrics.urgentPackages}</div><div class="lbl">Urgent packages</div><div class="h">Red packages where schedule or intake acceptance is already under pressure.</div></div>
          <div class="kpi amber"><div class="v">${metrics.blockedReadiness}</div><div class="lbl">Blocked readiness</div><div class="h">Submittal and inspection blockers still waiting on proof.</div></div>
          <div class="kpi plum"><div class="v">${metrics.fragileInspectionPackets}</div><div class="lbl">Fragile packets</div><div class="h">Inspection-facing packets that still need stronger parity before release.</div></div>
        </div>
        <div class="quote">
          <div class="lbl">Primary recommendation</div>
          <div class="q">${metrics.recommendation}</div>
          <div class="a">Permit trust comes from aligned revision control, evidence bundles, and inspection-safe packet posture.</div>
          <div class="qm">”</div>
        </div>
      </section>
      <section class="section">
        <div class="sh"><h2>Inspection packets</h2><div class="note">What can safely move next</div></div>
        <div class="inv">
          ${packets
            .map(
              (packet) => `<article class="ivc">
                <div class="ivt"><h4>${packet.packetId}</h4><span class="pill ${statusClass(packet.status)}">${packet.status}</span></div>
                <p><b>${packet.audience}</b></p>
                <p>${packet.confidenceScore}% confidence · ${packet.replyWindowHours} hours to next review window.</p>
                <p>${packet.decisionNote}</p>
              </article>`
            )
            .join("")}
        </div>
      </section>`
    )
  );
}

export function renderPermitLane() {
  const rows = permitLane();
  return layout(
    "Permit Package Readiness Hub — Permit Lane",
    heroShell(
      "/permit-lane",
      `<section class="section">
        <div class="sh"><h2>Permit lane</h2><div class="note">Packages under pressure</div></div>
        <table class="ttbl">
          <thead><tr><th>Package</th><th>Owner</th><th>Risk</th><th>Next move</th></tr></thead>
          <tbody>
            ${rows
              .map(
                (item) => `<tr>
                  <td><b>${item.project} · ${item.permitType}</b><br />${item.packageId} · ${item.jurisdiction}<br />${item.excerpt}</td>
                  <td>${item.owner}</td>
                  <td><span class="st ${statusClass(item.risk)}">${item.risk}</span></td>
                  <td>${item.nextAction}</td>
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </section>`
    )
  );
}

export function renderReadinessRisks() {
  const risks = readinessRisksLane();
  return layout(
    "Permit Package Readiness Hub — Readiness Risks",
    heroShell(
      "/readiness-risks",
      `<section class="section">
        <div class="sh"><h2>Readiness risks</h2><div class="note">Evidence gaps before submittal and inspection promises</div></div>
        <div class="ledger">
          <div class="led">
            <div class="led-head"><span class="dot"></span>Proof packets required</div>
            <ul>
              ${risks
                .map(
                  (item) => `<li class="${item.readiness === "red" ? "bad" : ""}"><span class="pip">→</span><div><b>${item.riskId} · ${item.blocker}</b><br />${item.requiredEvidence}</div></li>`
                )
                .join("")}
            </ul>
          </div>
          <div class="led">
            <div class="led-head bad"><span class="dot"></span>Impact areas at risk</div>
            <ul>
              ${risks
                .map(
                  (item) => `<li class="${item.readiness === "red" ? "bad" : ""}"><span class="pip">→</span><div><b>${item.riskId} · ${item.owner}</b> · ${item.impactArea}<br />${item.note}</div></li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
      </section>`
    )
  );
}

export function renderInspectionPosture() {
  const packets = inspectionPosture();
  return layout(
    "Permit Package Readiness Hub — Inspection Posture",
    heroShell(
      "/inspection-posture",
      `<section class="section">
        <div class="sh"><h2>Inspection posture</h2><div class="note">Packet confidence and reviewer timing</div></div>
        <div class="board">
          ${packets
            .map(
              (packet) => `<article class="pcard">
                <div class="ptop">
                  <div class="pnum">${packet.confidenceScore}%</div>
                  <div class="ppri">${packet.packetId}</div>
                </div>
                <h3>${packet.audience}</h3>
                <p class="pdesc">${packet.decisionNote}</p>
                <ul class="check">
                  <li>Status: ${packet.status}</li>
                  <li>Blocker: ${packet.blocker}</li>
                  <li>Review window: ${packet.replyWindowHours} hours</li>
                </ul>
                <div class="pfoot"><span class="pill ${statusClass(packet.status)}">${packet.status}</span></div>
              </article>`
            )
            .join("")}
        </div>
      </section>`
    )
  );
}

export function renderVerification() {
  const points = verification();
  return layout(
    "Permit Package Readiness Hub — Verification",
    heroShell(
      "/verification",
      `<section class="section">
        <div class="sh"><h2>Verification</h2><div class="note">What this surface proves</div></div>
        <div class="ledger">
          <div class="led">
            <div class="led-head"><span class="dot"></span>Operator-grade evidence</div>
            <ul>${points.map((item) => `<li><span class="pip">→</span><div>${item}</div></li>`).join("")}</ul>
          </div>
          <div class="led">
            <div class="led-head"><span class="dot"></span>KG Embedded fit</div>
            <ul>
              <li><span class="pip">→</span><div>Permit, inspection, and readiness data can surface in-product without exposing unsafe write paths.</div></li>
              <li><span class="pip">→</span><div>Submission parity and review evidence stay connected to buyer-facing dashboards.</div></li>
              <li><span class="pip">→</span><div>Synthetic data only; this repo demonstrates system shape, not production permit records.</div></li>
            </ul>
          </div>
        </div>
      </section>`
    )
  );
}

export function renderDocs() {
  return layout(
    "Permit Package Readiness Hub — Docs",
    heroShell(
      "/docs",
      `<section class="section">
        <div class="sh"><h2>System docs</h2><div class="note">Routes and control surfaces</div></div>
        <div class="stack">
          <article class="src"><div class="src-name">Control plane</div><div class="src-tit">Permit lane</div><p>Package-by-package queue with jurisdiction, owner routing, and next submission-safe move.</p></article>
          <article class="src"><div class="src-name">Risk map</div><div class="src-tit">Readiness risks</div><p>Required evidence, owner lanes, and impact areas for blocked submission and inspection posture.</p></article>
          <article class="src"><div class="src-name">Field view</div><div class="src-tit">Inspection posture</div><p>Packet-level confidence, blocker state, and next reviewer-window timing.</p></article>
          <article class="src"><div class="src-name">Embedded tie-back</div><div class="src-tit">KG Embedded</div><p>Security-first in-product analytics extension for permit readiness, inspection cadence, and field workflows.</p></article>
        </div>
        <div class="quote">
          <div class="lbl">Route surface</div>
          <div class="q"><code>/</code> · <code>/permit-lane</code> · <code>/readiness-risks</code> · <code>/inspection-posture</code> · <code>/verification</code> · <code>/docs</code></div>
          <div class="a">The shell is standardized for future operator surfaces.</div>
          <div class="qm">”</div>
        </div>
      </section>`
    )
  );
}
