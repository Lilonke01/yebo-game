import {cartoonCharacter} from './cartoon-character.mjs';
import {prop} from './realistic-props.mjs';
const person=(x,y,shirt='#f5ba42',adult=false)=>cartoonCharacter({x,y,adult,girl:shirt==='#e48e92',scale:adult?.98:.82});
const bag=(x,y)=>prop('bag',x-5,y-18,49,60);
const tree=prop('tree',224,15,137,169);
const pot=(leaf=false)=>prop(leaf?'pot-leaf':'pot',239,110,76,88);
export const pictureDescriptions=[
 ['Yebo and Mama walk towards a neighbourhood shop.','A small blue bag lies beneath a leafy tree as Yebo notices it.','A girl looks worried and searches for her missing bag.','Yebo hands the blue bag back to the girl.','The smiling girl holds her blue bag and thanks Yebo.','Yebo smiles after helping the girl.'],
 ['Lindi gives Yebo a tiny seed.','Yebo plants a seed in a pot of brown soil.','Yebo waters the pot in the sunshine.','Yebo cares for the pot each day, shown by three day markers.','A little green leaf has sprouted from the pot.','Yebo smiles beside his growing green plant.']
];
export function storyPicture(story,index){if(!pictureDescriptions[story]?.[index])throw new RangeError('Unknown story picture');let scene='';
if(story===0){if(index===0)scene=prop('shop',232,49,128,127)+person(78,95)+person(160,79,'#a394cf',true);
else if(index===1)scene=tree+bag(257,153)+person(114,105);
else if(index===2)scene=tree+person(120,105,'#e48e92')+'<text x="163" y="85" font-size="38" fill="#72558b">?</text>';
else if(index===3)scene=person(112,105)+person(254,105,'#e48e92')+bag(165,137)+'<path d="M158 125h54l-9-8m9 8-9 8" stroke="#5b856b" stroke-width="4" fill="none"/>';
else if(index===4)scene=person(122,105)+person(250,105,'#e48e92')+bag(267,145)+'<rect x="184" y="25" width="145" height="35" rx="15" fill="white"/><text x="256" y="48" text-anchor="middle" font-size="16" fill="#385644">Thank you!</text>';
else scene=person(180,100)+'<text x="239" y="84" font-size="35" fill="#dc8882">♥</text>';
}else{if(index===0)scene=person(92,85,'#7da8a1',true)+person(245,105)+prop('seed',153,109,33,24)+'<path d="M145 105h55" stroke="#557b5e" stroke-width="3"/><text x="172" y="95" text-anchor="middle" font-size="15" fill="#385644">seed</text>';
else if(index===1)scene=person(135,105)+pot()+prop('seed',204,126,25,18);
else if(index===2)scene=person(110,105)+pot()+prop('watering-can',156,100,70,63)+'<path d="M223 134l14 17m-7-23 16 17m-1-9 10 12" stroke="#5b9dce" stroke-width="3" stroke-dasharray="3 4"/>';
else if(index===3)scene=person(127,105)+pot()+'<g fill="#fff6d1" stroke="#d5bb6d"><rect x="35" y="24" width="43" height="30" rx="6"/><rect x="88" y="24" width="43" height="30" rx="6"/><rect x="141" y="24" width="43" height="30" rx="6"/></g><text x="56" y="45" text-anchor="middle" font-size="17">1</text><text x="109" y="45" text-anchor="middle" font-size="17">2</text><text x="162" y="45" text-anchor="middle" font-size="17">3</text>';
else if(index===4)scene=pot(true)+person(119,105);
else scene=person(126,105)+pot(true)+'<text x="197" y="89" font-size="30" fill="#d98282">♥</text>';
}
return `<svg class="story-picture" viewBox="0 0 380 230" role="img" aria-label="${pictureDescriptions[story][index]}"><image href="scene-3d.png" width="380" height="230" preserveAspectRatio="xMidYMid slice"/>${scene}</svg>`;}
