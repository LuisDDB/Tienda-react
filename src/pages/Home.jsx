// src/pages/Home.jsx (ejemplo simplificado)
import { Card } from "../components/Card";

const products = [
  { id: "1", name: "Skechers Uno", price: 1221.89, stock: 80 },
  { id: "2", name: "Producto Genérico", price: 800, stock: 0 },
];

export function Home() {
  return (
    <main className="min-h-[calc(100vh-8rem)] bg-white px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-10">
        Tienda React
      </h2>

      <section className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Card key={p.id} {...p} />
        ))}
      </section>
    </main>
  );
}
