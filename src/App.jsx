import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Corregido: importación de 'react-router-dom'
import { CartProvider } from "./context/CartContext"; // Importar el Proveedor

// Pages imports
import { Home } from "./pages/Home";

// Components imports
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartAside } from "./components/CartAside"; // Importar el nuevo carrito

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
]);

function App() {

  return (
    <CartProvider>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
      <CartAside />
    </CartProvider>
  )
}

export default App;