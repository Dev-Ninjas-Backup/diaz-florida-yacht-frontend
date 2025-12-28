'use client';

import HtmlContentWithToc from '@/components/CustomComponents/HtmlContentWithToc';
import { Loading } from '@/components/ui/loading';
import { NoDataFound } from '@/components/ui/no-data-found';
import { getPrivacyPolicy } from '@/services/privacy-policy/privacyPolicy';
import { useEffect, useState } from 'react';

const PrivacyPolicyContent = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPrivacyPolicy('FLORIDA');
        if (data) {
          setHtmlContent(data.privacyDescription);
          setTitle(data.privacyTitle);
        } else {
          setError('Failed to load privacy policy');
        }
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        setError('Failed to load privacy policy');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return (
      <div className="py-10 md:py-16">
        <Loading message="Loading privacy policy..." />
      </div>
    );
  }

  if (error || !htmlContent) {
    return (
      <div className="py-10 md:py-16">
        <NoDataFound
          title="Privacy Policy Not Available"
          description={
            error
              ? 'Failed to load privacy policy. Please try refreshing the page.'
              : 'No privacy policy content is available at the moment.'
          }
        />
      </div>
    );
  }

  return <HtmlContentWithToc htmlContent={htmlContent} title={title} />;
};

export default PrivacyPolicyContent;
