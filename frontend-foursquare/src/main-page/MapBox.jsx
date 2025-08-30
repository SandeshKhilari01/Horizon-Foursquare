// MapBox.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Function to calculate distance between two coordinates
function getDistance(lat1, lng1, lat2, lng2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Greedy nearest neighbor ordering
function orderLocations(locations) {
  const remaining = [...locations];
  const ordered = [];
  let current = remaining.shift();
  ordered.push(current);

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let minDistance = getDistance(
      current.lat,
      current.lng,
      remaining[0].lat,
      remaining[0].lng
    );

    for (let i = 1; i < remaining.length; i++) {
      const dist = getDistance(
        current.lat,
        current.lng,
        remaining[i].lat,
        remaining[i].lng
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = i;
      }
    }
    current = remaining.splice(nearestIndex, 1)[0];
    ordered.push(current);
  }

  return ordered;
}

// ✅ Function to fetch Wikipedia image for a location
async function getLocationImage(locationName) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(locationName)}`
    );

    if (!response.ok) {
      throw new Error(`No data for ${locationName}`);
    }

    const data = await response.json();
    return data.thumbnail?.source || null; // return image if available
  } catch (error) {
    console.error("Image fetch error:", error);
    return null;
  }
}

export default function MapBox() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      // Cities without photo URLs (we’ll fetch dynamically)
      const cityData = [
        { lat: 28.6139, lng: 77.209, city: "Delhi" },
        { lat: 27.1751, lng: 78.0421, city: "Taj Mahal" },
        { lat: 26.9124, lng: 75.7873, city: "Jaipur" },
        { lat: 15.2993, lng: 74.1240, city: "Goa" },
        { lat: 13.0827, lng: 80.2707, city: "Chennai" },
        { lat: 18.5165, lng: 73.8567, city: "Pune" },
        { lat: 24.8607, lng: 67.0011, city: "Karachi" }
      ];

      // Fetch images for each city
      const withPhotos = await Promise.all(
        cityData.map(async (loc) => {
          const photo = await getLocationImage(loc.city);
          return { ...loc, photo };
        })
      );

      setLocations(orderLocations(withPhotos));
    };

    loadLocations();
  }, []);

  const defaultPosition = [22.9734, 78.6569]; // center of India
  const route = locations.map((loc) => [loc.lat, loc.lng]);

  // Create custom icon with photo
  const createPhotoIcon = (photoUrl) =>
    L.icon({
      iconUrl: photoUrl || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
      iconSize: [50, 50],
      className: "rounded-full border border-white shadow-lg"
    });

  return (
    <MapContainer
      center={defaultPosition}
      zoom={5}
      className="w-full h-[700px] border border-gray-300 rounded-2xl shadow-2xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Render markers dynamically */}
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={[loc.lat, loc.lng]}
          icon={createPhotoIcon(loc.photo)}
        >
          <Popup>{loc.city}</Popup>
        </Marker>
      ))}

      {/* Connect them with a route */}
      {locations.length > 1 && (
        <Polyline positions={route} color="blue" weight={3} />
      )}
    </MapContainer>
  );
}
