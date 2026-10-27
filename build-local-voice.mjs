import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {scenarios,paymentResult} from './core.mjs';
import {localizedLesson,numberWords} from './localized-lessons.mjs';
import {greetings} from './i18n.mjs';
const maps={af:{},zu:{}},scripts=[];
for(const lang of ['af','zu']){
 const add=text=>{if(maps[lang][text])return;const file=createHash('sha256').update('gentle-v1|'+lang+'|'+text).digest('hex').slice(0,20)+'.mp3';maps[lang][text]=file;scripts.push({lang,text,spoken:text.replace(/\b\d+\b/g,n=>numberWords(Number(n),lang)),file});};
 add(greetings[lang].intro);add(greetings[lang].outro);
 for(const s of scenarios){for(const stage of ['recognise','count','j0','j1','j2','select','total','enough','short','pay','treat'])for(const easy of [false,true]){const lesson=localizedLesson(stage,s,easy,0,lang);add(lesson.scenario);lesson.steps.forEach(x=>add(x.voice));}
 for(let mask=0;mask<2**s.wallet.length;mask++){const r=paymentResult(s,s.wallet.map((_,i)=>i).filter(i=>mask&(1<<i)));if(r){const l=localizedLesson('change',s,false,r.paid,lang);add(l.scenario);l.steps.forEach(x=>add(x.voice));}}}
}
await fs.writeFile('localized-voice-scripts.json',JSON.stringify(scripts,null,2));
await fs.writeFile('voice-local.mjs','export const localizedVoiceFiles = '+JSON.stringify(maps,null,2)+';\n');
console.log(`${scripts.length} isiZulu / Afrikaans voice clips prepared.`);
