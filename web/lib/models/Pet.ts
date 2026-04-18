import mongoose, { Schema, Document, Model } from 'mongoose';
import { PetSpecies } from '../types';

export interface IPet extends Document {
  ownerId: mongoose.Types.ObjectId;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  petName: string;
  species: PetSpecies;
  breed: string;
  age: number;
  weight: number;
  vaccinations: string[];
  profileImageUrl?: string;
  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const PetSchema = new Schema<IPet>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    petName: { type: String, required: true },
    species: { type: String, enum: ['dog', 'cat', 'bird', 'rabbit', 'other'], required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    vaccinations: [{ type: String }],
    profileImageUrl: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

export const Pet = (mongoose.models.Pet as Model<IPet>) || mongoose.model<IPet>('Pet', PetSchema);
