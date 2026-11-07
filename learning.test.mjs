import test from 'node:test';
import assert from 'node:assert/strict';
import { getEncoding } from 'js-tiktoken';
import { bpeStep,budgetTotal,evidence,missionBudget,evaluateMission } from '../lib/learning.mjs';
for (const name of ['cl100k_base','o200k_base']) {
 const enc=getEncoding(name);
 test(name+': reference hello world IDs',()=>assert.deepEqual(enc.encode('hello world'),name==='cl100k_base'?[15339,1917]:[24912,2375]));
 test(name+': empty input has zero tokens',()=>assert.deepEqual(enc.encode(''),[]));
 test(name+': Unicode and special-looking text round trips losslessly',()=>{for(const s of ['नमस्ते, आप कैसे हैं?','Hello 👋🏽 🌍!','\t\n spaces  ','<|endoftext|>','a'.repeat(600)])assert.equal(enc.decode(enc.encode(s,[],[])),s)});
}
test('budget equality fits and overflow is detectable',()=>{assert.equal(budgetTotal(600,400,256),1416);assert.equal(budgetTotal(150,458,256),1024);assert.equal(budgetTotal(150,459,256),1025)});
test('mission starts overloaded',()=>{assert.equal(missionBudget(evidence.map(x=>x.id)),1580);assert.equal(evaluateMission(evidence.map(x=>x.id)).ok,false)});
test('missing evidence fails despite a small budget',()=>{for(const ids of [[],['policy'],['order']])assert.equal(evaluateMission(ids).ok,false)});
test('correct evidence succeeds with and without verified summary',()=>{assert.equal(missionBudget(['policy','order']),860);assert.equal(missionBudget(['policy','order'],true),760);assert.equal(evaluateMission(['policy','order']).ok,true);assert.equal(evaluateMission(['policy','order'],true).ok,true)});
test('obsolete policy rejected even when it fits',()=>{assert.equal(missionBudget(['policy','order','old'],true),1000);assert.equal(evaluateMission(['policy','order','old'],true).title,'Conflicting policies remain.')});
test('summary cannot save tokens for an omitted order',()=>assert.equal(missionBudget(['policy'],true),680));
test('all subset budgets and outcomes satisfy mission invariants',()=>{for(let mask=0;mask<32;mask++)for(const summary of [true,false]){const chosen=evidence.filter((_,i)=>(mask&(1<<i))!==0).map(x=>x.id);const outcome=evaluateMission(chosen,summary);const expected=missionBudget(chosen,summary)<=1024&&chosen.includes('policy')&&chosen.includes('order')&&!chosen.includes('old');assert.equal(outcome.ok,expected)}});
test('BPE merges preserve words and terminate',()=>{let words=['banana','banana','bandana'].map(x=>x.split(''));let iterations=0;while(true){const step=bpeStep(words);if(!step)break;assert.ok(step.words.flat().length<words.flat().length);assert.deepEqual(step.words.map(x=>x.join('')),['banana','banana','bandana']);words=step.words;if(++iterations>20)assert.fail('failed to terminate')}assert.equal(words.flat().length,3)});
