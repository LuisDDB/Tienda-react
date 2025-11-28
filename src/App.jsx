import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Pages
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import PaymentMethod from "./pages/PaymentMethod";

// Components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartAside } from "./components/CartAside";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <CartProvider>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout/payment" element={<PaymentMethod />} />
          </Routes>

        </main>

        <Footer />
        <CartAside />
      </CartProvider>
    </div>

  );
}

export default App;
