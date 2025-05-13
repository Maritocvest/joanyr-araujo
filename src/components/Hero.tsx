
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/84f01f80-0758-4aaa-8826-cfa491436452.png')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 py-16 flex flex-col lg:flex-row items-center">
        <div className={`lg:w-1/2 mb-12 lg:mb-0 ${isVisible ? 'fade-in' : 'opacity-0'} transition-all duration-1000`} style={{
        animationDelay: '0.2s'
      }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Orientação Especializada em Benefícios Previdenciários</span>
          </h1>
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">Entenda seus direitos e etapas para garantir seu benefício com segurança jurídica.</h3>
          <p className="text-lg mb-8 text-gray-200 max-w-xl">Com mais de 14 anos de experiência, oferecemos acompanhamento especializado para que você tenha segurança e tranquilidade na hora de solicitar seus direitos previdenciários.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contato" className="btn-primary text-center" aria-label="Solicitar orientação jurídica">Solicitar Orientação</a>
            <a href="#servicos" className="btn-secondary text-center" aria-label="Informações sobre direitos previdenciários">Saiba Mais sobre seus Direitos</a>
          </div>
        </div>
        <div className={`lg:w-1/2 flex justify-center relative ${isVisible ? 'fade-in' : 'opacity-0'} transition-all duration-1000`} style={{
        animationDelay: '0.4s'
      }}>
          <div className="relative">
            <div className="absolute -inset-2.5 bg-secondary/20 rounded-full blur-lg"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-secondary/50 rounded-full"></div>
            <img src="/lovable-uploads/c473db73-2410-4b37-87b9-8e36c05edf46.png" alt="Joanyr Araujo - Advogado Previdenciarista" className="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover object-top border-4 border-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
