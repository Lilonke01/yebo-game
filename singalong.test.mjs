import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {songSteps} from './singalong.mjs';
test('claps follow the three hand cues and only the marked Magic line',()=>{for(const lang of ['en','af','zu'])assert.deepEqual(songSteps(lang).filter(s=>s.clap).map(s=>s.line),[0,1,2]);assert.deepEqual(songSteps('magic').filter(s=>s.clap).map(s=>s.line),[0]);});
test('every song line and the handclap have bundled playable audio',()=>{for(const key of ['en','af','zu','magic'])for(const step of songSteps(key)){const file=step.clap?'sing-clap.wav':step.file;const data=fs.readFileSync(new URL('./audio/'+file,import.meta.url));assert.ok(data.length>1000,file);assert.ok(step.clap?data.toString('ascii',0,4)==='RIFF':data.toString('ascii',0,3)==='ID3'||data[0]===255,file);}});
