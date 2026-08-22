import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import PmTools from './pages/PmTools'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-dvh flex-col overflow-x-clip bg-zinc-950 text-zinc-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/pm-tools" element={<PmTools />} />
            <Route path="/project-logs" element={<Navigate to="/pm-tools?tab=logs" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
