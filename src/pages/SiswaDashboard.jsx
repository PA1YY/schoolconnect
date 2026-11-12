import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SiswaDashboard() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function ambilData() {
      try {
        // URL SUDAH DIGANTI KE INFINITYFREE
        const response = await fetch(`https://schoolconnect1.infinityfreeapp.com/api-sidata/index.php?action=get_data_siswa&user_id=${user.id}`)
        const result = await response.json()
        if (result.status === 'success') setData(result.data)
      } catch (error) {
        console.error("Gagal mengambil data", error)
      }
      setLoading(false)
    }
    ambilData()
  }, [user.id])

  if (loading) return <div className="p-10 text-center text-gray-500">Memuat data...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 text-white shadow-lg mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Halo, {user.nama_lengkap}! 👋</h1>
            <p className="text-blue-100">Selamat datang di portal data siswa. Pastikan datamu selalu diperbarui ya.</p>
          </div>
          <div className="text-5xl opacity-50 hidden md:block">🎓</div>
        </div>

        {!data ? (
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">📂</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Data Belum Lengkap</h2>
            <p className="text-gray-500 mb-6">Kamu belum mengisi formulir kondisi orang tua, ekonomi, dan foto rumah.</p>
            <Link to="/siswa/form" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md">
              Isi Formulir Sekarang
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:col-span-1">
              <h3 className="text-gray-500 text-sm font-medium mb-3 flex items-center gap-2"><span>🏠</span> Foto Rumah</h3>
              {data.foto_rumah_url ? (
                <img src={data.foto_rumah_url} alt="Rumah" className="w-full h-48 object-cover rounded-xl border" />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">Belum ada foto</div>
              )}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:col-span-2">
               <h3 className="text-gray-500 text-sm font-medium mb-4">Detail Data Kamu</h3>
               <table className="text-sm w-full">
                 <tbody>
                   <tr><td className="py-2 text-gray-500 w-40">NIS</td><td className="font-medium">: {data.nis || '-'}</td></tr>
                   <tr><td className="py-2 text-gray-500">Kelas</td><td className="font-medium">: {data.kelas || '-'}</td></tr>
                   <tr><td className="py-2 text-gray-500">Status Keluarga</td><td className="font-medium">: {data.status_keluarga || '-'}</td></tr>
                   <tr><td className="py-2 text-gray-500">Kategori Ekonomi</td><td className="font-medium">: {data.kategori_ekonomi || '-'}</td></tr>
                   <tr><td className="py-2 text-gray-500">Alamat</td><td className="font-medium">: {data.alamat_sekarang || '-'}</td></tr>
                 </tbody>
               </table>
               <div className="mt-6 pt-4 border-t text-right">
                 <Link to="/siswa/form" className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Edit Data & Foto</Link>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}