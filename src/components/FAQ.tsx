
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from "@/components/ui/card";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="rounded-lg shadow-sm overflow-hidden mb-4">
      <button
        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.slice(0, 10).replace(/\s/g, '-')}`}
      >
        <h3 className="text-lg font-semibold text-primary">{question}</h3>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-secondary" aria-hidden="true" /> : 
          <ChevronDown className="h-5 w-5 text-secondary" aria-hidden="true" />
        }
      </button>
      <div 
        id={`faq-answer-${question.slice(0, 10).replace(/\s/g, '-')}`}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="p-4 bg-gray-50">
          <p className="text-gray-700">{answer}</p>
        </div>
      </div>
    </Card>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Quem tem direito ao benefício do BPC/Loas?",
      answer: "O Benefício de Prestação Continuada (BPC/Loas) é destinado a idosos acima de 65 anos ou pessoas com deficiência de qualquer idade que tenham impedimentos de longo prazo (físicos, mentais, intelectuais ou sensoriais) que dificultem sua participação na sociedade, ambos terão que comprovar baixa renda. É necessário demonstrar que a renda por pessoa da família é inferior a 1/4 do salário mínimo vigente. Em alguns casos, a Justiça pode flexibilizar esse critério mediante análise das particularidades do caso concreto."
    },
    {
      question: "Quais condições médicas podem dar direito a benefícios por incapacidade?",
      answer: "Diversas condições de saúde podem justificar a concessão de benefícios por incapacidade, como doenças graves, transtornos mentais severos, doenças neurológicas, cardiopatias graves, entre outras. O importante é que haja documentação médica que comprove a condição e sua interferência na capacidade laboral, seja temporariamente (auxílio por incapacidade temporária) ou permanentemente (aposentadoria por incapacidade permanente). Cada caso é analisado individualmente pela perícia médica do INSS."
    },
    {
      question: "Quais perícias são necessárias nos processos previdenciários?",
      answer: "Dependendo do benefício solicitado, podem ser necessárias diferentes tipos de perícias. Para benefícios por incapacidade, a perícia médica é imprescindível. Para o BPC/LOAS, além da perícia médica (em caso de pessoa com deficiência), é realizada uma avaliação social para verificar as condições socioeconômicas. Em alguns casos específicos, podem ser necessárias perícias especializadas para comprovar condições de trabalho ou de saúde particulares."
    },
    {
      question: "O que fazer quando um benefício é negado pelo INSS?",
      answer: "Quando um benefício é negado pelo INSS, existem algumas possibilidades de revisão da decisão: 1) Recurso administrativo junto ao próprio INSS, através de petição dirigida à Junta de Recursos; 2) Ajuizamento de ação na Justiça Federal; 3) Em alguns casos, pode ser viável apresentar um novo requerimento administrativo com documentação complementar. A estratégia mais adequada dependerá da análise do caso específico e dos fundamentos da negativa."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">PERGUNTAS FREQUENTES</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Esclareça suas dúvidas sobre direito previdenciário e compreenda melhor os aspectos jurídicos relacionados aos benefícios previdenciários.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Possui outras dúvidas sobre direito previdenciário? Entre em contato para receber orientação especializada.</p>
          <a href="#contato" className="btn-primary" aria-label="Solicitar orientação jurídica">Solicitar Orientação</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
