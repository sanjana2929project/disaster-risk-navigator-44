
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Global object to store the map
let map: any = null;

// Risk data for different disasters
const riskData = {
  earthquake: {
    "India": {
      "Gujarat": { risk: 70, lat: 22.2587, lng: 71.1924 },
      "Tamil Nadu": { risk: 45, lat: 11.1271, lng: 78.6569 },
      "Maharashtra": { risk: 65, lat: 19.7515, lng: 75.7139 },
    },
    "United States": {
      "California": { risk: 85, lat: 36.7783, lng: -119.4179 },
      "Oregon": { risk: 75, lat: 43.8041, lng: -120.5542 },
      "Washington": { risk: 70, lat: 47.7511, lng: -120.7401 },
    },
    "Japan": {
      "Tokyo": { risk: 90, lat: 35.6762, lng: 139.6503 },
      "Miyagi": { risk: 85, lat: 38.6, lng: 141.2 },
      "Fukushima": { risk: 85, lat: 37.2, lng: 140.5 },
    }
  },
  flood: {
    "India": {
      "Gujarat": { risk: 65, lat: 22.2587, lng: 71.1924 },
      "Assam": { risk: 90, lat: 26.2006, lng: 92.9376 },
      "Kerala": { risk: 85, lat: 10.8505, lng: 76.2711 },
    },
    "United States": {
      "Florida": { risk: 80, lat: 27.6648, lng: -81.5158 },
      "Louisiana": { risk: 85, lat: 31.1695, lng: -91.8678 },
      "Texas": { risk: 75, lat: 31.9686, lng: -99.9018 },
    },
    "China": {
      "Guangdong": { risk: 75, lat: 23.1317, lng: 113.2663 },
      "Sichuan": { risk: 70, lat: 30.1588, lng: 102.9199 },
      "Yunnan": { risk: 65, lat: 24.4753, lng: 101.3431 },
    }
  },
  wildfire: {
    "United States": {
      "California": { risk: 90, lat: 36.7783, lng: -119.4179 },
      "Oregon": { risk: 85, lat: 43.8041, lng: -120.5542 },
      "Washington": { risk: 80, lat: 47.7511, lng: -120.7401 },
    },
    "Australia": {
      "New South Wales": { risk: 85, lat: -33.8688, lng: 151.2093 },
      "Victoria": { risk: 80, lat: -37.8136, lng: 144.9631 },
      "Western Australia": { risk: 75, lat: -31.9505, lng: 115.8605 },
    },
    "Italy": {
      "Sicily": { risk: 75, lat: 37.5990, lng: 14.0154 },
      "Calabria": { risk: 70, lat: 39.0598, lng: 16.5924 },
      "Sardinia": { risk: 75, lat: 40.1209, lng: 9.0129 },
    }
  },
  tsunami: {
    "Japan": {
      "Fukushima": { risk: 85, lat: 37.2, lng: 140.5 },
      "Miyagi": { risk: 80, lat: 38.6, lng: 141.2 },
      "Hokkaido": { risk: 75, lat: 43.2203, lng: 142.8635 },
    },
    "Indonesia": {
      "Sumatra": { risk: 90, lat: 0.2933, lng: 101.7068 },
      "Java": { risk: 85, lat: -7.6145, lng: 110.7122 },
      "Sulawesi": { risk: 80, lat: -1.8465, lng: 120.5279 },
    },
    "United States": {
      "Hawaii": { risk: 75, lat: 19.8968, lng: -155.5828 },
      "Alaska": { risk: 80, lat: 64.2008, lng: -149.4937 },
      "California": { risk: 65, lat: 36.7783, lng: -119.4179 },
    }
  },
  cyclone: {
    "India": {
      "Odisha": { risk: 85, lat: 20.9517, lng: 85.0985 },
      "Tamil Nadu": { risk: 80, lat: 11.1271, lng: 78.6569 },
      "Gujarat": { risk: 75, lat: 22.2587, lng: 71.1924 },
    },
    "United States": {
      "Florida": { risk: 85, lat: 27.6648, lng: -81.5158 },
      "Louisiana": { risk: 80, lat: 31.1695, lng: -91.8678 },
      "Texas": { risk: 75, lat: 31.9686, lng: -99.9018 },
    },
    "Philippines": {
      "Luzon": { risk: 90, lat: 16.9803, lng: 121.6217 },
      "Visayas": { risk: 85, lat: 11.1784, lng: 123.6046 },
      "Mindanao": { risk: 80, lat: 8.4961, lng: 125.5319 },
    }
  }
};

interface MapData {
  regions: Array<{
    name: string;
    risk: number;
    lat: number;
    lng: number;
  }>;
}

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState("earthquake");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showHistorical, setShowHistorical] = useState(false);
  const [loading, setLoading] = useState(true);
  const [riskThreshold, setRiskThreshold] = useState([50]);
  const [mapData, setMapData] = useState<MapData>({ regions: [] });

  // Get countries with data for the selected disaster
  const getAvailableCountries = () => {
    if (!selectedDisaster) return [];
    return Object.keys(riskData[selectedDisaster as keyof typeof riskData] || {});
  };

  // Load the MapBox script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";
    script.async = true;
    script.onload = () => {
      // Load the CSS
      const link = document.createElement("link");
      link.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      
      setMapLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  // Initialize the map
  useEffect(() => {
    if (!mapLoaded || !mapContainer.current) return;

    if (!window.mapboxgl) {
      console.error("Mapbox GL JS is not loaded");
      return;
    }

    // For demo purposes, using a public token
    // In production, use environment variables or backend API
    window.mapboxgl.accessToken = "pk.eyJ1IjoibWFwYm94ZGV2IiwiYSI6ImNpaWVlMGl4NDAwNjV1cWx4bzhqb3Z1bmYifQ.FHP7-RiKGm1z07U9_-NGIw";

    map = new window.mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 20],
      zoom: 1.5,
    });

    map.on("load", () => {
      setLoading(false);
      
      // Add navigation controls
      map.addControl(new window.mapboxgl.NavigationControl(), "top-right");
      
      // Add layers for visualization
      map.addSource("risk-areas", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
      
      map.addLayer({
        id: "risk-circles",
        type: "circle",
        source: "risk-areas",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "risk"],
            0, 10,
            100, 50
          ],
          "circle-color": ["interpolate", ["linear"], ["get", "risk"],
            0, "#52b788",
            50, "#ffb703",
            75, "#fb8500",
            90, "#d00000"
          ],
          "circle-opacity": 0.6,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff"
        }
      });
      
      // Add popup on hover
      const popup = new window.mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      
      map.on("mouseenter", "risk-circles", (e: any) => {
        map.getCanvas().style.cursor = "pointer";
        
        const coordinates = e.features[0].geometry.coordinates.slice();
        const risk = e.features[0].properties.risk;
        const region = e.features[0].properties.region;
        const country = e.features[0].properties.country;
        const disasterType = e.features[0].properties.disasterType;
        
        const riskLevel = risk < 30 ? "Low" : risk < 60 ? "Moderate" : risk < 80 ? "High" : "Extreme";
        
        const html = `
          <div class="px-3 py-2">
            <div class="font-bold">${region}, ${country}</div>
            <div class="text-sm">${disasterType} Risk: <span class="font-semibold">${riskLevel} (${risk}%)</span></div>
          </div>
        `;
        
        popup.setLngLat(coordinates).setHTML(html).addTo(map);
      });
      
      map.on("mouseleave", "risk-circles", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    // Cleanup
    return () => {
      if (map) map.remove();
    };
  }, [mapLoaded]);

  // Update map data when selections change
  useEffect(() => {
    if (!map || !selectedDisaster) return;
    
    if (!map.isStyleLoaded()) {
      map.on("load", updateMapData);
      return;
    }
    
    updateMapData();
  }, [selectedDisaster, selectedCountry, riskThreshold, showHistorical]);

  const updateMapData = () => {
    if (!map || !map.getSource) return;
    
    setLoading(true);
    
    const disasterData = riskData[selectedDisaster as keyof typeof riskData] || {};
    const regions: Array<{name: string; risk: number; lat: number; lng: number;}> = [];
    
    // Collect regions based on selected country, or all if none selected
    if (selectedCountry) {
      const countryData = disasterData[selectedCountry] || {};
      Object.entries(countryData).forEach(([region, data]: [string, any]) => {
        if (data.risk >= riskThreshold[0]) {
          regions.push({
            name: region,
            risk: data.risk,
            lat: data.lat,
            lng: data.lng
          });
        }
      });
    } else {
      Object.entries(disasterData).forEach(([country, countryRegions]: [string, any]) => {
        Object.entries(countryRegions).forEach(([region, data]: [string, any]) => {
          if (data.risk >= riskThreshold[0]) {
            regions.push({
              name: region,
              risk: data.risk,
              lat: data.lat,
              lng: data.lng
            });
          }
        });
      });
    }
    
    setMapData({ regions });
    
    // Update the map source
    if (map.getSource("risk-areas")) {
      const features = regions.map(region => ({
        type: "Feature",
        properties: {
          risk: region.risk,
          region: region.name,
          country: selectedCountry || "Various",
          disasterType: selectedDisaster.charAt(0).toUpperCase() + selectedDisaster.slice(1)
        },
        geometry: {
          type: "Point",
          coordinates: [region.lng, region.lat]
        }
      }));
      
      map.getSource("risk-areas").setData({
        type: "FeatureCollection",
        features
      });
      
      // Fit bounds if we have regions
      if (regions.length > 0) {
        const bounds = new window.mapboxgl.LngLatBounds();
        regions.forEach(region => {
          bounds.extend([region.lng, region.lat]);
        });
        
        map.fitBounds(bounds, { padding: 50, maxZoom: 5 });
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Disaster Risk Map</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Visualize regions with high disaster risk around the world. Filter by disaster type, 
          country, and risk level to see vulnerable areas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Map Filters</CardTitle>
            <CardDescription>
              Customize the risk visualization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="disaster-type">Disaster Type</Label>
              <Select
                value={selectedDisaster}
                onValueChange={setSelectedDisaster}
              >
                <SelectTrigger id="disaster-type">
                  <SelectValue placeholder="Select disaster type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="wildfire">Wildfire</SelectItem>
                  <SelectItem value="tsunami">Tsunami</SelectItem>
                  <SelectItem value="cyclone">Cyclone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country (Optional)</Label>
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  {getAvailableCountries().map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="risk-threshold">
                  Minimum Risk Level: {riskThreshold[0]}%
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Risk threshold info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Only regions with risk levels at or above this threshold will be shown on the map
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Slider
                id="risk-threshold"
                value={riskThreshold}
                onValueChange={setRiskThreshold}
                min={0}
                max={100}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="historical"
                  checked={showHistorical}
                  onCheckedChange={setShowHistorical}
                />
                <Label htmlFor="historical">Show Historical Events</Label>
              </div>
            </div>

            <Tabs defaultValue="legend" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="legend" className="flex-1">Legend</TabsTrigger>
                <TabsTrigger value="regions" className="flex-1">Risk Regions</TabsTrigger>
              </TabsList>
              <TabsContent value="legend">
                <div className="space-y-2 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#52b788]"></div>
                    <span className="text-sm">Low Risk (0-30%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#ffb703]"></div>
                    <span className="text-sm">Moderate Risk (30-60%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#fb8500]"></div>
                    <span className="text-sm">High Risk (60-80%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#d00000]"></div>
                    <span className="text-sm">Extreme Risk (80-100%)</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="regions">
                <div className="mt-4 max-h-60 overflow-y-auto">
                  {mapData.regions.length > 0 ? (
                    <div className="space-y-2">
                      {mapData.regions
                        .sort((a, b) => b.risk - a.risk)
                        .map((region, index) => (
                          <div key={index} className="flex justify-between items-center text-sm py-1 border-b">
                            <span>{region.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs 
                              ${region.risk >= 80 ? 'bg-destructive/20 text-destructive' : 
                                region.risk >= 60 ? 'bg-danger/20 text-danger' : 
                                region.risk >= 30 ? 'bg-warning/20 text-warning' : 
                                'bg-success/20 text-success'}`}>
                              {region.risk}%
                            </span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground text-center py-2">
                      No regions match your criteria
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 relative min-h-[500px]">
          <div ref={mapContainer} className="w-full h-[500px] rounded-lg overflow-hidden">
            {/* Map container */}
          </div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 text-sm border">
            <p className="text-center font-medium">
              {selectedDisaster.charAt(0).toUpperCase() + selectedDisaster.slice(1)} Risk Map
              {selectedCountry ? ` for ${selectedCountry}` : ' Worldwide'}
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Showing regions with risk level of {riskThreshold[0]}% or higher
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MapPage;
