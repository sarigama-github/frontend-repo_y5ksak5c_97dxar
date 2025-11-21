import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Materi from './components/Materi'
import Video from './components/Video'
import Foto from './components/Foto'
import Quiz from './components/Quiz'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materi" element={<Materi />} />
        <Route path="/video" element={<Video />} />
        <Route path="/foto" element={<Foto />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  )
}

export default App
