import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AdminQuiz() {
  const [quizzes, setQuizzes] = useState([])
  const [selected, setSelected] = useState('')
  const [questions, setQuestions] = useState([])
  const [quizForm, setQuizForm] = useState({ title: '', description: '' })
  const [qForm, setQForm] = useState({ text: '', options: ['', ''], correct_index: 0 })

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const loadQuizzes = async () => {
    const res = await fetch(`${BASE}/quizzes`)
    const data = await res.json()
    setQuizzes(data)
  }

  const loadQuestions = async (quizId) => {
    const res = await fetch(`${BASE}/quizzes/${quizId}/questions`)
    const data = await res.json()
    setQuestions(data)
  }

  useEffect(() => { loadQuizzes() }, [])
  useEffect(() => { if (selected) loadQuestions(selected) }, [selected])

  const createQuiz = async (e) => {
    e.preventDefault()
    const res = await fetch(`${BASE}/quizzes`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(quizForm) })
    if (!res.ok) { alert('Gagal membuat kuis, pastikan sudah login'); return }
    const d = await res.json()
    setQuizForm({ title: '', description: '' })
    await loadQuizzes()
    setSelected(d.id)
  }

  const addOption = () => setQForm(v => ({ ...v, options: [...v.options, ''] }))

  const createQuestion = async (e) => {
    e.preventDefault()
    if (!selected) return
    const body = { ...qForm, quiz_id: selected }
    const res = await fetch(`${BASE}/questions`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(body) })
    if (!res.ok) { alert('Gagal menambah pertanyaan, pastikan sudah login'); return }
    setQForm({ text: '', options: ['', ''], correct_index: 0 })
    loadQuestions(selected)
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Kelola Kuis</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Buat Kuis Baru</h3>
            <form onSubmit={createQuiz} className="space-y-2">
              <input value={quizForm.title} onChange={e=>setQuizForm({ ...quizForm, title:e.target.value })} placeholder="Judul kuis" className="w-full border rounded px-3 py-2" />
              <input value={quizForm.description} onChange={e=>setQuizForm({ ...quizForm, description:e.target.value })} placeholder="Deskripsi (opsional)" className="w-full border rounded px-3 py-2" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Simpan</button>
            </form>
          </div>

          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Pilih Kuis</h3>
            <select value={selected} onChange={e=>setSelected(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="">-- pilih --</option>
              {quizzes.map(q => <option key={q.id} value={q.id}>{q.title}</option>)}
            </select>
          </div>
        </div>

        <div>
          {selected ? (
            <div className="space-y-6">
              <div className="bg-white border rounded p-4">
                <h3 className="font-semibold mb-2">Tambah Pertanyaan</h3>
                <form onSubmit={createQuestion} className="space-y-2">
                  <textarea value={qForm.text} onChange={e=>setQForm({ ...qForm, text:e.target.value })} rows={3} placeholder="Teks pertanyaan" className="w-full border rounded px-3 py-2" />
                  {qForm.options.map((op, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input value={op} onChange={e=>setQForm(v => { const options=[...v.options]; options[idx]=e.target.value; return { ...v, options } })} placeholder={`Opsi ${idx+1}`} className="flex-1 border rounded px-3 py-2" />
                      <label className="text-sm flex items-center gap-1">
                        <input type="radio" name="correct" checked={qForm.correct_index===idx} onChange={()=>setQForm(v=>({ ...v, correct_index: idx }))} /> Benar
                      </label>
                    </div>
                  ))}
                  <button type="button" onClick={addOption} className="text-blue-600 text-sm">+ Tambah opsi</button>
                  <div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Tambah Pertanyaan</button>
                  </div>
                </form>
              </div>

              <div className="bg-white border rounded p-4">
                <h3 className="font-semibold mb-4">Pertanyaan</h3>
                <ol className="space-y-3 list-decimal pl-6">
                  {questions.map((q) => (
                    <li key={q.id} className="space-y-2">
                      <div className="font-medium">{q.text}</div>
                      <ul className="list-disc pl-5 text-sm text-slate-700">
                        {q.options.map((op, oi) => (
                          <li key={oi} className={oi===q.correct_index ? 'font-semibold text-green-700' : ''}>{op}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div className="bg-white border rounded p-4">Pilih kuis untuk menambah pertanyaan.</div>
          )}
        </div>
      </div>
    </section>
  )
}
