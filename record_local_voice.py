"""Generate offline isiXhosa and Afrikaans speech with language-specific models."""
import os, json, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent
os.environ['HF_HOME']=str(ROOT/'.voice-models')
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING']='1'
os.environ['HF_HUB_DISABLE_XET']='1'
import torch
import numpy as np
import soundfile as sf
from transformers import VitsModel, AutoTokenizer, set_seed
torch.set_num_threads(4)
scripts=json.loads((ROOT/'localized-voice-scripts.json').read_text(encoding='utf-8'))
for lang,repo in [('xh','UBC-NLP/Simba-TTS-xho'),('af','UBC-NLP/Simba-TTS-afr')]:
    if len(sys.argv)>1 and lang!=sys.argv[1]: continue
    work=[x for x in scripts if x['lang']==lang and not (ROOT/'audio'/x['file']).exists()]
    if not work: continue
    print(f'Loading {repo} for {len(work)} clips',flush=True)
    tokenizer=AutoTokenizer.from_pretrained(repo,local_files_only=True)
    model=VitsModel.from_pretrained(repo,local_files_only=True).eval()
    model.speaking_rate=1.02
    for index,clip in enumerate(work):
        set_seed(42)
        inputs=tokenizer(clip['spoken'],return_tensors='pt')
        with torch.inference_mode(): audio=model(**inputs).waveform.squeeze().cpu().numpy()
        if not np.isfinite(audio).all() or len(audio)<1000: raise ValueError('Invalid speech output')
        # Small brighter pitch lift; short pauses stay intact. No voice cloning.
        sf.write(str(ROOT/'audio'/clip['file']),audio,int(model.config.sampling_rate*1.035),format='OGG',subtype='VORBIS')
        if index%10==0 or index==len(work)-1: print(f'{lang}: {index+1}/{len(work)} clips ready',flush=True)
    del model
print('All local-language clips are ready.',flush=True)
