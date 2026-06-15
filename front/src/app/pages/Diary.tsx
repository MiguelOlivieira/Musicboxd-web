import { ChevronDown, RefreshCcw } from "lucide-react"
import { MOCK_DIARY } from "../data/mock"
import { StarRating } from "../components/ui/StarRating"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { Button } from "../components/ui/button"

export function DiaryPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Meu Diário</h1>
          <p className="text-slate-400 text-lg">Seu histórico cronológico de audições de todos os tempos.</p>
        </div>

        <div className="flex gap-3">
          <FilterDropdown label="Mês" />
          <FilterDropdown label="Ano" />
          <FilterDropdown label="Gênero" />
        </div>
      </div>

      <div className="bg-[#1a1625] border border-white/5 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-[#13111c]/50">
          <div className="col-span-2">Data</div>
          <div className="col-span-1 text-center">Álbum</div>
          <div className="col-span-4">Título</div>
          <div className="col-span-2">Artista</div>
          <div className="col-span-2">Avaliação</div>
          <div className="col-span-1 text-center">Reouvir</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {MOCK_DIARY.map((entry) => (
            <div key={entry.id} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/5 transition-colors group">
              <div className="col-span-2 text-sm text-slate-400 font-medium">
                {entry.date}
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="w-12 h-12 rounded-md overflow-hidden shadow-md">
                   <ImageWithFallback src={entry.album.cover} alt={entry.album.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="col-span-4">
                <h3 className="text-white font-bold text-base group-hover:text-[#9b6cf3] transition-colors cursor-pointer">{entry.album.title}</h3>
              </div>
              <div className="col-span-2">
                <span className="text-slate-300 text-sm hover:underline cursor-pointer">{entry.album.artist}</span>
              </div>
              <div className="col-span-2 flex items-center">
                <StarRating rating={entry.rating} />
              </div>
              <div className="col-span-1 flex justify-center">
                {entry.isRelisten ? (
                  <RefreshCcw className="w-5 h-5 text-[#7b3fe4] opacity-80" />
                ) : (
                  <span className="text-slate-600">-</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button variant="outline" className="rounded-full px-8 border-white/10 hover:border-white/20 hover:bg-white/5">
          Carregar mais histórico
        </Button>
      </div>
    </div>
  )
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#251d38] border border-white/5 text-white text-sm font-medium hover:bg-[#2d2444] transition-colors focus:ring-2 focus:ring-[#7b3fe4] outline-none">
      {label} <ChevronDown className="w-4 h-4 text-slate-400" />
    </button>
  )
}
