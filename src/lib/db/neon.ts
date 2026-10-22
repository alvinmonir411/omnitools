import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || '';

export const isDatabaseConfigured = Boolean(connectionString && connectionString.startsWith('postgres'));

export const sql = isDatabaseConfigured ? neon(connectionString) : null;

export interface ShareableCalculation {
  id: string;
  toolSlug: string;
  data: Record<string, unknown>;
  createdAt: string;
}

export interface UserFeedback {
  id: string;
  toolSlug: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

/**
 * Ensures required tables exist when DATABASE_URL is provided
 */
export async function initDatabaseSchema() {
  if (!sql) return false;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS shared_calculations (
        id VARCHAR(64) PRIMARY KEY,
        tool_slug VARCHAR(64) NOT NULL,
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS user_feedback (
        id VARCHAR(64) PRIMARY KEY,
        tool_slug VARCHAR(64) NOT NULL,
        rating INT NOT NULL,
        comment TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return true;
  } catch (err) {
    console.warn('Neon DB schema init deferred:', (err as Error).message);
    return false;
  }
}
