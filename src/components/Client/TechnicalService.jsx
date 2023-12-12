import React from 'react'
import { createServiceRequest } from '../../apis/Client/DirectRequest';

export default function TechnicalService({formData,title,description,price,file,serviceTypeAvailabilityId}) {
    let data_src =`data:${file.contentType};base64,${file.file}`
    const data = formData;
    data.serviceTypeAvailabilityId=serviceTypeAvailabilityId;

    const solicitarRequestUnitario = ()=>{
        const accessToken = window.localStorage.getItem("access_token")
        createServiceRequest(data, accessToken)
        .then(res=>console.log(res.data.body))

    }
    console.log("servicio con formDATA",data)
    return (
        <div className="w-full">
            <p className="text-xl  mx-auto pb-4   text-center	 font-medium">{title}</p>


            <img className="mx-auto object-cover rounded-lg h-48 " width="90%" src={data_src} />


            <p className="text-gray-500 mt-2 px-1 text-sm text-justify w-11/12 mx-auto mt-4">{description}</p>

            <div className="flex justify-between items-center px-5 mt-4">
                <div className="price text-xl font-medium">
                    S/{price}
                </div>
                <button
                    onClick={solicitarRequestUnitario} className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>

            </div>
        </div>)
}
