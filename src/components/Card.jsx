// src/components/Card.jsx
import { Link } from "react-router-dom";

export function Card({ id, name, price, stock }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition bg-white">
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <p className="text-red-600 font-bold text-lg">${price}</p>
      <p className="text-sm text-slate-600">Stock: {stock}</p>

      <Link
        to={`/product/${id}`}
        className="mt-2 inline-flex justify-center rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700 transition"
      >
        Ver detalles
      </Link>
    </div>
  );
}

