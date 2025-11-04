"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoSparklesSharp } from "react-icons/io5";
import { ChevronLeft, Maximize2, Mic } from "lucide-react";
import Image from "next/image";
import type { ChatbotResult, ChatbotModalProps } from "@/types/chatbot-types";

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ChatbotResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search function with API integration
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // API call to chatbot search endpoint
      const response = await fetch('/api/chatbot/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      // Show error state to user
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[90vw] sm:max-w-md md:max-w-lg h-[90vh] sm:h-auto max-h-[90vh] p-0 gap-0 overflow-hidden"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-10">
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
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {/* User Query Display */}
          <div className="px-4 py-4 bg-gray-100">
            <p className="text-sm text-gray-700">
              {query || "Ask me anything about yachts..."}
            </p>
          </div>

          {/* AI Search Badge */}
          {results.length > 0 && (
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <IoSparklesSharp className="text-[#004DAC] text-base" />
                <span className="font-medium">AI-Search</span>
              </div>
            </div>
          )}

          {/* Results Section */}
          {results.length > 0 && (
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-700 mb-4">
                Here are some results of available, along with their model, year,
                and approximate price:
              </p>

              <div className="space-y-3">
                {results.map((result) => (
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
                            target.src = "/placeholder.svg";
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600">Price: {result.price}</p>
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
          {!isSearching && results.length === 0 && query && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No results found. Try a different query.</p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 border-t bg-white sticky bottom-0">
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
