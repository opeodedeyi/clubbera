import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({ center }) => {

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
        <LoadScript googleMapsApiKey={import.meta.env.VITE_APP_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={center}
                zoom={17}
                options={mapOptions}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;
