export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-900 overflow-hidden flex items-center justify-center py-16 md:py-24">
      {/* Subtle background blobs */}
      <div className="absolute top-20 left-5 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-floaty"></div>
      <div className="absolute -bottom-10 right-5 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-floaty" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight animate-fade-up">
            Find the Perfect Bus for Your Needs
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-fade-up-delayed leading-relaxed">
            Browse thousands of buses from top brands. Compare prices, specs, and find your next ride easily.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-up-delayed">
            <input type="text" placeholder="Search buses..." className="px-6 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 w-full sm:w-80 text-slate-900" />
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
              Search
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              '🚌 Coach Bus',
              '🏫 School Bus',
              '✈️ Luxury Bus',
              '⚡ Electric Bus'
            ].map((item, i) => (
              <a key={i} href="#" className="px-4 py-2 bg-white border border-slate-300 rounded-full text-sm font-medium hover:border-blue-600 hover:text-blue-600 transition">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
