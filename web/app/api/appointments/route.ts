import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { Appointment } from '../../../lib/models/Appointment';
import { User } from '../../../lib/models/User';
import { Pet } from '../../../lib/models/Pet';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const ownerId = searchParams.get('ownerId');

    if (!ownerId) {
      return NextResponse.json({ error: 'ownerId is required' }, { status: 400 });
    }

    const appointments = await Appointment.find({ ownerId }).sort({ scheduledAt: -1 }).lean();
    
    const formatted = appointments.map(a => ({ ...a, id: (a as any)._id.toString() }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // The frontend sends mocked string IDs. Resolve them to real ObjectIds.
    if (typeof data.ownerId === 'string' && data.ownerId.startsWith('user_')) {
      const phone = data.ownerId.replace('user_', '');
      let user = await User.findOne({ phone });
      if (!user) {
        user = await User.create({
          name: 'Guest Booking User',
          email: `guest_${phone}@example.com`,
          phone: phone,
          role: 'pet_owner'
        });
      }
      data.ownerId = user._id;

      if (typeof data.petId === 'string' && data.petId.startsWith('pet_')) {
        const petName = data.petId.replace('pet_', '');
        let pet = await Pet.findOne({ ownerId: user._id, petName });
        if (!pet) {
          pet = await Pet.create({
            ownerId: user._id,
            ownerName: user.name,
            ownerPhone: user.phone,
            ownerEmail: user.email,
            petName: petName,
            species: 'dog', // Default for fast booking form
            breed: 'Unknown',
            age: 1,
            weight: 1
          });
        }
        data.petId = pet._id;
      }
    }

    const doc = await Appointment.create(data);
    const appointment = doc.toObject();

    return NextResponse.json({ ...appointment, id: (appointment as any)._id.toString() }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
