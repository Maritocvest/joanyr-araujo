
import { Award, Clock, User } from 'lucide-react';

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">QUEM VAI TE AJUDAR</h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="/lovable-uploads/84f01f80-0758-4aaa-8826-cfa491436452.png" 
              alt="Joanyr Araujo - Advogado Previdenciarista"
              className="w-full max-w-lg mx-auto rounded-xl shadow-xl"
            />
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-primary mb-3">Joanyr Araujo</h3>
            <p className="text-xl font-medium text-secondary mb-6">Advogado Previdenciarista | INSS | RPPS</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <User className="w-10 h-10 text-secondary mb-2" />
                <h4 className="text-lg font-bold">Empreendedor</h4>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Clock className="w-10 h-10 text-secondary mb-2" />
                <h4 className="text-lg font-bold">14 anos</h4>
                <p className="text-sm text-center">de Prática Previdenciária</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Award className="w-10 h-10 text-secondary mb-2" />
                <h4 className="text-lg font-bold">Especialista</h4>
                <p className="text-sm text-center">em Direito Previdenciário</p>
              </div>
            </div>

            <p className="text-gray-700 mb-8">
              Com mais de uma década de experiência no Direito Previdenciário, construo estratégias personalizadas para que cada cliente tenha acesso ao melhor benefício possível. Minha missão é ajudar você a navegar pelo complexo sistema do INSS e garantir seus direitos previdenciários com segurança e tranquilidade.
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Áreas de atuação:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span> Aposentadorias</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span> Pensão</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span> BPC/LOAS</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-secondary rounded-full mr-2"></span> Revisão de Benefícios</li>
              </ul>
            </div>

            <a href="#contato" className="btn-primary inline-block">Entre em Contato</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
