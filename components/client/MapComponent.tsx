/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// MapComponent.tsx
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Disable SSR for Leaflet
const Map = dynamic(() => import("./MapComponent"), { ssr: false });

import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/map/marker-icon-2x.png",
  iconUrl: "/map/marker-icon.png",
  shadowUrl: "/map/marker-shadow.png",
});

interface MapComponentProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export default function MapComponent({
  latitude,
  longitude,
  zoom = 13,
}: MapComponentProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          Location: {latitude}, {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
