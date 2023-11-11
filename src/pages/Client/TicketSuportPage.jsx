import React, { useEffect, useState } from "react";
import { LayaoutDashboard } from "../../components/LayaoutDashboard";
import { getUserInformation, createTicketSupport } from "../../apis/Client/TicketApi"
import { data } from "autoprefixer";
export function TicketSupportPage() {
    // Estado para almacenar los datos del usuario y el formulario
    const [formData, setFormData] = useState({
        userId: 1,
        issue: "",
        description: "",
        date: new Date().toISOString().split('T')[0], // Obtener la fecha actual en formato YYYY-MM-DD
    });


    const [staticInformation, setStaticInformation] = useState({
        name: "",
        lastname: "",
        email: "",
        category: "Sistema", // Valor predeterminado para la categoría
        date: new Date().toISOString().split('T')[0], // Obtener la fecha actual en formato YYYY-MM-DD

    });

    // Efecto para cargar los datos del usuario al cargar el componente
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        /*if (accessToken) {
            try {
                const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
                // Actualizar el estado del formulario con los datos del usuario
                setFormData({
                    ...formData,
                    email: decodedToken.sub,
                });
                console.log("Carga útil del token:", decodedToken);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        } else {
            console.error("No se encontró access_token en localStorage");
        }*/
    }, []); // El efecto se ejecuta solo al cargar el componente ([] como dependencia)


    // un evento representa todo cambio en html(input,click etc)
    //event contiene información sobre el evento, como el tipo de evento (cambio, clic, etc.)
    const handleInputChange = (event) => {
        //event.target para acceder a las propiedades y valores específicos del elemento que causó el evento.
        const { name, value } = event.target;
        // Actualizar el estado del formulario según el campo modificado
        setFormData({ ...formData, [name]: value });
        console.log(formData);

    };

    // Opciones para la categoría
    const categoryOptions = ["Sistema", "Trabajador", "Mal Trato", "Otro"];



    const SubmitTicketSupport = (event) => {
        event.preventDefault();

        try {
            const accessToken = localStorage.getItem("access_token");

            createTicketSupport(formData, accessToken)
                .then(data => {
                    console.log(data.message);
                })
        } catch (error) {

        }

    }
    return (
        <LayaoutDashboard>
            <section className="py-1">
                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <form onSubmit={SubmitTicketSupport}>

                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                            <div className="rounded-t bg-white mb-0 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="text-blueGray-700 text-xl font-bold">
                                        Formulario de Soporte
                                    </h6>
                                    <button
                                        className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Información Personal
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                Nombres
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={formData.name}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                Apellidos
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={formData.lastname}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Información del mensaje
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                Titulo
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                name="issue"
                                                value={formData.issue}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                Fecha
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={formData.date}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                Correo
                                            </label>
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={formData.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                Categoria
                                            </label>
                                            <select
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}>
                                                {categoryOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Información del Mensaje
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                                Mensaje
                                            </label>
                                            <textarea
                                                type="text"
                                                name="description"
                                                onChange={handleInputChange}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                rows="4"
                                                value={formData.description}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>


            </section>
        </LayaoutDashboard>
    );
}
