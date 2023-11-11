import { useEffect } from "react";
import { TicketOne } from "../../components/Admin/TicketOne";
import { LayaoutDashboard } from "../../components/LayaoutDashboard";
import { useState } from "react";
import { getTickets } from '../../apis/Admin/TicketApi'

export function TicketsPage() {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        getTickets()
        .then((data) => {
            if (Array.isArray(data)) {
                // Guardar los tickets en el estado
                setTickets(data);
                console.log(data);
            } else {
                console.error("Los datos recibidos del API no son un array:", data);
            }
        });
    }, [])
    return (
        <LayaoutDashboard>
            <section className="container w-10/12 mx-auto p-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr
                                    className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3 text-center">Usuario</th>
                                    <th className="px-4 py-3 text-center">Titulo</th>
                                    <th className="px-4 py-3 text-center">Categoria</th>
                                    <th className="px-4 py-3 text-center">Fecha</th>
                                    <th className="px-4 py-3 text-center">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {tickets.map((ticket) => (
                                    <TicketOne
                                        id={ticket.id}
                                        name={ticket.user.name}
                                        lastnames={ticket.user.fatherLastname}
                                        issue={ticket.issue}
                                        date={ticket.date}
                                        state={ticket.state}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </LayaoutDashboard>
    );
}