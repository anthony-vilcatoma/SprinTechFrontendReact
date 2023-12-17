import  { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


export function RegisterFormPage(){
    const { register: registerForm, handleSubmit, formState: {errors}, } = useForm() 
    const { isAuthenticated, register, errors: registerErrors } = useAuth();
    const navigate = useNavigate();


    useEffect( () => {
        if (isAuthenticated) navigate('/configuracion')
    },[isAuthenticated]) // se ejecutará si isAuthenticated cambia

    // handleSubmit: procesa los datos del formulario y realiza la lógica necesaria al enviar el formulario.
    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        register({
            ...data,
            professions: []
        }); // pasamos los valores del usuario
    })

    console.log(errors)
   
    return (
        <section className="flex flex-col md:flex-row-reverse h-screen items-center bg-white">
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-3/5 h-screen">
                <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                <div className="w-full h-100">
                    <img src="/logo.svg" alt="" />
                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-3 mb-2">Sign Up</h1>
                    <p>
                        ¿Ya tienes una cuenta? <Link  to="/iniciar-session" className="text-blue-500 font-semibold">Sign Up</Link>
                    </p>
                    <form className="mt-6" onSubmit={onSubmit}>
                        {
                            registerErrors.map((error, i) => (
                                <p className="text-red-500" key={i}>
                                  {error}
                                </p>
                              ))
                        }
                        <div>
                            {/* hook useForm puede hacer seguimiento de los valores, validaciones, etc */}
                            <input 
                                className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-300 focus:bg-white focus:outline-none' 
                                type="text" 
                                {...registerForm('name', {required: true})}
                                placeholder='John'
                            />
                            {
                                errors.name && (
                                    <p className="text-red-500 text-xs">Este campo es requerido</p>
                                )
                            }
                        </div>

                        <div className='flex flex-row justify-between gap-x-3'>
                            <div className="flex flex-col w-1/2">
                                <input 
                                    className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-300 focus:bg-white focus:outline-none' 
                                    type="text" 
                                    placeholder='Lopez'
                                    {...registerForm('lastname', {required: true})}
                                />
                                {
                                    errors.lastname && (
                                        <p className="text-red-500 text-xs">Este campo es requerido</p>
                                    )
                                }
                            </div>
                            <div className="flex flex-col w-1/2">
                                <input 
                                    className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-300 focus:bg-white focus:outline-none' 
                                    type="text" 
                                    placeholder='Mendoza'
                                    {...registerForm('motherLastname', {required: true})}
                                />
                                {
                                    errors.motherLastname && (
                                        <p className="text-red-500 text-xs">Este campo es requerido</p>
                                    )
                                }
                            </div>
                        </div>

                        <div className='flex flex-row justify-between gap-x-3'>
                            <div className="w-1/2">
                                <input 
                                    className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-300 focus:bg-white focus:outline-none text-gray-500' 
                                    type="date" 
                                    {...registerForm('birthDate', {required: true})}
                                />
                                {
                                    errors.birthDate && (
                                        <p className="text-red-500 text-xs">Este campo es requerido</p>
                                    )
                                }
                            </div>
                            <div className="w-1/2">
                                <input 
                                    className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-300 focus:bg-white focus:outline-none' 
                                    type="text"
                                    {...registerForm('dni', {
                                        required: true,
                                        minLength: 8,
                                        maxLength: 8
                                    })} 
                                    placeholder='DNI'
                                />
                                {
                                    errors.dni && (
                                        <p className="text-red-500 text-xs">Se requiren 8 caracteres</p>  
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <input 
                                className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-300 focus:bg-white focus:outline-none' 
                                type="email"
                                {...registerForm('email', {required: true})}
                                placeholder='ejemplo@ejemplo.com' 
                            />
                            {
                                errors.email && (
                                    <p className="text-red-500 text-xs">Este campo es requerido</p>
                                )
                            }
                        </div>
                        <div>
                            <input 
                                className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-300 focus:bg-white focus:outline-none' 
                                type="password" 
                                {...registerForm('password', {
                                    required: true,
                                    minLength: 4
                                })}
                                placeholder='Ingrese su nueva contraseña'
                            />
                            {
                                errors.password && (
                                    <p className="text-red-500 text-xs">4 caracteres como mínimo</p>
                                )
                            }
                        </div>

                        <div className='flex flex-row justify-between gap-x-3 items-center'>
                            <div className="flex flex-col w-1/2">
                                <input 
                                    className='w-full px-4 py-3 rounded-lg mt-2 border border-gray-300 focus:bg-white focus:outline-none' 
                                    type="password" 
                                    {...registerForm("confirmPassword", {
                                        validate: (value, formValues) => value === formValues.password,
                                        required: true,
                                        minLength: 4
                                    })}
                                    placeholder='Confirmar contraseña'
                                />
                                {
                                    errors.confirmPassword && (
                                        <p className="text-red-500 text-xs">4 caracteres como mínimo</p>
                                    )
                                }
                            </div>
                            <div className="flex flex-col w-1/2">
                                <select
                                    {...registerForm("roleId", {required: true})}
                                    style={{height:'50.47px'}}
                                    className="px-4 w-full mt-2 border-gray-300 rounded-md text-gray-500 	
                                dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                                    <option disabled selected value="">Tipo de cuenta</option>
                                    <option value="1">Cliente</option>
                                    <option value="2">Tecnico</option>
                                </select>
                                {
                                    errors.roleId && (
                                        <p className="text-red-500 text-xs">No se selecciono un tipo de cuenta</p>
                                    )
                                }
                            </div>
                        </div>

                        <button type="submit" className="w-full block bg-orange-personalized  text-white font-semibold rounded-lg px-4 py-3 mt-6">
                            Crea una cuenta gratis
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
}