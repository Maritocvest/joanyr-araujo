
import { Award, Users, CheckCircle, Accessibility } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
      className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Differentials = () => {
  const differentials = [
    {
      title: "Experiência Comprovada",
      description: "Mais de 14 anos de sucesso em direito previdenciário.",
      icon: <Award className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Atendimento Personalizado",
      description: "Cada caso recebe atenção detalhada para entender e atender às necessidades específicas de nossos clientes.",
      icon: <Users className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Clareza e transparência",
      description: "Usamos linguagem acessível para que você compreenda tudo o que está acontecendo e quais as próximas etapas.",
      icon: <CheckCircle className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Acessibilidade",
      description: "Atendimento online para maior conveniência ou presencial em nossa sede, de acordo com as necessidades do cliente.",
      icon: <Accessibility className="w-6 h-6 text-secondary" />,
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
