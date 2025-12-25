'use client';

import { getSellerLeads } from '@/services/seller';
import { Lead } from '@/types/lead-types';
import { useEffect, useState } from 'react';
import LeadTable from './_components/LeadTable/LeadTable';

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const response = await getSellerLeads({ page, limit, search });
        if (response.success && response.data) {
          setLeads(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [page, limit, search]);

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  if (isLoading) {
    return (
      <div className="pb-20 flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <LeadTable leads={leads} onSearch={handleSearch} />
    </div>
  );
};

export default LeadsPage;
