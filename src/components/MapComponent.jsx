import React, { useEffect, useRef, useState } from 'react';
import MapBubbles from './MapBubbles';
import '../css/MapComponent.css';

const MapComponent = ({ 
  center = [34.0522, -118.2437], // Default to Los Angeles
  zoom = 10,
  markers = [],
  height = '400px',
  width = '100%',
  showControls = true,
  onMapClick,
  onMarkerClick,
  onProfileNavigate
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bubblePositions, setBubblePositions] = useState([]);
  const [bubbleLatLngs] = useState(() => {
    // Generate random lat/lng positions once
    const positions = [];
    for (let i = 0; i < 20; i++) {
      positions.push({
        lat: 33.6405 + (Math.random() - 0.5) * 0.1, // Random position around UCI
        lng: -117.8389 + (Math.random() - 0.5) * 0.1
      });
    }
    return positions;
  });

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

    // Convert lat/lng positions to pixel positions
    const updateBubblePositions = () => {
      const positions = bubbleLatLngs.map(latLng => {
        const point = map.latLngToContainerPoint([latLng.lat, latLng.lng]);
        return { x: point.x, y: point.y };
      });
      setBubblePositions(positions);
    };

    // Update positions when map moves
    map.on('move', updateBubblePositions);
    updateBubblePositions();

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLoaded, center, zoom, onMapClick, bubbleLatLngs]);

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
      >
        {isLoaded && bubblePositions.map((position, index) => (
          <MapBubbles
            key={index}
            position={position}
            onNavigateToProfile={onProfileNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default MapComponent;