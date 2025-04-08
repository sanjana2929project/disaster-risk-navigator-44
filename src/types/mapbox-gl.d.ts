
declare namespace mapboxgl {
  export class Map {
    constructor(options: any);
    on(event: string, callback: Function): void;
    remove(): void;
    getSource(id: string): any;
    addControl(control: any, position?: string): void;
    scrollZoom: {
      disable(): void;
      enable(): void;
    };
    getZoom(): number;
    getCenter(): { lng: number; lat: number };
    setFog(options: any): void;
    easeTo(options: any): void;
    fitBounds(bounds: any, options?: any): void;
    isStyleLoaded(): boolean;
    addSource(id: string, source: any): void;
    addLayer(layer: any): void;
    getCanvas(): { style: any };
  }

  export class NavigationControl {
    constructor(options?: { visualizePitch?: boolean });
  }

  export class Popup {
    constructor(options?: any);
    setLngLat(coordinates: number[]): this;
    setHTML(html: string): this;
    addTo(map: Map): this;
    remove(): void;
  }

  export class LngLatBounds {
    constructor();
    extend(coordinates: [number, number]): this;
  }

  export let accessToken: string;
}

interface Window {
  mapboxgl: typeof mapboxgl;
}
