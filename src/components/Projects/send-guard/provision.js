export const localities = [
  { name: 'Southampton', lat: 50.9097, lng: -1.4044 },
  { name: 'Eastleigh', lat: 50.9672, lng: -1.354 },
  { name: 'Fareham', lat: 50.8548, lng: -1.1793 },
  { name: 'Gosport', lat: 50.795, lng: -1.129 },
  { name: 'Portsmouth', lat: 50.8198, lng: -1.088 },
  { name: 'Havant', lat: 50.851, lng: -0.981 },
  { name: 'New Forest', lat: 50.874, lng: -1.576 },
];
export const types = ['Mainstream', 'Maintained specialist', 'Independent specialist'];
export const needs = ['Autism', 'Speech & language', 'SEMH', 'Physical & sensory', 'Learning difficulties'];
// Entirely fictional records. Coordinates are illustrative, not school addresses.
export const schools = localities.flatMap((place, i) => [0, 1].map(j => ({
  id: `demo-${i}-${j}`, name: `${place.name} ${j ? 'Learning Centre' : 'Community School'} (demo)`,
  locality: place.name, type: types[(i + j) % 3],
  lat: place.lat + (j ? .014 : -.008), lng: place.lng + (j ? .021 : -.012),
  minAge: j ? 7 : 4, maxAge: j ? 19 : 16,
  needs: [needs[i % needs.length], needs[(i + j + 1) % needs.length]],
  support: j ? ['Small-group learning', 'Sensory spaces', 'Transition planning'] : ['SENCo-led support', 'Communication groups', 'Adapted learning'],
  status: 'Illustrative', inspection: 'Not assessed — fictional institution',
  admissions: 'Illustrative consultation through the local authority; no live admissions information.',
})));
export function distanceMiles(a, b) {
  const rad = n => n * Math.PI / 180;
  const dlat = rad(b.lat - a.lat), dlng = rad(b.lng - a.lng);
  const h = Math.sin(dlat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dlng / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
export function discover(records, filters, origin) {
  return records.map(s => ({ ...s, distance: distanceMiles(origin, s) })).filter(s =>
    (!filters.query || `${s.name} ${s.locality} ${s.needs.join(' ')}`.toLowerCase().includes(filters.query.toLowerCase().trim())) &&
    (!filters.type || s.type === filters.type) && (!filters.need || s.needs.includes(filters.need)) &&
    (!filters.locality || s.locality === filters.locality) &&
    (!filters.age || (+filters.age >= s.minAge && +filters.age <= s.maxAge)) &&
    (!filters.radius || s.distance <= +filters.radius)
  ).sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name));
}
export function project(lat, lng, zoom) {
  const size = 256 * 2 ** zoom;
  const sine = Math.sin(lat * Math.PI / 180);
  return { x: (lng + 180) / 360 * size, y: (.5 - Math.log((1 + sine) / (1 - sine)) / (4 * Math.PI)) * size };
}
