import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { User } from '../../../lib/models/User';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const zone = searchParams.get('zone');
    const countOnly = searchParams.get('countOnly');

    const query: any = { role: { $in: ['volunteer', 'vet'] }, isActive: true };
    if (zone) {
      // Use partial match, case insensitive
      query['location.zone'] = { $regex: new RegExp(zone, 'i') };
    }

    if (countOnly === 'true') {
      const count = await User.countDocuments(query);
      
      // Get a few sample active volunteers
      const samples = await User.find(query).limit(5).select('id name avatar rating servicesOffered isActive');
      
      return NextResponse.json({
        total: count,
        zone: zone || 'All',
        volunteers: samples
      });
    }

    const volunteers = await User.find(query).lean();
    
    // Transform _id to id for frontend compatibility
    const formatted = volunteers.map(v => ({...v, id: (v as any)._id.toString()}));
    
    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
