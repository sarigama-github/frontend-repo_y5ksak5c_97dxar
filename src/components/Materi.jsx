import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Materi() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', category: '' })

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE}/materials`)
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.content) return
    await fetch(`${BASE}/materials`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ title: '', content: '', category: '' })
    load()
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Kumpulan Materi</h2>

      <form onSubmit={submit} className="bg-white border rounded p-4 mb-6 space-y-3">
        <input value={form.title} onChange={e=>setForm({ ...form, title:e.target.value })} placeholder="Judul" className="w-full border rounded px-3 py-2" />
        <input value={form.category} onChange={e=>setForm({ ...form, category:e.target.value })} placeholder="Kategori (opsional)" className="w-full border rounded px-3 py-2" />
        <textarea value={form.content} onChange={e=>setForm({ ...form, content:e.target.value })} rows={4} placeholder="Isi materi" className="w-full border rounded px-3 py-2" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Simpan</button>
      </form>

      {loading ? <p>Memuat...</p> : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(it => (
            <article key={it.id} className="bg-white border rounded p-4">
              <h3 className="font-semibold text-lg">{it.title}</h3>
              {it.category && <span className="text-xs text-slate-500">{it.category}</span>}
              <p className="text-slate-700 mt-2 whitespace-pre-wrap">{it.content}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
