import mongoose, { Schema, Document, Model } from 'mongoose';
import { ServiceType, MedicalType, AppointmentStatus } from '../types';

export interface IAppointment extends Document {
  type: 'vet' | 'volunteer';
  petId: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  volunteerId?: mongoose.Types.ObjectId;
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
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    type: { type: String, enum: ['vet', 'volunteer'], required: true },
    petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    volunteerId: { type: Schema.Types.ObjectId, ref: 'User' },
    vetName: { type: String },
    clinic: { type: String },
    serviceType: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], required: true, default: 'pending' },
    scheduledAt: { type: Date, required: true },
    durationMinutes: { type: Number },
    address: { type: String, required: true },
    notes: { type: String },
    totalAmount: { type: Number }
  },
  { timestamps: true }
);

export const Appointment = (mongoose.models.Appointment as Model<IAppointment>) || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
