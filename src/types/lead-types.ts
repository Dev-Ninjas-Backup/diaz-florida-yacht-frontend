export interface LeadListingSummary {
  listingId: string;
  name: string;
  price: number;
  city: string;
}

export interface Lead {
  id: string;
  boatId: string;
  listingId: string;
  listingSummary: LeadListingSummary;
  source: string;
  listingSource: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
