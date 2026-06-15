import { useState } from "react"
import { Link } from "react-router"
import { Search as SearchIcon, Filter, X, Music, Disc, User } from "lucide-react"
import { MOCK_ALBUMS, MOCK_USERS } from "../data/mock"
import { Avatar } from "../components/ui/avatar"
import { StarRating } from "../components/ui/StarRating"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"

type SearchCategory = "all" | "albums" | "artists" | "users"

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>("all")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const genres = ["all", "Heavy Metal", "Hard Rock", "Alternative Metal", "Prog Metal", "Acoustic"]
  const categories: { id: SearchCategory; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "Tudo", icon: <SearchIcon className="w-4 h-4" /> },
    { id: "albums", label: "Álbuns", icon: <Disc className="w-4 h-4" /> },
    { id: "artists", label: "Artistas", icon: <Music className="w-4 h-4" /> },
    { id: "users", label: "Usuários", icon: <User className="w-4 h-4" /> },
  ]

  const filteredAlbums = MOCK_ALBUMS.filter(album => {
    const matchesQuery = searchQuery === "" ||
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "all" || album.genre === selectedGenre
    const matchesCategory = selectedCategory === "all" || selectedCategory === "albums"
    return matchesQuery && matchesGenre && matchesCategory
  })

  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesQuery = searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || selectedCategory === "users"
    return matchesQuery && matchesCategory
  })

  const filteredArtists = Array.from(new Set(MOCK_ALBUMS.map(album => album.artist))).filter(artist => {
    const matchesQuery = searchQuery === "" || artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || selectedCategory === "artists"
    return matchesQuery && matchesCategory
  })

  return (
    <div className="flex-1 p-8 pb-32 lg:pb-8 overflow-y-auto bg-[#13111c]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Buscar</h1>

        {/* Search Input */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar álbuns, artistas, usuários..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1625] border border-white/10 rounded-2xl py-4 pl-14 pr-12 text-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#7b3fe4] focus:ring-2 focus:ring-[#7b3fe4]/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-[#7b3fe4] text-white shadow-lg shadow-[#7b3fe4]/30"
                  : "bg-[#1a1625] text-slate-400 hover:text-white hover:bg-[#251d38]"
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ml-auto ${
              showFilters
                ? "bg-[#7b3fe4] text-white"
                : "bg-[#1a1625] text-slate-400 hover:text-white"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-[#1a1625] rounded-2xl p-6 mb-8 border border-white/5">
            <h3 className="text-white font-medium mb-4">Gênero</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedGenre === genre
                      ? "bg-[#7b3fe4] text-white"
                      : "bg-[#251d38] text-slate-400 hover:text-white hover:bg-[#2d2340]"
                  }`}
                >
                  {genre === "all" ? "Todos" : genre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {searchQuery === "" && selectedCategory === "all" && selectedGenre === "all" ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1a1625] mb-6">
              <SearchIcon className="w-10 h-10 text-slate-600" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Comece sua busca</h2>
            <p className="text-slate-400">Procure por álbuns, artistas ou usuários</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Albums Results */}
            {(selectedCategory === "all" || selectedCategory === "albums") && filteredAlbums.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Disc className="w-5 h-5 text-[#7b3fe4]" />
                  Álbuns ({filteredAlbums.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredAlbums.map((album) => (
                    <Link to={`/album/${album.id}`} key={album.id} className="group flex flex-col gap-3">
                      <div className="aspect-square rounded-xl overflow-hidden shadow-lg border border-white/5 relative">
                        <ImageWithFallback
                          src={album.cover}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#7b3fe4] flex items-center justify-center shadow-lg">
                            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-1" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white truncate group-hover:text-[#7b3fe4] transition-colors">
                          {album.title}
                        </h3>
                        <p className="text-sm text-slate-400 truncate">{album.artist}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={album.rating} size="sm" />
                          <span className="text-xs text-slate-500">{album.year}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Artists Results */}
            {(selectedCategory === "all" || selectedCategory === "artists") && filteredArtists.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Music className="w-5 h-5 text-[#7b3fe4]" />
                  Artistas ({filteredArtists.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredArtists.map((artist) => {
                    const artistAlbums = MOCK_ALBUMS.filter(a => a.artist === artist)
                    return (
                      <div
                        key={artist}
                        className="bg-[#1a1625] rounded-2xl p-6 border border-white/5 hover:border-[#7b3fe4]/30 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7b3fe4] to-[#c484f3] flex items-center justify-center shadow-lg">
                            <Music className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-lg group-hover:text-[#7b3fe4] transition-colors">
                              {artist}
                            </h3>
                            <p className="text-sm text-slate-400">{artistAlbums.length} álbuns</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Users Results */}
            {(selectedCategory === "all" || selectedCategory === "users") && filteredUsers.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#7b3fe4]" />
                  Usuários ({filteredUsers.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-[#1a1625] rounded-2xl p-6 border border-white/5 hover:border-[#7b3fe4]/30 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar src={user.avatar} alt={user.name} size="lg" />
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-[#7b3fe4] transition-colors">
                              {user.name}
                            </h3>
                            <p className="text-sm text-slate-400">{user.username}</p>
                          </div>
                        </div>
                        <button className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          user.isFollowing
                            ? "bg-[#251d38] text-slate-300 hover:bg-[#2d2340]"
                            : "bg-[#7b3fe4] text-white hover:bg-[#8e4ef5]"
                        }`}>
                          {user.isFollowing ? "Seguindo" : "Seguir"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredAlbums.length === 0 && filteredArtists.length === 0 && filteredUsers.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1a1625] mb-6">
                  <SearchIcon className="w-10 h-10 text-slate-600" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Nenhum resultado encontrado</h2>
                <p className="text-slate-400">Tente uma busca diferente</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
