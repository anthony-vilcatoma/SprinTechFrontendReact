

export function TechnicalDiv({name, lastnames, birthDate,profession,btnVer,btnRequestSolitude}) {

     // Convertir milisegundos a objeto Date
     let fecha = new Date(birthDate);

     // Calcular la fecha actual
     let fechaActual = new Date();
 
     // Calcular la diferencia en años entre las fechas para obtener la edad
     let edad = fechaActual.getFullYear() - fecha.getFullYear();
 
     // Verificar si el cumpleaños ya ha pasado este año
     // Si no ha pasado, restamos un año a la edad
     if (
     fecha.getMonth() > fechaActual.getMonth() ||
     (fecha.getMonth() === fechaActual.getMonth() && fecha.getDate() > fechaActual.getDate())
     ) {
     edad--;
     }
 
    return (
        <>
            <div className="request relative flex w-full h-fit p-3 mb-5 bg-white rounded-2xl">
                <div className="information-request w-7/12">
                    <ul>
                        <li>
                            <p className="font-medium text-gray-700	"><b className="text-black">NOMBRES:</b> {name}</p>

                        </li>
                        <li>
                            <p className="font-medium text-gray-700	"><b className="text-black">APELLIDOS:</b> {lastnames}</p>
                        </li>
                        <li>
                            <p className="font-medium text-gray-700	"><b className="text-black">EDAD:</b> {edad} años</p>
                        </li>
                    </ul>
                </div>
                <div className="botones w-6/12 flex items-center justify-around">
                    <button className="ver   flex items-center justify-center w-16 h-fit font-bold	  p-3  rounded-md" onClick={btnVer}>VER</button>
                    <button className="solicitar   flex items-center justify-center w-fit h-fit font-bold p-3 rounded-md" onClick={btnRequestSolitude} >SOLICITAR</button>
                </div>

                <span className=" absolute right-7 top-2 font-semibold text-gray-400">{profession}</span>


            </div>
        </>
    );
}


