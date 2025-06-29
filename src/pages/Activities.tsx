
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Utensils } from "lucide-react";
import ActivitySection from "@/components/activities/ActivitySection";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  yachtingCruises,
  waterAirAdventures,
  themeParksAttractions,
  desertExperiences,
  groundTransportation,
  visasPaperwork,
  uniqueStays,
  dinnerInTheSkyExperiences,
  helicopterImages,
  newHelicopterImages,
  yachtImages,
  formulaOneImages,
  limousineImages,
  desertImages,
  miracleGardenImages,
  museumFrameImages,
  zooImages,
  queenElizabethImages,
  marinaImages,
  ferrariImages,
  waterSportsImages,
  skydivingImages,
  newDesertImages,
  newFormulaOneImages,
  newMiracleGardenImages,
  visaImages,
  additionalDesertImages,
  additionalFormulaOneImages,
  dinnerInTheSkyImages,
  dhowCruiseImages
} from "@/data/activities";

const Activities = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('yachting');
  const isNavigationChangeRef = useRef(false);

  // Map hash fragments to tab values
  const getDefaultTab = () => {
    const hash = location.hash.replace('#', '');
    const tabMapping: { [key: string]: string } = {
      'yachting': 'yachting',
      'water-air': 'water-air',
      'theme-parks': 'theme-parks',
      'desert': 'desert',
      'transport': 'transport',
      'dinner-sky': 'dinner-sky',
      'visas': 'visas',
      'unique': 'unique'
    };
    return tabMapping[hash] || 'yachting';
  };

  // Scroll to top when component mounts or when coming from homepage links
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab(getDefaultTab());
  }, [location.pathname]);

  // Listen for hash changes and custom events from navigation
  useEffect(() => {
    const handleHashChange = () => {
      // Only handle hash changes if they're not from navigation clicks
      if (!isNavigationChangeRef.current) {
        const newTab = getDefaultTab();
        console.log('Hash changed externally, setting tab to:', newTab);
        setActiveTab(newTab);
      }
      // Reset the flag
      isNavigationChangeRef.current = false;
    };

    const handleActivityTabChange = (event: CustomEvent) => {
      const { tab } = event.detail;
      console.log('Custom event received, setting tab to:', tab);
      // Set flag to prevent hash change from interfering
      isNavigationChangeRef.current = true;
      setActiveTab(tab);
    };

    // Set initial tab based on hash
    setActiveTab(getDefaultTab());

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Listen for custom events from navigation
    window.addEventListener('activityTabChange', handleActivityTabChange as EventListener);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('activityTabChange', handleActivityTabChange as EventListener);
    };
  }, []);

  const handleBookNow = (activityName: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in booking ${activityName}. Could you please provide more details about pricing, availability, and what's included?`);
    window.open(`https://wa.me/971568723633?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Hidden tabs list for functionality but not visible to users */}
            <TabsList className="hidden">
              <TabsTrigger value="yachting">Luxury Yachts & Cruises</TabsTrigger>
              <TabsTrigger value="water-air">Water & Air</TabsTrigger>
              <TabsTrigger value="theme-parks">Theme Parks</TabsTrigger>
              <TabsTrigger value="desert">Desert Safaris</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="dinner-sky">Dinner in Sky</TabsTrigger>
              <TabsTrigger value="visas">Visas</TabsTrigger>
              <TabsTrigger value="unique">Unique Stays</TabsTrigger>
            </TabsList>

            <TabsContent value="yachting" data-tab="yachting">
              <ActivitySection 
                activities={yachtingCruises} 
                imageSliders={[
                  { images: yachtImages, title: "Luxury Yacht Experiences" },
                  { images: marinaImages, title: "Marina & Beach Experience" },
                  { images: dhowCruiseImages, title: "Traditional Dhow Cruises" }
                ]}
                onBookNow={handleBookNow} 
              />
            </TabsContent>

            <TabsContent value="water-air" data-tab="water-air">
              <ActivitySection 
                activities={waterAirAdventures} 
                imageSliders={[
                  { images: [...helicopterImages, ...newHelicopterImages], title: "Helicopter Tours" },
                  { images: waterSportsImages, title: "Water Sports Adventures" },
                  { images: skydivingImages, title: "Skydiving Experiences" }
                ]}
                onBookNow={handleBookNow} 
              />
            </TabsContent>

            <TabsContent value="theme-parks" data-tab="theme-parks">
              <ActivitySection 
                activities={themeParksAttractions} 
                imageSliders={[
                  { images: [...formulaOneImages, ...newFormulaOneImages, ...additionalFormulaOneImages], title: "Formula 1 Grand Prix" },
                  { images: [...miracleGardenImages, ...newMiracleGardenImages], title: "Dubai Miracle Garden" },
                  { images: museumFrameImages, title: "Museum of the Future & Dubai Frame" },
                  { images: zooImages, title: "Zoo & Wildlife Experiences" }
                ]}
                onBookNow={handleBookNow} 
              />
            </TabsContent>

            <TabsContent value="desert" data-tab="desert">
              <ActivitySection 
                activities={desertExperiences} 
                imageSliders={[{ images: [...desertImages, ...newDesertImages, ...additionalDesertImages], title: "Desert Safari Adventures" }]}
                onBookNow={handleBookNow} 
              />
            </TabsContent>

            <TabsContent value="transport" data-tab="transport">
              <ActivitySection 
                activities={groundTransportation} 
                imageSliders={[
                  { images: limousineImages, title: "Luxury Transportation" },
                  { images: ferrariImages, title: "Premium Ferrari Collection" }
                ]}
                onBookNow={handleBookNow} 
              />
            </TabsContent>

            <TabsContent value="dinner-sky" data-tab="dinner-sky">
              <ActivitySection 
                activities={dinnerInTheSkyExperiences} 
                imageSliders={[{ images: dinnerInTheSkyImages, title: "Dinner in the Sky Dubai" }]}
                onBookNow={handleBookNow} 
              />
            </TabsContent>

            <TabsContent value="visas" data-tab="visas">
              <ActivitySection 
                activities={visasPaperwork} 
                imageSliders={[{ images: visaImages, title: "Visa Services" }]}
                onBookNow={handleBookNow} 
              />
            </TabsContent>

            <TabsContent value="unique" data-tab="unique">
              <ActivitySection 
                activities={uniqueStays} 
                imageSliders={[{ images: queenElizabethImages, title: "Queen Elizabeth II Floating Suite" }]}
                onBookNow={handleBookNow} 
              />
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 text-white p-8 rounded-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-3xl font-bold mb-4 animate-bounce">Ready for Your Dubai Adventure?</h3>
              <p className="text-lg mb-6">
                Contact us now to customize your perfect Dubai experience with exclusive packages and expert guidance.
              </p>
              <Button 
                onClick={() => handleBookNow("Custom Dubai Package")}
                className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8 py-3 transform hover:scale-110 transition-all duration-300"
              >
                Get Custom Quote via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Activities;
