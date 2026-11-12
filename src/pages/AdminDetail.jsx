import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function AdminDetail() {
  const { id } = useParams()
  const [d, setD] = useState(null)

  useEffect(() => {
    async function load() {
      // URL SUDAH DIGANTI KE INFINITYFREE
      const response = await fetch(`https://schoolconnect1.infinityfreeapp.com/api-sidata/index.php?action=get_detail_siswa&id=${id}`)
      const result = await response.json()
      if (result.status === 'success') setD(result.data)
    }
    load()
  }, [id])

  if (!d) return <p className="p-10 text-center text-gray-500">Memuat data...</p>

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <div>
            <h1 className="text-2xl font-bold">{d.nama_lengkap}</h1>
            <p className="text-blue-100 text-sm mt-1">Detail data dan foto rumah</p>
          </div>
          <Link to="/admin" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">← Kembali</Link>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Informasi Siswa</h2>
            <table className="text-sm w-full">
              <tbody>
                <tr><td className="py-2 text-gray-500 w-32">NIS</td><td className="font-medium">: {d.nis || '-'}</td></tr>
                <tr><td className="py-2 text-gray-500">Kelas</td><td className="font-medium">: {d.kelas || '-'}</td></tr>
                <tr><td className="py-2 text-gray-500">Nama Ayah</td><td className="font-medium">: {d.nama_ayah || '-'}</td></tr>
                <tr><td className="py-2 text-gray-500">Nama Ibu</td><td className="font-medium">: {d.nama_ibu || '-'}</td></tr>
                <tr><td className="py-2 text-gray-500">Ekonomi</td><td className="font-medium">: {d.kategori_ekonomi || '-'}</td></tr>
                <tr><td className="py-2 text-gray-500">Status Keluarga</td><td className="font-medium">: {d.status_keluarga || '-'}</td></tr>
                <tr><td className="py-2 text-gray-500">Alamat</td><td className="font-medium">: {d.alamat_sekarang || '-'}, {d.kota || '-'}</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Foto Rumah</h2>
            {d.foto_rumah_url ? (
              <img src={d.foto_rumah_url} alt="Rumah" className="w-full rounded-xl border object-cover h-64" />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">Belum ada foto</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}