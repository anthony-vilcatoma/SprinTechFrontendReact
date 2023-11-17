

export function TechnicalDiv(name,lastname,edad,especialidad){
    return (
        <>
          <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                            <div className="information-request w-7/12">
                                <ul>
                                    <li>
                                        <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> {name}</p>

                                    </li>
                                    <li>
                                        <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> {lastname}</p>
                                    </li>
                                    <li>
                                        <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> {edad}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="botones w-6/12 flex items-center justify-around">
                                <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md">VER</button>
                                <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md">SOLICITAR</button>
                            </div>
                            <span className=" absolute right-7 top-2 font-semibold text-gray-400">{especialidad}</span>
                        </div>  
        </>
        );
    }
   