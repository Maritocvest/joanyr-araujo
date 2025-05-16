
// API key is stored outside of this file for security reasons
import assistantKnowledge from '../data/assistantKnowledge.json';

interface OpenAIResponse {
  content: string;
  options?: string[];
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const getOpenAiAnswer = async (messages: Message[]): Promise<OpenAIResponse> => {
  try {
    // Use the API key from environment variable or secure storage
    const apiKey = 'PLACEHOLDER_FOR_API_KEY'; // This should be replaced with a secure method
    
    // Prepare the full conversation context with system message
    const fullMessages = [
      {
        role: 'system',
        content: assistantKnowledge.systemMessage
      },
      ...messages.filter(msg => msg.role !== 'system')
    ];
    
    // Make a request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      // Fallback to our local knowledge base if the API fails
      return getLocalAnswer(messages[messages.length - 1].content);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      options: extractOptionsFromResponse(data.choices[0].message.content)
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Fallback to our local knowledge base
    return getLocalAnswer(messages[messages.length - 1].content);
  }
};

// Function to extract options from the response text
function extractOptionsFromResponse(text: string): string[] | undefined {
  // Look for lists in the response
  const optionsMatch = text.match(/(?:[-*•]\s*([^\n]+)(?:\n|$))+/g);
  if (optionsMatch) {
    // Extract each list item
    const options = optionsMatch.flatMap(listGroup => {
      return listGroup.split('\n')
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*') || line.trim().startsWith('•'))
        .map(line => line.replace(/^[-*•]\s*/, '').trim());
    });
    
    if (options.length > 0) {
      return options;
    }
  }
  
  return undefined;
}

// Fallback function to get answers from our local knowledge base
function getLocalAnswer(query: string): OpenAIResponse {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Try direct question matching first
  const directMatch = assistantKnowledge.knowledgeBase.find(
    qa => qa.question.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(qa.question.toLowerCase())
  );
  
  if (directMatch) {
    return {
      content: directMatch.answer,
      options: directMatch.options
    };
  }
  
  // More comprehensive keyword matching
  const keywords: Record<string, string[]> = {
    'aposentadoria': ['aposentar', 'aposentado', 'idade', 'tempo de contribuição', 'especial', 'tempo de serviço', 'contribui'],
    'bpc': ['loas', 'benefício de prestação continuada', 'assistencial', 'idoso', 'deficiência', 'renda', 'baixa renda'],
    'pensão': ['morte', 'falecimento', 'dependente', 'viúva', 'viúvo', 'pensionista', 'falecido', 'óbito'],
    'incapacidade': ['doença', 'auxílio-doença', 'invalidez', 'incapaz', 'doente', 'perícia', 'médico', 'inválido', 'auxílio'],
    'revisão': ['revisar', 'cálculo incorreto', 'valor errado', 'erro no benefício', 'aumentar benefício', 'rever', 'atrasados'],
    'recursos': ['processo', 'judicial', 'administrativo', 'justiça', 'recurso', 'indeferimento', 'negado', 'ação', 'advogado'],
    'contato': ['telefone', 'e-mail', 'email', 'endereço', 'horário', 'atendimento', 'whatsapp', 'contatar', 'falar'],
    'diferenciais': ['diferença', 'vantagem', 'melhor', 'experiência', 'comunicação', 'atendimento', 'especial', 'diferencial']
  };
  
  // Score-based matching for more accurate responses
  let bestMatch = null;
  let highestScore = 0;
  
  for (const qa of assistantKnowledge.knowledgeBase) {
    let score = 0;
    const qaText = (qa.question + ' ' + qa.answer + ' ' + qa.category).toLowerCase();
    
    for (const [category, keywordList] of Object.entries(keywords)) {
      for (const keyword of keywordList) {
        if (normalizedQuery.includes(keyword)) {
          if (qaText.includes(category) || qaText.includes(keyword)) {
            score += 10;
          }
        }
      }
    }
    
    const queryWords = normalizedQuery.split(/\s+/);
    const qaWords = qaText.split(/\s+/);
    
    for (const word of queryWords) {
      if (word.length > 3 && qaWords.includes(word)) {
        score += 5;
      }
    }
    
    if (qa.category.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(qa.category.toLowerCase())) {
      score += 15;
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = qa;
    }
  }
  
  if (bestMatch && highestScore > 15) {
    return {
      content: bestMatch.answer,
      options: bestMatch.options
    };
  }
  
  // Default fallback responses
  const defaultResponses = [
    "Essa é uma questão interessante sobre direito previdenciário. Para uma orientação personalizada sobre seu caso específico, recomendo entrar em contato com o Dr. Joanyr Araujo pelo telefone (63) 98502-7508 ou através do formulário na seção de contato do site.",
    "Para responder adequadamente a essa questão, precisaríamos analisar seu caso específico. Por favor, entre em contato com o Dr. Joanyr Araujo através do telefone (63) 98502-7508 ou pelo e-mail joanyraraujo@gmail.com para um atendimento personalizado.",
    "Sobre esse assunto, seria melhor conversarmos pessoalmente para entender todos os detalhes do seu caso. Você pode agendar uma consulta com o Dr. Joanyr Araujo através do formulário de contato no site ou ligando para (63) 98502-7508."
  ];
  
  const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  const fallbackOptions = assistantKnowledge.knowledgeBase
    .filter(qa => qa.category === 'Serviços Oferecidos')
    .slice(0, 1)
    .flatMap(qa => qa.options || []);
  
  return {
    content: randomResponse,
    options: fallbackOptions.length > 0 ? fallbackOptions : undefined
  };
}

// Function to get suggestions based on category
export const getSuggestions = (category?: string): string[] => {
  if (!category) {
    // Return a sample of questions from different categories
    return [
      "Quem é Joanyr Araujo?",
      "Quais serviços são oferecidos?",
      "Quais são os diferenciais do serviço?",
      "O que fazer quando um benefício é negado?",
      "Como entrar em contato?"
    ];
  }
  
  // Return questions based on specific category
  const categoryQuestions = assistantKnowledge.knowledgeBase
    .filter(qa => qa.category === category)
    .map(qa => qa.question);
    
  return categoryQuestions.length > 0 ? categoryQuestions : getSuggestions();
};
