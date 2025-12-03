// src/pages/Product.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api/productos.php"; 

export function Product() {
  const { id } = useParams(); // <-- ID desde la URL

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el producto por ID
  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?id=${id}`, { method: "GET" });

      if (!response.ok) {
        throw new Error("No se pudo obtener el producto");
      }

      const data = await response.json();

      // Si tu API retorna un solo objeto directamente:
      setProduct(data);

      // SI TU API RETORNA UN ARRAY (descomenta esto):
      // const found = data.find((p) => p.product_id == id);
      // setProduct(found);

    } catch (err) {
      setError("Error al cargar la información del producto.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Estados de espera
  if (isLoading) {
    return <p className="text-center mt-14 text-blue-600">Cargando producto...</p>;
  }

  if (error) {
    return <p className="text-center mt-14 text-red-600">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-14 text-gray-600">Producto no encontrado.</p>;
  }

  // Render dinámico
  return (
    <main className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-red-500 mb-6">
        {product.nombre}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Imagen */}
        <div>
          <img
            src={product.imagen || "https://via.placeholder.com/400"}
            alt={product.nombre}
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Información */}
        <div>

          <p className="text-lg text-gray-700 mb-4">
            {product.descripcion || "Sin descripción."}
          </p>

          <p className="text-2xl font-semibold text-green-600 mb-2">
            ${product.precio}
          </p>

          <p className="text-gray-700">
            Stock disponible: <strong>{product.stock}</strong>
          </p>

          <button
            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Agregar al carrito
          </button>

        </div>
      </div>
    </main>
  );
}
