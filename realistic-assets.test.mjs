import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {realisticPropNames} from './realistic-props.mjs';
test('every realistic game prop is bundled as a complete PNG for offline play',()=>{for(const name of realisticPropNames){const png=fs.readFileSync(new URL('./assets3d/'+name+'.png',import.meta.url));assert.ok(png.length>1000,name);assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a',name);assert.ok(png.readUInt32BE(16)>100&&png.readUInt32BE(20)>100,name);}});
