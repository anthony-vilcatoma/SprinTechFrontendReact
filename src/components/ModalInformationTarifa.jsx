import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getOneInvoice } from '../apis/Client/Invoice';
import { changeStateDirectRequest } from '../apis/Client/DirectRequest';

export function ModalInformationTarifa({ onClose, directRequestId }) {
    function acepptedTarifa(){
        const access_token = window.localStorage.getItem("access_token")
        changeStateDirectRequest(access_token,directRequestId,{stateId:2})
        .then(res=>onClose())
    }

    function rechazedTarifa(){
        const access_token = window.localStorage.getItem("access_token")
        changeStateDirectRequest(access_token,directRequestId,{stateId:4})
        .then(res=>onClose())
    }
    const [tarifa, setTarifa] = useState({
        id: null,
        task: "",
        description: "",
        price: null,
        date: null,
        hour: null,
        materiales: []
    })
    useEffect(() => {
        const access_token = window.localStorage.getItem("access_token")
        getOneInvoice(access_token, directRequestId)
            .then(res => setTarifa(res.data.body[0]))
    }, [])
    return (
        <>
            <Modal show={true} onClose={onClose} size="lg" style={{ fontFamily: 'Urbanist, sans-serif' }}>
                <Modal.Body className="rounded-xl py-5 px-10 relative ">
                    <button className="absolute top-5 right-5"><i class=' bx bxs-x-circle text-3xl' onClick={onClose} ></i></button>
                    <div className="flex-col justify-center items-center">
                        <div className="flex justify-between items-center">
                            <h1 className='text-2xl font-bold text-center mb-5'>COTIZACIÓN</h1>
                            <div className="bg-white flex justify-center items-center w-5/12 mb-5 mr-5 p-4 shadow-lg  rounded-lg">
                                <p className='font-semibold text-base mr-5 '>Precio:</p>
                                <p className='text-gray-400 font-bold  text-sm'>S/{tarifa.price }</p>
                            </div>
                        </div>
                        <div className="bg-white mb-5 p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-lg">
                            <p className='font-base text-base'> Asunto</p>
                            <p className='text-gray-400  text-sm'>{tarifa.task}</p>
                        </div>

                        <div className="bg-white mb-5 p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  rounded-lg">
                            <p className='font-base text-base'> Descripción de la cotización</p>
                            <p className='text-gray-400  text-sm'>{tarifa.description}</p>
                        </div>

                        <div className="bg-white mb-5 p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-lg">
                            <p className='font-base text-base'> Posibles Repuestos o Materiales necesarios.</p>
                            <p className='text-gray-400 mb-2 text-xs'>Ten presente que estos repuestos están detallados como estimación por parte del técnico, ofreciéndote una visión aproximada del posible costo en caso de ser necesarios esos cambios.</p>
                            <p className='text-red-400 mb-2 text-xs'>El valor y la cantidad de estos repuestos no están incluidos en la tarifa indicada.</p>

                            <div className=" overflow-x-auto mt-5 h-32 shadow-md sm:rounded-lg">
                                <div className="overflow-x-auto  shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="py-3 text-xs px-6">Nombre</th>
                                                <th scope="col" className="py-3 text- px-6">Precio</th>
                                                <th scope="col" className="py-3 px-6">Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-xs '>

                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="py-4 px-6">WINCHA 200</td>
                                                <td className="py-4 px-6">23.45</td>
                                                <td className="py-4 px-6">2</td>
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="py-4 px-6">WINCHA 200</td>
                                                <td className="py-4 px-6">23.45</td>
                                                <td className="py-4 px-6">2</td>
                                            </tr>   <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="py-4 px-6">WINCHA 200</td>
                                                <td className="py-4 px-6">23.45</td>
                                                <td className="py-4 px-6">2</td>
                                            </tr>   <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="py-4 px-6">WINCHA 200</td>
                                                <td className="py-4 px-6">23.45</td>
                                                <td className="py-4 px-6">2</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>

                            </div>
                        </div>

                        <div className="flex justify-center items-center">
                            <button onClick={rechazedTarifa} className='p-2 rounded-lg mr-5 font-semibold text-white bg-gray-400'>Rechazar</button>
                            <button onClick={acepptedTarifa} className='p-2 rounded-lg font-semibold bg-personalized text-white '>Aceptar</button>
                        </div>
                    </div>

                </Modal.Body >

            </Modal >
        </>
    );
}
