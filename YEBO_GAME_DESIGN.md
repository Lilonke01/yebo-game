# Yebo’s Shopping Adventure: Small Steps, Big Smiles!

Game design document • Version 1.0 • 18 October 2026

## 1. Game description and design brief

Join nine-year-old Yebo on a colourful shopping adventure through his neighbourhood! Help him count Mama’s money, solve friendly neighbours’ puzzles, find the family’s groceries, and check his change at Mr Dlamini’s spaza shop. With Lindi, an encouraging young mentor, learners can count real-world money values, try different strategies, and celebrate each small success. Big buttons, spoken instructions, visual helpers, and a gentle pace make this a welcoming place to practise independently or alongside a YeBoneer.

**Audience:** Primarily Grade 3 learners aged 8–9 who need foundational numeracy support, including the codes 2–4 group specified in the brief. Grade 4 learners may use the same material when appropriate to their learning needs. Never display school performance codes to learners or use them as ability labels.

**Format:** A short 2D narrative game with a side-scrolling neighbourhood, touch-based money manipulatives, and a shopping puzzle. Movement is automatic between encounters; no jumping, collision hazards, or reflex challenges block mathematics.

**Session:** Target 12–18 minutes, without a countdown or time-based scoring. Save at each completed challenge and allow pauses or a second session.

**Design status:** This is a proposed design for the requested context, not a claim of YearBeyond endorsement or an evaluated intervention. All mechanics, thresholds, scripts, and deployment targets below are design proposals.

## 2. Story, pacing, and sample dialogue

| Scene | Typical time | Learner action | Story outcome |
|---|---:|---|---|
| Home | 2–3 min | Identify denominations and count Mama’s wallet | Shopping list and bag received |
| Journey | 4–5 min | Addition, subtraction, equal groups | Three community stickers collected |
| Shop | 5–7 min | Select groceries; total, compare, pay, calculate change | Correct groceries and money in bag |
| Homecoming | 1–3 min | Explain or check one answer; view celebration | Mama thanks Yebo; progress saved |

### Opening: Mama’s kitchen

Sunlight falls across a kitchen table. The fridge has a child’s drawing; a reusable shopping bag hangs by the door. Mama sets down play-money representations and a picture shopping list.

**Mama:** “Yebo, please help me fetch bread, milk, and apples. Let’s check the money first.”

**Yebo:** “I’ve got the bag! Will you help me count?”

**Lindi, a fictional 21-year-old YeBoneer guide:** “Let’s count together. Tap each coin or note once.”

In the standard example, Mama gives R20 + R20 + R5 + R2 + R2 + R1 = **R50**. Tapping moves a piece into the counted tray, highlights it, and shows a running total. A separate question asks the learner to confirm the final total. Counted pieces cannot be counted twice; Undo returns a piece and subtracts its value.

Before counting, one brief recognition prompt asks: “Which coin is worth R2?” The learner then counts the whole wallet. This gives separate evidence for recognising money and adding its values.

**Specific retry:** “That coin says R2. Let’s look at the value on each piece.”

**Success:** “You counted R50. Let’s keep it safe in the wallet!”

Yebo does a short two-step dance and receives a “Money Detective” sticker. Reduced-motion mode replaces the dance with a still pose. The map lights up the next location.

### Journey: three neighbours, three useful problems

Yebo walks through a lively, cared-for neighbourhood: homes, a community garden, a small reading space, and the shop. Show varied buildings and everyday activity without treating poverty as scenery. Lindi walks alongside Yebo, rather than hovering as an authority figure.

Each neighbour offers one required problem. Rewards are stickers and thanks, never extra cash: Mama’s wallet must remain unchanged during the journey.

#### Encounter 1 — Aunty Zanele, the cheerful gardener: addition

**Zanele:** “I bought seeds for R8 and a small pot for R7. How much did I spend?”

**Worked solution:** R8 + R7 = R8 + R2 + R5 = **R15**.

**Lindi’s first hint:** “Start with eight. How much more makes ten?”

**Visual support:** A number line from 0 to 20 shows a jump from 8 to 10, then from 10 to 15. Two labelled purchase cards remain visible. The learner makes the jumps before entering the answer.

**After two incorrect submissions:** “Let’s try with counters.” Reveal eight counters and seven counters, arranged into a group of ten and five more. The Show me how animation models the same decomposition; it never automatically records an independent success.

**Transfer check after a full model:** “Now try: seeds R6 and a pot R5.” R6 + R4 + R1 = **R11**. This smaller problem preserves the skill.

**Success:** “You found a way through ten! These seedlings are for our garden.” Reward: sunflower sticker.

#### Encounter 2 — Sipho, the thoughtful reading-club helper: subtraction

**Sipho:** “I had R20 for our club. I spent R6 on paper. How much is left?”

**Worked solution:** R20 − R6 = R20 − R5 − R1 = **R14**.

**Lindi’s first hint:** “We are finding what is left. Start at twenty.”

**Visual support:** Exchange a R20 note for four R5 play coins, then exchange one R5 for five R1 coins. Remove R5 and R1; the remaining value is R14. A parallel number line shows 20 → 15 → 14.

**Specific retry:** “You found the amount spent. What stays in the wallet?”

**Simpler transfer check:** R10 − R3 = **R7**, represented with ten counters and three crossed out. Keep the original R20 problem available for a later return.

**Success:** “Fourteen rand left. Thanks for helping our club plan!” Reward: open-book sticker and optional high-five.

#### Encounter 3 — Mr Patel, the playful fruit seller: repeated addition

**Patel:** “There are three bags of oranges. Each bag costs R4. What do all three cost?”

**Worked solution:** R4 + R4 + R4 = R8 + R4 = **R12**; connect to 3 × R4 = R12 after showing the groups.

**Lindi’s first hint:** “Three equal groups. Count four for each bag.”

**Visual support:** Three separate bags, each above four R1 counters; jumps 0 → 4 → 8 → 12. Highlight one group at a time.

**Specific retry if the learner answers 7:** “We have three bags, each worth four rand. Let’s add four for every bag.”

**Simpler transfer check:** Two bags at R3 each: R3 + R3 = **R6**. Introduce the multiplication symbol only after the learner sees equal groups.

**Success:** “Three groups of four makes twelve. You counted every bag!” Reward: orange-basket sticker.

### Main scene: Mr Dlamini’s spaza shop

**Dlamini:** “Welcome, Yebo! Your list will help you find what Mama needs.”

**Yebo:** “Let’s check each item before we pay.”

The player selects the listed quantities, calculates the basket total, compares it with available money, chooses payment, and calculates change. Each is a separate step. Prices are deliberately simplified teaching prices, not claims about current retail prices.

After correct selection: “Bread, milk, apples. Everything on the list is here.”

Before payment: **Lindi:** “Is the money enough? Compare the wallet and the total.”

Before change: **Lindi:** “How could we check our answer?” Offer two strategy buttons: Count up, or Take away. The learner may explain aloud; speech recognition is unnecessary.

After change: **Dlamini:** “Let’s check: the shopping plus the change makes the payment.”

The learner can keep all change or consider a small extra purchase only after Mama’s essentials are secured and Mama’s permission has been established in dialogue: “If there’s change, you may choose one small extra—or bring all the change home.” Both decisions receive equal encouragement.

### Ending: back home

**Mama:** “You brought our groceries and checked the change. Thank you for helping!”

**Yebo:** “Counting in steps helped me.”

**Lindi:** “You kept thinking. Which strategy would you use again?”

The learner can tap Coins, Number line, or Counting in groups. Reflection has no correct answer. A short celebration shows all earned stickers, a completion star, and skill statements. Play again offers a different list and wallet combination; Continue later preserves an unfinished session.

## 3. Two complete shop scenarios

### Scenario A — Family essentials, whole rands

**List:** One loaf of bread R14; one carton of milk R12; one bag of apples R9. Distractors: soap R10 and juice R8.

**Wallet:** R20 + R20 + R5 + R2 + R2 + R1 = **R50**.

1. Select exactly the three list items. Extra items can be removed without penalty. Feedback: “Let’s match this item to Mama’s list.”
2. Total: R14 + R12 = R26; R26 + R9 = **R35**. Support: combine tens (R10 + R10), then ones (R4 + R2 + R9 = R15), giving R35.
3. Enough money? **Yes:** R50 ≥ R35. Show two aligned bars labelled R35 needed and R50 available. Do not reveal the difference until the change step.
4. Choose payment: two R20 notes = **R40**. Any available payment at least R35 is accepted; paying R50 is also valid and produces R15 change. A payment below R35 prompts: “Let’s add enough to reach thirty-five.”
5. For payment R40, change: R40 − R35 = **R5**. Count up 35 → 40 (+5). Check: R35 + R5 = R40.
6. Wallet accounting: R10 unspent + R5 returned = **R15 remaining**, regardless of whether the learner paid R40 or R50. Explicitly distinguish change from total money left.
7. Optional extra: fruit snack R4. R15 − R4 = **R11** to bring home. If paying with the returned R5 coin, extra-purchase change is R1; the other R10 remains untouched. Saving all R15 is equally celebrated.

**Scaffolding:** Keep price cards above a three-part addition mat; offer a 0–50 number line in fives with expandable ones; after two errors, animate R35 + R5 = R40. Follow a full demonstration with a small new change task, such as R20 − R15 = R5, and report that as supported transfer evidence.

### Scenario B — Pantry top-up, rand and cents extension

**List:** Bread R16,50; milk R13,50; four bananas sold as one bag for R10; small packet of tea R8. Distractors: crisps R7 and soap R9.

**Wallet:** R50 + R5 + R2 + R2 + R1 = **R60**. Cents appear in prices, not in the starting wallet.

1. Select four listed products; the banana bag is one purchase, avoiding a quantity/price ambiguity.
2. Total: R16,50 + R13,50 = R30,00; + R10 + R8 = **R48,00**. Explain 50c + 50c = 100c = R1, so R16 + R13 + R1 = R30.
3. Enough money? **Yes:** R60 ≥ R48.
4. Pay with R50. Change: R50 − R48 = **R2**. Count up 48 → 50 (+2). Check: R48 + R2 = R50.
5. Wallet accounting: R10 unspent + R2 change = **R12 remaining**.
6. Optional extra: small juice R12,50. **Not enough:** R12,50 − R12 = **50c short**. Offer Keep my change or choose fruit R3,50. If fruit is chosen, R12 − R3,50 = **R8,50** remains. A possible payment is R5, returning R1,50, with R7 untouched.

**Scaffolding:** Put two 50c tokens into a R1 frame before combining whole rands. Allow a cents-only representation of the calculation: 1 650c + 1 350c + 1 000c + 800c = 4 800c. Explain R1 = 100c explicitly. If this is too demanding, switch the next scenario to whole-rand prices; preserve Scenario B as assisted work rather than pretending it was solved independently.

**Deliberate insufficient-funds practice:** In either scenario, a separate comparison card asks about a proposed wallet smaller than the basket total. For A, “Would R30 buy R35 of groceries?” No; R5 more is needed. This hypothetical card does not change Mama’s real wallet or strand Yebo.

## 4. UI and interaction specification

### Shared shell

Top: Home → Neighbours → Shop → Return progress map, with symbols and text labels. Top corner: Pause, Sound, and Read aloud. Bottom: one short instruction, answer controls, Check, and Help. Put a persistent Back/Undo action beside manipulatives.

Use at least 48 × 48 logical-pixel touch targets with spacing, keyboard focus, readable high-contrast text, and symbols alongside colour. Support tap-to-select and tap-to-place everywhere dragging is offered. No essential action depends on colour, dragging, a double tap, audio, or fast timing.

### Home screen

Left: Mama and Yebo; centre: uncounted and counted money trays; right: picture shopping list. On small portrait screens stack the trays above the list. The running total has a labelled rand/cents field. Selected money receives a border and check mark. A prompt such as “Tap the R2 coin” stays on screen until answered or supported.

### Journey screen

The neighbourhood scrolls gently into an encounter, then stops. Show the speaking character, a short speech bubble, a picture model, and a large answer pad. The number line expands in place, keeping the question visible. Continue appears only after an independent solution or a completed supported path and transfer opportunity. Pause and facilitator-assisted continuation always remain available.

### Shop screen

Left: list with item pictures, words, quantities, and check boxes. Centre: a small shelf of six products maximum; right: basket. A step strip reads Choose → Add → Enough? → Pay → Change. Only the current step is interactive. Price labels never disappear when the basket moves.

Use whole-rand entry first. For cents, use labelled Rand and Cents boxes with examples; accept R16,50 and R16.50 if typed, while displaying the local comma convention consistently. Treat input as integer cents internally to avoid rounding errors.

### Feedback states

| State | Example | Behaviour |
|---|---|---|
| Ready | “What do the three items cost?” | No timer; Help available |
| First incorrect submission | “Let’s add the bread and milk first.” | Preserve answer for editing; add a relevant cue |
| Second incorrect submission | “Let’s build it together.” | Open visual support; reveal Show me how |
| Correct with support | “That strategy helped you find R35!” | Celebrate; log the support level |
| Correct independently | “You found R35 and checked your total!” | Celebrate; log independent evidence |
| Interrupted | “Your adventure is saved.” | Resume at current step without duplicate events |

No buzzers, red crosses, lost lives, public rankings, or negative labels. Announce feedback accessibly, keep it visible, and do not rely on a disappearing toast.

## 5. Learning progression and CAPS alignment

CAPS Mathematics Grades 1–3 includes South African money recognition, totals and change, and rand/cents conversion in Grade 3; the progression also supports calculations and equal groups. See the DBE curriculum, topic 1.11 and the Grade 3 overview, printed pp. 75–76. The R100 ceiling here is a deliberate recovery scope, not the full Grade 3 ceiling or complete curriculum coverage. [DBE CAPS](https://www.education.gov.za/Portals/0/CD/National%20Curriculum%20Statements%20and%20Vocational/CAPS%20MATHS%20%20ENGLISH%20GR%201-3%20FS.pdf)

| Step | Skill built | Game evidence | Support → next demand |
|---|---|---|---|
| Recognise | Identify R1, R2, R5 coins; R10, R20, R50 notes | Choose named denomination | Label and compare → identify among mixed pieces |
| Count | Combine values, rather than count pieces | Confirm Mama’s wallet | Running total → grouped mental counting |
| Add | Combine two, then three/four prices | Garden and basket totals | Counters → make ten → partition tens/ones |
| Subtract | Understand spent versus remaining | Reading-club problem | Remove objects → number-line jumps |
| Equal groups | Repeated addition linked to multiplication | Fruit seller’s three bags | Visible groups → equation |
| Compare | Decide whether available money meets a cost | Enough and insufficient cards | Aligned bars → symbolic comparison |
| Change | Find payment minus total and verify | Till calculation | Count up → subtraction → inverse check |
| Extend | Link 100c to R1; work with 50c | Scenario B | Coin frame → mixed rand/cents totals |
| Transfer | Select and explain a useful method | Fresh replay and reflection | Mentor cue → learner choice |

Before wider deployment, the school’s Foundation Phase lead should map selected tasks to its current term plan. This game practises a subset of money content, not a substitute for classroom assessment.

## 6. YearBeyond purpose and facilitation model

YearBeyond’s Catch-Up description identifies Grade 3/4 learners at codes 2–4, low- and no-fee schools, academic and confidence goals, and YeBoneer tutoring and activity/attendance recording. This design responds with short supported practice, an encouraging guide, and an actionable session record. [YearBeyond Catch-Up](https://www.yearbeyond.org/catch-up)

The dual-beneficiary model supports both learners and young people gaining service experience and skills. Here, learners receive targeted numeracy practice; YeBoneers practise questioning, observation, explanation, and using evidence to plan support. The game supplements human relationships: Lindi models a prompt, while the actual facilitator listens to the child’s reasoning. This is a proposed application of the programme model. [YearBeyond’s description of its dual-beneficiary approach](https://www.yearbeyond.org/news/premier-calls-on-business-leaders-to-back-youth-futures-at-yearbeyond-ceo-dialogue)

A facilitator needs three repeatable moves: ask “What do you notice?”, wait for thinking, then ask “Can you show it another way?” Avoid giving the answer before the learner explores a representation. In paired play, rotate Counter and Checker roles after each encounter so both children act and explain. Mark the session as paired; do not interpret shared answers as either child’s independent mastery.

Confidence is an intended outcome to investigate, not an effect established by game completion. Observe willingness to attempt and explain; invite an optional learner response to “How did counting feel today?” Never diagnose confidence from speed, hints, or stars.

## 7. Differentiation, support, and rewards

**Support route:** Whole rands; totals to R20; two visible addends before three groceries; fewer denominations; concrete counters and spoken prompts. Preserve the story and community rewards. Provide a three-item list whose third item can be added after the first two are modelled.

**Standard route:** Three/four items, whole-rand totals to R100, mixed wallet values, enough/not enough comparisons, and change from a chosen payment.

**Challenge route:** Optional 50c values, rand/cents conversion, two valid ways to pay, a budget choice, and explanation of an inverse check. Keep totals within R100 for this release. Do not introduce timed arithmetic.

**Tiered support:** Help is available immediately. First tier: restate and highlight relevant values. Second tier: interactive coins, counters, groups, or a number line. After two incorrect submissions on the same task, automatically offer those visual tools and unlock a Show me how model. After a full model, offer a fresh easier task or facilitator-assisted continuation; never trap a learner in retries.

**Proposed adaptive rule:** Begin at a facilitator-selected level or standard; never infer level from age alone. Two consecutive independently correct maths tasks at the same level offer one small increase on the next task. Two tasks requiring full models offer a lower-demand next task. Change one variable at a time, and never alter a displayed question or its wallet mid-task. Selection errors and optional audio use do not trigger a maths downgrade. Facilitators can override. Pilot these rules before treating them as useful thresholds.

**Accessibility:** Read aloud every instruction, dialogue, item, price, hint, and feedback message; replay without penalty. Bundle recorded narration for offline play rather than relying on device voices. Include subtitles, independent music/voice controls, reduced motion, zoom/reflow, and a reading-friendly font option with generous spacing. Offer a clearly labelled dyslexia-friendly font preference, without claiming that one font suits every learner. Plan English plus isiXhosa and Afrikaans packs, with other languages prioritised by pilot sites; community reviewers must check translations, terminology, and pronunciation.

**Stars:** All completions earn one “I kept going” star. A second celebrates a correct, non-modelled answer on at least 70% of core maths tasks. A third celebrates at least 80% independently correct first attempts and a successful inverse check. Display neutral descriptions such as “Practised”, “Solved”, and “Checked”, with all stickers retained. Show no empty star outlines, ranking, or penalty message. Thresholds are provisional; test whether learners experience this as encouragement. Optional narration never counts as a hint.

## 8. Facilitator reporting and progress records

Open Facilitator view from Pause or the end screen. A simple adult access gesture prevents accidental navigation; it is not a security boundary. Use learner aliases on shared devices, no public leaderboard, and no account requirement for play. Keep personal rosters under the school’s existing handling practices.

### Example session card

**Learner:** L023 • **Activity:** Shopping A • **Mode:** Individual • **Status:** Completed

| Skill | First independent successes / tasks | Further evidence | Suggested next action |
|---|---:|---|---|
| Recognise money | 1/1 | R2 correctly identified | Revisit with another coin |
| Count money | 1/1 | R50 wallet counted | Try a new combination |
| Add totals | 1/2 | Basket total solved after one cue | Practise making ten |
| Subtract | 0/1 | R14 found with counters | Repeat concrete take-away |
| Equal groups | 0/1 | Full model used | Build two equal groups |
| Compare | 2/2 | Enough and not-enough cards solved | Explain the gap |
| Change | 0/1 | Count-up tool used successfully | Practise R20 − R15 |

**Independent first-attempt accuracy:** 5/9 = **56%**, rounded to the nearest whole percent. **Hints opened:** 4. **Full models:** 1 of those 4. **Core tasks eventually solved without a full model:** 8/9. **Recommendation:** “Practise equal groups with counters, then repeat change using count-up jumps.”

Definitions matter: each core task has one primary skill and one denominator entry. A first attempt made after a hint is supported, even if correct. Subsequent tries do not inflate the task count. A modelled solution is not a learner success; any later transfer item is recorded separately. An unfinished task is incomplete, not incorrect. For zero attempted tasks, display “Not enough evidence”, not 0%.

Count a hint only when a new instructional hint or tool is opened for a task; replaying its audio does not add another hint. Track highest support tier, model use, and adult assistance separately. Language narration and accessibility settings never reduce independence scores.

**Minimum record:** local session ID; alias; date; scenario and content version; individual/paired mode; selected/adapted level; task ID; skill; first submission correctness; submissions; hint tiers used; model use; adult assistance; task completion; session completion; optional facilitator note. Autosave after each submission and transition; use event IDs to avoid double-counting after resume.

Export a short CSV summary locally for the authorised facilitator and offer printable session cards. Include an explicit delete-learner action. Agree retention and export handling with the implementing school before rollout. A game session records an activity, not verified attendance: the YeBoneer confirms attendance in the programme’s normal register. No automatic connection to YearBeyond systems is assumed.

Recommendation order: flag skills with model use or adult assistance, then skills with supported retries, then suggest a new independent probe where evidence is sparse. Recommend harder totals only after success on multiple fresh tasks across sessions; one playthrough cannot establish mastery or a school achievement code.

## 9. Art, music, and voice asset list

| Asset group | Minimum production set | Direction |
|---|---|---|
| Characters | Yebo, Mama, Lindi, Zanele, Sipho, Patel, Dlamini | Warm expressive poses; locally reviewed clothing and environments |
| Backgrounds | Kitchen, scrolling neighbourhood, spaza interior | Clear silhouettes and quiet areas behind text |
| Animation | Yebo walk, wave, short dance; neighbour reactions | Brief loops with still alternatives |
| Groceries | Bread, milk, apples, bananas, tea, soap, juice, crisps, fruit snack | Original readable packaging; words and pictures |
| Money | R1/R2/R5 coins; R10/R20/R50 notes; 50c coin | Clear denomination labels; educational representations distinguish coins/notes |
| Teaching/UI | Counters, number lines, grouping frames, basket, map, seven stickers | One consistent visual language |
| Audio | One quiet looping music bed, tap, soft chime, sticker sparkle, light footsteps | Licensed/original locally informed music; never obscure speech |
| Narration | All dialogue, instructions, numbers, hints, item names, and outcomes | Friendly South African voices, patient pace, selectable language |

Voice priorities include “Let’s count together”, “What stays in the wallet?”, “One group at a time”, “How could we check?”, “That strategy helped”, and “Your adventure is saved.” Compose money phrases naturally; record enough number/currency combinations to cover generated tasks. Test assembled speech for clarity. The full story script and all UI strings must share translation keys.

Use generic products for the first build. Familiar brands such as Oros, Simba, or Cadbury are optional localisation references, not required purchases or endorsements. Final money artwork should be checked against official currency references and applicable reproduction guidance before distribution. Test denomination recognition with learners using supervised real or classroom play money as well as the screen art.

## 10. Deployment and session guide

### Two-minute facilitator introduction

**0:00–0:30:** “Today we’re helping Yebo shop. You can take your time, and asking for help is part of learning.”

**0:30–1:00:** Demonstrate selecting one play coin and Undo, without completing the first assessed wallet. Show Read aloud, Help, and Pause.

**1:00–1:30:** “First think, then show, then check. If you work with a partner, swap Counter and Checker at each neighbour.”

**1:30–2:00:** Select the learner alias and language; check sound and comfort; start the adventure. Keep counters or play money nearby.

During play, observe one strategy rather than correcting every action. At the end, ask for an explanation, read the recommended next step, and plan a short hands-on follow-up. A full facilitated block is approximately 2 minutes introduction + 12–18 minutes game + 2 minutes discussion; the game itself remains within the requested target.

### Independent use

Start with Play, Resume, and Read aloud. A guided opening teaches each control through doing. No login, purchases, external links, or reading-heavy menu blocks entry. A learner can pause, replay instructions, use every support, and finish a modelled route without needing an adult to unlock progress.

### Technical delivery proposal

Build the 2D game in the installed Godot engine using its compatibility renderer, then validate native desktop/Android and browser exports on actual school devices before choosing the release packages. Desktop/Android packages bundle content for offline launch. An optional browser version needs an explicit offline cache strategy and a successful first download; offline browser support is a tested feature, not assumed from an export.

Provisional budgets: core download below 30 MB excluding optional language packs; steady 30 fps on the agreed low-end pilot device; usable layout from 800 × 600 upward; no compulsory network request after offline installation. These are acceptance targets to measure, not verified performance claims. Use compressed sprites, modest textures, short animation loops, and compressed audio. Keep strings and scenario data outside scene logic.

Store money in integer cents. Freeze the selected scenario during play. Generate a new scenario only at replay or a safe transition, validate that essentials can be purchased with the wallet, and ensure every payment/change path balances. The optional not-enough task is a separate decision, never a broken essential shopping trip.

Provide a paper fallback using the same list, play coins, three neighbour cards, and a facilitator tally sheet. Record paper activity as facilitator-entered, keeping it separate from software telemetry.

### Pilot and release checks

1. Foundation Phase teacher checks maths, language demand, curriculum mapping, and every worked answer.
2. YeBoneers rehearse the two-minute introduction and interpret sample reports without extra explanation.
3. Learners with differing literacy and numeracy needs try the game; observe navigation, comprehension, help use, and whether stars feel encouraging.
4. Check wallet conservation for every payment, change, and optional purchase; both example scenarios must balance exactly.
5. Verify that two incorrect submissions reveal scaffolding, models are labelled in reports, and accessibility audio never reduces independence.
6. Test touch, keyboard, high contrast, zoom, reduced motion, all narration, interruptions, shared-device learner switching, and offline restart on target hardware.
7. Compare fresh unaided money tasks before and after repeated sessions, alongside facilitator observations. Report sample size and limitations; completion and engagement alone do not prove learning gains.

## Source notes

Sources checked 18 October 2026. Programme facts and curriculum scope are drawn from the official references below; scripts, mechanics, metrics, and thresholds are original design proposals.

- [YearBeyond Catch-Up Programme](https://www.yearbeyond.org/catch-up): target learners, YeBoneer role, age eligibility, activity/attendance tracking, academic and non-academic aims.
- [YearBeyond programme overview](https://www.yearbeyond.org/overview): education and community-service context.
- [YearBeyond dual-beneficiary description](https://www.yearbeyond.org/news/premier-calls-on-business-leaders-to-back-youth-futures-at-yearbeyond-ceo-dialogue): youth service, experience, and skills development.
- [DBE CAPS Mathematics Grades 1–3](https://www.education.gov.za/Portals/0/CD/National%20Curriculum%20Statements%20and%20Vocational/CAPS%20MATHS%20%20ENGLISH%20GR%201-3%20FS.pdf): topic 1.11 Money and Grade 3 progression; printed pp. 75–76, PDF pp. 80–81. The design’s narrowed range and support routes are recovery choices.

