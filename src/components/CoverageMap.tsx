'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

type CoverageMapProps = {
  lang: string;
};

const areas = [
  {
    key: 'montreal',
    center: [45.5089, -73.5542] as [number, number],
    labelFr: 'Montréal',
    labelEn: 'Montreal',
  },
  {
    key: 'laval',
    center: [45.5833, -73.75] as [number, number],
    labelFr: 'Laval',
    labelEn: 'Laval',
  },
  {
    key: 'north-shore',
    center: [45.6667, -73.8333] as [number, number],
    labelFr: 'Rive-Nord',
    labelEn: 'North Shore',
  },
  {
    key: 'south-shore',
    center: [45.435, -73.4611] as [number, number],
    labelFr: 'Rive-Sud',
    labelEn: 'South Shore',
  },
];

const defaultMarkerIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export default function CoverageMap({ lang }: CoverageMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const hintTimeoutRef = useRef<number | null>(null);
  const [showCtrlHint, setShowCtrlHint] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    });

    const osmHot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
    });

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false,
      layers: [osm],
    });

    const focusAreaKeys = new Set(['montreal', 'laval']);
    const focusCoordinates = areas
      .filter((area) => focusAreaKeys.has(area.key))
      .map((area) => area.center);
    const bounds = L.latLngBounds(focusCoordinates as L.LatLngTuple[]);
    map.fitBounds(bounds, { padding: [20, 20] });
    map.setZoom(Math.max(map.getMinZoom(), map.getZoom() - 2));

    const centroidMarkers = areas.map((area) => {
      const label = lang === 'fr' ? area.labelFr : area.labelEn;

      return L.marker([area.center[0], area.center[1]], { icon: defaultMarkerIcon }).bindPopup(label);
    });

    const markerLayer = L.layerGroup(centroidMarkers).addTo(map);

    const baseMaps: Record<string, L.Layer> = {
      OpenStreetMap: osm,
      OpenStreetMapHOT: osmHot,
    };

    const overlayMaps: Record<string, L.Layer> = {};
    overlayMaps[lang === 'fr' ? 'Marqueurs' : 'Markers'] = markerLayer;

    L.control.layers(baseMaps, overlayMaps).addTo(map);

    const mapContainer = map.getContainer();
    const handleCtrlWheelZoom = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.ctrlKey) {
        const zoomDelta = event.deltaY < 0 ? 1 : -1;
        const nextZoom = map.getZoom() + zoomDelta;
        const boundedZoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), nextZoom));
        const point = map.mouseEventToContainerPoint(event as unknown as MouseEvent);

        map.setZoomAround(point, boundedZoom, { animate: true });
        return;
      }

      setShowCtrlHint(true);
      if (hintTimeoutRef.current) {
        window.clearTimeout(hintTimeoutRef.current);
      }
      hintTimeoutRef.current = window.setTimeout(() => {
        setShowCtrlHint(false);
      }, 1400);
    };

    const handleMouseEnter = () => {
      setShowCtrlHint(true);
    };

    const handleMouseLeave = () => {
      setShowCtrlHint(false);
      if (hintTimeoutRef.current) {
        window.clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = null;
      }
    };

    mapContainer.addEventListener('wheel', handleCtrlWheelZoom, {
      passive: false,
      capture: true,
    });
    mapContainer.addEventListener('mouseenter', handleMouseEnter);
    mapContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      mapContainer.removeEventListener('wheel', handleCtrlWheelZoom, {
        capture: true,
      });
      mapContainer.removeEventListener('mouseenter', handleMouseEnter);
      mapContainer.removeEventListener('mouseleave', handleMouseLeave);
      if (hintTimeoutRef.current) {
        window.clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = null;
      }
      map.remove();
    };
  }, [lang]);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: 12,
          transform: 'translateX(-50%)',
          zIndex: 450,
          pointerEvents: 'none',
          padding: '8px 12px',
          borderRadius: 8,
          background: 'rgba(15, 23, 42, 0.78)',
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 600,
          opacity: showCtrlHint ? 1 : 0,
          transition: 'opacity 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {lang === 'fr' ? 'Maintenez Ctrl + molette pour zoomer' : 'Hold Ctrl + mouse wheel to zoom'}
      </div>
    </div>
  );
}
