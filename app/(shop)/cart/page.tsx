export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold mb-2">Корзина пуста</h2>
        <p className="text-gray-500 mb-6">Похоже, вы ещё ничего не добавили в корзину</p>
        <a href="/catalog" className="btn-primary inline-block">Смотреть каталог</a>
      </div>
    </div>
  );
}
