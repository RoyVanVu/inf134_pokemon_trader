import React, { useEffect, useRef, useState } from 'react';
import '../css/MapComponent.css';

const MapComponent = ({ 
  center = [34.0522, -118.2437], // Default to Los Angeles
  zoom = 10,
  markers = [],
  height = '400px',
  width = '100%',
  showControls = true,
  onMapClick,
  onMarkerClick
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(cssLink);
      }

      // Load JS
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
        script.onload = () => setIsLoaded(true);
        document.head.appendChild(script);
      } else {
        setIsLoaded(true);
      }
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = window.L.map(mapRef.current, {
      zoomControl: showControls,
      attributionControl: showControls
    }).setView(center, zoom);

    // Add tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Handle map clicks
    if (onMapClick) {
      map.on('click', (e) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
      });
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLoaded, center, zoom, showControls, onMapClick]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData) => {
      const marker = window.L.marker([markerData.lat, markerData.lng]);
      
      if (markerData.popup) {
        marker.bindPopup(markerData.popup);
      }

      if (markerData.onClick || onMarkerClick) {
        marker.on('click', () => {
          if (markerData.onClick) {
            markerData.onClick(markerData);
          } else if (onMarkerClick) {
            onMarkerClick(markerData);
          }
        });
      }

      marker.addTo(mapInstanceRef.current);
      markersRef.current.push(marker);
    });
  }, [markers, onMarkerClick]);

  // Center map when center prop changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div className="map-container" style={{ height, width }}>
      {!isLoaded && (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>Loading map...</p>
        </div>
      )}
      <div 
        ref={mapRef} 
        className={`map-element ${!isLoaded ? 'map-hidden' : ''}`}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default MapComponent;