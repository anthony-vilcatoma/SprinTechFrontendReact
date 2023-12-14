import React, { useEffect, useState } from 'react'
import { showAllDirectRequestToOneTechnical } from '../../apis/Client/DirectRequest';
import ClientCardProblem from './ClientCardProblem';
import { MapComponent } from '../Client/MapComponenet';
import DropDownStateRequest from './DropDownStateRequest';
import { ProblemClientComponent } from '../Client/ProblemClientComponent';

export default function ClientPetition({ technicalId }) {
  const [requestClients, setRequestClients] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    showAllDirectRequestToOneTechnical(accessToken, technicalId, 1)
      .then(res => {
        console.log(res.data.body)
        setRequestClients(res.data.body)
      })
  }, [])
  return (
    <>
    
    <DropDownStateRequest changeRequests={(requestDirects)=>{
            setRequestClients(requestDirects)
          }}/>    
      <div className="flex justify-between h-full  mt-10 w-11/12 mx-auto">
        <div className="w-5/12 rounded-lg h-4/5	bg-gray-400">
          <MapComponent/>
        </div>
        
        <div className="w-11/12 flex flex-col h-full">
          
          
          <div className="overflow-y-auto pr-3">

          {requestClients.map(element => <ProblemClientComponent typeModal={"Technical"} e={element} />
          )}

        </div>
          </div>
      </div>


    </>
  )
}
