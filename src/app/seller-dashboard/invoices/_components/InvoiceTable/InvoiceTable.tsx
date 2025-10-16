"use client";
import { ArrowDownToLine, ChevronDown, Printer, Search } from "lucide-react";
import CustomTable, {
  Column,
} from "@/components/shared/dashboard/CustomTable/CustomTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inoviceData, InvoiceRecord } from "../../data/invoiceData";
import Image from "next/image";

const InvoiceTable = () => {
  //Pagination states
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 4;
  //Table Config
  const invoiceColumns: Column<InvoiceRecord>[] = [
    {
      header: "Invoice ID",
      accessor: "invoice_id",
    },
    // File Name Column
    {
      header: "Charged For",
      cell: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-24 h-12 ">
            <Image
              className="w-24 h-12 "
              width={60}
              height={60}
              src={row.image}
              alt={row.Name}
            />
          </div>
          <h1>{row?.Name}</h1>
        </div>
      ),
    },
    {
      header: "Charge",
      accessor: "charge",
    },
    // Type Column
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={` ${
            row?.status === "Complete"
              ? "bg-[#E5FFE3] text-[#007152] rounded-full px-4 py-1.5"
              : "bg-[#FFDDDD] text-[#AA3500] rounded-full px-4 py-1.5"
          }`}
        >
          {row?.status}
        </span>
      ),
    },
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center space-x-2">
          <button className="text-[#0064AE] hover:text-primary focus:outline-none focus:text-primary cursor-pointer bg-[#E6F0F7] p-1 rounded-full border border-[#B0CFE6]">
            <ArrowDownToLine size={16} />
          </button>
          <button className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer bg-[#F4F4F4] p-1 rounded-full border border-gray-200">
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
            <span className="text-lg shrink-0">Sort By</span>
            <Select>
              <SelectTrigger className="w-full sm:min-w-[150px] bg-[#F4F4F4] rounded-lg border-none py-5">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem defaultValue={"all"} value="all">
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
              className="caret-black block w-full  p-2 pl-10 text-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500   bg-[#F4F4F4] rounded-lg border-none py-3"
              placeholder="Search ..."
            />
          </div>
        </div>
        <button className="flex items-center px-6 gap-1.5 py-2 sm:px-8 sm:py-3.5 rounded-lg text-white bg-[#006EF0]">
          Export As
          <ChevronDown size={18} />
        </button>
      </header>
      <CustomTable columns={invoiceColumns} data={inoviceData} />
      {/* <CustomPagination
        totalItems={blogData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      /> */}
    </div>
  );
};

export default InvoiceTable;
