import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { Pet } from '../../../lib/models/Pet';
import { User } from '../../../lib/models/User';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Ensure we have a real MongoDB User to link as the ownerId
    if (data.ownerPhone) {
      let user = await User.findOne({ phone: data.ownerPhone });
      if (!user) {
        user = await User.create({
          name: data.ownerName || 'Guest User',
          email: data.ownerEmail || `guest_${data.ownerPhone}@example.com`,
          phone: data.ownerPhone,
          role: 'pet_owner'
        });
      }
      data.ownerId = user._id.toString();
    }
    
    let pet;
    if (data.id) {
      pet = await Pet.findByIdAndUpdate(data.id, data, { new: true, upsert: true }).lean();
    } else {
      const doc = await Pet.create(data);
      pet = doc.toObject();
    }

    return NextResponse.json({ ...pet, id: (pet as any)._id.toString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

