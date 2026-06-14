import { Map, Edit2, Share2, Calendar } from "lucide-react"
import { Link } from "react-router"
import { currentUser, MOCK_ALBUMS, MOCK_DIARY } from "../data/mock"
import { Avatar } from "../components/ui/Avatar"
import { Button } from "../components/ui/Button"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { StarRating } from "../components/ui/StarRating"

export function ProfilePage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="xl" className="w-32 h-32 border-4 border-[#1a1625]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-[#13111c]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{currentUser.name}</h1>
              {currentUser.isPro && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#7b3fe4]/20 text-[#9b6cf3] text-xs font-bold tracking-wide uppercase border border-[#7b3fe4]/30">
                  Membro Pro
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm mb-3">
              Entusiasta Musical • Membro desde {currentUser.memberSince} • <span className="text-[#9b6cf3]">{currentUser.username}</span>
            </p>
            <p className="text-slate-300 italic text-sm">
              {currentUser.bio}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="purple" className="gap-2">
            <Edit2 className="w-4 h-4" /> Editar Perfil
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total de Álbuns" value="1,240" />
        <StatCard label="Artistas" value="450" />
        <StatCard label="Horas Catalogadas" value="3,500" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        {/* Top 4 */}
        <div className="xl:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-[#7b3fe4]">❤</span> Top 4 Favoritos
            </h2>
            <button className="text-[#9b6cf3] text-sm hover:underline">Ver todos</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {MOCK_ALBUMS.slice(0, 4).map((album) => (
              <Link to={`/album/${album.id}`} key={album.id} className="aspect-square rounded-xl overflow-hidden shadow-lg border border-white/5 relative group cursor-pointer block">
                <ImageWithFallback src={album.cover} alt={album.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <span className="font-bold text-white mb-1">{album.title}</span>
                  <span className="text-xs text-slate-300">{album.artist}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Insights & Recent */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          {/* Insights */}
          <div className="bg-[#1a1625] rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <span className="w-4 h-4 bg-[#7b3fe4] rounded-sm block" /> Insights de Audição
            </h2>
            <div className="space-y-5">
              <InsightBar label="Prog Metal" percentage={42} color="bg-[#9b6cf3]" />
              <InsightBar label="Sludge" percentage={28} color="bg-[#6d28d9]" />
              <InsightBar label="Doom Metal" percentage={15} color="bg-[#4c1d95]" />
              <InsightBar label="Rock Clássico" percentage={10} color="bg-[#2e1065]" />
            </div>
          </div>

          {/* Atividade Recente (Compact) */}
          <div className="bg-[#1a1625] rounded-2xl p-6 border border-white/5 flex-1">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <span className="text-slate-400">🕒</span> Atividade Recente
            </h2>
            <div className="space-y-4">
              {MOCK_DIARY.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                  <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                     <ImageWithFallback src={item.album.cover} alt={item.album.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate group-hover:text-[#9b6cf3] transition-colors">{item.album.title}</h4>
                    <p className="text-xs text-slate-400 truncate">Ouvido {item.date}</p>
                  </div>
                  <StarRating rating={item.rating} className="scale-75" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Placeholder */}
      <div className="bg-[#1a1625] rounded-2xl p-8 border border-white/5 overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#9b6cf3]" /> Mapa de Calor de Audição
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Menos</span>
            <div className="flex gap-1">
              <span className="w-3 h-3 rounded-sm bg-[#13111c] border border-white/10" />
              <span className="w-3 h-3 rounded-sm bg-[#4c1d95]" />
              <span className="w-3 h-3 rounded-sm bg-[#6d28d9]" />
              <span className="w-3 h-3 rounded-sm bg-[#9b6cf3]" />
              <span className="w-3 h-3 rounded-sm bg-[#c4b5fd]" />
            </div>
            <span>Mais</span>
          </div>
        </div>
        
        {/* Fake Heatmap Grid */}
        <div className="flex gap-1.5 min-w-max pb-2">
          {Array.from({ length: 52 }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                // Randomly generate activity for the visual effect
                const activityLevel = Math.random();
                let colorClass = "bg-[#13111c] border border-white/5";
                if (activityLevel > 0.9) colorClass = "bg-[#c4b5fd]";
                else if (activityLevel > 0.7) colorClass = "bg-[#9b6cf3]";
                else if (activityLevel > 0.5) colorClass = "bg-[#6d28d9]";
                else if (activityLevel > 0.3) colorClass = "bg-[#4c1d95]";

                return <div key={`${weekIdx}-${dayIdx}`} className={`w-[14px] h-[14px] rounded-sm ${colorClass}`} />
              })}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-slate-500 min-w-max px-2">
          <span>JAN</span><span>FEV</span><span>MAR</span><span>ABR</span><span>MAI</span><span>JUN</span><span>JUL</span><span>AGO</span><span>SET</span><span>OUT</span><span>NOV</span><span>DEZ</span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</span>
      <span className="text-4xl font-black text-white">{value}</span>
      <div className="w-12 h-1 bg-[#7b3fe4] rounded-full mt-4" />
    </div>
  )
}

function InsightBar({ label, percentage, color }: { label: string, percentage: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-300">{label}</span>
        <span className="text-white font-medium">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-[#13111c] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
