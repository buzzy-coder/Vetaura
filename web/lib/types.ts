// ============================================================
// Vetaura — TypeScript Interfaces (DB-Ready)
// Ready for PostgreSQL (via Prisma) or MongoDB (via Mongoose)
// ============================================================

export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
export type ServiceType = 'walking' | 'grooming' | 'sitting' | 'training';
export type MedicalType = 'vaccination' | 'deworming' | 'sterilization' | 'checkup' | 'surgery';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

// ----------------------------------------------------------
// Pet Profile
// ----------------------------------------------------------
export interface PetProfile {
  id: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  petName: string;
  species: PetSpecies;
  breed: string;
  age: number; // in months
  weight: number; // in kg
  vaccinations: string[];
  medicalHistory: MedicalRecord[];
  profileImageUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------------------------------------------
// Volunteer / Caretaker
// ----------------------------------------------------------
export interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number; // 1–5
  totalReviews: number;
  servicesOffered: ServiceType[];
  location: {
    lat: number;
    lng: number;
    address: string;
    zone: string; // e.g. "Saheed Nagar", "Patia", "Khandagiri"
  };
  isActive: boolean;
  availableDays: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  hourlyRate: number; // in INR
  totalJobsCompleted: number;
  verifiedAt?: Date;
  createdAt: Date;
}

// ----------------------------------------------------------
// Medical Record
// ----------------------------------------------------------
export interface MedicalRecord {
  id: string;
  petId: string;
  date: Date;
  vetName: string;
  clinic: string;
  clinicAddress?: string;
  type: MedicalType;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  notes: string;
  nextDueDate?: Date;
  attachments?: string[]; // URLs to uploaded reports
  cost?: number; // in INR
  createdAt: Date;
}

// ----------------------------------------------------------
// Appointment / Booking
// ----------------------------------------------------------
export interface Appointment {
  id: string;
  type: 'vet' | 'volunteer';
  petId: string;
  ownerId: string;
  volunteerId?: string;
  vetName?: string;
  clinic?: string;
  serviceType?: ServiceType | MedicalType;
  status: AppointmentStatus;
  scheduledAt: Date;
  durationMinutes?: number;
  address: string;
  notes?: string;
  totalAmount?: number;
  createdAt: Date;
}

// ----------------------------------------------------------
// API Request/Response shapes
// ----------------------------------------------------------
export interface AppointmentRequest {
  petId: string;
  ownerId: string;
  type: 'vet' | 'volunteer';
  volunteerId?: string;
  serviceType: ServiceType | MedicalType;
  scheduledAt: string; // ISO date string
  address: string;
  notes?: string;
}

export interface ActiveVolunteersResponse {
  total: number;
  zone: string;
  volunteers: Pick<Volunteer, 'id' | 'name' | 'avatar' | 'rating' | 'servicesOffered' | 'isActive'>[];
}
