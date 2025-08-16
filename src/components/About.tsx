import { Card, CardContent } from '@/components/ui/card';
import SectionReveal from './SectionReveal';
import { GraduationCap, Code, Trophy } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "7th semester BSCS student at FAST NUCES (National University of Computing and Emerging Sciences)"
    },
    {
      icon: Code,
      title: "Development",
      description: "Full-stack developer with expertise in modern web technologies and database systems"
    },
    {
      icon: Trophy,
      title: "Projects",
      description: "Actively working on multiple projects, building innovative solutions and gaining practical experience"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              About <span className="hero-text">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I'm a passionate Computer Science student with a strong foundation in programming 
              and a keen interest in building scalable web applications and solving complex problems.
            </p>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {highlights.map((item, index) => (
            <SectionReveal key={index} delay={index * 180}>
              <Card 
                className="glass-card hover:scale-105 transition-all duration-300 shadow-md"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 tech-glow">
                    <item.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={600}>
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center">My Journey</h3>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  Currently in my 7th semester at FAST NUCES, I've been immersing myself in the world of 
                  computer science and software development. My academic journey has equipped me with 
                  strong fundamentals in programming, algorithms, and system design.
                </p>
                <p className="mb-4">
                  Beyond the classroom, I'm actively engaged in practical development work, building 
                  projects that combine my theoretical knowledge with real-world application. I enjoy 
                  working with cutting-edge technologies and am always eager to learn new frameworks 
                  and tools that can help me create better solutions.
                </p>
                <p>
                  My goal is to become a skilled software engineer who can contribute to meaningful 
                  projects and make a positive impact through technology. I'm particularly interested 
                  in full-stack development and enjoy the challenge of building complete applications 
                  from concept to deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionReveal>
      </div>
    </section>
  );
};

export default About;