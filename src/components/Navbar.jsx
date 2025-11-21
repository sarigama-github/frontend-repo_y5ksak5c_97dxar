import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Beranda' },
  { to: '/materi', label: 'Materi' },
  { to: '/video', label: 'Video' },
  { to: '/foto', label: 'Foto' },
  { to: '/quiz', label: 'Kuis' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-slate-800 text-xl">Penyuluh Agama</Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="md:hidden">
          {/* Simple mobile menu placeholder */}
          <span className="text-slate-700">≡</span>
        </div>
      </div>
    </header>
  )
}
