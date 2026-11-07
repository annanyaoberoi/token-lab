import {build} from 'esbuild';
import {copyFile} from 'node:fs/promises';
await build({entryPoints:['entry.tsx'],bundle:true,outfile:'website/app.js',format:'iife',platform:'browser',target:'es2020',jsx:'automatic',minify:true,legalComments:'external',define:{'process.env.NODE_ENV':'"production"'}});
await copyFile('app/globals.css','website/styles.css');
console.log('Built website/index.html — open it in a browser.');
