import asyncio,json,os
from pathlib import Path
from itertools import zip_longest
import edge_tts
ROOT=Path(__file__).resolve().parent
VOICES={'en':'en-US-AnaNeural','af':'af-ZA-AdriNeural','zu':'zu-ZA-ThandoNeural'}
async def main():
    clips=json.loads((ROOT/'cheerful-voice-scripts.json').read_text(encoding='utf-8'))
    pending=[c for c in clips if not (ROOT/'audio'/c['file']).exists()]
    pending=[c for pair in zip_longest(*[[c for c in pending if c['lang']==lang] for lang in VOICES]) for c in pair if c]
    semaphore=asyncio.Semaphore(6);done=0
    async def record(c):
        nonlocal done
        async with semaphore:
            destination=ROOT/'audio'/c['file'];temporary=destination.with_suffix('.part')
            for attempt in range(4):
                try:
                    await edge_tts.Communicate(c['spoken'],VOICES[c['lang']],rate='-3%',pitch='+12Hz' if c['lang']!='en' else '+2Hz').save(str(temporary))
                    if temporary.stat().st_size<1000:raise RuntimeError('Empty recording')
                    os.replace(temporary,destination);break
                except Exception:
                    if attempt==3:raise
                    await asyncio.sleep(2*(attempt+1))
            done+=1
            if done%50==0 or done==len(pending):print(f'{done}/{len(pending)} cheerful clips ready',flush=True)
    await asyncio.gather(*(record(c) for c in pending));print('Cheerful voice pack complete.',flush=True)
asyncio.run(main())
