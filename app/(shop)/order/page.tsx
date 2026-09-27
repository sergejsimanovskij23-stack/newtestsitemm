"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, Check, ArrowLeft } from "lucide-react";

export default function OrderPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_order", order: formData }),
      });
      setSubmitted(true);
    } catch {}
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Спасибо! 🎉</h1>
          <p className="text-gray-500 text-lg mb-6">Ваша заявка отправлена. Мы свяжемся с вами в течение 30 минут.</p>
          <a href="/" className="btn-primary inline-block">Вернуться на главную</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <a href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Назад
      </a>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Оставить заявку</h1>
        <p className="text-gray-500 mb-8">Заполните форму и мы перезвоним вам для подтверждения заказа</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
            <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder="Иван" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
            <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-field" placeholder="+7 (900) 123-45-67" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field" placeholder="ivan@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
            <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="input-field h-32 resize-none" placeholder="Какой матрас интересует? Предпочтительная жёсткость? Возраст, вес?" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full !py-4 text-lg flex items-center justify-center gap-2">
            {loading ? "Отправка..." : (
              <>
                <MessageSquare className="w-5 h-5" /> Отправить заявку
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
          <div><Phone className="w-6 h-6 text-primary-600 mx-auto mb-2" /><p className="text-sm text-gray-500">+7 (900) 123-45-67</p></div>
          <div><Mail className="w-6 h-6 text-primary-600 mx-auto mb-2" /><p className="text-sm text-gray-500">support@matras.ru</p></div>
          <div><MapPin className="w-6 h-6 text-primary-600 mx-auto mb-2" /><p className="text-sm text-gray-500">Москва</p></div>
        </div>
      </div>
    </div>
  );
}
