export function TicketOne({ name, lastnames, issue, category="Servicio", date, state ,id}) {
    let text = "";
    let etiqueta = "";
    let cursorStyle = "auto"; // Establecemos el valor predeterminado del cursor a "auto"

    if (state === "0") {
        text = "ATENDIDO";
        etiqueta = 'relative rounded px-5 py-2.5 overflow-hidden group bg-red-500 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-reed-400 transition-all ease-out duration-300';
    } else {
        text = "ATENDER";
        etiqueta = 'relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300';
        cursorStyle = "pointer"; // Cambiamos el estilo del cursor a "pointer" cuando el estado es 1
    }

    return (
        <tr className="text-gray-700">
            <td className="px-4 py-3 border">
                <div className="flex items-center text-sm">
                    <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img className="object-cover w-full h-full rounded-full"
                            src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                            alt="" loading="lazy" />
                        <div className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"></div>
                    </div>
                    <div>
                        <p className="font-semibold text-black">{name}</p>
                        <p className="text-xs text-gray-600">{lastnames}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-ms font-semibold text-center border">{issue}</td>
            <td className="px-4 py-3 text-xs border">
                <span
                    className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {category}
                </span>
            </td>

            <td className="px-4 py-3 text-sm border">{date}</td>

            <td className="px-4 py-3 text-xs border">
                <a href={`/atenttion/${id}`}>
                    <button
                        className={etiqueta}
                        style={{ cursor: cursorStyle }}> {/* Establecemos el estilo del cursor aquí */}
                        <span
                        className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative">{text}</span>
                    </button>
                </a>
            </td>
        </tr>
    );
}
