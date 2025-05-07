
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-secondary font-bold text-2xl">Joanyr Araujo</h1>
        </div>

        {isMobile ? (
          <div className="flex items-center">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <a href="#inicio" className="text-white hover:text-secondary transition-colors duration-300">Início</a>
            <a href="#sobre" className="text-white hover:text-secondary transition-colors duration-300">Sobre</a>
            <a href="#servicos" className="text-white hover:text-secondary transition-colors duration-300">Serviços</a>
            <a href="#diferenciais" className="text-white hover:text-secondary transition-colors duration-300">Diferenciais</a>
            <a href="#faq" className="text-white hover:text-secondary transition-colors duration-300">Perguntas Frequentes</a>
            <a href="#contato" className="text-white hover:text-secondary transition-colors duration-300">Contato</a>
            <a href="#contato" className="btn-primary">Falar com Advogado</a>
          </div>
        )}
      </div>

      {/* Menu mobile */}
      {isMobile && isMenuOpen && (
        <div className="bg-primary shadow-lg py-4 px-4 absolute w-full animate-accordion-down">
          <div className="flex flex-col space-y-4">
            <a href="#inicio" className="text-white hover:text-secondary transition-colors duration-300" onClick={toggleMenu}>Início</a>
            <a href="#sobre" className="text-white hover:text-secondary transition-colors duration-300" onClick={toggleMenu}>Sobre</a>
            <a href="#servicos" className="text-white hover:text-secondary transition-colors duration-300" onClick={toggleMenu}>Serviços</a>
            <a href="#diferenciais" className="text-white hover:text-secondary transition-colors duration-300" onClick={toggleMenu}>Diferenciais</a>
            <a href="#faq" className="text-white hover:text-secondary transition-colors duration-300" onClick={toggleMenu}>Perguntas Frequentes</a>
            <a href="#contato" className="text-white hover:text-secondary transition-colors duration-300" onClick={toggleMenu}>Contato</a>
            <a href="#contato" className="btn-primary text-center" onClick={toggleMenu}>Falar com Advogado</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
