import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {scenarios,totalCost,totalWallet,paymentResult,money} from './core.mjs';
import {localizedLesson,localizedMoney,numberWords,itemName} from './localized-lessons.mjs';
import {translate,messages,greetings,languages} from './i18n.mjs';
import {localizedVoiceFiles} from './voice-local.mjs';
test('both language packs translate every registered message and product',()=>{
 for(const lang of ['af','zu']){
  for(const [key,values]of Object.entries(messages)){assert.ok(values[lang]?.trim(),key);assert.notEqual(translate(key,lang),key,key);}
  for(const s of scenarios)for(const item of s.items)assert.notEqual(itemName(item.name,lang),item.name);
  for(let n=0;n<=100;n++){assert.ok(numberWords(n,lang));assert.ok(!numberWords(n,lang).includes('undefined'));}
  assert.equal(translate('English',lang),'English');
  assert.ok(greetings[lang].intro);assert.ok(languages[lang].locale);
 }
});
test('localized steps retain correct counts and chosen-payment arithmetic',()=>{
 for(const lang of ['af','zu'])for(const s of scenarios){
  assert.equal(localizedLesson('count',s,false,0,lang).steps.at(-1).equation,`= ${money(totalWallet(s))}`);
  assert.equal(localizedLesson('total',s,false,0,lang).steps.at(-1).equation,`= ${money(totalCost(s))}`);
  for(const easy of [false,true])for(const stage of ['recognise','count','j0','j1','j2','select','total','enough','short','pay','treat']){const l=localizedLesson(stage,s,easy,0,lang);assert.ok(l.scenario);assert.ok(l.question);assert.ok(l.steps.length>=2);assert.ok(!JSON.stringify(l).includes('undefined'));}
  for(let mask=0;mask<2**s.wallet.length;mask++){const r=paymentResult(s,s.wallet.map((_,i)=>i).filter(i=>mask&(1<<i)));if(!r)continue;const l=localizedLesson('change',s,false,r.paid,lang);assert.ok(l.steps.some(x=>x.equation===`${money(r.paid)} − ${money(totalCost(s))} = ${money(r.change)}`));assert.equal(l.steps.at(-1).equation,`${money(r.untouched)} + ${money(r.change)} = ${money(r.remaining)}`);}
 }
 assert.equal(localizedMoney(200,'zu'),'amarandi amabili');
 assert.equal(numberWords(45,'zu'),'amashumi amane nanhlanu');
 assert.equal(numberWords(39,'zu'),'amashumi amathathu nesishiyagalolunye');
 assert.ok(localizedLesson('j0',scenarios[0],false,0,'zu').scenario.includes('amarandi'));
});
test('dynamic labels keep amounts, indexes and language-specific wording',()=>{
 assert.equal(translate('✓ Home','af'),'✓ Tuis');
 assert.equal(translate('COMMUNITY STOP 3','zu'),'INDAWO YOMPHAKATHI 3');
 assert.equal(translate('R20 note 2','af'),'R20 noot 2');
 assert.equal(translate('Check answer →','zu'),'Qinisekisa impendulo →');
 assert.ok(translate('Speaking 2 of 5. You can stop or replay at any time.','af').includes('2 van 5'));
});
test('every local-language scenario and step has a real compressed audio clip',async()=>{
 for(const lang of ['af','zu']){
  const texts=new Set([greetings[lang].intro,greetings[lang].outro]);
  for(const s of scenarios){for(const easy of [false,true])for(const stage of ['recognise','count','j0','j1','j2','select','total','enough','short','pay','treat']){const l=localizedLesson(stage,s,easy,0,lang);texts.add(l.scenario);l.steps.forEach(x=>texts.add(x.voice));}
  for(let mask=0;mask<2**s.wallet.length;mask++){const r=paymentResult(s,s.wallet.map((_,i)=>i).filter(i=>mask&(1<<i)));if(r){const l=localizedLesson('change',s,false,r.paid,lang);texts.add(l.scenario);l.steps.forEach(x=>texts.add(x.voice));}}}
  for(const text of texts){const file=localizedVoiceFiles[lang][text];assert.ok(file,text);const handle=await fs.open('audio/'+file);try{const buf=Buffer.alloc(4);await handle.read(buf,0,4,0);assert.ok(buf.toString('ascii',0,3)==='ID3'||buf[0]===255,'Valid MP3 header');assert.ok((await handle.stat()).size>1000);}finally{await handle.close();}}
 }
});

