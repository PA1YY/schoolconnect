import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SiswaForm() {
  const nav = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(false)
  const [foto, setFoto] = useState(null)
  const [preview, setPreview] = useState('')
  const [form, setForm] = useState({ nis: '', kelas: '', nama_ayah: '', nama_ibu: '', status_keluarga: '', kategori_ekonomi: '', alamat_sekarang: '', kota: '' })
  
  function set(k, v) { setForm({ ...form, [k]: v }) }

  function onFileChange(e) {
    const file = e.target.files[0]
    if (file) { setFoto(file); setPreview(URL.createObjectURL(file)) }
  }

  async function simpan(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('user_id', user.id)
      formData.append('nis', form.nis)
      formData.append('kelas', form.kelas)
      formData.append('nama_ayah', form.nama_ayah)
      formData.append('nama_ibu', form.nama_ibu)
      formData.append('status_keluarga', form.status_keluarga)
      formData.append('kategori_ekonomi', form.kategori_ekonomi)
      formData.append('alamat_sekarang', form.alamat_sekarang)
      formData.append('kota', form.kota)
      if (foto) formData.append('foto_rumah', foto)

      // URL SUDAH DIGANTI KE INFINITYFREE
      const response = await fetch('https://schoolconnect1.infinityfreeapp.com/api-sidata/index.php?action=simpan_siswa', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()

      if (result.status === 'success') {
        alert('Data dan Foto berhasil disimpan!')
        nav('/siswa')
      } else {
        alert('Gagal menyimpan: ' + result.message)
      }
    } catch (error) {
      alert('Terjadi kesalahan koneksi ke server.')
    }
    setLoading(false)
  }

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Formulir Data Siswa</h1>
          <p className="text-blue-100 text-sm mt-1">Lengkapi data dan unggah foto rumah saat ini.</p>
        </div>
        <form onSubmit={simpan} className="p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Data Diri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm text-gray-600 mb-1">NIS</label><input className={inputClass} placeholder="Contoh: 12345678" value={form.nis} onChange={e => set('nis', e.target.value)} /></div>
              <div><label className="block text-sm text-gray-600 mb-1">Kelas</label><input className={inputClass} placeholder="Contoh: X-IPA-1" value={form.kelas} onChange={e => set('kelas', e.target.value)} /></div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Kondisi Orang Tua & Ekonomi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm text-gray-600 mb-1">Nama Ayah</label><input className={inputClass} placeholder="Nama lengkap ayah" value={form.nama_ayah} onChange={e => set('nama_ayah', e.target.value)} /></div>
              <div><label className="block text-sm text-gray-600 mb-1">Nama Ibu</label><input className={inputClass} placeholder="Nama lengkap ibu" value={form.nama_ibu} onChange={e => set('nama_ibu', e.target.value)} /></div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Status Keluarga</label>
                <select className={inputClass} value={form.status_keluarga} onChange={e => set('status_keluarga', e.target.value)}>
                  <option value="">Pilih Status</option><option>Lengkap</option><option>Yatim</option><option>Piatu</option><option>Yatim Piatu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Kategori Ekonomi</label>
                <select className={inputClass} value={form.kategori_ekonomi} onChange={e => set('kategori_ekonomi', e.target.value)}>
                  <option value="">Pilih Kategori</option><option>Rendah</option><option>Menengah</option><option>Tinggi</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Alamat & Foto Rumah</h2>
            <div className="space-y-4">
              <div><label className="block text-sm text-gray-600 mb-1">Alamat Lengkap</label><textarea className={inputClass} rows="2" placeholder="Nama jalan, RT/RW..." value={form.alamat_sekarang} onChange={e => set('alamat_sekarang', e.target.value)} /></div>
              <div><label className="block text-sm text-gray-600 mb-1">Kota/Kabupaten</label><input className={inputClass} placeholder="Contoh: Bandung" value={form.kota} onChange={e => set('kota', e.target.value)} /></div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Foto Rumah Terbaru</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    {preview ? (
                      <img src={preview} alt="Preview Rumah" className="mx-auto h-40 object-cover rounded-lg shadow-sm mb-3" />
                    ) : (
                      <div className="text-4xl text-gray-400 mb-2">📸</div>
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none px-2 py-1">
                        <span>Pilih File Foto</span>
                        <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={onFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG hingga 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t flex justify-end gap-3">
            <button type="button" onClick={() => nav('/siswa')} className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Batal</button>
            <button disabled={loading} type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors">
              {loading ? 'Menyimpan...' : 'Simpan Data & Foto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}