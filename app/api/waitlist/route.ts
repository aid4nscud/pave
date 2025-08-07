import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  let email = "";
  let body: Record<string, string> = {};

  if (contentType.includes("application/json")) {
    body = await req.json();
    email = body.email || "";
  } else {
    const form = await req.formData();
    email = String(form.get("email") || "");
    form.forEach((v, k) => (body[k] = String(v)));
  }

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
        body.city || "",
        body.segment || "",
        body.timeline || "",
        body && Object.keys(body).length ? body : null,
      ]
    );
    return NextResponse.json({ ok: true, id: rows[0]?.id });
  } catch (e) {
    console.error("waitlist_insert_error", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}


