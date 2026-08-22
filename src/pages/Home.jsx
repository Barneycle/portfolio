import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const roles = ['Frontend Developer', 'Mobile Developer', 'Aspiring Project Manager']
const techStack = ['React', 'React Native', 'Vite', 'Tailwind CSS', 'Node.js', 'Supabase', 'PostgreSQL', 'MongoDB', 'Git', 'Jira', 'JumpCloud', 'Google Workspace']

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'HTML/CSS', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Vite', level: 4 },
      { name: 'React Native', level: 3 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Supabase', level: 3 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'MongoDB', level: 3 },
      { name: 'Node.js', level: 2 },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 4 },
      { name: 'GitHub', level: 4 },
      { name: 'Jira / Jira Assets', level: 3 },
      { name: 'JumpCloud', level: 3 },
      { name: 'Google Workspace', level: 4 },
    ],
  },
  {
    category: 'PM / Coordination',
    skills: [
      { name: 'Scope & Prioritization', level: 3 },
      { name: 'Timeline Tracking', level: 3 },
      { name: 'Ticket Triage', level: 3 },
      { name: 'Device & Asset Management', level: 4 },
      { name: 'Stakeholder Communication', level: 3 },
    ],
  },
]

const stats = [
  { value: '486h', label: 'IT Support intern, Aretex' },
  { value: "Dean's Lister", label: 'BSIT, Partido State University' },
  { value: 'VP', label: 'Peer Facilitator Group, 2022–23' },
  { value: 'Remote', label: 'Open to either track' },
]

const contacts = [
  {
    label: 'Email',
    value: 'campanaalec@gmail.com',
    href: 'mailto:campanaalec@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'alec-campana',
    href: 'https://linkedin.com/in/alec-campana-501b80321',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'Barneycle',
    href: 'https://github.com/Barneycle',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.017c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.801.576C20.565 21.797 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
]

function SkillBar({ level }) {
  return (
    <div className="flex shrink-0 gap-0.5 sm:gap-1" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((segment) => (
        <div
          key={segment}
          className={`h-1.5 w-2.5 rounded-full sm:w-4 md:w-5 ${segment <= level ? 'bg-lime-400' : 'bg-zinc-800'}`}
        />
      ))}
    </div>
  )
}

function TypingRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 1200)
      return () => clearTimeout(pause)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setRoleIndex((roleIndex + 1) % roles.length)
      return
    }

    const speed = deleting ? 40 : 80
    const timeout = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  return (
    <span className="font-mono text-[clamp(0.9rem,2.8vw,1.5rem)] text-lime-400">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}

function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <>
      <section id="home" className="animate-fade-up mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 2xl:max-w-4xl 2xl:py-32 4xl:max-w-5xl">
        <div className="mb-6 flex max-w-full items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-2.5 py-1 sm:mb-8 sm:px-3 sm:py-1.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
          </span>
          <span className="font-mono text-[10px] text-lime-400 sm:text-xs">OPEN TO REMOTE WORK</span>
        </div>

        <h1 className="font-display mb-3 text-center text-[clamp(2rem,8vw,6rem)] leading-tight font-bold tracking-tight text-balance">
          Alec Campana
        </h1>

        <p className="mb-6 min-h-8 px-1 text-center sm:mb-8">
          <TypingRole />
        </p>

        <p className="mb-8 max-w-xl text-center text-[clamp(0.9rem,2vw,1.25rem)] text-zinc-400 sm:mb-10">
          I coordinate IT work and ship software on my own — scoping features,
          tracking timelines, and changing the plan when the first approach
          hits a wall. Currently open to remote roles in development or
          project coordination.
        </p>

        <div className="mb-12 flex w-full max-w-md flex-col gap-3 sm:mb-16 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            to="/projects"
            className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-lime-400 px-6 py-3 font-medium text-zinc-950 transition hover:bg-lime-300"
          >
            View Projects <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/#contact"
            className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-zinc-200 transition hover:border-lime-400 hover:text-lime-400"
          >
            Contact Me
          </Link>
        </div>

        <div className="w-full overflow-hidden border-y border-zinc-800 py-3 sm:py-4">
          <div className="animate-marquee flex gap-8 whitespace-nowrap">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="font-mono text-[10px] text-zinc-500 sm:text-xs">
                <span className="mr-8 text-lime-400/50">/</span>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-t border-zinc-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 2xl:py-32">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[minmax(0,1fr)_200px] md:gap-12 xl:grid-cols-[minmax(0,1fr)_240px] 2xl:max-w-6xl 4xl:max-w-7xl">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-[clamp(1.125rem,2vw,1.75rem)] tracking-wider text-lime-400 uppercase">About</p>
            <h2 className="font-display mb-6 text-[clamp(1.5rem,3vw,2.75rem)] font-bold tracking-tight text-balance sm:mb-8">Built to ship, and to keep the work organized.</h2>
            <div className="flex flex-col gap-5 text-[clamp(0.9rem,1.5vw,1.125rem)] text-zinc-400">
              <p>
                I'm a BSIT graduate and Dean's Lister from Partido State
                University in Goa, Camarines Sur. I build frontend and mobile
                apps, and I care as much about scoping, tracking, and
                coordinating the work as I do about the code — the same
                discipline I used to plan and deliver projects on my own,
                without a team or close supervision.
              </p>
              <p>
                During 486 hours as an IT Support Intern at Aretex in Makati,
                I triaged support tickets and coordinated assignment with the
                team lead, monitored company email in Microsoft Defender for
                phishing, and migrated IT asset records from spreadsheets into
                Jira Assets with light automation. I set up and reformatted
                company laptops (Windows 11, BIOS, updates, and required
                apps), tracked laptops, monitors, and peripherals as they were
                issued or returned, and bound user accounts to devices in
                JumpCloud — running existing scripts, with account changes
                made under the team lead's permission. I also logged those
                hours in the team's Google Sheets tracker so supervisors
                always had current visibility.
              </p>
              <p>
                Independently, I scoped and built GanApp, a cross-platform
                event management app. When PDF generation broke, I redesigned
                the flow around PNG-to-PDF conversion so the deliverable still
                shipped. I also planned the licensing path for an inventory
                ticketing prototype, phasing from an open license toward a
                commercial one once it was production-ready — forward planning
                past the build itself.
              </p>
              <p>
                On campus I was Vice President of the Peer Facilitator Group
                (2022–2023), coordinating schedules and communication among
                student volunteers, and a representative for Nextgen
                Information Technology Enthusiasts (2022–2024). I'm currently
                open to remote roles in frontend/mobile development or project
                coordination, and this site itself is a working example of
                both.
              </p>
              <p className="text-zinc-500 italic">
                Outside of work, I'm usually cooking something or playing video
                games.
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
            <p className="mb-4 font-mono text-xs tracking-widest text-zinc-500 uppercase">Snapshot</p>
            <dl className="grid grid-cols-2 gap-4 md:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dt className="font-display text-base font-semibold text-zinc-100 sm:text-lg">{stat.value}</dt>
                  <dd className="text-xs text-zinc-500 sm:text-sm">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 border-t border-zinc-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 2xl:py-32">
        <div className="mx-auto max-w-5xl 2xl:max-w-6xl 4xl:max-w-7xl">
          <p className="mb-3 text-center font-mono text-[clamp(1.125rem,2vw,1.75rem)] tracking-wider text-lime-400 uppercase">Skills</p>
          <h2 className="font-display mb-2 text-center text-[clamp(1.5rem,3vw,2.75rem)] font-bold tracking-tight text-balance">Two lanes, one system</h2>
          <p className="mb-8 text-center text-sm text-zinc-500 sm:mb-12 sm:text-base">Development on one side, coordination on the other.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 4xl:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.category} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
                <h3 className="mb-5 font-medium text-zinc-100">{group.category}</h3>
                <div className="flex flex-col gap-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex min-w-0 items-center justify-between gap-3">
                      <span className="min-w-0 truncate text-sm text-zinc-400">{skill.name}</span>
                      <SkillBar level={skill.level} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-zinc-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 2xl:py-32">
        <div className="mx-auto w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center sm:p-8 2xl:max-w-2xl">
          <p className="mb-3 font-mono text-[clamp(1.125rem,2vw,1.75rem)] tracking-wider text-lime-400 uppercase">Contact</p>
          <h2 className="font-display mb-3 text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight text-balance">Let's work together</h2>
          <p className="mb-6 text-sm text-zinc-500 sm:mb-8 sm:text-base">Open to remote frontend/mobile developer and project coordination roles.</p>
          <div className="flex flex-col gap-3 text-left">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
                className="group flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-3 no-underline transition duration-200 hover:-translate-y-0.5 hover:border-lime-400 hover:bg-lime-400/10 focus-visible:border-lime-400 focus-visible:outline-none sm:gap-4 sm:px-4 sm:py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 transition duration-200 group-hover:border-lime-400/40 group-hover:text-lime-400 sm:h-10 sm:w-10">
                  {contact.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] tracking-wider text-zinc-500 uppercase sm:text-xs">{contact.label}</span>
                  <span className="block truncate text-sm text-zinc-200 transition duration-200 group-hover:text-lime-400">{contact.value}</span>
                </span>
                <span className="hidden text-zinc-600 transition duration-200 group-hover:translate-x-1 group-hover:text-lime-400 sm:inline-block" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
