import React from 'react'
import imgPlantilla from '../../assets/images/plantillaProfile.jpg'
export default function TechnicalInformationPlantilla() {
    return (
        <div className="specialist-all  pb-5 px-8 mb-24 w-7/12  bg-white  h-fit  rounded-2xl shadow-2xl">
            <div className="w-full flex pt-6 px-6 mt-9 justify-between relative ">
                <div className="flex flex-col w-8/12">
                    <div className="flex w-full">
                        <div className="w-44 h-44  rounded-full">
                            <img src={imgPlantilla}
                                width="100%" height="100%" className="rounded-full" />
                        </div>
                        <div className="information w-6/12 pt-6">

                            <ul>
                                <li><b>Nombres:</b> ---</li>
                                <li><b>Apellidos:</b> ---</li>
                                <li><b>Edad:</b> ---</li>
                                <li><b>Experiencia:</b> ---</li>
                                <li><b>Profession:</b> ---</li>

                            </ul>
                        </div>
                    </div>
                    <button className="solicitar  mt-1 flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">Ver Comentarios</button>

                </div>

                <div className="habilities w-4/12 rounded-2xl">
                    <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                        <span className="text-base font-semibold mb-3 ml-2 block">Comunicación</span>
                        <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                            <div className="lvl-data hidden w-10/12 h-full bg-green-400 rounded"></div>
                        </div>
                    </div>
                    <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                        <span className="text-base font-semibold mb-3 ml-2 block">Experiencia</span>
                        <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                            <div className="lvl-data hidden w-6/12 h-full bg-green-600 rounded"></div>
                        </div>
                    </div>
                    <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                        <span className="text-base font-semibold mb-3 ml-2 block">Puntualidad</span>
                        <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                            <div className="lvl-data hidden w-9/12 h-full bg-green-600 rounded"></div>
                        </div>
                    </div>
                    <div className="hability mb-7 w-11/12 mx-auto mt-5 ">
                        <span className="text-base font-semibold mb-3 ml-2 block">Trabajo</span>
                        <div className="nivel w-11/12 porcent h-2 rounded mx-auto ">
                            <div className="lvl-data hidden w-6/12 h-full bg-green-600 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="comentario mt-5 font-bold">Servicios por Categoria </h1>
            <hr className="borde-comentario rounded mb-5" />
            <div className="flex justify-between w-full p-5 ">

                <div className="service-card w-7/12 bg-gray-100 rounded-md 	h-80 pb-5  px-5 pt-3	 ">
                    
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

                    
                </div>
            </div>
        </div>
    )
}
