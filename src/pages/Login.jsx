import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    try {
      // URL SUDAH DIGANTI KE INFINITYFREE
      const response = await fetch('https://schoolconnect1.infinityfreeapp.com/api-sidata/index.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      const result = await response.json()
      
      if (result.status === 'success') {
        localStorage.setItem('user', JSON.stringify(result.data))
        nav(result.data.role === 'admin' ? '/admin' : '/siswa')
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Gagal terhubung ke server InfinityFree. Pastikan koneksi internet stabil.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40"></div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="bg-blue-500/20 p-4 rounded-3xl mb-6 border border-blue-400/30 backdrop-blur-sm shadow-2xl">
            <LogoIcon className="w-16 h-16 text-blue-400" />
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              SchoolConnect
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 font-light leading-relaxed max-w-sm">
            Menghubungkan Sekolah dengan Kondisi Siswa.<br/>
            Pantau data ekonomi, keluarga,<br/>
            dan tempat tinggal secara terpusat.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-gray-100">
          
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="lg:hidden bg-blue-50 p-3 rounded-2xl mb-4">
              <LogoIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Selamat Datang Kembali</h2>
            <p className="text-gray-500 text-sm mt-2">Silakan masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-all" placeholder="Masukkan username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 focus:bg-white transition-all" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-70 mt-2">
              {loading ? 'Memproses...' : 'Masuk Sistem'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500 bg-gray-50 py-2.5 rounded-lg inline-block px-4 font-medium">
              Demo Siswa: <span className="text-blue-600">siswa001 / siswa123</span> <br/> 
              Demo Admin: <span className="text-blue-600">admin / admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}