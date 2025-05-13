
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfUse = () => {
  useEffect(() => {
    document.title = "Termos de Uso | Joanyr Araujo";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">TERMOS DE USO</h1>
          <div className="prose max-w-none">
            <p className="mb-4">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. INTRODUÇÃO</h2>
            <p className="mb-4">
              Estes Termos de Uso ("Termos") regem o acesso e utilização do site de Joanyr Araujo Advogado Previdenciarista. 
              Ao acessar ou utilizar o site, você concorda em cumprir e estar vinculado a estes Termos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. NATUREZA INFORMATIVA</h2>
            <p className="mb-4">
              O conteúdo disponibilizado neste site possui caráter exclusivamente informativo e educacional, não configurando 
              orientação jurídica específica para casos particulares. O estabelecimento da relação cliente-advogado requer 
              contratação formal dos serviços jurídicos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. CONTEÚDO E PROPRIEDADE INTELECTUAL</h2>
            <p className="mb-4">
              Todo o conteúdo disponibilizado neste site, incluindo textos, imagens, logotipos, e demais materiais, é de 
              propriedade exclusiva de Joanyr Araujo ou utilizado com as devidas autorizações, sendo protegido por leis 
              de direitos autorais e propriedade intelectual.
            </p>
            <p className="mb-4">
              Não é permitido copiar, reproduzir, modificar, distribuir, transmitir ou utilizar qualquer material deste site 
              para fins comerciais sem autorização prévia e expressa.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. LIMITAÇÃO DE RESPONSABILIDADE</h2>
            <p className="mb-4">
              As informações disponibilizadas neste site são apresentadas "como estão", sem garantias de qualquer tipo, 
              expressas ou implícitas. Não nos responsabilizamos por decisões tomadas com base no conteúdo aqui apresentado.
            </p>
            <p className="mb-4">
              Para orientação jurídica específica e personalizada, é necessário o agendamento de consulta profissional.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. FORMULÁRIO DE CONTATO</h2>
            <p className="mb-4">
              Ao utilizar o formulário de contato disponível no site, você concorda em fornecer informações precisas e 
              verdadeiras. O preenchimento do formulário não estabelece vínculo profissional automático, servindo apenas 
              como meio de comunicação inicial.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. CONFORMIDADE COM A OAB</h2>
            <p className="mb-4">
              Este site foi desenvolvido em conformidade com o Código de Ética e Disciplina da Ordem dos Advogados do Brasil 
              (OAB) e com o Provimento nº 94/2000 do Conselho Federal da OAB, que disciplina a publicidade, propaganda e 
              informação da advocacia.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">7. LINKS EXTERNOS</h2>
            <p className="mb-4">
              Este site pode conter links para sites externos. Não nos responsabilizamos pelo conteúdo, práticas de privacidade 
              ou políticas desses sites.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">8. ALTERAÇÕES DOS TERMOS</h2>
            <p className="mb-4">
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entrarão em vigor imediatamente 
              após sua publicação no site. O uso continuado do site após tais modificações constitui aceitação dos novos Termos.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">9. LEI APLICÁVEL</h2>
            <p className="mb-4">
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa relacionada a estes Termos 
              será submetida à jurisdição exclusiva dos tribunais brasileiros.
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">10. CONTATO</h2>
            <p className="mb-4">
              Para questões relacionadas a estes Termos, entre em contato pelo e-mail: joanyraraujo@gmail.com ou pelo telefone: 
              (63) 98502-7508.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
