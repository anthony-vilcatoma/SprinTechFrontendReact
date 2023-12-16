import React, { useState } from 'react'
import { ModalInformationProblem } from './ModalInformationProblem';
import { ModalTarifaComponent } from '../Technical/ModalTarifaComponent';
import { ModalInformationTarifa } from '../../components/ModalInformationTarifa'
import { changeStateDirectRequest } from '../../apis/Client/DirectRequest';
import { ModalMap } from '../Technical/ModalMap';
export const ProblemClientComponent = ({ e, typeModal,setUbication }) => {
    const id=e.id
    const ubicateClient  = {lat:e.latitude,lng:e.longitude}
    const [modalTarifa, setModalTarifa] = useState(false);
    const [showModalInformation, setShowModalInformation] = useState(false);
    const [viewModalInformationTarifa, setModalInformationTarifa] = useState(false);
    const [viewMap,setViewMap] = useState(false);
    console.log("compilando componente")
    function cancelPetition(){
        const access_token = window.localStorage.getItem("access_token")
        changeStateDirectRequest(access_token,id,{stateId:4})
        .then(res=>console.log("xd"))
    }
    return (
        <>

            <div id="solicitud" className="flex relative flex-row h-40	 h-max-44 shadow-solicitud rounded-2xl p-4">
                {e.stateInvoice == "1" ? (<button onClick={() => { setModalInformationTarifa(true) }} className='absolute top-2 right-5 bg-gray-200 rounded-md p-1 block'><i className='bx bx-spreadsheet text-2xl' ></i></button>) : ""}
                {typeModal=="Technical" ? "" : (<>{e.state.id == 2 ? (<button onClick={() => { setViewMap(true) }} className='absolute top-2 right-14 bg-gray-200 rounded-md p-1 block text-2xl'><i className='bx bx-map-alt' ></i></button>) : ""}</>)}

                <img width="163" style={{ height: '123px' }} className="rounded-lg" src={`data:${e.files[0].contentType};base64,${e.files[0].file}`} alt="" />
                <div className="pl-4 flex flex-col justify-between">
                    <div id="head-card" className="flex flex-row justify-between gap-x-4">
                        <div>
                            <h2 className="text-lg font-medium">Necesito que arreglen mi motor</h2>
                            <p className="text-sm">Mi motor necesita atención y estoy en busca de alguien con habilidades para solucionar problemas mecánicos...</p>
                        </div>
                        <div>
                            {typeModal == "Technical" && e.stateInvoice == 1 ? (
                                ""
                            ) : (
                                <>
                                    {typeModal === "Technical"  && e.stateInvoice == 0  ? (
                                        <button onClick={() => {
                                            setModalTarifa(true);
                                        }} className="px-1 py-2 rounded-md text-sm bg-personalized font-semibold text-white">COTIZAR</button>

                                    ) : ""}
                                </>
                            )}

                        </div>
                    </div>
                    <div id="footer-card" className="flex flex-row justify-between">
                        <span className="text-blue-400">Pendiente</span>
                        <span className="text-slate-500">Reparación</span>
                        <span>2024-12-21 05:54</span>
                        <div className="flex flex-row gap-x-2">
                            <button  onClick={() => {
                                setShowModalInformation(true)
                            }}  className="px-1 py-2 text-white font-semibold text-xs rounded-md bg-slate-400">VER MÁS</button>

                            {typeModal == "Technical" ? (<button onClick={()=>{setUbication(ubicateClient)}} className="px-3 py-0.5 text-white font-semibold text-xs rounded-md bg-cyan-personalized">VER EN<br />MAPA</button>
                            ) : (
                                <button onClick={cancelPetition} className='p-2 text-gray-500 rounded-md bg-gray-300 mr-5'>
                                    Cancelar
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            
            {viewModalInformationTarifa ? <ModalInformationTarifa  type={typeModal} directRequestId={e.id} onClose={() => {
                setModalInformationTarifa(false)
            }} /> : ""}

            {showModalInformation ? <ModalInformationProblem directRequest={e} onClose={() => {
                setShowModalInformation(false)
            }} /> : ""}

            {modalTarifa ? <ModalTarifaComponent directRequest={e} onClose={() => {
                setModalTarifa(false)
            }} /> : ""}

            {
                viewMap ? <ModalMap onClose={()=>{setViewMap(false)}} posibleLocation={
                    {
                        lat:12.232323,
                        lng:72.232323
                    }
                }/> :""
            }
            
        </>
    )
}
