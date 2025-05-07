
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Shield } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const hasConsent = localStorage.getItem('cookieConsent');
    
    if (!hasConsent) {
      // Mostrar o banner depois de um pequeno atraso
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };
  
  if (!showConsent) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white bg-opacity-95 shadow-lg border-t border-gray-200 animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Shield className="text-secondary flex-shrink-0 w-6 h-6 mt-0.5" />
            <div>
              <h3 className="font-bold text-primary">Utilizamos cookies</h3>
              <p className="text-sm text-gray-600 mt-1">
                Utilizamos cookies para melhorar sua experiência em nosso site e fornecer conteúdo personalizado.
                Ao continuar navegando, você concorda com nossa política de privacidade.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={acceptCookies}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Aceitar cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
