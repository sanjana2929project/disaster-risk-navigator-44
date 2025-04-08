
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CloudRain, Flame, HelpCircle, Landmark, Waves, Wind } from "lucide-react";

const disasterData = [
  {
    id: "earthquake",
    title: "Earthquakes",
    icon: <Landmark className="h-5 w-5" />,
    description: "Sudden shaking of the ground caused by movements within the Earth's crust.",
    causes: [
      "Tectonic plate movements",
      "Volcanic activity",
      "Human activities like mining or reservoir-induced seismicity",
      "Natural gas extraction"
    ],
    effects: [
      "Ground shaking and rupturing",
      "Landslides and avalanches",
      "Tsunamis in coastal regions",
      "Structural damage to buildings and infrastructure",
      "Fires from damaged gas lines",
      "Economic losses and societal disruption"
    ],
    preparation: [
      "Identify safe places in each room (under sturdy furniture, against interior walls)",
      "Secure heavy furniture and appliances to walls",
      "Create an emergency communication plan",
      "Keep an emergency kit with first aid supplies, food, and water",
      "Learn how to shut off gas, water, and electricity",
      "Practice earthquake drills ('Drop, Cover, and Hold On')"
    ],
    highRiskAreas: [
      "Pacific 'Ring of Fire' (Japan, Philippines, Indonesia, New Zealand, West Coast of North and South America)",
      "Mediterranean-Himalayan Belt (Italy, Greece, Turkey, Iran, Northern India)",
      "Mid-Atlantic Ridge",
      "East African Rift Zone"
    ]
  },
  {
    id: "flood",
    title: "Floods",
    icon: <CloudRain className="h-5 w-5" />,
    description: "Overflow of water onto normally dry land, often caused by heavy rainfall or coastal storm surges.",
    causes: [
      "Heavy rainfall",
      "Snowmelt",
      "Dam or levee failures",
      "Storm surges in coastal areas",
      "Urban development reducing natural drainage",
      "Deforestation and loss of water-absorbing vegetation"
    ],
    effects: [
      "Property damage and destruction",
      "Contamination of water supplies",
      "Loss of crops and livestock",
      "Erosion and soil degradation",
      "Displacement of populations",
      "Spread of waterborne diseases"
    ],
    preparation: [
      "Know if you live in a flood-prone area",
      "Elevate electrical systems and valuables",
      "Install check valves in plumbing",
      "Waterproof your basement",
      "Create an evacuation plan",
      "Prepare emergency supplies and important documents",
      "Consider flood insurance"
    ],
    highRiskAreas: [
      "Low-lying coastal regions",
      "River floodplains",
      "Monsoon-affected regions (South Asia)",
      "Areas with poor drainage systems",
      "Urban areas with high impervious surface coverage",
      "Regions affected by tropical cyclones"
    ]
  },
  {
    id: "wildfire",
    title: "Wildfires",
    icon: <Flame className="h-5 w-5" />,
    description: "Uncontrolled fires that burn in wildland vegetation, often in rural areas.",
    causes: [
      "Lightning strikes",
      "Human activities (campfires, cigarettes, arson)",
      "Power line failures",
      "Prescribed burns that escape control",
      "Hot, dry, and windy conditions",
      "Climate change extending fire seasons"
    ],
    effects: [
      "Destruction of forest ecosystems",
      "Loss of wildlife habitat",
      "Property damage in wildland-urban interface",
      "Air pollution and respiratory health issues",
      "Soil erosion and increased flood risk after fires",
      "Economic impact on tourism and forestry"
    ],
    preparation: [
      "Create defensible space around your home",
      "Use fire-resistant materials for construction and landscaping",
      "Clear gutters and roof of debris",
      "Prepare an evacuation plan and emergency kit",
      "Stay informed about fire conditions and warnings",
      "Install smoke detectors and keep fire extinguishers"
    ],
    highRiskAreas: [
      "Mediterranean climate regions (California, Southern Europe, Australia)",
      "Forested areas with long dry seasons",
      "Areas experiencing drought conditions",
      "Regions with high fuel loads (dense vegetation)",
      "Wildland-urban interface zones",
      "Areas affected by climate change-induced aridification"
    ]
  },
  {
    id: "tsunami",
    title: "Tsunamis",
    icon: <Waves className="h-5 w-5" />,
    description: "Series of ocean waves caused by underwater disturbances such as earthquakes, volcanic eruptions, or landslides.",
    causes: [
      "Underwater earthquakes",
      "Submarine landslides",
      "Volcanic eruptions",
      "Meteorite impacts (rare)",
      "Underwater explosions"
    ],
    effects: [
      "Coastal flooding and inundation",
      "Destruction of buildings and infrastructure",
      "Erosion of shorelines",
      "Contamination of freshwater supplies with saltwater",
      "Loss of life and displacement of coastal populations",
      "Long-term economic impacts on coastal communities"
    ],
    preparation: [
      "Know tsunami warning signs (ground shaking, unusual ocean behavior)",
      "Identify evacuation routes to higher ground",
      "Create a family emergency plan",
      "Prepare emergency supplies",
      "Stay informed through official warning systems",
      "For coastal buildings, consider tsunami-resistant design"
    ],
    highRiskAreas: [
      "Pacific 'Ring of Fire' coastlines",
      "Indian Ocean coastlines",
      "Mediterranean Sea coastal areas",
      "Caribbean islands",
      "Low-lying coastal communities worldwide",
      "Islands and peninsulas with limited evacuation routes"
    ]
  },
  {
    id: "cyclone",
    title: "Cyclones, Hurricanes & Typhoons",
    icon: <Wind className="h-5 w-5" />,
    description: "Powerful storms characterized by strong winds, heavy rainfall, and storm surges. Called hurricanes in Atlantic/East Pacific, typhoons in Northwest Pacific, and cyclones in South Pacific/Indian Ocean.",
    causes: [
      "Warm ocean temperatures (above 26°C/79°F)",
      "Atmospheric instability",
      "High humidity in the lower atmosphere",
      "Low vertical wind shear",
      "Pre-existing weather disturbance",
      "Coriolis effect (distance from equator)"
    ],
    effects: [
      "Strong winds causing structural damage",
      "Heavy rainfall leading to flooding",
      "Storm surges causing coastal flooding",
      "Landslides in mountainous areas",
      "Power outages and infrastructure damage",
      "Economic disruption and displacement of populations"
    ],
    preparation: [
      "Create a hurricane preparedness plan",
      "Reinforce doors, windows, and roof",
      "Trim trees and branches near your home",
      "Prepare a storm shelter or identify sturdy interior rooms",
      "Stock emergency supplies including water and non-perishable food",
      "Know evacuation routes and follow official directions"
    ],
    highRiskAreas: [
      "Gulf and Atlantic coasts of the United States",
      "Caribbean islands",
      "East and Southeast Asian coastlines (China, Philippines, Japan, Taiwan)",
      "Bay of Bengal (India, Bangladesh, Myanmar)",
      "Northeast Australia",
      "Indian Ocean islands (Madagascar, Mauritius, Reunion)"
    ]
  }
];

const KnowledgeBasePage = () => {
  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Disaster Knowledge Base</h1>
          <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
            Learn about different types of natural disasters, their causes, effects, 
            and how to prepare for them. Understanding disasters is the first step toward resilience.
          </p>
        </div>

        <Tabs defaultValue="types" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="types">Disaster Types</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
          </TabsList>

          <TabsContent value="types" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {disasterData.map((disaster) => (
                <Card key={disaster.id} className="hover-scale">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <div className={`p-2 rounded-full 
                      ${disaster.id === "earthquake" ? "bg-warning/10 text-warning" : 
                        disaster.id === "flood" ? "bg-info/10 text-info" : 
                        disaster.id === "wildfire" ? "bg-danger/10 text-danger" : 
                        disaster.id === "tsunami" ? "bg-primary/10 text-primary" : 
                        "bg-secondary/80 text-foreground"}`}>
                      {disaster.icon}
                    </div>
                    <CardTitle className="text-lg">{disaster.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{disaster.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Accordion type="single" collapsible className="w-full">
              {disasterData.map((disaster) => (
                <AccordionItem key={disaster.id} value={disaster.id}>
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-full 
                        ${disaster.id === "earthquake" ? "bg-warning/10 text-warning" : 
                          disaster.id === "flood" ? "bg-info/10 text-info" : 
                          disaster.id === "wildfire" ? "bg-danger/10 text-danger" : 
                          disaster.id === "tsunami" ? "bg-primary/10 text-primary" : 
                          "bg-secondary/80 text-foreground"}`}>
                        {disaster.icon}
                      </div>
                      {disaster.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <div className="space-y-4 p-1">
                      <p>{disaster.description}</p>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Causes</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {disaster.causes.map((cause, i) => (
                            <li key={i}>{cause}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Effects</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {disaster.effects.map((effect, i) => (
                            <li key={i}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Preparation</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {disaster.preparation.map((prep, i) => (
                            <li key={i}>{prep}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">High-Risk Areas</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {disaster.highRiskAreas.map((area, i) => (
                            <li key={i}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="faq" className="pt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </div>
                <CardDescription>
                  Common questions about natural disasters, prediction, and preparation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="q1">
                    <AccordionTrigger>
                      How accurate are disaster predictions?
                    </AccordionTrigger>
                    <AccordionContent>
                      Disaster prediction accuracy varies by type. Meteorological disasters like hurricanes can be predicted days in advance with increasing accuracy. Earthquake prediction remains challenging, with scientists focusing on probabilistic forecasts rather than specific predictions. Flood predictions are moderately accurate and improving with better models and data. All predictions become more accurate as the event approaches, and continuous improvements in technology and data collection are enhancing predictive capabilities.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q2">
                    <AccordionTrigger>
                      Are natural disasters becoming more frequent due to climate change?
                    </AccordionTrigger>
                    <AccordionContent>
                      While the total number of natural disasters reported has increased, this is partly due to better reporting and detection. However, climate change is influencing the frequency and intensity of certain types of disasters. There's strong evidence that climate change is increasing the frequency and severity of heat waves, droughts, and intense precipitation events. It's also contributing to more powerful hurricanes and extended wildfire seasons in many regions. The relationship between climate change and earthquakes or volcanic eruptions is minimal or not established.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q3">
                    <AccordionTrigger>
                      What should be in a basic disaster preparedness kit?
                    </AccordionTrigger>
                    <AccordionContent>
                      A basic disaster preparedness kit should include: 
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Water (one gallon per person per day for at least three days)</li>
                        <li>Non-perishable food (at least a three-day supply)</li>
                        <li>Battery-powered or hand-crank radio</li>
                        <li>Flashlight and extra batteries</li>
                        <li>First aid kit</li>
                        <li>Whistle to signal for help</li>
                        <li>Dust mask, plastic sheeting, and duct tape for shelter</li>
                        <li>Moist towelettes, garbage bags, and plastic ties for sanitation</li>
                        <li>Wrench or pliers to turn off utilities</li>
                        <li>Manual can opener for food</li>
                        <li>Local maps</li>
                        <li>Cell phone with chargers and backup battery</li>
                        <li>Prescription medications and glasses</li>
                        <li>Important family documents in waterproof container</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q4">
                    <AccordionTrigger>
                      How do I create a family emergency plan?
                    </AccordionTrigger>
                    <AccordionContent>
                      To create a family emergency plan:
                      <ol className="list-decimal pl-5 mt-2 space-y-1">
                        <li>Discuss types of disasters that could affect your area</li>
                        <li>Determine how to receive emergency alerts</li>
                        <li>Identify two ways to exit each room and two meeting places (one near home, one out of neighborhood)</li>
                        <li>Establish an out-of-area contact person</li>
                        <li>Document everyone's contact information and medical needs</li>
                        <li>Practice evacuation routes and meeting at designated locations</li>
                        <li>Learn about school/workplace emergency plans</li>
                        <li>Decide where to shelter in different scenarios</li>
                        <li>Plan for pets and family members with special needs</li>
                        <li>Keep the plan updated and review it regularly</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q5">
                    <AccordionTrigger>
                      How can communities increase their disaster resilience?
                    </AccordionTrigger>
                    <AccordionContent>
                      Communities can increase disaster resilience through:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Developing and maintaining comprehensive disaster management plans</li>
                        <li>Establishing early warning systems</li>
                        <li>Investing in infrastructure that can withstand disasters</li>
                        <li>Incorporating disaster risk reduction in urban planning and building codes</li>
                        <li>Preserving natural barriers like wetlands and forests</li>
                        <li>Conducting regular drills and educational programs</li>
                        <li>Creating community emergency response teams</li>
                        <li>Supporting vulnerable populations with specific plans</li>
                        <li>Maintaining emergency funds and insurance programs</li>
                        <li>Fostering partnerships between government, businesses, and community organizations</li>
                        <li>Learning from past disasters and adapting plans accordingly</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q6">
                    <AccordionTrigger>
                      How do I protect important documents in a disaster?
                    </AccordionTrigger>
                    <AccordionContent>
                      To protect important documents:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Store originals in waterproof, fireproof containers or safe deposit boxes</li>
                        <li>Create digital copies (scan or photograph) and store in secure cloud storage</li>
                        <li>Keep password-protected copies on encrypted flash drives</li>
                        <li>Include copies in your emergency kit in a waterproof container</li>
                        <li>Share access information with trusted family members</li>
                        <li>Regularly update documents and their copies</li>
                      </ul>
                      Important documents to protect include: identification (passports, birth certificates), financial records, insurance policies, medical information, property records, and emergency contact information.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
