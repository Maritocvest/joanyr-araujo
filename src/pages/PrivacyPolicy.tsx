
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | Joanyr Araujo";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">POLÍTICA DE PRIVACIDADE</h1>
          <div className="prose max-w-none">
            <p className="mb-4">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. INTRODUÇÃO</h2>
            <p className="mb-4">
              Esta Política de Privacidade descreve como Joanyr Araujo Advogado Previdenciarista ("nós", "nosso" ou "escritório") 
              coleta, utiliza e compartilha informações pessoais quando você visita nosso site, preenche nosso formulário de contato 
              ou utiliza nossos serviços jurídicos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. INFORMAÇÕES QUE COLETAMOS</h2>
            <p className="mb-4">
              Coletamos informações que você nos fornece diretamente, como:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone/WhatsApp</li>
              <li>Mensagens enviadas através do formulário de contato</li>
              <li>Dados adicionais necessários para a prestação de serviços jurídicos, conforme solicitado durante o atendimento</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. COMO UTILIZAMOS SUAS INFORMAÇÕES</h2>
            <p className="mb-4">
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Responder a suas consultas e solicitações</li>
              <li>Fornecer orientação jurídica e prestar serviços advocatícios</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Enviar comunicações relacionadas aos serviços contratados</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. COMPARTILHAMENTO DE INFORMAÇÕES</h2>
            <p className="mb-4">
              Respeitamos a confidencialidade de suas informações e não as compartilhamos com terceiros, exceto:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Quando necessário para a prestação dos serviços jurídicos contratados</li>
              <li>Para cumprir obrigações legais, regulatórias ou responder a ordens judiciais</li>
              <li>Com seu consentimento expresso</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. SEGURANÇA DOS DADOS</h2>
            <p className="mb-4">
              Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais 
              contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. SEUS DIREITOS</h2>
            <p className="mb-4">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Acessar os dados pessoais que possuímos sobre você</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
              <li>Revogar seu consentimento a qualquer momento</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">7. RETENÇÃO DE DADOS</h2>
            <p className="mb-4">
              Mantemos suas informações pelo tempo necessário para cumprir as finalidades descritas nesta política, 
              cumprir obrigações legais ou regulatórias, ou pelo prazo legal de guarda de documentos jurídicos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">8. CONTATO</h2>
            <p className="mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato pelo e-mail: 
              joanyraraujo@gmail.com ou pelo telefone: (63) 98502-7508.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">9. ATUALIZAÇÕES DESTA POLÍTICA</h2>
            <p className="mb-4">
              Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
