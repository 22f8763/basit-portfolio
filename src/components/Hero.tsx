import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Phone, ArrowRight, Mouse } from 'lucide-react';
import EarthCanvas from './EarthCanvas';
import { motion, useAnimation, useInView } from 'framer-motion';

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section 
      id="home" 
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background/80 to-background"></div>
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl animate-pulse-slow z-0"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-2xl animate-pulse-slow z-0"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.span 
                className="inline-block text-lg md:text-xl font-medium text-primary mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hello, I'm
              </motion.span>
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-foreground bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Muhammad Basit
              </motion.h1>
            </motion.div>
            
            <motion.h2 
              className="text-2xl lg:text-3xl text-muted-foreground mb-6"
              variants={itemVariants}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Computer Science Student & Developer</span>
                <span className="absolute bottom-1 left-0 w-full h-2 bg-accent/20 -rotate-1 -z-0"></span>
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              7th semester BSCS student at FAST NUCES, passionate about building 
              innovative solutions with modern technologies. Specialized in full-stack 
              development with experience in React, Node.js, and database systems.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden px-8 py-6 text-base font-medium transition-all duration-300 ease-out bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-lg hover:shadow-lg hover:shadow-primary/30"
                onClick={scrollToContact}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden px-8 py-6 text-base font-medium transition-all duration-300 ease-out border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-foreground rounded-lg"
                onClick={() => window.open('https://github.com/22f8763', '_blank')}
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-4 mt-2"
              variants={itemVariants}
            >
              {[
                { icon: <Github size={20} />, url: 'https://github.com/22f8763' },
                { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/muhammad-basit-29913028a/' },
                { icon: <Phone size={20} />, url: 'tel:03069315673' }
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(item.url, '_blank')}
                  className="group relative h-12 w-12 rounded-full bg-background/60 backdrop-blur-md border border-border hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label={index === 0 ? 'GitHub' : index === 1 ? 'LinkedIn' : 'Phone'}
                >
                  <span className="relative z-10">{item.icon}</span>
                  <span className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </Button>
              ))}
            </motion.div>

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
          </motion.div>
          
          {/* Profile Image & 3D Earth */}
          <motion.div 
            className="flex-1 flex flex-col items-center lg:items-end gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="w-full max-w-md relative">
              {/* 3D Earth Canvas */}
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <EarthCanvas />
              </div>
              
              {/* Profile Image */}
              <motion.div 
                className="absolute -bottom-8 right-0 w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-primary bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: 'spring', bounce: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay"></div>
                <img
                  src="/lovable-uploads/4db6cc5d-33e5-4d4b-9688-15c838f02209.jpg"
                  alt="Muhammad Basit"
                  className="w-full h-full object-cover relative z-0"
                  loading="eager"
                />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary/10 blur-xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              <motion.div 
                className="absolute -bottom-12 -right-6 w-32 h-32 rounded-full bg-accent/10 blur-xl -z-10"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;