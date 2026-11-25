import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/auth";

export class AdminAuthError extends Error {
 constructor(message = "Yetkisiz erişim") {
  super(message);
  this.name = "AdminAuthError";
  this.status = 401;
 }
}

export async function requireAdmin() {
 const cookieStore = await cookies();
 const token = cookieStore.get(SESSION_COOKIE)?.value;

 if (!verifySessionToken(token)) {
  throw new AdminAuthError();
 }
}

export function handleAdminError(error) {
 if (error instanceof AdminAuthError) {
  return Response.json({ error: error.message }, { status: error.status });
 }

 if (error?.code === "P2000") {
  return Response.json(
   { error: "Girilen metin çok uzun. Lütfen daha kısa bir ad kullanın." },
   { status: 400 }
  );
 }

 if (error?.code === "P2028" || error?.code === "P2034") {
  return Response.json(
   {
    error:
     "Kayıt işlemi zaman aşımına uğradı. Lütfen birkaç saniye sonra tekrar deneyin.",
   },
   { status: 503 }
  );
 }

 console.error("[admin]", error);
 return Response.json({ error: "Sunucu hatası" }, { status: 500 });
}
