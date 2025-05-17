
import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getOpenAiAnswer, getSuggestions } from '@/services/openAiService';
import { useToast } from '@/hooks/use-toast';
import assistantKnowledge from '@/data/assistantKnowledge.json';
import emailjs from 'emailjs-com';
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  options?: string[];
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  lgpdConsent: boolean;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      lgpdConsent: false
    }
  });

  // Disclaimer message
  const disclaimerMessage: Message = {
    role: 'system',
    content: assistantKnowledge.disclaimerMessage
  };

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("vo8bO2b27gn2pgDsP");
  }, []);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: assistantKnowledge.greetingMessage,
          options: getSuggestions()
        },
        disclaimerMessage
      ]);
    }
  }, []);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showContactForm]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowSuggestions(false);
    setInputMessage('');
    
    // Check if the message is about contact or form
    const contactKeywords = ['contato', 'formulário', 'formulario', 'enviar mensagem', 'entrar em contato', 'falar com advogado', 'consulta', 'agendar'];
    const shouldShowContactForm = contactKeywords.some(keyword => inputMessage.toLowerCase().includes(keyword));
    
    if (shouldShowContactForm) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Para entrarmos em contato, preciso de algumas informações. Por favor, preencha o formulário abaixo:' 
        }]);
        setShowContactForm(true);
        setIsLoading(false);
      }, 1000);
      return;
    }
    
    // Get all the messages except system messages for context
    const conversationHistory = messages.filter(msg => msg.role !== 'system');
    
    try {
      // Process response using OpenAI
      const response = await getOpenAiAnswer([...conversationHistory, userMessage]);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.content, 
        options: response.options 
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Erro na comunicação",
        description: "Não foi possível obter uma resposta do assistente. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setInputMessage('');
    
    // Add user message
    const userMessage = { role: 'user' as const, content: suggestion };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowSuggestions(false);
    
    // Get all the messages except system messages for context
    const conversationHistory = messages.filter(msg => msg.role !== 'system');
    
    try {
      // Process response using OpenAI
      const response = await getOpenAiAnswer([...conversationHistory, userMessage]);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.content, 
        options: response.options 
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Erro na comunicação",
        description: "Não foi possível obter uma resposta do assistente. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = async (option: string) => {
    // Add user message
    const userMessage = { role: 'user' as const, content: option };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Get all the messages except system messages for context
    const conversationHistory = messages.filter(msg => msg.role !== 'system');
    
    try {
      // Process response using OpenAI
      const response = await getOpenAiAnswer([...conversationHistory, userMessage]);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.content, 
        options: response.options 
      }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Erro na comunicação",
        description: "Não foi possível obter uma resposta do assistente. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle feedback
  const handleFeedback = (isPositive: boolean) => {
    toast({
      title: "Obrigado pelo feedback!",
      description: isPositive ? 
        "Ficamos felizes que a informação foi útil." : 
        "Vamos utilizar seu feedback para melhorar nosso assistente.",
      duration: 3000
    });
  };

  // Handle contact form submission
  const onSubmitContactForm = async (data: ContactFormData) => {
    setIsLoading(true);
    
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone,
        message: data.message,
        to_name: "Joanyr Araújo",
        reply_to: data.email,
        lgpd_consent: data.lgpdConsent ? "Sim" : "Não"
      };
      
      await emailjs.send(
        'service_tsmlkwr',
        'template_z5lm1l7',
        templateParams,
        'vo8bO2b27gn2pgDsP'
      );
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Obrigado, ${data.name}! Suas informações foram enviadas com sucesso. Entraremos em contato em breve através do e-mail ${data.email} ou telefone ${data.phone}.`,
      }]);
      
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      setShowContactForm(false);
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Desculpe, tivemos um problema ao enviar suas informações. Por favor, tente novamente mais tarde ou entre em contato diretamente pelo telefone (63) 98502-7508.",
      }]);
      
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelContactForm = () => {
    setShowContactForm(false);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: "Tudo bem! Se preferir, você pode entrar em contato diretamente pelo telefone (63) 98502-7508 ou pelo e-mail joanyraraujo@gmail.com. Posso ajudar com algo mais?",
    }]);
    form.reset();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 p-0 overflow-hidden"
            aria-label={isOpen ? "Fechar assistente virtual" : "Abrir assistente virtual"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Avatar className="h-full w-full">
                  <AvatarImage 
                    src="/lovable-uploads/83ddc91a-0121-4408-bfef-623f4b61473f.png" 
                    alt="Dr. Joanyr Araujo" 
                    className="object-cover"
                  />
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
              </div>
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Card className="w-[350px] sm:w-[400px] mt-4 overflow-hidden shadow-xl border-primary/20">
            <div className="bg-primary text-white p-4 flex items-center space-x-3">
              <Avatar className="h-10 w-10 border-2 border-secondary">
                <AvatarImage src="/lovable-uploads/83ddc91a-0121-4408-bfef-623f4b61473f.png" alt="Dr. Joanyr Araujo" />
                <AvatarFallback>JA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">Assistente Virtual</h3>
                <p className="text-xs text-white/80">Dr. Joanyr Araujo</p>
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
                  {message.role !== 'system' ? (
                    <div 
                      className={`flex ${
                        message.role === 'user' 
                          ? 'justify-end' 
                          : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                          <AvatarImage src="/lovable-uploads/83ddc91a-0121-4408-bfef-623f4b61473f.png" alt="Dr. Joanyr Araujo" />
                          <AvatarFallback>JA</AvatarFallback>
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

                        {message.role === 'assistant' && (
                          <div className="mt-2 flex items-center justify-end space-x-2 text-xs text-gray-400">
                            <button 
                              onClick={() => handleFeedback(true)}
                              className="hover:text-primary transition-colors"
                              aria-label="Resposta útil"
                            >
                              👍
                            </button>
                            <button 
                              onClick={() => handleFeedback(false)}
                              className="hover:text-primary transition-colors"
                              aria-label="Resposta não útil"
                            >
                              👎
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // System message (disclaimer)
                    <div className="my-3 px-3 py-2 bg-blue-50 border-l-4 border-blue-300 text-xs text-gray-600">
                      {message.content}
                    </div>
                  )}
                  
                  {message.options && message.role === 'assistant' && (
                    <div className="ml-10 mt-2 flex flex-wrap gap-2">
                      {message.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleOptionClick(option)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full transition-colors duration-200"
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
                    <AvatarImage src="/lovable-uploads/83ddc91a-0121-4408-bfef-623f4b61473f.png" alt="Dr. Joanyr Araujo" />
                    <AvatarFallback>JA</AvatarFallback>
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

              {/* Contact Form */}
              {showContactForm && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  <h4 className="font-semibold text-primary mb-3">Formulário de Contato</h4>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitContactForm)} className="space-y-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu@email.com" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone/WhatsApp</FormLabel>
                            <FormControl>
                              <Input placeholder="(00) 00000-0000" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensagem</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Descreva brevemente sua situação" 
                                className="min-h-[80px] resize-none"
                                {...field}
                                required 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lgpdConsent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                required 
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-xs">
                                Li e concordo com a <a href="/privacidade" className="text-secondary hover:underline" target="_blank">Política de Privacidade</a> e autorizo o uso dos meus dados para contato.
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2 pt-2">
                        <Button 
                          type="submit" 
                          className="flex-1"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Enviando...' : 'Enviar'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={cancelContactForm}
                          disabled={isLoading}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              {showSuggestions && messages.length <= 2 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {getSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full transition-colors duration-200"
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
                  className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary resize-none text-gray-800 min-h-[40px]"
                  placeholder="Digite sua dúvida aqui..."
                  rows={1}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={showContactForm}
                />
                <Button 
                  className="rounded-l-none h-full" 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || showContactForm}
                  aria-label="Enviar mensagem"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Dr. Joanyr Araujo | Tel: (63) 98502-7508 | Seg-Sex: 08h-18h
              </p>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AIAssistant;
