
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Info, MapPin, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const riskData = {
  earthquake: {
    regions: [
      { name: "San Francisco", coordinates: [-122.4194, 37.7749], risk: 85 },
      { name: "Tokyo", coordinates: [139.6503, 35.6762], risk: 90 },
      { name: "Mexico City", coordinates: [-99.1332, 19.4326], risk: 75 },
      { name: "Istanbul", coordinates: [28.9784, 41.0082], risk: 80 },
      { name: "Kathmandu", coordinates: [85.3240, 27.7172], risk: 82 },
      { name: "Los Angeles", coordinates: [-118.2437, 34.0522], risk: 80 },
      { name: "Seattle", coordinates: [-122.3321, 47.6062], risk: 70 },
      { name: "Lima", coordinates: [-77.0428, -12.0464], risk: 78 },
      { name: "Wellington", coordinates: [174.7787, -41.2924], risk: 75 },
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
      { name: "Houston", coordinates: [-95.3698, 29.7604], risk: 75 },
      { name: "Venice", coordinates: [12.3155, 45.4408], risk: 78 },
      { name: "Manila", coordinates: [120.9842, 14.5995], risk: 83 },
      { name: "Chennai", coordinates: [80.2707, 13.0827], risk: 79 },
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
      { name: "Colorado", coordinates: [-105.7821, 39.5501], risk: 80 },
      { name: "Spain", coordinates: [-3.7492, 40.4637], risk: 77 },
      { name: "Arizona", coordinates: [-111.0937, 34.0489], risk: 85 },
      { name: "Siberia", coordinates: [99.1967, 61.0137], risk: 70 },
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
      { name: "Philippines", coordinates: [121.7740, 12.8797], risk: 83 },
      { name: "Thailand", coordinates: [100.9925, 15.8700], risk: 75 },
      { name: "Sri Lanka", coordinates: [80.7718, 7.8731], risk: 70 },
      { name: "New Zealand", coordinates: [171.7799, -41.2865], risk: 78 },
    ],
    color: "#9b59b6",
  },
};

const disasterTypes = [
  { value: "earthquake", label: "Earthquake", icon: <Info className="h-4 w-4 text-danger" /> },
  { value: "flood", label: "Flood", icon: <Info className="h-4 w-4 text-info" /> },
  { value: "wildfire", label: "Wildfire", icon: <Info className="h-4 w-4 text-warning" /> },
  { value: "tsunami", label: "Tsunami", icon: <Info className="h-4 w-4 text-primary" /> },
];

const MapPage = () => {
  const [selectedDisaster, setSelectedDisaster] = useState("earthquake");
  const [showRegions, setShowRegions] = useState(true);

  return (
    <div className="container py-8 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Risks</h1>
      <p className="text-muted-foreground mb-8">
        Explore areas with high risk for different types of disasters around the world.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Display Settings</CardTitle>
              <CardDescription>Select disaster type and display options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              </div>
            </CardContent>
          </Card>

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

        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>High Risk Regions</CardTitle>
                <CardDescription>
                  Regions with highest {disasterTypes.find((d) => d.value === selectedDisaster)?.label} risk
                </CardDescription>
              </div>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {showRegions && riskData[selectedDisaster as keyof typeof riskData].regions.map((region, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm font-medium flex items-center gap-1 cursor-pointer">
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
                      "--progress-background": riskData[selectedDisaster as keyof typeof riskData].color
                    } as React.CSSProperties}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
