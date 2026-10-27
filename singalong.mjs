export const songs={
 en:{title:'Give them a hand',lines:['Give them a hand','Another one','Just like that','Iyho iyho']},
 zu:{title:'Mnikeni / Banikeni zandla',lines:['Mnikeni / Banikeni zandla','Ezinye futhi','Kanjalo','Ewe Ewe']},
 af:{title:'Gee hom ’n hand',lines:['Gee hom ’n hand','Nog een','Net so','Ooeh ja Ooeh ja']},
 magic:{title:'Yebo Magic',lines:['Yebo magic','Yebo','Yeyeyeye Yebo']}
};
export function songSteps(key){const song=songs[key]||songs.en;return song.lines.flatMap((text,i)=>[{text,file:`sing-${key==='magic'?'en':key}-${key==='magic'?i+4:i}.mp3`,line:i},...((key==='magic'?i===0:i<3)?[{clap:true,line:i}]:[])]);}
let run=0,current=null,wake=null,rootNode=null;
export function stopSingalong(){run++;if(current){current.pause();current.onended=null;current.onerror=null;current=null;}if(wake){clearTimeout(wake.timer);wake.resolve();wake=null;}if(rootNode){rootNode.querySelectorAll('.sing-active').forEach(x=>x.classList.remove('sing-active'));const button=rootNode.querySelector('[data-song-play]');if(button)button.disabled=false;}}
function pause(ms){return new Promise(resolve=>{wake={resolve,timer:setTimeout(()=>{wake=null;resolve();},ms)};});}
function clip(file){return new Promise((resolve,reject)=>{const audio=new Audio('./audio/'+file);current=audio;audio.onended=()=>{current=null;resolve();};audio.onerror=()=>reject(new Error('Audio unavailable'));audio.play().catch(reject);});}
export function renderSingalong(root,{stopNarration,lang='en'}){
 stopSingalong();rootNode=root;
 root.innerHTML=`<details class="singalong"><summary>🎤 Sing & clap along</summary><label>Choose a song <select data-song><option value="en">Give them a hand · English</option><option value="zu">Mnikeni / Banikeni · isiZulu</option><option value="af">Gee hom ’n hand · Afrikaans</option><option value="magic">Yebo Magic</option></select></label><p class="small-note">Listen, join in, and clap with the hands! A playful synthetic voice leads the chant.</p><div data-lyrics></div><div class="action-row"><button data-song-play class="primary">▶ Sing along</button><button data-song-stop>■ Stop song</button></div><p data-song-status role="status" aria-live="polite">Ready to sing together.</p></details>`;
 const select=root.querySelector('[data-song]'),lyrics=root.querySelector('[data-lyrics]'),status=root.querySelector('[data-song-status]'),play=root.querySelector('[data-song-play]');select.value=lang in songs?lang:'en';
 function show(){stopSingalong();lyrics.innerHTML=songSteps(select.value).filter(x=>!x.clap).map(x=>`<p data-line="${x.line}">${x.text}${(select.value==='magic'?x.line===0:x.line<3)?' <span aria-label="clap after this line">👏</span>':''}</p>`).join('');status.textContent='Ready to sing together.';}
 show();select.onchange=show;root.querySelector('[data-song-stop]').onclick=()=>{stopSingalong();status.textContent='Song stopped. Tap Sing along to start again.';};
 play.onclick=async()=>{stopNarration();const token=run;play.disabled=true;try{for(const step of songSteps(select.value)){if(token!==run)return;lyrics.querySelectorAll('p').forEach(p=>p.classList.toggle('sing-active',Number(p.dataset.line)===step.line));status.textContent=step.clap?'👏 Clap your hands!':step.text;await clip(step.clap?'sing-clap.wav':step.file);if(token!==run)return;await pause(step.clap?380:180);}if(token===run){stopSingalong();status.textContent='Well done! Sing it again whenever you like.';}}catch{if(token===run){stopSingalong();status.textContent='Sound could not play. Tap Sing along to try again.';}}};
}
