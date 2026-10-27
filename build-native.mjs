import fs from 'node:fs/promises';
import path from 'node:path';
const source='mobile-site/dist',dest='native-app/www';
await fs.cp(source,dest,{recursive:true});
// iOS's local asset handler recognises .js as JavaScript, but not .mjs.
// Keep the web source unchanged and normalise only the native bundle.
for (const name of await fs.readdir(dest)) {
  if (!/\.(?:mjs|js)$/.test(name)) continue;
  const code=(await fs.readFile(path.join(dest,name),'utf8')).replace(/\.mjs(?=['"`])/g,'.js');
  await fs.writeFile(path.join(dest,name.replace(/\.mjs$/,'.js')),code);
}
// Native apps bundle all pictures and all three voice languages at install time.
// A service worker and browser-install prompts are unnecessary inside the app.
await fs.writeFile(path.join(dest,'pwa.js'),`const root=document.querySelector('#phone-tools');if(root)root.innerHTML='<details class="phone-panel"><summary>About this app</summary><p>Yebo is installed on this phone. All pictures and English, Afrikaans and isiZulu voices are included. You can play without internet.</p><p>Your progress stays on this phone.</p></details>';`);
console.log('Bundled standalone game with all pictures and voices.');
