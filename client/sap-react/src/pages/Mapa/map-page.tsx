import {
    MapContainer,
    TileLayer,
    Marker,
    CircleMarker,
    Popup,
    useMapEvents,
  } from "react-leaflet";
  import "leaflet/dist/leaflet.css";
  import "./map-style.css";
import { useState } from "react";
import { LatLng, LeafletMouseEvent, DivIcon } from "leaflet";



  function Map() {

    const [markers, setMarkers] = useState<LatLng[]>([]);

    function LocationMarker() {
      
        const map = useMapEvents({
          click(e: LeafletMouseEvent) {
            const newMarkers = [...markers, e.latlng];
            setMarkers(newMarkers);
          },
        });
      
        return markers.length === 0 ? null : (
        <div>
            {markers.map((marker, index)=>(
                <Marker key={index} position={marker}>
            <Popup>Clicked at Latitude: {marker.lat}, Longitude: {marker.lng}</Popup>
          </Marker>
            ))}
        </div>
          
        );
      }
      

    return (
        <div>
          <MapContainer className="mapContainer" center={[40.609787846393196, 20.7890265133657]} zoom={5}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker/>
          </MapContainer>
        </div>
    );
  }
  
  export default Map;
  