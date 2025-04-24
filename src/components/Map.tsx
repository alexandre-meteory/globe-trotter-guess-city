
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface MapProps {
  onPinPlaced: (coordinates: [number, number]) => void;
  correctLocation?: [number, number];
  clearPins: boolean;
}

const Map = ({ onPinPlaced, correctLocation, clearPins }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userPins, setUserPins] = useState<mapboxgl.Marker[]>([]);
  const [correctPin, setCorrectPin] = useState<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // User needs to replace this
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 2,
      center: [0, 20],
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add click handler
    map.current.on('click', (e) => {
      const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      
      // Create a new marker
      const marker = new mapboxgl.Marker({ color: '#6366f1' })
        .setLngLat(coordinates)
        .addTo(map.current!);
      
      setUserPins(prev => [...prev, marker]);
      onPinPlaced(coordinates);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Handle showing correct location
  useEffect(() => {
    if (correctLocation && map.current) {
      // Remove previous correct pin if it exists
      if (correctPin) {
        correctPin.remove();
      }

      // Add new correct pin
      const marker = new mapboxgl.Marker({ color: '#22c55e' })
        .setLngLat(correctLocation)
        .addTo(map.current);
      
      setCorrectPin(marker);

      // Center map on correct location
      map.current.flyTo({
        center: correctLocation,
        zoom: 5,
        duration: 2000
      });
    }
  }, [correctLocation]);

  // Handle clearing pins
  useEffect(() => {
    if (clearPins) {
      userPins.forEach(pin => pin.remove());
      if (correctPin) {
        correctPin.remove();
      }
      setUserPins([]);
      setCorrectPin(null);

      // Reset map view
      map.current?.flyTo({
        center: [0, 20],
        zoom: 2,
        duration: 1000
      });
    }
  }, [clearPins]);

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
