// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Pages
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";

// Components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

