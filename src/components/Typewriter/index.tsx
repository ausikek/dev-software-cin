import { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  pauseTime?: number;
}

export default function Typewriter({
  texts,
  speed = 100,
  pauseTime = 1000,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let charIndex = 0;
    let interval: NodeJS.Timeout;

    const type = () => {
      interval = setInterval(() => {
        if (!isDeleting) {
          // Typing phase
          setDisplayedText(texts[index].slice(0, charIndex + 1));
          charIndex++;
          if (charIndex > texts[index].length) {
            clearInterval(interval);
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting phase
          setDisplayedText(texts[index].slice(0, charIndex - 1));
          charIndex--;
          if (charIndex < 0) {
            clearInterval(interval);
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % texts.length);
          }
        }
      }, speed);
    };

    type();
    return () => clearInterval(interval);
  }, [index, isDeleting, texts, speed, pauseTime]);

  return <p>{displayedText}</p>;
}
