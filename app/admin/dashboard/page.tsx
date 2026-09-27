"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Package, ShoppingCart, Plus, Edit2, Trash2, LogOut,
  ArrowLeft, ImageIcon, Tag, FileText, ChevronDown, ChevronUp
} from "lucide-react";

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

interface Order {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories] = useState([
    { id: "spring", name: "Пружинный" },
    { id: "latex", name: "Латексный" },
    { id: "foam", name: "Пенополиуретан" },
    { id: "coir", name: "Кокосовый" },
    { id: "hybrid", name: "Гибридный" },
    { id: "kids", name: "Детской" },
  ]);

  const [formData, setFormData] = useState({
    name: "", category: "spring", price: 0,
    description: "", image: "", features: ""
  });

  const fetchData = useCallback(async () => {
    try {
      const [prodRes, orderRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ]);
      const prodData = await prodRes.json();
      const orderData = await orderRes.json();
      setProducts(prodData.products || []);
      setOrders(orderData.orders || []);
    } catch {}
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    const newProduct: Product = {
      ...formData,
      id: Date.now(),
      rating: 0,
      reviews: 0,
      inStock: true,
      features: formData.features.split(";").filter(Boolean),
    };

    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    setShowAddForm(false);
    setFormData({ name: "", category: "spring", price: 0, description: "", image: "", features: "" });
    fetchData();
  }

  async function handleDeleteProduct(id: number) {
    if (!confirm("Удалить товар?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    fetchData();
  }

  async function handleUpdateStatus(orderId: string, status: string) {
    await fetch(`/api/admin/orders?id=${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            🔒 Админ-панель
          </h1>
          <button onClick={handleLogout} className="btn-secondary !py-2 !px-4 text-sm flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Выйти
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "products" ? "bg-primary-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Package className="w-5 h-5 inline mr-2" /> Товары ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "orders" ? "bg-accent-500 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ShoppingCart className="w-5 h-5 inline mr-2" /> Заявки ({orders.length})
          </button>
        </div>

        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Управление товарами</h2>
              <button onClick={() => { setEditingProduct(null); setShowAddForm(true); }} className="btn-primary flex items-center gap-2">
                <Plus className="w-5 h-5" /> Добавить товар
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddProduct} className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">{editingProduct ? "Редактировать товар" : "Новый товар"}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder="Название матраса" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Категория *</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₽) *</label>
                    <input required type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="input-field" placeholder="12990" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL изображения *</label>
                    <input required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="input-field" placeholder="https://..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание *</label>
                    <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field h-24 resize-none" placeholder="Полное описание матраса" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Характеристики (через ;)</label>
                    <input value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} className="input-field" placeholder="Характеристика 1; Характеристика 2; Характеристика 3" />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="btn-primary">Сохранить</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">Отмена</button>
                </div>
              </form>
            )}

            <div className="grid gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600">{product.price.toLocaleString()} ₽</p>
                    <p className={`text-sm ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                      {product.inStock ? "В наличии" : "Нет"}
                    </p>
                  </div>
                  <button onClick={() => { setEditingProduct(product); setFormData({ name: product.name, category: product.category, price: product.price, description: product.description, image: product.image, features: product.features.join(";") }); setShowAddForm(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Заявки и заказы</h2>
            <div className="grid gap-4">
              {orders.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-500">Пока нет заявок</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-bold text-lg">Заявка #{order.id.slice(-6)}</span>
                        <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "новый" ? "bg-yellow-100 text-yellow-700" :
                          order.status === "обработка" ? "bg-blue-100 text-blue-700" :
                          order.status === "отправлен" ? "bg-green-100 text-green-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString("ru-RU")}</span>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div><p className="text-gray-500">Имя:</p><p className="font-medium">{order.name}</p></div>
                      <div><p className="text-gray-500">Телефон:</p><p className="font-medium">{order.phone}</p></div>
                      <div><p className="text-gray-500">Email:</p><p className="font-medium">{order.email}</p></div>
                      <div><p className="text-gray-500">Сообщение:</p><p className="font-medium line-clamp-2">{order.message}</p></div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {["новый", "обработка", "отправлен", "завершён"].map((status) => (
                        <button key={status} onClick={() => handleUpdateStatus(order.id, status)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          order.status === status ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-primary-100"
                        }`}>
                          {status === "новый" ? "Новый" : status === "обработка" ? "В обработке" : status === "отправлен" ? "Отправлен" : "Завершён"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
