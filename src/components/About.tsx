
import { Award, Clock, User, Check } from 'lucide-react';

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">QUEM VAI ORIENTÁ-LO</h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="/lovable-uploads/c473db73-2410-4b37-87b9-8e36c05edf46.png" 
              alt="Joanyr Araujo - Advogado Previdenciarista" 
              className="w-full max-w-lg mx-auto rounded-lg shadow-sm" 
            />
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-primary mb-3">Joanyr Araujo</h3>
            <p className="text-xl font-medium text-secondary mb-6">Advogado Previdenciarista | INSS | RPPS</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-bold">Especialista</h4>
                <p className="text-sm text-center">em Direito Previdenciário</p>
              </div>
            </div>

            <p className="text-gray-700 mb-8">
              Com mais de uma década de experiência no Direito Previdenciário, desenvolvo estratégias personalizadas para que cada cliente compreenda as possibilidades legais disponíveis. Minha missão é orientá-lo a navegar pelo sistema previdenciário, garantindo que você esteja bem informado sobre seus direitos.
            </p>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Áreas de atuação:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" aria-hidden="true" />
                  <span>Aposentadorias</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" aria-hidden="true" />
                  <span>Pensões</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" aria-hidden="true" />
                  <span>Auxílios por incapacidade</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary" aria-hidden="true" />
                  <span>Benefício assistencial (BPC/LOAS)</span>
                </li>
              </ul>
            </div>

            <a href="#contato" className="btn-primary inline-block" aria-label="Solicitar orientação jurídica">Solicitar Orientação</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
