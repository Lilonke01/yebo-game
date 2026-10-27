import {cartoonCharacter} from './cartoon-character.mjs';
import {prop} from './realistic-props.mjs';
export const lolli=(x,y)=>prop('lollipop',x-18,y-20,36,66);
export function lollipopArt(id,options={}){let content=cartoonCharacter({x:93,y:87,scale:.88,gap:true});
if(['coin','wallet','pay','change'].includes(id))content+=[5,2,2,1].map((n,i)=>prop('coin',152+i*46,87,46,46)+`<text x="${175+i*46}" y="116" fill="#514b35" text-anchor="middle" font-size="16" font-weight="700">R${n}</text>`).join('');
else if(id==='traffic')content+=Array.from({length:5},(_,i)=>prop(i<3?'car':'taxi',139+i*47,95,46,58)).join('');
else if(id==='steps')content+=[2,4,6,8].map((n,i)=>`<circle cx="${165+i*48}" cy="${125-i*10}" r="20" fill="url(#gold-3d)"/><text x="${165+i*48}" y="${132-i*10}" text-anchor="middle" font-size="22" fill="#476549">${n}</text>`).join('');
else if(id==='birds')content+='<path d="M145 98h213" stroke="#79776c" stroke-width="2"/>'+Array.from({length:4},(_,i)=>prop('bird',145+i*44,60,39,39)).join('')+prop('bird-flying',274,16,40,36)+prop('bird-flying',321,23,40,36);
else if(id==='trees')content+=Array.from({length:9},(_,i)=>prop('tree',142+(i%5)*47,37+Math.floor(i/5)*72,44,70)).join('');
else if(id==='dogs')content+=Array.from({length:5},(_,i)=>prop('dog',142+i*47,91,44,65)).join('');
else if(id==='bikes')content+=prop('bicycle',151,82,102,87)+prop('bicycle',266,82,102,87);
else if(id==='nomsa')content+='<image href="tomatoes-three.png" x="139" y="76" width="125" height="105" preserveAspectRatio="xMidYMid meet" aria-label="Three tomatoes in a wooden bowl"/><image href="tomatoes-four.png" x="265" y="76" width="125" height="105" preserveAspectRatio="xMidYMid meet" aria-label="Four tomatoes in a wooden bowl"/>';
else if(id==='robot')content+=prop('traffic-light',229,25,100,163);
else if(id==='fruit')content+=lolli(207,104)+prop('apple',269,94,64,63)+'<text x="195" y="179" font-size="19" fill="#355a45">R2</text><text x="287" y="179" font-size="19" fill="#355a45">R3</text>';
else if(['search','missing'].includes(id)){content+=prop('bench',195,84,113,88)+prop('stone',143,153,43,34)+prop('puddle',303,157,50,35)+prop('drain',357,156,36,36)+lolli(124,135)+'<g transform="rotate(70 166 170)">'+lolli(166,152)+'</g><g opacity=".55" transform="rotate(-65 326 174)">'+lolli(326,157)+'</g>';if(id==='missing'||options.benchFound)content+='<g transform="rotate(72 243 168)">'+lolli(243,154)+'</g>';}
else if(id==='plates'||id==='left')content+=Array.from({length:4},(_,i)=>prop('plate',139+i*59,121,58,39)+(id==='left'||options.served?.includes(i)?'<g transform="rotate(68 '+(166+i*59)+' 140)">'+lolli(166+i*59,119)+'</g>':'')).join('');
else content+=Array.from({length:id==='share'?6:5},(_,i)=>lolli(156+i*36,95+(i%2)*17)).join('');
return `<svg class="lollipop-scene" viewBox="0 0 400 205" role="img" aria-label="Yebo’s illustrated adventure"><defs><radialGradient id="gold-3d" cx="30%" cy="25%" r="85%"><stop stop-color="#fff2bc"/><stop offset=".5" stop-color="#e4c376"/><stop offset="1" stop-color="#a6823e"/></radialGradient></defs><image href="scene-3d.png" width="400" height="205" preserveAspectRatio="xMidYMid slice"/>${content}</svg>`;
}
