import * as XLSX from 'xlsx';
import { InvoiceRecord } from '../data/invoiceData';

export const exportInvoicesToExcel = (invoices: InvoiceRecord[]): void => {
  const data = invoices.map((invoice) => ({
    'Invoice ID': invoice.stripeInvoiceId,
    'Customer Name': invoice.user.name,
    'Customer Email': invoice.user.email,
    Plan: invoice.subscription.plan.title,
    'Plan Type': invoice.subscription.plan.planType,
    'Billing Period (Months)': invoice.subscription.plan.billingPeriodMonths,
    Amount: `$${(invoice.amount / 100).toFixed(2)}`,
    Currency: invoice.currency.toUpperCase(),
    Status: invoice.status.replace('_', ' '),
    'Created Date': new Date(invoice.createdAt).toLocaleDateString('en-US'),
    'Paid Date': invoice.paidAt
      ? new Date(invoice.paidAt).toLocaleDateString('en-US')
      : 'N/A',
    'Due Date': invoice.dueAt
      ? new Date(invoice.dueAt).toLocaleDateString('en-US')
      : 'N/A',
    'Subscription ID': invoice.subscription.stripeSubscriptionId,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');

  const fileName = `invoices_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportInvoicesToCSV = (invoices: InvoiceRecord[]): void => {
  const data = invoices.map((invoice) => ({
    'Invoice ID': invoice.stripeInvoiceId,
    'Customer Name': invoice.user.name,
    'Customer Email': invoice.user.email,
    Plan: invoice.subscription.plan.title,
    'Plan Type': invoice.subscription.plan.planType,
    'Billing Period (Months)': invoice.subscription.plan.billingPeriodMonths,
    Amount: `$${(invoice.amount / 100).toFixed(2)}`,
    Currency: invoice.currency.toUpperCase(),
    Status: invoice.status.replace('_', ' '),
    'Created Date': new Date(invoice.createdAt).toLocaleDateString('en-US'),
    'Paid Date': invoice.paidAt
      ? new Date(invoice.paidAt).toLocaleDateString('en-US')
      : 'N/A',
    'Due Date': invoice.dueAt
      ? new Date(invoice.dueAt).toLocaleDateString('en-US')
      : 'N/A',
    'Subscription ID': invoice.subscription.stripeSubscriptionId,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `invoices_${new Date().toISOString().split('T')[0]}.csv`,
  );
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
