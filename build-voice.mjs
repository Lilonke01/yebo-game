import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {scenarios,paymentResult} from './core.mjs';
import {lessonFor} from './lessons.mjs';
import {literacyVoiceTexts} from './literacy.mjs';
const scripts=new Map();
function add(text){if(text)scripts.set(text,createHash('sha256').update('happy-v1|'+text).digest('hex').slice(0,20)+'.wav');}
add('Hello, my friend! Welcome to Yebo’s shopping adventure! Let’s count, learn and smile together. Take your time. You can do it!');
add('Hooray! You helped Yebo bring the groceries home! Thank you for keeping on trying. We are proud of you!');
for(const text of literacyVoiceTexts())add(text);
add('Mama needs a helping hand. Join Yebo on a shopping adventure. Take your time.');
add('You helped Yebo bring the groceries home. Thank you for keeping going.');
for(const s of scenarios){
 for(const stage of ['recognise','count','j0','j1','j2','select','total','enough','short','pay','treat'])for(const easy of [false,true]){const lesson=lessonFor(stage,s,easy);add(lesson.scenario);lesson.steps.forEach(x=>add(x.voice));}
 for(let mask=0;mask<2**s.wallet.length;mask++){const result=paymentResult(s,s.wallet.map((_,i)=>i).filter(i=>mask&(1<<i)));if(result){const lesson=lessonFor('change',s,false,result.paid);add(lesson.scenario);lesson.steps.forEach(x=>add(x.voice));}}
}
await fs.mkdir('audio',{recursive:true});
await fs.writeFile('voice-scripts.json',JSON.stringify([...scripts].map(([text,file])=>({text,file})),null,2));
await fs.writeFile('voice-map.mjs','export const voiceFiles = '+JSON.stringify(Object.fromEntries(scripts),null,2)+';\n');
console.log(`${scripts.size} unique voice clips prepared.`);
