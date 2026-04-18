import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { User } from '../../../lib/models/User';
import { MOCK_VOLUNTEERS } from '../../../lib/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zone = searchParams.get('zone')?.toLowerCase();
    const countOnly = searchParams.get('countOnly');

    let volunteers: any[] = [];
    let count = 0;
    let dbConnected = false;

    try {
      if (process.env.MONGODB_URI) {
        await dbConnect();
        dbConnected = true;
      }
    } catch (e) {
      console.warn('DB connection failed, falling back to mock data', e);
    }

    if (dbConnected) {
      const query: any = { role: { $in: ['volunteer', 'vet'] }, isActive: true };
      if (zone) {
        query['location.zone'] = { $regex: new RegExp(zone, 'i') };
      }

      count = await User.countDocuments(query);
      if (count > 0) {
        if (countOnly === 'true') {
          const samples = await User.find(query).limit(5).select('id name avatar rating servicesOffered isActive').lean();
          return NextResponse.json({
            total: count,
            zone: zone || 'All',
            volunteers: samples.map(v => ({ ...v, id: (v as any)._id.toString() }))
          });
        }

        const dbVolunteers = await User.find(query).lean();
        return NextResponse.json(dbVolunteers.map(v => ({ ...v, id: (v as any)._id.toString() })));
      }
    }

    // Fallback to mock data
    let filteredMocks = MOCK_VOLUNTEERS;
    if (zone) {
      filteredMocks = filteredMocks.filter(v => v.location.zone.toLowerCase().includes(zone));
    }

    if (countOnly === 'true') {
      return NextResponse.json({
        total: filteredMocks.length,
        zone: zone || 'All',
        volunteers: filteredMocks.slice(0, 5)
      });
    }

    return NextResponse.json(filteredMocks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
