import { Link, NavLink } from 'react-router-dom'

const navPublic = [
  { to: '/', label: 'Beranda' },
  { to: '/materi', label: 'Materi' },
  { to: '/video', label: 'Video' },
  { to: '/foto', label: 'Foto' },
  { to: '/quiz', label: 'Kuis' },
]

export default function Navbar() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-slate-800 text-xl">Penyuluh Agama</Link>
        <nav className="hidden md:flex items-center gap-6">
          {navPublic.map((item) => (
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
          {token ? (
            <>
              <NavLink to="/admin/materi" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>Tambah Materi</NavLink>
              <NavLink to="/admin/quiz" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>Tambah Kuis</NavLink>
              <button onClick={()=>{ localStorage.removeItem('token'); window.location.href='/' }} className="text-sm text-slate-600 hover:text-slate-900">Keluar</button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>Login</NavLink>
          )}
        </nav>
        <div className="md:hidden">
          <span className="text-slate-700">≡</span>
        </div>
      </div>
    </header>
  )
}
