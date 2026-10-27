export const scenarios = [
  { name: 'Mama’s grocery list', wallet: [2000,2000,500,200,200,100], items: [
    {id:'bread',name:'Bread',price:1400,icon:'🍞',needed:true},
    {id:'milk',name:'Milk',price:1200,icon:'🥛',needed:true},
    {id:'apples',name:'Apples',price:900,icon:'🍎',needed:true},
    {id:'soap',name:'Soap',price:1000,icon:'🧼'},
    {id:'juice',name:'Juice',price:800,icon:'🧃'}], treat:{name:'A fruit snack',price:400,icon:'🍊'} },
  { name: 'A little pantry top-up', wallet:[5000,500,200,200,100],items:[
    {id:'bread',name:'Bread',price:1650,icon:'🍞',needed:true},
    {id:'milk',name:'Milk',price:1350,icon:'🥛',needed:true},
    {id:'bananas',name:'Bag of bananas',price:1000,icon:'🍌',needed:true},
    {id:'tea',name:'Tea',price:800,icon:'🫖',needed:true},
    {id:'crisps',name:'Crisps',price:700,icon:'🥔'},
    {id:'soap',name:'Soap',price:900,icon:'🧼'}],treat:{name:'A small juice',price:1250,icon:'🧃'} }
  ,{name:'Something for supper',wallet:[2000,1000,500,200,200,100],items:[
    {id:'rice',name:'Rice',price:1100,icon:'🍚',needed:true},
    {id:'bread',name:'Bread',price:1000,icon:'🍞',needed:true},
    {id:'tomatoes',name:'Tomatoes',price:800,icon:'🍅',needed:true},
    {id:'milk',name:'Milk',price:1200,icon:'🥛'},
    {id:'juice',name:'Juice',price:800,icon:'🧃'}],treat:{name:'A fruit snack',price:400,icon:'🍊'}}
];
export const totalWallet = s => s.wallet.reduce((a,b)=>a+b,0);
export const totalCost = s => s.items.filter(x=>x.needed).reduce((a,b)=>a+b.price,0);
export function money(cents) { return 'R' + (cents/100).toFixed(cents%100 ? 2 : 0).replace('.',','); }
export function parseMoney(value) {
  const clean=String(value).trim().replace(/^R\s*/i,'').replace(',','.');
  if(!/^\d+(\.\d{1,2})?$/.test(clean)) return null;
  return Math.round(Number(clean)*100);
}
export function basketMatches(s, selected) {
  return s.items.every(x=>Boolean(x.needed)===selected.includes(x.id));
}
export function paymentResult(s, indexes) {
  const unique=[...new Set(indexes)];
  if(unique.some(i=>!Number.isInteger(i)||i<0||i>=s.wallet.length)) return null;
  const paid=unique.reduce((a,i)=>a+s.wallet[i],0), cost=totalCost(s);
  if(paid<cost) return null;
  return {paid,change:paid-cost,untouched:totalWallet(s)-paid,remaining:totalWallet(s)-cost};
}
export function recordAttempt(records,id,skill,correct,hints=0,model=false) {
  const old=records[id];
  records[id]={skill,attempts:(old?.attempts||0)+1,firstIndependent:old?old.firstIndependent:correct&&hints===0&&!model,
    solved:Boolean(old?.solved||correct),hints:Math.max(old?.hints||0,hints),model:Boolean(old?.model||model)};
  return records[id];
}
export function summary(records) {
  const tasks=Object.values(records),independent=tasks.filter(t=>t.firstIndependent).length;
  return {attempted:tasks.length,independent,accuracy:tasks.length?Math.round(independent/tasks.length*100):null,
    hints:tasks.reduce((a,t)=>a+t.hints,0),models:tasks.filter(t=>t.model).length,solved:tasks.filter(t=>t.solved).length};
}
