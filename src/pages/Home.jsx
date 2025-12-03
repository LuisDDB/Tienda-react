// src/pages/Home.jsx (MODIFICADO)
import { Card } from "../components/Card";
import { SearchrBar } from "../components/SearchrBar";
import { useState, useEffect } from "react"; // <-- Importamos useEffect

// ** URL de tu API **
// Asegúrate de que esta URL sea correcta. Si estás en localhost, podría ser algo así:
const API_URL = "http://localhost:8000/api/productos.php"; 

export function Home() {
  // 1. Estado para almacenar TODOS los productos de la API
  const [products, setProducts] = useState([]); 
  
  // 2. Estado para almacenar los productos que se muestran (filtrados)
  const [filtered, setFiltered] = useState([]); 
  
  // 3. Estado opcional para manejar la carga y errores
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Función para obtener los productos ---
  const fetchProducts = async () => {
    setIsLoading(true); // Indica que la carga está iniciando
    setError(null);     // Limpia errores previos
    try {
      const response = await fetch(API_URL, { method: 'GET' });

      // Verificar si la respuesta fue exitosa (código 200)
      if (!response.ok) {
        console.log(response);
      }

      const data = await response.json();
      
      // Almacenamos los datos en ambos estados: products y filtered
      setProducts(data);
      setFiltered(data);
      
    } catch (err) {
      console.error("Error al obtener los productos:", err);
      setError("No se pudieron cargar los productos. " + err.message);
      setProducts([]); // Asegura que los arrays estén vacíos en caso de error
      setFiltered([]);
    } finally {
      setIsLoading(false); // Indica que la carga ha finalizado (éxito o error)
    }
  };

  // --- useEffect para cargar los datos al inicio ---
  useEffect(() => {
    fetchProducts();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

  // --- Lógica del filtrado (AJUSTADA) ---
  const handleSearch = (query) => {
    const q = query.toLowerCase();

    // Filtramos sobre el array COMPLETO (products), no sobre el estático
    const results = products.filter((p) =>
      p.nombre.toLowerCase().includes(q) // Usamos 'nombre' porque así se llama en tu API/BD
    );

    setFiltered(results);
  };

  // --- Renderizado del componente ---
  return (
    <main className="min-h-[calc(100vh-8rem)] bg-white px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-10">
        Tienda React
      </h2>

      {/* Barra de búsqueda */}
      <div className="max-w-4xl mx-auto mb-8">
        <SearchrBar onSearch={handleSearch} />
      </div>
      
      <section className="max-w-6xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Manejo de estados: Carga y Error */}
        {isLoading && (
          <p className="text-center col-span-full text-blue-600">Cargando productos...</p>
        )}

        {error && (
          <p className="text-center col-span-full text-red-600 font-bold">{error}</p>
        )}

        {/* Mostrar productos filtrados (solo si no hay error y no está cargando) */}
        {!isLoading && !error && (
          filtered.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">
              No se encontraron productos.
            </p>
          ) : (
            filtered.map((p) => (
              // Asegúrate de que las props coincidan con los campos de tu API/BD:
              // product_id, nombre, descripcion, precio, stock, sku
              <Card 
                key={p.product_id} 
                id={p.product_id} // Usar product_id como ID
                name={p.nombre} 
                price={p.precio} 
                stock={p.stock}
                // Si Card necesita más props, pásalas aquí
              />
            ))
          )
        )}
      </section>
    </main>
  );
}