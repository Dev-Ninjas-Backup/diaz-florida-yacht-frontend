'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { InvoiceRecord } from '../data/invoiceData';

interface InvoiceDetailModalProps {
  invoice: InvoiceRecord | null;
  open: boolean;
  onClose: () => void;
}

export default function InvoiceDetailModal({
  invoice,
  open,
  onClose,
}: InvoiceDetailModalProps) {
  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Invoice Details
            </DialogTitle>
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-1 rounded"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          <DialogDescription className="sr-only">
            Detailed view of your invoice information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Invoice Header */}
          <div className="border-b pb-4">
            <p className="text-sm text-gray-500">Invoice ID</p>
            <p className="font-mono text-lg font-semibold">
              {invoice.stripeInvoiceId}
            </p>
          </div>

          {/* Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span
                className={`inline-block ${
                  invoice.status === 'PAID'
                    ? 'bg-[#E5FFE3] text-[#007152]'
                    : invoice.status === 'UPCOMING'
                      ? 'bg-[#E3F2FD] text-[#1976D2]'
                      : invoice.status === 'PAST_DUE'
                        ? 'bg-[#FFF4E3] text-[#AA6500]'
                        : invoice.status === 'FAILED' ||
                            invoice.status === 'VOID'
                          ? 'bg-[#FFDDDD] text-[#AA3500]'
                          : invoice.status === 'REFUNDED'
                            ? 'bg-[#F3E5F5] text-[#7B1FA2]'
                            : 'bg-[#F4F4F4] text-gray-500'
                } rounded-full px-4 py-1.5 text-sm font-medium`}
              >
                {invoice.status.replace('_', ' ')}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Amount</p>
              <p className="text-lg font-semibold">
                ${(invoice.amount / 100).toFixed(2)}{' '}
                {invoice.currency.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Subscription Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">
                  {invoice.subscription.plan.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Billing Period</span>
                <span className="font-medium">
                  {invoice.subscription.plan.billingPeriodMonths} months
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan Type</span>
                <span className="font-medium">
                  {invoice.subscription.plan.planType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subscription ID</span>
                <span className="font-mono text-sm">
                  {invoice.subscription.stripeSubscriptionId}
                </span>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Customer Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{invoice.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{invoice.user.email}</span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Created At</p>
              <p className="font-medium">
                {new Date(invoice.createdAt).toLocaleDateString('en-US')}
              </p>
            </div>
            {invoice.paidAt && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Paid At</p>
                <p className="font-medium">
                  {new Date(invoice.paidAt).toLocaleDateString('en-US')}
                </p>
              </div>
            )}
            {invoice.dueAt && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Due At</p>
                <p className="font-medium">
                  {new Date(invoice.dueAt).toLocaleDateString('en-US')}
                </p>
              </div>
            )}
            {invoice.failedAt && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Failed At</p>
                <p className="font-medium text-red-600">
                  {new Date(invoice.failedAt).toLocaleDateString('en-US')}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
