import React, { useEffect, useState } from 'react'
import { LayaoutDashboard } from '../../components/LayaoutDashboard'
import { showAllDirectRequestToOneClient } from '../../apis/Client/DirectRequest'
import { getUserInformation } from '../../apis/Client/UserApi'
import { ProblemClientComponent } from '../../components/Client/ProblemClientComponent';

export default function HistoryRequestPage() {
    const [directRequest, setDirectRequest] = useState([]);
    const accessToken = window.localStorage.getItem("access_token")
    useEffect(() => {
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));

        getUserInformation(decodedToken.sub, accessToken)
            .then(dataUser => {
                showAllDirectRequestToOneClient(accessToken, dataUser.data.body.id, 3)
                    .then(res => setDirectRequest(res.data.body))
            })


    }, [])
    return (
        <LayaoutDashboard>
            <>
                <div className="mt-10 flex  justify-between mx-auto rounded-xl max-w-4xl  w-8/12 mb-10">
                    <div className="searching w-5/12">
                        <input type="text" className='w-8/12 mr-5 border-none rounded-lg text-gray-600 border-gray-200' />
                        <button className='p-2 text-white rounded-md text-base bg-orange-personalized'>BUSCAR</button>
                    </div>

                </div>
                <div className="w-6/12  flex flex-col gap-y-7 justify-between mx-auto py-5 bg-white shadow-personalized rounded-2xl px-4">
                    {
                        directRequest.map((e, index) => ((
                            <ProblemClientComponent   key={index} renderComponent={() => {
                            }} e={e} />

                        )))
                    }
                </div>

            </>



        </LayaoutDashboard>
    )
}
