
declare namespace mapboxgl {
  export class Map {
    constructor(options: any);
    on(event: string, callback: Function): void;
    remove(): void;
  }
  
  export let accessToken: string;
}

interface Window {
  mapboxgl: typeof mapboxgl;
}
