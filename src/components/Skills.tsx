import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"],
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Backend Development", 
      skills: ["Node.js", "Express.js", "RESTful APIs", "Authentication", "Server Architecture"],
      color: "bg-accent/10 text-accent"
    },
    {
      title: "Database Systems",
      skills: ["MongoDB", "SQL", "Database Design", "Query Optimization", "Data Modeling"],
      color: "bg-secondary/50 text-secondary-foreground"
    },
    {
      title: "Programming Languages",
      skills: ["JavaScript", "Python", "C++", "TypeScript", "SQL"],
      color: "bg-muted text-muted-foreground"
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "GitHub", "VS Code", "Postman", "NPM", "Webpack"],
      color: "bg-primary/20 text-primary"
    },
    {
      title: "Soft Skills",
      skills: ["Problem Solving", "Team Collaboration", "Project Management", "Communication", "Learning Agility"],
      color: "bg-accent/20 text-accent"
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="hero-text">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of technologies and skills I've developed through 
            academic study and hands-on project experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="glass-card hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      className={`${category.color} hover:scale-110 transition-transform cursor-default`}
                      variant="secondary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skill Level Indicators */}
        <div className="mt-16 max-w-4xl mx-auto animate-fade-in">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-8 text-center">Proficiency Levels</h3>
              
              <div className="space-y-6">
                {[
                  { skill: "React & Frontend Development", level: 85 },
                  { skill: "Node.js & Backend Development", level: 80 },
                  { skill: "Database Systems (MongoDB, SQL)", level: 75 },
                  { skill: "Python Programming", level: 70 },
                  { skill: "C++ Programming", level: 80 },
                  { skill: "Problem Solving & Algorithms", level: 85 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.skill}</span>
                      <span className="text-muted-foreground">{item.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${item.level}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;