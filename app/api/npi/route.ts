import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const npi = searchParams.get('number');

  if (!npi) {
    return NextResponse.json({ error: 'NPI number is required' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${npi}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch NPI registry' }, { status: 500 });
  }
}
