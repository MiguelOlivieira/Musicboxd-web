import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router"
import { X, Star, Image as ImageIcon, Calendar, Smile, Tag } from "lucide-react"
import { MOCK_ALBUMS } from "../data/mock"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { Button } from "../components/ui/button"

export function CreateReviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const album = MOCK_ALBUMS.find(a => a.id === id) || MOCK_ALBUMS[0]

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [listenDate, setListenDate] = useState(new Date().toISOString().split('T')[0])
  const [isRelisten, setIsRelisten] = useState(false)
  const [isSpoiler, setIsSpoiler] = useState(false)
  const [tags, setTags] = useState<string[]>([])

  const availableTags = [
    "Obra-Prima", "Viciante", "Relaxante", "Energético", "Emotivo",
    "Inovador", "Atmosférico", "Pesado", "Melódico", "Experimental"
  ]

  const toggleTag = (tag: string) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de salvar a avaliação
    navigate(`/album/${id}`)
  }

  const displayRating = hoveredRating || rating

  return (
    <div className="flex-1 overflow-y-auto bg-[#13111c]">
      <div className="max-w-4xl mx-auto p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Criar Avaliação</h1>
          <Link to={`/album/${id}`}>
            <button className="text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </Link>
        </div>

        {/* Album Info Card */}
        <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6 mb-8 flex items-center gap-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg shrink-0 border border-white/5">
            <ImageWithFallback src={album.cover} alt={album.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white truncate">{album.title}</h2>
            <p className="text-slate-400 text-lg">{album.artist}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
              <span>{album.year}</span>
              <span>•</span>
              <span>{album.genre}</span>
              <span>•</span>
              <span>{album.duration}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating Section */}
          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-8">
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-6">
              Sua Avaliação *
            </label>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-12 h-12 transition-all ${
                        star <= displayRating
                          ? "fill-[#7b3fe4] text-[#7b3fe4]"
                          : "fill-transparent text-slate-600 hover:text-slate-500"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white">
                  {displayRating > 0 ? displayRating : "—"}
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  {displayRating === 0 && "Selecione"}
                  {displayRating === 1 && "Ruim"}
                  {displayRating === 2 && "Mediano"}
                  {displayRating === 3 && "Bom"}
                  {displayRating === 4 && "Muito Bom"}
                  {displayRating === 5 && "Obra-Prima"}
                </span>
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-8">
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-4">
              Escreva sua Opinião
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="O que você achou deste álbum? Compartilhe suas impressões, faixas favoritas, momentos marcantes..."
              rows={8}
              className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#7b3fe4] focus:ring-2 focus:ring-[#7b3fe4]/20 resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <button type="button" className="text-slate-400 hover:text-white transition-colors p-2">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button type="button" className="text-slate-400 hover:text-white transition-colors p-2">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <span className="text-xs text-slate-500">
                {reviewText.length} / 10000 caracteres
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-8 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Detalhes da Escuta</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Data da Escuta
                </label>
                <input
                  type="date"
                  value={listenDate}
                  onChange={(e) => setListenDate(e.target.value)}
                  className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#7b3fe4] focus:ring-2 focus:ring-[#7b3fe4]/20"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isRelisten}
                    onChange={(e) => setIsRelisten(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/10 bg-[#251d38] checked:bg-[#7b3fe4] checked:border-[#7b3fe4] focus:ring-2 focus:ring-[#7b3fe4]/20 focus:outline-none transition-all"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white">Esta é uma reescuta</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isSpoiler}
                    onChange={(e) => setIsSpoiler(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/10 bg-[#251d38] checked:bg-[#7b3fe4] checked:border-[#7b3fe4] focus:ring-2 focus:ring-[#7b3fe4]/20 focus:outline-none transition-all"
                  />
                  <span className="text-sm text-slate-300 group-hover:text-white">Contém spoilers</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-8">
            <label className="block text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4" /> Tags (Opcional)
            </label>
            <p className="text-sm text-slate-400 mb-6">
              Adicione tags para descrever melhor sua experiência com este álbum
            </p>
            <div className="flex flex-wrap gap-3">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tags.includes(tag)
                      ? "bg-[#7b3fe4] text-white shadow-lg shadow-[#7b3fe4]/30"
                      : "bg-[#251d38] text-slate-400 hover:text-white hover:bg-[#2d2340] border border-white/5"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Privacidade</h3>
            <div className="space-y-3">
              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl hover:bg-white/5 transition-colors">
                <input
                  type="radio"
                  name="privacy"
                  defaultChecked
                  className="mt-0.5 w-5 h-5 text-[#7b3fe4] border-white/10 bg-[#251d38] focus:ring-2 focus:ring-[#7b3fe4]/20"
                />
                <div className="flex-1">
                  <div className="text-white font-medium">Pública</div>
                  <div className="text-xs text-slate-400 mt-1">Todos podem ver sua avaliação</div>
                </div>
              </label>

              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl hover:bg-white/5 transition-colors">
                <input
                  type="radio"
                  name="privacy"
                  className="mt-0.5 w-5 h-5 text-[#7b3fe4] border-white/10 bg-[#251d38] focus:ring-2 focus:ring-[#7b3fe4]/20"
                />
                <div className="flex-1">
                  <div className="text-white font-medium">Apenas Seguidores</div>
                  <div className="text-xs text-slate-400 mt-1">Somente quem te segue pode ver</div>
                </div>
              </label>

              <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl hover:bg-white/5 transition-colors">
                <input
                  type="radio"
                  name="privacy"
                  className="mt-0.5 w-5 h-5 text-[#7b3fe4] border-white/10 bg-[#251d38] focus:ring-2 focus:ring-[#7b3fe4]/20"
                />
                <div className="flex-1">
                  <div className="text-white font-medium">Privada</div>
                  <div className="text-xs text-slate-400 mt-1">Apenas você pode ver esta avaliação</div>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              type="submit"
              variant="purple"
              disabled={rating === 0}
              className="flex-1 py-6 text-base font-semibold shadow-lg shadow-[#7b3fe4]/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publicar Avaliação
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/album/${id}`)}
              className="px-8 py-6 bg-[#1a1625] border-white/10 hover:bg-white/5"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
