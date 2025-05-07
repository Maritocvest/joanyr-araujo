
import { useEffect, useRef, useState } from 'react';

type ServiceCardProps = {
  title: string;
  description: string;
  imageSrc: string;
};

const ServiceCard = ({ title, description, imageSrc }: ServiceCardProps) => {
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
      className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Aposentadoria",
      description: "Orientação completa sobre os diferentes tipos de aposentadoria, incluindo por idade, tempo de contribuição e especial.",
      imageSrc: "/lovable-uploads/1c5203f3-da8a-4b4b-9032-5cf6b7bee16b.png"
    },
    {
      title: "Pensão por Morte",
      description: "Assistência para dependentes de segurados falecidos obterem pensão por morte, garantindo a continuidade do sustento familiar.",
      imageSrc: "/lovable-uploads/bbfb0eb8-c76c-4b40-b347-16d6dfbff4a6.png"
    },
    {
      title: "BPC/LOAS",
      description: "Suporte para solicitar o Benefício de Prestação Continuada, garantindo o suporte financeiro necessário para quem não possui meios de prover a própria manutenção.",
      imageSrc: "/lovable-uploads/b33378af-1721-4652-9d70-50d6941be361.png"
    },
    {
      title: "Benefícios por Incapacidade",
      description: "Assistência na obtenção de benefícios como auxílio-doença e aposentadoria por invalidez, assegurando o reconhecimento da sua condição.",
      imageSrc: "/lovable-uploads/e9ba96ab-0f74-470b-98ef-b5c24757e28c.png"
    },
    {
      title: "Revisão de Benefícios",
      description: "Análise e atuação em pedidos de revisão quando os benefícios são calculados ou aplicados de forma incorreta.",
      imageSrc: "/lovable-uploads/f717d3c0-02ca-48c0-9b4b-21ffe65a9030.png"
    },
    {
      title: "Recursos Administrativos e Processos Judiciais",
      description: "Representação eficaz frente a negativas injustas, utilizando todos os recursos legais disponíveis.",
      imageSrc: "/lovable-uploads/8e24e8d8-59e0-4acd-88ac-21b663331d6f.png"
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">COMO PODEMOS TE AJUDAR</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos assistência jurídica especializada em diversas áreas do direito previdenciário para garantir que você receba todos os benefícios a que tem direito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
