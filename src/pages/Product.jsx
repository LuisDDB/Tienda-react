// src/pages/Product.jsx
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";  // <-- Importante

const products = [
  {
    id: "1",
    name: "Skechers Uno - Stand on Air, Zapatillas de Deporte Hombre",
    price: 1221.89,
    originalPrice: 1999.0,
    discountPercentage: 39,
    rating: 4.7,
    reviews: 15162,
    boughtLastMonth: 50,
    image: "https://m.media-amazon.com/images/I/61Gdv2VEKOL._AC_UX575_.jpg",
    stock: 80,
    description:
      "Tenis deportivos para hombre con cámara de aire, cómodos para uso diario.",
  },
  {
    id: "2",
    name: "Producto Genérico",
    price: 800,
    originalPrice: 950,
    discountPercentage: 15,
    rating: 4.3,
    reviews: 200,
    boughtLastMonth: 12,
    image: "https://via.placeholder.com/500x400",
    stock: 0,
    description: "Otro producto de ejemplo.",
  },
];

export function Product() {
  const { id } = useParams();
  const { addItem, toggleCart } = useCart();  // <-- Traer funciones del carrito

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-slate-100">
        <p className="text-lg font-semibold text-red-600">
          Producto no encontrado.
        </p>
      </main>
    );
  }

  const hasStock = product.stock > 0;

  // Función al presionar el botón
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });

    toggleCart(); // Opcional: abre el carrito automáticamente
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-slate-100 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 grid gap-8 md:grid-cols-[1.1fr_1.6fr_1fr]">

        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] w-auto object-contain"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-yellow-300 text-slate-900 font-semibold">
              ⭐ {product.rating.toFixed(1)}
            </span>
            <button className="text-sky-700 hover:underline">
              {product.reviews.toLocaleString("es-MX")} calificaciones
            </button>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {product.description}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            {product.boughtLastMonth}+ comprados el mes pasado
          </p>
        </div>

        <aside className="border border-slate-200 rounded-lg p-4 flex flex-col gap-3 self-start">
          <div className="flex items-baseline gap-2">
            <span className="text-red-600 font-semibold text-sm">
              -{product.discountPercentage}%
            </span>
            <span className="text-red-700 font-bold text-2xl">
              ${product.price.toLocaleString("es-MX")}
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Precio de lista:{" "}
            <span className="line-through">
              ${product.originalPrice.toLocaleString("es-MX")}
            </span>
          </p>

          <p
            className={`text-sm font-semibold ${
              hasStock ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {hasStock
              ? `En stock (${product.stock} disponibles)`
              : "Sin stock"}
          </p>

          <button
            disabled={!hasStock}
            onClick={handleAddToCart}  // <-- Acción del botón
            className={`mt-2 w-full rounded-full py-2 text-sm font-semibold transition
              ${
                hasStock
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
          >
            {hasStock ? "Agregar al carrito" : "No disponible"}
          </button>

          {!hasStock && (
            <p className="text-xs text-red-700 mt-1">
              Este producto se quedó sin stock. Inténtalo más tarde.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}
