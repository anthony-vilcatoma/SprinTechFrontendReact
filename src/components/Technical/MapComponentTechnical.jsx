import { useEffect } from "react";
import { getUserLocation } from '../../assets/js/userLocation';
import banderita from '../../assets/images/banderita.png';

export function MapComponentTechnical({ posibleLocation }) {
    var locateP = posibleLocation;

    const initializeMap = async (locate) => {
        try {
            const userLocation = await getUserLocation();

            const map = new window.google.maps.Map(document.getElementById('mapa_technical'), {
                center: (locate && locate.lat != null ? locate : userLocation),
                zoom: 13
            });

            let marker = new window.google.maps.Marker({
                map: map,
                position: (locate && locate.lat != null ? locate : userLocation), // Set marker position here

                draggable: true,
                animation: window.google.maps.Animation.DROP,
            });

            let infowindow = new window.google.maps.InfoWindow({
                content: (locate && locate.lat != null ? 'Ubicacion del cliente' : 'ESTA ES TU UBICACION'), // Message depending on location
            });

            // Show info window at appropriate location
            infowindow.open(map, marker);

            marker.addListener('dragend', function (event) {
                infowindow.setContent('Ubicacion del cliente'); // Update message if marker is dragged
                infowindow.open(map, marker);
            });

        } catch (error) {
            console.error("Error occurred while initializing map:", error);
        }
    };

    useEffect(() => {
        console.log("renderizando");
        initializeMap(locateP);
    }, [locateP]);

    return (
        <div className="map w-full h-full bg-gray-400 rounded-lg">
            <div id='mapa_technical' className="mapa_local w-full rounded-lg h-full bg-gray-400 shadow-2xl">
            </div>
        </div>
    );
}
