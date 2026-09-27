import ShopLayout from "@/components/layout/ShopLayout";
import Hero from "@/components/ui/Hero";
import ProductCard from "@/components/ui/ProductCard";
import { readData } from "@/lib/utils";

export default function Home() {
  const data = readData();
  const featuredProducts = data.products.slice(0, 4);

  return (
    <ShopLayout>
      <div>
        <Hero />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="section-title">Популярные модели</h2>
            <p className="section-subtitle">Выбирайте из лучших матрасов с доставкой по всей России</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/catalog" className="btn-secondary inline-block">
              Смотреть весь каталог
            </a>
          </div>
        </section>

        <section className="bg-white py-16 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-8">Преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "🚚", title: "Бесплатная доставка", desc: "По всей России при заказе от 5000 ₽" },
                { icon: "🔄", title: "Возврат 30 дней", desc: "Обмен без вопросов, если не подошёл" },
                { icon: "🛡️", title: "Официальная гарантия", desc: "До 7 лет на каждый матрас" },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ShopLayout>
  );
}
