import React from 'react'

export default function ServiceCardComponent({serviceObject}) {
    console.log(serviceObject);
    return (
        <>
            <div
                className="service relative shadow-md shadow-gray-500 w-3/12	 mr-24 h-fit py-5 bg-white rounded-lg p-3 px-5">
                <b className="absolute top-2 right-5 text-gray-300">{serviceObject.service.categoryServiceId}</b>
                <b className="text-lg ">{serviceObject.service.name}</b>
                <p className="mb-2 text-gray-400 font-base mt-2">{serviceObject.service.description}</p>
                <div className="flex justify-between items-center">
                    <b>S/{serviceObject.service.price}</b>
                    <div className="flex-buttons">
                        <button className="btn_ver-service bg-white border-2  px-2 rounded-md">Editar</button>
                        <button className="bg-orange-personalized p-1 px-3 rounded-md text-white">Más
                            Información</button>
                    </div>
                </div>
            </div>
        </>
    )
}
