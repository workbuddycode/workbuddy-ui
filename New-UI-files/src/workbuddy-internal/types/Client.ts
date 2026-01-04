export interface Client {
  id: string;
  orgName: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  industryType: string;
  companySize: string;
  services: string[];
  gst: string;
  address: string;
  logo?: string;
  heroImage?: string;
  clientType: string; // New Client | Free Trial | Existing Client

  status: "PENDING" | "ACTIVE" | "REJECTED";

  // NEW FIELDS
  fromDate?: string | null;
  toDate?: string | null;

  approveRemark?: string;
  rejectRemark?: string;
}
