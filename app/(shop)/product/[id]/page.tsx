import { notFound } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { readData } from "@/lib/utils";
import Image from "next/image";
import { ShoppingCart, Heart, MapPin, Truck, Shield, ArrowLeft } from "lucide-react";

export default function ProductPage({ params }: { params: { id: string } }) {
  const data = readData();
  const product = data.products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a href="/catalog" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Назад к каталогу
      </a>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        <div>
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
            {product.category === "spring" ? "Пружинный" : product.category === "latex" ? "Латексный" : product.category === "foam" ? "Пенополиуретан" : product.category === "coir" ? "Кокосовый" : product.category === "hybrid" ? "Гибридный" : "Детской"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-lg">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
            <span className="text-gray-500">{product.rating} ({product.reviews} отзывов)</span>
          </div>

          <div className="text-4xl font-bold text-primary-600 mb-6">{product.price.toLocaleString()} ₽</div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.fullDescription || product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {product.inStock ? "✅ В наличии" : "❌ Нет в наличии"}
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <h3 className="font-semibold text-lg">Характеристики:</h3>
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500">✓</span> {feature}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary !py-4 !px-8 text-lg flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" /> В корзину
            </button>
            <button className="btn-secondary !py-4 !px-8 text-lg flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" /> В избранное
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
