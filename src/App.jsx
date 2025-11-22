import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

//Pages imports
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";



//components impots
import { Navbar } from "./components/navbar";
import { Footer } from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login", 
    element: <LogIn />,
  }
]);

function App() {
 
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  )
}

export default App
