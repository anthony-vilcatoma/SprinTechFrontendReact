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


  // Usuario que va a poder ser leído de forma global en la app
  //const [user, setUser] = useState(null) //Devuelve un valor con estado y una función para actualizarlo.
  const [isAuthenticated, setAuthenticated] = useState(false); // !!.. convierte en un valor booleano
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
    setAuthenticated(false)
  }

    // Cuando se carge la pagina
    useEffect(() => {
      async function checkLogin() {
        const tokenStored = localStorage.getItem("access_token");
  
        // Si no se encontro el token
        if (tokenStored == null) {
          setAuthenticated(false)
          setLoading(false)
          return 
        }
  
        // En caso exista el token
        try {
          // enviamos el token para que se verifique en el backend
          const res = await verifyTokenRequest({"token":tokenStored})
          
          // Si no se recibe una respuesta
          if (!res) {
            setAuthenticated(false)
            setLoading(false)
            return;
          }

          // Si se recibe una respuesta(user)
          setAuthenticated(true)
          setLoading(false)
        } catch (error) {
          // Si axios recibío un error
          setAuthenticated(false)
          setLoading(false)
        }
      }
      // EJECUTAMOS LA FUNCION ASINCRONA
      checkLogin()
    },[])  


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