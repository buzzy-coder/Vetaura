// ============================================================
// Vetaura — API Utility Layer
// Stubs ready for PostgreSQL (Prisma) or MongoDB (Mongoose)
// Replace mock returns with real DB/API calls
// ============================================================

import {
  Volunteer,
  PetProfile,
  MedicalRecord,
  Appointment,
  AppointmentRequest,
  ActiveVolunteersResponse,
} from './types';
import {
  MOCK_VOLUNTEERS,
  MOCK_PET,
  MOCK_MEDICAL_RECORDS,
  ACTIVE_VOLUNTEER_COUNT,
} from './mockData';

// Base URL — set via environment variable in production
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

// ----------------------------------------------------------
// Volunteer APIs
// ----------------------------------------------------------

/**
 * Fetch all active volunteers, optionally filtered by zone.
 * TODO: Replace with `fetch(`${BASE_URL}/api/volunteers?zone=${zone}`)` + DB query
 */
export async function getActiveVolunteers(zone?: string): Promise<Volunteer[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 300));
  if (zone) {
    return MOCK_VOLUNTEERS.filter(
      (v) => v.isActive && v.location.zone.toLowerCase() === zone.toLowerCase()
    );
  }
  return MOCK_VOLUNTEERS.filter((v) => v.isActive);
}

/**
 * Get the count of active volunteers in Bhubaneswar right now.
 * TODO: Replace with realtime DB query or WebSocket subscription
 */
export async function getActiveVolunteerCount(): Promise<ActiveVolunteersResponse> {
  await new Promise((r) => setTimeout(r, 200));
  return {
    total: ACTIVE_VOLUNTEER_COUNT,
    zone: 'Bhubaneswar',
    volunteers: MOCK_VOLUNTEERS.filter((v) => v.isActive).map((v) => ({
      id: v.id,
      name: v.name,
      avatar: v.avatar,
      rating: v.rating,
      servicesOffered: v.servicesOffered,
      isActive: v.isActive,
    })),
  };
}

// ----------------------------------------------------------
// Pet Profile APIs
// ----------------------------------------------------------

/**
 * Fetch a pet profile by owner ID.
 * TODO: `SELECT * FROM pets WHERE owner_id = $1` (PostgreSQL)
 *        or `PetModel.findOne({ ownerId })` (MongoDB)
 */
export async function getPetProfile(ownerId: string): Promise<PetProfile | null> {
  await new Promise((r) => setTimeout(r, 300));
  if (ownerId === 'owner1') return MOCK_PET;
  return null;
}

/**
 * Create or update a pet profile.
 * TODO: Upsert into `pets` table / collection
 */
export async function upsertPetProfile(
  data: Omit<PetProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<PetProfile> {
  await new Promise((r) => setTimeout(r, 500));
  return {
    ...data,
    id: `p_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// ----------------------------------------------------------
// Medical Record APIs
// ----------------------------------------------------------

/**
 * Fetch all medical records for a pet.
 * TODO: `SELECT * FROM medical_records WHERE pet_id = $1 ORDER BY date DESC`
 */
export async function getMedicalRecords(petId: string): Promise<MedicalRecord[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_MEDICAL_RECORDS.filter((r) => r.petId === petId);
}

/**
 * Add a new medical record.
 * TODO: `INSERT INTO medical_records (...) VALUES (...)`
 */
export async function addMedicalRecord(
  data: Omit<MedicalRecord, 'id' | 'createdAt'>
): Promise<MedicalRecord> {
  await new Promise((r) => setTimeout(r, 400));
  return {
    ...data,
    id: `mr_${Date.now()}`,
    createdAt: new Date(),
  };
}

// ----------------------------------------------------------
// Appointment / Booking APIs
// ----------------------------------------------------------

/**
 * Book a vet appointment or volunteer service.
 * TODO: POST to `/api/appointments` → INSERT into `appointments` table
 */
export async function bookAppointment(data: AppointmentRequest): Promise<Appointment> {
  await new Promise((r) => setTimeout(r, 600));
  const appointment: Appointment = {
    id: `apt_${Date.now()}`,
    type: data.type,
    petId: data.petId,
    ownerId: data.ownerId,
    volunteerId: data.volunteerId,
    serviceType: data.serviceType,
    status: 'pending',
    scheduledAt: new Date(data.scheduledAt),
    address: data.address,
    notes: data.notes,
    createdAt: new Date(),
  };
  console.log('[Vetaura] Appointment booked:', appointment);
  return appointment;
}

/**
 * Fetch all appointments for a pet owner.
 * TODO: `SELECT * FROM appointments WHERE owner_id = $1`
 */
export async function getAppointments(ownerId: string): Promise<Appointment[]> {
  await new Promise((r) => setTimeout(r, 300));
  return [];
}
