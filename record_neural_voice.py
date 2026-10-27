"""Prepare public game scripts as cached MP3 narration; no learner data is sent."""
import asyncio,json,os
from itertools import zip_longest
from pathlib import Path
import edge_tts
ROOT=Path(__file__).resolve().parent
VOICES={'af':'af-ZA-AdriNeural','zu':'zu-ZA-ThandoNeural'}
async def main():
    scripts=json.loads((ROOT/'localized-voice-scripts.json').read_text(encoding='utf-8'))
    work=[x for x in scripts if not (ROOT/'audio'/x['file']).exists()]
    work=[clip for pair in zip_longest(*[[x for x in work if x['lang']==lang] for lang in ['af','zu']]) for clip in pair if clip is not None]
    semaphore=asyncio.Semaphore(4)
    done=0
    async def record(clip):
        nonlocal done
        async with semaphore:
            destination=ROOT/'audio'/clip['file']
            temporary=destination.with_suffix('.part')
            for attempt in range(4):
                try:
                    voice=edge_tts.Communicate(clip['spoken'],VOICES[clip['lang']],rate='-8%',pitch='+5Hz')
                    await voice.save(str(temporary))
                    if temporary.stat().st_size<1000: raise RuntimeError('Audio was empty')
                    os.replace(temporary,destination)
                    break
                except Exception:
                    if attempt==3:raise
                    await asyncio.sleep(2*(attempt+1))
            done+=1
            if done%20==0 or done==len(work):print(f'{done}/{len(work)} isiZulu / Afrikaans recordings ready',flush=True)
    await asyncio.gather(*(record(x) for x in work))
    print('All cached language narration is ready.',flush=True)
asyncio.run(main())
