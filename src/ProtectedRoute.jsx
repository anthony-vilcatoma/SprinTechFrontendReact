// Como este componente se encuentra dentro de AuthProvider en App.jsx tiene acceso a AuthContext.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  console.log("AUTHENTICADO: "+isAuthenticated)
  // Si se carga la pagina, utilizar un componente

  // Si no se esta cargando la pagina y no esta authenticado
  if (!loading && !isAuthenticated) {
     console.log("Redirige a login")
    // replace: reemplazará la ruta a /login si es que se intenta retroceder(en caso acaba de hacer LOGOUT)
    return <Navigate to='/iniciar-session' replace />
  }

  // Si ya no se esta cargando y ESTA AUTHENTICADO...
  return (
    <Outlet /> // Continua con el elemento de la ruta hija, si hay una.
  )
}
export default ProtectedRoute