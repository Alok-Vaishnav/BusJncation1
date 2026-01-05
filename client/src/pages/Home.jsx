import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

export default function Home() {
  const categories = ['Coach Bus', 'Mini Bus', 'School Bus', 'Luxury Bus', 'Tour Bus', 'Airport Shuttle']
  
  const featuredBuses = [
    { id: 1, name: 'Volvo B11R', brand: 'Volvo', price: '₹25,00,000', image: '🚌', type: 'Coach Bus' },
    { id: 2, name: 'Mercedes Tourismo', brand: 'Mercedes', price: '₹30,00,000', image: '🚌', type: 'Coach Bus' },
    { id: 3, name: 'Scania Touring', brand: 'Scania', price: '₹28,50,000', image: '🚌', type: 'Coach Bus' },
    { id: 4, name: 'Iveco Coach', brand: 'Iveco', price: '₹22,00,000', image: '🚌', type: 'Coach Bus' },
    { id: 5, name: 'MAN Coach Pro', brand: 'MAN', price: '₹27,50,000', image: '🚌', type: 'Luxury Bus' },
    { id: 6, name: 'BYD Electric Bus', brand: 'BYD', price: '₹35,00,000', image: '🚌', type: 'Electric Bus' },
  ]

  return (
    <div className="w-full bg-white text-slate-900">
      <Navbar />
      <Hero />

      {/* Categories Section */}
      <section className="w-full py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="px-6 sm:px-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-xl font-black text-slate-800">Browse by Type</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <button key={i} className="group relative px-5 py-4 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl text-sm font-bold hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent hover:shadow-xl hover:scale-105 transition-all duration-300 text-slate-700">
                <div className="text-2xl mb-1">🚌</div>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Buses */}
      <section className="w-full py-16 bg-white">
        <div className="px-6 sm:px-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Featured Buses</h2>
              <p className="text-slate-600 mt-1">Handpicked premium buses for you</p>
            </div>
            <a href="#" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition text-sm">View All →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBuses.map((bus, idx) => (
              <div key={bus.id} className="group relative border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-2">
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">HOT DEAL</span>
                </div>
                <div className="h-52 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center text-7xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <span className="relative group-hover:scale-110 transition-transform duration-300">{bus.image}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">{bus.type}</span>
                  </div>
                  <h3 className="text-xl font-black mb-1 text-slate-900">{bus.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">🏭 {bus.brand}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500">Starting from</div>
                      <span className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{bus.price}</span>
                    </div>
                    <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all">View →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="px-6 sm:px-12 text-center text-white relative z-10">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">🎉 Special Offer</div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">Sell Your Bus in Minutes</h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">Get the best price for your bus instantly with our AI-powered valuation tool</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 font-black rounded-xl hover:bg-slate-100 hover:scale-105 transition-all shadow-2xl">
              🚀 Get Free Valuation
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-black rounded-xl hover:bg-white/20 transition-all">
              📞 Talk to Expert
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-slate-200 py-12 border-t border-slate-800">
        <div className="px-6 sm:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            <div>
              <h4 className="font-bold mb-3 text-white">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">New Buses</a></li>
                <li><a href="#" className="hover:text-white">Upcoming Buses</a></li>
                <li><a href="#" className="hover:text-white">Compare</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-white">Buy & Sell</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Buy Bus</a></li>
                <li><a href="#" className="hover:text-white">Sell Bus</a></li>
                <li><a href="#" className="hover:text-white">Valuation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-white">More</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">News</a></li>
                <li><a href="#" className="hover:text-white">Reviews</a></li>
                <li><a href="#" className="hover:text-white">Dealers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} BusShowcase - India's #1 Bus Portal</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
