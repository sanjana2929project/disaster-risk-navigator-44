
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, MapPin } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Mountain Landscape Background */}
      <section className="relative flex flex-col items-center justify-center py-32 md:py-40 px-4 bg-gradient-to-b from-[#1e3a5f] via-[#3a6291] to-[#e0aa70] text-white text-center">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/3df33b68-cb25-4c39-b1b4-fe35cd0ba637.png')] bg-cover bg-center opacity-60"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Predict Disaster Risks
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-xl mx-auto drop-shadow-md">
            Assess the risk of disasters happening by selecting a country and region.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full bg-[#2b6cb0] hover:bg-[#2d4e6f] transition-colors"
            asChild
          >
            <Link to="/predict">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Feature Boxes Section */}
      <section className="py-6 bg-[#fdf6e3]">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Disaster Knowledge Box */}
            <Card className="bg-[#fdf6e3] border-none shadow-none">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 text-[#2b6cb0]">
                  <BookOpen size={64} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Disaster Knowledge
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Learn about different types of disasters and how to mitigate their impact.
                </p>
                <Button 
                  variant="outline" 
                  className="border-[#2b6cb0] text-[#2b6cb0] hover:bg-[#2b6cb0] hover:text-white"
                  asChild
                >
                  <Link to="/knowledge">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Risk Map Box */}
            <Card className="bg-[#fdf6e3] border-none shadow-none">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 text-[#2b6cb0]">
                  <MapPin size={64} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Risk Map
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  View a map displaying regions with high risk of specific disasters.
                </p>
                <Button 
                  variant="outline" 
                  className="border-[#2b6cb0] text-[#2b6cb0] hover:bg-[#2b6cb0] hover:text-white"
                  asChild
                >
                  <Link to="/map">Explore Map</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
