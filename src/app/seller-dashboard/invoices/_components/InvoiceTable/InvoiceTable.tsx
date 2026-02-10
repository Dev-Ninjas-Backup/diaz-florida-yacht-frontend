'use client';
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
import { PaginationMetadata, usePagination } from '@/hooks/usePagination';
import { getSellerInvoices } from '@/services/seller';
import {
  ArrowDownToLine,
  ChevronDown,
  Eye,
  Printer,
  Search,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  exportInvoicesToCSV,
  exportInvoicesToExcel,
} from '../../_utils/exportInvoices';
import { generateInvoicePDF } from '../../_utils/generateInvoicePDF';
import { InvoiceRecord } from '../../data/invoiceData';
import InvoiceDetailModal from '../InvoiceDetailModal';
import InvoiceTemplate from '../InvoiceTemplate';

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [metadata, setMetadata] = useState<PaginationMetadata>({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleExport = (format: 'excel' | 'csv') => {
    if (format === 'excel') {
      exportInvoicesToExcel(invoices);
    } else {
      exportInvoicesToCSV(invoices);
    }
    setShowExportMenu(false);
  };

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
  });

  const handleDownloadPDF = async (invoice: InvoiceRecord) => {
    try {
      generateInvoicePDF(invoice);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert(`Failed to generate PDF: ${error}`);
    }
  };

  const handlePrintInvoice = (invoice: InvoiceRecord) => {
    setSelectedInvoice(invoice);
    setTimeout(() => {
      if (invoiceRef.current) {
        handlePrint();
      }
    }, 500);
  };

  const { page, limit, setPage } = usePagination({
    initialPage: 1,
    initialLimit: 10,
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const invoicesFromApi = await getSellerInvoices({
          page,
          limit,
          search,
          status: status === 'all' ? '' : status,
        });
        setInvoices(invoicesFromApi.data || []);
        setMetadata(invoicesFromApi.metadata);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [page, limit, search, status]);

  const invoiceColumns: Column<InvoiceRecord>[] = [
    {
      header: 'Invoice ID',
      cell: (row) => <p className="font-mono text-sm">{row.stripeInvoiceId}</p>,
    },
    {
      header: 'Charged For',
      cell: (row) => (
        <div className="flex flex-col">
          <h1 className="font-medium">{row.subscription.plan.title}</h1>
          <p className="text-xs text-gray-500">
            {row.subscription.plan.billingPeriodMonths} month subscription
          </p>
        </div>
      ),
    },
    {
      header: 'Charge',
      cell: (row) => (
        <p className="font-medium">
          ${(row.amount / 100).toFixed(2)} {row.currency.toUpperCase()}
        </p>
      ),
    },
    {
      header: 'Date',
      cell: (row) => (
        <p>{new Date(row.createdAt).toLocaleDateString('en-US')}</p>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <span
          className={` ${
            row.status === 'PAID'
              ? 'bg-[#E5FFE3] text-[#007152] rounded-full px-4 py-1.5'
              : row.status === 'UPCOMING'
                ? 'bg-[#E3F2FD] text-[#1976D2] rounded-full px-4 py-1.5'
                : row.status === 'PAST_DUE'
                  ? 'bg-[#FFF4E3] text-[#AA6500] rounded-full px-4 py-1.5'
                  : row.status === 'FAILED' || row.status === 'VOID'
                    ? 'bg-[#FFDDDD] text-[#AA3500] rounded-full px-4 py-1.5'
                    : row.status === 'REFUNDED'
                      ? 'bg-[#F3E5F5] text-[#7B1FA2] rounded-full px-4 py-1.5'
                      : 'bg-[#F4F4F4] text-gray-500 rounded-full px-4 py-1.5'
          }`}
        >
          {row.status.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedInvoice(row);
              setIsModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-700 focus:outline-none cursor-pointer bg-blue-50 p-1 rounded-full border border-blue-200"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDownloadPDF(row)}
            className="text-[#0064AE] hover:text-primary focus:outline-none focus:text-primary cursor-pointer bg-[#E6F0F7] p-1 rounded-full border border-[#B0CFE6]"
            aria-label="Download invoice"
          >
            <ArrowDownToLine size={16} />
          </button>
          <button
            onClick={() => handlePrintInvoice(row)}
            className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer bg-[#F4F4F4] p-1 rounded-full border border-gray-200"
            aria-label="Print invoice"
          >
            <Printer size={16} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className=" p-4 bg-[#F4F4F4] rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900">All Invoices</h1>
      <header className="flex items-center justify-between flex-wrap gap-5 bg-white rounded-t-lg p-4 mt-4">
        <div className="flex items-center flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <span className="text-lg shrink-0">Filter</span>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:min-w-[150px] bg-[#F4F4F4] rounded-lg border-none py-5">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="UPCOMING">Upcoming</SelectItem>
                <SelectItem value="VOID">Void</SelectItem>
                <SelectItem value="PAST_DUE">Past Due</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
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

      {loading ? (
        <div className="bg-white p-8 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : invoices.length > 0 ? (
        <>
          <CustomTable columns={invoiceColumns} data={invoices} />
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
        <div className="bg-white p-8 text-center">
          <p className="text-gray-500">No invoices found</p>
        </div>
      )}

      <InvoiceDetailModal
        invoice={selectedInvoice}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedInvoice(null);
        }}
      />

      <div className="fixed -left-[9999px] top-0">
        {selectedInvoice && (
          <InvoiceTemplate ref={invoiceRef} invoice={selectedInvoice} />
        )}
      </div>
    </div>
  );
};

export default InvoiceTable;
