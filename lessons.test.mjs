import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {scenarios,paymentResult,totalWallet,totalCost,money} from './core.mjs';
import {lessonFor,spokenMoney} from './lessons.mjs';
import {voiceFiles} from './voice-map.mjs';
test('worked examples follow standard and simplified journey numbers',()=>{
 assert.equal(lessonFor('j0',scenarios[0]).steps.at(-1).equation,'R10 + R5 = R15');
 assert.equal(lessonFor('j0',scenarios[0],true).steps.at(-1).equation,'R10 + R1 = R11');
 assert.equal(lessonFor('j1',scenarios[0]).steps.at(-1).equation,'R14 + R6 = R20');
 assert.equal(lessonFor('j2',scenarios[0],true).steps.at(-1).equation,'2 × R3 = R6');
 assert.equal(spokenMoney(50),'0 rand and 50 cents');
 assert.equal(spokenMoney(1650),'16 rand and 50 cents');
});
test('wallet and basket steps end at their exact scenario totals',()=>{
 for(const s of scenarios){assert.equal(lessonFor('count',s).steps.at(-1).equation,`Total = ${money(totalWallet(s))}`);assert.equal(lessonFor('total',s).steps.at(-1).equation,`Total = ${money(totalCost(s))}`);}
 assert.ok(lessonFor('total',scenarios[1]).steps.some(x=>x.equation==='50c + 50c = 100c = R1'));
});
test('change explanations use the chosen payment, including exact payment',()=>{
 for(const s of scenarios)for(let mask=0;mask<2**s.wallet.length;mask++){
  const r=paymentResult(s,s.wallet.map((_,i)=>i).filter(i=>mask&(1<<i)));if(!r)continue;
  const lesson=lessonFor('change',s,false,r.paid);
  assert.ok(lesson.steps.some(x=>x.equation===`${money(r.paid)} − ${money(totalCost(s))} = ${money(r.change)}`));
  assert.equal(lesson.steps.at(-1).equation,`${money(r.untouched)} + ${money(r.change)} = ${money(r.remaining)}`);
 }
});
test('every scenario and calculation step has a bundled valid WAV clip',async()=>{
 const texts=new Set();
 for(const s of scenarios){for(const stage of ['recognise','count','j0','j1','j2','select','total','enough','short','pay','treat'])for(const easy of [true,false]){const l=lessonFor(stage,s,easy);texts.add(l.scenario);l.steps.forEach(x=>texts.add(x.voice));}
 for(let mask=0;mask<2**s.wallet.length;mask++){const r=paymentResult(s,s.wallet.map((_,i)=>i).filter(i=>mask&(1<<i)));if(r){const l=lessonFor('change',s,false,r.paid);texts.add(l.scenario);l.steps.forEach(x=>texts.add(x.voice));}}}
 for(const text of texts){assert.ok(voiceFiles[text],text);const file=await fs.open('audio/'+voiceFiles[text]);try{const buf=Buffer.alloc(12);await file.read(buf,0,12,0);assert.equal(buf.toString('ascii',0,4),'RIFF');assert.equal(buf.toString('ascii',8,12),'WAVE');const st=await file.stat();assert.ok(st.size>1000);}finally{await file.close();}}
});
