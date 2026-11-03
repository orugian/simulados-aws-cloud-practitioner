---
name: Simulados CLF-C02
description: Exam simulator for AWS Certified Cloud Practitioner in the NOUS world
colors:
  electric-blue: "#0000F2"
  electric-blue-deep: "#000091"
  navy-rail: "#000061"
  paper: "#F2F2F2"
  sheet-white: "#FFFFFF"
  muted-ink: "#55557F"
  hairline: "#616191"
  vermilion-text: "#B8270F"
  vermilion-cell: "#E0442B"
  flag-amber: "#FFB13B"
  flag-amber-deep: "#C25E00"
typography:
  display:
    fontFamily: "Antonio, Arial Narrow, sans-serif"
    fontSize: "66px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "Antonio, Arial Narrow, sans-serif"
    fontSize: "54px"
    fontWeight: 300
    lineHeight: 0.9
  headline:
    fontFamily: "Antonio, Arial Narrow, sans-serif"
    fontSize: "30px"
    fontWeight: 500
    lineHeight: 1.1
  question:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "0.06em"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 500
rounded:
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "5px"
components:
  button-primary:
    backgroundColor: "{colors.electric-blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "38px"
  button-primary-hover:
    backgroundColor: "{colors.electric-blue-deep}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.electric-blue}"
    rounded: "{rounded.sm}"
    height: "38px"
  button-flag-active:
    backgroundColor: "{colors.flag-amber}"
    textColor: "{colors.navy-rail}"
  chip:
    textColor: "{colors.electric-blue}"
    typography: "{typography.label}"
    height: "20px"
    padding: "0 6px"
  answer-row:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.navy-rail}"
    rounded: "{rounded.lg}"
    padding: "14px 16px"
  answer-row-correct:
    backgroundColor: "{colors.electric-blue}"
    textColor: "{colors.paper}"
  sheet-cell:
    textColor: "{colors.paper}"
    typography: "{typography.data}"
    height: "27px"
---

# Design System: Simulados CLF-C02

## Overview

**Creative North Star: "The Answer Sheet"**

This is the screen a candidate sits in front of for 90 minutes, built like an exam's answer sheet. A navy rail carries the clock and the 65-cell sheet, which is the main way to move around the exam and the at-a-glance state of it. The question sits on an off-white field, set at the generous measure of a written exam. The visual world is NOUS, chosen by the user: electric blue, off-white and navy, labels in condensed uppercase, and almost square corners.

The density is that of a working tool: no decoration, no illustration, nothing gamified. Type carries the expression: condensed Antonio for large numerals and headings, Barlow for reading, JetBrains Mono for numbers on the sheet and service names.

**Key Characteristics:**
- Fixed 304px navy rail beside a paper field; on mobile the rail collapses into a header with an expandable sheet.
- Labels, buttons and headings are always UPPERCASE and condensed. Question and answer text stays in sentence case.
- Elevation is only a 1px inset ring. No drop shadows.
- The correct/incorrect pair always comes with an icon and a text label (✓ Correct / ✗ Your answer), never color alone.

## Colors

Committed palette: electric blue does the work (actions, selection, correct), navy carries the rail, paper is the ground. Vermilion and amber show up only as status.

### Primary
- **Electric Blue** (#0000F2): primary actions, selection, the correct state (filled), headings and numerals.
- **Deep Blue** (#000091): hover on primary actions.

### Secondary
- **Navy Rail** (#000061): background of the rail, the backdrop and the body ink.

### Tertiary
- **Vermilion** (text #B8270F, cell #E0442B): incorrect answer, "Needs improvement", below the training target. An extension the user allowed, since NOUS has no error color.
- **Flag Amber** (#FFB13B, darker #C25E00 on light cells): questions flagged for review.

### Neutral
- **Paper** (#F2F2F2): the main ground and the text on blue/navy.
- **Sheet White** (#FFFFFF): answer rows and panels.
- **Muted Ink** (#55557F): secondary text (about 6.3:1 on paper).
- **Hairline** (#616191): lines and footers.

**The Status-Only Rule.** Vermilion and amber appear only where they carry state (error, flag), never as decoration.

**The Never-Color-Alone Rule.** Every correct/incorrect state carries a glyph and a label: ✓ Correct / ✗ Your answer, Acertou / Errou.

## Typography

**Display Font:** Antonio (fallback Arial Narrow)
**Body Font:** Barlow (fallback system-ui)
**Label/Mono Font:** Barlow Condensed for labels, JetBrains Mono for data

**Character:** Antonio stands in for NOUS's Rules Gothic Compressed and Barlow Condensed for Rules Condensed, both free substitutes for commercial faces. All four are self-hosted in `assets/fonts.css` (latin subset, base64), so the app works offline.

### Hierarchy
- **Display** (500, clamp 40–66px, 1.0, uppercase): screen titles.
- **Numeral** (300, 54–168px, 0.82–0.9): timer, overall percentage, counters.
- **Headline** (500, 30px, uppercase): section headings.
- **Question** (400, 20px, 1.55, at most 68ch): question text.
- **Body** (400, 16–17px, 1.5–1.6): answers and justifications.
- **Label** (600, 13–15px, 0.06em, uppercase): buttons, chips, status labels.

## Layout

- **Shell:** two columns, the 304px rail plus a fluid main area with padding of clamp(20px, 5vw, 72px). Content is capped at 1040px, questions and answers at 880px.
- **Exam action bar:** fixed at the bottom of the main area.
- **Breakpoints:**
  - 1100px: the study form goes to 2 columns.
  - 900px: the rail becomes a sticky header with the timer and a "Folha" toggle; the sheet becomes 10 columns; tables become stacked rows.
  - 560px: single column; button labels become screen-reader-only (sr-only).

## Elevation & Depth

Flat. Depth comes from 1px inset rings: `inset 0 0 0 1px rgba(0,0,242,.2)` at rest and a solid blue ring on hover and selection. Answer rows add a faint lower inner shadow, `inset 0 -2px 2px rgba(0,0,97,.05)`. The dialog backdrop is navy at 72%.

**The Ring-Not-Shadow Rule.** There is no offset or blurred drop shadow anywhere.

## Shapes

- **Radii:** minimal, 2–5px.
- **Chips, sheet cells and toggle buttons:** square on the left, rounded only on the right (`0 2px 2px 0`), the NOUS signature.
- **Icons:** drawn in SVG with a single 1.75px stroke and square caps.

## Components

### Buttons
- **Shape:** almost square (3px), 38px tall (30px compact).
- **Primary:** blue fill, paper text, condensed uppercase.
- **Secondary:** transparent with a blue ring.
- **Ghost:** underlined.
- **Danger:** vermilion ring.
- **Disabled:** opacity .38.
- **Flag (active):** amber fill with navy text.

### Chips
- Uppercase condensed, 20px tall, with variants: outlined blue, solid blue, navy, error, mono (service names).

### Answer rows
- Each row is a white row with a letter chip.
- **Selected:** 2px blue ring and filled letter chip.
- **After correction:**
  - correct chosen: solid blue, ✓ "Correta · sua";
  - correct not chosen: dashed blue ring, ✓ "Correta";
  - incorrect chosen: vermilion ring, ✗ "Sua resposta";
  - the rest: on paper.
- Each row shows its own justification.

### Answer sheet (signature)
- A 5×13 grid on the rail (10 columns on mobile).
- **Cell states:**
  - blank: paper ring;
  - answered: solid paper;
  - partial: half-filled;
  - correct: blue with a paper ring and ✓;
  - incorrect: vermilion with a strike;
  - flagged: amber corner;
  - current: paper outline.

### Inputs / Selects
- 38px, paper background, blue ring at 20% that turns solid on hover.

## Do's and Don'ts

### Do:
- **Do** use condensed UPPERCASE for every label, button and heading.
- **Do** pair every state with a glyph and a text label.
- **Do** keep elevation to 1px inset rings.
- **Do** show the exam's raw percentage and the 80% target; never fake the scaled score.

### Don't:
- **Don't** use drop shadows, gradients as decoration, or radii above 5px.
- **Don't** show the domain or any correction in exam mode before submission.
- **Don't** load fonts from a CDN; the app has to open offline.
