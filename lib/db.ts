import { Pool } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(process.env.DATABASE_URL);
  } catch {
    throw new Error("DATABASE_URL is invalid");
  }
  if (!parsedUrl.protocol || !["postgres:", "postgresql:"].includes(parsedUrl.protocol)) {
    throw new Error("DATABASE_URL must use postgres:// or postgresql:// protocol");
  }
  if (!parsedUrl.hostname) {
    throw new Error("DATABASE_URL is missing hostname");
  }
  if (!global.pgPool) {
    global.pgPool = new Pool({
      connectionString: parsedUrl.toString(),
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30_000,
    });
  }
  return global.pgPool;
}


