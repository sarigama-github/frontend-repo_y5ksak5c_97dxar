import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Video() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title: '', url: '', description: '' })

  const load = async () => {
    const res = await fetch(`${BASE}/videos`)
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.url) return
    await fetch(`${BASE}/videos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setForm({ title: '', url: '', description: '' })
    load()
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Kumpulan Video</h2>
      <form onSubmit={submit} className="bg-white border rounded p-4 mb-6 space-y-3">
        <input value={form.title} onChange={e=>setForm({ ...form, title:e.target.value })} placeholder="Judul" className="w-full border rounded px-3 py-2" />
        <input value={form.url} onChange={e=>setForm({ ...form, url:e.target.value })} placeholder="URL Video (YouTube/MP4)" className="w-full border rounded px-3 py-2" />
        <input value={form.description} onChange={e=>setForm({ ...form, description:e.target.value })} placeholder="Deskripsi (opsional)" className="w-full border rounded px-3 py-2" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Simpan</button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map(v => (
          <div key={v.id} className="bg-white border rounded p-4 space-y-2">
            <h3 className="font-semibold">{v.title}</h3>
            {v.description && <p className="text-sm text-slate-600">{v.description}</p>}
            {v.url?.includes('youtube.com') || v.url?.includes('youtu.be') ? (
              <iframe className="w-full aspect-video rounded" src={v.url.replace('watch?v=', 'embed/')} allowFullScreen />
            ) : (
              <video src={v.url} controls className="w-full rounded" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
