# DEEPSEEK.md — using the DeepSeek API as the coding agent

## 1. Which model (as of Oct 2026 — confirm names/prices in your DeepSeek console)

The old `deepseek-coder`, `deepseek-chat` and `deepseek-reasoner` names are retired. Current API models:

| Model                                                           | Use it for                                                             | Approx. price / 1M tokens (off-peak in → out) |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------- |
| `deepseek-flash` (V4.1 Flash, thinking on, effort low/high/max) | Default for ~80% of work: components, pages, schemas, refactors, tests | $0.15 → $0.60 (cache hits ~$0.003)            |
| `deepseek-v4-pro`                                               | Harder work: checkout + webhook logic, debugging, multi-file refactors | $0.66 → $1.98                                 |

Both: 1M-token context. **Peak hours cost double: 01:00–04:00 and 06:00–10:00 UTC, Mon–Fri.** Ghana is UTC, so
working from 10:00 onwards is the cheap window. Expect the whole build to cost a few dollars of API credit.

Endpoints: OpenAI-compatible `https://api.deepseek.com` · Anthropic-compatible `https://api.deepseek.com/anthropic`.

## 2. Tool setup (pick one)

**A. Cline in VS Code (recommended — GUI, diff review, approve each step)**

1. Install the Cline extension → Settings → API Provider: **DeepSeek** (or "OpenAI Compatible" with the base URL above).
2. Paste API key, model `deepseek-flash`. Create a second profile for `deepseek-v4-pro`.
3. Use **Plan mode** for anything multi-file, then **Act mode** to execute. Keep auto-approve OFF for terminal commands.
4. The repo's `.clinerules` tells Cline to read `AGENTS.md` and the relevant skill each time; `.clineignore` keeps
   `.env*` out of context.

**B. Claude Code CLI pointed at DeepSeek** (if you prefer that agent loop)

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=<deepseek key>
export ANTHROPIC_MODEL=deepseek-flash
claude
```

Claude Code reads `CLAUDE.md` — add one containing `@AGENTS.md` (or symlink `CLAUDE.md → AGENTS.md`).

**C. OpenCode / Aider / Kilo** — all support DeepSeek and read `AGENTS.md` (Aider: `--read AGENTS.md`).

## 3. Division of labour

| Task                                                                                                       | Who                               |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Architecture, design system, homepage design, final review of payments & security, SEO audit               | Claude                            |
| Scaffolding, schemas, page builds from established patterns, content entry scripts, tests, copy formatting | DeepSeek Flash                    |
| Tricky bugs, multi-file refactors                                                                          | DeepSeek Pro → reviewed by Claude |

## 4. Prompt template (paste and fill)

```
Context: Read AGENTS.md and .agents/skills/<skill>/SKILL.md before starting.

Task: <one specific outcome, e.g. "Build /services/[slug] page">

Inputs: <files/components to reuse, Sanity type, design notes>

Constraints:
- Follow AGENTS.md hard rules (server components, tokens only, no PII, no invented copy)
- Only touch: <list paths>
- No new dependencies unless you justify them first

Acceptance criteria:
- <bullet list, testable>
- pnpm lint && pnpm typecheck && pnpm build pass

Output: First a 3-line plan + file list. Wait for my OK. Then implement. End with a summary:
changes, files, TODOs, anything I must do manually.
```

## 5. Build sequence (one prompt / one Cline task each, commit after each green step)

0. Scaffold Next.js + TS + Tailwind v4 + pnpm, ESLint, Prettier, Vitest; add tokens + fonts from DESIGN.md.
1. Base layout: SiteHeader, SiteFooter, Container, Button, Eyebrow, SectionHeading, skip link, 404.
2. Sanity: embedded Studio, all schemas (sanity-content skill), Structure Builder singletons, typegen.
3. `lib/seo.ts`, `<JsonLd/>`, sitemap, robots, llms.txt, OG image template (seo-page skill).
4. Home page sections (ocran-frontend-design skill) — **have Claude design this one; DeepSeek replicates the patterns**.
5. Services + service detail; Industries + industry detail.
6. About (founder, credentials, countries map/list), Publications.
7. Insights list + article page (portable text, TOC, related, author box).
8. Contact form + API + emails (contact-and-email skill).
9. ~~Resources + Brevo gated downloads~~ — on hold (D-016).
10. ~~Books showcase~~ — on hold (D-016).
11. Legal pages, revalidation webhook, analytics.
12. Audit pass: run `web-design-guidelines` + `webapp-testing` screenshots at 375/768/1280, Lighthouse,
    Rich Results, security headers → fix list.

## 6. Getting good results from DeepSeek

- **One task per conversation.** Start fresh for each step; long threads drift. The 1M context is a ceiling, not a target.
- **Keep the prompt prefix stable** (AGENTS.md first) so DeepSeek's context cache kicks in — cache hits are ~50× cheaper.
- **Give it a pattern to copy.** "Build IndustryPage the same way as `app/(site)/services/[slug]/page.tsx`" beats a description.
- **Ask for the plan first**, approve, then execute. Reject plans that touch files outside scope.
- **Paste exact errors**, not paraphrases. For build failures include the full `pnpm build` output.
- **Watch for** outdated Next.js patterns (Pages Router, `getStaticProps`, sync `params`), Tailwind v3 config files,
  invented package APIs. Point it at the docs (`https://nextjs.org/docs` / Context7 MCP if your tool supports it).
- **Review every diff.** Commit after each passing step so bad turns are one `git reset` away.
- Use reasoning effort `high` for logic, `low` for markup/styling tasks.

## 7. Data & security

- DeepSeek's API is operated from China under its own data policy. Don't paste secrets, `.env` files, Paystack keys,
  or client personal data into prompts. The repo contains no PII by design (AGENTS.md rule), which keeps this simple.
- Set a spending limit / small prepaid balance in the DeepSeek console.
- Never let the agent run deploy or DNS commands; you do those.

## 8. Session workflow

Use `docs/SESSION-PROMPT.md` to start every session. Memory lives in `docs/PROGRESS.md` + `docs/DECISIONS.md`,
so each session starts fresh, stays short and cheap, and nothing depends on chat history.
