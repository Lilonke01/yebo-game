# Yebo’s Shopping Adventure

A first playable, locally hosted browser game based on [the game design document](YEBO_GAME_DESIGN.md). No package installation, paid service, external artwork download, or internet connection is needed to play the core game.

## Play

Open PowerShell in this folder and run `./Start-Yebo.ps1`, or run `node server.mjs` and open http://127.0.0.1:4173. Node.js is available on this computer through the Codex runtime. If PowerShell blocks local scripts, use the Node command rather than changing your security settings.

The server listens only on this computer. Keep it running while playing. This is not yet an installed tablet app or a publicly hosted website. Opening index.html directly is not supported because the game uses JavaScript modules.

## In this version

- Illustrated home and neighbourhood scenes with Yebo and Lindi.
- Coin recognition and a tap-to-count wallet.
- Three community maths encounters: addition, subtraction, and equal groups.
- Shopping list selection, totals, enough/not enough, chosen payment, exact change, and an optional extra.
- Two whole-rand grocery lists that alternate on replay, plus a rand-and-cents route.
- Gentle feedback, hints, number-line steps, full models after support or two errors, and an easier next community problem after a full model.
- Local resume, celebration stickers, reading view, bundled story and calculation narration, and a facilitator snapshot with CSV export.
- No learner names or external analytics. Saved progress belongs to this browser on this device. The Grown-up view can clear it.

## Current limits

This is a prototype, not the full production design. Voice now includes 279 locally generated English recordings for scenarios and calculation steps, including item prices and all supported change payments. These bundled WAV clips work offline with the local server; browser speech is only a fallback. Music, richer animations, independent transfer probes, per-learner profiles, and validated adaptive progression remain future work. Afrikaans and isiXhosa are available in version 0.3, as described below. Session length is a design target and has not been measured with learners. Stars and report recommendations are provisional, not formal assessments. Money art is a simplified labelled teaching representation. No YearBeyond endorsement is implied.

The first independent-success score uses the first submitted answer for each maths task. Hints and modelled answers reduce independence evidence; optional read aloud does not. Basket and payment selection are practice actions rather than scored maths tasks. The report shows the current session; at most 30 previous session summaries are retained locally.

## Check and edit

Run `node --test core.test.mjs` for payment-conservation, exact-cents, basket-selection, and reporting checks. The app has no third-party JavaScript dependencies.

- `core.mjs`: scenario data, money operations, and reporting rules.
- `app.js`: story, interaction, rendering, and saving.
- `style.css`: responsive layout and accessible display options.
- `server.mjs`: small local static server.

Reload the browser after editing a file.

## Calculation steps and voice (v0.2)

At each challenge, choose **Hear the story** for the scenario, **Show the calculation steps** for numbered worked explanations, or **Explain it to me** to listen as the relevant step is highlighted. Each step has its own replay button; **Stop voice** stops playback. **Auto story voice** reads each new scenario and explains a correct answer automatically. Correct answers also reveal the worked steps for checking.

Opening a worked solution before submitting an answer counts as supported practice. Hearing the scenario by itself does not reduce independence. Calculations use the actual scenario, simplified journey variant, and selected payment, including cases with zero change.

The English voice pack is generated locally using the installed Microsoft Hazel Windows voice. No learner data or text is sent to an external speech service. Rebuild scripts with `node build-voice.mjs` and record missing clips with `./Record-Voice.ps1`. The WAV pack is approximately 107 MB; compressed downloadable voice packs remain a future improvement.

Run `node --test core.test.mjs lessons.test.mjs` for maths, explanation, and bundled-audio coverage checks.

## Languages and a warmer voice (v0.3)

Use the **Language / Taal / Ulwimi** selector for English, Afrikaans, or isiXhosa. The choice is saved separately from the adventure, so switching language preserves progress and the answer being typed. Learner instructions, stories, item names, questions, feedback, worked steps, and the facilitator snapshot have local-language text.

English narration now uses brighter SSML pitch and a clear, less drawn-out pace. isiXhosa and Afrikaans use dedicated local speech models, encouraging scripts, a slight pitch lift, and compressed Ogg recordings. No translated text is spoken with an English-only voice. If a bundled clip cannot play, a matching device voice is used only if one exists; otherwise the game shows a clear message and keeps the written explanation available.

The recordings play offline once prepared. Rebuild translated clip scripts with `node build-local-voice.mjs`; generate them using `.voice-env/Scripts/python.exe record_local_voice.py`. Python/model files are preparation tools, not runtime requirements for learners.

See `VOICE_CREDITS.md` for voice-model attribution and translation-review status. Afrikaans and isiXhosa content still needs review by first-language Foundation Phase educators before classroom deployment.

Run all checks with `node --test core.test.mjs lessons.test.mjs languages.test.mjs`.


## Numeracy + English Literacy (v0.4)

The **Numeracy** and **Literacy** buttons select two separate adventures. Numeracy now offers **English, Afrikaans, and isiZulu**; isiZulu replaces the earlier isiXhosa option. A saved isiXhosa preference migrates to isiZulu. Literacy is always in English, with the language selector disabled and clearly labelled. Changing sides preserves each side's progress.

Literacy includes picture-to-word recognition, a missing-letter task, two six-sentence stories, sentence-by-sentence and whole-story narration, literal/reason/inference comprehension questions, event sequencing, and a modelled sentence-building task. Hints appear after two unsuccessful attempts and are also available on demand. Listening and rereading do not lower independence evidence. A separate facilitator view exports literacy progress to CSV.

Voice pace defaults to **Slow & gentle (0.8)**. **Extra slow (0.65)** and **Regular (1.0)** are also available, and the choice is saved. Pitch is preserved while slowing playback. The current Afrikaans and isiZulu voices are cached MP3 neural speech; English uses cached WAV narration. See `VOICE_CREDITS.md` for current provenance, which supersedes the older experimental voice notes above.

To prepare current language recordings: `node build-local-voice.mjs`, then `.voice-env/Scripts/python.exe record_neural_voice.py`. This preparation uses an external speech service for public game scripts, without learner information. Prepared clips play locally. To prepare English plus literacy clips: `node build-voice.mjs`, then `./Record-Voice.ps1`.

Run `node --test core.test.mjs lessons.test.mjs languages.test.mjs literacy.test.mjs` for the current checks.
# Version 0.5: smiles and discoveries

Brighter cached narration in English, Afrikaans and isiZulu retains the slow and extra-slow playback options. Tap the smiling Yebo for a spoken high five. Both adventures have colourful activity cards, a discovery trail and four progress stamps, with a short celebration for each newly completed task. Help and retries do not remove stamps. Calm mode reduces movement; optional celebration sounds start switched off. Literacy remains English-only, and subject progress stays separate.

# Current numeracy adventure: R10 lollipops

Numeracy has been rebuilt as a 22-activity trip based on Yebo’s family lollipops. Start with R10, count twice, solve neighbourhood number stories, shop at R2 each, check R0 change, share, search after the spill and distribute to the family. One introductory demonstration, slow offline narration in English/Afrikaans/isiZulu, optional hints and varied claps are included. Literacy progress and activities remain separate. See `LOLLIPOP_STORY.md` for the route and the explicit gifts that keep every lollipop accounted for.

Double-click **Start Yebo** on the desktop or **Start Yebo.cmd** in this folder. The bundled runtime serves the game at http://127.0.0.1:4173 without an internet connection or Codex session.

