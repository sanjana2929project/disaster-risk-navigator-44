import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, BookOpen, Info, MapPin, FileText, Flame, Cloud, Waves, Wind } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Global object to store the map
let map: mapboxgl.Map | null = null;

// Risk data for different disasters
const riskData = {
  earthquake: {
    regions: [
      { name: "San Francisco", coordinates: [-122.4194, 37.7749], risk: 85 },
      { name: "Tokyo", coordinates: [139.6503, 35.6762], risk: 90 },
      { name: "Mexico City", coordinates: [-99.1332, 19.4326], risk: 75 },
      { name: "Istanbul", coordinates: [28.9784, 41.0082], risk: 80 },
      { name: "Kathmandu", coordinates: [85.3240, 27.7172], risk: 82 },
    ],
    color: "#e74c3c",
  },
  flood: {
    regions: [
      { name: "New Orleans", coordinates: [-90.0715, 29.9511], risk: 88 },
      { name: "Bangkok", coordinates: [100.5018, 13.7563], risk: 85 },
      { name: "Mumbai", coordinates: [72.8777, 19.0760], risk: 80 },
      { name: "Bangladesh", coordinates: [90.3563, 23.6850], risk: 90 },
      { name: "Jakarta", coordinates: [106.8456, -6.2088], risk: 82 },
    ],
    color: "#3498db",
  },
  wildfire: {
    regions: [
      { name: "California", coordinates: [-119.4179, 36.7783], risk: 90 },
      { name: "Australia", coordinates: [133.7751, -25.2744], risk: 88 },
      { name: "Portugal", coordinates: [-8.2245, 39.3999], risk: 75 },
      { name: "Greece", coordinates: [21.8243, 39.0742], risk: 78 },
      { name: "Canada", coordinates: [-106.3468, 56.1304], risk: 72 },
    ],
    color: "#e67e22",
  },
  tsunami: {
    regions: [
      { name: "Japan", coordinates: [138.2529, 36.2048], risk: 90 },
      { name: "Indonesia", coordinates: [113.9213, -0.7893], risk: 88 },
      { name: "Chile", coordinates: [-71.5430, -35.6751], risk: 85 },
      { name: "Hawaii", coordinates: [-155.5828, 19.8968], risk: 80 },
      { name: "Alaska", coordinates: [-149.4937, 64.2008], risk: 75 },
    ],
    color: "#9b59b6",
  },
};

const disasterTypes = [
  { value: "earthquake", label: "Earthquake", icon: <AlertTriangle className="h-4 w-4 text-danger" /> },
  { value: "flood", label: "Flood", icon: <Cloud className="h-4 w-4 text-info" /> },
  { value: "wildfire", label: "Wildfire", icon: <Flame className="h-4 w-4 text-warning" /> },
  { value: "tsunami", label: "Tsunami", icon: <Waves className="h-4 w-4 text-primary" /> },
];

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedDisaster, setSelectedDisaster] = useState("earthquake");
  const [showRegions, setShowRegions] = useState(true);
  const [showRiskZones, setShowRiskZones] = useState(true);
  const [activeTab, setActiveTab] = useState("map");
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    // Only initialize the map if it hasn't been created yet
    if (!map) {
      // Use window.mapboxgl to access the global MapboxGL instance
      window.mapboxgl.accessToken = "pk.eyJ1IjoibG92ZWFibGVhaSIsImEiOiJjbGJhNjdudm0wMmt6M3BsZ3ZuMmh5cDZnIn0.QnPeO9xYn9Qyk9xjcVY7vA";
      
      map = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        zoom: 1.5,
        center: [0, 20],
        projection: "globe",
      });

      // Add navigation controls
      map.addControl(
        new window.mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      // Wait for map to load
      map.on("load", () => {
        setMapLoaded(true);

        // Add atmosphere and fog effects for 3D globe appearance
        map.setFog({
          color: "rgb(255, 255, 255)",
          "high-color": "rgb(200, 200, 225)",
          "horizon-blend": 0.2,
        });

        // Start globe rotation animation
        startGlobeRotation();
      });

      // Enable user interaction tracking
      let userInteracting = false;
      map.on("mousedown", () => {
        userInteracting = true;
      });
      map.on("mouseup", () => {
        userInteracting = false;
      });

      // Function to rotate the globe
      const startGlobeRotation = () => {
        if (!map) return;
        const rotationDegrees = 0.1;
        const rotateGlobe = () => {
          if (!map) return;
          // Only rotate if user is not interacting
          if (!userInteracting) {
            const center = map.getCenter();
            center.lng += rotationDegrees;
            map.easeTo({
              center,
              duration: 100,
              easing: (n) => n,
            });
          }
          requestAnimationFrame(rotateGlobe);
        };
        rotateGlobe();
      };
    }

    // Clean up function
    return () => {
      // Don't remove the map when component unmounts
      // as we want to keep it for re-use
    };
  }, []);

  // Update markers when disaster type changes or map loads
  useEffect(() => {
    if (!mapLoaded || !map) return;

    // Create bounds object to fit map to markers
    const bounds = new window.mapboxgl.LngLatBounds();

    // Clear existing markers
    const markers = document.querySelectorAll(".mapboxgl-marker");
    markers.forEach((marker) => marker.remove());

    // Add new markers based on the selected disaster
    if (showRegions) {
      riskData[selectedDisaster as keyof typeof riskData].regions.forEach((region) => {
        // Extend bounds
        bounds.extend(region.coordinates);

        // Create marker
        const markerElement = document.createElement("div");
        markerElement.className = "flex flex-col items-center";

        // Marker dot
        const dot = document.createElement("div");
        dot.className = "h-4 w-4 rounded-full";
        dot.style.backgroundColor = riskData[selectedDisaster as keyof typeof riskData].color;
        markerElement.appendChild(dot);

        // Add marker to map
        new window.mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        })
          .setLngLat(region.coordinates)
          .setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${region.name}</h3>
              <p class="text-sm">Risk Level: ${region.risk}%</p>
            </div>
          `)
          .addTo(map);
      });

      // Fit map to markers
      map.fitBounds(bounds, {
        padding: 50
      });
    }
  }, [selectedDisaster, showRegions, mapLoaded]);

  return (
    <div className="container py-8 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Risk Map</h1>
      <p className="text-muted-foreground mb-8">
        Explore areas with high risk for different types of disasters around the world.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Map Controls</CardTitle>
              <CardDescription>Select disaster type and display options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Disaster Type Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Disaster Type</label>
                <Select
                  value={selectedDisaster}
                  onValueChange={setSelectedDisaster}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select disaster type" />
                  </SelectTrigger>
                  <SelectContent>
                    {disasterTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Display Options */}
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-medium mb-2">Display Options</h3>
                <div className="flex items-center justify-between">
                  <label htmlFor="show-regions" className="text-sm">
                    Show High-Risk Regions
                  </label>
                  <Switch
                    id="show-regions"
                    checked={showRegions}
                    onCheckedChange={setShowRegions}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="show-risk-zones" className="text-sm">
                    Show Risk Heat Map
                  </label>
                  <Switch
                    id="show-risk-zones"
                    checked={showRiskZones}
                    onCheckedChange={setShowRiskZones}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Risk Information</CardTitle>
              <CardDescription>Understanding disaster risks</CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible className="space-y-2">
                <div className="flex items-center justify-between space-x-4 px-4">
                  <h3 className="text-sm font-semibold">
                    About {disasterTypes.find((d) => d.value === selectedDisaster)?.label} Risk
                  </h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md bg-muted px-4 py-3 text-sm">
                    {selectedDisaster === "earthquake" && (
                      <p>
                        Earthquake risk is highest along tectonic plate boundaries, particularly in the
                        Pacific Ring of Fire. Factors include fault line proximity, soil type, and building standards.
                      </p>
                    )}
                    {selectedDisaster === "flood" && (
                      <p>
                        Flooding risk is determined by elevation, proximity to water bodies, rainfall patterns,
                        and drainage infrastructure. Climate change is intensifying flood risks globally.
                      </p>
                    )}
                    {selectedDisaster === "wildfire" && (
                      <p>
                        Wildfire risk depends on vegetation type, climate conditions, drought frequency,
                        and human activity. Mediterranean climates and areas experiencing drought are particularly vulnerable.
                      </p>
                    )}
                    {selectedDisaster === "tsunami" && (
                      <p>
                        Tsunami risk is highest in coastal regions near subduction zones, particularly around the
                        Pacific Ocean. Risk factors include ocean depth, coastline shape, and elevation.
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center justify-center gap-2"
                    asChild
                  >
                    <a href="/knowledge" className="flex items-center">
                      <BookOpen className="h-4 w-4" />
                      <span>Learn more</span>
                    </a>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="map" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Interactive Map</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Data View</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="map" className="space-y-4">
              <Card>
                <CardContent className="p-0 overflow-hidden h-[550px] rounded-md relative">
                  <div ref={mapContainer} className="absolute inset-0" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>High Risk Regions</CardTitle>
                  <CardDescription>
                    Regions with highest {disasterTypes.find((d) => d.value === selectedDisaster)?.label} risk
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {riskData[selectedDisaster as keyof typeof riskData].regions.map((region, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-sm font-medium flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {region.name}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Coordinates: {region.coordinates[1].toFixed(2)}, {region.coordinates[0].toFixed(2)}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <span className="text-sm font-bold">{region.risk}%</span>
                      </div>
                      <Progress
                        value={region.risk}
                        className="h-2"
                        style={{
                          backgroundColor: `${riskData[selectedDisaster as keyof typeof riskData].color}20`,
                        }}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
