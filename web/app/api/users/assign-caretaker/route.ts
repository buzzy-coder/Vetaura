import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import { User } from '../../../../lib/models/User';

// PUT /api/users/assign-caretaker
export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { phone, caretakerId } = await request.json();

    if (!phone || !caretakerId) {
      return NextResponse.json({ error: 'Phone number and caretakerId are required.' }, { status: 400 });
    }

    // Since we don't have authentication, we find the user by their phone number
    let user = await User.findOne({ phone });

    // If user does not exist, we throw an error (or we could conditionally create them)
    // To maintain a clean logic, we will assume they must create a Pet Profile first to exist 
    // or we can lazily create them. Let's lazily create them to make the form frictionless.
    if (!user) {
      user = await User.create({
        name: 'Guest User',
        email: `guest_${phone}@example.com`,
        phone: phone,
        role: 'pet_owner'
      });
    }

    // Ensure the caretaker actually exists
    const caretaker = await User.findById(caretakerId);
    if (!caretaker) {
      return NextResponse.json({ error: 'Caretaker not found in the database.' }, { status: 404 });
    }

    // Assign the caretaker
    user.assignedCaretaker = caretaker._id;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Caretaker successfully assigned to your profile!',
      assignedCaretaker: caretaker.name
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
