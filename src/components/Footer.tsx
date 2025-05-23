
import { Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Joanyr Araujo</h3>
            <p className="mb-1 text-gray-300">Advogado Previdenciarista | INSS | RPPS</p>
            <p className="mb-4 text-gray-300">OAB/TO [NÚMERO DA OAB A SER FORNECIDO]</p>
            <p className="text-sm text-gray-300">
              14 anos de experiência em direito previdenciário, orientando pessoas a compreenderem os requisitos e procedimentos para a obtenção de benefícios previdenciários.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Ir para a seção inicial">Início</a></li>
              <li><a href="#sobre" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Ir para a seção sobre">Sobre</a></li>
              <li><a href="#servicos" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Ir para a seção de serviços">Serviços</a></li>
              <li><a href="#diferenciais" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Ir para a seção de diferenciais">Diferenciais</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Ir para a seção de perguntas frequentes">Perguntas Frequentes</a></li>
              <li><a href="#contato" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Ir para a seção de contato">Contato</a></li>
              <li><a href="/termos" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Ver termos de uso">Termos de Uso</a></li>
              <li><a href="/privacidade" className="text-gray-300 hover:text-secondary transition-colors" aria-label="Ver política de privacidade">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Contato</h3>
            <p className="mb-2 text-gray-300">Endereço: [ENDEREÇO COMPLETO A SER FORNECIDO], Palmas - TO</p>
            <p className="mb-2 text-gray-300">Telefone: (63) 98502-7508</p>
            <p className="mb-4 text-gray-300">E-mail: joanyraraujo@gmail.com</p>

            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/joanyraraujo/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Joanyr Araujo | Advogado Previdenciarista. Todos os direitos reservados.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary hover:bg-secondary/80 transition-colors"
            aria-label="Voltar ao topo da página"
          >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-gray-400 text-sm">
            Desenvolvido por <a href="https://www.innovto.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">InnovTO</a>
          </p>
          <a href="https://www.innovto.com.br" target="_blank" rel="noopener noreferrer" aria-label="InnovTO website">
            <img src="/lovable-uploads/50a8c418-efbd-44eb-b7ee-8a5f3f63b718.png" alt="InnovTO Logo" className="h-10" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
