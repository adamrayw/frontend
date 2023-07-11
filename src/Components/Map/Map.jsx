import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line react/prop-types
const Map = ({ sendDataToParent, longitude, latitude, addressFromActivity }) => {
    const mapContainerRef = useRef(null);
    const map = useRef(null);
    const [address, setAddress] = useState('');

    const handleClick = (longitude, latitude, address) => {
        const data = {
            longitude,
            latitude,
            address,
        };

        sendDataToParent(data);
    };

    useEffect(() => {
        if (longitude && latitude && addressFromActivity) {
            mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN; // Replace with your Mapbox access token

            map.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/satellite-streets-v12', // Replace with your desired Mapbox style
                center: [longitude, latitude], // Replace with your desired longitude and latitude
                zoom: 16, // Replace with your desired zoom level
            });

            map.current.on('load', () => {
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}`;


                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        const features = data.features;
                        if (features.length > 0) {
                            const address = features[0].place_name;
                            setAddress(address);
                        }
                    })
                    .catch((error) => {
                        console.log('Error getting address: ' + error);
                    });
            });
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN; // Replace with your Mapbox access token

                        map.current = new mapboxgl.Map({
                            container: mapContainerRef.current,
                            style: 'mapbox://styles/mapbox/satellite-streets-v12', // Replace with your desired Mapbox style
                            center: [position.coords.longitude, position.coords.latitude], // Replace with your desired longitude and latitude
                            zoom: 16, // Replace with your desired zoom level
                        });

                        map.current.on('load', () => {
                            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN}`;


                            fetch(url)
                                .then((response) => response.json())
                                .then((data) => {
                                    const features = data.features;
                                    if (features.length > 0) {
                                        const address = features[0].place_name;
                                        setAddress(address);
                                        handleClick(position.coords.longitude, position.coords.latitude, address);
                                    }
                                })
                                .catch((error) => {
                                    console.log('Error getting address: ' + error);
                                });
                        });
                    },
                    (error) => {
                        console.log('Error getting geolocation: ' + error);
                    }
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }


        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [longitude, latitude, addressFromActivity]);

    return (
        <div style={{ width: '100%', height: '100%' }} >
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
            <div className="lokasi-operasi space-y-2 mb-8 mt-2 md:p-0 p-4">
                <h2 className="font-semibold">Lokasi Operasi SAR</h2>
                <p className="text-xs text-gray-400">{address}</p>
                <hr />
            </div>
        </div>
    )
};

export default Map;
