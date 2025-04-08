
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CloudRain,
  Flame,
  Landmark,
  Waves,
  Wind,
  BarChart3,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DisasterType = "earthquake" | "flood" | "wildfire" | "tsunami" | "cyclone";

interface PredictionResult {
  riskScore: number;
  riskLevel: "Low" | "Moderate" | "High" | "Extreme";
  color: string;
  recommendations: string[];
}

const disasterTypes = [
  { id: "earthquake", label: "Earthquake", icon: <Landmark /> },
  { id: "flood", label: "Flood", icon: <CloudRain /> },
  { id: "wildfire", label: "Wildfire", icon: <Flame /> },
  { id: "tsunami", label: "Tsunami", icon: <Waves /> },
  { id: "cyclone", label: "Cyclone", icon: <Wind /> },
];

const countries = [
  "India", 
  "United States", 
  "Japan", 
  "Indonesia", 
  "Philippines",
  "China",
  "Mexico",
  "Italy",
  "Australia",
  "New Zealand",
  "Canada",
  "Brazil",
  "Thailand",
  "Turkey",
  "Chile"
];

const statesByCountry: Record<string, string[]> = {
  "India": ["Gujarat", "Tamil Nadu", "Maharashtra", "Kerala", "Assam", "Odisha", "West Bengal", "Karnataka", "Andhra Pradesh"],
  "United States": ["California", "Florida", "Texas", "Hawaii", "Washington", "Oregon", "Alaska", "Louisiana", "New York", "Colorado"],
  "Japan": ["Tokyo", "Miyagi", "Fukushima", "Hokkaido", "Okinawa", "Kyoto", "Osaka", "Kobe", "Nagano"],
  "Indonesia": ["Java", "Sumatra", "Sulawesi", "Bali", "Papua", "Borneo", "Maluku", "Flores", "Lombok"],
  "Philippines": ["Luzon", "Visayas", "Mindanao", "Palawan", "Cebu", "Leyte", "Samar", "Mindoro"],
  "China": ["Sichuan", "Yunnan", "Guangdong", "Fujian", "Hainan", "Tibet", "Shanghai", "Beijing", "Hebei"],
  "Mexico": ["Oaxaca", "Chiapas", "Guerrero", "Michoacán", "Colima", "Jalisco", "Veracruz", "Baja California"],
  "Italy": ["Sicily", "Calabria", "Campania", "Lazio", "Emilia-Romagna", "Tuscany", "Lombardy", "Veneto"],
  "Australia": ["Queensland", "New South Wales", "Western Australia", "Victoria", "Northern Territory", "South Australia", "Tasmania"],
  "New Zealand": ["Canterbury", "Wellington", "Otago", "Hawke's Bay", "Bay of Plenty", "Auckland", "Northland", "Marlborough"],
  "Canada": ["British Columbia", "Alberta", "Ontario", "Quebec", "Nova Scotia", "Manitoba", "Saskatchewan"],
  "Brazil": ["Amazonas", "São Paulo", "Rio de Janeiro", "Santa Catarina", "Minas Gerais", "Bahia"],
  "Thailand": ["Bangkok", "Phuket", "Chiang Mai", "Krabi", "Phang Nga", "Surat Thani"],
  "Turkey": ["Istanbul", "Izmir", "Antalya", "Ankara", "Van", "Erzurum", "Konya"],
  "Chile": ["Santiago", "Valparaíso", "Biobío", "Maule", "Los Lagos", "Antofagasta"]
};

const getPrediction = (disasterType: DisasterType, country: string, state: string): PredictionResult => {
  const riskScores: Record<DisasterType, Record<string, number>> = {
    earthquake: {
      "California": 0.92, "Washington": 0.75, "Oregon": 0.78, "Alaska": 0.88, "Hawaii": 0.70,
      "Tokyo": 0.90, "Miyagi": 0.85, "Fukushima": 0.84, "Hokkaido": 0.80, "Osaka": 0.83, 
      "Gujarat": 0.78, "Java": 0.89, "Sumatra": 0.86, "Sichuan": 0.87, "Oaxaca": 0.85, 
      "Sicily": 0.72, "Wellington": 0.84, "Canterbury": 0.80, "Istanbul": 0.89, "Valparaíso": 0.76,
      "Santiago": 0.79, "Yunnan": 0.82
    },
    flood: {
      "Kerala": 0.86, "Assam": 0.93, "West Bengal": 0.85, "Bihar": 0.84, "Odisha": 0.88,
      "Louisiana": 0.88, "Florida": 0.82, "Bangkok": 0.90, "Guangdong": 0.78, "Queensland": 0.75,
      "Sumatra": 0.80, "Mindanao": 0.75, "Java": 0.77, "Amazonas": 0.85, "Ganges Delta": 0.95,
      "Mekong Delta": 0.92, "Mississippi Delta": 0.86
    },
    wildfire: {
      "California": 0.94, "Colorado": 0.85, "Oregon": 0.87, "New South Wales": 0.92, "Victoria": 0.90, 
      "Western Australia": 0.84, "Northern Territory": 0.82,
      "Amazonas": 0.80, "Mediterranean Coast": 0.83, "Greece": 0.81, "Portugal": 0.78, "Spain": 0.82,
      "Siberia": 0.76, "British Columbia": 0.82, "Alberta": 0.78
    },
    tsunami: {
      "Fukushima": 0.85, "Hawaii": 0.80, "Sumatra": 0.92, "Java": 0.90, "Chile Coast": 0.88,
      "Alaska": 0.78, "Okinawa": 0.82, "Philippines": 0.85, "Papua New Guinea": 0.87, 
      "Tamil Nadu": 0.75, "Sri Lanka": 0.78, "Thailand Coast": 0.82,
      "Maldives": 0.80, "Somalia Coast": 0.74
    },
    cyclone: {
      "Odisha": 0.90, "West Bengal": 0.87, "Bangladesh": 0.92, "Queensland": 0.85, 
      "Guangdong": 0.82, "Visayas": 0.88, "Luzon": 0.83, "Hainan": 0.80,
      "Florida": 0.88, "Louisiana": 0.84, "Texas": 0.80, "North Carolina": 0.78,
      "Caribbean Islands": 0.90, "Mozambique": 0.87, "Madagascar": 0.89
    }
  };

  // Default to a moderate risk score if location not found
  let score = 0.5;
  
  // If using custom location or if location not in our database
  // Generate a risk score based on the disaster type and location name
  if (country && state) {
    const countryHash = country.length;
    const stateHash = state.length;
    const disasterFactor = 
      disasterType === "earthquake" ? 0.7 :
      disasterType === "flood" ? 0.6 :
      disasterType === "wildfire" ? 0.65 :
      disasterType === "tsunami" ? 0.55 :
      0.62;
      
    // Create a pseudorandom but consistent score based on location and disaster type
    const locationFactor = ((countryHash * 13 + stateHash * 7) % 50) / 100;
    score = Math.min(0.95, Math.max(0.2, disasterFactor + locationFactor));
    
    // If we have specific data for this location, use it
    if (riskScores[disasterType][state]) {
      score = riskScores[disasterType][state];
    }
  }
  
  let riskLevel: "Low" | "Moderate" | "High" | "Extreme";
  let color: string;
  
  if (score < 0.3) {
    riskLevel = "Low";
    color = "bg-success";
  } else if (score < 0.6) {
    riskLevel = "Moderate";
    color = "bg-warning";
  } else if (score < 0.8) {
    riskLevel = "High";
    color = "bg-danger";
  } else {
    riskLevel = "Extreme";
    color = "bg-destructive";
  }
  
  const recommendations = getRecommendations(disasterType, riskLevel);
  
  return {
    riskScore: Math.round(score * 100),
    riskLevel,
    color,
    recommendations
  };
};

const getRecommendations = (disasterType: DisasterType, riskLevel: string): string[] => {
  const baseRecommendations: Record<DisasterType, Record<string, string[]>> = {
    earthquake: {
      "Low": [
        "Be familiar with emergency procedures",
        "Have basic emergency supplies on hand",
        "Know how to shut off utilities if necessary"
      ],
      "Moderate": [
        "Secure heavy furniture and appliances to walls",
        "Create a family emergency communication plan",
        "Keep emergency supplies accessible",
        "Practice drop, cover, and hold on drills"
      ],
      "High": [
        "Secure all heavy furniture, appliances and wall hangings",
        "Identify safe spots in each room (under sturdy tables, against interior walls)",
        "Prepare a comprehensive emergency kit with supplies for at least 72 hours",
        "Have a detailed evacuation plan with multiple routes"
      ],
      "Extreme": [
        "Retrofit your home for earthquake safety if possible",
        "Secure all heavy items and install automatic gas shutoff valves",
        "Maintain emergency supplies for at least one week",
        "Establish multiple evacuation routes and communication plans",
        "Consider earthquake insurance coverage"
      ]
    },
    flood: {
      "Low": [
        "Be aware of flood zones in your area",
        "Keep gutters and drains clear of debris",
        "Have a basic emergency kit ready"
      ],
      "Moderate": [
        "Elevate electrical systems and appliances above potential flood levels",
        "Install check valves in plumbing to prevent backups",
        "Keep important documents in waterproof containers",
        "Know evacuation routes from your area"
      ],
      "High": [
        "Consider flood-proofing measures for your home",
        "Have sandbags or flood barriers ready for deployment",
        "Create a detailed evacuation plan with multiple routes",
        "Store emergency supplies on upper levels of your home"
      ],
      "Extreme": [
        "Consider relocating to higher ground if possible",
        "Install permanent water barriers or home elevation systems",
        "Maintain comprehensive flood insurance",
        "Have emergency supplies for at least one week",
        "Be prepared to evacuate quickly when warnings are issued"
      ]
    },
    wildfire: {
      "Low": [
        "Clear leaves and debris from gutters and roofs",
        "Be cautious with outdoor burning and tools that can create sparks",
        "Keep a basic emergency kit on hand"
      ],
      "Moderate": [
        "Create a defensible space around your home by clearing vegetation",
        "Use fire-resistant materials for home repairs or renovations",
        "Have an evacuation plan ready for your household",
        "Keep garden hoses accessible and consider installing exterior sprinklers"
      ],
      "High": [
        "Maintain a substantial defensible space (30-100 feet) around structures",
        "Use fire-resistant building materials for your home's exterior",
        "Keep emergency supplies packed and ready for evacuation",
        "Install ember-resistant vents and cover eaves"
      ],
      "Extreme": [
        "Consider fire-resistant retrofitting for your entire home",
        "Maintain maximum possible defensible space around your property",
        "Have evacuation plans with multiple routes to higher ground",
        "Install exterior sprinkler systems or consider fire shields",
        "Be prepared to evacuate early when fire danger is high"
      ]
    },
    tsunami: {
      "Low": [
        "Be familiar with tsunami evacuation routes",
        "Have a basic emergency kit ready",
        "Understand tsunami warning signs like strong earthquakes"
      ],
      "Moderate": [
        "Know natural tsunami warning signs (ground shaking, unusual ocean behavior)",
        "Identify evacuation routes to higher ground or inland areas",
        "Create a family emergency communication plan",
        "Keep emergency supplies ready at home and in vehicles"
      ],
      "High": [
        "Have evacuation plans with multiple routes to higher ground",
        "Keep emergency supplies in an easy-to-grab container",
        "Know the difference between tsunami watches and warnings",
        "Consider vertical evacuation options if immediate high ground is not accessible"
      ],
      "Extreme": [
        "Consider relocating to higher ground or further inland if possible",
        "Have emergency supplies stored at home, work, and in vehicles",
        "Practice tsunami evacuation routes regularly",
        "Be prepared to evacuate immediately after feeling strong ground shaking",
        "Install NOAA Weather Radio for alerts"
      ]
    },
    cyclone: {
      "Low": [
        "Be aware of hurricane/cyclone season in your area",
        "Keep trees trimmed away from structures",
        "Have a basic emergency kit ready"
      ],
      "Moderate": [
        "Have materials ready to protect windows (plywood, shutters)",
        "Create a family emergency communication plan",
        "Identify potential shelter locations",
        "Keep important documents in waterproof containers"
      ],
      "High": [
        "Install permanent storm shutters or have plywood cut to size",
        "Reinforce doors, garage doors, and roof connections",
        "Create a detailed evacuation plan with multiple routes",
        "Have emergency supplies for at least 72 hours"
      ],
      "Extreme": [
        "Consider structural improvements like roof straps and reinforced foundations",
        "Install impact-resistant windows or permanent shutters",
        "Have comprehensive emergency supplies for at least one week",
        "Be prepared to evacuate early when warnings are issued",
        "Consider hurricane insurance coverage"
      ]
    }
  };
  
  return baseRecommendations[disasterType][riskLevel] || baseRecommendations[disasterType]["Moderate"];
};

const PredictionPage = () => {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [customCountry, setCustomCountry] = useState<string>("");
  const [customState, setCustomState] = useState<string>("");
  const [useCustomLocation, setUseCustomLocation] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    if (selectedDisaster) {
      const country = useCustomLocation ? customCountry : selectedCountry;
      const state = useCustomLocation ? customState : selectedState;
      
      if (!country || !state) {
        return;
      }
      
      setLoading(true);
      setTimeout(() => {
        const result = getPrediction(selectedDisaster, country, state);
        setPrediction(result);
        setLoading(false);
      }, 1500);
    }
  };

  const isFormValid = () => {
    if (!selectedDisaster) return false;
    
    if (useCustomLocation) {
      return !!customCountry && !!customState;
    } else {
      return !!selectedCountry && !!selectedState;
    }
  };

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Disaster Risk Prediction</h1>
          <p className="text-muted-foreground mt-2">
            Select a disaster type, location, and get a risk assessment based on historical data and environmental factors.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Predict Disaster Risk</CardTitle>
            <CardDescription>
              Fill in the details below to get a risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="predict" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="predict">Prediction</TabsTrigger>
                <TabsTrigger value="results" disabled={!prediction}>
                  Results
                </TabsTrigger>
              </TabsList>
              <TabsContent value="predict">
                <div className="grid gap-6 mt-4">
                  <div>
                    <Label htmlFor="disaster-type">Disaster Type</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                      {disasterTypes.map((disaster) => (
                        <Button
                          key={disaster.id}
                          variant={selectedDisaster === disaster.id ? "default" : "outline"}
                          className="flex flex-col h-24 gap-2 items-center justify-center"
                          onClick={() => setSelectedDisaster(disaster.id as DisasterType)}
                        >
                          {disaster.icon}
                          <span>{disaster.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={useCustomLocation ? "outline" : "default"} 
                        size="sm"
                        onClick={() => setUseCustomLocation(false)}
                      >
                        Select from list
                      </Button>
                      <Button 
                        variant={useCustomLocation ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setUseCustomLocation(true)}
                      >
                        Enter custom location
                      </Button>
                    </div>
                    
                    {!useCustomLocation ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Select
                            value={selectedCountry}
                            onValueChange={(value) => {
                              setSelectedCountry(value);
                              setSelectedState("");
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">State/Region</Label>
                          <Select
                            value={selectedState}
                            onValueChange={setSelectedState}
                            disabled={!selectedCountry}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a state/region" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedCountry &&
                                statesByCountry[selectedCountry]?.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="custom-country">Country</Label>
                          <Input
                            id="custom-country"
                            placeholder="Enter country name"
                            value={customCountry}
                            onChange={(e) => setCustomCountry(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="custom-state">State/Region</Label>
                          <Input
                            id="custom-state"
                            placeholder="Enter state or region name"
                            value={customState}
                            onChange={(e) => setCustomState(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handlePredict}
                    disabled={!isFormValid() || loading}
                    className="w-full mt-4"
                  >
                    {loading ? "Analyzing..." : "Predict Risk"}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="results">
                {prediction && (
                  <div className="space-y-6 mt-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">
                        Risk Assessment for {useCustomLocation ? customState : selectedState}, {useCustomLocation ? customCountry : selectedCountry}
                      </h3>
                      <p className="text-muted-foreground">
                        Based on historical data, environmental factors, and predictive modeling
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg">
                      <div className="text-center mb-4">
                        <BarChart3 className="h-10 w-10 mx-auto mb-2" />
                        <h3 className="text-2xl font-bold">Risk Score: {prediction.riskScore}%</h3>
                        <div
                          className={`text-sm font-medium px-3 py-1 rounded-full ${
                            prediction.riskLevel === "Low"
                              ? "bg-success/20 text-success-dark"
                              : prediction.riskLevel === "Moderate"
                              ? "bg-warning/20 text-warning-dark"
                              : prediction.riskLevel === "High"
                              ? "bg-danger/20 text-danger-dark"
                              : "bg-destructive/20 text-destructive"
                          }`}
                        >
                          {prediction.riskLevel} Risk
                        </div>
                      </div>

                      <Progress
                        value={prediction.riskScore}
                        className={`w-full h-3 ${prediction.color}`}
                      />
                    </div>

                    <div>
                      <h3 className="font-bold flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5" />
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {prediction.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="bg-primary/10 text-primary p-1 rounded-full mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                      <Button onClick={() => {
                        setSelectedDisaster(null);
                        setSelectedCountry("");
                        setSelectedState("");
                        setCustomCountry("");
                        setCustomState("");
                        setPrediction(null);
                      }} variant="outline">
                        Make New Prediction
                      </Button>
                      <Button>Download Report</Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionPage;
