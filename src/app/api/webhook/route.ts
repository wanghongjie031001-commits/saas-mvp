import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const eventName = (body as any).meta?.event_name as string | undefined;

  if (eventName !== 'order_created') {
    return NextResponse.json({ success: true, message: 'Event ignored' }, { status: 200 });
  }

  const orderId = (body as any).meta?.id as string | undefined;
  const userEmail = ((body as any).data?.attributes as Record<string, unknown> | undefined)?.user_email as string | undefined;

  if (!orderId || !userEmail) {
    console.log('Missing required fields: orderId or email');
    return NextResponse.json({ error: 'Missing order ID or email' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({ order_id: orderId, user_email: userEmail });

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: 'Failed to insert order' }, { status: 500 });
  }

  console.log(`Order ${orderId} for ${userEmail} inserted successfully`);
  return NextResponse.json({ success: true }, { status: 200 });
}
