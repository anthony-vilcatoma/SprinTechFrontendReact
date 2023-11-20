import { LayaoutDashboard } from "../components/LayaoutDashboard";
import imgPerfil from "../assets/images/perfil.svg"
const ConfigurationPage = () => {
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
                        <button className="h-fit bg-personalized text-white font-semibold rounded px-2 py-1">Cambiar</button>
                    </div>

                    <div className="grid gap-y-2">

                        <div className="pt-4">
                            <div className="flex flex-row justify-between gap-y-3 gap-x-5">

                                <div className="w-1/3">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <input type="text" placeholder="Nombre" className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="w-1/3">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Ap. Paterno</label>
                                    <input type="text" placeholder="Nombre" className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="w-1/3">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Ap. Materno</label>
                                    <input type="text" placeholder="Nombre" className="w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                                <input type="password" placeholder="**********" className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <button className="px-3 py-1 rounded border border-slate-300">
                                    <span className="font-medium text-amber-600">Ver</span>
                                </button>
                                <button className="px-3 py-1 rounded border border-slate-300">
                                    <span className="font-medium text-slate-800">Cambiar</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-row">

                            {/* PROFESSIONES Y EXPERIENCIA */}
                            <div className="w-1/2">
                                <h2 className="text-2xl font-semibold pt-4">Profesiones y experiencia</h2>
                                <p className="text-gray-400 text-sm font-medium mb-3">
                                    Excepteur sint occaecat cupidatat non proident.
                                </p>
                                <div className="flex flex-row gap-x-3">
                                    <div>
                                        <button className="px-3 py-1 rounded border border-slate-300">
                                            <span className="font-medium text-amber-600">Agregar</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-x-2">
                                            <div className="flex flex-col gap-y-2">
                                                <div className="border inline-block py-1 px-3 rounded-full ">
                                                    <span className="mr-2">Mecanico / Ingeniero</span>
                                                    <i className='bx bxs-edit inline-block align-middle' style={{color:'#1e293b'}}></i>
                                                    <i className='bx bx-trash inline-block align-middle' style={{color:'#1e293b'}}></i>
                                                </div>
                                                <div className="border inline-block py-1 px-3 rounded-full ">
                                                    <span className="mr-2">Mecanico / Ingeniero</span>
                                                    <i className='bx bxs-edit inline-block align-middle' style={{color:'#1e293b'}}></i>
                                                    <i className='bx bx-trash inline-block align-middle' style={{color:'#1e293b'}}></i>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>

                            {/* DISPONIBILIDAD */}
                            <div className="w-1/2">
                                <h2 className="text-2xl font-semibold pt-4">Disponibilidad</h2>
                                <p className="text-gray-400 text-sm font-medium">
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
                                </p>

                                <label className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                <div className="flex flex-wrap gap-2 ">
                                    <select name="availabilityId"
                                        className="p-2 block w-6/12 border-gray-200 rounded-md text-base 	
                                        focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 text-gray-400 "
                                    >
                                        <option value="" selected disabled>Elija una disponibilidad</option>
                                        <option value="1">En taller</option>
                                    </select>
                                    <button className="px-3 py-1 rounded border border-slate-300">
                                        <span className="font-medium text-gray-500">Editar</span>
                                    </button>
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
