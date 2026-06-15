import { useParams, useNavigate } from "react-router"
import { Upload, Plus, X } from "lucide-react"
import { MOCK_ALBUMS } from "../data/mock"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { Button } from "../components/ui/button"

export function EditAlbumPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const album = MOCK_ALBUMS.find(a => a.id === id) || MOCK_ALBUMS[0]

  return (
    <div className="flex-1 p-8 overflow-y-auto w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          Editar Álbum
        </h1>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button variant="purple" onClick={() => navigate(-1)}>Salvar Alterações</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Image & Visibility) */}
        <div className="space-y-6">
          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Capa do Álbum</h2>
            <div className="aspect-square rounded-xl overflow-hidden mb-6 border border-white/10">
               <ImageWithFallback src={album.cover} alt="Album Cover" className="w-full h-full object-cover" />
            </div>
            <Button variant="outline" className="w-full gap-2 border-white/10 hover:bg-white/5">
              <Upload className="w-4 h-4" /> Alterar Imagem
            </Button>
            <p className="text-xs text-slate-500 text-center mt-4">Recomendado: 1500x1500px, JPG ou PNG.</p>
          </div>

          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Visibilidade</h2>
            <div className="flex items-center justify-between p-4 bg-[#251d38] rounded-xl border border-white/5">
              <span className="text-sm text-slate-300 font-medium">Público na Musicboxd</span>
              {/* Toggle */}
              <div className="w-10 h-6 bg-[#7b3fe4] rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Metadata) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Metadados Principais</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Título do Álbum</label>
                <input type="text" defaultValue={album.title} className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-[#7b3fe4] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Artista / Banda</label>
                <input type="text" defaultValue={album.artist} className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-[#7b3fe4] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Ano de Lançamento</label>
                <input type="text" defaultValue={album.year} className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-[#7b3fe4] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Gênero</label>
                <select className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-[#7b3fe4] outline-none appearance-none">
                  <option>{album.genre}</option>
                  <option>Rock</option>
                  <option>Pop</option>
                  <option>Jazz</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Lista de Faixas</h2>
              <button className="text-[#7b3fe4] text-sm font-medium flex items-center gap-1 hover:text-[#9b6cf3]">
                <Plus className="w-4 h-4" /> Adicionar Faixa
              </button>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center gap-4 bg-[#251d38] rounded-xl p-3 border border-white/5">
                  <span className="text-xs font-bold text-slate-500 w-6 text-center">0{num}</span>
                  <input type="text" defaultValue={`Faixa ${num}`} className="flex-1 bg-transparent text-sm text-white focus:outline-none" />
                  <input type="text" defaultValue="3:45" className="w-16 bg-transparent text-sm text-slate-400 text-right focus:outline-none" />
                  <button className="text-slate-500 hover:text-red-400 p-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Descrição / Review do Álbum</h2>
            <textarea 
              rows={4}
              placeholder="Escreva sua opinião sobre este álbum..."
              className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-[#7b3fe4] outline-none resize-y"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
