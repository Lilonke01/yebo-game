import {cartoonCharacter} from './cartoon-character.mjs';
import {prop} from './realistic-props.mjs';
const child=(x,girl=false)=>cartoonCharacter({x,y:79,scale:.78,girl});
const scenes={
q0:{alt:'Sam holds a football.',svg:child(125)+prop('football',152,102,48,48)+'<text x="125" y="184" text-anchor="middle" font-size="17" fill="#355648">Sam</text>'},
q1:{alt:'A cat sits on a purple mat.',svg:prop('cat',64,40,192,143)},
q2:{alt:'Sam stays dry under an umbrella in the rain.',svg:'<g stroke="#83bbdf" stroke-width="3"><path d="M48 24l-8 16m49-22-8 16m149-8-8 16m49 4-8 16M52 72l-8 16m195-13-8 16"/></g>'+child(150)+prop('umbrella',81,8,148,115)},
q3:{alt:'Sam shares a teddy bear with a friend.',svg:child(88)+child(223,true)+prop('teddy',129,101,54,62)},
word:{alt:'A friendly cat.',svg:prop('cat',62,35,192,147)},
bag:{alt:'A blue shopping bag with handles.',svg:prop('bag',80,25,155,158)},
shop:{alt:'A colourful neighbourhood shop.',svg:prop('shop',31,24,250,155)},
help:{alt:'Two friends helping and sharing.',svg:child(92)+child(218,true)+prop('teddy',132,108,49,56)},
buildword:{alt:'The warm sun in the sky.',svg:'<defs><radialGradient id="sun-glow"><stop stop-color="#fffdeb"/><stop offset=".55" stop-color="#ffe8a0"/><stop offset=".8" stop-color="#efc56c"/><stop offset="1" stop-color="#efc56c" stop-opacity="0"/></radialGradient></defs><circle cx="156" cy="92" r="69" fill="url(#sun-glow)"/>'},
sequence:{alt:'A seed grows into a green plant and then a flower.',svg:prop('seed',34,116,47,32)+prop('pot-leaf',118,57,76,105)+prop('pot-flower',221,30,76,134)+'<text x="92" y="140" font-size="22">→</text><text x="196" y="140" font-size="22">→</text>'}
};
scenes.sentence={alt:'A child sees a cat.',svg:child(78)+prop('cat',160,67,126,106)};
export function learningPicture(key){const scene=scenes[key];if(!scene)return '';return `<svg class="learning-picture" viewBox="0 0 312 200" role="img" aria-label="${scene.alt}"><image href="scene-3d.png" width="312" height="200" preserveAspectRatio="xMidYMid slice"/>${scene.svg}</svg>`;}
