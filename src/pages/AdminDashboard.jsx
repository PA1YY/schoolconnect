import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [data, setData] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        // URL SUDAH DIGANTI KE INFINITYFREE
        const response = await fetch('https://schoolconnect1.infinityfreeapp.com/api-sidata/index.php?action=get_semua_siswa')
        const result = await response.json()
        if (result.status === 'success') setData(result.data)
      } catch (error) { console.error(error) }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = data.filter(d => (d.nama_lengkap || '').toLowerCase().includes(q.toLowerCase()))

  if (loading) return <div className="p-10 text-center text-gray-500">Memuat data...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Data Siswa</h1>
            <p className="text-gray-500 mt-1">Pantau kondisi ekonomi dan keluarga siswa.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="🔍 Cari nama siswa..." value={q} onChange={e => setQ(e.target.value)} />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                <th className="p-4 font-semibold">Nama Siswa</th>
                <th className="p-4 font-semibold">Kelas</th>
                <th className="p-4 font-semibold">Ekonomi</th>
                <th className="p-4 font-semibold">Status Keluarga</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{d.nama_lengkap}</td>
                  <td className="p-4 text-gray-600">{d.kelas || '-'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      d.kategori_ekonomi === 'Rendah' ? 'bg-red-100 text-red-700' :
                      d.kategori_ekonomi === 'Menengah' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>{d.kategori_ekonomi || '-'}</span>
                  </td>
                  <td className="p-4 text-gray-600">{d.status_keluarga || '-'}</td>
                  <td className="p-4 text-center">
                    <Link to={`/admin/detail/${d.id}`} className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Lihat Detail</Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="5" className="text-center p-6 text-gray-400">Belum ada data siswa</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}