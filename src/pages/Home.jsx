// src/pages/Home.jsx (ejemplo simplificado)
import { Card } from "../components/Card";
import {SearchrBar} from "../components/SearchrBar";
import { useState } from "react";

const products = [
  { id: "1", name: "Skechers Uno", price: 1221.89, stock: 80 },
  { id: "2", name: "Producto Genérico", price: 800, stock: 0 },
];

export function Home() {
  const [filtered, setFiltered] = useState(products);

  //  Lógica del filtrado
  const handleSearch = (query) => {
    const q = query.toLowerCase();

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(q)
    );

    setFiltered(results);
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-white px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-10">
        Tienda React
      </h2>

      {/*  Barra de búsqueda */}
      <div className="max-w-4xl mx-auto mb-8">
        <SearchrBar onSearch={handleSearch} />
      </div>

      {/*  Mostrar productos filtrados */}
      <section className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filtered.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
            No se encontraron productos.
          </p>
        ) : (
          filtered.map((p) => <Card key={p.id} {...p} />)
        )}
      </section>
    </main>
  );
}

