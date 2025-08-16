import { useEffect, useRef, useState, useCallback, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowRight, Mouse } from 'lucide-react';
import { motion, LazyMotion, domAnimation, useInView, AnimatePresence, Variants, useAnimation } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Typewriter } from './animations/Typewriter';
import { FadeIn } from './animations/FadeIn';

// Alias for motion to avoid conflicts
const m = motion;

// Lazy load EarthCanvas with no SSR
const EarthCanvas = dynamic(
  () => import('./EarthCanvas').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }
);

interface HeroProps extends React.HTMLAttributes<HTMLElement> {}

const Hero = forwardRef<HTMLElement, HeroProps>(({ className, ...props }, ref) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  // Memoize the scroll handler to prevent unnecessary re-renders
  const scrollToContact = useCallback(() => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Optimized variants with reduced complexity
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  };
  
  // Simplified item variants
  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.6
      }
    }
  };

  // Floating animation variants
  const floatingVariants: Variants = {
    initial: { y: 0 },
    animate: (i: number = 0) => ({
      y: [0, -10, 0],
      transition: {
        duration: 4 + i,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse' as const,
        delay: i * 0.5
      }
    })
  };

  return (
    <section 
      id="home" 
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5 pt-20 md:pt-0 ${className || ''}`}
      style={{
        '--cursor-x': `${cursorPosition.x}px`,
        '--cursor-y': `${cursorPosition.y}px`,
      } as React.CSSProperties}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background/80 to-background"></div>
        {isInView && (
          <m.div 
            className="absolute -top-32 -left-32 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-primary/10 blur-3xl z-0"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            custom={0}
          />
        )}
        {isInView && (
          <m.div 
            className="absolute -bottom-32 -right-32 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-accent/10 blur-2xl z-0"
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            custom={1}
          />
        )}
      </div>
      
      <div ref={containerRef} className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 relative z-10">
            <FadeIn direction="up" delay={0.2}>
              <div className="text-xs sm:text-sm font-mono text-primary">
                <Typewriter text="Hi, my name is" speed={50} />
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.4}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                <Typewriter text="Muhammad Basit." speed={30} delay={0.8} />
              </h1>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.6}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground/80 leading-tight">
                <Typewriter text="I build things for the web." speed={30} delay={1.5} />
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.8} className="max-w-2xl">
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                I'm a full-stack developer specializing in building (and occasionally designing) exceptional digital experiences. Currently working on building real-world projects to solve practical problems.
              </p>
            </FadeIn>
            
            <FadeIn direction="up" delay={1} className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Button 
                onClick={scrollToContact} 
                className="group relative overflow-hidden px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium w-full sm:w-auto"
                size="lg"
              >
                <span className="relative z-10 flex items-center">
                  Get In Touch
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
              <Button 
                variant="outline" 
                asChild
                className="relative overflow-hidden px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium group w-full sm:w-auto"
                size="lg"
              >
                <a href="#projects" className="flex items-center">
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <Mouse className="ml-2 h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors"></span>
                </a>
              </Button>
            </FadeIn>
            
            {/* Social Links */}
            <FadeIn direction="up" delay={1.2} className="flex gap-4 sm:gap-6 pt-6 sm:pt-8">
              {[
                { icon: <Github className="h-6 w-6" />, url: 'https://github.com/22f8763', label: 'GitHub' },
                { icon: <Linkedin className="h-6 w-6" />, url: 'https://www.linkedin.com/in/muhammad-basit-29913028a/', label: 'LinkedIn' },
                { icon: <Mail size={20} />, url: 'mailto:basitarshad97@gmail.com', label: 'Email' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground hover:-translate-y-1 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </FadeIn>

            {/* Scroll indicator */}
            <motion.div 
              className="hidden md:flex items-center gap-2 mt-12 text-muted-foreground text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Mouse className="w-4 h-4 animate-bounce" />
              <span>Scroll down</span>
            </motion.div>
          </div>
          
          {/* Profile Image & 3D Earth */}
          <div className="w-full lg:w-1/2 flex justify-center relative mt-12 lg:mt-0">
            <FadeIn 
              delay={0.6} 
              className="w-full h-full"
            >
            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm aspect-square">
              {/* Profile Image */}
              <m.div 
                className="absolute inset-0 z-20 flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    duration: 0.6, 
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.4 
                  } 
                }}
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <img 
                    src="/lovable-uploads/4db6cc5d-33e5-4d4b-9688-15c838f02209.jpg" 
                    alt="Muhammad Basit"
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                    loading={isInView ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{
                      contentVisibility: 'auto',
                      willChange: 'transform, opacity'
                    }}
                  />
                </div>
              </m.div>
              
              {/* Earth Canvas - Only render when in view */}
              {isInView && (
                <m.div 
                  className="relative w-full h-full"
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                  custom={0}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl opacity-70"></div>
                  <div className="relative z-10 w-full h-full">
                    <EarthCanvas />
                  </div>
                </m.div>
              )}
            </div>
            
            {/* Floating elements */}
            <div className="absolute -z-10 w-full h-full">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10"
                  style={{
                    width: Math.random() * 200 + 50,
                    height: Math.random() * 200 + 50,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: Math.random() * 30 + 20,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </FadeIn>
        </div>
        
        {/* Scroll indicator */}
        <FadeIn delay={1.5} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground mb-2">Scroll down</div>
            <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center p-1">
              <motion.div
                className="w-1 h-2 bg-foreground/80 rounded-full"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop' as const,
                }}
              />
            </div>
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;