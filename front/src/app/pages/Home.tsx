import { useEffect, useState } from "react"
import { Link } from "react-router"
import { Search, Heart, MessageSquare, Share2, Flame } from "lucide-react"
import { Avatar } from "../components/ui/avatar"
import { StarRating } from "../components/ui/StarRating"
import { Button } from "../components/ui/button"
import { ImageWithFallback } from "../components/figma/ImageWithFallback"
import {
  getCurrentUser,
  getFeaturedAlbums,
  getFeed,
  getUsers,
  fallbackAlbums,
  fallbackFeed,
  fallbackUsers,
  fallbackUser,
  type Album,
  type FeedItem,
  type User,
  type CurrentUser,
} from "../lib/api"

export function HomePage() {
  const [currentUserData, setCurrentUserData] = useState<CurrentUser | null>(null)
  const [albums, setAlbums] = useState<Album[]>(fallbackAlbums)
  const [feed, setFeed] = useState<FeedItem[]>(fallbackFeed)
  const [users, setUsers] = useState<User[]>(fallbackUsers)

  useEffect(() => {
    let mounted = true

    async function loadHomeData() {
      try {
        const [currentUserResponse, featuredAlbums, feedItems, usersResponse] =
          await Promise.all([
            getCurrentUser(),
            getFeaturedAlbums(),
            getFeed(),
            getUsers(),
          ])

        if (!mounted) return

        setCurrentUserData(currentUserResponse)
        setAlbums(featuredAlbums)
        setFeed(feedItems)
        setUsers(usersResponse)
      } catch (error) {
        console.error("Erro ao carregar dados da home:", error)
      }
    }

    loadHomeData()

    return () => {
      mounted = false
    }
  }, [])

  const currentUserItem = currentUserData ?? fallbackUser

  const friends = users.filter((user) => user.id !== currentUserItem.id)
  const criticUsers = friends.slice(0, 3)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#13111c] w-full text-white">
      <div className="flex-1 p-6 md:p-8 pb-32 lg:pb-8 xl:pr-[360px] overflow-y-auto">
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                O que seus amigos estão ouvindo?
              </h1>
              <p className="text-slate-400 mt-3 max-w-2xl">
                Descubra avaliações, álbuns favoritos e novas obsessões musicais da sua rede.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex gap-6 overflow-x-auto pb-6 mb-12 no-scrollbar scroll-smooth">
            <Link
              to="/profile"
              className="flex flex-col items-center gap-3 min-w-[72px] cursor-pointer group shrink-0"
            >
              <div className="p-1 rounded-full bg-gradient-to-tr from-[#7b3fe4] to-[#c484f3] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-[#7b3fe4]/20">
                <Avatar
                  src={currentUserItem.avatar}
                  alt="Você"
                  size="xl"
                  className="border-[3px] border-[#13111c] w-[72px] h-[72px]"
                />
              </div>
              <span className="text-sm text-slate-200 font-medium">Você</span>
            </Link>

            {friends.map((user) => (
              <Link
                to={`/profile/${user.id}`}
                key={user.id}
                className="flex flex-col items-center gap-3 min-w-[72px] cursor-pointer group shrink-0"
              >
                <div className="p-1 rounded-full bg-gradient-to-tr from-pink-500 to-[#7b3fe4] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-pink-500/10">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="xl"
                    className="border-[3px] border-[#13111c] w-[72px] h-[72px]"
                  />
                </div>

                <span className="text-sm text-slate-300 font-medium truncate w-full text-center group-hover:text-white transition-colors">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#9b6cf3]" />
              Bombando esta semana
            </h2>

            <Link
              to="/albums"
              className="text-[#9b6cf3] text-sm font-medium hover:underline"
            >
              Ver tudo
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-12">
            {albums.slice(0, 4).map((album) => (
              <Link
                to={`/album/${album.id}`}
                key={album.id}
                className="group flex flex-col gap-3"
              >
                <div className="aspect-square rounded-xl overflow-hidden shadow-lg border border-white/5 relative bg-[#1a1625]">
                  <ImageWithFallback
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#7b3fe4] flex items-center justify-center shadow-lg shadow-[#7b3fe4]/30">
                      <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-1" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white truncate group-hover:text-[#9b6cf3] transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-sm text-slate-400 truncate">
                    {album.artist}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">
            Atividade Recente
          </h2>

          <div className="space-y-6">
            {feed.map((item) => (
              <article
                key={item.id}
                className="bg-[#1a1625] rounded-2xl p-5 md:p-6 border border-white/5 shadow-sm hover:border-[#7b3fe4]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <Link
                    to={`/profile/${item.user.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <Avatar src={item.user.avatar} alt={item.user.name} />

                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-[#9b6cf3] transition-colors">
                        {item.user.name}{" "}
                        <span className="text-slate-400 font-normal">
                          avaliou
                        </span>
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.timestamp}
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 md:gap-6 mb-6">
                  <Link
                    to={`/album/${item.album.id}`}
                    className="shrink-0 w-full sm:w-32 aspect-square sm:h-32 rounded-lg overflow-hidden border border-white/10 shadow-md group"
                  >
                    <ImageWithFallback
                      src={item.album.cover}
                      alt={item.album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>

                  <div className="flex flex-col py-1 min-w-0">
                    <Link to={`/album/${item.album.id}`} className="group">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#9b6cf3] transition-colors">
                        {item.album.title}
                      </h3>
                    </Link>

                    <p className="text-slate-400 mb-3">{item.album.artist}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={item.rating} />
                      <span className="text-[#9b6cf3] font-medium text-sm">
                        {item.rating}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-[#7b3fe4] pl-3">
                      “{item.review}”
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-slate-400">
                  <button className="flex items-center gap-2 text-sm hover:text-pink-400 transition-colors">
                    <Heart className="w-4 h-4" />
                    {item.likes}
                  </button>

                  <button className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    {item.comments}
                  </button>

                  <button className="flex items-center gap-2 text-sm ml-auto hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

        <aside className="lg:w-[320px] lg:fixed lg:right-0 lg:top-18 lg:bottom-0 p-6 border-l border-white/5 bg-[#151020]/70 overflow-y-auto hidden xl:block no-scrollbar">          <div className="space-y-5">
          {/* Pro Card Principal */}
          <div className="relative overflow-hidden rounded-3xl border border-[#7b3fe4]/30 bg-gradient-to-br from-[#2d1748] via-[#211332] to-[#151020] p-6 shadow-2xl shadow-[#7b3fe4]/10">
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#9b6cf3] blur-[80px] opacity-30" />
            <div className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-pink-500 blur-[90px] opacity-20" />

            <div className="relative z-10">
              <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#c4b5fd]">
                Musicboxd Pro
              </span>

              <h3 className="mb-3 text-2xl font-black leading-tight text-white">
                Sua vida musical em estatísticas.
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-slate-300">
                Veja seus gêneros mais ouvidos, artistas dominantes, semanas mais ativas
                e recomendações feitas para o seu gosto.
              </p>

              <Button variant="purple" className="w-full font-semibold shadow-lg shadow-[#7b3fe4]/20">
                Assinar Pro
              </Button>

              <p className="mt-3 text-center text-xs text-slate-500">
                Cancele quando quiser.
              </p>
            </div>
          </div>

          {/* Benefícios rápidos */}
          <div className="rounded-2xl border border-white/5 bg-[#1a1625] p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
              Incluso no Pro
            </h3>

            <div className="space-y-4">
              <ProBenefit
                title="Recomendações inteligentes"
                description="Álbuns sugeridos com base nas suas avaliações."
              />

              <ProBenefit
                title="Estatísticas avançadas"
                description="Gêneros, artistas, décadas e hábitos de escuta."
              />

              <ProBenefit
                title="Perfil destacado"
                description="Badge Pro e personalização visual do seu perfil."
              />
            </div>
          </div>

          {/* Anúncio interno */}
          <div className="rounded-2xl border border-white/5 bg-[#1a1625] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-[#7b3fe4]/15 px-3 py-1 text-xs font-bold text-[#c4b5fd]">
                Novo
              </span>

              <span className="text-xs text-slate-500">
                Destaque
              </span>
            </div>

            <h3 className="mb-2 text-lg font-bold text-white">
              Crie listas musicais
            </h3>

            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              Monte rankings, favoritos do mês, álbuns essenciais e compartilhe com seus amigos.
            </p>

            <Link
              to="/diary"
              className="inline-flex text-sm font-semibold text-[#9b6cf3] hover:text-[#c4b5fd] transition-colors"
            >
              Começar agora →
            </Link>
          </div>

          {/* Mini anúncio */}
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Espaço para anúncio
            </p>

            <h3 className="mb-2 text-base font-bold text-white">
              Divulgue um lançamento
            </h3>

            <p className="text-sm leading-relaxed text-slate-400">
              Área reservada para campanhas, playlists, artistas independentes ou novidades da plataforma.
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}

function ProBenefit({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#9b6cf3] shadow-[0_0_18px_rgba(155,108,243,0.8)]" />

      <div>
        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="text-xs leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </div>
  )
}