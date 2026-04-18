import mongoose, { Schema, Document, Model } from 'mongoose';
import { PetSpecies, ServiceType, MedicalType, AppointmentStatus } from '../types';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'pet_owner' | 'volunteer' | 'vet';
  avatar?: string;
  phone?: string;
  
  // Volunteer / Vet specific fields
  bio?: string;
  rating?: number;
  totalReviews?: number;
  servicesOffered?: ServiceType[];
  location?: {
    lat: number;
    lng: number;
    address: string;
    zone: string;
  };
  isActive?: boolean;
  availableDays?: string[];
  hourlyRate?: number;
  totalJobsCompleted?: number;
  verifiedAt?: Date;

  assignedCaretaker?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['pet_owner', 'volunteer', 'vet'], required: true },
    avatar: { type: String },
    phone: { type: String },

    bio: { type: String },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    servicesOffered: [{ type: String }],
    location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
      zone: { type: String }
    },
    isActive: { type: Boolean, default: false },
    availableDays: [{ type: String }],
    hourlyRate: { type: Number },
    totalJobsCompleted: { type: Number, default: 0 },
    verifiedAt: { type: Date },
    
    assignedCaretaker: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
