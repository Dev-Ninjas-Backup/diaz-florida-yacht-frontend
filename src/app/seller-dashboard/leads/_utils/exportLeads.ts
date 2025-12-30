import * as XLSX from 'xlsx';
import { Lead } from '@/types/lead-types';

export const exportLeadsToExcel = (leads: Lead[]): void => {
  const data = leads.map((lead) => ({
    'Listing ID': lead.listingId,
    'Boat Name': lead.listingSummary?.name || 'N/A',
    Price: lead.listingSummary?.price
      ? `$${lead.listingSummary.price.toLocaleString()}`
      : 'N/A',
    Location: lead.listingSummary?.city || 'N/A',
    'Client Name': lead.name,
    Email: lead.email,
    Phone: lead.phone,
    Message: lead.message,
    Source: lead.source,
    Type: lead.type,
    'Created Date': new Date(lead.createdAt).toLocaleDateString('en-US'),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

  const fileName = `leads_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportLeadsToCSV = (leads: Lead[]): void => {
  const data = leads.map((lead) => ({
    'Listing ID': lead.listingId,
    'Boat Name': lead.listingSummary?.name || 'N/A',
    Price: lead.listingSummary?.price
      ? `$${lead.listingSummary.price.toLocaleString()}`
      : 'N/A',
    Location: lead.listingSummary?.city || 'N/A',
    'Client Name': lead.name,
    Email: lead.email,
    Phone: lead.phone,
    Message: lead.message,
    Source: lead.source,
    Type: lead.type,
    'Created Date': new Date(lead.createdAt).toLocaleDateString('en-US'),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `leads_${new Date().toISOString().split('T')[0]}.csv`,
  );
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
