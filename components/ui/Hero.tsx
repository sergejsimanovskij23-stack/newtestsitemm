import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Shield, Truck, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80"
          alt="Матрасы"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-primary-600/20 text-primary-400 rounded-full text-sm font-semibold mb-6 border border-primary-500/30">
              🔥 Скидка 30% на все матрасы
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Найдите свой
              <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                идеальный матрас
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Более 50 моделей матрасов на любой вкус и бюджет. Доставка по всей России. Гарантия до 7 лет.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog" className="btn-primary text-center !py-4 !px-8 text-lg">
                Смотреть каталог
              </Link>
              <Link href="/order" className="btn-secondary text-center !py-4 !px-8 text-lg">
                Оставить заявку
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Star className="w-8 h-8" />, text: "4.8+ рейтинг", label: "Качество" },
              { icon: <Truck className="w-8 h-8" />, text: "Бесплатная доставка", label: "Доставка" },
              { icon: <Shield className="w-8 h-8" />, text: "Гарантия до 7 лет", label: "Гарантия" },
              { icon: <MapPin className="w-8 h-8" />, text: "По всей России", label: "Регионы" },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/10 hover:bg-white/20 transition-colors">
                <div className="text-primary-400 mb-2">{item.icon}</div>
                <div className="font-bold text-lg">{item.text}</div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
