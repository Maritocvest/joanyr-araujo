
import { HelpCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-accent py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ORIENTAÇÃO ESPECIALIZADA EM <span className="text-secondary">BENEFÍCIOS PREVIDENCIÁRIOS</span>
          </h2>
          <p className="text-gray-200 mb-8">
            O processo de solicitação de benefícios previdenciários envolve requisitos legais e documentação específica. 
            Conte com orientação jurídica especializada para compreender os procedimentos adequados.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contato" className="btn-primary flex items-center justify-center gap-2" aria-label="Solicitar orientação jurídica">
              <HelpCircle className="w-5 h-5" />
              Solicitar Orientação
            </a>
            <a href="#faq" className="btn-secondary flex items-center justify-center gap-2" aria-label="Informações sobre direitos previdenciários">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.35-.43.58-.79.58-.05 0-.1 0-.14-.01-.44-.05-.77-.47-.71-.91.27-1.65 1.73-2.95 3.44-2.95 1.96 0 3.55 1.61 3.55 3.6 0 .88-.32 1.68-.84 2.3z"></path>
              </svg>
              Saiba Mais sobre seus Direitos
            </a>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-secondary rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-secondary/50 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border-4 border-secondary/30 rounded-full"></div>
      </div>
    </section>
  );
};

export default CTA;
