import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceRecord } from '../data/invoiceData';

export const generateInvoicePDF = (invoice: InvoiceRecord): void => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 25.4;
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;

  // Blue Header Background
  pdf.setFillColor(0, 110, 240);
  pdf.rect(0, 0, pageWidth, 45, 'F');

  // Company Name
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text('FLORIDA YACHT', margin, yPos + 10);

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Premium Yacht Sales & Services', margin, yPos + 17);

  // Company Address
  pdf.setFontSize(9);
  pdf.text('123 Marina Boulevard', pageWidth - margin, yPos + 8, { align: 'right' });
  pdf.text('Miami, FL 33101', pageWidth - margin, yPos + 13, { align: 'right' });
  pdf.text('contact@floridayacht.com', pageWidth - margin, yPos + 18, { align: 'right' });
  pdf.text('(305) 555-0123', pageWidth - margin, yPos + 23, { align: 'right' });

  pdf.setTextColor(0, 0, 0);
  yPos = 55;

  // Invoice Title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INVOICE', margin, yPos);

  // Invoice Info Box
  const infoBoxX = pageWidth - margin - 60;
  pdf.setFillColor(245, 247, 250);
  pdf.roundedRect(infoBoxX, yPos - 8, 60, 28, 2, 2, 'F');

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(100, 100, 100);
  pdf.text('INVOICE #', infoBoxX + 3, yPos - 2);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.text(invoice.stripeInvoiceId.substring(0, 20), infoBoxX + 3, yPos + 3);

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(100, 100, 100);
  pdf.text('DATE', infoBoxX + 3, yPos + 10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  pdf.text(new Date(invoice.createdAt).toLocaleDateString('en-US'), infoBoxX + 3, yPos + 15);

  yPos += 35;

  // Bill To Section
  pdf.setFillColor(0, 110, 240);
  pdf.rect(margin, yPos, contentWidth, 8, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BILL TO', margin + 3, yPos + 5.5);

  // Status Badge
  const statusText = invoice.status.replace('_', ' ');
  const statusColor = invoice.status === 'PAID' ? [34, 197, 94] : invoice.status === 'UPCOMING' ? [59, 130, 246] : [239, 68, 68];
  pdf.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  pdf.roundedRect(pageWidth - margin - 35, yPos + 1, 35, 6, 1.5, 1.5, 'F');
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text(statusText, pageWidth - margin - 17.5, yPos + 5, { align: 'center' });

  yPos += 12;
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(invoice.user.name, margin, yPos);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  pdf.text(invoice.user.email, margin, yPos + 6);

  yPos += 18;

  // Items Table
  autoTable(pdf, {
    startY: yPos,
    head: [['DESCRIPTION', 'PERIOD', 'AMOUNT']],
    body: [[
      `${invoice.subscription.plan.title}\n${invoice.subscription.plan.planType}`,
      `${invoice.subscription.plan.billingPeriodMonths} months`,
      `$${(invoice.amount / 100).toFixed(2)}`
    ]],
    theme: 'grid',
    headStyles: {
      fillColor: [240, 242, 245],
      textColor: [60, 60, 60],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 10,
      textColor: [40, 40, 40],
      cellPadding: 6,
    },
    columnStyles: {
      0: { cellWidth: contentWidth - 60 },
      1: { halign: 'center', cellWidth: 30 },
      2: { halign: 'right', fontStyle: 'bold', cellWidth: 30 },
    },
    margin: { left: margin, right: margin },
  });

  yPos = (pdf as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;

  // Total Section
  const totalBoxX = pageWidth - margin - 65;
  pdf.setFillColor(245, 247, 250);
  pdf.roundedRect(totalBoxX, yPos, 65, 35, 2, 2, 'F');

  pdf.setFontSize(10);
  pdf.setTextColor(80, 80, 80);
  pdf.text('Subtotal', totalBoxX + 5, yPos + 8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`$${(invoice.amount / 100).toFixed(2)}`, totalBoxX + 60, yPos + 8, { align: 'right' });

  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  pdf.text('Tax (0%)', totalBoxX + 5, yPos + 15);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('$0.00', totalBoxX + 60, yPos + 15, { align: 'right' });

  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.3);
  pdf.line(totalBoxX + 5, yPos + 18, totalBoxX + 60, yPos + 18);

  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 110, 240);
  pdf.text('TOTAL', totalBoxX + 5, yPos + 26);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`$${(invoice.amount / 100).toFixed(2)} ${invoice.currency.toUpperCase()}`, totalBoxX + 60, yPos + 26, { align: 'right' });

  // Payment Status
  if (invoice.paidAt) {
    yPos += 45;
    pdf.setFillColor(220, 252, 231);
    pdf.setDrawColor(187, 247, 208);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'FD');
    pdf.setFontSize(10);
    pdf.setTextColor(22, 101, 52);
    pdf.setFont('helvetica', 'bold');
    pdf.text('✓ Payment Received', margin + 5, yPos + 5);
    pdf.setFont('helvetica', 'normal');
    pdf.text(new Date(invoice.paidAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), margin + 5, yPos + 9);
  }

  // Footer
  const footerY = pageHeight - 25;
  pdf.setFillColor(0, 110, 240);
  pdf.rect(0, footerY, pageWidth, 25, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Thank you for your business!', pageWidth / 2, footerY + 8, { align: 'center' });

  pdf.setFontSize(8);
  pdf.setTextColor(200, 220, 255);
  pdf.text(`Subscription ID: ${invoice.subscription.stripeSubscriptionId}`, pageWidth / 2, footerY + 13, { align: 'center' });
  pdf.text('For questions, contact us at contact@floridayacht.com', pageWidth / 2, footerY + 18, { align: 'center' });

  pdf.save(`invoice-${invoice.stripeInvoiceId}.pdf`);
};
