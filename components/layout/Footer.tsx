import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                М
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                МатрасОнлайн
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Качественные матрасы с доставкой по всей России. Более 10 000 довольных клиентов.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Каталог</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/catalog?category=spring" className="hover:text-primary-400 transition-colors">Пружинные</Link></li>
              <li><Link href="/catalog?category=latex" className="hover:text-primary-400 transition-colors">Латексные</Link></li>
              <li><Link href="/catalog?category=foam" className="hover:text-primary-400 transition-colors">Пенополиуретан</Link></li>
              <li><Link href="/catalog?category=coir" className="hover:text-primary-400 transition-colors">Кокосовые</Link></li>
              <li><Link href="/catalog?category=hybrid" className="hover:text-primary-400 transition-colors">Гибридные</Link></li>
              <li><Link href="/catalog?category=kids" className="hover:text-primary-400 transition-colors">Детские</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-primary-400 transition-colors">О нас</Link></li>
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Гарантия</Link></li>
              <li><Link href="/" className="hover:text-primary-400 transition-colors">Возврат</Link></li>
              <li><Link href="/order" className="hover:text-primary-400 transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Контакты</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +7 (900) 123-45-67</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@matras-online.ru</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> г. Москва, ул. Матрасная, 15</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 МатрасОнлайн. Все права защищены. Сделано с ❤️</p>
        </div>
      </div>
    </footer>
  );
}
