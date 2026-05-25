# Architecture

## Overview

`permit-package-readiness-hub` is a lightweight TypeScript + Express control room for modeling the operating layer between permit packages, readiness blockers, inspection posture, and construction-safe submission operations.

## Surfaces

- `overview`
  - active permit packages
  - blocked readiness dependencies
  - inspection packets
  - governance recommendation
- `permit-lane`
  - package-by-package queue
  - owner routing
  - jurisdiction pressure
- `readiness-risks`
  - revision, utility, and approval blockers
  - required evidence
  - readiness posture
- `inspection-posture`
  - packet confidence
  - review timing
  - blocker state
- `verification`
  - what the repo proves about permit-readiness systems

## Data Model

- `PermitPackage`
  - project, jurisdiction, permit type, owner, risk, next action
- `ReadinessRisk`
  - blocker, source, required evidence, owner, readiness, impact area
- `InspectionPacket`
  - audience, confidence score, review window, blocker, decision note

## Design Principle

Permit readiness should be inspectable by PMs, field operators, design leads, and platform stakeholders. The system should explain:
- which package is under pressure right now
- which blocker is still missing proof
- who owns the next move
- where schedule or inspection risk is building
