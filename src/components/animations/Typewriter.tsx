import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
};

export const Typewriter = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  cursor = true,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      const timer = setTimeout(() => setStartTyping(true), delay);
      return () => clearTimeout(timer);
    }

    if (currentIndex < text.length && startTyping) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, delay, startTyping]);

  const cursorVariants: Variants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{displayText}</span>
      {cursor && (
        <motion.span
          className="inline-block w-1 h-6 bg-current ml-1"
          variants={cursorVariants}
          animate="blinking"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
