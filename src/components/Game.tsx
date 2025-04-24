
import React, { useState, useCallback } from 'react';
import Map from './Map';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Sample cities data (we can expand this later)
const CITIES = [
  { name: "Paris, France", coordinates: [2.3522, 48.8566] },
  { name: "London, UK", coordinates: [-0.1276, 51.5074] },
  { name: "Berlin, Germany", coordinates: [13.4050, 52.5200] },
  { name: "Madrid, Spain", coordinates: [-3.7038, 40.4168] },
  { name: "Rome, Italy", coordinates: [12.4964, 41.9028] },
  { name: "Amsterdam, Netherlands", coordinates: [4.9041, 52.3676] },
  { name: "Vienna, Austria", coordinates: [16.3738, 48.2082] },
  { name: "Athens, Greece", coordinates: [23.7275, 37.9838] },
  { name: "Moscow, Russia", coordinates: [37.6173, 55.7558] },
  { name: "Oslo, Norway", coordinates: [10.7522, 59.9139] },
  { name: "Stockholm, Sweden", coordinates: [18.0686, 59.3293] },
  { name: "Helsinki, Finland", coordinates: [24.9384, 60.1695] },
  { name: "Tokyo, Japan", coordinates: [139.6917, 35.6895] },
  { name: "Beijing, China", coordinates: [116.4074, 39.9042] },
  { name: "Seoul, South Korea", coordinates: [126.9780, 37.5665] },
  { name: "Bangkok, Thailand", coordinates: [100.5018, 13.7563] },
  { name: "New Delhi, India", coordinates: [77.2090, 28.6139] },
  { name: "Jakarta, Indonesia", coordinates: [106.8456, -6.2088] },
  { name: "Manila, Philippines", coordinates: [120.9842, 14.5995] },
  { name: "Kuala Lumpur, Malaysia", coordinates: [101.6869, 3.1390] },
  { name: "Singapore", coordinates: [103.8198, 1.3521] },
  { name: "Riyadh, Saudi Arabia", coordinates: [46.6753, 24.7136] },
  { name: "Istanbul, Turkey", coordinates: [28.9784, 41.0082] },
  { name: "Cairo, Egypt", coordinates: [31.2357, 30.0444] },
  { name: "Lagos, Nigeria", coordinates: [3.3792, 6.5244] },
  { name: "Nairobi, Kenya", coordinates: [36.8219, -1.2921] },
  { name: "Johannesburg, South Africa", coordinates: [28.0473, -26.2041] },
  { name: "Cape Town, South Africa", coordinates: [18.4241, -33.9249] },
  { name: "Accra, Ghana", coordinates: [-0.186964, 5.5600] },
  { name: "New York City, USA", coordinates: [-74.0060, 40.7128] },
  { name: "Los Angeles, USA", coordinates: [-118.2437, 34.0522] },
  { name: "Toronto, Canada", coordinates: [-79.3832, 43.6532] },
  { name: "Mexico City, Mexico", coordinates: [-99.1332, 19.4326] },
  { name: "Chicago, USA", coordinates: [-87.6298, 41.8781] },
  { name: "Vancouver, Canada", coordinates: [-123.1207, 49.2827] },
  { name: "Rio de Janeiro, Brazil", coordinates: [-43.1729, -22.9068] },
  { name: "São Paulo, Brazil", coordinates: [-46.6333, -23.5505] },
  { name: "Buenos Aires, Argentina", coordinates: [-58.3816, -34.6037] },
  { name: "Lima, Peru", coordinates: [-77.0428, -12.0464] },
  { name: "Bogotá, Colombia", coordinates: [-74.0721, 4.7110] },
  { name: "Santiago, Chile", coordinates: [-70.6693, -33.4489] },
  { name: "Sydney, Australia", coordinates: [151.2093, -33.8688] },
  { name: "Melbourne, Australia", coordinates: [144.9631, -37.8136] },
  { name: "Auckland, New Zealand", coordinates: [174.7633, -36.8485] },
  { name: "Wellington, New Zealand", coordinates: [174.7762, -41.2865] },
];


const Game = () => {
  const [currentCity, setCurrentCity] = useState(() => {
    const randomIndex = Math.floor(Math.random() * CITIES.length);
    return CITIES[randomIndex];
  });
  const [showAnswer, setShowAnswer] = useState(false);
  const [clearPins, setClearPins] = useState(false);

  const handlePinPlaced = useCallback((coordinates: [number, number]) => {
    toast({
      title: "Pin placed!",
      description: "Click 'Show Answer' to see how close you were.",
    });
  }, []);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextCity = () => {
    setClearPins(true);
    setShowAnswer(false);
    
    // Select a new random city
    const randomIndex = Math.floor(Math.random() * CITIES.length);
    setCurrentCity(CITIES[randomIndex]);
    
    // Reset clear pins flag after a short delay
    setTimeout(() => {
      setClearPins(false);
    }, 100);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Geography Challenge</h1>
        <p className="text-lg text-muted-foreground">
          Find this city: <span className="font-semibold text-primary">{currentCity.name}</span>
        </p>
      </div>

      <Map 
        onPinPlaced={handlePinPlaced}
        correctLocation={showAnswer ? currentCity.coordinates : undefined}
        clearPins={clearPins}
      />

      <div className="flex justify-center gap-4">
        <Button
          onClick={handleShowAnswer}
          disabled={showAnswer}
          variant="secondary"
        >
          Show Answer
        </Button>
        <Button
          onClick={handleNextCity}
        >
          Next City
        </Button>
      </div>
    </div>
  );
};

export default Game;
