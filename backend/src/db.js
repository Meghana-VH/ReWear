import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const dir=path.join(path.dirname(fileURLToPath(import.meta.url)),'../data'), file=path.join(dir,'db.json');
const empty={users:[],items:[],requests:[],messages:[]};
export function read(){fs.mkdirSync(dir,{recursive:true});if(!fs.existsSync(file))fs.writeFileSync(file,JSON.stringify(empty,null,2));return {...empty,...JSON.parse(fs.readFileSync(file,'utf8'))};}
export function write(db){fs.mkdirSync(dir,{recursive:true});const tmp=file+'.tmp';fs.writeFileSync(tmp,JSON.stringify(db,null,2));fs.renameSync(tmp,file);}
