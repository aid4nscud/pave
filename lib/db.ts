import { Pool } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const rawUrl = process.env.DATABASE_URL.trim();
  const redact = (v: string) => {
    try {
      const u = new URL(v);
      if (u.password) u.password = "***";
      return u.toString();
    } catch {
      return v.replace(/(postgres(?:ql)?:\/\/[^:]*):[^@]*@/i, "$1:***@");
    }
  };
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    console.error("invalid_database_url", { url: redact(rawUrl) });
    throw new Error("DATABASE_URL is invalid");
  }
  if (!parsedUrl.protocol || !["postgres:", "postgresql:"].includes(parsedUrl.protocol)) {
    console.error("invalid_database_url_protocol", { url: redact(rawUrl) });
    throw new Error("DATABASE_URL must use postgres:// or postgresql:// protocol");
  }
  if (!parsedUrl.hostname) {
    console.error("invalid_database_url_hostname", { url: redact(rawUrl) });
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


