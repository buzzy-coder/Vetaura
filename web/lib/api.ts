// ============================================================
// Vetaura — API Utility Layer (MongoDB Backed)
// ============================================================

import {
  Volunteer,
  PetProfile,
  MedicalRecord,
  Appointment,
  AppointmentRequest,
  ActiveVolunteersResponse,
} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

// ----------------------------------------------------------
// Volunteer APIs
// ----------------------------------------------------------

export async function getActiveVolunteers(zone?: string): Promise<Volunteer[]> {
  const url = zone ? `${BASE_URL}/api/volunteers?zone=${encodeURIComponent(zone)}` : `${BASE_URL}/api/volunteers`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch active volunteers');
  return res.json();
}

export async function getActiveVolunteerCount(): Promise<ActiveVolunteersResponse> {
  const res = await fetch(`${BASE_URL}/api/volunteers?countOnly=true`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch active volunteer count');
  return res.json();
}

export async function getUserProfile(phone: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/api/users/me?phone=${phone}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
}

export async function getPetProfile(ownerId: string): Promise<PetProfile> {
  const res = await fetch(`${BASE_URL}/api/pets/${ownerId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch pet profile');
  return res.json();
}

// ----------------------------------------------------------
// Pet Profile APIs
// ----------------------------------------------------------

export async function upsertPetProfile(
  data: Omit<PetProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<PetProfile> {
  const res = await fetch(`${BASE_URL}/api/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to upsert pet profile');
  return res.json();
}

// ----------------------------------------------------------
// Medical Record APIs
// ----------------------------------------------------------

export async function getMedicalRecords(petId: string): Promise<MedicalRecord[]> {
  const res = await fetch(`${BASE_URL}/api/medical-records?petId=${petId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch medical records');
  return res.json();
}

export async function addMedicalRecord(
  data: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>
): Promise<MedicalRecord> {
  const res = await fetch(`${BASE_URL}/api/medical-records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add medical record');
  return res.json();
}

// ----------------------------------------------------------
// Appointment / Booking APIs
// ----------------------------------------------------------

export async function bookAppointment(data: AppointmentRequest): Promise<Appointment> {
  const res = await fetch(`${BASE_URL}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to book appointment');
  const appointment = await res.json();
  console.log('[Vetaura] Appointment booked:', appointment);
  return appointment;
}

export async function getAppointments(ownerId: string): Promise<Appointment[]> {
  const res = await fetch(`${BASE_URL}/api/appointments?ownerId=${ownerId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch appointments');
  return res.json();
}

export async function assignCaretaker(phone: string, caretakerId: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/api/users/assign-caretaker`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, caretakerId }),
  });
  if (!res.ok) throw new Error('Failed to assign caretaker');
  return res.json();
}


