import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Simple query to keep database active
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    console.log(`[${new Date().toISOString()}] Database keepalive: ${count} products`);

    return NextResponse.json({
      success: true,
      message: 'Database keepalive successful',
      timestamp: new Date().toISOString(),
      productCount: count,
    });
  } catch (error: any) {
    console.error('Keepalive error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
