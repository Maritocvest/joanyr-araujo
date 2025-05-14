
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { findAnswer, getSuggestions } from '@/utils/assistantKnowledgeBase';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  options?: string[];
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Olá! Sou o assistente virtual do Dr. Joanyr Araujo. Como posso orientá-lo sobre direito previdenciário hoje?',
          options: getSuggestions()
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
    setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
    setIsLoading(true);
    setShowSuggestions(false);
    
    // Process response
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 800);
    
    setInputMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setMessages(prev => [...prev, { role: 'user', content: suggestion }]);
    setIsLoading(true);
    setShowSuggestions(false);
    
    setTimeout(() => {
      const response = generateResponse(suggestion);
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 800);
  };

  const handleOptionClick = (option: string) => {
    setMessages(prev => [...prev, { role: 'user', content: option }]);
    setIsLoading(true);
    
    setTimeout(() => {
      const response = generateResponse(option);
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 800);
  };

  // Response generation using our knowledge base
  const generateResponse = (query: string): Message => {
    const result = findAnswer(query);
    
    if (result) {
      return {
        role: 'assistant',
        content: result.answer,
        options: result.options
      };
    }
    
    // Default response if no match found
    const defaultResponses = [
      "Essa é uma questão interessante sobre direito previdenciário. Para uma orientação personalizada sobre seu caso específico, recomendo entrar em contato conosco pelo formulário na seção de contato ou pelo telefone (63) 98502-7508.",
      "Para responder adequadamente a essa questão, precisaríamos analisar seu caso específico. Por favor, entre em contato através do formulário no site ou pelo telefone (63) 98502-7508.",
      "Sobre esse assunto, seria melhor conversarmos pessoalmente para entender todos os detalhes. Você pode agendar uma consulta através do formulário de contato ou ligando para (63) 98502-7508."
    ];
    
    return {
      role: 'assistant',
      content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      options: getSuggestions()
    };
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
            
            <div className="p-4 h-[400px] overflow-y-auto bg-gray-50">
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <div 
                    className={`flex ${
                      message.role === 'user' 
                        ? 'justify-end' 
                        : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarImage src="/lovable-uploads/6f99b0f3-a90a-4cdc-8129-0a0e5309dfff.png" alt="Assistente virtual" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div 
                      className={`p-3 rounded-lg max-w-[85%] ${
                        message.role === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                  
                  {message.options && message.role === 'assistant' && (
                    <div className="ml-10 mt-2 flex flex-wrap gap-2">
                      {message.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleOptionClick(option)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full transition-colors duration-200"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/lovable-uploads/6f99b0f3-a90a-4cdc-8129-0a0e5309dfff.png" alt="Assistente virtual" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {showSuggestions && messages.length === 1 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {getSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
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
