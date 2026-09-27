"use client";
import Link from "next/link";
import { ShoppingCart, Menu, X, Phone, Mail, Search } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              М
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              МатрасОнлайн
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Главная</Link>
            <Link href="/catalog" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Каталог</Link>
            <Link href="/order" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Оставить заявку</Link>
            <Link href="/admin/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
              <span className="flex items-center gap-1">
                <span>🔒</span> Админ
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>
            <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 space-y-3">
          <Link href="/" className="block text-gray-700 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Главная</Link>
          <Link href="/catalog" className="block text-gray-700 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Каталог</Link>
          <Link href="/order" className="block text-gray-700 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Оставить заявку</Link>
          <Link href="/admin/login" className="block text-gray-700 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Админ-панель</Link>
        </div>
      )}
    </header>
  );
}
