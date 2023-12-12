import React, { useEffect, useState } from 'react'
import { getServicesByCategorylByProfession } from '../../apis/Client/TechnicalsApi'
import { Carousel } from 'flowbite-react';
import TechnicalService from './TechnicalService';

export default function TechnicalInformation({formData, profession, name, lastnames, birthDate, categoryServiceId, technical_id }) {

    const [services,setServices] = useState([]);
    // Convertir milisegundos a objeto Date
    let fecha = new Date(birthDate);

    // Calcular la fecha actual
    let fechaActual = new Date();

    // Calcular la diferencia en años entre las fechas para obtener la edad
    let edad = fechaActual.getFullYear() - fecha.getFullYear();

    // Verificar si el cumpleaños ya ha pasado este año
    // Si no ha pasado, restamos un año a la edad
    if (
    fecha.getMonth() > fechaActual.getMonth() ||
    (fecha.getMonth() === fechaActual.getMonth() && fecha.getDate() > fechaActual.getDate())
    ) {
    edad--;
    }

    console.log(services,"help")
    useEffect(() => {
        const accessToken = window.localStorage.getItem("access_token")
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));

        getServicesByCategorylByProfession(accessToken, profession.id, categoryServiceId,technical_id)
            .then(res => {
                console.log("servivios",res.data.body)
                setServices(res.data.body)
            })
    },[])
    console.log("servivios",services)
    return (
        <div className="specialist-all  pb-5 px-8 mb-24 w-7/12  bg-white  h-fit  rounded-2xl shadow-2xl">
            <div className="w-full flex pt-6 px-6 mt-9 justify-between relative ">
                <div className="flex flex-col w-8/12">
                    <div className="flex w-full">
                        <div className="w-44 h-44  rounded-full">
                            <img src="https://media.licdn.com/dms/image/D4E03AQGL3n6z72AIWw/profile-displayphoto-shrink_400_400/0/1672936799998?e=1703116800&v=beta&t=IrO6HtIhjunq9u1PPhN_kWXVvML7YS6us2AuhP0vCFU"
                                width="100%" height="100%" className="rounded-full" />
                        </div>
                        <div className="information w-6/12 pt-6">

                            <ul>
                                <li><b>Nombres:</b> {name}</li>
                                <li><b>Apellidos:</b> {lastnames}</li>
                                <li><b>Edad:</b> {edad} años</li>
                                <li><b>Experiencia:</b> Universitario</li>
                                <li><b>Profession:</b> {profession.name}</li>

                            </ul>
                        </div>
                    </div>
                    <button className="solicitar  mt-1 flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">Ver Comentarios</button>

                </div>

                <div className="habilities w-4/12 rounded-2xl">
                    <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                        <span className="text-base font-semibold mb-3 ml-2 block">Comunicación</span>
                        <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                            <div className="lvl-data w-10/12 h-full bg-green-400 rounded"></div>
                        </div>
                    </div>
                    <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                        <span className="text-base font-semibold mb-3 ml-2 block">Experiencia</span>
                        <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                            <div className="lvl-data w-6/12 h-full bg-green-600 rounded"></div>
                        </div>
                    </div>
                    <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                        <span className="text-base font-semibold mb-3 ml-2 block">Puntualidad</span>
                        <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                            <div className="lvl-data w-9/12 h-full bg-green-600 rounded"></div>
                        </div>
                    </div>
                    <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                        <span className="text-base font-semibold mb-3 ml-2 block">Trabajo</span>
                        <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                            <div className="lvl-data w-6/12 h-full bg-green-600 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="comentario mt-5 font-bold">Servicios por Categoria </h1>
            <hr className="borde-comentario rounded mb-5" />
            <div className="flex justify-between w-full p-5 ">

                <div className="service-card w-7/12 bg-gray-100 rounded-md 	h-fit pb-5  px-5 pt-3	 ">
                    <Carousel slide={false}>
                        {
                            services.map((element)=><TechnicalService  serviceTypeAvailabilityId={element.id} formData={formData} file={element.service.file} title={element.service.name} description={element.service.description} price={element.service.price}/>
                            )
                        }
                    </Carousel>
                </div>


                <div className="w-5/12 flex flex-col items-center">
                    <div className="habilities w-11/12 rounded-2xl">
                        <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                            <span className="text-base font-semibold mb-3 ml-2 block">Comunicación</span>
                            <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                                <div className="lvl-data w-10/12 h-full bg-green-600 rounded"></div>
                            </div>
                        </div>
                        <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                            <span className="text-base font-semibold mb-3 ml-2 block">Experiencia</span>
                            <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                                <div className="lvl-data w-6/12 h-full bg-green-600 rounded"></div>
                            </div>
                        </div>
                        <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                            <span className="text-base font-semibold mb-3 ml-2 block">Puntualidad</span>
                            <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                                <div className="lvl-data w-9/12 h-full bg-green-600 rounded"></div>
                            </div>
                        </div>
                        <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                            <span className="text-base font-semibold mb-3 ml-2 block">Trabajo</span>
                            <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                                <div className="lvl-data w-6/12 h-full bg-green-600 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <form className="w-11/12" action="">
                        <button
                            className="boton_buscar mt-4 flex items-center justify-center w-full font-bold	 text-2xl p-3 mx-auto rounded-md">SOLICITAR</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
