 "use client";

import { useState } from "react";
import {
  Search, Building2, Users, Mail, TrendingUp, Settings,
  Plus, Play, ChevronDown, Download, Filter, Globe2,
  MapPin, BriefcaseBusiness, Sparkles, CheckCircle2
} from "lucide-react";

const initialLeads = [
  { company:"Northstar Legal LLP", city:"Manchester", country:"UK", niche:"Immigration Law", contact:"Sarah Mitchell", role:"Managing Partner", score:92, status:"Hot", email:"sarah@northstarlegal.co.uk" },
  { company:"Maple Health Tech", city:"Toronto", country:"Canada", niche:"Healthtech", contact:"Daniel Wong", role:"Co-Founder", score:87, status:"Hot", email:"daniel@maplehealth.ca" },
  { company:"Bristol Family Solicitors", city:"Bristol", country:"UK", niche:"Family Law", contact:"James Carter", role:"Partner", score:76, status:"Warm", email:"j.carter@bristolfamily.co.uk" },
  { company:"CareBridge Digital Health", city:"Vancouver", country:"Canada", niche:"Telehealth", contact:"Emma Lewis", role:"Head of Growth", score:71, status:"Warm", email:"emma@carebridge.ca" },
  { company:"Leeds Injury Law", city:"Leeds", country:"UK", niche:"Personal Injury", contact:"Michael Brown", role:"Director", score:64, status:"Warm", email:"michael@leedsinjurylaw.co.uk" }
];

export default function Home() {
  const [country, setCountry] = useState("UK");
  const [city, setCity] = useState("Manchester");
  const [industry, setIndustry] = useState("Law");
  const [niche, setNiche] = useState("Immigration Law");
  const [volume, setVolume] = useState("100");
  const [running, setRunning] = useState(false);
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");

  const filtered = leads.filter(l =>
    [l.company,l.city,l.country,l.niche,l.contact,l.role].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  function startDiscovery() {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setLeads(prev => [...prev]);
    }, 1200);
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">CE</div>
          <div>
            <strong>Content Engine</strong>
            <span>Lead Generation</span>
          </div>
        </div>

        <nav>
          <a className="active"><TrendingUp size={18}/> Overview</a>
          <a><Building2 size={18}/> Lead Discovery</a>
          <a><Users size={18}/> Contacts</a>
          <a><Mail size={18}/> Outreach</a>
          <a><CheckCircle2 size={18}/> CRM Pipeline</a>
          <a><Settings size={18}/> Settings</a>
        </nav>

        <div className="sideCard">
          <Sparkles size={18}/>
          <div>
            <b>AI Lead Engine</b>
            <p>Find, qualify and personalize prospects automatically.</p>
          </div>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <h1>B2B Lead Generation</h1>
            <p>Find high-intent law & healthcare prospects in the UK and Canada.</p>
          </div>
          <button className="outlineBtn"><Settings size={17}/> Settings</button>
        </header>

        <section className="hero">
          <div>
            <div className="eyebrow"><Sparkles size={15}/> AI-powered prospecting</div>
            <h2>Build your next client pipeline.</h2>
            <p>Enter your target market and let the lead engine discover, enrich, audit and score prospects.</p>
          </div>
        </section>

        <section className="panel">
          <div className="panelTitle">
            <div>
              <h3>New lead discovery</h3>
              <p>Start with a country, city and niche.</p>
            </div>
            <span className="statusDot"><i/> Ready</span>
          </div>

          <div className="formGrid">
            <label>Country
              <select value={country} onChange={e=>setCountry(e.target.value)}>
                <option>UK</option><option>Canada</option>
              </select>
            </label>
            <label>City
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. London"/>
            </label>
            <label>Industry
              <select value={industry} onChange={e=>setIndustry(e.target.value)}>
                <option>Law</option><option>Healthcare</option>
              </select>
            </label>
            <label>Niche
              <select value={niche} onChange={e=>setNiche(e.target.value)}>
                <option>Immigration Law</option>
                <option>Personal Injury</option>
                <option>Family Law</option>
                <option>Employment Law</option>
                <option>Healthtech</option>
                <option>Telehealth</option>
                <option>Private Clinic</option>
                <option>Dental</option>
              </select>
            </label>
            <label>Lead volume
              <select value={volume} onChange={e=>setVolume(e.target.value)}>
                <option>25</option><option>50</option><option>100</option><option>250</option><option>500</option>
              </select>
            </label>
            <button className="primaryBtn" onClick={startDiscovery} disabled={running}>
              <Play size={17}/>{running ? "Discovering..." : "Start Discovery"}
            </button>
          </div>
          <div className="pipelineHint">
            <span>Discovery</span><b>→</b><span>Enrichment</span><b>→</b><span>AI Audit</span><b>→</b><span>Lead Score</span><b>→</b><span>Outreach</span>
          </div>
        </section>

        <section className="stats">
          <Stat icon={<Building2/>} label="Companies" value="1,284" note="+18% this month"/>
          <Stat icon={<Users/>} label="Decision makers" value="946" note="+12% this month"/>
          <Stat icon={<Sparkles/>} label="High-intent leads" value="183" note="14.3% of total"/>
          <Stat icon={<Mail/>} label="Qualified replies" value="42" note="+9 this week"/>
        </section>

        <section className="panel">
          <div className="panelTitle">
            <div>
              <h3>Lead database</h3>
              <p>Sample interface — connect your backend/API to populate live results.</p>
            </div>
            <div className="actions">
              <div className="search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads..."/></div>
              <button className="iconBtn"><Filter size={16}/> Filter</button>
              <button className="iconBtn"><Download size={16}/> Export</button>
            </div>
          </div>

          <div className="tableWrap">
            <table>
              <thead><tr>
                <th>Company</th><th>Market</th><th>Decision maker</th><th>Opportunity</th><th>Score</th><th>Status</th>
              </tr></thead>
              <tbody>
                {filtered.map((l,i)=><tr key={i}>
                  <td><div className="company"><div className="companyIcon">{l.company.slice(0,1)}</div><div><b>{l.company}</b><span>{l.niche}</span></div></div></td>
                  <td><div className="market"><Globe2 size={14}/>{l.country}<span>•</span><MapPin size={14}/>{l.city}</div></td>
                  <td><div className="person"><b>{l.contact}</b><span>{l.role}</span></div></td>
                  <td><span className="opportunity">SEO + Conversion</span></td>
                  <td><strong className={l.score >= 80 ? "score hot" : "score"}>{l.score}</strong></td>
                  <td><span className={"badge "+l.status.toLowerCase()}>{l.status}</span></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <footer>
          <span>Content Engine Lead Generation</span>
          <span>Frontend v1.0 • API-ready</span>
        </footer>
      </section>
    </main>
  );
}

function Stat({icon,label,value,note}) {
  return <div className="stat"><div className="statIcon">{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>
}