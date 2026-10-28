"use client";

import { useEffect, useRef } from "react";

import { Map, MapControls, type MapRef } from "@/components/ui/map";

/** Istanbul, the view the guide's prompt asks for. */
const CENTER: [number, number] = [28.9784, 41.0082];
const ZOOM = 7;

/**
 * The map the guide reveals after its prompt "runs". Loaded through `next/dynamic`
 * from Step6AI, so maplibre-gl stays out of the route bundle until this renders.
 */
export function GuideMapPreview() {
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    // The container animates in; resize once it has settled at its final size.
    const timers = [50, 200, 500].map((ms) =>
      window.setTimeout(() => mapRef.current?.resize(), ms),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <Map ref={mapRef} center={CENTER} zoom={ZOOM}>
      <MapControls position="top-right" showZoom showCompass showLocate showFullscreen />
    </Map>
  );
}
