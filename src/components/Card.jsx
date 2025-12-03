// src/components/Card.jsx (MEJORADO)
import { Link } from "react-router-dom";

export function Card({ id, name, price, stock }) {
  const isAvailable = stock > 0;
  
  // Clase base para el texto de stock
  let stockClass = "text-sm font-medium ";
  
  // Cambiamos el color según la disponibilidad
  if (isAvailable) {
    stockClass += "text-green-600"; // Producto disponible
  } else {
    stockClass += "text-red-600"; // Producto agotado
  }

  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition bg-white">
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <p className="text-red-600 font-bold text-lg">${price}</p>
      
      {/* 1. Uso de lógica para mostrar el stock */}
      <p className={stockClass}>
        {isAvailable ? `Stock: ${stock}` : "¡AGOTADO!"}
      </p>

      {/* 2. Controlar la visibilidad o apariencia del botón */}
      {isAvailable ? (
        <Link
          to={`/product/${id}`}
          className="mt-2 inline-flex justify-center rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700 transition"
        >
          Ver detalles
        </Link>
      ) : (
        <button
          disabled // Deshabilitamos el botón
          className="mt-2 inline-flex justify-center rounded-full bg-gray-400 px-4 py-1.5 text-sm font-semibold text-white cursor-not-allowed"
          title="Este producto está agotado"
        >
          Producto agotado
        </button>
      )}
    </div>
  );
}