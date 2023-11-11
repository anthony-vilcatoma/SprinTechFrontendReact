import { LayaoutDashboard } from "../components/LayaoutDashboard";
import imgPerfil from "../assets/images/perfil.svg"
const ConfigurationPage = () => {
    return (
        <LayaoutDashboard>
            <div style={{ fontFamily: 'Urbanist, sans-serif' }}>
           
            <header className="bg-white w-full px-2 md:px-20 py-3 2xl:px-60">
                <nav className="flex justify-end text-gray-500">
                    <div className="flex items-center lg:block hidden">
                        <ul className="flex flex-row gap-x-10">
                            <li>Hola</li>
                            <li>Hola</li>
                            <li>Hola</li>
                            <li>Hola</li>
                        </ul>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">View notifications</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                />
                            </svg>
                        </button>

                        {/* Profile dropdown */}
                        <div className="relative ml-3">
                            <div className="flex flex-row gap-x-4 items-center">
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </button>
                                <span>Adrian C.</span>
                                <i className="bx bx-chevron-down"></i>
                            </div>

                            {/* Dropdown menu, show/hide based on menu state */}
                            <div className="absolute hidden right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                {/* Active: "bg-gray-100", Not Active: "" */}
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                                    Your Profile
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
                                    Settings
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="px-2 md:px-20 bg-gray-300 pb-12 2xl:px-60">
                <h1 className="text-2xl font-semibold py-4 text-center">Configuraciones de la Cuenta</h1>

                {/* CONTENT */}
                <div className="bg-white rounded py-3 px-5 sm:px-10 mx-auto max-w-5xl">
                    <h2 className="text-2xl font-semibold py-4">Mi cuenta</h2>

                    {/* PROFILE PHOTO */}
                    <div className="flex flex-row items-center gap-x-5">
                        <img className="w-24" src={imgPerfil} alt="" />
                        <button className="h-fit bg-personalized text-white font-semibold rounded px-2 py-1">Cambiar</button>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold pt-4">Perfil de Trabajo</h2>
                        <p className="text-gray-400 text-sm font-medium">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
                        </p>

                        <div className="pt-4">
                            <div className="flex flex-wrap justify-between sm:gap-y-4">

                                <div className="">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <input type="text" placeholder="Nombre" className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <input type="text" placeholder="Nombre" className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <input type="text" placeholder="Nombre" className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>

                            </div>
                            <div className="flex flex-wrap justify-between pt-4">

                                <div className="">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <input type="text" placeholder="Nombre" className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <input type="text" placeholder="Nombre" className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className="">
                                    <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                                    <input type="text" placeholder="Nombre" className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold pt-4">Email</h2>
                        <p className="text-gray-400 text-sm font-medium">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
                        </p>

                        <label htmlFor="" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                        <div className="flex flex-wrap gap-2 ">
                            <input type="text" placeholder="Nombre" className="rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <button className="px-3 py-1 rounded border border-slate-300">
                                <span className="font-medium text-slate-800">Cambiar</span>
                            </button>
                        </div>

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

                        <hr className="my-6" />

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
