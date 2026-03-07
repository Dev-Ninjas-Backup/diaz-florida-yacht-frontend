/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import CustomTable, {
  Column,
} from '@/components/shared/dashboard/CustomTable/CustomTable';
import { NoDataFound } from '@/components/ui/no-data-found';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaginationMetadata, usePagination } from '@/hooks/usePagination';
import { getSellerBoats } from '@/services/seller';
import { deleteBoatListing } from '@/services/seller/boat-listing';
import { Eye, Plus, Search, SquarePen, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { IListing } from '../../data/myListing';

const MyListing = () => {
  const router = useRouter();
  const [myListings, setMyListings] = useState<IListing[]>([]);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [metadata, setMetadata] = useState<PaginationMetadata>({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  });
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/profile`,
          {
            credentials: 'include',
          },
        );
        const data = await res.json();
        const hasActivePlan = data?.data?.currentPlanStatus === 'ACTIVE';
        setHasActiveSubscription(hasActivePlan);
      } catch (error) {
        console.error('Failed to check subscription:', error);
        setHasActiveSubscription(false);
      }
    };
    checkSubscription();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const getListings = async () => {
      setLoading(true);
      try {
        const listingsFromApi = await getSellerBoats({
          page,
          limit,
          search: debouncedSearch,
          status: status === 'all' ? '' : status,
        });
        setMyListings(listingsFromApi.data || []);
        setMetadata(listingsFromApi.metadata);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, [page, limit, debouncedSearch, status]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBoatListing(id);
      setMyListings((prev) => prev.filter((item) => item.id !== id));
      toast.success('Listing deleted successfully');
    } catch (error) {
      console.error('Failed to delete listing:', error);
      toast.error('Failed to delete listing');
    }
  };

  const handlePostNew = () => {
    if (hasActiveSubscription) {
      router.push('/seller-dashboard/my-listing/create');
    } else {
      router.push('/register-boat');
    }
  };

  const listingColumns: Column<IListing>[] = [
    {
      header: 'Listing ID',
      cell: (row) => <p>{row.listingId}</p>,
    },

    {
      header: 'Name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-24 h-12 relative">
            <Image
              className="w-24 h-12 object-cover rounded"
              fill
              src={row.coverImages?.[0]?.url || '/placeholder-boat.jpg'}
              alt={row.name}
            />
          </div>
          <h1 className="font-medium">{row.name}</h1>
        </div>
      ),
    },
    {
      header: 'Price',
      cell: (row) => <p>${row.price.toLocaleString()}</p>,
    },
    {
      header: 'Publish Date',
      cell: (row) => (
        <p>{new Date(row.createdAt).toLocaleDateString('en-US')}</p>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <span
          className={` ${
            row.status === 'ACTIVE'
              ? 'bg-[#E3FBFD] text-[#00A3AC] rounded-full px-4 py-1.5'
              : 'bg-[#F4F4F4] text-gray-500 rounded-full px-4 py-1.5'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <Link
            href={`/seller-dashboard/my-listing/view/${row.id}`}
            className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer bg-[#F4F4F4] p-1 rounded-full border border-gray-200"
          >
            <Eye size={18} />
          </Link>
          <Link
            href={`/seller-dashboard/my-listing/edit/${row.id}`}
            className="text-[#0064AE] hover:text-primary focus:outline-none focus:text-primary cursor-pointer bg-[#E6F0F7] p-1 rounded-full border border-[#B0CFE6]"
          >
            <SquarePen size={16} />
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            title="Delete listing"
            aria-label="Delete listing"
            className="text-orange-600 hover:text-red-600 focus:outline-none focus:text-red-600 cursor-pointer bg-#FEE3D7] p-1 rounded-full border border-[#EDC2AF]"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className=" p-4 bg-[#F4F4F4] rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900">All Listings</h1>
      <header className="flex items-center justify-between flex-wrap gap-5 bg-white rounded-t-lg p-4 mt-4">
        <div className="flex items-center flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">Filter</span>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:min-w-[150px] bg-[#F4F4F4] rounded-lg border-none py-5">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="SOLD">Sold</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="ONBOARDING_PENDING">
                  Onboarding Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full sm:w-[250px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="caret-black block w-full  p-2 pl-10 text-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500   bg-[#F4F4F4] rounded-lg border-none py-3"
              placeholder="Search ..."
            />
          </div>
        </div>
        <button
          onClick={handlePostNew}
          className="flex items-center px-6 py-2 sm:px-8 sm:py-3.5 rounded-lg text-white bg-[#006EF0]"
        >
          Post New
          <Plus size={18} />
        </button>
      </header>

      {loading ? (
        <div className="bg-white rounded-b-lg">
          <div className="divide-y">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-24 h-12 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded-full w-20 animate-pulse" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : myListings.length > 0 ? (
        <>
          <CustomTable columns={listingColumns} data={myListings} />
          <div className="bg-white p-4 rounded-b-lg flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {(page - 1) * limit + 1} to{' '}
              {Math.min(page * limit, metadata.total)} of {metadata.total}{' '}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {page} of {metadata.totalPage}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= metadata.totalPage}
                className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-b-lg">
          <NoDataFound
            title="No listings found"
            description="You haven't created any listings yet. Click 'Post New' to create your first listing."
          />
        </div>
      )}
    </div>
  );
};

export default MyListing;
