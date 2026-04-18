import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import { MedicalRecord } from '../../../lib/models/MedicalRecord';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const petId = searchParams.get('petId');

    if (!petId) {
      return NextResponse.json({ error: 'petId is required' }, { status: 400 });
    }

    const records = await MedicalRecord.find({ petId }).sort({ date: -1 }).lean();
    
    const formatted = records.map(r => ({ ...r, id: (r as any)._id.toString() }));
    
    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    const record = await MedicalRecord.create(data);

    return NextResponse.json({ ...record.toObject(), id: record._id.toString() }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
