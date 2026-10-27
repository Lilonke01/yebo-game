import {learningPicture} from './learning-pictures.mjs';
const reading={
 word:['Find a word','🐈 → cat','Look at the picture: a cat.','Read the letters from left to right: c · a · t.','Match the whole word to the picture: cat.'],
 buildword:['Build a word','☀️ s + u + n = sun','Look at s, the missing letter, and n.','Put u in the middle: s · u · n.','Read the whole word: sun.'],
 question:['Find clues in a story','“Lebo wears a hat. It is sunny.”','Read: Lebo wears a hat. It is sunny.','Ask: Why does Lebo wear a hat?','Find the clue: it is sunny. The hat helps protect Lebo from the sun.'],
 sequence:['Put events in order','🌰 → 🌱 → 🌻','First: plant a seed.','Next: water the seed.','Last: a flower grows. Follow what happens in time.'],
 sentence:['Build a sentence','Lebo sees a cat.','Start with who: Lebo. Use a capital letter.','Add the action: sees. Then add what: a cat.','Read: Lebo sees a cat. Finish with a full stop.']
};
const math={en:['Watch how · a different example','Count: R2 + R1 = R3','Touch each amount once: two rand, then one rand.','Add: 2 + 1 = 3. Three rand altogether.','If you pay R5 for something costing R3, count up: 3 → 4 → 5. Your change is R2.'],af:['Kyk hoe · ’n ander voorbeeld','Tel: R2 + R1 = R3','Raak elke bedrag een keer aan: twee rand, dan een rand.','Tel op: 2 + 1 = 3. Altesaam drie rand.','Betaal R5 vir iets wat R3 kos. Tel op: 3 → 4 → 5. Jou kleingeld is R2.'],zu:['Buka ukuthi kwenziwa kanjani · esinye isibonelo','Bala: R2 + R1 = R3','Thinta inani ngalinye kanye: amarandi amabili, bese kuba irandi elilodwa.','Hlanganisa: 2 + 1 = 3. Amarandi amathathu esewonke.','Khokha u-R5 ngento ebiza u-R3. Bala uye phezulu: 3 → 4 → 5. Ushintshi wakho ngu-R2.']};
const specialMath={
 j1:{en:['Take away','R9 − R4 = R5','Start with nine rand.','Take away four: 9 → 8 → 7 → 6 → 5.','Five rand is left. Check: 5 + 4 = 9.'],af:['Trek af','R9 − R4 = R5','Begin met nege rand.','Neem vier weg: 9 → 8 → 7 → 6 → 5.','Vyf rand bly oor. Kontroleer: 5 + 4 = 9.'],zu:['Susa','R9 − R4 = R5','Qala ngamarandi ayisishiyagalolunye.','Susa okune: 9 → 8 → 7 → 6 → 5.','Kusele amarandi amahlanu. Hlola: 5 + 4 = 9.']},
 j2:{en:['Equal groups','🍎🍎 + 🍎🍎 = 4','Make two groups. Put two apples in each group.','Count each group: 2, then 4.','Two groups of two make four: 2 × 2 = 4.'],af:['Gelyke groepe','🍎🍎 + 🍎🍎 = 4','Maak twee groepe met twee appels in elke groep.','Tel elke groep: 2, dan 4.','Twee groepe van twee maak vier: 2 × 2 = 4.'],zu:['Amaqembu alinganayo','🍎🍎 + 🍎🍎 = 4','Yenza amaqembu amabili. Faka ama-apula amabili eqenjini ngalinye.','Bala iqembu ngalinye: 2, bese kuba 4.','Amaqembu amabili anamabili enza okune: 2 × 2 = 4.']}
};
export function showcaseFor(subject,stage,lang='en'){return subject==='numeracy'?(specialMath[stage]?.[lang]||math[lang]||math.en):reading[stage.startsWith('word')?'word':stage.startsWith('q')?'question':stage]||reading.word;}
const simpleQuestions={
 q0:['Who?','⚽ Sam has a ball.','Look at Sam and the ball.','Who has the ball?','Sam has the ball. The answer is Sam.'],
 q1:['Where?','🐈 The cat is on the mat.','Look at the cat on the mat.','Where is the cat?','The cat is on the mat. The answer is on the mat.'],
 q2:['Why?','🌧️ ☂️ It is raining. Sam opens an umbrella.','Look at the rain and the umbrella.','Why does Sam open an umbrella?','The umbrella keeps Sam dry.'],
 q3:['Think about kindness','🧒 🧸 👧 Sam shares his toy.','Sam lets his friend play with his toy.','Is Sam being kind?','Yes. Sharing his toy is kind.']
};
export function addShowcase({root,subject,stage,lang='en',speak,refresh,onComplete=()=>{}}){
 if(!root||stage==='read'||stage==='finish')return;
 const example=subject==='literacy'&&simpleQuestions[stage]?simpleQuestions[stage]:showcaseFor(subject,stage,lang);
 const labels=lang==='af'?['Kyk eers hoe','Volgende stap →','Nou probeer ek →','Kyk weer','◖)) Luister']:lang==='zu'?['Qala ngokubuka','Isinyathelo esilandelayo →','Manje ngizozama →','Buka futhi','◖)) Lalela']:['Watch first','Next step →','Now I’ll try →','Watch the example again','◖)) Hear this step'];
 const practice=document.createElement('div');while(root.firstChild)practice.append(root.firstChild);practice.hidden=true;root.append(practice);
 const card=document.createElement('section');card.className='showcase simple-showcase';root.prepend(card);let step=-1;
 function draw(){const en=lang==='en',line=step<0?(en?'Let’s try a little example together.':example[2]):example[step+2];card.innerHTML=`<span class="eyebrow">${en?'A LITTLE EXAMPLE':labels[0]}</span><h2>${example[0]}</h2>${subject==='literacy'?learningPicture(stage.startsWith('word')?'word':stage):''}<div class="showcase-example">${example[1]}</div><p class="showcase-one-step" aria-live="polite">${step===2?'✓ ':''}${line}</p><div class="action-row"><button class="showcase-listen">${en?'🔊 Listen':labels[4]}</button><button class="primary showcase-next">${step<0?(en?'▶ Show me how':labels[0]):step===2?(en?'My turn →':labels[2]):(en?'Next →':labels[1])}</button></div>`;card.querySelector('.showcase-listen').onclick=()=>speak([step<0?example[1]:line]);card.querySelector('.showcase-next').onclick=()=>{if(step<2){step++;draw();speak([example[step+2]]);}else{onComplete();refresh();}};}draw();
}

export function showcaseVoiceTexts(){const packs={en:[...Object.values(reading),...Object.values(simpleQuestions),math.en,...Object.values(specialMath).map(x=>x.en)],af:[math.af,...Object.values(specialMath).map(x=>x.af)],zu:[math.zu,...Object.values(specialMath).map(x=>x.zu)]};return Object.fromEntries(Object.entries(packs).map(([lang,examples])=>[lang,[...new Set(examples.flatMap(x=>x.slice(1)))]]));}
