import { useEffect, useRef, useState } from 'react';
import { project } from './provision';

export default function ProvisionMap({ records, selected, onSelect, origin }) {
  const ref = useRef(null);
  const drag = useRef(null);
  const [width, setWidth] = useState(700);
  const [zoom, setZoom] = useState(10);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);
  useEffect(() => { const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width)); observer.observe(ref.current); return () => observer.disconnect(); }, []);
  const center = project(50.89, -1.29, zoom);
  const left = center.x - width / 2 + offset.x, top = center.y - 220 + offset.y;
  const tiles = [];
  for (let x = Math.floor(left / 256); x <= Math.floor((left + width) / 256); x++) {
    for (let y = Math.floor(top / 256); y <= Math.floor((top + 440) / 256); y++) {
      tiles.push(<img key={`${zoom}-${x}-${y}`} alt="" draggable="false" onError={() => setFailed(true)} src={`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`} style={{ left: x * 256 - left, top: y * 256 - top }} />);
    }
  }
  const position = point => { const p = project(point.lat, point.lng, zoom); return { left: p.x - left, top: p.y - top }; };
  const changeZoom = delta => { setZoom(z => Math.min(13, Math.max(9, z + delta))); setOffset({ x: 0, y: 0 }); };
  return <section className="sg-panel" aria-label="South Hampshire map">
    <div className="sg-row"><h2>South Hampshire</h2><span className="sg-muted">Illustrative institution locations</span></div>
    <p className="sg-muted">Drag to pan. Use zoom controls or focus the map and use arrow keys.</p>
    <div className="sg-map" ref={ref} tabIndex={0} aria-label="Interactive map. Arrow keys pan, plus and minus zoom." onKeyDown={e => {
      const directions = { ArrowLeft: [-80, 0], ArrowRight: [80, 0], ArrowUp: [0, -80], ArrowDown: [0, 80] };
      if (directions[e.key]) { e.preventDefault(); const [x, y] = directions[e.key]; setOffset(o => ({ x: o.x + x, y: o.y + y })); }
      if (e.key === '+' || e.key === '=') changeZoom(1); if (e.key === '-') changeZoom(-1);
    }} onPointerDown={e => { if (e.target.closest('button,a')) return; drag.current = { x: e.clientX, y: e.clientY, offset }; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={e => { if (drag.current) setOffset({ x: drag.current.offset.x + drag.current.x - e.clientX, y: drag.current.offset.y + drag.current.y - e.clientY }); }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
      {tiles}
      <span className="sg-origin" title={`Search centre: ${origin.name}`} style={position(origin)}>◎</span>
      {records.map((s, i) => <button key={s.id} className={`sg-pin ${selected === s.id ? 'is-selected' : ''}`} style={position(s)} aria-label={`View ${s.name}`} title={s.name} onClick={() => onSelect(s.id)}>{i + 1}</button>)}
      <div className="sg-map-controls"><button aria-label="Zoom in" onClick={() => changeZoom(1)} disabled={zoom === 13}>+</button><button aria-label="Zoom out" onClick={() => changeZoom(-1)} disabled={zoom === 9}>−</button><button onClick={() => { setOffset({ x: 0, y: 0 }); setZoom(10); }}>Reset map</button></div>
      <a className="sg-attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>
    </div>
    {failed && <p role="status">Map tiles could not load. Institution markers remain available; use the matching numbered list for discovery.</p>}
    <p className="sg-muted">◎ Search centre · Numbered pins match the results. This is a southern Hampshire study area, including Southampton and Portsmouth, not an administrative county boundary.</p>
  </section>;
}
