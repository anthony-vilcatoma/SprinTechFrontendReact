import React, { useEffect, useState } from 'react'
import TechnicalModalService from '../Client/TechnicalModalService';
import ServiceCardComponent from './ServiceCardComponent';
import { getAllServicesByProfessionAndTechnical } from '../../apis/Client/ServiceProfession';

export default function ProfessionServiceComponent({ professionId,professionName,technicalId}) {
    const [renderComponent,setRenderComponent] = useState(true);


    const [openModal, setOpenModal] = useState(false);
    const [services, setServices] = useState([]);
    useEffect(() => {
        const token = window.localStorage.getItem("access_token")
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        getAllServicesByProfessionAndTechnical(token, technicalId, professionId)
            .then(res => setServices(res.data.body))
    }, [renderComponent])
    return (
        <>
            <div className="professionService  w-11/12 mb-24 mx-auto h-fit  ">
                <div className="flex">
                    <h1 className="font-bold text-xl mr-2 mb-5">{professionName}</h1>
                    <button
                        className="p-0.5 w-7 h-7 flex justify-center items-center rounded-full bg-orange-personalized font-black  text-white" onClick={() => setOpenModal(true)}>+</button>
                    {openModal ? <TechnicalModalService   technicalId={technicalId} render={()=>{
                        setRenderComponent(!renderComponent)
                    }} professionId={professionId} open={() => setOpenModal(true)} close={() => setOpenModal(false)} /> : ""}
                </div>
                <div className="services-cards flex  flex-wrap  gap-y-12">
                    {
                        services.map((e,index) => <ServiceCardComponent key={index} serviceObject={e}/>
                        )
                    }
                </div>
            </div>
        </>
    )
}
