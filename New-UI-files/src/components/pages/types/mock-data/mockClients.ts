import { Client } from "../Client"; // adjust path as needed

export const mockClients: Client[] = [
  // ---------------------------------------------
  // 🟡  PENDING CLIENTS (2)
  // ---------------------------------------------
  {
    id: "C001",
    orgName: "Winwire Technology",
    contactName: "Anpurnanand Tiwary",
    contactEmail: "atiwary72@gmail.com",
    contactNumber: "7277330251",
    industryType: "IT",
    companySize: "Small",
    services: [
      "Attendance Management",
      "Payroll Management",
      "Leave Management"
    ],
    gst: "GST112233",
    address: "BTM Layout, Bangalore",
    logo: "",
    heroImage: "",
    clientType: "New Client",
    status: "PENDING",
  },

  {
    id: "C002",
    orgName: "PulseSecure Software",
    contactName: "Ravi Desai",
    contactEmail: "ravi@pulsesecure.com",
    contactNumber: "9999912345",
    industryType: "Software",
    companySize: "Medium",
    services: ["Payroll Management"],
    gst: "GST77881",
    address: "Hyderabad",
    logo: "",
    heroImage: "",
    clientType: "Free Trial",
    status: "PENDING",
    fromDate: "2025-02-01",
    toDate: "2025-02-15"
  },

  // ---------------------------------------------
  // 🟢  ACTIVE CLIENTS (2)
  // ---------------------------------------------
  {
    id: "C003",
    orgName: "TechNova Labs",
    contactName: "Meera Shah",
    contactEmail: "meera@technova.com",
    contactNumber: "8888822222",
    industryType: "IT",
    companySize: "Large",
    services: ["Leave Management", "Attendance Management"],
    gst: "GST992211",
    address: "Kondapur, Hyderabad",
    logo: "",
    heroImage: "",
    clientType: "New Client",
    status: "ACTIVE",
  },

  {
    id: "C004",
    orgName: "BrightVision Pvt Ltd",
    contactName: "Rahul Kumar",
    contactEmail: "rahul@brightvision.com",
    contactNumber: "9090909090",
    industryType: "Finance",
    companySize: "Medium",
    services: ["Attendance Management"],
    gst: "GST445566",
    address: "Whitefield, Bangalore",
    logo: "",
    heroImage: "",
    clientType: "Free Trial",
    status: "ACTIVE",
    fromDate: "2025-01-10",
    toDate: "2025-01-25"
  },

  // ---------------------------------------------
  // 🔴  REJECTED CLIENTS (2)
  // ---------------------------------------------
  {
    id: "C005",
    orgName: "Skyline Solutions",
    contactName: "Priya Nair",
    contactEmail: "priya@skyline.com",
    contactNumber: "9191919191",
    industryType: "Healthcare",
    companySize: "Small",
    services: ["Leave Management"],
    gst: "GST551122",
    address: "Chennai",
    logo: "",
    heroImage: "",
    clientType: "New Client",
    status: "REJECTED",
    rejectRemark: "Incomplete information provided"
  },

  {
    id: "C006",
    orgName: "GrowthHive Global",
    contactName: "Sanjay Patel",
    contactEmail: "sanjay@growthhive.com",
    contactNumber: "7272727272",
    industryType: "IT",
    companySize: "Large",
    services: ["Payroll Management", "Attendance Management"],
    gst: "GST663344",
    address: "Pune",
    logo: "",
    heroImage: "",
    clientType: "Free Trial",
    status: "REJECTED",
    fromDate: "2025-03-01",
    toDate: "2025-03-10",
    rejectRemark: "Trial date mismatch"
  }
];
