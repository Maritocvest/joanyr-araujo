
import { useEffect, useRef, useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Home, FileText, Users, Clock, Activity, User } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
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
    >
      <Card className="rounded-lg shadow-sm p-6 h-full">
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

const Services = () => {
  const services = [
    {
      title: "Aposentadoria",
      description: "Orientação completa sobre os diferentes tipos de aposentadoria, incluindo por idade, tempo de contribuição e especial.",
      icon: <Clock className="w-5 h-5 text-secondary" />
    },
    {
      title: "Pensão por Morte",
      description: "Assistência para dependentes de segurados falecidos obterem pensão por morte, garantindo a continuidade do sustento familiar.",
      icon: <Users className="w-5 h-5 text-secondary" />
    },
    {
      title: "BPC/LOAS",
      description: "Suporte para solicitar o Benefício de Prestação Continuada, garantindo o suporte financeiro necessário para quem não possui meios de prover a própria manutenção.",
      icon: <Activity className="w-5 h-5 text-secondary" />
    },
    {
      title: "Benefícios por Incapacidade",
      description: "Assistência na obtenção de benefícios como auxílio-doença e aposentadoria por invalidez, assegurando o reconhecimento da sua condição.",
      icon: <User className="w-5 h-5 text-secondary" />
    },
    {
      title: "Revisão de Benefícios",
      description: "Análise e atuação em pedidos de revisão quando os benefícios são calculados ou aplicados de forma incorreta.",
      icon: <FileText className="w-5 h-5 text-secondary" />
    },
    {
      title: "Recursos Administrativos e Processos",
      description: "Representação em processos administrativos e judiciais para garantir o reconhecimento dos direitos previdenciários.",
      icon: <Home className="w-5 h-5 text-secondary" />
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">COMO PODEMOS ORIENTÁ-LO</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos orientação jurídica especializada em diversas áreas do direito previdenciário para que você compreenda todos os benefícios a que tem direito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
