import mongoose, { Schema, Document, Model } from 'mongoose';
import { MedicalType } from '../types';

export interface IMedicalRecord extends Document {
  petId: mongoose.Types.ObjectId;
  vetName: string;
  clinic: string;
  clinicAddress?: string;
  date: Date;
  type: MedicalType;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  notes: string;
  nextDueDate?: Date;
  attachments?: string[];
  cost?: number;

  createdAt: Date;
  updatedAt: Date;
}

const MedicalRecordSchema = new Schema<IMedicalRecord>(
  {
    petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    date: { type: Date, required: true },
    vetName: { type: String, required: true },
    clinic: { type: String, required: true },
    clinicAddress: { type: String },
    type: { type: String, enum: ['vaccination', 'deworming', 'sterilization', 'checkup', 'surgery'], required: true },
    diagnosis: { type: String },
    treatment: { type: String },
    medications: [{ type: String }],
    notes: { type: String, required: true },
    nextDueDate: { type: Date },
    attachments: [{ type: String }],
    cost: { type: Number }
  },
  { timestamps: true }
);

export const MedicalRecord = (mongoose.models.MedicalRecord as Model<IMedicalRecord>) || mongoose.model<IMedicalRecord>('MedicalRecord', MedicalRecordSchema);
