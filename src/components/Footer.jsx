function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-6 text-sm text-zinc-500 sm:px-6 sm:py-8 lg:px-8 2xl:max-w-6xl 4xl:max-w-7xl">
        <div className="flex gap-2 sm:gap-4">
          <a href="https://github.com/Barneycle" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex min-h-11 min-w-11 items-center justify-center transition hover:text-lime-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.017c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.801.576C20.565 21.797 24 17.298 24 12c0-6.63-5.37-12-12-12z" /></svg>
          </a>
          <a href="https://linkedin.com/in/alec-campana-501b80321" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex min-h-11 min-w-11 items-center justify-center transition hover:text-lime-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" /></svg>
          </a>
          <a href="mailto:campanaalec@gmail.com" aria-label="Email" className="flex min-h-11 min-w-11 items-center justify-center transition hover:text-lime-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          </a>
        </div>
        <p className="font-mono text-[10px] sm:text-xs">© 2026 Alec Campana</p>
      </div>
    </footer>
  )
}

export default Footer
