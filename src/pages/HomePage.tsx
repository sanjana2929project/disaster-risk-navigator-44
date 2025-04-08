
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  BookOpen,
  BarChart4,
  AlertTriangle,
  ArrowRight,
  CloudRain,
  Flame,
  Waves,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-background to-secondary/50 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Predict and Visualize{" "}
                <span className="text-gradient">Disaster Risks</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                DisasterLens combines advanced predictive models with interactive maps
                to help you understand and prepare for natural disasters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" asChild>
                  <Link to="/predict">Try Prediction Model</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/map">Explore Risk Map</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-info/20 rounded-full blur-3xl"></div>
                <div className="bg-background/80 backdrop-blur-sm border rounded-2xl p-4 md:p-8 shadow-xl animate-float">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-danger/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                      <Flame className="h-8 w-8 text-danger" />
                      <span className="text-sm font-medium">Wildfire</span>
                    </div>
                    <div className="bg-info/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                      <CloudRain className="h-8 w-8 text-info" />
                      <span className="text-sm font-medium">Flooding</span>
                    </div>
                    <div className="bg-warning/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                      <AlertTriangle className="h-8 w-8 text-warning" />
                      <span className="text-sm font-medium">Earthquake</span>
                    </div>
                    <div className="bg-primary/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                      <Waves className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Tsunami</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Powerful Features for Disaster Awareness
            </h2>
            <p className="text-muted-foreground mt-4 max-w-[700px] mx-auto">
              DisasterLens provides tools and resources to help you understand,
              predict, and visualize disaster risks around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-scale border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <BarChart4 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Prediction Model</h3>
                  <p className="text-muted-foreground mt-2">
                    Use our advanced AI models to predict disaster risks based on
                    location and environmental factors.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 gap-1"
                    asChild
                  >
                    <Link to="/predict">
                      Try it now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Knowledge Base</h3>
                  <p className="text-muted-foreground mt-2">
                    Learn about different types of disasters, their causes,
                    effects, and how to prepare for them.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 gap-1"
                    asChild
                  >
                    <Link to="/knowledge">
                      Explore <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale border-primary/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Interactive Risk Map</h3>
                  <p className="text-muted-foreground mt-2">
                    Visualize disaster risks globally with our interactive map
                    showing high-risk areas and historical events.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 gap-1"
                    asChild
                  >
                    <Link to="/map">
                      View map <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-info/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Start Using DisasterLens Today
            </h2>
            <p className="text-muted-foreground mt-4 max-w-[600px]">
              Explore our prediction models, knowledge base, and interactive risk
              map to better understand disaster risks in your area.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link to="/predict">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
