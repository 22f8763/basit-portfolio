import { motion, AnimatePresence, Variants } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Twitter, Instagram, Heart, ArrowUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { 
      icon: <Github size={20} />, 
      label: 'GitHub',
      url: 'https://github.com/22f8763',
      color: 'hover:bg-gray-800 dark:hover:bg-gray-700'
    },
    { 
      icon: <Linkedin size={20} />, 
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/muhammad-basit-29913028a/',
      color: 'hover:bg-blue-600 hover:text-white'
    },
    { 
      icon: <Mail size={20} />, 
      label: 'Email',
      url: 'mailto:basitarshad97@gmail.com',
      color: 'hover:bg-red-500 hover:text-white'
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Subscribed with:', email);
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
      
      // Reset subscription message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1000);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const socialVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const formVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  return (
    <motion.footer 
      ref={footerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative bg-gradient-to-b from-background to-background/95 border-t border-border/30 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Branding */}
          <motion.div 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Muhammad Basit
            </motion.h3>
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              Computer Science Student & Developer passionate about building 
              innovative solutions with modern technologies.
            </motion.p>
            <motion.div 
              className="flex items-center space-x-3 pt-2"
              variants={itemVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border text-foreground/70 hover:text-foreground transition-all duration-300 ${social.color} shadow-sm`}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  variants={itemVariants}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h4 
              className="text-lg font-semibold text-foreground"
              variants={itemVariants}
            >
              Quick Links
            </motion.h4>
            <motion.div 
              className="space-y-3"
              variants={itemVariants}
            >
              {quickLinks.map((link, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left group"
                  variants={itemVariants}
                >
                  <span className="relative group-hover:after:scale-x-100 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary after:transition-transform after:duration-300 after:origin-left after:scale-x-0">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h4 
              className="text-lg font-semibold text-foreground"
              variants={itemVariants}
            >
              Contact Info
            </motion.h4>
            <motion.div 
              className="space-y-3 text-muted-foreground"
              variants={itemVariants}
            >
              <motion.p className="flex items-start" variants={itemVariants}>
                <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-primary/10 text-primary">
                  <Phone size={14} />
                </span>
                <a href="tel:03069315673" className="hover:text-primary transition-colors">
                  +92 306 9315673
                </a>
              </motion.p>
              <motion.p className="flex items-start" variants={itemVariants}>
                <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-primary/10 text-primary">
                  <Mail size={14} />
                </span>
                <a href="mailto:basitarshad97@gmail.com" className="hover:text-primary transition-colors">
                  basitarshad97@gmail.com
                </a>
              </motion.p>
              <motion.p className="flex items-start" variants={itemVariants}>
                <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span>FAST NUCES University, Pakistan</span>
              </motion.p>
              <motion.p className="flex items-center text-green-500 font-medium mt-4" variants={itemVariants}>
                <span className="flex w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
                Available for opportunities
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h4 
              className="text-lg font-semibold text-foreground"
              variants={itemVariants}
            >
              Newsletter
            </motion.h4>
            <motion.p 
              className="text-muted-foreground"
              variants={itemVariants}
            >
              Subscribe to my newsletter for the latest updates and articles.
            </motion.p>
            <motion.form 
              onSubmit={handleSubscribe}
              className="space-y-3"
              variants={itemVariants}
            >
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-background/50 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-foreground/70 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Subscribe"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-foreground/30 border-t-primary rounded-full animate-spin"></div>
                  ) : isSubscribed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {isSubscribed && (
                  <motion.p 
                    className="text-sm text-green-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Thanks for subscribing! 🎉
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Terms of Service
              </motion.a>
            </motion.form>
          </motion.div>
        </div>

        <div className="border-t border-border/30 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-muted-foreground text-sm flex items-center mb-4 md:mb-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              &copy; {currentYear} Muhammad Basit. All rights reserved.
            </motion.p>

            <div className="flex items-center space-x-6">
              <motion.a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;