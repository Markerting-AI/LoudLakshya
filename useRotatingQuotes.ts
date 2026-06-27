import { useState, useEffect } from "react";

const quotes = [
  "Marketing is no longer about the stuff you make, but the stories you tell.",
  "Content is fire. Social media is gasoline.",
  "The best marketing doesn't feel like marketing.",
  "Your brand is what people say about you when you're not in the room.",
];

export function useRotatingQuotes() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFading(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return { quote: quotes[index], fading };
}
