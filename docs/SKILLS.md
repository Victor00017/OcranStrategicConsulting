# SKILLS.md — third-party skills for this project

The article's own advice holds: design skills overlap, and stacking them gives the agent conflicting rules.
This project already has a fixed design direction (`docs/DESIGN.md` + `ocran-frontend-design`), so we only add
skills that bring something we **don't** have: baseline taste, a pre-ship audit, and eyes on the page.

## Install (3 skills)

| Skill                   | Source                                       | Why it's in                                                                                                                                     | When it runs                                   |
| ----------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `frontend-design`       | Anthropic — github.com/anthropics/skills     | Raises baseline taste and stops "AI slop" defaults. Our DESIGN.md already commits the direction, so this one mostly reinforces it               | Any UI work, below our own skill in precedence |
| `web-design-guidelines` | Vercel — github.com/vercel-labs/agent-skills | 100+ checks: focus states, form autocomplete, aria-labels, image dimensions, reduced motion, typography details. Catches what screenshots don't | Pre-ship and after each page is built          |
| `webapp-testing`        | Anthropic — github.com/anthropics/skills     | Playwright: open the page, screenshot at 375/768/1280, click through the contact form, read console errors                                      | After each page, and in the audit step         |

```bash
# from the repo root — installs into the project so the whole team/agent gets them
npx skills add anthropics/skills --skill frontend-design
npx skills add anthropics/skills --skill webapp-testing
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
```

Claude Code alternative: `/plugin install frontend-design@claude-plugins-official`.

**DeepSeek in Cline:** the `npx skills` CLI can target several agents. If your Cline version doesn't auto-load
skills, that's fine — `AGENTS.md` §8 points the agent to each SKILL.md by path, so it reads it on demand.

**Before installing anything**: open the repo and skim the SKILL.md and any scripts. A skill is instructions plus
code your agent will run on your machine, so treat it like any other dependency.

## Skipped (and why)

| Skill                                | Why not, for this site                                                                                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI UX Pro Max / Taste Skill          | Style engines. They'd propose their own palette/fonts and fight DESIGN.md. Useful when you _don't_ have a direction yet — we do                           |
| Interface Design                     | Saves design decisions to `.interface-design/system.md`. We already have that in `docs/DESIGN.md` — a second system file means two sources of truth       |
| Impeccable                           | Good critique/polish commands, but overlaps with `web-design-guidelines` + our skill's self-review. Revisit if you want a structured design-critique pass |
| Emil Kowalski's skills               | Excellent for app-like motion (modals, drawers, toasts). This is an editorial site with minimal motion — add `review-animations` only if motion grows     |
| shadcn/ui skill                      | We use shadcn for 2–3 primitives only (dialog, sheet, accordion). Add it if that changes                                                                  |
| "AgentsKit" (89 agents, 122 skills…) | The opposite of what you want: dozens of overlapping instructions competing for the agent's attention                                                     |

## Reuse at the studio level

The **project-specific** skills (`ocran-frontend-design`, `seo-page`, `sanity-content`, `contact-and-email`) are
templates for future Stramotion builds: copy them, swap the brand section of `ocran-frontend-design` and the
content model in `sanity-content`, keep the rest.
