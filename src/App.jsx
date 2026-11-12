import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// PASTIKAN HURUF BESAR/KECILNYA SAMA DENGAN NAMA FILE
import Login from './pages/login'
import SiswaDashboard from './pages/SiswaDashboard'
import SiswaForm from './pages/SiswaForm'
import AdminDashboard from './pages/AdminDashboard'
import AdminDetail from './pages/AdminDetail'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/siswa" element={<ProtectedRoute role="siswa"><><Navbar /><SiswaDashboard /></></ProtectedRoute>} />
        <Route path="/siswa/form" element={<ProtectedRoute role="siswa"><><Navbar /><SiswaForm /></></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><><Navbar /><AdminDashboard /></></ProtectedRoute>} />
        <Route path="/admin/detail/:id" element={<ProtectedRoute role="admin"><><Navbar /><AdminDetail /></></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}