import { Outlet, NavLink, Link } from "react-router"
import { Disc3, Home, Search, User, BookOpen, Users, LogIn, Bell } from "lucide-react"
import { currentUser } from "../data/mock"
import { Avatar } from "./ui/avatar"

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#13111c] text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#1a1625]/80 border-r border-white/5 flex flex-col pt-8 pb-6 px-6 fixed top-0 bottom-0 z-10 hidden md:flex backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 mb-12 px-2 text-white">
          <Disc3 className="w-8 h-8 text-[#7b3fe4] fill-[#7b3fe4]" />
          <span className="font-bold text-2xl tracking-tight">Musicboxd</span>
        </Link>

        <nav className="flex-1 space-y-1.5">
          <NavItem to="/" icon={<Home className="w-5 h-5" />} label="Início" />
          <NavItem to="/search" icon={<Search className="w-5 h-5" />} label="Buscar" />
          <NavItem to="/diary" icon={<BookOpen className="w-5 h-5" />} label="Diário" />
          <NavItem to="/community" icon={<Users className="w-5 h-5" />} label="Comunidade" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-3">
          <Avatar src={currentUser.avatar} alt={currentUser.name} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">{currentUser.name}</p>
            <Link to="/profile" className="text-xs text-slate-400 truncate hover:text-white">
              Ver Perfil
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-[280px] flex flex-col min-h-screen relative">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-[#1a1625]/80 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-8">
          <div className="flex md:hidden items-center gap-3">
            <Disc3 className="w-8 h-8 text-[#7b3fe4] fill-[#7b3fe4]" />
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Explorar</h2>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/search" className="relative hidden lg:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar álbuns..."
                className="w-full bg-[#251d38] border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#7b3fe4]"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = '/search'
                }}
              />
            </Link>
            <button className="text-slate-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link
              to="/auth/login"
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-[#7b3fe4] hover:text-white transition"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </Link>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-[#251d38] text-white font-medium"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}
