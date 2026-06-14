import { useParams, Link } from "react-router"
import { CheckCircle2, ListPlus, Heart, ListMusic, FileText, BadgeCheck, Edit2 } from "lucide-react"
import { MOCK_ALBUMS } from "../data/mock"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { StarRating } from "../components/ui/StarRating"
import { Button } from "../components/ui/Button"

export function AlbumPage() {
  const { id } = useParams()
  // Just use the first mock album for layout purposes if ID not found
  const album = MOCK_ALBUMS.find(a => a.id === id) || MOCK_ALBUMS[0]

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#4a3424] to-[#13111c]">
      <div className="max-w-6xl mx-auto p-8 lg:p-12">
        {/* Top Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start">
          {/* Cover Art */}
          <div className="w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden shadow-2xl shrink-0 mx-auto lg:mx-0 border-4 border-white/5 bg-white/10">
            <ImageWithFallback src={album.cover} alt={album.title} className="w-full h-full object-cover" />
          </div>

          {/* Info & Actions */}
          <div className="flex-1 w-full pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs tracking-widest uppercase">
                 <BadgeCheck className="w-4 h-4" /> ÁLBUM DO MÊS
              </div>
              <Link to={`/album/${album.id}/edit`}>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white gap-2">
                  <Edit2 className="w-4 h-4" /> Editar
                </Button>
              </Link>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-4 tracking-tight">{album.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-lg text-slate-300 font-medium mb-10">
              <span className="text-white font-bold">{album.artist}</span>
              <span>•</span>
              <span>{album.year}</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-full border border-slate-600 text-xs tracking-widest">{album.genre.toUpperCase()}</span>
              <span>•</span>
              <span>{album.duration}</span>
            </div>

            {/* Action Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm max-w-2xl">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avalie este álbum</span>
                <Link to={`/album/${album.id}/review`}>
                  <StarRating rating={0} className="scale-125 origin-left text-slate-500 hover:text-[#7b3fe4] cursor-pointer transition-colors" />
                </Link>
              </div>
              
              <div className="w-px h-16 bg-white/10 hidden md:block" />

              <div className="flex-1 flex flex-col gap-3 w-full">
                <Link to={`/album/${album.id}/review`} className="w-full">
                  <Button variant="purple" className="w-full py-6 text-base font-semibold shadow-lg shadow-[#7b3fe4]/20 gap-2">
                    <FileText className="w-5 h-5" /> Escrever Avaliação
                  </Button>
                </Link>
                <Button variant="outline" className="w-full py-6 text-base font-semibold bg-white/5 border-white/10 hover:bg-white/10 gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Marcar como Ouvido
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 gap-2">
                    <ListPlus className="w-4 h-4" /> Lista de Desejos
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10 shrink-0 hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Tracklist */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <ListMusic className="w-6 h-6 text-[#7b3fe4]" /> Lista de Faixas
              </h2>
              <span className="text-sm font-bold text-slate-500 tracking-widest">12 MÚSICAS</span>
            </div>

            <div className="space-y-1">
              {[
                { n: "01", title: "72 Seasons", duration: "7:39" },
                { n: "02", title: "Shadows Follow", duration: "6:12" },
                { n: "03", title: "Screaming Suicide", duration: "5:30" },
                { n: "04", title: "Sleepwalk My Life Away", duration: "6:56" },
                { n: "05", title: "You Must Burn!", duration: "7:03" },
                { n: "06", title: "Lux Æterna", duration: "3:22" },
                { n: "07", title: "Crown of Barbed Wire", duration: "5:49" },
              ].map((track) => (
                <div key={track.n} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-slate-500 w-6 group-hover:text-[#7b3fe4] transition-colors">{track.n}</span>
                    <span className="text-slate-200 font-medium group-hover:text-white transition-colors">{track.title}</span>
                  </div>
                  <span className="text-sm text-slate-500 group-hover:text-slate-300">{track.duration}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 text-sm font-bold text-[#7b3fe4] hover:text-[#9b6cf3] tracking-widest uppercase transition-colors">
              Mostrar todas as 12 músicas
            </button>
          </div>

          {/* Credits */}
          <div>
            <div className="bg-[#1a1625]/60 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#7b3fe4]" /> Ficha Técnica
              </h3>

              <div className="space-y-6">
                <CreditItem label="Produtor" value="Greg Fidelman, James Hetfield, Lars Ulrich" />
                <CreditItem label="Mixagem" value="Greg Fidelman" />
                <CreditItem label="Masterização" value="Bob Ludwig" />
                <CreditItem label="Gravadora" value="Blackened Recordings" />
                <CreditItem label="Direção de Arte" value="David Turner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreditItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</h4>
      <p className="text-sm text-slate-300">{value}</p>
    </div>
  )
}
