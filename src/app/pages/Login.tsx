import { useState } from "react"
import { useNavigate } from "react-router"
import { Disc3, Eye, EyeOff, Music } from "lucide-react"
import { Button } from "../components/ui/Button"

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#1a1325] via-[#13111c] to-[#0a0812]">
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7b3fe4]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px]" />
      
      <div className="flex items-center gap-3 mb-12 relative z-10">
        <Disc3 className="w-10 h-10 text-[#7b3fe4] fill-[#7b3fe4]" />
        <span className="font-bold text-3xl tracking-tight text-white">Musicboxd</span>
      </div>

      <div className="w-full max-w-[440px] bg-[#1a1625]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{isLogin ? "Entrar" : "Criar conta"}</h1>
          <p className="text-slate-400 text-sm">
            {isLogin ? "Bem-vindo de volta à sua jornada musical." : "Junte-se à maior rede social para amantes de música."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nome Completo</label>
              <input 
                type="text" 
                placeholder="Como quer ser chamado?" 
                className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7b3fe4] focus:ring-1 focus:ring-[#7b3fe4] transition-all"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {isLogin ? "E-mail ou Usuário" : "E-mail"}
            </label>
            <input 
              type="text" 
              placeholder="seu@email.com" 
              className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7b3fe4] focus:ring-1 focus:ring-[#7b3fe4] transition-all"
            />
          </div>

          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nome de usuário</label>
              <input 
                type="text" 
                placeholder="@usuario_unico" 
                className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#7b3fe4] focus:ring-1 focus:ring-[#7b3fe4] transition-all"
              />
            </div>
          )}

          <div className="space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Senha</label>
              {isLogin && <a href="#" className="text-xs text-[#7b3fe4] hover:underline">Esqueceu a senha?</a>}
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder={isLogin ? "••••••••" : "Mínimo 8 caracteres"} 
                className="w-full bg-[#251d38] border border-white/5 rounded-xl px-4 py-3.5 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-[#7b3fe4] focus:ring-1 focus:ring-[#7b3fe4] transition-all"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Selecione seus gêneros favoritos</label>
              <div className="flex flex-wrap gap-2">
                {["Rock", "Pop", "Jazz", "Hip Hop", "MPB", "Indie", "Electronic", "Metal"].map((genre) => (
                  <button type="button" key={genre} className="px-4 py-1.5 rounded-full border border-white/10 text-sm text-slate-300 hover:border-[#7b3fe4] hover:bg-[#7b3fe4]/10 transition-colors focus:bg-[#7b3fe4] focus:text-white focus:border-[#7b3fe4]">
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button variant="purple" className="w-full py-6 text-base font-semibold mt-4 shadow-lg shadow-[#7b3fe4]/25">
            {isLogin ? "Entrar" : "Criar minha conta"}
          </Button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Ou continue com</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button variant="outline" className="bg-[#251d38] border-none hover:bg-white/5 py-5 gap-2">
            <Music className="w-5 h-5" /> Spotify
          </Button>
          <Button variant="outline" className="bg-[#251d38] border-none hover:bg-white/5 py-5 gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.53.68 3.14.68.65 0 1.96-.75 3.57-.65 1.54.06 2.87.65 3.65 1.7-3.15 1.84-2.6 5.86.32 6.94-.74 1.83-1.61 3.53-2.68 4.3zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
             Apple
          </Button>
        </div>
      </div>

      <div className="mt-8 text-sm text-slate-400">
        {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-[#7b3fe4] font-semibold hover:underline">
          {isLogin ? "Cadastre-se grátis" : "Entrar"}
        </button>
      </div>
      
      <p className="absolute bottom-6 text-xs text-slate-600">
        © 2026 Musicboxd. Feito para quem vive música.
      </p>
    </div>
  )
}
