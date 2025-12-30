'use client';
import { ChevronDown, Eye, Mail, Phone, Search } from 'lucide-react';
import CustomTable, {
  Column,
} from '@/components/shared/dashboard/CustomTable/CustomTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lead } from '@/types/lead-types';
import { useState } from 'react';
import LeadDetailModal from '../LeadDetailModal';
import { exportLeadsToExcel, exportLeadsToCSV } from '../../_utils/exportLeads';

interface LeadTableProps {
  leads: Lead[];
  onSearch: (search: string) => void;
}

const LeadTable = ({ leads, onSearch }: LeadTableProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: 'excel' | 'csv') => {
    if (format === 'excel') {
      exportLeadsToExcel(leads);
    } else {
      exportLeadsToCSV(leads);
    }
    setShowExportMenu(false);
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const truncateMessage = (message: string, maxLength = 30) => {
    if (!message) return '';
    return message.length > maxLength
      ? `${message.substring(0, maxLength)}...`
      : message;
  };

  const leadColumns: Column<Lead>[] = [
    {
      header: 'Listing ID',
      accessor: 'listingId',
    },
    {
      header: 'Client Name',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Message',
      cell: (row) => truncateMessage(row.message),
    },
    {
      header: 'Date',
      cell: (row) => formatDate(row.createdAt),
    },
    {
      header: 'Action',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewDetails(row)}
            className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer bg-[#F4F4F4] p-1 rounded-full border border-gray-200"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <a
            href={`tel:${row.phone}`}
            className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer bg-[#F4F4F4] p-1 rounded-full border border-gray-200"
            title="Call"
          >
            <Phone size={16} />
          </a>
          <a
            href={`mailto:${row.email}`}
            className="text-gray-400 hover:text-red-600 focus:outline-none focus:text-red-600 cursor-pointer bg-[#F4F4F4] p-1 rounded-full border border-gray-200"
            title="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className=" p-4 bg-[#F4F4F4] rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">All Leads</h1>
        <header className="flex items-center justify-between flex-wrap gap-5 bg-white rounded-t-lg p-4 mt-4">
          <div className="flex items-center flex-wrap gap-5">
            <div className="flex items-center gap-2">
              <span className="text-lg shrink-0">Sort By</span>
              <Select>
                <SelectTrigger className="w-full sm:min-w-[150px] bg-[#F4F4F4] rounded-lg border-none py-5">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem defaultValue={'all'} value="all">
                    All
                  </SelectItem>
                  <SelectItem value="active">Export As</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative w-full sm:w-[250px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                className="caret-black block w-full  p-2 pl-10 text-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500   bg-[#F4F4F4] rounded-lg border-none py-3"
                placeholder="Search ..."
              />
            </div>
          </div>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="relative flex items-center px-6 gap-1.5 py-2 sm:px-8 sm:py-3.5 rounded-lg text-white bg-[#006EF0] hover:bg-[#0056b3]"
          >
            Export As
            <ChevronDown size={18} />
            {showExportMenu && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExport('excel');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-t-lg"
                >
                  Excel (.xlsx)
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExport('csv');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-b-lg"
                >
                  CSV (.csv)
                </button>
              </div>
            )}
          </button>
        </header>
        <CustomTable columns={leadColumns} data={leads} />
      </div>
      <LeadDetailModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default LeadTable;
