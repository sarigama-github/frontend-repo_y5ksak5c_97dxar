import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Foto() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', image_url: '', caption: '' })

  const load = async () => {
    const res = await fetch(`${BASE}/photos`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.image_url) return
    await fetch(`${BASE}/photos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ title: '', image_url: '', caption: '' })
    load()
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Galeri Foto</h2>

      <form onSubmit={submit} className="bg-white border rounded p-4 mb-6 space-y-3">
        <input value={form.title} onChange={e=>setForm({ ...form, title:e.target.value })} placeholder="Judul" className="w-full border rounded px-3 py-2" />
        <input value={form.image_url} onChange={e=>setForm({ ...form, image_url:e.target.value })} placeholder="URL Gambar" className="w-full border rounded px-3 py-2" />
        <input value={form.caption} onChange={e=>setForm({ ...form, caption:e.target.value })} placeholder="Keterangan (opsional)" className="w-full border rounded px-3 py-2" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Simpan</button>
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(p => (
          <figure key={p.id} className="bg-white border rounded overflow-hidden">
            <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover" />
            <figcaption className="p-3">
              <div className="font-semibold">{p.title}</div>
              {p.caption && <div className="text-sm text-slate-600">{p.caption}</div>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
