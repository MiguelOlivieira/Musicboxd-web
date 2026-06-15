import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import { Avatar } from "../components/ui/Avatar"
import { StarRating } from "../components/ui/StarRating"
import { Button } from "../components/ui/Button"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import { getCurrentUser, getFeaturedAlbums, getFeed, getUsers, fallbackAlbums, fallbackFeed, fallbackUsers, fallbackUser, type Album, type FeedItem, type User, type CurrentUser } from "../lib/api"

export function HomePage() {
  const [currentUserData, setCurrentUserData] = useState<CurrentUser | null>(null)
  const [albums, setAlbums] = useState<Album[]>(fallbackAlbums)
  const [feed, setFeed] = useState<FeedItem[]>(fallbackFeed)
  const [users, setUsers] = useState<User[]>(fallbackUsers)
  const [postContent, setPostContent] = useState("")
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    let mounted = true

    async function loadHomeData() {
      const [currentUserResponse, featuredAlbums, feedItems, usersResponse] = await Promise.all([
        getCurrentUser(),
        getFeaturedAlbums(),
        getFeed(),
        getUsers(),
      ])

      if (!mounted) {
        return
      }

      setCurrentUserData(currentUserResponse)
      setAlbums(featuredAlbums)
      setFeed(feedItems)
      setUsers(usersResponse)
    }

    loadHomeData()

    return () => {
      mounted = false
    }
  }, [])

  const currentUserItem = currentUserData ?? fallbackUser
  const criticUsers = users.filter((user) => user.id !== currentUserItem.id).slice(0, 3)

  const handlePost = () => {
    if (!postContent.trim()) return

    const newPost: FeedItem = {
      id: Math.random().toString(36).substring(2, 9),
      user: currentUserItem,
      album: albums[0] || fallbackAlbums[0],
      review: postContent,
      rating: 5,
      likes: 0,
      comments: 0,
      timestamp: "Agora"
    }

    setFeed([newPost, ...feed])
    setPostContent("")
  }

  const toggleLike = (id: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#13111c] w-full">
      <div className="flex-1 p-8 pb-32 lg:pb-8 xl:pr-[360px] overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Amigos</h1>
        
        <div className="flex gap-6 overflow-x-auto pb-6 mb-12 no-scrollbar scroll-smooth">
          <div className="flex flex-col items-center gap-3 min-w-[72px] cursor-pointer group shrink-0">
            <div className="p-1 rounded-full bg-gradient-to-tr from-[#7b3fe4] to-[#c484f3] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-[#7b3fe4]/20">
              <Avatar src={currentUserItem.avatar} alt="You" size="xl" className="border-[3px] border-[#13111c] w-[72px] h-[72px]" />
            </div>
            <span className="text-sm text-slate-200 font-medium">Você</span>
          </div>
          {users.map((user) => (
            <div key={user.id} className="flex flex-col items-center gap-3 min-w-[72px] cursor-pointer group shrink-0">
              <div className="p-1 rounded-full bg-gradient-to-tr from-pink-500 to-[#7b3fe4] transition-transform duration-300 group-hover:scale-105 shadow-lg">
                <Avatar src={user.avatar} alt={user.name} size="xl" className="border-[3px] border-[#13111c] w-[72px] h-[72px]" />
              </div>
              <span className="text-sm text-slate-300 font-medium truncate w-full text-center">{user.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Bombando esta semana</h2>
          <button className="text-[#7b3fe4] text-sm font-medium hover:underline">Ver tudo</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {albums.slice(0, 4).map((album) => (
            <Link to={`/album/${album.id}`} key={album.id} className="group flex flex-col gap-3">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg border border-white/5 relative">
                <ImageWithFallback src={album.cover} alt={album.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-[#7b3fe4] flex items-center justify-center">
                      <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-1" />
                   </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white truncate group-hover:text-[#7b3fe4] transition-colors">{album.title}</h3>
                <p className="text-sm text-slate-400 truncate">{album.artist}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-white">Atividade Recente</h2>

        <div className="bg-[#1a1625] rounded-2xl p-6 border border-white/5 shadow-sm mb-6 flex items-start gap-4">
          <Avatar src={currentUserItem.avatar} alt="You" />
          <div className="flex-1 flex flex-col gap-3">
            <textarea 
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder={`O que você tem escutado, ${currentUserItem.name.split(' ')[0]}?`}
              className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#7b3fe4] focus:ring-1 focus:ring-[#7b3fe4] resize-none min-h-[80px]"
            />
            <div className="flex justify-end">
              <Button 
                variant="purple" 
                className="shrink-0 px-6" 
                onClick={handlePost}
                disabled={!postContent.trim()}
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {feed.map((item) => (
            <div key={item.id} className="bg-[#1a1625] rounded-2xl p-6 border border-white/5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar src={item.user.avatar} alt={item.user.name} />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.user.name} <span className="text-slate-400 font-normal">avaliou</span>
                    </p>
                    <p className="text-xs text-slate-500">{item.timestamp}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 mb-6">
                <Link to={`/album/${item.album.id}`} className="shrink-0 w-32 h-32 rounded-lg overflow-hidden border border-white/10 shadow-md">
                   <ImageWithFallback src={item.album.cover} alt={item.album.title} className="w-full h-full object-cover" />
                </Link>
                <div className="flex flex-col py-1">
                  <Link to={`/album/${item.album.id}`} className="hover:underline">
                    <h3 className="text-xl font-bold text-white">{item.album.title}</h3>
                  </Link>
                  <p className="text-slate-400 mb-3">{item.album.artist}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={item.rating} />
                    <span className="text-[#7b3fe4] font-medium text-sm">{item.rating}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-[#7b3fe4] pl-3">
                    "{item.review}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-slate-400">
                <button 
                  onClick={() => toggleLike(item.id)}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    likedPosts.has(item.id) ? 'text-red-500' : 'hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedPosts.has(item.id) ? 'fill-current' : ''}`} /> 
                  {likedPosts.has(item.id) ? item.likes + 1 : item.likes}
                </button>
                <button className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" /> {item.comments}
                </button>
                <button className="flex items-center gap-2 text-sm ml-auto hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-[360px] lg:fixed lg:right-0 lg:top-20 lg:bottom-0 p-8 border-l border-white/5 bg-[#1a1625]/50 overflow-y-auto hidden xl:block z-10">
        <div className="mb-10">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">Críticos Populares</h3>
          <div className="space-y-6">
            {criticUsers.map((critic) => (
              <div key={critic.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={critic.avatar} alt={critic.name} />
                  <div>
                    <p className="text-sm font-medium text-white">{critic.name}</p>
                    <p className="text-xs text-slate-400">{critic.followers || '12.4k'} seguidores</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}