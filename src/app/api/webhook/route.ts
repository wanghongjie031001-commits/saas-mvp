import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') || '';
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

    if (!secret) {
      return NextResponse.json({ error: '致命缺失：Webhook 安全密钥未配置' }, { status: 500 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      return NextResponse.json({ error: '拦截：非法伪造的支付请求' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;

    if (eventName === 'order_created') {
      const userEmail = payload.data.attributes.user_email;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; 
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase
        .from('orders')
        .upsert({ user_email: userEmail, status: 'paid' }, { onConflict: 'user_email' });

      if (error) {
        console.error('数据库落库异常:', error);
        return NextResponse.json({ error: '数据同步失败' }, { status: 500 });
      }
    }

    return NextResponse.json({ message: '自动化发货执行完毕' }, { status: 200 });
    
  } catch (error: any) {
    console.error('Webhook 级联故障:', error);
    return NextResponse.json({ error: '内部网关崩溃' }, { status: 500 });
  }
}