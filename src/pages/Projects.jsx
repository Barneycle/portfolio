import { Link } from 'react-router-dom'

const projects = [
  {
    title: 'PM Tools — Kanban & Gantt',
    status: 'Completed',
    description: 'A live, working set of project management tools built directly into this site: a drag-and-drop Kanban board and a Gantt chart, sharing the same task data and persisted in local storage.',
    tech: ['React', '@hello-pangea/dnd', 'Tailwind CSS'],
    github: 'https://github.com/Barneycle/portfolio',
    to: '/pm-tools',
  },
  {
    title: 'GanApp',
    status: 'In Progress',
    description: 'A cross-platform event management system built solo, covering event creation, scheduling, and attendee coordination.',
    tech: ['React', 'React Native', 'Supabase', 'Tailwind / NativeWind'],
    github: 'https://github.com/Barneycle/GanApp',
  },
  {
    title: 'HCI2 Project Evaluation',
    status: 'Completed',
    description: 'Final project for Human-Computer Interaction 2, focused on usability evaluation and interface design principles.',
    tech: ['React', 'Vite'],
    github: 'https://github.com/Barneycle/hci2ProjectEvaluation',
    live: 'https://hci2-project-evaluation.vercel.app/',
  },
  {
    title: 'Inventory Ticketing System',
    status: 'Prototype',
    description: 'A prototype inventory and ticketing tool started during my internship at Aretex. Development was paused before completion, but the core structure and logic are in place.',
    tech: ['React', 'Node.js'],
    github: 'https://github.com/Barneycle/InventoryTicketingSystem',
  },
  {
    title: 'GameThrough',
    status: 'In Progress',
    description: 'A game walkthrough site in the style of IGN or GameFAQs, built to practice component structure and page layout. Content is sourced from IGN for demo purposes only and is not intended for public or commercial use.',
    tech: ['React', 'Vite'],
    github: 'https://github.com/Barneycle/GameThrough',
  },
]

const statusStyles = {
  Completed: 'bg-emerald-400/10 text-emerald-400',
  Prototype: 'bg-zinc-800 text-zinc-400',
  'In Progress': 'bg-lime-400/10 text-lime-400',
}

function ProjectCard({ project }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4">
        <h2 className="font-display min-w-0 text-lg font-semibold sm:text-xl">{project.title}</h2>
        <span className={`rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${statusStyles[project.status]}`}>{project.status}</span>
      </div>

      <p className="text-sm text-zinc-400">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="rounded-md bg-zinc-800 px-2 py-1 font-mono text-[10px] text-zinc-400 sm:text-xs">{t}</span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm font-medium">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-lime-400 hover:decoration-lime-400">
          GitHub
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-lime-400 hover:decoration-lime-400">
            Live Demo
          </a>
        )}
        {project.to && (
          <Link to={project.to} className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition hover:text-lime-400 hover:decoration-lime-400">
            Open
          </Link>
        )}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 2xl:max-w-6xl 2xl:py-32 4xl:max-w-7xl">
      <p className="mb-3 text-center font-mono text-xs tracking-widest text-lime-400 uppercase">Work</p>
      <h1 className="font-display mb-8 text-center text-[clamp(1.75rem,4vw,3.5rem)] font-bold tracking-tight sm:mb-12">Projects</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 3xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
