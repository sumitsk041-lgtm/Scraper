 "use client";
import {useEffect,useState} from "react";
import {Search,Building2,Users,Mail,TrendingUp,Settings,Play,Download,Filter,Globe2,MapPin,Sparkles,CheckCircle2,Wifi,WifiOff} from "lucide-react";

const sample=[
{id:"LEAD-001",company:"Northstar Legal LLP",city:"Manchester",country:"UK",industry:"Law",niche:"Immigration Law",contact:"Sarah Mitchell",role:"Managing Partner",email:"sarah@northstarlegal.co.uk",score:92,status:"Hot"},
{id:"LEAD-002",company:"Maple Health Tech",city:"Toronto",country:"Canada",industry:"Healthcare",niche:"Healthtech",contact:"Daniel Wong",role:"Co-Founder",email:"daniel@maplehealth.ca",score:87,status:"Hot"},
{id:"LEAD-003",company:"Bristol Family Solicitors",city:"Bristol",country:"UK",industry:"Law",niche:"Family Law",contact:"James Carter",role:"Partner",email:"j.carter@bristolfamily.co.uk",score:76,status:"Warm"},
{id:"LEAD-004",company:"CareBridge Digital Health",city:"Vancouver",country:"Canada",industry:"Healthcare",niche:"Telehealth",contact:"Emma Lewis",role:"Head of Growth",email:"emma@carebridge.ca",score:71,status:"Warm"}];

export default function Home(){
 const [country,setCountry]=useState("UK"),[city,setCity]=useState("Manchester"),[industry,setIndustry]=useState("Law"),[niche,setNiche]=useState("Immigration Law"),[volume,setVolume]=useState("100");
 const [leads,setLeads]=useState(sample),[search,setSearch]=useState(""),[running,setRunning]=useState(false),[connected,setConnected]=useState(null),[message,setMessage]=useState("");
 const API=(process.env.NEXT_PUBLIC_API_BASE_URL||"").replace(/\/$/,"");

 async function testAPI(){
   if(!API){setConnected(false);setMessage("NEXT_PUBLIC_API_BASE_URL is not configured.");return}
   try{const r=await fetch(API+"/api/health");const d=await r.json();if(!r.ok)throw Error("Health check failed");setConnected(true);setMessage("Backend connected: "+d.service)}
   catch(e){setConnected(false);setMessage("Backend connection failed: "+e.message)}
 }
 useEffect(()=>{testAPI()},[]);
 async function startDiscovery(){
   if(!API){setMessage("Add NEXT_PUBLIC_API_BASE_URL in Vercel and redeploy.");return}
   setRunning(true);setMessage("");
   try{
    const r=await fetch(API+"/api/discovery",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({country,city,industry,niche,volume})});
    const d=await r.json();if(!r.ok)throw Error(d.error||"Discovery request failed");
    setMessage("Discovery job accepted: "+(d.jobId||"created"));
    const q=new URLSearchParams({country,city,industry,niche});
    const lr=await fetch(API+"/api/leads?"+q); if(lr.ok){const ld=await lr.json();if(Array.isArray(ld.data)&&ld.data.length)setLeads(ld.data)}
   }catch(e){setMessage("Backend error: "+e.message)}finally{setRunning(false)}
 }
 const filtered=leads.filter(l=>JSON.stringify(l).toLowerCase().includes(search.toLowerCase()));
 return <main className="shell">
  <aside className="sidebar"><div className="brand"><div className="brandMark">CE</div><div><strong>Content Engine</strong><span>Lead Generation</span></div></div>
   <nav><a className="active"><TrendingUp/> Overview</a><a><Building2/> Lead Discovery</a><a><Users/> Contacts</a><a><Mail/> Outreach</a><a><CheckCircle2/> CRM Pipeline</a><a><Settings/> Settings</a></nav>
   <div className="sideCard"><Sparkles/><div><b>AI Lead Engine</b><p>Find, qualify and personalize prospects automatically.</p></div></div>
  </aside>
  <section className="main"><header className="topbar"><div><h1>B2B Lead Generation</h1><p>UK & Canada law and healthcare prospecting.</p></div><button className="outlineBtn"><Settings/> Settings</button></header>
   <section className="hero"><div><div className="eyebrow"><Sparkles/> AI-powered prospecting</div><h2>Build your next client pipeline.</h2><p>Discover, enrich, audit and score prospects from one dashboard.</p></div></section>
   <section className="panel"><div className="panelTitle"><div><h3>New lead discovery</h3><p>Enter your target market and send it directly to the Render backend.</p></div><div className="panelStatus"><span className="statusDot"><i/>{connected===true?"API Connected":connected===false?"API Offline":"Checking API..."}</span><button className="miniBtn" onClick={testAPI}>{connected===true?<Wifi/>:<WifiOff/>} Test API</button></div></div>
   {message&&<div className="apiMessage">{message}</div>}
   <div className="formGrid">
    <label>Country<select value={country} onChange={e=>setCountry(e.target.value)}><option>UK</option><option>Canada</option></select></label>
    <label>City<input value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. London"/></label>
    <label>Industry<select value={industry} onChange={e=>{setIndustry(e.target.value);setNiche(e.target.value==="Law"?"Immigration Law":"Healthtech")}}><option>Law</option><option>Healthcare</option></select></label>
    <label>Niche<select value={niche} onChange={e=>setNiche(e.target.value)}><option>Immigration Law</option><option>Personal Injury</option><option>Family Law</option><option>Employment Law</option><option>Healthtech</option><option>Telehealth</option><option>Private Clinic</option><option>Dental</option></select></label>
    <label>Volume<select value={volume} onChange={e=>setVolume(e.target.value)}><option>25</option><option>50</option><option>100</option><option>250</option><option>500</option></select></label>
    <button className="primaryBtn" onClick={startDiscovery} disabled={running}><Play/>{running?"Discovering...":"Start Discovery"}</button>
   </div><div className="pipelineHint"><span>Discovery</span><b>→</b><span>Enrichment</span><b>→</b><span>AI Audit</span><b>→</b><span>Lead Score</span><b>→</b><span>Outreach</span></div></section>
   <section className="stats"><Stat icon={<Building2/>} label="Companies" value="1,284" note="+18% this month"/><Stat icon={<Users/>} label="Decision makers" value="946" note="+12% this month"/><Stat icon={<Sparkles/>} label="High-intent leads" value="183" note="14.3% of total"/><Stat icon={<Mail/>} label="Qualified replies" value="42" note="+9 this week"/></section>
   <section className="panel"><div className="panelTitle"><div><h3>Lead database</h3><p>Live results appear here after the backend returns data.</p></div><div className="actions"><div className="search"><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads..."/></div><button className="iconBtn"><Filter/> Filter</button><button className="iconBtn"><Download/> Export</button></div></div>
   <div className="tableWrap"><table><thead><tr><th>Company</th><th>Market</th><th>Decision maker</th><th>Opportunity</th><th>Score</th><th>Status</th></tr></thead><tbody>{filtered.map((l,i)=><tr key={l.id||i}><td><div className="company"><div className="companyIcon">{l.company?.[0]||"C"}</div><div><b>{l.company}</b><span>{l.niche}</span></div></div></td><td><div className="market"><Globe2/>{l.country}<span>•</span><MapPin/>{l.city}</div></td><td><div className="person"><b>{l.contact||"—"}</b><span>{l.role||"—"}</span></div></td><td><span className="opportunity">SEO + Conversion</span></td><td><strong className={"score "+(l.score>=80?"hot":"")}>{l.score??"—"}</strong></td><td><span className={"badge "+String(l.status||"").toLowerCase()}>{l.status||"New"}</span></td></tr>)}</tbody></table></div></section>
   <footer><span>Content Engine Lead Generation</span><span>Frontend v1.1 • Render API connected</span></footer>
  </section>
 </main>
}
function Stat({icon,label,value,note}){return <div className="stat"><div className="statIcon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>}