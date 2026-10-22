import { NextRequest, NextResponse } from 'next/server';
import { sql, isDatabaseConfigured, initDatabaseSchema } from '@/lib/db/neon';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolSlug, rating, comment } = body;

    if (!toolSlug || !rating) {
      return NextResponse.json({ error: 'toolSlug and rating are required' }, { status: 400 });
    }

    const id = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (isDatabaseConfigured && sql) {
      await initDatabaseSchema();
      await sql`
        INSERT INTO user_feedback (id, tool_slug, rating, comment)
        VALUES (${id}, ${toolSlug}, ${rating}, ${comment || null})
      `;
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || 'Failed to submit feedback' },
      { status: 500 },
    );
  }
}
