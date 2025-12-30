'use client';

import { getSellerLeads } from '@/services/seller';
import { Lead } from '@/types/lead-types';
import { useEffect, useState } from 'react';
import LeadTable from './_components/LeadTable/LeadTable';

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [listingId, setListingId] = useState('');
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const response = await getSellerLeads({
          page,
          limit,
          search,
          listingId,
        });
        if (response.success && response.data) {
          setLeads(response.data);
          setTotal(response.metadata?.total || 0);
          setTotalPages(response.metadata?.totalPage || 1);
        }
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [page, limit, search, listingId]);

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(1);
  };

  const handleListingIdFilter = (listingIdValue: string) => {
    setListingId(listingIdValue);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
      <LeadTable
        leads={leads}
        onSearch={handleSearch}
        onListingIdFilter={handleListingIdFilter}
        page={page}
        limit={limit}
        total={total}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LeadsPage;
