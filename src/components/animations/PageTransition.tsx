'use client';

import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState, useCallback } from 'react';
import { Skeleton } from '../ui/skeleton';

type PageTransitionProps = {
  children: ReactNode;
};

// Optimized animation variants
import { easeInOut, easeIn } from 'framer-motion';

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: easeIn
    }
  }
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Handle route changes with requestAnimationFrame for smoother transitions
  const handleRouteChange = useCallback(() => {
    if (pathname !== currentPath) {
      const rafId = requestAnimationFrame(() => {
        setIsLoading(true);
        setCurrentPath(pathname);
        
        // Only show loader for non-initial loads and for more than 300ms
        const timer = setTimeout(() => {
          setIsLoading(false);
          if (isFirstMount) setIsFirstMount(false);
        }, 300);
        
        return () => clearTimeout(timer);
      });
      
      return () => cancelAnimationFrame(rafId);
    }
  }, [pathname, currentPath, isFirstMount]);

  useEffect(() => {
    handleRouteChange();
  }, [handleRouteChange]);

  // Skip initial animation on first mount
  if (isFirstMount) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen">
          {children}
        </div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="page-content"
      >
        {children}
      </m.div>
      
      {/* Only show loader after initial mount */}
      <AnimatePresence>
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};
