
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <button
        className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-primary">{question}</h3>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-secondary" /> : 
          <ChevronDown className="h-5 w-5 text-secondary" />
        }
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 bg-gray-50">
          <p className="text-gray-700">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Quem tem direito ao benefício do BPC/Loas?",
      answer: "O Benefício de Prestação Continuada (BPC/Loas) é destinado a idosos acima de 65 anos ou pessoas com deficiência de qualquer idade que tenham impedimentos de longo prazo (físicos, mentais, intelectuais ou sensoriais) que dificultem sua participação na sociedade, ambos terão que comprovar baixa renda. É necessário demonstrar que a renda por pessoa da família é inferior a 1/4 do salário mínimo vigente. Em alguns casos, a Justiça pode flexibilizar esse critério."
    },
    {
      question: "Quais doenças dão direito ao auxílio-doença ou aposentadoria por invalidez?",
      answer: "Diversas condições de saúde podem dar direito a benefícios por incapacidade, como doenças graves, transtornos mentais severos, doenças neurológicas, cardiopatias graves, entre outras. O importante é que a condição médica comprovadamente impeça o trabalho, seja temporariamente (auxílio-doença) ou permanentemente (aposentadoria por invalidez). Cada caso é avaliado pela perícia médica do INSS."
    },
    {
      question: "Quais perícias deverei fazer?",
      answer: "Dependendo do benefício solicitado, você poderá passar por perícias médicas (em caso de benefícios por incapacidade) ou perícias sociais (para BPC/LOAS). Em alguns casos, podem ser necessárias perícias especializadas para comprovar condições específicas. Como seu advogado, irei orientá-lo sobre como se preparar adequadamente para cada avaliação."
    },
    {
      question: "O que fazer quando um benefício é negado pelo INSS?",
      answer: "Quando um benefício é negado pelo INSS, existem alguns caminhos possíveis: 1) Entrar com recurso administrativo no próprio INSS; 2) Ajuizar uma ação na Justiça Federal; 3) Apresentar um novo requerimento com documentação complementar. Como seu advogado, analisarei seu caso específico e recomendarei a estratégia mais adequada para reverter a decisão."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">PERGUNTAS FREQUENTES</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Esclareça suas dúvidas sobre direito previdenciário e descubra como podemos ajudá-lo a garantir seus benefícios.
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
          <p className="text-gray-600 mb-6">Não encontrou a resposta para sua dúvida? Entre em contato conosco.</p>
          <a href="#contato" className="btn-primary">Fale Conosco</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
