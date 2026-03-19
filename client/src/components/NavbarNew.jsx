import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Menu, X } from 'lucide-react'

export default function Navbar({ onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/10 shadow-black/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-sky-400 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-transparent font-bold text-xl bg-clip-text bg-gradient-to-r from-fuchsia-300 via-indigo-200 to-sky-200">
            CreatorLens
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white/80 hover:text-white transition duration-300 relative group hover:shadow-[0_0_18px_rgba(99,102,241,0.55)]">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/analyze" className="text-white/80 hover:text-white transition duration-300 relative group hover:shadow-[0_0_18px_rgba(99,102,241,0.55)]">
            Analyze
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/analytics" className="text-white/80 hover:text-white transition duration-300 relative group hover:shadow-[0_0_18px_rgba(99,102,241,0.55)]">
            Analytics
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/compare" className="text-white/80 hover:text-white transition duration-300 relative group hover:shadow-[0_0_18px_rgba(99,102,241,0.55)]">
            Compare
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/about" className="text-white/80 hover:text-white transition duration-300 relative group hover:shadow-[0_0_18px_rgba(99,102,241,0.55)]">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500/30 via-indigo-500/30 to-sky-400/30 text-white/90 hover:from-fuchsia-400/50 hover:via-indigo-400/50 hover:to-sky-300/50 shadow-[0_0_12px_rgba(147,51,234,0.25)] transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-white/5 backdrop-blur-2xl border-t border-white/10 px-6 py-4 space-y-3 shadow-[0_0_20px_rgba(0,0,0,0.25)]">
          <Link to="/" className="block text-white/80 hover:text-white py-2 hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]">Home</Link>
          <Link to="/analyze" className="block text-white/80 hover:text-white py-2 hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]">Analyze</Link>
          <Link to="/analytics" className="block text-white/80 hover:text-white py-2 hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]">Analytics</Link>
          <Link to="/compare" className="block text-white/80 hover:text-white py-2 hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]">Compare</Link>
          <Link to="/about" className="block text-white/80 hover:text-white py-2 hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]">About</Link>
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500/25 via-indigo-500/25 to-sky-400/25 text-white/90 hover:from-fuchsia-400/45 hover:via-indigo-400/45 hover:to-sky-300/45 shadow-[0_0_12px_rgba(147,51,234,0.25)] transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
