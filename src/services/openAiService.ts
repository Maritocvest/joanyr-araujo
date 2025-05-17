// API key is stored outside of this file for security reasons
import assistantKnowledge from '../data/assistantKnowledge.json';
import { getEnvVariable } from '../utils/envUtils';

interface OpenAIResponse {
  content: string;
  options?: string[];
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Session storage to maintain context between messages
let sessionData = {
  userName: '',
  topic: '',
  history: [] as Message[]
};

export const getOpenAiAnswer = async (messages: Message[]): Promise<OpenAIResponse> => {
  try {
    // Get the API key from the env utils
    const apiKey = process.env.OPENAI_API_KEY || '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';
    
    // Store messages in session
    updateSessionData(messages);
    
    // Check for keywords that require special handling
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    let systemPrompt = assistantKnowledge.systemMessage;
    
    // Check if the message contains "negado" or "indeferido" keywords
    if (lastUserMessage && (
        lastUserMessage.content.toLowerCase().includes('negado') || 
        lastUserMessage.content.toLowerCase().includes('indeferido')
    )) {
      // Add special instruction for denied benefits
      systemPrompt += "\n\nA/D: o cliente está com benefício negado. Adotar tom de empatia, sugerir próxima etapa (recurso administrativo) e disponibilizar botão 'Como recorrer'.";
    }
    
    // Prepare the full conversation context with personalized system message
    const fullMessages = [
      {
        role: 'system' as const,
        content: `Você é o Dr. Joanyr Araujo, assistente virtual simpático e empático do Dr. Joanyr Araujo, especialista em direito previdenciário. 
        Utilize tom acolhedor, inclua cumprimentos personalizados, respostas claras e, quando adequado, emojis leves.
        ${sessionData.userName ? `O nome do usuário é ${sessionData.userName}.` : ''}
        ${sessionData.topic ? `O usuário está interessado em ${sessionData.topic}.` : ''}
        ${systemPrompt}`
      },
      ...messages.filter(msg => msg.role !== 'system')
    ];
    
    // Make a request to OpenAI API with the new parameters
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: fullMessages,
        temperature: 0.8,
        max_tokens: 512,
        top_p: 0.9
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

// Update session data based on messages
function updateSessionData(messages: Message[]): void {
  // Store messages in history
  sessionData.history = [...messages];
  
  // Try to extract user name from messages
  if (!sessionData.userName) {
    const namePattern = /(?:me\s+chamo|meu\s+nome\s+[eé]\s+|sou\s+(?:o|a)\s+)([A-Z][a-záàâãéèêíïóôõöúçñ]+)/i;
    
    for (const msg of messages) {
      if (msg.role === 'user') {
        const match = msg.content.match(namePattern);
        if (match && match[1]) {
          sessionData.userName = match[1];
          break;
        }
      }
    }
  }
  
  // Try to detect topic of interest
  if (!sessionData.topic) {
    const topics = {
      'aposentadoria': ['aposentadoria', 'aposentar', 'tempo de contribuição', 'idade'],
      'auxílio-doença': ['auxílio', 'doença', 'incapacidade', 'afastamento'],
      'pensão': ['pensão', 'morte', 'falecimento'],
      'recurso': ['recurso', 'negado', 'indeferido', 'recorrer'],
      'BPC/LOAS': ['bpc', 'loas', 'assistencial', 'idoso', 'deficiente']
    };
    
    const lastUserMsg = messages.filter(msg => msg.role === 'user').pop();
    
    if (lastUserMsg) {
      const content = lastUserMsg.content.toLowerCase();
      
      for (const [topic, keywords] of Object.entries(topics)) {
        if (keywords.some(keyword => content.includes(keyword))) {
          sessionData.topic = topic;
          break;
        }
      }
    }
  }
}

// Function to get session data
export const getSessionData = () => {
  return { ...sessionData };
};

// Function to reset session data
export const resetSessionData = () => {
  sessionData = {
    userName: '',
    topic: '',
    history: []
  };
};

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

// Default quick reply options
export const getDefaultQuickReplies = (): string[] => {
  return [
    "Quero saber sobre benefícios",
    "Como recorrer de um indeferimento",
    "Falar com um atendente",
    "Preencher as informações do Formulário de Contato"
  ];
};

// Special quick replies for denied benefits
export const getDeniedBenefitQuickReplies = (): string[] => {
  return [
    "Como recorrer de um indeferimento",
    "Falar com um atendente",
    "Preencher as informações do Formulário de Contato"
  ];
};
