'use client';
import { ExtraDetail } from '@/types/boat-details-types';
import { useMemo } from 'react';

interface ItemExtraDetailsProps {
  extraDetails?: ExtraDetail[];
}

const ItemExtraDetails = ({ extraDetails }: ItemExtraDetailsProps) => {
  const parsedSections = useMemo(() => {
    if (!extraDetails || extraDetails.length === 0) return [];

    const sections: {
      title: string;
      items: { key: string; value: string }[];
      paragraphs: string[];
    }[] = [];

    extraDetails.forEach((detail) => {
      const title = detail.key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();

      const content = detail.value || '';
      const items: { key: string; value: string }[] = [];
      const paragraphs: string[] = [];

      // Split content by lines and process
      const lines = content.split('\n').filter((line) => line.trim());
      let i = 0;

      while (i < lines.length) {
        const line = lines[i].trim();

        // Check if this line ends with colon (key) and next line is value
        if (line.endsWith(':') && i + 1 < lines.length) {
          const key = line.slice(0, -1).trim();
          const value = lines[i + 1].trim();
          if (value && !value.endsWith(':')) {
            items.push({ key, value });
            i += 2;
            continue;
          }
        }

        // Check for inline key:value pattern
        const inlineMatch = line.match(/^([^:]+):\s*(.+)$/);
        if (inlineMatch) {
          const [, key, value] = inlineMatch;
          if (key && value) {
            items.push({ key: key.trim(), value: value.trim() });
            i++;
            continue;
          }
        }

        // Check if line looks like a key (ends with colon, no value)
        if (line.endsWith(':')) {
          // Skip standalone keys without values
          i++;
          continue;
        }

        // Otherwise treat as paragraph
        if (line.length > 50) {
          paragraphs.push(line);
        }
        i++;
      }

      if (items.length > 0 || paragraphs.length > 0) {
        sections.push({ title, items, paragraphs });
      }
    });

    return sections;
  }, [extraDetails]);

  if (parsedSections.length === 0) {
    return null;
  }

  return (
    <div className="px-1 md:px-4 py-5">
      <h2 className="text-lg md:text-xl font-semibold text-black text-left pb-3">
        Additional Details
      </h2>
      <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden p-4 md:p-6">
        {parsedSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6 last:mb-0">
            {section.title && (
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                {section.title}
              </h3>
            )}

            {/* Grid layout for key-value pairs */}
            {section.items.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col">
                    <span className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {item.key}
                    </span>
                    <span className="text-sm md:text-base text-gray-900 mt-1">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Paragraphs */}
            {section.paragraphs.length > 0 && (
              <div className="space-y-3 text-sm md:text-base text-gray-700 leading-relaxed">
                {section.paragraphs.map((para, paraIndex) => (
                  <p key={paraIndex}>{para}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemExtraDetails;
