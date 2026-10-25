# Ocran Strategic Consulting — project kit

Drop these files into the root of the new Next.js repo before the first agent run.

| File | What it's for |
|---|---|
| `AGENTS.md` | Rules every AI agent reads first (stack, structure, hard rules, workflow) |
| `CLAUDE.md` | Points Claude Code at AGENTS.md |
| `.clinerules` / `.clineignore` | Cline (DeepSeek) behaviour + keeps secrets out of context |
| `.env.example` | All env vars the build needs |
| `docs/PROJECT-BRIEF.md` | Positioning, audiences, sitemap, content model, **open questions for the client** |
| `docs/DESIGN.md` | Design system: colours (contrast-checked), type, layout, components |
| `docs/SEO.md` | Technical SEO, structured data, keyword map, content engine, off-site actions |
| `docs/SETUP.md` | Vercel, DNS, free email, Resend, Sanity, Paystack, legal, launch checklist |
| `docs/DEEPSEEK.md` | Model choice, tool setup, prompt template, 12-step build sequence |
| `.agents/skills/*/SKILL.md` | Task playbooks: seo-page, ocran-frontend-design, sanity-content, contact-and-email |
| `docs/SESSION-PROMPT.md` | The one prompt to start every DeepSeek session |
| `docs/PROGRESS.md` / `docs/DECISIONS.md` | Living project memory the agent reads and updates each session |
| `docs/SKILLS.md` | Which third-party design skills to install (and which to skip) |
| `docs/later/` | Parked Phase 2 specs (book sales / Paystack) |
| `public/brand/logo-reference.png` | Supplied logo (raster) — replace with SVG from the client |
