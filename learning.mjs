// Pure learning logic, shared by the interface and executable tests.
export const capacity = 1024;
export const fixedTokens = 440; // rules 120 + question 80 + framing 40 + answer reserve 200
export const evidence = [
 {id:'policy',title:'Current return policy',tokens:240,kind:'Essential evidence',text:'Unopened headphones may be returned within 30 days of delivery. A receipt is required.'},
 {id:'order',title:'Order #1042',tokens:180,kind:'Essential evidence',text:'Headphones. Delivered 12 days ago. Unopened. Receipt available.'},
 {id:'chat',title:'Earlier small talk',tokens:220,kind:'Conversation history',text:'Greetings, weekend plans, and a long conversation about the weather.'},
 {id:'old',title:'Expired return policy',tokens:240,kind:'Outdated evidence',text:'Last year’s policy allowed only 7 days. This policy is no longer valid.'},
 {id:'other',title:'Unrelated orders',tokens:260,kind:'Unrelated evidence',text:'Details about other customers’ shoes, books, and kitchen appliances.'}
];
export function missionBudget(selected, summarized=false){return fixedTokens+evidence.filter(x=>selected.includes(x.id)).reduce((s,x)=>s+(x.id==='order'&&summarized?80:x.tokens),0)}
export function evaluateMission(selected,summarized=false){
 const used=missionBudget(selected,summarized);
 if(used>capacity)return {ok:false,title:'The request is too large.',text:`You are ${used-capacity} tokens over budget. Remove irrelevant content or summarize the order. Keep the evidence needed to answer.`};
 if(!selected.includes('policy')||!selected.includes('order'))return {ok:false,title:'It fits, but cannot answer reliably.',text:'Both the current policy and the customer’s order facts are needed. Token savings are useful only if the answer stays supported.'};
 if(selected.includes('old'))return {ok:false,title:'Conflicting policies remain.',text:'Remove the expired policy. It can confuse the answer even when the request fits.'};
 return {ok:true,title:'Ready to answer, with evidence.',text:'Yes. The headphones are unopened, were delivered 12 days ago, and have a receipt. They meet the current 30-day return policy. Next step: start the return request.'};
}
export function bpeStep(words){
 const counts=new Map();for(const word of words)for(let i=0;i<word.length-1;i++){const k=JSON.stringify([word[i],word[i+1]]);counts.set(k,(counts.get(k)||0)+1)}
 const best=[...counts].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))[0];if(!best)return null;
 const pair=JSON.parse(best[0]);return {pair,count:best[1],words:words.map(w=>{const out=[];for(let i=0;i<w.length;i++){if(w[i]===pair[0]&&w[i+1]===pair[1]){out.push(w[i]+w[i+1]);i++}else out.push(w[i])}return out})};
}
export function budgetTotal(history,evidence,answer){return 64+64+32+history+evidence+answer}
