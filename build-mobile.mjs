import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {cheerfulVoiceFiles} from './voice-cheerful.mjs';
const root=path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
const here=process.cwd();
const modules=new Set();
async function visit(file){if(modules.has(file))return;modules.add(file);const source=await fs.readFile(file,'utf8');const dependencies=[...source.matchAll(/(?:import|export)[^;]*?from\s*['"](\.\/[^'"]+)['"]/g)].map(m=>path.posix.normalize(path.posix.join(path.posix.dirname(file),m[1])));for(const dependency of dependencies)await visit(dependency);}
await visit('app.js');await visit('pwa.js');
const styles=['style.css','fun.css','simple.css','polish.css'];
const icons=['icons/yebo-192.png','icons/yebo-512.png','icons/yebo-maskable-512.png','icons/apple-touch-icon.png'];
const core=['index.html','manifest.webmanifest','offline-manifest.json',...modules,...styles,...icons,'yearbeyond-logo.jpeg'];
const pictures=['yebo-3d.png','adult-3d.png','girl-3d.png','scene-3d.png','tomatoes-three.png','tomatoes-four.png',...(await fs.readdir('assets3d')).filter(f=>f.endsWith('.png')).map(f=>'assets3d/'+f)];
const voices={};for(const lang of ['en','af','zu']){voices[lang]=[...new Set(Object.values(cheerfulVoiceFiles[lang]).map(f=>'audio/'+f))];for(let n=0;n<7;n++){const file=`audio/sing-${lang}-${n}.mp3`;try{await fs.access(file);voices[lang].push(file);}catch{}}voices[lang].push('audio/sing-clap.wav');}
const sizes={};for(const f of new Set([...pictures,...Object.values(voices).flat()]))sizes[f]=(await fs.stat(f)).size;
const manifest={version:1,pictures,voices,sizes};await fs.writeFile('offline-manifest.json',JSON.stringify(manifest));
const hash=createHash('sha256');for(const f of [...core,...pictures]){hash.update(f);hash.update(await fs.readFile(f));}const revision=hash.digest('hex').slice(0,12);
const template=await fs.readFile('sw-template.js','utf8');await fs.writeFile('sw.js',template.replace('__REVISION__',revision).replace('__CORE__',JSON.stringify(core)));
// Only browser game files are published. No saves, source credentials, runtime or QA screenshots.
const out=path.join(here,'mobile-site','dist');await fs.mkdir(out,{recursive:true});const files=[...new Set([...core,'sw.js',...pictures,...Object.values(voices).flat()])];for(const f of files){const dest=path.join(out,f);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.copyFile(f,dest);}
await fs.writeFile('mobile-site/package.json',JSON.stringify({name:'yebo-phone',version:'0.7.0',private:true},null,2));
await fs.writeFile('mobile-site/.gitignore','');
console.log(JSON.stringify({revision,files:files.length,megabytes:Math.ceil((await Promise.all(files.map(async f=>(await fs.stat(f)).size))).reduce((a,b)=>a+b,0)/1024/1024),directory:out}));
