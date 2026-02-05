'use client';

import { useEffect, useRef, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  number: number;
}

interface HtmlContentWithTocProps {
  htmlContent: string;
  title?: string;
  className?: string;
}

const HtmlContentWithToc = ({
  htmlContent,
  title,
  className = '',
}: HtmlContentWithTocProps) => {
  const [processedHtml, setProcessedHtml] = useState<string | null>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!htmlContent) return;

    const { processed, toc } = processHtmlContent(htmlContent, title);
    setProcessedHtml(processed);
    setTocItems(toc);
  }, [htmlContent, title]);

  
  const decodeHtmlEntities = (text: string): string => {
    
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = text;
      let decoded = div.textContent || div.innerText || text;
      
      decoded = decoded.replace(/&nbsp;/g, ' ');
      
      decoded = decoded.replace(/\s+/g, ' ');
      return decoded.trim();
    }
    
    return text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  };

  
  const processHtmlContent = (html: string, pageTitle?: string) => {
    const toc: TocItem[] = [];
    let sectionCounter = 0;
    let processedHtml = html;

    
    if (pageTitle) {
      processedHtml = `<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">${pageTitle}</h1>${processedHtml}`;
    }

    
    const h1Regex = /<h1[^>]*>(.*?)<\/h1>/gi;
    const h1Matches = Array.from(processedHtml.matchAll(h1Regex));

    h1Matches.forEach((match) => {
      const content = match[1];
      let textContent = content.replace(/<[^>]*>/g, '');
      textContent = decodeHtmlEntities(textContent);
      const fullMatch = match[0];

      
      if (
        textContent.toLowerCase().includes('effective date') ||
        textContent.toLowerCase().includes('last updated')
      ) {
        const replacement = `<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${content}</h1>`;
        processedHtml = processedHtml.replace(fullMatch, replacement);
        return;
      }

      
      if (pageTitle && textContent === pageTitle) {
        return;
      }

      
      sectionCounter++;
      const id = `section-${sectionCounter}`;

      toc.push({
        id,
        text: textContent,
        number: sectionCounter,
      });

      const replacement = `<h2 id="${id}" class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8 scroll-mt-20">${sectionCounter}. ${content}</h2>`;
      processedHtml = processedHtml.replace(fullMatch, replacement);
    });

    
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi;
    const h2Matches = Array.from(processedHtml.matchAll(h2Regex));

    h2Matches.forEach((match) => {
      const content = match[1];
      let textContent = content.replace(/<[^>]*>/g, '');
      textContent = decodeHtmlEntities(textContent);
      const fullMatch = match[0];

      
      if (fullMatch.includes('id=')) {
        return;
      }

      
      sectionCounter++;
      const id = `section-${sectionCounter}`;

      toc.push({
        id,
        text: textContent,
        number: sectionCounter,
      });

      const replacement = `<h2 id="${id}" class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8 scroll-mt-20">${sectionCounter}. ${content}</h2>`;
      processedHtml = processedHtml.replace(fullMatch, replacement);
    });

    
    processedHtml = processedHtml
      
      .replace(
        /<p(?![^>]*class)/g,
        '<p class="text-gray-700 text-base md:text-lg leading-relaxed mb-4"',
      )
      
      .replace(
        /<h3(?![^>]*class)/g,
        '<h3 class="text-xl font-semibold text-gray-800 mb-3 mt-6"',
      )
      .replace(
        /<h4(?![^>]*class)/g,
        '<h4 class="text-lg font-semibold text-gray-800 mb-2 mt-4"',
      )
      .replace(
        /<h5(?![^>]*class)/g,
        '<h5 class="text-base font-semibold text-gray-800 mb-2 mt-4"',
      )
      .replace(
        /<h6(?![^>]*class)/g,
        '<h6 class="text-sm font-semibold text-gray-800 mb-2 mt-4"',
      )
      
      .replace(
        /<ul(?![^>]*class)/g,
        '<ul class="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4"',
      )
      .replace(
        /<ol(?![^>]*class)/g,
        '<ol class="list-decimal list-inside space-y-2 text-gray-700 mb-4 ml-4"',
      )
      .replace(/<li(?![^>]*class)/g, '<li class="mb-1"')
      
      .replace(
        /<a(?![^>]*class)/g,
        '<a class="text-primary hover:text-[#0052CC] underline"',
      )
      
      .replace(
        /<strong(?![^>]*class)/g,
        '<strong class="font-bold text-gray-900"',
      )
      .replace(/<b(?![^>]*class)/g, '<b class="font-bold text-gray-900"')
      
      .replace(/<em(?![^>]*class)/g, '<em class="italic"')
      .replace(/<i(?![^>]*class)/g, '<i class="italic"')
      
      .replace(
        /<blockquote(?![^>]*class)/g,
        '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4"',
      )
      
      .replace(
        /<code(?![^>]*class)/g,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm"',
      )
      .replace(
        /<pre(?![^>]*class)/g,
        '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"',
      )
      
      .replace(/<img(?![^>]*class)/g, '<img class="rounded-lg w-full mb-4"')
      
      .replace(
        /<table(?![^>]*class)/g,
        '<table class="w-full border-collapse border border-gray-300 mb-4"',
      )
      .replace(
        /<th(?![^>]*class)/g,
        '<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-bold"',
      )
      .replace(
        /<td(?![^>]*class)/g,
        '<td class="border border-gray-300 px-4 py-2"',
      )
      
      .replace(/<div(?![^>]*class)/g, '<div class="mb-4"');

    return {
      processed: processedHtml,
      toc,
    };
  };

  
  useEffect(() => {
    if (!processedHtml || tocItems.length === 0) return;

    const handleScroll = () => {
      const sections = tocItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [processedHtml, tocItems]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!processedHtml) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 py-10 md:py-16 ${className}`}
    >
      
      <div className="lg:col-span-3 space-y-6">
        <div
          ref={contentRef}
          className="space-y-6 wrap-break-word overflow-wrap-anywhere"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </div>

      
      {tocItems.length > 0 && (
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Table of Contents
            </h3>
            <nav className="space-y-2">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-2 py-2 transition-colors text-sm ${
                    activeSection === item.id
                      ? 'font-bold text-gray-900'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.number}. {item.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default HtmlContentWithToc;
