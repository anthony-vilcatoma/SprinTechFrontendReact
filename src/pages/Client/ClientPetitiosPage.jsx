import React, { useEffect, useState } from 'react'
import { showAllDirectRequestToOneClient } from '../../apis/Client/DirectRequest'
import { getUserInformation } from '../../apis/Client/UserApi'
import { LayaoutDashboard } from '../../components/LayaoutDashboard'
import { ProblemClientComponent } from '../../components/Client/ProblemClientComponent';

export default function ClientPetitiosPage() {
    const [directRequestAll, setDirectRequest] = useState([]);
    const [clientId, setClientId] = useState([]);
    console.log(directRequestAll)


    const showAllRequestInProcess = () => {
        const access_token = window.localStorage.getItem("access_token")
        showAllDirectRequestToOneClient(access_token, clientId, 2)
            .then(res => setDirectRequest(res.data.body))
        console.log("mostrando los en proceceso")
    }

    const showAllRequestInPending = () => {
        const access_token = window.localStorage.getItem("access_token")
        showAllDirectRequestToOneClient(access_token, clientId, 1)
            .then(res => setDirectRequest(res.data.body))
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
            <div className="w-6/12  flex flex-col gap-y-7 justify-between mx-auto py-5 bg-white shadow-personalized rounded-2xl px-4">
                {directRequestAll.map(e => (

                    <ProblemClientComponent e={e} />
                ))}
            </div>

        </LayaoutDashboard>
    )
}
