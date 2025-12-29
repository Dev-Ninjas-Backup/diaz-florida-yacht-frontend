import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceRecord } from '../data/invoiceData';

export const generateInvoicePDF = (invoice: InvoiceRecord): void => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 20;

  // Header
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INVOICE', margin, yPos);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Florida Yacht', margin, yPos + 8);
  
  // Invoice ID and Date
  pdf.setFontSize(10);
  pdf.text('Invoice ID', pageWidth - margin, yPos, { align: 'right' });
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text(invoice.stripeInvoiceId, pageWidth - margin, yPos + 6, { align: 'right' });
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString('en-US')}`, pageWidth - margin, yPos + 12, { align: 'right' });
  
  // Line separator
  yPos += 20;
  pdf.setDrawColor(51, 51, 51);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  
  // Bill To & Status
  yPos += 10;
  pdf.setFontSize(9);
  pdf.setTextColor(102, 102, 102);
  pdf.text('BILL TO', margin, yPos);
  pdf.text('STATUS', pageWidth - margin - 40, yPos);
  
  yPos += 6;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text(invoice.user.name, margin, yPos);
  
  // Status badge
  const statusColor = invoice.status === 'PAID' ? [220, 252, 231] : invoice.status === 'UPCOMING' ? [219, 234, 254] : [254, 226, 226];
  const statusTextColor = invoice.status === 'PAID' ? [22, 101, 52] : invoice.status === 'UPCOMING' ? [30, 64, 175] : [153, 27, 27];
  pdf.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  pdf.roundedRect(pageWidth - margin - 35, yPos - 5, 35, 8, 2, 2, 'F');
  pdf.setTextColor(statusTextColor[0], statusTextColor[1], statusTextColor[2]);
  pdf.setFontSize(10);
  pdf.text(invoice.status.replace('_', ' '), pageWidth - margin - 17.5, yPos, { align: 'center' });
  
  yPos += 6;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(102, 102, 102);
  pdf.text(invoice.user.email, margin, yPos);
  
  // Table
  yPos += 15;
  autoTable(pdf, {
    startY: yPos,
    head: [['DESCRIPTION', 'PERIOD', 'AMOUNT']],
    body: [[
      `${invoice.subscription.plan.title}\n${invoice.subscription.plan.planType}`,
      `${invoice.subscription.plan.billingPeriodMonths} months`,
      `$${(invoice.amount / 100).toFixed(2)}`
    ]],
    theme: 'plain',
    headStyles: {
      fontSize: 9,
      fontStyle: 'bold',
      textColor: [102, 102, 102],
      fillColor: [255, 255, 255],
      lineWidth: 0.5,
      lineColor: [51, 51, 51],
    },
    bodyStyles: {
      fontSize: 11,
      textColor: [0, 0, 0],
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { halign: 'right', cellWidth: 40 },
      2: { halign: 'right', fontStyle: 'bold', cellWidth: 40 },
    },
    margin: { left: margin, right: margin },
  });
  
  yPos = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  
  // Total section
  const totalX = pageWidth - margin - 60;
  pdf.setFontSize(10);
  pdf.setTextColor(102, 102, 102);
  pdf.text('Subtotal', totalX, yPos);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`$${(invoice.amount / 100).toFixed(2)}`, pageWidth - margin, yPos, { align: 'right' });
  
  yPos += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(102, 102, 102);
  pdf.text('Tax', totalX, yPos);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('$0.00', pageWidth - margin, yPos, { align: 'right' });
  
  yPos += 2;
  pdf.setDrawColor(51, 51, 51);
  pdf.setLineWidth(0.5);
  pdf.line(totalX, yPos, pageWidth - margin, yPos);
  
  yPos += 8;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Total', totalX, yPos);
  pdf.text(`$${(invoice.amount / 100).toFixed(2)} ${invoice.currency.toUpperCase()}`, pageWidth - margin, yPos, { align: 'right' });
  
  // Payment info
  if (invoice.paidAt) {
    yPos += 15;
    pdf.setFillColor(240, 253, 244);
    pdf.setDrawColor(187, 247, 208);
    pdf.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 12, 2, 2, 'FD');
    pdf.setFontSize(10);
    pdf.setTextColor(22, 101, 52);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Payment Received: ', margin + 5, yPos + 2);
    pdf.setFont('helvetica', 'normal');
    pdf.text(new Date(invoice.paidAt).toLocaleDateString('en-US'), margin + 45, yPos + 2);
  }
  
  // Footer
  yPos = pdf.internal.pageSize.getHeight() - 30;
  pdf.setDrawColor(221, 221, 221);
  pdf.setLineWidth(0.3);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 8;
  pdf.setFontSize(10);
  pdf.setTextColor(102, 102, 102);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Thank you for your business!', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 6;
  pdf.setFontSize(9);
  pdf.setTextColor(153, 153, 153);
  pdf.text(`Subscription ID: ${invoice.subscription.stripeSubscriptionId}`, pageWidth / 2, yPos, { align: 'center' });
  
  pdf.save(`invoice-${invoice.stripeInvoiceId}.pdf`);
};
