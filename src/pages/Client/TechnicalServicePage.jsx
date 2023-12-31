import React, { useEffect } from 'react'
import { LayaoutDashboard } from '../../components/LayaoutDashboard'
import { useState } from 'react';
import ProfessionServiceComponent from '../../components/Technical/ProfessionServiceComponent';
import { getAllProfessionByTechnical } from '../../apis/Client/ProfessionApi';
import { getUserInformation } from '../../apis/Client/UserApi';
import {  useNavigate } from 'react-router-dom';
export default function TechnicalServicePage() {
    const navigate = useNavigate();

    
    const [professionServices, setProfessionServices] = useState([]);
    const [technicalId,setTechnicalId] = useState();

    let professionsUnique = [];
    professionServices.forEach(element => {
        if (!professionsUnique.some(e => e.profession.id === element.profession.id)) {
            professionsUnique.push(element);
        }
    });



    useEffect(() => {
        const token = window.localStorage.getItem("access_token");
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const role = decodedToken.roleId;
        if(role==1){
            navigate('/buscar-tecnico')
        }        
        else if(role==3){
            navigate('/lista-reclamos')
        }
        getUserInformation(decodedToken.sub, token)
            .then(res =>{
                setTechnicalId(res.data.body.id)
                getAllProfessionByTechnical(token, res.data.body.id)
                    .then(res => {
                        const data = res.data.body;
                        setProfessionServices(data);
                    })})
    }, [])

    console.log(professionsUnique, "xdsadsad")
    return (
        <LayaoutDashboard>
            <div className="container-service-information bg-white w-11/12 mx-auto mt-24  rounded-xl h-4/5  pt-6 overflow-y-scroll">
                <p className="w-8/12 ml-1 text-gray-500 mb-5 ml-16">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.Excepteur sint occaecat.</p>

                {
                    professionsUnique.map((e,index) => <ProfessionServiceComponent key={index} technicalId={technicalId} professionId={e.profession.id} professionName={e.profession.name} />
                    )
                }

            </div>


        </LayaoutDashboard>
    );
}
