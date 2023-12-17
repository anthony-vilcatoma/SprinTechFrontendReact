import  { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export function LoginFormPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { isAuthenticated,setAuthenticated, login, checkoutLogin } = useAuth();
    console.log("AUTHENTICATE: "+ isAuthenticated)
    // Cuando se authentique navegará a /service
    useEffect( () => {
        if (isAuthenticated){
            const accessToken =  window.localStorage.getItem("access_token")
            const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
            const role = decodedToken.roleId;
            if(role==1){
                navigate('/buscar-tecnico')
            }        
            else if(role==2){
                navigate('/solicitudes-recibidas')
            }
            else{
                navigate('/atenttion/1')
            }
        }
    },[isAuthenticated]) // se ejecutará si isAuthenticated cambia

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // AUTHENTICAMOS EN SPRING BOOT
            const res = await login(JSON.stringify(formData));
            
            // CASO CONTRARIO AUTHENTICAMOS EN DJANGO
            if (res.status !== 200){
                const response = await fetch("http://localhost:8000/api/admin/authenticate/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    // La solicitud fue exitosa, puedes manejar la respuesta aquí
                    const data = await response.json();
                    if(data.access_token){
                        // Guardar el token de acceso en localStorage
                        localStorage.setItem("access_token", data.access_token);
                        // Guardar el token de actualización en localStorage
                        localStorage.setItem("refresh_token", data.refresh_token);
                        setAuthenticated(true);
                    }
                                        
                }
            } 
        }
        catch (error) {
            console.error("Error al procesar la solicitud:", error);
        }

    };

    // un evento representa todo cambio en html(input,click etc)
    //event contiene información sobre el evento, como el tipo de evento (cambio, clic, etc.)
    const handleInputChange = (event) => {
        //event.target para acceder a las propiedades y valores específicos del elemento que causó el evento.
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section className="flex flex-col md:flex-row-reverse h-screen items-center bg-white">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-3/5 h-screen">
                <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                <div className="w-full h-100">
                    <img src="/logo.svg" alt="" />
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 mb-2">Sign In</h1>
                
                    <form className="mt-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label className="block text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Ingresa tu correo electrónico"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoFocus
                                autoComplete="email"
                                required
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                minLength="6"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex justify-between mt-3">
                            <div className="inline-flex items-center">
                                <label className="relative flex cursor-pointer items-center rounded-full p-3" htmlFor="login" data-ripple-dark="true">
                                    {/* Resto del código para el checkbox */}
                                </label>
                                {/* Resto del código para el enlace de "Recuérdame" */}
                            </div>

                            <a href="#" className="text-sm mt-3 font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button type="submit" className="w-full block bg-orange-personalized text-white font-semibold rounded-lg px-4 py-3 mt-6">
                            Iniciar Sesión
                        </button>
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />

                    <p className="mt-8">
                        ¿Necesitas una cuenta? <Link to="/registrar" className="text-blue-500 hover:text-blue-700 font-semibold">Crea una cuenta</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
