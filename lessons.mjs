import {money,totalWallet,totalCost} from './core.mjs';
export function spokenMoney(cents){const rand=Math.floor(cents/100),c=cents%100;return `${rand} rand${c?` and ${c} cents`:''}`;}
const step=(title,equation,text)=>({title,equation,text,voice:`${title}. ${text}`});
export function lessonFor(stage,s,easier=false,paid=0){
 const cost=totalCost(s),wallet=totalWallet(s),left=wallet-cost,items=s.items.filter(x=>x.needed);
 let scenario='',steps=[];
 if(stage==='recognise'){
  scenario='Mama has given Yebo money for the shopping. First, let’s recognise a two rand coin.';
  steps=[step('Look at the value','R1 · R2 · R5','Coins have different values. Read the number on each coin, rather than counting every coin as one rand.'),step('Find two rand','R2 = R1 + R1','The coin marked R2 is worth two rand. It has the same value as two one rand coins.')];
 }else if(stage==='count'){
  scenario=`Mama gives Yebo ${s.wallet.map(spokenMoney).join(', ')}. Let’s count the money in small steps so he knows his shopping budget.`;
  let running=0;steps=s.wallet.map((v,i)=>{const before=running;running+=v;return step(`Count piece ${i+1}`,i?`${money(before)} + ${money(v)} = ${money(running)}`:`Start with ${money(v)}`,i?`We have ${spokenMoney(before)}. Add the next ${spokenMoney(v)}. Now we have ${spokenMoney(running)}.`:`Start with the first note. It is worth ${spokenMoney(v)}.`);});
  steps.push(step('Check the whole wallet',`Total = ${money(wallet)}`,`We counted every piece once. Mama gave Yebo ${spokenMoney(wallet)} altogether.`));
 }else if(stage==='j0'){
  const a=easier?6:8,b=easier?5:7,toTen=10-a,rest=b-toTen;
  scenario=`Aunty Zanele bought seeds for ${a} rand and a pot for ${b} rand. She wants to know how much she spent altogether. Altogether tells us to add the two prices.`;
  steps=[step('Start with the seeds',`R${a}`,`The seeds cost ${a} rand. Start counting at ${a}.`),step('Break the next price into parts',`R${b} = R${toTen} + R${rest}`,`Split ${b} into ${toTen} and ${rest}. Adding ${toTen} first will help us reach ten.`),step('Make ten',`R${a} + R${toTen} = R10`,`${a} plus ${toTen} equals ten.`),step('Add what is left',`R10 + R${rest} = R${a+b}`,`We still need to add ${rest}. Ten plus ${rest} equals ${a+b}. Zanele spent ${a+b} rand.`)];
 }else if(stage==='j1'){
  const a=easier?10:20,b=easier?3:6,first=easier?2:5;
  scenario=`Sipho had ${a} rand and spent ${b} rand on paper for the reading club. He wants to know how much is left. Spent means we take money away.`;
  steps=[step('Start with Sipho’s money',`R${a}`,`Sipho starts with ${a} rand.`),step('Take away the first part',`R${a} − R${first} = R${a-first}`,`Break ${b} into ${first} and one. Take away ${first} first. ${a} minus ${first} equals ${a-first}.`),step('Take away one more',`R${a-first} − R1 = R${a-b}`,`Take away the last one rand. ${a-first} minus one equals ${a-b}.`),step('Check by adding back',`R${a-b} + R${b} = R${a}`,`The money left, ${a-b} rand, plus the ${b} rand spent, makes the starting ${a} rand. Our answer checks out.`)];
 }else if(stage==='j2'){
  const groups=easier?2:3,value=easier?3:4;
  scenario=`Mr Patel has ${groups} bags of oranges. Each bag costs ${value} rand. Each means the price is the same for every bag. We add ${value} once for each bag.`;
  steps=Array.from({length:groups},(_,i)=>step(`Count bag ${i+1}`,i?`R${i*value} + R${value} = R${(i+1)*value}`:`1 bag = R${value}`,i?`Add another ${value} rand for bag ${i+1}. Now the total is ${(i+1)*value} rand.`:`The first bag costs ${value} rand.`));steps.push(step('Connect the equal groups',`${groups} × R${value} = R${groups*value}`,`${groups} equal groups of ${value} make ${groups*value}. This is multiplication. All the bags cost ${groups*value} rand.`));
 }else if(stage==='select'){
  scenario=`Yebo is at Mr Dlamini’s spaza shop. Mama needs ${items.map(x=>x.name).join(', ')}. Let’s match the shopping list to the shelf.`;
  steps=items.map(x=>step(`Find ${x.name}`,`${x.icon} ${x.name} · ${money(x.price)}`,`Find ${x.name} on the shelf. The price is ${spokenMoney(x.price)}. Choose one, because Mama’s list asks for one.`));steps.push(step('Check the basket','List ↔ Basket','Check every item against the list. Put any extra item back before adding the prices.'));
 }else if(stage==='total'){
  scenario=`Yebo has chosen ${items.map(x=>`${x.name} for ${spokenMoney(x.price)}`).join(', ')}. We need the total cost, so we add all the prices.`;
  if(items.some(x=>x.price%100))steps.push(step('Join the cents','50c + 50c = 100c = R1','The bread and milk each have fifty cents in their prices. Fifty cents plus fifty cents makes one hundred cents, which is one rand. Keep that extra rand when you add the whole rands.'));
  let running=0;for(const [i,x]of items.entries()){const before=running;running+=x.price;steps.push(step(i?`Add ${x.name}`:`Start with ${x.name}`,i?`${money(before)} + ${money(x.price)} = ${money(running)}`:`${x.name} = ${money(x.price)}`,i?`Our total so far is ${spokenMoney(before)}. Add ${spokenMoney(x.price)} for ${x.name}. Now the total is ${spokenMoney(running)}.`:`Start with ${x.name}. It costs ${spokenMoney(x.price)}.`));}
  steps.push(step('The basket total',`Total = ${money(cost)}`,`We included every listed item once. The shopping costs ${spokenMoney(cost)} altogether.`));
 }else if(stage==='enough'||stage==='short'){
  const amount=stage==='short'?cost-500:wallet,enough=amount>=cost,gap=Math.abs(amount-cost);
  scenario=`The groceries cost ${spokenMoney(cost)}. ${stage==='short'?'Imagine a pretend wallet with only':'Mama’s wallet holds'} ${spokenMoney(amount)}. Can this amount pay for the groceries?`;
  steps=[step('Find the amount needed',`Shopping = ${money(cost)}`,`We need ${spokenMoney(cost)} to buy everything.`),step('Compare the two amounts',`${money(amount)} ${enough?'≥':'<'} ${money(cost)}`,`${spokenMoney(amount)} is ${enough?'at least':'less than'} ${spokenMoney(cost)}. There is ${enough?'enough money':'not enough money yet'}.`),step(enough?'Find what will remain':'Find how much more is needed',enough?`${money(amount)} − ${money(cost)} = ${money(gap)}`:`${money(amount)} + ${money(gap)} = ${money(cost)}`,enough?`After spending ${spokenMoney(cost)}, ${spokenMoney(gap)} will remain in total.`:`This pretend wallet needs ${spokenMoney(gap)} more. Mama’s real wallet does not change.`)];
 }else if(stage==='pay'){
  scenario=`Yebo needs to pay ${spokenMoney(cost)} at the till. He can choose notes and coins from Mama’s wallet. Any payment that covers the cost is fine.`;
  steps=[step('Keep the cost in view',`Cost = ${money(cost)}`,`The shopkeeper needs ${spokenMoney(cost)} for the groceries.`),step('Build a payment','Tap notes and coins → add their values','Tap one piece of money at a time. Add its value to your payment. Keep going until your payment is the same as, or greater than, the cost.'),step('Understand the extra','Payment − Cost = Change','If you hand over more than the cost, the shopkeeper returns the extra as change. Money you did not hand over stays in the wallet.')];
 }else if(stage==='change'){
  const change=paid-cost,untouched=wallet-paid;
  scenario=`Yebo handed over ${spokenMoney(paid)}. The groceries cost ${spokenMoney(cost)}. Let’s find the change by counting up from the cost to the payment.`;
  const target=Math.min(paid,Math.ceil(cost/1000)*1000);let running=cost;
  steps=[step('Start at the cost',`Start = ${money(cost)}`,`Start at ${spokenMoney(cost)}, because this amount belongs to the shopkeeper.`)];
  if(target>running){steps.push(step('Count to the next ten',`${money(running)} + ${money(target-running)} = ${money(target)}`,`Add ${spokenMoney(target-running)} to reach ${spokenMoney(target)}.`));running=target;}
  if(paid>running)steps.push(step('Reach the payment',`${money(running)} + ${money(paid-running)} = ${money(paid)}`,`Add another ${spokenMoney(paid-running)} to reach the payment of ${spokenMoney(paid)}.`));
  steps.push(step('The change',`${money(paid)} − ${money(cost)} = ${money(change)}`,change?`The steps we added total ${spokenMoney(change)}. That is the change the shopkeeper returns.`:'The payment exactly matches the cost. There is zero rand change.'));
  steps.push(step('Check the sum',`${money(cost)} + ${money(change)} = ${money(paid)}`,`The cost, ${spokenMoney(cost)}, plus the change, ${spokenMoney(change)}, equals the payment, ${spokenMoney(paid)}.`));
  steps.push(step('Check all the money left',`${money(untouched)} + ${money(change)} = ${money(left)}`,`There is also ${spokenMoney(untouched)} that we never handed over. Add the change of ${spokenMoney(change)}. Yebo has ${spokenMoney(left)} left in all.`));
 }else if(stage==='treat'){
  const enough=left>=s.treat.price,diff=Math.abs(left-s.treat.price);
  scenario=`Mama said Yebo may choose a small extra or save the change. He has ${spokenMoney(left)} left. ${s.treat.name} costs ${spokenMoney(s.treat.price)}. Let’s see whether he has enough.`;
  steps=[step('Compare what is left with the price',`${money(left)} ${enough?'≥':'<'} ${money(s.treat.price)}`,`${spokenMoney(left)} is ${enough?'at least':'less than'} ${spokenMoney(s.treat.price)}. ${enough?'The extra is affordable.':'There is not enough for this extra.'}`),step(enough?'Find the balance after the extra':'Find the shortfall',enough?`${money(left)} − ${money(s.treat.price)} = ${money(diff)}`:`${money(left)} + ${money(diff)} = ${money(s.treat.price)}`,enough?`If Yebo buys it, ${spokenMoney(diff)} stays in his wallet. He can also save all ${spokenMoney(left)}. Both choices are good.`:`Yebo would need ${spokenMoney(diff)} more. He can save his ${spokenMoney(left)} and bring it home.`)];
 }
 return {scenario,steps};
}
