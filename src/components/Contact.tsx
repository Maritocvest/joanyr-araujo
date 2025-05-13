
import { Phone, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    lgpdConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS with your public key
  useEffect(() => {
    // Using the format recommended by EmailJS
    emailjs.init("vo8bO2b27gn2pgDsP");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.lgpdConsent) {
      toast({
        title: "Consentimento necessário",
        description: "Por favor, aceite a política de privacidade para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        to_name: "Joanyr Araújo",
        reply_to: formData.email,
      };
      
      // Enviando o email usando o service ID e template ID corretos das suas configurações do EmailJS
      await emailjs.send(
        'service_tsmlkwr',
        'template_z5lm1l7',
        templateParams,
        'vo8bO2b27gn2pgDsP'
      );
      
      console.log('Form submitted successfully:', formData);
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        lgpdConsent: false
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">ENTRE EM CONTATO</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos à disposição para fornecer informações sobre direitos previdenciários. Preencha o formulário abaixo e entraremos em contato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                  aria-label="Seu nome completo"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                  aria-label="Seu endereço de e-mail"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefone/WhatsApp</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                  aria-label="Seu número de telefone ou WhatsApp"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  required
                  aria-label="Sua mensagem"
                ></textarea>
              </div>
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="lgpdConsent"
                    name="lgpdConsent"
                    checked={formData.lgpdConsent}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                    required
                    aria-label="Consentimento para tratamento de dados pessoais"
                  />
                  <label htmlFor="lgpdConsent" className="text-sm text-gray-700">
                    Li e concordo com a <a href="/privacidade" className="text-secondary hover:underline">Política de Privacidade</a> e autorizo o uso dos meus dados para contato.
                  </label>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full btn-primary flex items-center justify-center"
                disabled={isSubmitting}
                aria-label="Enviar mensagem de contato"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Endereço</h4>
                    <p className="text-gray-600">Palmas - TO, 77000-0000</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Telefone</h4>
                    <p className="text-gray-600">(63) 98502-7508</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">E-mail</h4>
                    <p className="text-gray-600">joanyraraujo@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-6">Horário de Atendimento</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Segunda - Sexta:</span>
                  <span>08:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Sábado:</span>
                  <span>09:00 - 12:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Domingo:</span>
                  <span>Fechado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
