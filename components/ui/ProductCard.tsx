import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card-hover group">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">Нет в наличии</span>
            </div>
          )}
          <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </Link>

      <div className="p-5">
        <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
          {product.category === "spring" ? "Пружинный" : product.category === "latex" ? "Латексный" : product.category === "foam" ? "Пенополиуретан" : product.category === "coir" ? "Кокосовый" : product.category === "hybrid" ? "Гибридный" : "Детской"}
        </span>
        <h3 className="font-bold text-lg mt-1 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400 text-sm">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span className="text-gray-400 text-sm">({product.reviews})</span>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">{product.price.toLocaleString()} ₽</span>
          <button className="btn-primary !py-2 !px-4 text-sm flex items-center gap-1">
            <ShoppingCart className="w-4 h-4" /> В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
