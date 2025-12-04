import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLogged = localStorage.getItem("isLogged");

  if (!isLogged || isLogged === "false") {
    return <Navigate to="/login" replace  state={{ from: location.pathname }}/>;
  }

  return children;
}
