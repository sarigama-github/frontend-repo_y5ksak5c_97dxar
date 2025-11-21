export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Media Dakwah & Pembelajaran Agama
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Kumpulkan materi, video, foto kegiatan, dan buat kuis interaktif untuk jamaah atau pelajar.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/materi" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Mulai Belajar</a>
            <a href="/quiz" className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded">Coba Kuis</a>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 border border-slate-200">
          <ul className="space-y-3 text-slate-700">
            <li>• Manajemen materi teks</li>
            <li>• Daftar video (YouTube/MP4)</li>
            <li>• Galeri foto</li>
            <li>• Kuis tanya jawab skoring otomatis</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
