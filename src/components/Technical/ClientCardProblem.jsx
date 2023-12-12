import React, { useState } from 'react'
import icon from '../../assets/images/distanceIcon.png'
import { ModalProblemInformation } from './ModalProblemInformation';
import {  ModalTarifaComponent } from './ModalTarifaComponent';
export default function ClientCardProblem({ directRequest }) {
    const [modal, setModal] = useState(false);
    const [modalTarifa,setModalTarifa] = useState(false);
    console.log(directRequest)
    let data_src =`data:${directRequest.files[0].contentType};base64,${directRequest.files[0].file}`

    return (
        <>  
            <div className="block w-full flex  mx-auto mb-5 ">

                <div className="w-36  rounded-l-xl bg-white ">
                    <img src={data_src} alt="tailwind logo" className="object-cover rounded-2xl h-full object-fit p-3	" />
                </div>

                <div className="w-full rounded-r-xl w-2/3 bg-white flex flex-col space-y-2  p-3">

                    <div className="flex justify-between">
                        <h3 className="font-black text-gray-800 md:text-base text-xl">{directRequest.title}</h3>

                        <p className="text-gray-500 font-medium ">{directRequest.categoryService.name}</p>

                    </div>
                    <p className="md:text-sm text-gray-500 text-base w-11/12">{directRequest.description}</p>
                    <div className="flex justify-between">

                        <div className="flex justify-center items-center">

                            <img src={icon} className='text-gray-200 h-6' alt="" />
                            <span className="text-gray-600 text-base ml-2 font-bold">5 Km</span>
                        </div>



                        <div className="flex">


                            <button onClick={() => {
                                setModal(true);
                            }} className="ml-5 bg-blue-400 px-3 py-1 rounded-full text-base font-medium text-gray-800 hidden md:block"> Ver más
                            </button>


                            <button onClick={()=>{
                                setModalTarifa(true);
                            }} className="bg-green-400 px-3 py-1 rounded-full text-base font-medium text-gray-800 hidden md:block">
                                Cotizar</button>

                        </div>
                    </div>
                    {modalTarifa ? <ModalTarifaComponent directRequest={directRequest} onClose={()=>{
                        setModalTarifa(false) 
                    }}/>:""}


                    {modal ? <ModalProblemInformation  directRequest={directRequest} onClose={() => {
                        setModal(false)
                    }} /> : ""}
                </div>
            </div>
        </>
    )
}
