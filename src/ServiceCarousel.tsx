import {useEffect,useState} from 'react';
import {Network,ShieldCheck,Monitor,Lightbulb,Route,Workflow,BrainCircuit,Radio,ChevronLeft,ChevronRight,Pause,Play,ArrowUpRight} from 'lucide-react';
import {SiteContent} from './lib/content';
export default function ServiceCarousel({content}:{content:SiteContent}){
const icons=[Network,ShieldCheck,Monitor,Lightbulb,Route,Workflow];
const themes=['network','security','av','lighting','mobility','integration'];
const routes=['/services#it','/elv','/av','/iot','/smart-mobility','/services#integration'];
const slides=[...content.services.map((s,i)=>({...s,Icon:icons[i]||Workflow,theme:themes[i]||'network',href:routes[i]||'/services'})),{title:'COMMSYNIX AI',text:content.aiText,list:content.aiKicker,Icon:BrainCircuit,theme:'ai',href:'/ai'},{title:'COMMSYNIX IOT',text:content.iotText,list:content.iotKicker,Icon:Radio,theme:'iot',href:'/iot'}];
const [index,setIndex]=useState(0),[paused,setPaused]=useState(false),[hover,setHover]=useState(false),[focused,setFocused]=useState(false),[reduced,setReduced]=useState(false);
useEffect(()=>{const q=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(q.matches);const change=()=>setReduced(q.matches);q.addEventListener('change',change);return()=>q.removeEventListener('change',change);},[]);
useEffect(()=>{if(paused||hover||focused||reduced)return;const id=setInterval(()=>{if(!document.hidden)setIndex(i=>(i+1)%slides.length);},6000);return()=>clearInterval(id);},[paused,hover,focused,reduced,slides.length,index]);
const active=index%slides.length,s=slides[active],Icon=s.Icon;
function move(step:number){setIndex(i=>(i+step+slides.length)%slides.length);}
return <section className={'service-carousel sc-'+s.theme} aria-label="Explore our services" aria-roledescription="carousel" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setFocused(false);}} onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}}}>
<div className="sc-scene" aria-hidden="true"><div className="sc-grid"/><div className="sc-orbit sc-orbit-one"/><div className="sc-orbit sc-orbit-two"/><Icon className="sc-scene-icon" strokeWidth={1}/></div>
<div key={active} className="sc-slide" role="group" aria-roledescription="slide" aria-label={(active+1)+' of '+slides.length} aria-live={paused||focused?'polite':'off'}>
<p className="sc-label">COMMSYNIX / SOLUTIONS</p><Icon className="sc-small-icon" size={30}/><h3><span>{s.title}</span></h3><p className="sc-description">{s.text}</p><p className="sc-details">{s.list}</p><a href={s.href} className="sc-link">Explore solution <ArrowUpRight size={16}/></a>
</div><div className="sc-controls"><div className="sc-dots">{slides.map((slide,i)=><button key={i} aria-label={'Show '+slide.title} aria-pressed={i===active} onClick={()=>setIndex(i)} className={i===active?'active':''}/>)}</div><div className="sc-buttons"><button aria-label="Previous service" onClick={()=>move(-1)}><ChevronLeft size={17}/></button><button aria-label={paused||reduced?'Play slideshow':'Pause slideshow'} onClick={()=>{setPaused(!(paused||reduced));setReduced(false);}}>{paused||reduced?<Play size={15}/>:<Pause size={15}/>}</button><button aria-label="Next service" onClick={()=>move(1)}><ChevronRight size={17}/></button></div></div>
</section>;
}
