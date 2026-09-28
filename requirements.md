# TerrorLand — Project Requirements

## 1. Product Vision

TerrorLand is a compact, watchable action-RPG autoplayer. The player chooses an adventurer, watches them explore and fight automatically, and occasionally intervenes through equipment decisions, consumables, retreat orders, and progression choices.

The core pleasure is seeing a small hero survive increasingly dangerous rooms while a colorful stream of procedurally generated gear continually changes their build.

## 2. Intellectual-Property Boundary

- Use only original names, characters, enemies, lore, art, audio, interface, maps, item affixes, and written text.
- Do not reproduce recognizable layouts, dialogue, quests, character designs, icons, sound effects, or exact numeric data from any existing game.
- Genre conventions may inspire the design, but every player-facing expression must be independently created.
- All names and balance data must be externalized so copied or questionable material can be identified and replaced easily.

## 3. First Playable Scope

The initial vertical slice contains:

- One class: **Vanguard**, an original durable melee fighter.
- One settlement: **Emberrest**.
- One dungeon: **The Silt Tombs**.
- Five ordinary floors plus one boss floor.
- A final encounter against the **Mummy Queen**.
- Automatic movement, targeting, basic attacks, damage, healing, death, and floor advancement.
- Procedural weapons and armor with rarity colors and stat affixes.
- Inventory and equipment management.
- Limited player intervention through Retreat, potion policy, and equipment selection.
- Local save/load and offline-compatible play.
- A browser build suitable for static hosting on GitHub Pages.

Explicitly out of scope for this slice: additional classes, multiplayer, free character movement, manual attack timing, skill trees, crafting, merchants with complex economies, live services, and post-boss content.

## 4. Core Game Loop

1. Start in Emberrest and begin an expedition.
2. The Vanguard enters the current dungeon floor.
3. The character automatically seeks enemies, approaches them, and attacks.
4. Enemies fight back; the character automatically uses healing according to the selected potion policy.
5. Defeated enemies may drop procedurally generated gear, consumables, currency, or portal tokens.
6. The player compares and equips items during play or enables simple auto-equip rules.
7. After all required encounters are cleared, the character advances automatically.
8. The player may spend a portal token to retreat safely to Emberrest.
9. In town, health and consumables are restored according to the economy rules; inventory can be reorganized before returning.
10. The run culminates in the Mummy Queen fight. Victory completes the vertical slice and records the run summary.

## 5. Player Agency

The game must remain entertaining without continuous input. Player actions influence risk and build direction rather than directly controlling every attack.

Required controls:

- **Pause / Resume** simulation.
- **Retreat to Emberrest**, enabled only when a portal token is available and retreat is currently legal.
- **Equip / unequip / discard** items.
- **Lock** an item so automation cannot replace or discard it.
- Select a **potion policy**: Conservative, Balanced, or Desperate.
- Select an **auto-equip policy**: Off, Higher Score, or Build Preference.
- Choose whether the hero resumes the deepest unlocked floor or starts from floor one.

The retreat action must provide a short, interruptible channel so it is meaningful under pressure. The exact duration belongs in data.

## 6. Vanguard Class

The Vanguard is a readable, dependable melee archetype and not a recreation of a specific proprietary character.

Initial behavior:

- Prefers the nearest reachable hostile target.
- Closes to melee range automatically.
- Uses a basic weapon swing on cooldown.
- May block or mitigate damage based on equipped gear.
- Automatically drinks healing potions according to policy.
- Re-evaluates targets when an enemy dies, becomes unreachable, or presents a higher configured threat.

Initial attributes:

- Vitality: maximum health and recovery.
- Might: physical damage.
- Guard: physical damage reduction and block effectiveness.
- Tempo: attack speed and recovery time.
- Fortune: item rarity and affix quality influence.

All attribute names, formulas, starting values, growth, and caps must be stored in JSON.

## 7. Combat Simulation

- Combat runs in real time and can be paused.
- The presentation may use simple looping swing, hit, hurt, death, and walking animations.
- The simulation model must be independent from animation so visuals cannot change combat outcomes.
- Every attack produces a deterministic result when initialized with the same random seed and inputs.
- Damage resolution supports hit chance, base damage range, mitigation, critical effects, and optional on-hit affixes.
- Enemy attacks use the same general resolution pipeline where practical.
- The combat log records attacks, damage, healing, drops, equipment changes, retreats, deaths, and floor transitions.
- Simulation speed must be configurable in development; a player-facing speed control is optional for the first slice.

## 8. Dungeon and Encounters

Each floor is a procedurally named sequence of encounter nodes rather than a freely navigated map in the first slice.

Required floor content:

- A JSON `floorCount` integer controls run length.
- Floor names combine configurable adjective and noun pools.
- Floor `F` contains `F + random(1, F × 2)` ordinary enemies selected from the configured enemy pool.
- A visible floor name, depth, progress indicator, and current encounter.
- Regular enemies, stronger champion variants, breakable containers, and a floor guardian or completion encounter.
- At least four original enemy families distributed across the dungeon.
- Escalating enemy level, group size, and affix chance.
- A seeded run so bugs and balance scenarios can be reproduced.

Suggested original enemy families: Dustbound, Tomb Scarabs, Clay Wardens, and Veil Priests.

## 9. Mummy Queen Boss

The Mummy Queen occupies the sixth floor and has an original visual identity, move set, and lore.

Minimum encounter structure:

- Phase 1: direct attacks plus summoned minions.
- Phase 2: begins at a data-defined health threshold and introduces a dangerous curse or arena hazard.
- Clear telegraphs and readable combat-log messages.
- A guaranteed boss-quality reward on first victory.
- Victory screen showing elapsed time, deaths, retreats, enemies defeated, and notable loot.

If “Mummy Queen” is later considered too generic or too close to another work, both display name and data identifier must be replaceable without code changes.

## 10. Loot System

Items are generated from JSON-defined slot bases, rarities, role-aware affix pools, and drop tables. Each slot begins with three base-item variants.

Names follow **[Extra] [Prefix] Item of [Suffix]**. Prefix and suffix each roll independently at 50%. When either is present, an Extra affix rolls at 10%; Extra can never appear alone. Every affix identifies one or more eligible roles and contributes a rolled effect targeting a declared stat.

Required slots:

- Main hand
- Off hand
- Head
- Body
- Hands
- Feet
- Trinket

Required item model:

- Stable unique instance ID.
- Base item ID and display name.
- Item level.
- Rarity.
- Rolled affixes and values.
- Equipment slot and restrictions.
- Computed comparison score.
- Sell or salvage value placeholder.
- Locked and newly acquired flags.

Initial rarity tiers: Common, Tempered, Exalted, and Mythic. Names, colors, weights, affix counts, and value multipliers must be data-driven.

The “loot rainbow” should be visible through colored drop markers, a scrolling acquisition feed, and inventory rarity treatment. Accessibility settings must offer patterns or labels so rarity is not conveyed by color alone.

## 11. Inventory and Equipment

- Display equipped items and a finite backpack.
- Allow comparison between a selected item and the equipped item for that slot.
- Show resulting changes to damage, survivability, attack tempo, and total score.
- Prevent locked items from being discarded or replaced automatically.
- When the backpack is full, apply a configurable policy: pause, discard lowest unlocked item, or leave new drops behind.
- Equipment changes update future combat calculations immediately but do not retroactively change resolved attacks.

## 12. Retreat, Defeat, and Persistence

- Portal tokens are consumable items with a configurable drop rate and starting quantity.
- Retreat returns the character to Emberrest while preserving acquired loot unless a data rule says otherwise.
- Defeat returns the character to Emberrest and applies a configurable penalty.
- The default first-slice penalty is lost current-floor progress, not permanent character deletion.
- Returning to the dungeon resumes at the deepest unlocked floor or restarts the dungeon according to player choice.
- Autosave occurs after loot acquisition, equipment changes, town arrival, floor completion, defeat, and boss victory.
- Save data must include a schema version and support safe migration or a clear reset path during development.

## 13. User Interface

Primary expedition view:

- Animated hero and current enemies.
- Health bars and clear status effects.
- Floor and encounter progress.
- Recent loot feed.
- Combat log that can be expanded or collapsed.
- Retreat button with token count and channel progress.
- Inventory/equipment button.
- Pause control.

Town view:

- Character summary.
- Equipment and backpack.
- Expedition start/resume control.
- Potion and auto-equip policies.
- Run history and settings.

The interface should prioritize “glanceable spectacle”: health, danger, a valuable drop, and current progress must be understandable within a few seconds.

## 14. Data-Driven Content

At minimum, the following must be configurable through JSON without code edits:

- Classes and base attributes.
- Attribute and damage formulas or formula parameters.
- Animation references and timings.
- Enemy definitions and AI priorities.
- Floors, encounters, and boss phases.
- Item bases, rarities, affixes, and drop tables.
- Consumables and portal behavior.
- Auto-play policies.
- Progression curves and rewards.
- Player-facing names and descriptive text.

JSON files must be schema-validated at startup. Invalid content should produce actionable error messages identifying the file and field.

## 15. Suggested Technical Architecture

For the browser implementation:

- Keep simulation state in plain JavaScript data objects, separate from DOM elements.
- Use a tick-based combat service with seeded random-number generation.
- Treat presentation as a subscriber to simulation events.
- Load validated JSON into immutable content definitions; store mutable run state separately.
- Use event records for combat log, animation triggers, statistics, and debugging.
- Build content identifiers from original internal IDs rather than display strings.

Suggested high-level modules:

- Content Loader and Validator
- Run State
- Combat Simulator
- Actor AI
- Encounter Director
- Loot Generator
- Inventory and Equipment
- Save Service
- Presentation/Event Adapter
- UI

## 16. Web Build and Deployment

- The primary shareable prototype must run in a modern desktop browser without installation.
- The application must use browser-native HTML, CSS, and JavaScript without a game-engine runtime.
- Save data must use browser-compatible local persistence and remain isolated per browser/device.
- The public GitHub repository is `jmbjr/TerrorLand`.
- A GitHub Actions workflow must validate the static site and publish it to GitHub Pages.
- Deployment must run automatically after accepted changes reach the repository's deployment branch.
- Pull requests should run validation and a web export smoke test without publishing over the playable build.
- The workflow must pin its validation runtime and deploy only after validation passes.
- The published build must show a visible version or commit identifier for remote playtest reports.
- Browser startup, save/load, audio initialization, and viewport scaling must be included in release checks.

### Development Authoring Mode

- A development-only authoring panel must allow the full game JSON to be edited and validated in the browser.
- Access uses a lightweight password gate whose plaintext value is never committed; only a one-way hash may be shipped.
- Because all static-site code is downloadable, this gate is explicitly not a security boundary.
- Applied configuration may be saved in browser local storage, restored to defaults, or exported as JSON.
- Authoring mode does not write directly to GitHub and must not embed repository credentials.

## 17. Acceptance Criteria for Version 0.1

Version 0.1 is complete when:

1. A new player can create a Vanguard and begin a run without developer intervention.
2. The Vanguard can automatically fight through five floors and the boss floor.
3. At least four enemy families and one two-phase boss are functional.
4. Enemies drop procedurally generated equipment spanning all required slots and rarities.
5. The player can compare, equip, lock, and discard gear while paused.
6. Auto-equip and potion policies visibly affect behavior.
7. A portal token can return the character safely to Emberrest after a channel.
8. Defeat, town return, dungeon resume, and boss victory all function.
9. Save/load restores character, inventory, equipment, settings, and progression.
10. The same seed and inputs reproduce combat and loot results.
11. Content JSON passes schema validation and can change basic balance without recompilation.
12. No player-facing material uses protected names, art, audio, text, or recognizable content from another franchise.
13. GitHub Actions successfully validates and exports the browser build.
14. The latest accepted deployment can be opened and played from its GitHub Pages URL.
15. The running build exposes its version or source commit for useful bug reports.

## 18. Recommended Build Order

1. Headless seeded combat between Vanguard and one enemy.
2. Event-driven visual playback with placeholder animations.
3. Encounter completion and floor advancement.
4. Loot generation, inventory, and equipment stat updates.
5. Retreat, town, defeat, and save/load.
6. Full five-floor content pass.
7. Mummy Queen phases and victory summary.
8. Balance, accessibility, feedback, and content-validation polish.
