'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { chatHistory, sendMessageToChatBot } from '@/services/chatBot';
import type { ChatbotModalProps } from '@/types/chatbot-types';
import { Send, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { IoSparklesSharp } from 'react-icons/io5';
import AnimatedLoadingMessages from './AnimatedLoadingMessages';
import { renderMessage } from './RenderMessage';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;

    console.log('User ID in ChatbotModal:', userId);

    const fetchChatHistory = async () => {
      try {
        const chatHistoryData = await chatHistory(userId);
        console.log('Chat History:', chatHistoryData);
        if (Array.isArray(chatHistoryData)) {
          setChatMessages(chatHistoryData);
        }
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchChatHistory();
  }, [userId]);

  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isSearching]);

  

  
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);

    try {
      
      const data = await sendMessageToChatBot({
        message: searchQuery,
        userId: userId || null,
      });

      console.log('Chatbot response:', data);
      console.log('User ID:', userId);

      
      if (userId) {
        try {
          const chatHistoryData = await chatHistory(userId);
          console.log('Updated Chat History:', chatHistoryData);
          if (Array.isArray(chatHistoryData)) {
            setChatMessages(chatHistoryData);
          }
        } catch (historyError) {
          console.error('Failed to fetch updated chat history:', historyError);
        }
      }

      
      setQuery('');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[80vw] sm:max-w-md md:max-w-2xl lg:h-[70vh] h-[50vh] p-0 gap-0 overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          Florida Yacht Trader AI Assistant
        </DialogTitle>
        <DialogDescription className="sr-only">
          Chat with our AI assistant to help you find the perfect yacht
        </DialogDescription>
        
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <IoSparklesSharp className="text-[#004DAC] text-xl" />
            <h2 className="text-lg font-semibold text-gray-900">
              Florida Yacht AI
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto bg-gray-50 min-h-0">
          
          {chatMessages.length > 0 && (
            <div className="px-4 py-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div key={index} className="space-y-2">
                  {message.role === 'user' ? (
                    
                    <div className="flex justify-end">
                      <div className="bg-[#004DAC] text-white rounded-lg px-4 py-3 max-w-[80%]">
                        <p className="text-sm font-medium mb-1">You:</p>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-4 border border-gray-200 max-w-[90%]">
                        <div className="flex items-center gap-2 mb-2">
                          <IoSparklesSharp className="text-[#004DAC] text-base" />
                          <span className="font-medium text-sm text-gray-700">
                            Florida Yacht AI:
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">
                          {renderMessage(message.content)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          
          {isSearching && <AnimatedLoadingMessages />}

          
          {!isSearching && chatMessages.length === 0 && (
            <div className="px-4 py-8 text-center">
              <IoSparklesSharp className="text-[#004DAC] text-4xl mx-auto mb-3" />
              <p className="text-sm lg:text-lg font-medium text-gray-900 mb-2">
                Welcome to Florida Yacht Trader AI
              </p>
              <p className="text-sm text-gray-500">
                Ask me anything about yachts, boats, or marine listings...
              </p>
            </div>
          )}

          
          <div ref={chatEndRef} />
        </div>

        
        <div className="px-4 py-3 border-t bg-white flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
            <input
              type="text"
              placeholder="Ask about yachts, prices, features..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-500"
            />
            <button
              onClick={() => handleSearch(query)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <IoSparklesSharp className="text-[#004DAC] text-lg" />
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
              onClick={() => handleSearch(query)}
              aria-label="Send"
            >
              <Send className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotModal;
