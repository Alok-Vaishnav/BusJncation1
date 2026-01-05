export default function Navbar() {
  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-md border-b border-slate-200">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-black text-sm">BS</div>
          <div className="animate-fade-up-delayed">
            <div className="text-lg font-bold text-slate-900">BusShowcase</div>
          </div>
        </div>

        <nav className="hidden sm:flex">
          <ul className="flex items-center gap-8 text-slate-700 font-semibold text-sm">
            <li><a href="#home" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="#featured" className="hover:text-blue-600 transition">Buses</a></li>
            <li><a href="#news" className="hover:text-blue-600 transition">News</a></li>
            <li><a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold text-xs">Sell</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

