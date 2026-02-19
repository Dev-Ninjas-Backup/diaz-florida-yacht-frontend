export interface ChatbotResult {
  id: string;

  title: string;

  price: string;

  image: string;

  details?: {
    year?: number;
    model?: string;
    manufacturer?: string;
    length?: string;
    location?: string;
  };
}

export interface ChatbotModalProps {
  isOpen: boolean;

  onClose: () => void;

  userId?: string;
}

export interface ChatbotSearchRequest {
  query: string;

  limit?: number;

  filters?: {
    minPrice?: number;
    maxPrice?: number;
    yearRange?: [number, number];
    manufacturer?: string;
    location?: string;
  };
}

export interface ChatbotSearchResponse {
  results: ChatbotResult[];

  totalCount?: number;

  aiSummary?: string;

  suggestedQueries?: string[];
}

export interface ChatMessage {
  id: string;

  role: 'user' | 'assistant';

  content: string;

  timestamp: Date;

  results?: ChatbotResult[];
}

export interface ChatbotState {
  query: string;

  results: ChatbotResult[];

  isSearching: boolean;

  error?: string;

  messages?: ChatMessage[];
}
