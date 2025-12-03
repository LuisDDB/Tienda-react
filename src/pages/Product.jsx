// src/pages/Product.jsx
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export function Product() {
  const { id } = useParams();
  const { addItem, toggleCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/productos.php?id=${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al traer producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-gray-700">
          Cargando producto...
        </p>
      </main>
    );
  }

  const hasStock = product.stock > 0;

  const handleAddToCart = () => {
    addItem({
      id: product.product_id,
      name: product.nombre,
      price: parseFloat(product.precio),
      image: "/no-image.png" // temporal hasta que agregues campo imagen
    });

    toggleCart();
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-slate-100 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 grid gap-8 md:grid-cols-[1.1fr_1.6fr_1fr]">

        <div className="flex items-center justify-center">
          <img
            src={"/no-image.png"} // ya que tu backend no tiene campo imagen
            alt={product.nombre}
            className="max-h-[420px] w-auto object-contain"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
            {product.nombre}
          </h1>

          {/* El backend no envía rating ni reviews → los quitamos pero sin mover diseño */}
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-yellow-300 text-slate-900 font-semibold">
              ⭐ 5.0
            </span>
            <button className="text-sky-700 hover:underline">
              Sin calificaciones
            </button>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {product.descripcion}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            SKU: {product.sku}
          </p>
        </div>

        <aside className="border border-slate-200 rounded-lg p-4 flex flex-col gap-3 self-start">
          <div className="flex items-baseline gap-2">
            <span className="text-red-700 font-bold text-2xl">
              ${parseFloat(product.precio).toLocaleString("es-MX")}
            </span>
          </div>

          <p className="text-sm font-semibold text-emerald-700">
            {hasStock ? `En stock (${product.stock} disponibles)` : "Sin stock"}
          </p>

          <button
            disabled={!hasStock}
            onClick={handleAddToCart}
            className={`mt-2 w-full rounded-full py-2 text-sm font-semibold transition
              ${
                hasStock
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
          >
            {hasStock ? "Agregar al carrito" : "No disponible"}
          </button>
        </aside>
      </div>
    </main>
  );
}
