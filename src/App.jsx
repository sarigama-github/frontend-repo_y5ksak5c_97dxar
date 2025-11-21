import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Materi from './components/Materi'
import Video from './components/Video'
import Foto from './components/Foto'
import Quiz from './components/Quiz'
import Login from './components/Login'
import AdminGuard from './components/AdminGuard'
import AdminMateri from './components/AdminMateri'
import AdminQuiz from './components/AdminQuiz'

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
        <Route path="/login" element={<Login />} />

        <Route path="/admin/materi" element={<AdminGuard><AdminMateri /></AdminGuard>} />
        <Route path="/admin/quiz" element={<AdminGuard><AdminQuiz /></AdminGuard>} />
      </Routes>
    </div>
  )
}

export default App
