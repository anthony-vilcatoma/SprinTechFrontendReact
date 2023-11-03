import { LayaoutDashboard } from "../components/LayaoutDashboard";
import { useEffect, useState } from "react";
export function AnswerSuportPage(){

    const [formData,setFormData]=useState({
        ticket_support:0,
        help_desk:0,
        title: "",
        answer:"",
        date: new Date().toISOString().split('T')[0], // Obtener la fecha actual en formato YYYY-MM-DD
        
    })

    const [staticInformation,setStaticInformation] = useState({
        correo:"",
        name:"",
        father_lastname:"",
        mother_lastname:"",
        date_ticket:"",
        issue:"",
        description:"",
        nReclamo:0,
    })



    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setFormData({...setFormData,[name]:value});
    }

    useEffect(()=>{
        fetch("http://localhost:8000/api/admin/requesTicket/2")
        .then(res=>res.json())
        .then(ticketSupport =>{
            setStaticInformation({...setStaticInformation,
                correo:ticketSupport.user.userCount.email,
                name:ticketSupport.user.name,
                father_lastname:ticketSupport.user.fatherLastname,
                mother_lastname:ticketSupport.user.motherLastname,
                date_ticket:ticketSupport.date,
                issue:ticketSupport.issue,
                description:ticketSupport.description,
                nReclamo:ticketSupport.id

                });
            console.log(ticketSupport);
        });
            

    },[]);

    return(
        <LayaoutDashboard>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        

                        <div className="bg-white rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-base mb-5">{staticInformation.issue}</p>
                                    
                                    <div className="container-person mb-5  flex items-center justify-evenly">
                                        <img className="object-cover w-24 h-24 rounded-full"
                                                    src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt=""/>
                                        <div className="information">
                                            <ul>
                                                <li className="mb-0"><p>{staticInformation.name}</p></li>
                                                <li className=""><p>{staticInformation.father_lastname} {staticInformation.mother_lastname}</p></li>
                                                <li className=""><b >{staticInformation.date_ticket}</b></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p>{staticInformation.description}</p>

                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <h1 className="text-center mx-auto text-base font-bold flex md:col-span-5">Formulario Respuesta</h1>
                                        <div className="md:col-span-5">
                                            <label for="full_name">Titulo</label>
                                            <input type="text" name="full_name" id="full_name" onChange={handleInputChange}
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.title} />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label for="email">Email Address</label>
                                            <input type="text" name="email" id="email"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="email@domain.com"  readOnly value={staticInformation.correo}/>
                                        </div>

                                        <div className="md:col-span-5">
                                            <label for="address">Comentario</label>
                                            <textarea type="text" name="answer" id="address"
                                                className=" border mt-1 rounded px-4 w-full bg-gray-50"  rows="6" value={formData.answer} onChange={handleInputChange}/>
                                        </div>

                                        
                                        <div className="md:col-span-2">
                                            <label for="country">N° Reclamo</label>
                                            <input type="text"  id="city"
                                                className="h-10 block bg-gray-200 text-gray-500 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="" name="ticket_support" value={staticInformation.nReclamo} readOnly />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label for="state">Fecha</label>
                                            <input type="text" name="city" id="city"
                                                className="h-10 block bg-gray-200 text-gray-500 border mt-1 rounded px-4 w-full bg-gray-50" value={formData.date}
                                                placeholder=""  readonly/>
                                                
                                        </div>

                                        <div className="md:col-span-1">
                                            <label for="zipcode">Hora</label>
                                            <input type="text" name="city" id="city"
                                                className="h-10 block bg-gray-200 text-gray-500 border mt-1 rounded px-4 w-full bg-gray-50" value="12:16 PM"
                                                placeholder="" readonly />
                                        </div>

                                        

                                        

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Responder</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </LayaoutDashboard>

    );

}