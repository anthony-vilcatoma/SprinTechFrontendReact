import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { showAllDirectRequestToOneTechnical, showAllDirectRequestToOneTechnicalAlreadyInvoice } from '../../apis/Client/DirectRequest';

export default function DropDownStateRequest({changeRequests}) {
    const [optionSelected,setOptionSelected] = useState();

    const loadAllAlreadyInvoice = () =>{
        const token = window.localStorage.getItem("access_token")
        showAllDirectRequestToOneTechnicalAlreadyInvoice(token,1,1)
        .then(res=>
            {
                changeRequests(res.data.body)
                console.log(res.data.body)
            })
    }

    const loadAllDirectRequestNoInvoce = () =>{
        const token = window.localStorage.getItem("ac   cess_token")
        showAllDirectRequestToOneTechnical(token,1,1)
        .then(res=>
            {
                changeRequests(res.data.body)
            })
    }
    return (
        <div className=" self-end w-fit content-end mb-2">
            <Dropdown label="Seleccione el tipo de solicitud" dismissOnClick={true}>
                <Dropdown.Item onClick={loadAllDirectRequestNoInvoce}>Solicitudes Recientes</Dropdown.Item>
                <Dropdown.Item onClick={loadAllAlreadyInvoice}>Solicitadas Tarifadas</Dropdown.Item>
                <Dropdown.Item>En Proceso</Dropdown.Item>
                <Dropdown.Item>Terminadas</Dropdown.Item>
            </Dropdown>
        </div>

    );
}
