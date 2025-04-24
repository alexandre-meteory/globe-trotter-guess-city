
import React, { useState, useCallback } from 'react';
import Map from './Map';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Sample cities data (we can expand this later)
const CITIES = [
  { name: "Paris, France", coordinates: [2.3522, 48.8566] },
  { name: "Tokyo, Japan", coordinates: [139.6917, 35.6895] },
  { name: "New York City, USA", coordinates: [-74.0060, 40.7128] },
  { name: "Sydney, Australia", coordinates: [151.2093, -33.8688] },
  { name: "Cairo, Egypt", coordinates: [31.2357, 30.0444] },
  { name: "Rio de Janeiro, Brazil", coordinates: [-43.1729, -22.9068] },
  { name: "London, UK", coordinates: [-0.1276, 51.5074] },
  { name: "Moscow, Russia", coordinates: [37.6173, 55.7558] },
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
