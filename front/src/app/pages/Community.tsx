import { Plus, TrendingUp, UserPlus } from "lucide-react"
import { MOCK_USERS, MOCK_ALBUMS } from "../data/mock"
import { Avatar } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"

export function CommunityPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
      {/* Main Content Area */}
      <div className="flex-1">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">Comunidade</h1>
          <p className="text-slate-400 text-lg">Acompanhe o que seus amigos estão ouvindo e descubra novos gostos musicais.</p>
        </div>

        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <div className="flex gap-4">
            <Button variant="purple" className="rounded-full px-6">Seus Amigos</Button>
            <Button variant="ghost" className="rounded-full px-6">Atividade</Button>
          </div>
          <span className="text-slate-500 text-sm font-medium">128 amigos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_USERS.map((user, i) => (
            <div key={user.id} className="bg-[#1a1625] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar src={user.avatar} alt={user.name} size="lg" />
                  <div>
                    <h3 className="text-white font-bold text-lg">{user.name}</h3>
                    <p className="text-slate-400 text-sm">{user.username}</p>
                  </div>
                </div>
                <Button variant={user.isFollowing ? "outline" : "purple"} size="sm" className="h-8">
                  {user.isFollowing ? "Seguindo" : "Seguir"}
                </Button>
              </div>

              <div className="bg-[#251d38]/50 rounded-xl p-4 flex items-center gap-4 border border-white/5">
                <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 shadow-md">
                   <ImageWithFallback src={MOCK_ALBUMS[i % MOCK_ALBUMS.length].cover} alt="Álbum favorito" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Álbum Favorito Atual</p>
                  <h4 className="text-white font-medium truncate">{MOCK_ALBUMS[i % MOCK_ALBUMS.length].title}</h4>
                  <p className="text-xs text-slate-400 truncate">{MOCK_ALBUMS[i % MOCK_ALBUMS.length].artist}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="xl:w-[340px] shrink-0 space-y-6">
        {/* Sugestões */}
        <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#7b3fe4]" /> Sugestões para você
          </h3>
          <div className="space-y-5">
            {MOCK_USERS.slice(1, 4).map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={user.avatar} alt={user.name} size="md" />
                  <div>
                    <h4 className="text-white font-medium text-sm">{user.name}</h4>
                    <p className="text-xs text-slate-500">Ouve Indie Rock</p>
                  </div>
                </div>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-white/10 hover:bg-[#7b3fe4] hover:text-white transition-colors hover:border-transparent text-slate-400">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-[#7b3fe4] hover:text-[#9b6cf3] bg-[#7b3fe4]/5 hover:bg-[#7b3fe4]/10">
            Ver mais sugestões
          </Button>
        </div>

        {/* Em alta */}
        <div className="bg-[#1a1625] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#7b3fe4]" /> Em alta no seu círculo
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {MOCK_ALBUMS.slice(0, 2).map((album) => (
              <div key={album.id} className="flex-1 min-w-[120px] group cursor-pointer">
                <div className="aspect-square rounded-xl overflow-hidden mb-3 border border-white/10 shadow-lg">
                  <ImageWithFallback src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="text-sm text-white font-medium truncate group-hover:text-[#7b3fe4]">{album.title}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{Math.floor(Math.random() * 10) + 2} amigos ouvindo</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
