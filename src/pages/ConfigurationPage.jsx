import { LayaoutDashboard } from "../components/LayaoutDashboard";
import imgPerfil from "../assets/images/perfil.svg"
import { useEffect, useState } from "react";
import { getUserInformation } from "../apis/Client/UserApi";
import { Button, Modal } from 'flowbite-react';
import ModalAddProfession from "../components/Client/ModalAddProfession";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import { set } from "react-hook-form";
import ModalUpdateProfession from '../components/Client/ModalUpdateProfession';
import { updateTechnicalInformation } from "../apis/Client/TechnicalsApi";

const ConfigurationPage = () => {
    const [technicalId,setTechnicalId] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [professionUpdateModal, setProfessionUpdateModal] = useState({});




    const [viewPassword, setViewPassword] = useState(true);
    const [renderComponent, setRenderComponent] = useState(true);

    const [userInformation, setUserInformation] = useState({
        name: null,
        lastname: null,
        motherLastname: null,
        birthDate:null,
        latitude:null,
        longitude:null
    });

    const changeDataUserInformation = (event) =>{
        const {name,value} = event.target;
        setUserInformation({...userInformation,[name]:value});
    }

    const updateUserInformation =()=>{
        const accessToken = window.localStorage.getItem("access_token")
        updateTechnicalInformation(accessToken,userInformation,technicalId)
        .then(res=>console.log(res.data.body))
        
    }
    const [professionsUser, setProfessionsUser] = useState([]);

    //Estado dependiente de otro estado, este almacenara las professiones pero evitara que se repitan!
    const professionNameAndExperience = professionsUser.map(e => {
        return { id: e.id, profession: e.profession, experience: e.experience, availability: e.availability }
    })

    console.log(professionNameAndExperience)


    const professionMap = new Map();
    professionNameAndExperience.forEach(item => {
        const key = `${item.profession.id}_${item.experience.id}`;
        if (!professionMap.has(key)) {
            professionMap.set(key, item);
        } else {
            const existingItem = professionMap.get(key);
            existingItem.availability.name = 'Ambas';
        }
    });

    const uniqueProfessions = Array.from(professionMap.values());

    console.log("Unique professions", uniqueProfessions);


    useEffect(() => {
        const accessToken = window.localStorage.getItem("access_token");
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        getUserInformation(decodedToken.sub, accessToken)
            .then(response => {
                const data = response.data.body
                console.log("user",data);
                let date = new Date(data.birthDate);
                setUserInformation({
                    ...userInformation,
                    name: data.name,
                    lastname: data.lastname,
                    motherLastname: data.motherLastname,
                    birthDate:date,
                    latitude:data.latitude,
                    longitude:data.longitude
                })

                setProfessionsUser(data.professionsAvailability)
                setTechnicalId(data.id)

            })
    }, [renderComponent])



    return (
        <LayaoutDashboard>
            <div style={{ fontFamily: 'Urbanist, sans-serif' }}>


                <main className="px-2 md:px-20 bg-gray-300 pb-12 2xl:px-60">
                    <h1 className="text-2xl font-semibold py-4">Configuraciones de la Cuenta</h1>

                    {/* CONTENT */}
                    <div className="bg-white rounded py-3 px-5 sm:px-10 mx-auto max-w-5xl">
                        <h2 className="text-2xl font-semibold py-4">Mi cuenta</h2>

                        {/* PROFILE PHOTO */}
                        <div className="flex flex-row items-center gap-x-5">
                            <img className="w-24" src={imgPerfil} alt="" />
                            <button onClick={updateUserInformation} className="h-fit bg-personalized text-white font-semibold rounded px-2 py-1">Actualizar Datos</button>
                        </div>

                        <div className="grid gap-y-2">

                            <div className="pt-4">
                                <div className="flex flex-row justify-between gap-y-3 gap-x-5">

                                    <div className="w-1/3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                        <input onChange={changeDataUserInformation} type="text" placeholder="Nombre" value={userInformation.name} name="name" className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                    <div className="w-1/3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Ap. Paterno</label>
                                        <input type="text" name="lastname" onChange={changeDataUserInformation} placeholder="Nombre" value={userInformation.lastname} className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                    <div className="w-1/3">
                                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Ap. Materno</label>
                                        <input type="text" onChange={changeDataUserInformation} name="motherLastname" placeholder="Nombre" value={userInformation.motherLastname} className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>

                                </div>

                            </div>

                            {/* CONTRASEÑA */}
                            <div>
                                <h2 className="text-2xl font-semibold pt-4">Contraseña</h2>
                                <p className="text-gray-400 text-sm font-medium">
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
                                </p>

                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                <div className="flex flex-wrap gap-2 ">
                                    <input type={viewPassword ? "password" : "text"} placeholder="**********" className="rounded-md border-0 py-1.5 pl-7  pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    <button className="px-3 py-1 rounded border border-slate-300">
                                        <span className="font-medium text-amber-600" onClick={() => {
                                            setViewPassword(!viewPassword);
                                        }}>Ver</span>
                                    </button>
                                    <button className="px-3 py-1 rounded border border-slate-300">
                                        <span className="font-medium text-slate-800">Cambiar</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-row">

                                {/* PROFESSIONES Y EXPERIENCIA */}
                                <div className="w-3/5">
                                    <h2 className="text-2xl font-semibold pt-4">Profesiones y experiencia</h2>
                                    <p className="text-gray-400 text-sm font-medium mb-3">
                                        Excepteur sint occaecat cupidatat non proident.
                                    </p>
                                    <div className="flex flex-row gap-x-3">
                                        <div className="flex">
                                            <button className="px-3 py-2 rounded bg-personalized text-white hover:bg-blue-400" onClick={() => setOpenModal(true)}>Agregar Profession</button>

                                            <Link to={"/service/configuration"} className="ml-5 px-3 py-2 rounded bg-personalized text-white hover:bg-gray-400">Ver tus Servicios</Link>
                                            {openModal ? <ModalAddProfession technicalId={technicalId} professionsExistAlready={professionsUser} reloadComponent={() => { setRenderComponent(!renderComponent) }} open={() => setOpenModal(true)} close={() => setOpenModal(false)} /> : ""}
                                        </div>
                                       
                                    </div>
                                </div>

                                {/* DISPONIBILIDAD */}
                                <div className="w-3/4">
                                    <div className=" overflow-x-auto h-60 shadow-md sm:rounded-lg">
                                        <div className="overflow-x-auto  shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="py-3 px-6">Profession</th>
                                                        <th scope="col" className="py-3 px-6">Experiencia</th>
                                                        <th scope="col" className="py-3 px-6">Disponibilidad</th>
                                                        <th scope="col" className="py-3 px-6">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        uniqueProfessions.map((element,key) =>
                                                        (<tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td className="py-4 px-6">{element.profession.name}</td>
                                                            <td className="py-4 px-6">{element.experience.name}</td>
                                                            <td className="py-4 px-6">{element.availability.name}</td>
                                                            <td className="py-4 px-6">
                                                                <button onClick={() => {
                                                                    setOpenUpdateModal(true);
                                                                    setProfessionUpdateModal({
                                                                        id: element.id
                                                                    })
                                                                }}><i className='bx bxs-edit inline-block align-middle' style={{ color: '#1e293b' }}></i></button>

                                                                <i className='bx bx-trash inline-block align-middle' style={{ color: '#1e293b' }}></i>
                                                            </td>
                                                        </tr>)
                                                        )

                                                    }

                                                    {openUpdateModal ? <ModalUpdateProfession tecnicoId={technicalId} professionAvailabilityId={professionUpdateModal.id} reloadComponent={() => { setRenderComponent(!renderComponent) }} open={() => setOpenUpdateModal(true)} close={() => setOpenUpdateModal(false)} /> : ""}


                                                </tbody>
                                            </table>
                                        </div>

                                    </div>



                                </div>
                            </div>


                            <hr className="my-3" />

                            <div className="flex justify-end gap-x-4 mb-2">
                                <button className="px-3 py-1 rounded border border-slate-300">
                                    <span className="font-medium text-slate-800">Cancelar</span>
                                </button>
                                <button className="px-3 py-1 rounded bg-personalized">
                                    <span className="font-medium text-slate-100">Salvar</span>
                                </button>
                            </div>





                        </div>
                    </div>
                    {/* END CONTENT */}
                </main>
            </div>
        </LayaoutDashboard>
    );
};

export default ConfigurationPage;
