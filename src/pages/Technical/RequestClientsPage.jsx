import React, { useEffect, useState } from 'react'
import { LayaoutDashboard } from '../../components/LayaoutDashboard'
import ClientCardProblem from '../../components/Technical/ClientCardProblem'
import { showAllDirectRequestToOneTechnical } from '../../apis/Client/DirectRequest';
import { getUserInformation } from '../../apis/Client/UserApi';
import { updateWorkingStatus } from '../../apis/Client/TechnicalsApi';
import ClientPetition from '../../components/Technical/ClientPetition';

export default function RequestClientsPage() {
  const [renderComponenet, setRenderComponent] = useState(true);

  const [workingStatus, setWorkingStatus] = useState(false);
  const [technicalId, setTechnicalId] = useState();

  const messageStateWorking = workingStatus ? "DEJAR DE TRABAJAR" : "EMPEZAR A TRABAJAR"


  const changeStateWorking = () => {
    const accessToken = window.localStorage.getItem("access_token");
    const data = {
      "stateId": !workingStatus ? 1 : 0
    }
    updateWorkingStatus(accessToken, technicalId, data)
      .then(res => setRenderComponent(!renderComponenet))
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));

    getUserInformation(decodedToken.sub, accessToken)
      .then(res => {
        const statusWorking = res.data.body.statusWorking;

        setWorkingStatus(statusWorking == 1 ? true : false)
        setTechnicalId(res.data.body.id)
      })

  }, [renderComponenet])
  return (
    <LayaoutDashboard>
      <div className="h-4/6">
        <button onClick={changeStateWorking} className='block mt-5 p-10 bg-gray-200 mx-auto w-fit hover:bg-red-200'>{messageStateWorking}</button>

        {workingStatus ? <ClientPetition technicalId={technicalId} /> : ""}
      </div>

    </LayaoutDashboard>
  )
}
