
import { Award, Users, CheckCircle, Accessibility } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";

type DifferentialCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
};

const DifferentialCard = ({ title, description, icon, delay }: DifferentialCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Card className="rounded-lg shadow-sm p-6 bg-white">
        <div className="flex flex-col items-start">
          <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </Card>
    </div>
  );
};

const Differentials = () => {
  const differentials = [
    {
      title: "Experiência Comprovada",
      description: "Mais de 14 anos de atuação em direito previdenciário.",
      icon: <Award className="w-5 h-5 text-secondary" aria-hidden="true" />,
    },
    {
      title: "Atendimento Personalizado",
      description: "Cada caso recebe atenção detalhada para entender e atender às necessidades específicas de nossos clientes.",
      icon: <Users className="w-5 h-5 text-secondary" aria-hidden="true" />,
    },
    {
      title: "Clareza e transparência",
      description: "Usamos linguagem acessível para que você compreenda todas as etapas do processo previdenciário.",
      icon: <CheckCircle className="w-5 h-5 text-secondary" aria-hidden="true" />,
    },
    {
      title: "Acessibilidade",
      description: "Atendimento online para maior conveniência ou presencial em nossa sede, de acordo com as necessidades do cliente.",
      icon: <Accessibility className="w-5 h-5 text-secondary" aria-hidden="true" />,
    }
  ];

  return (
    <section id="diferenciais" className="py-20 bg-primary relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">NOSSOS DIFERENCIAIS</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentials.map((differential, index) => (
            <DifferentialCard
              key={index}
              title={differential.title}
              description={differential.description}
              icon={differential.icon}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
