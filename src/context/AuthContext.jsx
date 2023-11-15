// CONTEXT: Es una forma de crear un almacenamiento global o compartido que puede ser accesible por todos los componentes que están "suscritos" a ese contexto.

import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from "../apis/Client/auth";


// Exportamos este contexto
export const AuthContext = createContext()

/**
 * verifica si el la ruta es hija de este contexto, 
 * para que pueda usar sus valores globales 
*/
export const useAuth = () => {
  // Devuelve el valor del contexto actual
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return context;
}

/**
 * Este provider es un componente que va a englobar a otros
 */
export const AuthProvider = ({children}) => {

  const storedToken = localStorage.getItem("access_token");
  // Usuario que va a poder ser leído de forma global en la app
  //const [user, setUser] = useState(null) //Devuelve un valor con estado y una función para actualizarlo.
  const [isAuthenticated, setAuthenticated] = useState(!!storedToken); // !!.. convierte en un valor booleano
  const [loading, setLoading] = useState(true) // Utilizaremos determinar si la solicitud carga


  const login = async (user) => {
    try {
      const res = await loginRequest(user)
      console.log(res)
      // Enviar token al LOCAL STORAGE
      const {token} = res.data.body
      localStorage.setItem("access_token", token);
      
      setAuthenticated(true)
    } catch (error) {
      console.log(error)
      // Agregar los errores a un useState
    }
  }

  const logout = () => {
    // Remover token del LOCAL STORAGE
    localStorage.removeItem("access_token")
    sessionStorage.removeItem("hasToken")
    setAuthenticated(false)
  }


  useEffect( () => {
    // Verificar solo si no hay token en sessionStorage
    const hasTokenInSessionStorage = sessionStorage.getItem('hasToken');

    async function checkLogin() {
      try {
        const res = await verifyTokenRequest({"token": storedToken});

        if (!res.data) {
          setAuthenticated(false);
          setLoading(false);
          return;
        }

        setAuthenticated(true);
        sessionStorage.setItem('hasToken', 'true'); // Marcar que ya se hizo la verificación
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    if (!hasTokenInSessionStorage && storedToken) {
      // Validamos el token usando la API
      checkLogin();
    } else if (hasTokenInSessionStorage) {
      // No es necesario verificar, utilizar el resultado almacenado previamente
      setAuthenticated(true);
      setLoading(false);
    } else {
      // No hay token, establecer estado en consecuencia
      setAuthenticated(false);
      setLoading(false);
    }
  }, [storedToken])

  return (
    <AuthContext.Provider value={{
      // Todos los componentes hijos podrán utilizar:
      login,
      isAuthenticated,
      loading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )

}