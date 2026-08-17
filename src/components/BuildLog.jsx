const phases = [
  {
    phase: 'Phase 1',
    title: 'Planning & Setup',
    status: 'Done',
    description: 'Decided on a static React site over a dynamic backend, weighing hosting cost, maintenance, and load speed. Chose Vite + React + Tailwind CSS v4, structured as a multi-page app with React Router instead of a single scrolling page.',
    items: ['Chose static architecture over dynamic', 'Scaffolded with Vite + React (Oxlint)', 'Configured Tailwind CSS v4 via Vite plugin', 'Decided on multi-page routing structure'],
  },
  {
    phase: 'Phase 2',
    title: 'Global Layout',
    status: 'Done',
    description: 'Built the Navbar and Footer as global components shared across every page, establishing consistent navigation and identity before any page content existed.',
    items: ['Built Navbar with route links + resume button', 'Built Footer with GitHub, LinkedIn, email links', 'Debugged icon library breaking changes (lucide-react v1.0)', 'Wired both into App.jsx as global shell'],
  },
  {
    phase: 'Phase 3',
    title: 'Core Pages',
    status: 'Done',
    description: 'Built out Home, About, Projects, and Skills with real content, iterating on tone, accuracy, and layout based on feedback at each step.',
    items: ['Home: dual dev/PM positioning, centered hero, justified copy', 'About: internship details, onboarding experience, honest project framing', 'Projects: 4 project cards with accurate status badges', 'Skills: grouped categories with color-coded proficiency bars'],
  },
  {
    phase: 'Phase 4',
    title: 'PM Tooling',
    status: 'Done',
    description: 'Built live, working project management tools directly into the site: a drag-and-drop Kanban board and a Gantt chart, sharing the same task data and persisted in local storage.',
    items: ['Kanban board (drag-and-drop, @hello-pangea/dnd)', 'Gantt chart with editable dates and status-colored bars', 'Debugged Tailwind arbitrary-value rendering issue by switching critical layout to inline styles'],
  },
  {
    phase: 'Phase 5',
    title: 'Visual system & launch',
    status: 'In Progress',
    description: 'Full dark-product redesign, then deployment.',
    items: ['Dark product UI with lime accent', 'Trimmed nav: Home / Projects / Tools / Contact', 'Deploy to Vercel', 'QA pass on mobile'],
  },
]

const statusStyles = {
  Done: 'bg-emerald-400/10 text-emerald-400',
  'In Progress': 'bg-lime-400/10 text-lime-400',
  Upcoming: 'bg-zinc-800 text-zinc-500',
}

function BuildLog() {
  return (
    <div className="relative flex flex-col gap-8 border-l border-zinc-800 pl-5 sm:gap-12 sm:pl-8">
      {phases.map((p) => (
        <div key={p.phase} className="relative min-w-0">
          <div className={`absolute top-1 -left-[23px] h-3 w-3 rounded-full border-2 sm:-left-[37px] ${p.status === 'Done' ? 'border-emerald-400 bg-zinc-950' : p.status === 'In Progress' ? 'border-lime-400 bg-zinc-950' : 'border-zinc-600 bg-zinc-950'}`} />
          <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-mono text-xs tracking-wide text-zinc-500 uppercase">{p.phase}</span>
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[p.status]}`}>{p.status}</span>
          </div>
          <h2 className="font-display mb-2 text-lg font-semibold sm:text-xl">{p.title}</h2>
          <p className="mb-4 text-sm text-zinc-400">{p.description}</p>
          <ul className="flex flex-col gap-1.5">
            {p.items.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-zinc-500">
                <span className="shrink-0 text-lime-400/50">—</span>
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default BuildLog
