import { useEffect } from "react";
import { getUserLocation } from '../../assets/js/userLocation';
import banderita from '../../assets/images/banderita.png'

export function MapComponent({ setUbication, posibleLocation }) {
    var locateP = posibleLocation

    const initializeMap = async (locate) => {

        try {
            const userLocation = await getUserLocation();

            const map = new google.maps.Map(document.getElementById('mapa_local'), {
                center: locate.lat!=null ? locate : userLocation,
                zoom: 13
            });
            const iconSize = new window.google.maps.Size(35, 40);
            let marker = new google.maps.Marker({
                position:locate,
                map: map,
                icon: {
                    url: banderita,
                    scaledSize: iconSize,
                },
                draggable: true,
                animation: google.maps.Animation.DROP,
            });

            let infowindow = new google.maps.InfoWindow({
                content: '<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Solicitar Aqui!</button>'
            });

            google.maps.event.addListener(map, 'click', function (event) {
                marker.setPosition(event.latLng);
                marker.setMap(map);
                setUbication(marker.getPosition().lat(), marker.getPosition().lng())
            });

            marker.addListener('dragend', function (event) {
                infowindow.open(map, marker);
            });
        } catch (error) {
            console.error("Error occurred while initializing map:", error);
        }
    };

    useEffect(() => {
            console.log("renderizando")
            initializeMap(locateP);
        

    });
    return (
        <div className="map w-full h-full bg-gray-400 rounded-lg">
            <div id='mapa_local' className="mapa_local w-full rounded-lg h-full bg-gray-400 shadow-2xl">



            </div>


        </div>
    );
}