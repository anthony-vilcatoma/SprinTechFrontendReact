import React, { useEffect, useState } from 'react'
import { showAllDirectRequestToOneTechnical } from '../../apis/Client/DirectRequest';
import ClientCardProblem from './ClientCardProblem';
import { MapComponent } from '../Client/MapComponenet';
import DropDownStateRequest from './DropDownStateRequest';
import { ProblemClientComponent } from '../Client/ProblemClientComponent';

export default function ClientPetition({ technicalId,requestClients,changeRequests,setUbication }) {
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    showAllDirectRequestToOneTechnical(accessToken, technicalId, 1)
      .then(res => {
        console.log(res.data.body)
        changeRequests(res.data.body)
      })
  }, [])
  return (
    <>
    
    <div id="solicitudes" className="grid gap-y-4 px-4 py-3">

              {requestClients.map((e,index)=>
              (
                <ProblemClientComponent setUbication={(data)=>{
                  setUbication(data)}} e={e} typeModal={"Technical"}/>

              ))}
              


              </div>

    </>
  )
}
