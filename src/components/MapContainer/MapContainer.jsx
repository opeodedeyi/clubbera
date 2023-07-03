import React, { useState } from "react";
import { GoogleMap, Marker, LoadScriptNext } from '@react-google-maps/api';
import "./MapContainer.css";

const MapContainer = ({ center }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    const mapOptions = {
        disableDefaultUI: true,
        zoomControl: false,
        gestureHandling: 'none',
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ]
    }

    return (
        <LoadScriptNext googleMapsApiKey={import.meta.env.VITE_APP_MAPS_API_KEY} onLoad={() => setIsScriptLoaded(true)}>
            <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={17}
                options={mapOptions}
            >
                {isScriptLoaded && <Marker position={center} />}
            </GoogleMap>
        </LoadScriptNext>
    )
}

export default MapContainer;
