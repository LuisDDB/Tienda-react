import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// Pages imports
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import Pedido from "./pages/Pedido";
import Registro from "./pages/Registro";

// Components imports
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/pedido",
    element: <Pedido />,
  },
  {
    path: "/registro",
    element: <Registro />,
  }
]);

function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
