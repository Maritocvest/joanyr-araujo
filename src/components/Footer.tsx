
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
            <p className="mb-4 text-gray-300">Advogado Previdenciarista | INSS | RPPS</p>
            <p className="text-sm text-gray-300">
              14 anos de experiência em direito previdenciário, ajudando pessoas a garantirem seus benefícios com segurança e tranquilidade.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-300 hover:text-secondary transition-colors">Início</a></li>
              <li><a href="#sobre" className="text-gray-300 hover:text-secondary transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="text-gray-300 hover:text-secondary transition-colors">Serviços</a></li>
              <li><a href="#diferenciais" className="text-gray-300 hover:text-secondary transition-colors">Diferenciais</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-secondary transition-colors">Perguntas Frequentes</a></li>
              <li><a href="#contato" className="text-gray-300 hover:text-secondary transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary">Contato</h3>
            <p className="mb-2 text-gray-300">Endereço: Palmas - TO, 77000-0000</p>
            <p className="mb-2 text-gray-300">WhatsApp: (63) 98502-7508</p>
            <p className="mb-4 text-gray-300">Email: joanyraraujo@gmail.com</p>

            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/joanyraraujo/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
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
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
