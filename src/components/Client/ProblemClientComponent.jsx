import React, { useState } from 'react'
import { ModalInformationProblem } from './ModalInformationProblem';
import { ModalTarifaComponent } from '../Technical/ModalTarifaComponent';
import { ModalInformationTarifa } from '../../components/ModalInformationTarifa'
export const ProblemClientComponent = ({ e, typeModal }) => {
    const [modalTarifa, setModalTarifa] = useState(false);
    const [showModalInformation, setShowModalInformation] = useState(false);
    const [viewModalInformationTarifa, setModalInformationTarifa] = useState(false);
    return (
        <>
            <div className="flex relative mx-auto rounded-xl max-w-4xl pr-5 pl-1	py-4 w-10/12 bg-gray-100 mb-10">
                {e.stateInvoice == "1" ? (<button onClick={() => { setModalInformationTarifa(true) }} className='absolute top-2 right-5 bg-gray-200 rounded-md p-1 block'><i class='bx bx-spreadsheet text-2xl' ></i></button>) : ""}
                <div className="w-3/12 rounded-lg p-1 ml-2 mr-4 flex justify-center mr-1 items-center ">
                    <img src={`data:${e.files[0].contentType};base64,${e.files[0].file}`} alt="" className='w-48 h-32 rounded-lg' />
                </div>
                <div className="w-9/12 h-16 ">
                    <div className="w-10/12 h-20 mb-5">
                        <p className='text-lg font-semibold mb-3'>{e.title}</p>
                        <p className='block h-8 text-gray-400 text-xs font-semibold'>{e.description}</p>
                    </div>
                    <div className="flex justify-between items-center">

                        <div className="flex">
                            <p className='font-semibold text-blue-400 text-sm mr-5'>{e.state.name}</p>
                            <p className='font-semibold text-sm mr-5'>{e.categoryService.name}</p>
                            <p className='font-semibold text-sm'>2023-12-10 05:23</p>
                        </div>

                        <div className="flex">



                            {typeModal == "Technical" && e.stateInvoice == 1 ? (
                                ""
                            ) : (
                                <>
                                    {typeModal === "Technical" ? (
                                        <button onClick={() => {
                                            setModalTarifa(true);
                                        }} className="bg-green-400 p-2 text-white rounded-md mr-5">
                                            Cotizar
                                        </button>
                                    ) : (
                                        <button className='p-2 text-gray-500 rounded-md bg-gray-300 mr-5'>
                                            Cancelar
                                        </button>
                                    )}
                                </>
                            )}



                            <button onClick={() => {
                                setShowModalInformation(true)
                            }} className='p-2 text-white rounded-md  bg-orange-personalized'>Ver Más</button>
                        </div>
                    </div>
                </div>
            </div>

            {viewModalInformationTarifa ? <ModalInformationTarifa  directRequestId={e.id} onClose={() => {
                setModalInformationTarifa(false)
            }} /> : ""}

            {showModalInformation ? <ModalInformationProblem directRequest={e} onClose={() => {
                setShowModalInformation(false)
            }} /> : ""}

            {modalTarifa ? <ModalTarifaComponent directRequest={e} onClose={() => {
                setModalTarifa(false)
            }} /> : ""}

        </>
    )
}
