export const seedServices = [
  {
    id: "birth",
    name: "Birth Certificate",
    icon: "👶",
    category: "Personal Certificates",
    description: "Assistance with birth certificate applications, corrections and documentation.",
    documents: ["Hospital birth record", "Parent identity proof", "Address proof"],
    eta: "7–15 working days",
    fee: 249
  },
  {
    id: "income",
    name: "Income Certificate",
    icon: "💰",
    category: "Financial Certificates",
    description: "Guidance and documentation support for obtaining an income certificate.",
    documents: ["Identity proof", "Address proof", "Income declaration", "Passport-size photograph"],
    eta: "5–10 working days",
    fee: 199
  },
  {
    id: "caste",
    name: "Caste Certificate",
    icon: "📄",
    category: "Personal Certificates",
    description: "Assistance with caste certificate applications and supporting documents.",
    documents: ["Identity proof", "Address proof", "Family caste proof", "Passport-size photograph"],
    eta: "7–15 working days",
    fee: 299
  },
  {
    id: "domicile",
    name: "Domicile Certificate",
    icon: "🏠",
    category: "Residence Certificates",
    description: "Documentation guidance for domicile and residence certificate applications.",
    documents: ["Identity proof", "Residence proof", "Birth proof", "Passport-size photograph"],
    eta: "5–12 working days",
    fee: 249
  },
  {
    id: "pan",
    name: "PAN Services",
    icon: "💳",
    category: "Identity Services",
    description: "Guidance for PAN application, correction and related documentation.",
    documents: ["Identity proof", "Address proof", "Date of birth proof", "Photograph"],
    eta: "5–10 working days",
    fee: 199
  },
  {
    id: "aadhaar",
    name: "Aadhaar Assistance",
    icon: "🪪",
    category: "Identity Services",
    description: "Guidance on Aadhaar-related processes and locating authorized service centres.",
    documents: ["Relevant identity or enrolment information as required by the authorized centre"],
    eta: "Depends on authorized centre",
    fee: 149
  }
];

export const seedRequests = [
  {
    id: "CS-1001",
    citizen: "Demo Citizen",
    email: "citizen@demo.com",
    serviceId: "income",
    serviceName: "Income Certificate",
    status: "Submitted",
    agent: null,
    location: "Hyderabad",
    notes: "Need assistance with the application.",
    documents: [],
    assistanceFee: 199,
    createdAt: "2026-11-08"
  },
  {
    id: "CS-1002",
    citizen: "Demo Citizen",
    email: "citizen@demo.com",
    serviceId: "domicile",
    serviceName: "Domicile Certificate",
    status: "Assigned",
    agent: "Demo Agent",
    location: "Hyderabad",
    notes: "Require documentation guidance.",
    documents: [],
    assistanceFee: 249,
    createdAt: "2026-11-09"
  },
  {
    id: "CS-1003",
    citizen: "Asha Rao",
    email: "asha@example.com",
    serviceId: "birth",
    serviceName: "Birth Certificate",
    status: "Completed",
    agent: "Demo Agent",
    location: "Secunderabad",
    notes: "Sample completed request.",
    documents: [],
    assistanceFee: 249,
    createdAt: "2026-11-01"
  }
];

export const seedAgents = [
  {
    id: "AG-001",
    name: "Demo Agent",
    email: "agent@demo.com",
    phone: "9000000001",
    area: "Hyderabad",
    status: "Verified"
  },
  {
    id: "AG-002",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9000000002",
    area: "Secunderabad",
    status: "Pending"
  }
];

export const seedCitizens = [
  {
    name: "Demo Citizen",
    email: "citizen@demo.com"
  },
  {
    name: "Asha Rao",
    email: "asha@example.com"
  }
];