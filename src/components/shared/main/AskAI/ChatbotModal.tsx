'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { sendMessageToChatBot } from '@/services/chatBot';
import type { ChatbotModalProps, ChatbotResult } from '@/types/chatbot-types';
import { ChevronLeft, Maximize2, Mic } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoSparklesSharp } from 'react-icons/io5';

const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ChatbotResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // Search function with API integration
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || !userId) {
      setResults([]);
      setAiResponse('');
      return;
    }

    setIsSearching(true);
    setAiResponse('');

    try {
      // API call to chatbot using the service
      const data = await sendMessageToChatBot({
        message: searchQuery,
        userId: userId,
      });

      console.log('Chatbot response:', data);
      console.log('User ID:', userId);

      // Set the AI response text
      if (data.messages) {
        setAiResponse(data.messages);
      }

      // Set results if available
      if (data.results && Array.isArray(data.results)) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setAiResponse('Sorry, I encountered an error. Please try again.');
      setResults([]);
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
        className="max-w-[90vw] sm:max-w-md md:max-w-lg h-[90vh] p-0 gap-0 overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white flex-shrink-0">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Maximize"
          >
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 min-h-0">
          {/* User Query Display */}
          {query && (
            <div className="px-4 py-4 bg-gray-100">
              <p className="text-sm text-gray-700 font-medium">You asked:</p>
              <p className="text-sm text-gray-600 mt-1">{query}</p>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && (
            <div className="px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <IoSparklesSharp className="text-[#004DAC] text-base" />
                <span className="font-medium text-sm text-gray-700">
                  AI Response
                </span>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {aiResponse}
                </p>
              </div>
            </div>
          )}

          {/* AI Search Badge */}
          {results.length > 0 && (
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <IoSparklesSharp className="text-[#004DAC] text-base" />
                <span className="font-medium">Recommended Yachts</span>
              </div>
            </div>
          )}

          {/* Results Section */}
          {results.length > 0 && (
            <div className="px-4 pb-4">
              <div className="space-y-3">
                {results?.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {result.image && (
                        <Image
                          src={result.image}
                          alt={result.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Price: {result.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="px-4 py-8 text-center">
              <div className="inline-block w-6 h-6 border-2 border-[#004DAC] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-gray-600">Searching...</p>
            </div>
          )}

          {/* Empty State */}
          {!isSearching && !aiResponse && !results.length && !query && (
            <div className="px-4 py-8 text-center">
              <IoSparklesSharp className="text-[#004DAC] text-4xl mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                Ask me anything about yachts...
              </p>
            </div>
          )}

          {!isSearching && !aiResponse && results.length === 0 && query && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">
                No results found. Try a different query.
              </p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 border-t bg-white flex-shrink-0">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
            <input
              type="text"
              placeholder="Ask for information"
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
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotModal;
