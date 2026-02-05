'use client';
import { X, Mail, Phone, Calendar, MessageSquare, Ship } from 'lucide-react';
import { Lead } from '@/types/lead-types';

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailModal = ({ lead, isOpen, onClose }: LeadDetailModalProps) => {
  if (!isOpen || !lead) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Lead Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {lead.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-gray-500">{lead.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={16} />
              <a href={`mailto:${lead.email}`} className="hover:text-blue-600">
                {lead.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={16} />
              <a href={`tel:${lead.phone}`} className="hover:text-blue-600">
                {lead.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar size={16} />
              <span>{formatDate(lead.createdAt)}</span>
            </div>
          </div>

          
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Ship size={20} />
              Boat Information
            </h3>
            <div className="space-y-2">
              <p className="font-medium">{lead.listingSummary.name}</p>
              <p className="text-sm text-gray-600">
                Listing ID: {lead.listingSummary.listingId}
              </p>
              <p className="text-lg font-semibold text-blue-600">
                ${lead.listingSummary.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Location: {lead.listingSummary.city}
              </p>
            </div>
          </div>

          
          {lead.listingId && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Listing Details</h3>
              <p className="text-sm text-gray-600">
                Listing ID: {lead.listingId}
              </p>
              {lead.listingSource && (
                <p className="text-sm text-gray-600">
                  Source: {lead.listingSource}
                </p>
              )}
            </div>
          )}

          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare size={18} />
              Message
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap">{lead.message}</p>
          </div>

          
          <div className="flex gap-3">
            <a
              href={`mailto:${lead.email}`}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-center"
            >
              Send Email
            </a>
            <a
              href={`tel:${lead.phone}`}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-center"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailModal;
