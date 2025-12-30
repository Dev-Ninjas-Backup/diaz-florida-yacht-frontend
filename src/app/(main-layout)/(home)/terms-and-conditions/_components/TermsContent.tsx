'use client';

import HtmlContentWithToc from '@/components/CustomComponents/HtmlContentWithToc';
import { Loading } from '@/components/ui/loading';
import { NoDataFound } from '@/components/ui/no-data-found';
import { getTermsOfService } from '@/services/terms-of-service/termsOfService';
import { useEffect, useState } from 'react';

const TermsContent = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTermsOfService = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTermsOfService('FLORIDA');
        if (data) {
          setHtmlContent(data.termsDescription);
          setTitle(data.termsTitle);
        } else {
          setError('Failed to load terms of service');
        }
      } catch (err) {
        console.error('Error fetching terms of service:', err);
        setError('Failed to load terms of service');
      } finally {
        setLoading(false);
      }
    };

    fetchTermsOfService();
  }, []);

  if (loading) {
    return <Loading message="Loading terms and conditions..." />;
  }

  if (error || !htmlContent) {
    return (
      <div className="py-10 md:py-16">
        <NoDataFound
          title="Terms and Conditions Not Available"
          description="Failed to load terms and conditions. Please try refreshing the page."
        />
      </div>
    );
  }

  return <HtmlContentWithToc htmlContent={htmlContent} title={title} />;
};

export default TermsContent;
