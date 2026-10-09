import test from 'node:test';
import assert from 'node:assert/strict';
import { discover, distanceMiles, schools, localities, project } from '../src/components/Projects/send-guard/provision.js';
const empty = { query: '', type: '', need: '', age: '', locality: '', radius: '' };
test('Distance calculation agrees with known Southampton–Portsmouth separation', () => {
  assert.equal(distanceMiles(localities[0], localities[0]), 0);
  assert.ok(Math.abs(distanceMiles(localities[0], localities[4]) - 15.14) < .2);
  assert.equal(distanceMiles(localities[0], localities[4]), distanceMiles(localities[4], localities[0]));
});
test('Combined filters include age and distance boundaries and sort nearest first', () => {
  const origin = { lat: 50.9, lng: -1.4 };
  const records = [
    { id: 'far', name: 'Far', locality: 'A', type: 'Mainstream', needs: ['Autism'], minAge: 4, maxAge: 16, lat: 51.2, lng: -1.4 },
    { id: 'near', name: 'Near', locality: 'A', type: 'Mainstream', needs: ['Autism'], minAge: 4, maxAge: 16, ...origin },
  ];
  assert.deepEqual(discover(records, { ...empty, radius: '5', age: '16', need: 'Autism', type: 'Mainstream', locality: 'A' }, origin).map(s => s.id), ['near']);
  assert.equal(discover(records, { ...empty, age: '17' }, origin).length, 0);
  assert.deepEqual(discover(records, empty, origin).map(s => s.id), ['near', 'far']);
  assert.equal(discover(records, { ...empty, query: ' NEAR ' }, origin).length, 1);
});
test('Demo records are unique, explicit and valid; projection follows map directions', () => {
  assert.equal(schools.length, 14); assert.equal(new Set(schools.map(s => s.id)).size, 14);
  schools.forEach(s => { assert.equal(s.status, 'Illustrative'); assert.ok(s.name.endsWith('(demo)')); assert.ok(s.minAge <= s.maxAge); });
  assert.ok(project(51, -1, 10).y < project(50, -1, 10).y);
  assert.ok(project(51, 0, 10).x > project(51, -1, 10).x);
});
