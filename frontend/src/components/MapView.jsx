import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCameraSnapshot } from '../api/camera.js';

export default function MapView({ onCameraClick }) {
    const initialCameras = [
        { id: '662b81721afb9c00172dcc44', name: 'Đinh Tiên Hoàng - Trần Quang Khải', lat: 10.7927439077816, lng: 106.696075201035 },
        { id: '63b664edbfd3d90017eaaa24', name: 'CT Trung Lương - Võ Trần Chí 2', lat: 10.6846307310993, lng: 106.566883921623 },
        { id: '5d8cd4ee766c880017188946', name: 'Lê Văn Sỹ - Huỳnh Văn Bánh', lat: 10.7918902432446, lng: 106.671452522278 },
    ];

    const [cameras, setCameras] = useState(initialCameras);

    useEffect(() => {
        async function fetchSnapshots() {
            const updated = await Promise.all(
                initialCameras.map(async (cam) => {
                    const snap = await getCameraSnapshot(cam.id);
                    return { ...cam, image_url: snap.image_url, density: snap.density };
                })
            );
            setCameras(updated);
        }

        fetchSnapshots();
    }, []);

    return (
        <MapContainer center={[10.762622, 106.660172]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cameras.map((cam) => (
                <Marker key={cam.id} position={[cam.lat, cam.lng]}>
                    <Popup>
                        <strong>{cam.name}</strong><br />
                        {cam.image_url && (
                            <>
                                <img src={cam.image_url} width="250" alt="Snapshot" /><br />
                                {/*<span>Mật độ: {cam.density}</span><br /> */}
                                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                    <button onClick={() => onCameraClick(cam.id, cam.name)}>Theo dõi</button>
                                    <button onClick={() => window.open(`/camera/${cam.id}`, '_blank')}>Xem chi tiết</button>
                                </div>
                            </>
                        )}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}