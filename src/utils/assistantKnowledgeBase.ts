
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
    answer: "Joanyr Araujo é um advogado previdenciarista em Palmas, especialista em Direito Previdenciário com mais de 14 anos de experiência. Ele oferece orientação jurídica especializada em diversas áreas do direito previdenciário, buscando garantir que seus clientes compreendam seus direitos e as opções legais disponíveis."
  },
  {
    category: "Geral",
    question: "Qual a experiência de Joanyr Araujo?",
    answer: "Ele possui mais de 14 anos de experiência na área do direito previdenciário, com conhecimento técnico específico e ampla atuação em casos diversos."
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
    answer: "O Dr. Joanyr Araujo oferece orientação jurídica especializada em diversas áreas do direito previdenciário, incluindo:\n- Aposentadorias (por idade, tempo de contribuição e especial)\n- Pensão por Morte\n- Auxílios por incapacidade (auxílio-doença e aposentadoria por invalidez)\n- Benefício assistencial (BPC/LOAS)\n- Revisão de Benefícios\n- Recursos Administrativos e Processos\n\nEle auxilia em todo o processo de solicitação e revisão de benefícios previdenciários.",
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
    answer: "É a orientação completa sobre os diferentes tipos de aposentadoria, incluindo por idade, tempo de contribuição e especial. O Dr. Joanyr Araujo auxilia na análise dos requisitos necessários, documentação exigida e todo o processo de solicitação junto ao INSS."
  },
  {
    category: "Serviços Oferecidos",
    question: "O que é BPC/LOAS?",
    answer: "O Benefício de Prestação Continuada (BPC/LOAS) é um suporte financeiro para idosos com mais de 65 anos ou pessoas com deficiência de qualquer idade que não possuem meios de prover a própria manutenção ou tê-la provida por sua família. É necessário comprovar baixa renda familiar, geralmente inferior a 1/4 do salário mínimo por pessoa."
  },
  {
    category: "Serviços Oferecidos",
    question: "O que são benefícios por incapacidade?",
    answer: "São benefícios como auxílio-doença (auxílio por incapacidade temporária) e aposentadoria por invalidez (aposentadoria por incapacidade permanente), destinados a trabalhadores que estão temporária ou permanentemente incapacitados de exercer sua atividade profissional por motivo de doença ou acidente."
  },
  {
    category: "Serviços Oferecidos",
    question: "O que é revisão de benefícios?",
    answer: "É a análise e atuação em pedidos de revisão quando os benefícios são calculados ou aplicados de forma incorreta pelo INSS. O Dr. Joanyr Araujo pode avaliar seu benefício atual e verificar se há possibilidade de correção de valores ou critérios utilizados."
  },
  {
    category: "Serviços Oferecidos",
    question: "O que envolve Recursos Administrativos e Processos?",
    answer: "É a representação em processos administrativos junto ao INSS e judiciais na Justiça Federal para garantir o reconhecimento dos direitos previdenciários. Isso inclui a elaboração de recursos contra decisões desfavoráveis e o acompanhamento dos processos em todas as instâncias."
  },
  {
    category: "Serviços Oferecidos",
    question: "Quais os tipos de aposentadoria?",
    answer: "O Dr. Joanyr Araujo oferece orientação sobre os seguintes tipos de aposentadoria:\n- Aposentadoria por idade: concedida com base na idade mínima do trabalhador\n- Aposentadoria por tempo de contribuição: baseada no tempo de pagamento ao INSS\n- Aposentadoria especial: para trabalhadores expostos a agentes nocivos à saúde\n\nCada tipo possui requisitos específicos que podem variar conforme as regras de transição da Reforma da Previdência.",
    options: [
      "Aposentadoria por idade",
      "Aposentadoria por tempo de contribuição",
      "Aposentadoria especial"
    ]
  },
  {
    category: "Serviços Oferecidos",
    question: "Como faço para dar entrada na aposentadoria?",
    answer: "Para dar entrada na aposentadoria, você precisará reunir a documentação necessária (como documentos pessoais, comprovantes de contribuição, etc.) e fazer o requerimento junto ao INSS. Este processo pode ser realizado pelo site ou aplicativo Meu INSS, pelo telefone 135 ou presencialmente em uma agência. Para garantir que todo o processo ocorra da forma correta e que seus direitos sejam respeitados, recomendamos buscar orientação jurídica especializada com o Dr. Joanyr Araujo antes de iniciar o procedimento."
  },
  
  // Diferenciais
  {
    category: "Diferenciais",
    question: "Quais são os diferenciais do serviço de Joanyr Araujo?",
    answer: "Os diferenciais do Dr. Joanyr Araujo incluem:\n- Experiência Profissional: Mais de 14 anos de atuação com conhecimento técnico específico em direito previdenciário.\n- Comunicação Clara: Explicações acessíveis e fáceis de entender sobre conceitos jurídicos complexos.\n- Atendimento Adaptado: Consultas remotas ou presenciais, conforme a necessidade do cliente.\n- Atendimento Individualizado: Análise detalhada de cada caso, considerando suas particularidades.",
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
    answer: "Quando um benefício é negado pelo INSS, existem algumas possibilidades de revisão da decisão:\n- Recurso administrativo junto ao próprio INSS, através de petição dirigida à Junta de Recursos.\n- Ajuizamento de ação na Justiça Federal.\n- Em alguns casos, pode ser viável apresentar um novo requerimento administrativo com documentação complementar.\n\nA estratégia mais adequada dependerá da análise do seu caso específico e dos fundamentos da negativa. Recomendo buscar orientação jurídica para avaliar a melhor opção."
  },
  {
    category: "Perguntas Frequentes",
    question: "Quem tem direito ao benefício do BPC/Loas?",
    answer: "O Benefício de Prestação Continuada (BPC/Loas) é destinado a idosos acima de 65 anos ou pessoas com deficiência de qualquer idade que tenham impedimentos de longo prazo (físicos, mentais, intelectuais ou sensoriais) que dificultem sua participação na sociedade. Ambos precisam comprovar baixa renda familiar, geralmente inferior a 1/4 do salário mínimo por pessoa. Em casos específicos, a Justiça pode flexibilizar esse critério após análise das particularidades."
  },
  {
    category: "Perguntas Frequentes",
    question: "Quais condições médicas podem dar direito a benefícios por incapacidade?",
    answer: "Diversas condições de saúde podem justificar a concessão de benefícios por incapacidade, como doenças graves, transtornos mentais severos, doenças neurológicas, cardiopatias graves, entre outras. O importante é haver documentação médica que comprove a condição e sua interferência na capacidade laboral. Cada caso é analisado individualmente pela perícia médica do INSS, que avalia se a incapacidade é temporária (auxílio por incapacidade temporária) ou permanente (aposentadoria por incapacidade permanente)."
  },
  {
    category: "Perguntas Frequentes",
    question: "Quais perícias são necessárias nos processos previdenciários?",
    answer: "Dependendo do benefício solicitado, podem ser necessárias diferentes tipos de perícias. Para benefícios por incapacidade, a perícia médica é imprescindível. Para o BPC/LOAS, além da perícia médica (em caso de pessoa com deficiência), é realizada uma avaliação social para verificar as condições socioeconômicas. Em processos específicos, podem ser necessárias perícias especializadas para comprovar condições de trabalho ou saúde particulares."
  },
  
  // Contato
  {
    category: "Contato",
    question: "Como entrar em contato com Joanyr Araujo?",
    answer: "Você pode entrar em contato com o Dr. Joanyr Araujo das seguintes formas:\n- Telefone/WhatsApp: (63) 98502-7508\n- E-mail: joanyraraujo@gmail.com\n- Formulário de contato em nosso site\n- Endereço físico em Palmas - TO",
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
    answer: "O telefone para contato é (63) 98502-7508."
  },
  {
    category: "Contato",
    question: "Qual o e-mail de contato?",
    answer: "O e-mail para contato é joanyraraujo@gmail.com."
  },
  {
    category: "Contato",
    question: "Qual o endereço do escritório?",
    answer: "O endereço é Palmas - TO, 77000-0000. (Endereço completo a ser fornecido)."
  },
  {
    category: "Contato",
    question: "Qual o horário de atendimento?",
    answer: "O horário de atendimento é:\n- Segunda a Sexta: 08:00 - 18:00\n- Sábado: 09:00 - 12:00\n- Domingo: Fechado"
  },
  
  // Ações/Botões
  {
    category: "Ações/Botões",
    question: "Como solicitar orientação?",
    answer: "Você pode solicitar orientação através do botão \"Solicitar Orientação\" no site ou entrando em contato diretamente pelos canais disponíveis: telefone (63) 98502-7508 ou e-mail joanyraraujo@gmail.com."
  },
  {
    category: "Ações/Botões",
    question: "Como saber mais sobre meus direitos?",
    answer: "Você pode saber mais sobre seus direitos clicando em \"Saiba Mais sobre seus Direitos\" ou agendando uma consulta com o Dr. Joanyr Araujo para uma análise personalizada da sua situação."
  }
];

// Helper function to find answers with improved NLP capabilities
export const findAnswer = (userQuery: string): {answer: string, options?: string[]} | null => {
  const normalizedQuery = userQuery.toLowerCase().trim();
  
  // Try direct question matching first
  const directMatch = knowledgeBase.find(
    qa => qa.question.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(qa.question.toLowerCase())
  );
  
  if (directMatch) {
    return {
      answer: directMatch.answer,
      options: directMatch.options
    };
  }
  
  // More comprehensive keyword matching for better NLP
  const keywords: Record<string, string[]> = {
    'aposentadoria': ['aposentar', 'aposentado', 'idade', 'tempo de contribuição', 'especial', 'tempo de serviço', 'contribui', 'contribuição'],
    'bpc': ['loas', 'benefício de prestação continuada', 'assistencial', 'idoso', 'deficiência', 'renda', 'baixa renda'],
    'pensão': ['morte', 'falecimento', 'dependente', 'viúva', 'viúvo', 'pensionista', 'falecido', 'óbito'],
    'incapacidade': ['doença', 'auxílio-doença', 'invalidez', 'incapaz', 'doente', 'perícia', 'médico', 'inválido', 'auxílio', 'atestado'],
    'revisão': ['revisar', 'cálculo incorreto', 'valor errado', 'erro no benefício', 'aumentar benefício', 'rever', 'atrasados'],
    'recursos': ['processo', 'judicial', 'administrativo', 'justiça', 'recurso', 'indeferimento', 'negado', 'ação', 'advogado'],
    'contato': ['telefone', 'e-mail', 'email', 'endereço', 'horário', 'atendimento', 'whatsapp', 'contatar', 'falar', 'escritório'],
    'diferenciais': ['diferença', 'vantagem', 'melhor', 'experiência', 'comunicação', 'atendimento', 'especial', 'diferencial'],
    'negado': ['negado', 'indeferido', 'recusado', 'cancelado', 'suspenso', 'cortado', 'cessado', 'rejeitado'],
    'quem': ['joanyr', 'dr', 'doutor', 'advogado', 'profissional', 'ele', 'especialista'],
    'fazer': ['como faço', 'como posso', 'procedimento', 'processo', 'dar entrada', 'solicitar', 'requerer', 'pedir']
  };
  
  // Score-based matching for more accurate responses
  let bestMatch: QuestionAnswer | null = null;
  let highestScore = 0;
  
  for (const qa of knowledgeBase) {
    let score = 0;
    
    // Check for category keyword matches
    const qaText = (qa.question + ' ' + qa.answer + ' ' + qa.category).toLowerCase();
    
    for (const [category, keywordList] of Object.entries(keywords)) {
      for (const keyword of keywordList) {
        if (normalizedQuery.includes(keyword)) {
          // Add points if keyword is in the query and question/answer contains related content
          if (qaText.includes(category) || qaText.includes(keyword)) {
            score += 10;
          }
        }
      }
    }
    
    // Check for direct word matches
    const queryWords = normalizedQuery.split(/\s+/);
    const qaWords = qaText.split(/\s+/);
    
    for (const word of queryWords) {
      if (word.length > 3 && qaWords.includes(word)) {
        score += 5;
      }
    }
    
    // Extra points for category match
    if (qa.category.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(qa.category.toLowerCase())) {
      score += 15;
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = qa;
    }
  }
  
  // Return the best match if score is significant
  if (bestMatch && highestScore > 15) {
    return {
      answer: bestMatch.answer,
      options: bestMatch.options
    };
  }
  
  // If still no good match, return null for default response
  return null;
};

// Function to get suggestions based on category
export const getSuggestions = (category?: string): string[] => {
  if (!category) {
    // Return a sample of questions from each category
    return [
      "Quem é Joanyr Araujo?",
      "Quais serviços são oferecidos?",
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
