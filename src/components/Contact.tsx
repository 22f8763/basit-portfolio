import { Card, CardContent } from '@/components/ui/card';
import SectionReveal from './SectionReveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Github, Linkedin, MessageCircle } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      label: "Phone",
      value: "0306 9315673",
      action: () => window.open('tel:03069315673'),
      color: "text-green-500"
    },
    {
      icon: Mail,
      label: "Email",
      value: "Get in touch",
      action: () => window.open('mailto:basit@example.com'),
      color: "text-blue-500"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Pakistan",
      action: () => {},
      color: "text-red-500"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      value: "22f8763",
      link: "https://github.com/22f8763",
      color: "hover:text-purple-500"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "muhammad-basit",
      link: "https://www.linkedin.com/in/muhammad-basit-29913028a/",
      color: "hover:text-blue-500"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Get In <span className="hero-text">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having 
              a chat about technology and development. Feel free to reach out!
            </p>
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <MessageCircle className="mr-3 text-primary" size={28} />
                  Let's Connect
                </h3>
                
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer"
                      onClick={method.action}
                    >
                      <div className={`p-3 rounded-full bg-secondary/50 ${method.color}`}>
                        <method.icon size={24} />
                      </div>
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-muted-foreground">{method.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Find Me Online</h3>
                
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <social.icon size={20} className={`${social.color} transition-colors`} />
                        <span className="font-medium">{social.label}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(social.link, '_blank')}
                        className="hover:scale-105 transition-transform"
                      >
                        Visit
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info Card */}
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Card className="glass-card h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Quick Info</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Current Status</h4>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                      Available for Opportunities
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Education</h4>
                    <p className="text-muted-foreground">
                      7th Semester BSCS Student<br />
                      FAST NUCES University
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Full-Stack Development", "Web Technologies", "Database Systems", "Problem Solving"].map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Looking For</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Internship opportunities</li>
                      <li>• Collaborative projects</li>
                      <li>• Learning opportunities</li>
                      <li>• Tech discussions</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    "Always eager to learn, build, and contribute to meaningful projects."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <Button 
            size="lg"
            onClick={() => window.open('tel:03069315673')}
            className="tech-glow mr-4 mb-4"
          >
            <Phone size={20} className="mr-2" />
            Call Now
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.open('https://www.linkedin.com/in/muhammad-basit-29913028a/', '_blank')}
            className="mb-4"
          >
            <Linkedin size={20} className="mr-2" />
            Connect on LinkedIn
          </Button>
        </div>
      </div>
          </section>
  );
};

export default Contact;