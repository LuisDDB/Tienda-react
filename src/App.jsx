import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

//Pages imports
import { Home } from "./pages/Home"

//components impots
import { Navbar } from "./components/navbar";
import { Footer } from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
