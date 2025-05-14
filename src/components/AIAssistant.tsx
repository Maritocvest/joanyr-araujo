
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Olá! Sou o assistente virtual do Dr. Joanyr Araujo. Como posso orientá-lo sobre direito previdenciário hoje?'
        }
      ]);
    }
  }, []);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: 'user', content: inputMessage }]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
    
    setInputMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple response generation based on keywords
  const generateResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('aposentadoria') || lowercaseQuery.includes('aposentar')) {
      return 'Para aposentadoria, é necessário analisar seu tempo de contribuição, idade e outras variáveis. A reforma da previdência trouxe mudanças significativas nas regras. Para uma análise personalizada, entre em contato conosco.';
    } 
    else if (lowercaseQuery.includes('bpc') || lowercaseQuery.includes('loas')) {
      return 'O BPC/LOAS é destinado a idosos acima de 65 anos ou pessoas com deficiência de baixa renda. É necessário comprovar que a renda familiar per capita é inferior a 1/4 do salário mínimo. Podemos auxiliar na análise do seu caso.';
    }
    else if (lowercaseQuery.includes('pensão') || lowercaseQuery.includes('morte')) {
      return 'A pensão por morte é um benefício pago aos dependentes do segurado que faleceu. É importante verificar os requisitos e prazos, pois houve mudanças recentes na legislação. Podemos orientá-lo sobre os documentos necessários.';
    }
    else if (lowercaseQuery.includes('auxílio-doença') || lowercaseQuery.includes('auxílio por incapacidade')) {
      return 'O auxílio por incapacidade temporária (antigo auxílio-doença) é concedido ao segurado que comprove estar temporariamente incapaz para o trabalho devido a doença ou acidente. É necessária perícia médica do INSS.';
    }
    else if (lowercaseQuery.includes('perícia') || lowercaseQuery.includes('perito')) {
      return 'A perícia médica é fundamental para benefícios por incapacidade. Recomendamos levar todos os documentos médicos que comprovem sua condição (laudos, exames, receitas). Podemos orientá-lo sobre como se preparar adequadamente.';
    }
    else if (lowercaseQuery.includes('contato') || lowercaseQuery.includes('falar')) {
      return 'Você pode entrar em contato conosco através do formulário na seção de contato, pelo telefone ou e-mail disponível no rodapé do site. Estamos à disposição para esclarecer suas dúvidas.';
    }
    else if (lowercaseQuery.includes('inss') || lowercaseQuery.includes('benefício negado')) {
      return 'Se seu benefício foi negado pelo INSS, existem prazos para recurso administrativo ou judicial. É importante agir rapidamente. Podemos analisar seu caso e verificar a melhor estratégia.';
    }
    else if (lowercaseQuery.includes('prazo') || lowercaseQuery.includes('tempo')) {
      return 'Os prazos no direito previdenciário variam conforme o benefício e a situação. Para recursos contra decisões do INSS, geralmente há um prazo de 30 dias. Para orientações específicas sobre seu caso, entre em contato conosco.';
    }
    else {
      return 'Essa é uma questão interessante sobre direito previdenciário. Para uma orientação personalizada sobre seu caso específico, recomendo entrar em contato conosco pelo formulário na seção de contato. Ficaremos felizes em ajudar.';
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
            aria-label={isOpen ? "Fechar assistente virtual" : "Abrir assistente virtual"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageSquare className="h-6 w-6" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Card className="w-[350px] sm:w-[400px] mt-4 overflow-hidden shadow-xl border-primary/20">
            <div className="bg-primary text-white p-4 flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-secondary">
                <AvatarImage src="/lovable-uploads/6f99b0f3-a90a-4cdc-8129-0a0e5309dfff.png" alt="Assistente virtual" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">Assistente Virtual</h3>
                <p className="text-xs text-white/80">Direito Previdenciário</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-auto text-white hover:text-white/80 hover:bg-primary/80"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4 h-[350px] overflow-y-auto bg-gray-50">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${
                    message.role === 'user' 
                      ? 'flex justify-end' 
                      : 'flex justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarImage src="/lovable-uploads/6f99b0f3-a90a-4cdc-8129-0a0e5309dfff.png" alt="Assistente virtual" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={`p-3 rounded-lg max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/lovable-uploads/6f99b0f3-a90a-4cdc-8129-0a0e5309dfff.png" alt="Assistente virtual" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <p className="text-sm text-gray-500">Digitando...</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center">
                <textarea 
                  className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary resize-none text-gray-800"
                  placeholder="Digite sua dúvida aqui..."
                  rows={1}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button 
                  className="rounded-l-none" 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Enviar mensagem"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AIAssistant;
