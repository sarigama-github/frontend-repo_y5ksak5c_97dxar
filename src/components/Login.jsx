import { useState } from 'react'

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Login() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      if (!res.ok) {
        const d = await res.json().catch(()=>({ detail:'Login gagal' }))
        throw new Error(d.detail || 'Login gagal')
      }
      const data = await res.json()
      localStorage.setItem('token', data.token)
      window.location.href = '/'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Masuk Admin</h2>
      <form onSubmit={submit} className="bg-white border rounded p-4 space-y-3">
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password admin" className="w-full border rounded px-3 py-2" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60">{loading ? 'Memproses...' : 'Masuk'}</button>
      </form>
    </section>
  )
}
