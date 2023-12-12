import React, { useEffect, useState } from 'react'
import { showAllDirectRequestToOneClient } from '../../apis/Client/DirectRequest'
import { getUserInformation } from '../../apis/Client/UserApi'
import { LayaoutDashboard } from '../../components/LayaoutDashboard'

export default function ClientPetitiosPage() {
    const [directRequestAll, setDirectRequest] = useState([]);
    const [clientId,setClientId] = useState([]);
    console.log(directRequestAll)


    const showAllRequestInProcess = ()=>{
        const access_token = window.localStorage.getItem("access_token")
        showAllDirectRequestToOneClient(access_token,clientId,2)
        .then(res=> setDirectRequest(res.data.body))
        console.log("mostrando los en proceceso")
    }

    const showAllRequestInPending = ()=>{
        const access_token = window.localStorage.getItem("access_token")
        showAllDirectRequestToOneClient(access_token,clientId,1)
        .then(res=> setDirectRequest(res.data.body))
        console.log("mostrando los en pendiente")
    }

    useEffect(() => {
        const access_token = window.localStorage.getItem("access_token")
        const decodedToken = JSON.parse(atob(access_token.split('.')[1]));

        getUserInformation(decodedToken.sub, access_token)
            .then(res => {
                setClientId(res.data.body.id)
                var clientId = res.data.body.id

                showAllDirectRequestToOneClient(access_token, clientId, 1)
                    .then(res => setDirectRequest(res.data.body))
            })

    }, [])
    return (
        <LayaoutDashboard>
            <div className="mt-10 flex  justify-between mx-auto rounded-xl max-w-4xl  w-8/12 mb-10">
                <div className="searching w-5/12">
                    <input type="text" className='w-8/12 mr-5 border-none rounded-lg text-gray-600 border-gray-200' />
                    <button className='p-2 text-white rounded-md text-base bg-orange-personalized'>BUSCAR</button>
                </div>
                <div className="flex">
                    <button onClick={showAllRequestInProcess} className="bg-green-400 text-white p-2 mr-5 rounded-lg flex justify-center items-center">En Proceso</button>
                    <button className='bg-blue-400 text-white p-2 flex rounded-lg justify-center items-center' onClick={showAllRequestInPending}>Pendientes</button>
                </div>
            </div>
            {directRequestAll.map(e => (

                <div className="flex relative mx-auto rounded-xl max-w-4xl pr-5 pl-1	py-4 w-8/12 bg-gray-100 mb-10">
                    {e.stateInvoice=="1" ? (<button className='absolute top-2 right-5 bg-gray-200 rounded-md p-1 block'><i class='bx bx-spreadsheet text-2xl' ></i></button>)  :""}
                    <div className="w-3/12 rounded-lg flex justify-center mr-1 items-center ">
                        <img src={`data:${e.files[0].contentType};base64,${e.files[0].file}`} alt="" className='w-48 h-32 rounded-lg' />
                    </div>
                    <div className="w-9/12 h-16 ">
                        <div className="w-10/12  mb-5">
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
                                <button className='p-2 text-gray-500 rounded-md bg-gray-300 mr-5'>Cancelar</button>
                                <button className='p-2 text-white rounded-md  bg-orange-personalized'>Ver Más</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </LayaoutDashboard>
    )
}
