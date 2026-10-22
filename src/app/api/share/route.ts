import { NextRequest, NextResponse } from 'next/server';
import { sql, isDatabaseConfigured, initDatabaseSchema } from '@/lib/db/neon';

// In-memory fallback for local dev when DATABASE_URL is not set
const memoryStore = new Map<string, { toolSlug: string; data: Record<string, unknown>; createdAt: string }>();

function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolSlug, data } = body;

    if (!toolSlug || !data) {
      return NextResponse.json({ error: 'toolSlug and data are required' }, { status: 400 });
    }

    const id = generateId();
    const now = new Date().toISOString();

    if (isDatabaseConfigured && sql) {
      await initDatabaseSchema();
      await sql`
        INSERT INTO shared_calculations (id, tool_slug, data)
        VALUES (${id}, ${toolSlug}, ${JSON.stringify(data)})
      `;
    } else {
      memoryStore.set(id, { toolSlug, data, createdAt: now });
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || 'Failed to save calculation' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    if (isDatabaseConfigured && sql) {
      const rows = await sql`
        SELECT id, tool_slug, data, created_at FROM shared_calculations WHERE id = ${id} LIMIT 1
      `;
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Calculation not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, item: rows[0] });
    } else {
      const item = memoryStore.get(id);
      if (!item) {
        return NextResponse.json({ error: 'Calculation not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, item: { id, ...item } });
    }
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || 'Failed to fetch calculation' },
      { status: 500 },
    );
  }
}
