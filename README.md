# NumGuessor Web

The web-based version of [NumGuessor](https://github.com/briangor/numguessor) - a number guessing game where the Elder Gods choose a number and your task is to find it.

Built with **React + TypeScript + Vite**. No UI libraries, no Tailwind - plain CSS Modules with a terminal-inspired aesthetic.

🔗 **Live:** [numguessor-web.vercel.app](https://numguessor-web.vercel.app) 

---

## Gameplay

A random number between **1 and 100** is chosen. Use higher/lower hints to narrow it down before your attempts run out.

### Game Modes

| Mode | Description |
|---|---|
| **Limited** | One round of 5 attempts. Guess it or lose. |
| **Unlimited** | Unlimited rounds of 5 attempts each. Keep going until you find it. |

Type `quit` at any guess prompt to return to the main menu.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool and dev server |
| **CSS Modules** | Component-scoped styling |
| **Vercel** | Deployment |

---

## Project Structure

```
numguessor-web/
├── index.html
├── vite.config.ts
├── package.json
└── src/
    ├── main.tsx                  ← entry point
    ├── App.tsx                   ← routes menu ↔ game
    ├── constants/
    │   └── game.ts               ← MIN_NUMBER, MAX_NUMBER, MAX_ATTEMPTS
    ├── types/
    │   └── game.ts               ← shared TypeScript types
    ├── hooks/
    │   └── useNumGuessor.ts      ← all game logic, zero UI
    ├── styles/
    │   ├── globals.css           ← CSS variables, resets, animations
    │   ├── MainMenu.module.css
    │   └── GameScreen.module.css
    └── components/
        ├── MainMenu.tsx
        └── GameScreen.tsx
```

---

## Getting Started

**Requirements:**
- Node.js 18 or higher
- npm 9 or higher

**Run locally:**

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/numguessor-web.git
cd numguessor-web

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Other commands:**

```bash
pnpm run build      # production build → dist/
pnpm run preview    # preview the production build locally
pnpm run lint       # run ESLint
```

---

## Deployment

This project deploys automatically to Vercel on every push to `main`.

To deploy your own instance:

1. Push the repo to GitHub
2. Import it at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite - no configuration needed
4. Click **Deploy**

---

## The NumGuessor Family

| Repo | Platform | Status |
|---|---|---|
| [numguessor](https://github.com/briangor/numguessor) | Desktop (Windows / Linux / macOS) | ✅ Released |
| **numguessor-web** | Browser | ✅ Live |

---

## Version History

| Version | Description |
|---|---|
| `v1.0.0` | Initial release - both game modes, terminal aesthetic |

---

## Planned Features

- Global leaderboard (requires backend - Phase 4)
- Score ranking (e.g. 1 attempt = *God Mode*, 5 = *Close Call*)
- Difficulty settings (adjustable range and attempt limits)
- Hint system (*"You're getting warmer!"*)
- In-game timer

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

---

## Related

- [NumGuessor Desktop](https://github.com/briangor/numguessor) - the original terminal version built in Java

---

## License

This project is licensed under the MIT License.