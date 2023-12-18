import React, { useState } from 'react'
import { ModalInformationProblem } from './ModalInformationProblem';
import { ModalTarifaComponent } from '../Technical/ModalTarifaComponent';
import { ModalInformationTarifa } from '../../components/ModalInformationTarifa'
import { changeStateDirectRequest } from '../../apis/Client/DirectRequest';
import { ModalMap } from '../Technical/ModalMap';
import ReseñaModal from './ReseñaModal';
import toast, { Toaster } from 'react-hot-toast';

export const ProblemClientComponent = ({ renderComponent, e, typeModal, setUbication,showInProcess,showIsPending}) => {
    const id = e.id
    let fechaActual = new Date(e.createdAt);
    let opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    let fechaEnEspañol = fechaActual.toLocaleString('es-PE', opciones);

    const ubicateClient = { lat: e.latitude, lng: e.longitude }
    const ubicateTechnical = {lat:e.professionAvailability.technical.latitude,lng:e.professionAvailability.technical.longitude}


    const [modalTarifa, setModalTarifa] = useState(false);
    const [showModalInformation, setShowModalInformation] = useState(false);
    const [viewModalInformationTarifa, setModalInformationTarifa] = useState(false);
    const [viewMap, setViewMap] = useState(false);

    const [reseñaModal,setReseñaModal] = useState(false);

    console.log(e)
    function cancelPetition() {
        const access_token = window.localStorage.getItem("access_token")
        changeStateDirectRequest(access_token, id, { stateId: 4 })
            .then(res => { renderComponent();
                toast('Se cancelo la petición!', {
                    icon: '🥺',
                  });
            })
    }

    function solicitarCierre() {
        const access_token = window.localStorage.getItem("access_token")
        changeStateDirectRequest(access_token, id, { stateId: 5 })
            .then(res => { 
                renderComponent(); 
                toast.success('Se ha solicitado al cliente que confirme la finalización del servicio!')
            })
    }

    function ConfirmarFinalización(){
        const access_token = window.localStorage.getItem("access_token")
        changeStateDirectRequest(access_token, id, { stateId: 3 })
            .then(res => { showInProcess(); 
                toast.success('Servicio Culminado! Felicidades! ')

            })
    }
    return (
        <>

            <div id="solicitud" className="flex relative  flex-row h-40	 h-max-44 shadow-solicitud rounded-2xl p-4">
                {e.stateInvoice == "1" ? (<button onClick={() => { setModalInformationTarifa(true) }} className='absolute top-2 right-5 bg-gray-200 rounded-md p-1 block'><i className='bx bx-spreadsheet text-2xl' ></i></button>) : ""}
                {typeModal == "Technical" ? "" : (<>{e.state.id == 2 || e.state.id == 5 ? (<button onClick={() => { setViewMap(true) }} className='absolute top-2 right-14 bg-gray-200 rounded-md p-1 block text-2xl'><i className='bx bx-map-alt' ></i></button>) : ""}</>)}

                <img width="163" style={{ height: '123px' }} className="rounded-lg mr-3" src={`data:${e.files[0].contentType};base64,${e.files[0].file}`} alt="" />
                <div className="pl-4 flex flex-col justify-between">
                    <div id="head-card" className="flex flex-row justify-between gap-x-4">
                        <div>
                            <h2 className="text-lg font-medium">{e.title}</h2>
                            <p className="text-sm w-8/12">{e.description}.</p>
                        </div>
                        <div>
                            {typeModal == "Technical" && e.stateInvoice == 1 ? (
                                ""
                            ) : (
                                <>
                                    {typeModal === "Technical" && e.stateInvoice == 0 ? (
                                        <button onClick={() => {
                                            setModalTarifa(true);
                                        }} className="px-1 py-2 rounded-md text-sm bg-personalized font-semibold text-white">COTIZAR</button>

                                    ) : ""}
                                </>
                            )}

                        </div>
                    </div>
                    <div id="footer-card" className="flex flex-row justify-between">
                        <span className="text-blue-400">{e.state.name}</span>
                        <span className="text-slate-500">{e.categoryService.name}</span>
                        <span>{fechaEnEspañol}</span>
                        <div className="flex flex-row gap-x-2">
                            <button onClick={() => {
                                setShowModalInformation(true)
                            }} className="p-2 text-white font-semibold text-xs rounded-md bg-slate-400">VER MÁS</button>




                            {typeModal == "Technical" && e.state.id == 2 ? (<button onClick={solicitarCierre} className="p-2 text-gray-500 rounded-md bg-gray-300 ">Solicitar Cierre</button>)
                                :
                                <>
                                    {(typeModal == "Technical" && (e.state.id == 1 || e.state.id==5)) ? "" :

                                        <>
                                            {
                                                e.state.id == 5 ? ( <button onClick={()=>{
                                                    setReseñaModal(true);
                                                }}  className='p-2 text-gray-500 rounded-md bg-gray-300'>
                                                Confirmar Finalización
                                            </button>) : <>
                                                {
                                                    e.state.id==3? "": (
                                                        <button onClick={cancelPetition} className='p-2 text-gray-500 rounded-md bg-gray-300'>
                                                            Cancelar
                                                        </button>
                                                    )
                                                }
                                            </>

                                            }
                                        </>
                                    }
                                </>
                            }

                            {typeModal == "Technical" && e.state.id == 1 ? (<button onClick={() => { setUbication(ubicateClient) }} className="p-2 text-white font-semibold text-xs rounded-md bg-slate-400">VER UBICACIÓN</button>
                            ) : ""}


                            {
                                (typeModal == "Technical" && (e.state.id == 2 || e.state.id == 5)) ? ((<button onClick={() => { setUbication(ubicateClient) }} className='absolute top-2 right-14 bg-gray-200 rounded-md p-1 block text-2xl'><i className='bx bx-map-alt' ></i></button>
                                )) : ""
                            }


                        </div>
                    </div>
                </div>
            </div>
                    
            {reseñaModal ? <ReseñaModal  directRequest={e}  howIsPending={()=>{
                showIsPending();
            }} showInProcess={()=>{
                showInProcess();
            }} 
            cancel={()=>{ConfirmarFinalización()}} onClose={()=>{
                setReseñaModal(false)
            }} /> : ""}
                    

            {viewModalInformationTarifa ? <ModalInformationTarifa e={e}  showIsPending={()=>{
                showIsPending();
            }} showInProcess={()=>{
                showInProcess();
            }} renderComponent={()=>{renderComponent()}} type={typeModal} directRequestId={e.id} onClose={() => {
                setModalInformationTarifa(false)
            }} /> : ""}

            {showModalInformation ? <ModalInformationProblem  type={typeModal} directRequest={e} onClose={() => {
                setShowModalInformation(false)
            }} /> : ""}

            {modalTarifa ? <ModalTarifaComponent renderComponent={()=>{
                renderComponent();
            }} directRequest={e} onClose={() => {
                setModalTarifa(false)
            }} /> : ""}

            {
                viewMap ? <ModalMap  type={"clientviewMapTechnical"} onClose={() => { setViewMap(false) }} posibleLocation={
                    {
                        lat: ubicateTechnical.lat,
                        lng: ubicateTechnical.lng
                    }
                } /> : ""
            }

        </>
    )
}
