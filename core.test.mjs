import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scenarios,totalWallet,totalCost,parseMoney,money,paymentResult,basketMatches,recordAttempt,summary} from './core.mjs';
test('all possible valid payments conserve Mama’s money',()=>{
  for(const s of scenarios){for(let mask=0;mask<2**s.wallet.length;mask++){
    const indexes=s.wallet.map((_,i)=>i).filter(i=>mask&(1<<i));
    const paid=indexes.reduce((a,i)=>a+s.wallet[i],0);const r=paymentResult(s,indexes);
    if(paid<totalCost(s)){assert.equal(r,null);continue;}
    assert.equal(r.change+r.untouched,totalWallet(s)-totalCost(s));
    assert.equal(r.paid-r.change,totalCost(s));assert.ok(r.change>=0);
  }}
});
test('worked scenarios and exact cents',()=>{
  assert.equal(totalWallet(scenarios[0]),5000);assert.equal(totalCost(scenarios[0]),3500);
  assert.equal(paymentResult(scenarios[0],[0,1]).change,500);
  assert.equal(totalCost(scenarios[1]),4800);assert.equal(paymentResult(scenarios[1],[0]).change,200);
  assert.equal(totalWallet(scenarios[1])-totalCost(scenarios[1]),1200);
  assert.equal(parseMoney('R16,50'),1650);assert.equal(parseMoney('16.50'),1650);
  for(const invalid of ['','-1','4.567','hello','1,2,3'])assert.equal(parseMoney(invalid),null);
  assert.equal(money(1650),'R16,50');assert.equal(money(500),'R5');
});
test('basket requires exact list and payments reject invalid indexes',()=>{
  const s=scenarios[0];assert.equal(basketMatches(s,['bread','milk','apples']),true);
  assert.equal(basketMatches(s,['bread','milk']),false);
  assert.equal(basketMatches(s,['bread','milk','apples','soap']),false);
  assert.equal(paymentResult(s,[-1]),null);assert.equal(paymentResult(s,[10]),null);
  assert.equal(paymentResult(s,[0,0]),null);
});
test('reports distinguish retries, hints and models from independent first answers',()=>{
  const r={};assert.equal(summary(r).accuracy,null);
  recordAttempt(r,'a','Count',false);recordAttempt(r,'a','Count',true,1);
  recordAttempt(r,'b','Change',true,2,true);recordAttempt(r,'c','Add',true);
  assert.deepEqual(summary(r),{attempted:3,independent:1,accuracy:33,hints:3,models:1,solved:3});
  assert.equal(r.a.attempts,2);assert.equal(r.b.firstIndependent,false);
});
