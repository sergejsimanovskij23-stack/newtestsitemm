import { readData } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";

export default function CatalogPage({ searchParams }: { searchParams: { category?: string } }) {
  const data = readData();
  const { categories } = data;
  const selectedCategory = searchParams.category || "all";

  const filteredProducts = selectedCategory === "all"
    ? data.products
    : data.products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="section-title">Каталог матрасов</h1>
          <p className="section-subtitle">Выберите матрас вашей мечты из более чем 8 моделей</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/catalog?category=${cat.id}`}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200"
              }`}
            >
              {cat.icon} {cat.name}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">Матрасы в этой категории не найдены</p>
          </div>
        )}
      </section>
    </div>
  );
}
