// ============================================================
// Vetaura — Mock Data
// Replace with real DB calls via lib/api.ts
// ============================================================

import { Volunteer, PetProfile, MedicalRecord } from './types';

export const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    id: 'v1',
    name: 'Priya Mohanty',
    avatar: '/avatars/priya.jpg',
    bio: 'Dog lover with 4 years of experience in walking and grooming.',
    rating: 4.9,
    totalReviews: 87,
    servicesOffered: ['walking', 'grooming', 'sitting'],
    location: {
      lat: 20.2961,
      lng: 85.8245,
      address: 'Saheed Nagar, Bhubaneswar',
      zone: 'Saheed Nagar',
    },
    isActive: true,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    hourlyRate: 200,
    totalJobsCompleted: 134,
    verifiedAt: new Date('2024-01-15'),
    createdAt: new Date('2023-11-01'),
  },
  {
    id: 'v2',
    name: 'Rajan Patel',
    avatar: '/avatars/rajan.jpg',
    bio: 'Certified pet trainer and sitter. Specialises in anxious dogs.',
    rating: 4.8,
    totalReviews: 52,
    servicesOffered: ['sitting', 'training', 'walking'],
    location: {
      lat: 20.3543,
      lng: 85.8193,
      address: 'Patia, Bhubaneswar',
      zone: 'Patia',
    },
    isActive: true,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat', 'Sun'],
    hourlyRate: 250,
    totalJobsCompleted: 89,
    verifiedAt: new Date('2024-03-10'),
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'v3',
    name: 'Ananya Das',
    avatar: '/avatars/ananya.jpg',
    bio: 'Vet student passionate about cat care and small animals.',
    rating: 4.7,
    totalReviews: 41,
    servicesOffered: ['grooming', 'sitting'],
    location: {
      lat: 20.2501,
      lng: 85.8349,
      address: 'Khandagiri, Bhubaneswar',
      zone: 'Khandagiri',
    },
    isActive: false,
    availableDays: ['Sat', 'Sun'],
    hourlyRate: 180,
    totalJobsCompleted: 58,
    createdAt: new Date('2024-02-05'),
  },
];

export const MOCK_PET: PetProfile = {
  id: 'p1',
  ownerName: 'Aarav Sharma',
  ownerPhone: '+91 98765 43210',
  ownerEmail: 'aarav@example.com',
  petName: 'Bruno',
  species: 'dog',
  breed: 'Golden Retriever',
  age: 24,
  weight: 28.5,
  vaccinations: ['Rabies', 'Distemper', 'Parvovirus', 'Leptospirosis'],
  medicalHistory: [],
  notes: 'Loves swimming. Allergic to chicken.',
  createdAt: new Date('2023-06-01'),
  updatedAt: new Date('2024-12-01'),
};

export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'mr1',
    petId: 'p1',
    date: new Date('2024-11-15'),
    vetName: 'Dr. Subrata Nanda',
    clinic: 'PawCare Veterinary Clinic',
    clinicAddress: 'Jaydev Vihar, Bhubaneswar',
    type: 'vaccination',
    treatment: 'Annual booster shot administered',
    medications: ['DHPPiL vaccine'],
    notes: 'Next due in 12 months. Pet is in excellent health.',
    nextDueDate: new Date('2025-11-15'),
    cost: 800,
    createdAt: new Date('2024-11-15'),
  },
  {
    id: 'mr2',
    petId: 'p1',
    date: new Date('2024-09-02'),
    vetName: 'Dr. Subrata Nanda',
    clinic: 'PawCare Veterinary Clinic',
    type: 'deworming',
    treatment: 'Oral deworming tablet administered',
    medications: ['Albendazole 400mg'],
    notes: 'Routine deworming. No issues found.',
    nextDueDate: new Date('2025-03-02'),
    cost: 300,
    createdAt: new Date('2024-09-02'),
  },
];

export const EDUCATION_TIPS = [
  {
    id: 'tip1',
    emoji: '💉',
    title: 'Vaccination Schedule',
    body: 'In India, puppies need DHP vaccines at 6, 8, and 12 weeks. Don\'t skip — parvovirus is rampant in monsoon months.',
    tag: 'Health',
  },
  {
    id: 'tip2',
    emoji: '🌧️',
    title: 'Monsoon Paw Care',
    body: 'Always wipe your pet\'s paws after walks during monsoon. Leptospirosis from muddy water is a real risk in Bhubaneswar.',
    tag: 'Seasonal',
  },
  {
    id: 'tip3',
    emoji: '🥗',
    title: 'Indian Diet Tips',
    body: 'Cooked rice with boiled chicken is fine, but avoid onion, garlic, and too many spices. Curd is a great probiotic for dogs.',
    tag: 'Nutrition',
  },
  {
    id: 'tip4',
    emoji: '🌞',
    title: 'Summer Heat Safety',
    body: 'Odisha summers can hit 45°C. Walk dogs before 8am or after 7pm. Carry water and avoid hot asphalt — it burns paw pads!',
    tag: 'Seasonal',
  },
  {
    id: 'tip5',
    emoji: '🐛',
    title: 'De-worming Routine',
    body: 'Deworm puppies every 15 days until 3 months, then monthly till 6 months. After that, once every 3 months for adults.',
    tag: 'Health',
  },
  {
    id: 'tip6',
    emoji: '✂️',
    title: 'Grooming Basics',
    body: 'Brush your dog 3x a week to prevent matting. Cats are self-groomers but still need nail trims every 4–6 weeks.',
    tag: 'Grooming',
  },
  {
    id: 'tip7',
    emoji: '🏥',
    title: 'Emergency Signs',
    body: 'Watch for: refusal to eat for 24h+, laboured breathing, pale gums, or seizures. Bhubaneswar has 4 emergency vets open 24/7.',
    tag: 'Emergency',
  },
  {
    id: 'tip8',
    emoji: '🐾',
    title: 'First Pet Checklist',
    body: 'Before bringing a pet home: vet appointment, collar + ID tag, food & water bowls, a safe space, and pet-proof your home.',
    tag: 'Beginner',
  },
];

export const ACTIVE_VOLUNTEER_COUNT = 24;

export const USER_LOCATION = {
  lat: 20.2961,
  lng: 85.8245,
  name: 'Aarav',
  address: 'Bhubaneswar',
};

export const MOCK_MARKETPLACES = [
  {
    id: 'm1',
    lat: 20.3011,
    lng: 85.8205,
    type: 'Clinic',
    name: 'Paws & Claws Vet',
    description: 'Full service vet clinic.',
  },
  {
    id: 'm2',
    lat: 20.2861,
    lng: 85.8345,
    type: 'Grooming',
    name: 'Fluffy Pet Spa',
    description: 'Premium pet grooming.',
  },
];
