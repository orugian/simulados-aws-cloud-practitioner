---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface: index.html — simulador CLF-C02

Mode: Operate. Audience: one candidate preparing for the CLF-C02 exam (26/11/2026), long sessions on desktop and occasionally on mobile. Task: take a 65-question, 90-minute exam, review it, and learn from mistakes. World pinned by the user: NOUS.

## Direction contract

THESIS: The candidate's answer sheet is the screen. The default for this kind of page is a gray quiz card with a progress bar; this one rejects that. A navy rail holds the 65-cell answer sheet, which is the main way to move through the exam and read its state. The question sits on an off-white sheet with the generous measure of a written exam.

OWN-WORLD: Navy #000061 rail, #F2F2F2 ground and #0000F2 for actions and for the correct state. Uppercase labels in Barlow Condensed, numbers in Antonio (timer, score) and body text in Barlow. Chips have the left corner square and the right corner rounded at 2px; elevation is a 1px inset ring. Incorrect answers use vermilion #D2321E with an ✗ icon and a text label, and are always paired with the ✓ for correct.

STORY: The candidate sees how many days remain and where each attempt stands, starts an exam, answers it on the sheet, reviews the questions left blank or flagged, submits, and reads the result by domain the way the AWS report presents it (Meets / Needs improvement). Then they reopen the mistakes notebook.

FIRST VIEWPORT (exam): On the left, a 300px rail with the mode, a large Antonio timer and the 13×5 answer sheet. On the right, a header line with the question number and the "Selecione DUAS" count, the question text at 20px over 68ch, and full-width alternative rows with a letter chip. A sticky bottom action bar holds Anterior, Marcar and Próxima.

FORM: Rail with an answer sheet (structure 1 of 1, NOUS brief pinned by the user). seed: none (pinned by user brief)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
