import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import { Pet } from '../../../../lib/models/Pet';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ownerId: string }> } // In Next.js 15, route params can be a Promise
) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { ownerId } = resolvedParams;

    const pet = await Pet.findOne({ ownerId }).lean();

    if (!pet) {
      return NextResponse.json({ error: 'Pet profile not found' }, { status: 404 });
    }

    return NextResponse.json({ ...pet, id: (pet as any)._id.toString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
