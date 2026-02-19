import { NextRequest, NextResponse } from 'next/server';
import type {
  ChatbotSearchRequest,
  ChatbotSearchResponse,
} from '@/types/chatbot-types';

export async function POST(request: NextRequest) {
  try {
    const body: ChatbotSearchRequest = await request.json();
    const { query } = body;

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const mockResults: ChatbotSearchResponse = {
      results: [
        {
          id: '1',
          title: 'Viking 48 Double Eagle 2006',
          price: '$799,000',
          image: '/assets/yacht-images/viking-48.jpg',
          details: {
            year: 2006,
            model: '48 Double Eagle',
            manufacturer: 'Viking',
            length: '48 ft',
            location: 'Florida',
          },
        },
        {
          id: '2',
          title: 'Viking 45 Convertible 2006',
          price: '$575,000',
          image: '/assets/yacht-images/viking-45.jpg',
          details: {
            year: 2006,
            model: '45 Convertible',
            manufacturer: 'Viking',
            length: '45 ft',
            location: 'Florida',
          },
        },
        {
          id: '3',
          title: 'Viking 52 Game On 2005',
          price: '$869,000',
          image: '/assets/yacht-images/viking-52.jpg',
          details: {
            year: 2005,
            model: '52 Game On',
            manufacturer: 'Viking',
            length: '52 ft',
            location: 'Miami, FL',
          },
        },
      ],
      totalCount: 3,
      aiSummary: `Found ${3} Viking yachts from 2005-2008 matching your criteria. These convertibles range from 45-52 feet and are priced between $575,000 and $869,000.`,
      suggestedQueries: [
        'Show me yachts under $700,000',
        'What about newer models?',
        'Compare these models',
      ],
    };

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(mockResults);
  } catch (error) {
    console.error('Chatbot search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Chatbot search API is running',
    version: '1.0.0',
  });
}
