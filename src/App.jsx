import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import PaymentMethod from "./pages/PaymentMethod";
import { LogIn } from "./pages/LogIn";
import Pedido from "./pages/Pedido";
import Registro from "./pages/Registro";

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
            <Route path="/login" element={<LogIn />} />
            <Route path="/registro" element={<Registro />} />

            <Route
              path="/checkout/payment"
              element={
                <PrivateRoute>
                  <PaymentMethod />
                </PrivateRoute>
              }
            />

            <Route
              path="/pedido"
              element={
                <PrivateRoute>
                  <Pedido />
                </PrivateRoute>
              }
            />
          </Routes>

        </main>

        <Footer />
        <CartAside />
      </CartProvider>
    </div>

  );
}

export default App;
