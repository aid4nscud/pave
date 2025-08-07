export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  let parsed: Record<string, string> = {};
  if (contentType.includes("application/json")) parsed = await req.json();
  else if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    const params = new URLSearchParams(text);
    params.forEach((v, k) => (parsed[k] = v));
  } else if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    form.forEach((v, k) => (parsed[k] = String(v)));
  } else {
    try {
      parsed = await req.json();
    } catch {
      const text = await req.text();
      const params = new URLSearchParams(text);
      params.forEach((v, k) => (parsed[k] = v));
    }
  }
  const email = String(parsed.email || "");

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    const pool = getPool();
    const { rows } = await pool.query(
      `insert into waitlist_leads (email, city, segment, timeline, payload)
       values ($1, nullif($2,''), nullif($3,''), nullif($4,''), $5)
       returning id`,
      [
        email.trim().toLowerCase(),
        parsed.city || "",
        parsed.segment || "",
        parsed.timeline || "",
        parsed && Object.keys(parsed).length ? parsed : null,
      ]
    );
    return NextResponse.json({ ok: true, id: rows[0]?.id });
  } catch (e) {
    console.error("waitlist_insert_error", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}


