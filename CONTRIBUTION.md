# Contributing to NumGuessor Web

Thank you for your interest in contributing! Whether it is a bug fix, a new feature, a styling improvement, or a documentation update - all contributions are welcome.

---

## Prerequisites

Make sure you have the following before starting:

- Node.js 18 or higher
- npm 9 or higher
- A working knowledge of React and TypeScript

---

## Getting Started

**1. Fork the repository**

Click the **Fork** button at the top right of the repo page on GitHub.

**2. Clone your fork**

```bash
git clone https://github.com/YOUR-USERNAME/numguessor-web.git
cd numguessor-web
```

**3. Install dependencies**

```bash
pnpm install
```

**4. Start the dev server**

```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) and verify everything runs correctly before making any changes.

**5. Create a branch**

Always work on a new branch - never directly on `main`:

```bash
git checkout -b type/short-description
```

Branch naming examples:

| Type | Example |
|---|---|
| Bug fix | `fix/input-validation-error` |
| New feature | `feat/difficulty-settings` |
| Styling | `style/mobile-layout` |
| Documentation | `docs/update-readme` |
| Refactor | `refactor/extract-game-hook` |

---

## Project Structure - Know Before You Change

```
src/
├── constants/game.ts        ← MIN_NUMBER, MAX_NUMBER, MAX_ATTEMPTS
│                               Change here to affect the entire game
├── types/game.ts            ← Shared TypeScript types
│                               Add new types here, not inside components
├── hooks/useNumGuessor.ts   ← ALL game logic lives here
│                               No UI code belongs in this file
├── styles/
│   ├── globals.css          ← CSS variables and shared animations
│   ├── MainMenu.module.css  ← Scoped to MainMenu only
│   └── GameScreen.module.css← Scoped to GameScreen only
└── components/
    ├── MainMenu.tsx         ← Mode selection UI only
    └── GameScreen.tsx       ← Guessing UI only
```

**Key rules:**
- Game logic belongs in `useNumGuessor.ts` - not in components
- New shared types belong in `types/game.ts` - not inline
- New constants belong in `constants/game.ts` - never hardcoded in components
- Each component owns its CSS Module - do not share module files between components

---

## Making Changes

- Keep changes focused - one branch per fix or feature
- Follow the existing code style (no semicolons in TS, consistent naming)
- Do not introduce UI libraries or CSS frameworks - this project uses plain CSS Modules only
- Do not add unnecessary dependencies - keep `package.json` lean
- Test both game modes manually before submitting
- Verify the production build passes before opening a PR:

```bash
pnpm run build
```

---

## Commit Message Format

```
type: short description in present tense
```

| Type | When to use |
|---|---|
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `style` | CSS or visual changes with no logic change |
| `refactor` | Code restructuring with no behaviour change |
| `docs` | Documentation changes only |
| `chore` | Build config, dependencies, tooling |

**Examples:**
```
feat: add difficulty settings with adjustable number range
fix: prevent duplicate guess submission on double-click
style: improve attempt dots animation on mobile
refactor: extract guess validation into separate utility
docs: add project structure section to README
chore: upgrade Vite to v5.4
```

---

## Submitting a Pull Request

**1. Push your branch**

```bash
git push origin feat/your-feature-name
```

**2. Open a Pull Request on GitHub**

Go to the original `numguessor-web` repo and click **"Compare & pull request"**.

**3. Fill in the PR description**

Describe what your change does and why. If it fixes a bug, reference the issue:

```
Fixes #7 - prevented form submission when input is empty

Changes:
- Added empty input guard in handleSubmit
- Added error message feedback for empty submission
```

**4. Wait for review**

The maintainer will review and either approve, request changes, or leave comments.

---

## Styling Guidelines

This project uses a deliberate **terminal / CRT aesthetic**. When contributing styles:

- Use CSS variables defined in `globals.css` - never hardcode colours
- Keep the dark background, phosphor green palette intact
- Animations should feel snappy - nothing longer than `400ms`
- Do not introduce external icon libraries - use Unicode symbols as the existing code does
- Test on both desktop and mobile viewport widths

**Available CSS variables:**

```css
--bg          /* page background      */
--surface     /* card/input background */
--border      /* default border colour */
--green       /* primary accent        */
--green-dim   /* dimmed green          */
--amber       /* warning colour        */
--red         /* error / lower hint    */
--text        /* primary text          */
--text-dim    /* secondary text        */
--font-mono   /* monospace font stack  */
--transition  /* standard duration     */
```

---

## Versioning

NumGuessor Web follows [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH
```

| Change type | Version bump |
|---|---|
| Bug fixes, typos, style tweaks | `PATCH` → e.g. `1.0.1` |
| New features | `MINOR` → e.g. `1.1.0` |
| Breaking changes or full rewrite | `MAJOR` → e.g. `2.0.0` |

You do not need to update the version yourself - that is handled by the maintainer at release time.

---

## Planned Features (Good First Contributions)

Looking for something to work on? These are already on the roadmap:

- [ ] Difficulty settings (adjustable number range and attempt limits)
- [ ] Score ranking system (e.g. *God Mode*, *Close Call*)
- [ ] Hint system (*"You're getting warmer!"*)
- [ ] In-game timer
- [ ] Mobile layout improvements
- [ ] Keyboard shortcut for mode selection on main menu
- [ ] Global leaderboard (requires backend - coordinate first)

---

## Questions

If you are unsure about anything - a design decision, whether a feature fits the project, or how something works - open a [GitHub Issue](../../issues) before starting work. It is always better to discuss first.