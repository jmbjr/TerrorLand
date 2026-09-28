import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const data=JSON.parse(readFileSync('game.json','utf8'));
assert.equal(data.stats.length,25,'expected 25 stats');
assert.equal(data.loot.affixes.filter(a=>a.types.includes('extra')).length,40,'expected 40 extra affixes');
assert.equal(data.loot.affixes.filter(a=>a.types.includes('prefix')).length,30,'expected 30 prefixes');
assert.equal(data.loot.affixes.filter(a=>a.types.includes('suffix')).length,30,'expected 30 suffixes');
assert.ok(Object.values(data.loot.itemBases).every(items=>items.length===3),'every equipment slot needs three base variants');
assert.ok(Number.isInteger(data.floorCount)&&data.floorCount>0,'floorCount must be a positive integer');
const statIds=new Set(data.stats.map(s=>s.id));
assert.ok(data.loot.affixes.every(a=>a.effect&&statIds.has(a.effect.stat)),'every affix effect must target a known stat');
console.log('TerrorLand configuration validated.');
