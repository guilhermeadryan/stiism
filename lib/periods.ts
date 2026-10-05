import type {Data} from './data';
export function latestPeriodId(periods:{id:string}[]){return periods.at(-1)?.id||''}
export function removePeriod(data:Data,team:'sti'|'ism',id:string):Data{
 const list=team==='sti'?data.stiPeriods:data.ismPeriods;
 if(!list.some(p=>p.id===id))throw Error('Período não encontrado.');
 if(list.length<=1)throw Error('Mantenha pelo menos um período na equipe.');
 const next=structuredClone(data);
 if(team==='sti')next.stiPeriods=next.stiPeriods.filter(p=>p.id!==id);
 else {next.ismPeriods=next.ismPeriods.filter(p=>p.id!==id);next.clients.forEach(c=>{delete c.values[id]})}
 return next;
}
