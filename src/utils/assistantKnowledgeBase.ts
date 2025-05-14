
// Knowledge base for the AI assistant
type QuestionAnswer = {
  question: string;
  answer: string;
  category: string;
  options?: string[];
};

export const knowledgeBase: QuestionAnswer[] = [
  // Geral
  {
    category: "Geral",
    question: "Quem é Joanyr Araujo?",
    answer: "Joanyr Araujo é um advogado previdenciarista em Palmas, especialista em Direito Previdenciário."
  },
  {
    category: "Geral",
    question: "Qual a experiência de Joanyr Araujo?",
    answer: "Ele possui mais de 14 anos de experiência na área do direito previdenciário."
  },
  {
    category: "Geral",
    question: "Onde Joanyr Araujo atua?",
    answer: "Ele atua em Palmas, Tocantins."
  },
  
  // Serviços Oferecidos
  {
    category: "Serviços Oferecidos",
    question: "Quais serviços Joanyr Araujo oferece?",
    answer: "Ele oferece orientação jurídica especializada em diversas áreas do direito previdenciário, incluindo:\n- Aposentadorias (por idade, tempo de contribuição e especial)\n- Pensão por Morte\n- Auxílios por incapacidade (auxílio-doença e aposentadoria por invalidez)\n- Benefício assistencial (BPC/LOAS)\n- Revisão de Benefícios\n- Recursos Administrativos e Processos",
    options: [
      "Aposentadorias",
      "Pensão por Morte",
      "Auxílios por incapacidade",
      "BPC/LOAS",
      "Revisão de Benefícios",
      "Recursos Administrativos"
    ]
  },
  {
    category: "Serviços Oferecidos",
    question: "O que é orientação sobre aposentadoria?",
    answer: "É a orientação completa sobre os diferentes tipos de aposentadoria, incluindo por idade, tempo de contribuição e especial."
  },
  {
    category: "Serviços Oferecidos",
    question: "O que é BPC/LOAS?",
    answer: "É o Benefício de Prestação Continuada, um suporte financeiro para quem não possui meios de prover a própria manutenção."
  },
  {
    category: "Serviços Oferecidos",
    question: "O que são benefícios por incapacidade?",
    answer: "São benefícios como auxílio-doença e aposentadoria por invalidez."
  },
  {
    category: "Serviços Oferecidos",
    question: "O que é revisão de benefícios?",
    answer: "É a análise e atuação em pedidos de revisão quando os benefícios são calculados ou aplicados de forma incorreta."
  },
  {
    category: "Serviços Oferecidos",
    question: "O que envolve Recursos Administrativos e Processos?",
    answer: "É a representação em processos administrativos e judiciais para garantir o reconhecimento dos direitos previdenciários."
  },
  
  // Diferenciais
  {
    category: "Diferenciais",
    question: "Quais são os diferenciais do serviço de Joanyr Araujo?",
    answer: "Os diferenciais incluem:\n- Experiência Profissional: Atuação há mais de 14 anos com conhecimento técnico específico.\n- Comunicação Clara: Explicações acessíveis sobre conceitos jurídicos complexos.\n- Atendimento Adaptado: Consultas remotas ou presenciais.\n- Atendimento Individualizado: Análise detalhada de cada situação.",
    options: [
      "Experiência Profissional",
      "Comunicação Clara",
      "Atendimento Adaptado",
      "Atendimento Individualizado"
    ]
  },
  
  // Perguntas Frequentes
  {
    category: "Perguntas Frequentes",
    question: "O que fazer quando um benefício é negado pelo INSS?",
    answer: "Existem algumas possibilidades de revisão da decisão:\n- Recurso administrativo junto ao próprio INSS.\n- Ajuizamento de ação na Justiça Federal.\n- Em alguns casos, novo requerimento administrativo com documentação complementar.\n\nA estratégia adequada depende da análise do caso específico."
  },
  
  // Contato
  {
    category: "Contato",
    question: "Como entrar em contato com Joanyr Araujo?",
    answer: "Você pode entrar em contato através do formulário no site, telefone ou e-mail.",
    options: [
      "Telefone",
      "E-mail",
      "Endereço",
      "Horário de atendimento"
    ]
  },
  {
    category: "Contato",
    question: "Qual o telefone de contato?",
    answer: "O telefone é (63) 98502-7508."
  },
  {
    category: "Contato",
    question: "Qual o e-mail de contato?",
    answer: "O e-mail é joanyraraujo@gmail.com."
  },
  {
    category: "Contato",
    question: "Qual o endereço do escritório?",
    answer: "O endereço é Palmas - TO, 77000-0000. (Endereço completo a ser fornecido)."
  },
  {
    category: "Contato",
    question: "Qual o horário de atendimento?",
    answer: "Segunda a Sexta: 08:00 - 18:00\nSábado: 09:00 - 12:00\nDomingo: Fechado"
  },
  
  // Ações/Botões
  {
    category: "Ações/Botões",
    question: "Como solicitar orientação?",
    answer: "Você pode solicitar orientação através do botão \"Solicitar Orientação\" no site."
  },
  {
    category: "Ações/Botões",
    question: "Como saber mais sobre meus direitos?",
    answer: "Você pode saber mais sobre seus direitos clicando em \"Saiba Mais sobre seus Direitos\"."
  }
];

// Helper function to find answers
export const findAnswer = (userQuery: string): {answer: string, options?: string[]} | null => {
  const normalizedQuery = userQuery.toLowerCase().trim();
  
  // First, try direct question matching
  const directMatch = knowledgeBase.find(
    qa => qa.question.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(qa.question.toLowerCase())
  );
  
  if (directMatch) {
    return {
      answer: directMatch.answer,
      options: directMatch.options
    };
  }
  
  // If no direct match, look for keyword matching
  const keywords: Record<string, string[]> = {
    'aposentadoria': ['aposentar', 'aposentado', 'idade', 'tempo de contribuição', 'especial'],
    'bpc': ['loas', 'benefício de prestação continuada', 'assistencial', 'idoso', 'deficiência'],
    'pensão': ['morte', 'falecimento', 'dependente', 'viúva', 'viúvo'],
    'incapacidade': ['doença', 'auxílio-doença', 'invalidez', 'incapaz', 'doente', 'perícia'],
    'revisão': ['revisar', 'cálculo incorreto', 'valor errado', 'erro no benefício'],
    'recursos': ['processo', 'judicial', 'administrativo', 'justiça', 'recurso'],
    'contato': ['telefone', 'e-mail', 'email', 'endereço', 'horário', 'atendimento'],
    'diferenciais': ['diferença', 'vantagem', 'melhor', 'experiência', 'comunicação', 'atendimento'],
    'negado': ['negado', 'indeferido', 'recusado', 'cancelado', 'suspenso']
  };
  
  for (const [category, keywordList] of Object.entries(keywords)) {
    if (keywordList.some(keyword => normalizedQuery.includes(keyword))) {
      const matchByKeyword = knowledgeBase.find(qa => 
        qa.question.toLowerCase().includes(category) || 
        qa.answer.toLowerCase().includes(category)
      );
      
      if (matchByKeyword) {
        return {
          answer: matchByKeyword.answer,
          options: matchByKeyword.options
        };
      }
    }
  }
  
  // If still no match, return null to use the default fallback response
  return null;
};

// Function to get suggestions based on category
export const getSuggestions = (category?: string): string[] => {
  if (!category) {
    // Return a sample of questions from each category
    return [
      "Quem é Joanyr Araujo?",
      "Quais serviços Joanyr Araujo oferece?",
      "Quais são os diferenciais do serviço?",
      "O que fazer quando um benefício é negado?",
      "Como entrar em contato?"
    ];
  }
  
  // Return questions based on specific category
  const categoryQuestions = knowledgeBase
    .filter(qa => qa.category === category)
    .map(qa => qa.question);
    
  return categoryQuestions.length > 0 ? categoryQuestions : getSuggestions();
};
