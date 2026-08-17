import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/pm-tools', label: 'Tools' },
  { to: '/#contact', label: 'Contact' },
]

function isActive(to, pathname, hash) {
  if (to === '/') return pathname === '/' && hash !== '#contact'
  if (to === '/#contact') return pathname === '/' && hash === '#contact'
  if (to === '/pm-tools') return pathname === '/pm-tools' || pathname === '/project-logs'
  return pathname === to
}

function MenuIcon({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function Navbar() {
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 2xl:max-w-6xl 4xl:max-w-7xl">
        <Link to="/" className="font-display shrink-0 text-base font-semibold tracking-tight sm:text-lg 4xl:text-xl">
          Alec<span className="text-lime-400">.</span>Dev
        </Link>

        <div className="hidden items-center gap-4 text-sm lg:flex xl:gap-6 4xl:text-base">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition ${
                isActive(link.to, pathname, hash)
                  ? 'text-lime-400'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-lime-400 px-4 py-2 font-medium text-zinc-950 transition hover:bg-lime-300"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-zinc-300 hover:bg-zinc-900 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-zinc-800 px-4 py-3 sm:px-6 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`min-h-11 rounded-md px-2 py-3 text-sm ${
                isActive(link.to, pathname, hash)
                  ? 'text-lime-400'
                  : 'text-zinc-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 min-h-11 rounded-md bg-lime-400 px-4 py-3 text-center text-sm font-medium text-zinc-950"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
