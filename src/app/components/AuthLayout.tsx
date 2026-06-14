import { Outlet } from "react-router"

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#13111c] flex flex-col text-slate-100">
      <Outlet />
    </div>
  )
}
