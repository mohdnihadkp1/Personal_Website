import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, RotateCcw } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageStream, resetChat } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm Alex's AI Digital Twin. I'm here to chat about my work, code, or just vibe! 🚀"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const modelMsgId = (Date.now() + 1).toString();
    const modelMsg: ChatMessage = {
      id: modelMsgId,
      role: 'model',
      text: '',
      isStreaming: true
    };

    setMessages(prev => [...prev, modelMsg]);

    let accumulatedText = '';
    
    await sendMessageStream(userMsg.text, (chunk) => {
      accumulatedText += chunk;
      setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId 
          ? { ...msg, text: accumulatedText }
          : msg
      ));
    });

    setMessages(prev => prev.map(msg => 
        msg.id === modelMsgId 
          ? { ...msg, isStreaming: false }
          : msg
      ));
    setIsTyping(false);
  };

  const handleReset = () => {
    resetChat();
    setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: "Hi! I'm Alex's AI Digital Twin. I'm here to chat about my work, code, or just vibe! 🚀"
        }
      ]);
    setShowResetConfirm(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex w-[90vw] flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-surface/95 shadow-2xl backdrop-blur-xl sm:w-[380px] h-[500px] transition-colors duration-300">
          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 p-4 transition-colors">
            
            {showResetConfirm ? (
                <div className="absolute inset-0 z-10 flex items-center justify-between bg-gray-100 dark:bg-[#1a1a1a] px-4 animate-in fade-in">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Reset conversation?</span>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleReset}
                            className="rounded-lg bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-500/20 dark:text-red-400 transition-colors"
                        >
                            Yes
                        </button>
                        <button 
                            onClick={() => setShowResetConfirm(false)}
                            className="rounded-lg bg-gray-500/10 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-500/20 dark:text-gray-400 transition-colors"
                        >
                            No
                        </button>
                    </div>
                </div>
            ) : null}

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white transition-colors">AI Digital Twin</h3>
                <span className="flex items-center gap-1 text-[10px] text-green-500 dark:text-green-400">
                  <span className="block h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <div className="flex gap-1">
                <button 
                    onClick={() => setShowResetConfirm(true)}
                    className="rounded-full p-1 text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors"
                    title="Reset Chat"
                >
                    <RotateCcw size={18} />
                </button>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1 text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-transparent transition-colors">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/5 dark:border-white/10 ${
                  msg.role === 'user' ? 'bg-gray-800' : 'bg-primary/20'
                }`}>
                  {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-primary" />}
                </div>
                <div 
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm transition-colors ${
                    msg.role === 'user' 
                      ? 'bg-white text-gray-900' 
                      : 'bg-gray-200 dark:bg-white/5 text-gray-900 dark:text-gray-100 dark:border dark:border-white/5'
                  }`}
                >
                  {msg.text}
                  {msg.isStreaming && (
                     <div className="inline-flex space-x-1 h-4 items-center ml-2 align-middle">
                        <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-black/20 p-4 transition-colors">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my experience..."
                className="w-full rounded-full border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 py-3 pl-4 pr-12 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                disabled={isTyping}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-2 text-center">
                 <p className="text-[10px] text-gray-500">Powered by Google Gemini</p>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-100"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
        </span>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default AIChat;