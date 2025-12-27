export interface LeadListingSummary {
  listingId: string;
  name: string;
  price: number;
  city: string;
}

export interface FloridaLeadBoat {
  id: string;
  name: string;
  listingId: string;
  price: number;
}

export interface FloridaLead {
  id: string;
  contactId: string;
  boatId: string;
  createdAt: string;
  updatedAt: string;
  boat: FloridaLeadBoat;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  type: string;
  listingId: string | null;
  listingSource: string | null;
  createdAt: string;
  updatedAt: string;
  floridaLeads: FloridaLead[];
}
