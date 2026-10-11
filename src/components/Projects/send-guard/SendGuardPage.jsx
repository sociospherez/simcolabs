import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProvisionMap from './ProvisionMap';
import { discover, localities, schools, types, needs } from './provision';
import './explorer.css';

const initialFilters = { query: '', type: '', need: '', age: '', locality: '', radius: '' };
export default function SendGuardPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [originName, setOriginName] = useState('Southampton');
  const [selected, setSelected] = useState(null);
  const [comparison, setComparison] = useState([]);
  const origin = localities.find(l => l.name === originName);
  const results = discover(schools, filters, origin);
  const detail = results.find(s => s.id === selected);
  const compared = discover(schools, initialFilters, origin).filter(s => comparison.includes(s.id));
  const update = (key, value) => { setFilters(f => ({ ...f, [key]: value })); setSelected(null); };
  const toggle = id => setComparison(c => c.includes(id) ? c.filter(x => x !== id) : c.length < 3 ? [...c, id] : c);
  const select = id => { setSelected(id); requestAnimationFrame(() => document.getElementById('sg-detail')?.focus({ preventScroll: true })); };
  const selectFilter = (label, key, options) => <label>{label}<select aria-label={label} value={filters[key]} onChange={e => update(key, e.target.value)}><option value="">All {label.toLowerCase()}</option>{options.map(value => <option key={value}>{value}</option>)}</select></label>;
  return <div className="sg-explorer">
    <header className="sg-hero">
      <Link to="/projects/ai-for-send">← AI for SEND</Link>
      <p className="sg-kicker">SEND Guard · Provision Explorer · MVP</p>
      <h1>Explore provision.<br /><span className="theme-hero-gradient">Start a better conversation.</span></h1>
      <p>Discover education settings around South Hampshire, explore areas of support and compare possibilities for a young person.</p>
    </header>
    <aside className="sg-notice"><strong>Illustrative demo — 14 fictional institutions.</strong> Names, locations, age ranges and support offers are invented to demonstrate discovery. No verified school records, inspection ratings, vacancies or suitability assessments are included. Confirm provision and admissions with the school and local authority before making decisions.</aside>
    <section className="sg-panel" aria-label="Discovery filters">
      <div className="sg-row"><h2>Find possibilities nearby</h2><button onClick={() => { setFilters(initialFilters); setSelected(null); setOriginName('Southampton'); }}>Reset filters</button></div>
      <div className="sg-filters">
        <label>Search<input aria-label="Search" type="search" placeholder="Name, locality or support area" value={filters.query} onChange={e => update('query', e.target.value)} /></label>
        <label>Search centre<select aria-label="Search centre" value={originName} onChange={e => setOriginName(e.target.value)}>{localities.map(l => <option key={l.name}>{l.name}</option>)}</select></label>
        <label>Distance<select aria-label="Distance" value={filters.radius} onChange={e => update('radius', e.target.value)}><option value="">Whole study area</option>{[5, 10, 20].map(n => <option key={n} value={n}>Within {n} miles</option>)}</select></label>
        {selectFilter('Institution type', 'type', types)}
        {selectFilter('Support area', 'need', needs)}
        {selectFilter('Locality', 'locality', localities.map(l => l.name))}
        <label>Young person’s age<select aria-label="Young person’s age" value={filters.age} onChange={e => update('age', e.target.value)}><option value="">Any age</option>{Array.from({ length: 22 }, (_, i) => <option key={i} value={i}>{i} years</option>)}</select></label>
      </div>
      <p className="sg-muted">Distances are straight-line miles from the selected town centre, not travel distances. Support tags describe the demo offer, not a match or recommendation.</p>
    </section>
    <div className="sg-discovery">
      <div><ProvisionMap records={results} origin={origin} selected={selected} onSelect={select} />
        <section className="sg-panel sg-detail" id="sg-detail" tabIndex={-1} aria-label="Institution detail">
          {detail ? <><div className="sg-row"><span className="sg-badge">Illustrative profile</span><button onClick={() => setSelected(null)}>Close detail</button></div><h2>{detail.name}</h2><p>{detail.type} · {detail.locality} · Ages {detail.minAge}–{detail.maxAge}</p><h3>Areas of support</h3><p>{detail.needs.join(' · ')}</p><h3>Example provision</h3><ul>{detail.support.map(s => <li key={s}>{s}</li>)}</ul><h3>Inspection & admissions</h3><p>{detail.inspection}</p><p>{detail.admissions}</p><h3>Questions to take forward</h3><ul><li>How is support tailored to this young person’s needs?</li><li>What specialist staff and therapies are available?</li><li>What are the consultation, transition and transport arrangements?</li></ul><p className="sg-muted">Source: SEND Guard fictional MVP dataset. There is no real school website or inspection report for this record.</p><button disabled={!comparison.includes(detail.id) && comparison.length === 3} onClick={() => toggle(detail.id)}>{comparison.includes(detail.id) ? 'Remove from comparison' : 'Add to comparison'}</button></> : <><h2>Look closer at a setting</h2><p>Select a numbered map pin or “View details” to explore its example support offer and questions to ask.</p></>}
        </section>
      </div>
      <section className="sg-panel sg-results" aria-label="Institution results">
        <div className="sg-row"><h2>Discover settings</h2><span role="status" aria-live="polite">{results.length} results</span></div>
        {results.length === 0 && <div className="sg-empty"><h3>No demo settings match</h3><p>Try widening the distance or removing a support or age filter. This is a small fictional sample; an empty result does not establish a real provision gap.</p><button onClick={() => { setFilters(initialFilters); setSelected(null); }}>Clear filters</button></div>}
        {results.map((s, i) => <article key={s.id} className={`sg-result ${selected === s.id ? 'is-selected' : ''}`}><span className="sg-badge">{i + 1} · Illustrative</span><h3>{s.name}</h3><p>{s.type}</p><p className="sg-muted">{s.locality} · Ages {s.minAge}–{s.maxAge} · {s.distance.toFixed(1)} miles</p><div className="sg-tags">{s.needs.map(n => <span key={n}>{n}</span>)}</div><div className="sg-row"><button onClick={() => select(s.id)}>View details</button><button aria-pressed={comparison.includes(s.id)} disabled={!comparison.includes(s.id) && comparison.length === 3} onClick={() => toggle(s.id)}>{comparison.includes(s.id) ? 'Remove' : 'Compare'}</button></div></article>)}
      </section>
    </div>
    <section className="sg-panel" aria-label="Comparison board"><div className="sg-row"><h2>Comparison board · {comparison.length}/3</h2><button disabled={!comparison.length} onClick={() => setComparison([])}>Clear comparison</button></div><p className="sg-muted">Choose up to three settings. Your selections remain here when filters change. Comparisons describe offers, without ranking suitability.</p>
      {compared.length ? <div className="sg-table-wrap"><table><caption className="sr-only">Illustrative institution comparison</caption><thead><tr><th scope="col">Attribute</th>{compared.map(s => <th scope="col" key={s.id}>{s.name}<button aria-label={`Remove ${s.name} from comparison`} onClick={() => toggle(s.id)}>Remove</button></th>)}</tr></thead><tbody>{[['Type', s => s.type], ['Locality', s => s.locality], ['Age range', s => `${s.minAge}–${s.maxAge}`], ['Distance', s => `${s.distance.toFixed(1)} straight-line miles`], ['Support areas', s => s.needs.join(', ')], ['Example provision', s => s.support.join(', ')], ['Evidence', s => s.status], ['Inspection', s => s.inspection]].map(([label, value]) => <tr key={label}><th scope="row">{label}</th>{compared.map(s => <td key={s.id}>{value(s)}</td>)}</tr>)}</tbody></table></div> : <p>Select “Compare” on a result to start your board.</p>}
    </section>
    <section className="sg-panel" aria-label="Locality insights"><h2>Locality insights</h2><p className="sg-muted">Counts reflect the {results.length} filtered demo records only. They do not measure capacity, quality or actual local availability.</p><div className="sg-insights">{localities.map(l => { const records = results.filter(s => s.locality === l.name); return <article key={l.name}><h3>{l.name}</h3><strong>{records.length} demo settings</strong><p>{new Set(records.map(s => s.type)).size} institution types</p><p>{[...new Set(records.flatMap(s => s.needs))].join(' · ') || 'No matching demo support areas'}</p><button onClick={() => update('locality', l.name)}>Explore {l.name}</button></article>; })}</div></section>
    <footer className="sg-panel"><h2>Continue with verified information</h2><p>Use official directories to check real institutions and their current provision.</p><div className="sg-tags"><a href="https://www.hants.gov.uk/socialcareandhealth/childrenandfamilies/specialneeds" target="_blank" rel="noreferrer">Hampshire SEND information ↗</a><a href="https://www.get-information-schools.service.gov.uk/" target="_blank" rel="noreferrer">DfE school directory ↗</a></div><p className="sg-muted">Independent specialist is a separate category from maintained specialist. This MVP stores no child information and provides no placement decisions.</p></footer>
  </div>;
}
