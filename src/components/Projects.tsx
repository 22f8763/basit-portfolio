import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionReveal from './SectionReveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "EduConnect Pakistan",
      description: "A comprehensive MERN stack educational platform connecting students and educators across Pakistan. Features include course management, live classes, resource sharing, and progress tracking. Built with modern web technologies for an engaging learning experience.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "Redux", "JWT"],
      github: "https://github.com/22f8763/EduConnect-Web.git",
      live: "#",
      status: "Completed"
    },
    {
      title: "Mental Health Tracker",
      description: "A comprehensive mental health tracking application that helps users monitor their emotional well-being, track mood patterns, and access resources for mental health support. Features user authentication and data persistence.",
      technologies: ["Next.js", "MongoDB", "Supabase", "React"],
      github: "https://github.com/22f8763/mental-health-tracker-v2.git",
      live: "#",
      status: "Completed"
    },
    {
      title: "Blog Summarizer",
      description: "An intelligent web application that transforms lengthy blog posts into concise summaries. Users can input any blog URL and receive summaries in both English and Urdu, making content consumption more efficient and accessible.",
      technologies: ["Next.js", "Supabase", "AI/ML", "React"],
      github: "https://github.com/22f8763/blog-summariser.git",
      live: "#",
      status: "Completed"
    },
    {
      title: "Quote Generator",
      description: "A creative quote generation platform where users input keywords or themes and receive inspiring, contextually relevant quotes. Perfect for writers, content creators, and anyone seeking daily inspiration.",
      technologies: ["Next.js", "React", "JavaScript", "API Integration"],
      github: "https://github.com/22f8763/Nexium_-Basit-_QuoteGenerator.git",
      live: "#",
      status: "Completed"
    },
    {
      title: "Blog Application",
      description: "A full-stack blogging platform with user authentication, post creation, editing capabilities, and comment systems. Built with traditional server-side rendering for optimal performance and SEO.",
      technologies: ["Node.js", "MongoDB", "EJS", "Express.js"],
      github: "https://github.com/22f8763/blog_app.git",
      live: "#",
      status: "Completed"
    },
    {
      title: "AI Game Playing System",
      description: "An artificial intelligence project implementing various game-playing algorithms and strategies. Demonstrates advanced AI concepts including minimax algorithms, alpha-beta pruning, and machine learning techniques in game environments.",
      technologies: ["Python", "AI/ML", "Game Theory", "Algorithms"],
      github: "https://github.com/22f8763/Game-playing-in-AI.git",
      live: "#",
      status: "Completed"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "Completed" 
      ? "bg-green-500/10 text-green-500 border-green-500/20" 
      : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
  };

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              My <span className="hero-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of projects I've built to apply my skills and explore new technologies. 
              Each project represents a learning journey and demonstrates different aspects of my development expertise.
            </p>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <SectionReveal key={index} delay={index * 120}>
              <Card 
                className="glass-card hover:scale-105 transition-all duration-300 group shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge 
                      variant="outline"
                      className={getStatusColor(project.status)}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
  <Button
    variant="outline"
    size="sm"
    className="flex-1"
    onClick={() => window.open(project.github, '_blank')}
  >
    <Github size={16} className="mr-2" />
    Code
  </Button>
</div>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Code size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-4">More Projects on GitHub</h3>
              <p className="text-muted-foreground mb-6">
                Check out my GitHub profile to see more projects, contributions, and my coding journey.
              </p>
              <Button 
                size="lg"
                onClick={() => window.open('https://github.com/22f8763', '_blank')}
                className="tech-glow"
              >
                <Github size={20} className="mr-2" />
                Visit My GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;