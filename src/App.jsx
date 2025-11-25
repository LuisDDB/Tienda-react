import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Pages
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";

// Components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartAside } from "./components/CartAside"; 

function App() {
  return (
    <CartProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>

      <Footer />
      <CartAside />
    </CartProvider>
  );
}

export default App;
