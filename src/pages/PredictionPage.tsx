
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
  "New Zealand"
];

// Sample states for each country
const statesByCountry: Record<string, string[]> = {
  "India": ["Gujarat", "Tamil Nadu", "Maharashtra", "Kerala", "Assam", "Odisha"],
  "United States": ["California", "Florida", "Texas", "Hawaii", "Washington", "Oregon"],
  "Japan": ["Tokyo", "Miyagi", "Fukushima", "Hokkaido", "Okinawa"],
  "Indonesia": ["Java", "Sumatra", "Sulawesi", "Bali", "Papua"],
  "Philippines": ["Luzon", "Visayas", "Mindanao"],
  "China": ["Sichuan", "Yunnan", "Guangdong", "Fujian", "Hainan"],
  "Mexico": ["Oaxaca", "Chiapas", "Guerrero", "Michoacán", "Colima"],
  "Italy": ["Sicily", "Calabria", "Campania", "Lazio", "Emilia-Romagna"],
  "Australia": ["Queensland", "New South Wales", "Western Australia", "Victoria", "Northern Territory"],
  "New Zealand": ["Canterbury", "Wellington", "Otago", "Hawke's Bay", "Bay of Plenty"]
};

// Mock prediction function
const getPrediction = (disasterType: DisasterType, country: string, state: string): PredictionResult => {
  // This would be replaced with actual model predictions
  const riskScores: Record<DisasterType, Record<string, number>> = {
    earthquake: {
      "California": 0.85, "Tokyo": 0.9, "Gujarat": 0.7, "Java": 0.8, "Miyagi": 0.85,
      "Sichuan": 0.8, "Oaxaca": 0.75, "Sicily": 0.65, "Wellington": 0.75, "Canterbury": 0.7
    },
    flood: {
      "Kerala": 0.8, "Assam": 0.9, "Florida": 0.75, "Guangdong": 0.7, "Queensland": 0.65,
      "Sumatra": 0.75, "Mindanao": 0.7, "Hokkaido": 0.5, "Texas": 0.6, "Odisha": 0.8
    },
    wildfire: {
      "California": 0.9, "New South Wales": 0.85, "Sumatra": 0.7, "Michoacán": 0.65,
      "Oregon": 0.8, "Sardinia": 0.75, "Victoria": 0.8, "Hawke's Bay": 0.6, "Yunnan": 0.5
    },
    tsunami: {
      "Fukushima": 0.8, "Hawaii": 0.7, "Tamil Nadu": 0.65, "Sumatra": 0.85, "Mindanao": 0.75,
      "Hokkaido": 0.7, "Okinawa": 0.75, "Calabria": 0.6, "Bay of Plenty": 0.65, "Papua": 0.7
    },
    cyclone: {
      "Odisha": 0.85, "Florida": 0.8, "Queensland": 0.75, "Guangdong": 0.7, "Visayas": 0.85,
      "Luzon": 0.8, "Hainan": 0.75, "Okinawa": 0.7, "Fujian": 0.65, "Tamil Nadu": 0.75
    }
  };

  // Default score if specific state isn't found
  let score = Math.random() * 0.6 + 0.2; // Random score between 0.2 and 0.8
  
  // Use specific score if available
  if (riskScores[disasterType][state]) {
    score = riskScores[disasterType][state];
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

// Get recommendations based on disaster type and risk level
const getRecommendations = (disasterType: DisasterType, riskLevel: string): string[] => {
  const baseRecommendations: Record<DisasterType, string[]> = {
    earthquake: [
      "Secure heavy furniture and appliances to walls",
      "Create an emergency communication plan",
      "Identify safe places in each room (under sturdy furniture, against interior walls)",
      "Keep an emergency kit with first aid supplies, food, and water"
    ],
    flood: [
      "Elevate electrical systems and valuables",
      "Install check valves in plumbing",
      "Waterproof your basement",
      "Know evacuation routes and have emergency supplies ready"
    ],
    wildfire: [
      "Create a defensible space around your home",
      "Use fire-resistant materials for construction and landscaping",
      "Keep gutters and roof clear of debris",
      "Have an evacuation plan and emergency kit ready"
    ],
    tsunami: [
      "Know the tsunami warning signs and evacuation routes",
      "Move to higher ground immediately if warned",
      "Stay away from the coast during warnings",
      "Have an emergency kit prepared"
    ],
    cyclone: [
      "Reinforce doors, windows, and roof",
      "Trim trees and branches near your home",
      "Prepare a storm shelter or identify sturdy interior rooms",
      "Stock emergency supplies including water and non-perishable food"
    ]
  };
  
  // Return all recommendations for the disaster type
  return baseRecommendations[disasterType];
};

const PredictionPage = () => {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    if (selectedDisaster && selectedCountry && selectedState) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const result = getPrediction(selectedDisaster, selectedCountry, selectedState);
        setPrediction(result);
        setLoading(false);
      }, 1500);
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

                  <Button
                    onClick={handlePredict}
                    disabled={!selectedDisaster || !selectedCountry || !selectedState || loading}
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
                      <h3 className="text-xl font-bold mb-2">Risk Assessment for {selectedState}, {selectedCountry}</h3>
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
                        className="w-full h-3"
                        indicatorClassName={prediction.color}
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

                    <div className="flex justify-center mt-6">
                      <Button onClick={() => {
                        setSelectedDisaster(null);
                        setSelectedCountry("");
                        setSelectedState("");
                        setPrediction(null);
                      }} variant="outline" className="mr-2">
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
