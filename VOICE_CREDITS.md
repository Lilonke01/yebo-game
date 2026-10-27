# Voice and language notes

## Current game

- English uses Microsoft `en-US-AnaNeural` for a brighter, youthful delivery. Earlier Microsoft Hazel WAV recordings remain as a fallback pack.
- Afrikaans uses Microsoft `af-ZA-AdriNeural`.
- isiZulu uses Microsoft `zu-ZA-ThandoNeural`.

The three neural voice packs are prepared with the `edge-tts` package and saved as MP3 files. The cheerful pack uses a preparation rate of -3%, with pitch +2Hz for English and +12Hz for Afrikaans and isiZulu. During preparation, only the public game scripts are sent to the speech service. The playable game reads saved files locally and does not send learner data or progress to a speech service. Preparation needs a connection; playback of the prepared files works offline with the local server.

Voice references: [Microsoft language and voice support](https://learn.microsoft.com/azure/ai-services/speech-service/language-support) and [edge-tts project](https://github.com/rany2/edge-tts).

The default playback rate is 0.8, with pitch preserved. Extra slow uses 0.65; Regular uses 1.0. Encouraging wording and modest pitch adjustments make the delivery warmer without pretending these are recordings by child voice actors.

The Numeracy interface offers English, Afrikaans and isiZulu. The Literacy adventure is English-only. Switching subject does not replace the saved numeracy language or merge the two progress records.

Afrikaans and isiZulu text and pronunciation are prototype translations. Arrange review by first-language Foundation Phase educators before classroom use. The literacy activities are original practice materials, not a validated reading-level assessment. Synthetic narration reads whole words; an adult should model individual phoneme sounds where needed.

## Sing-alongs
The Sing & clap along panel contains the user-supplied Give them a hand verses and Yebo Magic. Locally saved synthetic speech leads a rhythmic chant; this is not a recorded child singer or a reconstruction of the original melody. English uses the youthful Ana voice; Afrikaans and isiZulu use Adri and Thando with a brighter pitch. Handclaps use a real human handclap recording: Solo Clap by OwlStorm (CC0), https://freesound.org/people/OwlStorm/sounds/151219/. Clap cues follow each of the first three hand-song lines and the explicitly marked Yebo Magic line. Voice recordings are built by record-singalong.py; build-singalong-downloads.py prepares the recorded handclap and downloadable mixes and work offline once bundled.

