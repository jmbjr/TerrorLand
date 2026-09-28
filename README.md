# TerrorLand

TerrorLand is a watchable action-RPG autoplayer about guiding an autonomous
adventurer through a dangerous, loot-filled dungeon. The hero handles movement
and combat while the player influences survival through equipment choices,
consumable policies, and carefully timed retreats.

The first playable milestone follows the **Vanguard** through the **Silt
Tombs**, culminating in a battle with the **Mummy Queen**.

## Project Documents

- [Requirements](requirements.md) — vertical-slice scope, systems, technical
  direction, and acceptance criteria.
- [Player Guide](userguide.md) — intended player experience and controls.

## Project Direction

- Built as a dependency-free HTML, CSS, and JavaScript browser game.
- Rules and content stored in editable JSON where practical.
- Designed for autonomous combat with limited, meaningful player intervention.
- Intended for browser export and automated deployment through GitHub Actions.
- Uses original names, lore, visuals, audio, interface, and game content.

## Current Status

Playable prototype: autonomous combat, procedural equipment, retreat, local
save data, and development-time JSON authoring are implemented. GitHub Actions
validates the source and deploys `main` to GitHub Pages.

## Local Development

Serve the repository from a local web server (rather than opening `index.html`
directly) so the browser can load `game.json`:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Authoring mode stores configuration overrides in that browser's local storage.
Use **Export JSON** to create a file suitable for review and later replacement
of `game.json`. The development gate is only a convenience; a static site
cannot securely protect client-side authoring controls.
