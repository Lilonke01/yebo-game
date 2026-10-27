import asyncio,json,wave,random,math,struct
from pathlib import Path
import edge_tts
root=Path(__file__).resolve().parent
lines={'en':['Give them a hand','Another one','Just like that','Iyho iyho','Yebo magic','Yebo','Yeyeyeye Yebo'],'af':['Gee hom ’n hand','Nog een','Net so','Ooeh ja Ooeh ja'],'zu':['Mnikeni, banikeni zandla','Ezinye futhi','Kanjalo','Ewe Ewe']}
async def main():
 for lang,texts in lines.items():
  for i,text in enumerate(texts):
   file=root/'audio'/f'sing-{lang}-{i}.mp3'
   if not file.exists():
    await edge_tts.Communicate(text,{'en':'en-US-AnaNeural','af':'af-ZA-AdriNeural','zu':'zu-ZA-ThandoNeural'}[lang],rate='-12%',pitch='+8Hz').save(str(file))
   print(file.name,flush=True)
asyncio.run(main())

