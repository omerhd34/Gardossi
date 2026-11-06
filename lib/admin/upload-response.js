export function getUploadErrorMessage(status, text, data, options = {}) {
 const raw = String(text ?? "").trim();
 const fallback = options.fallback ?? "Yükleme başarısız";
 const tooLarge =
  options.tooLarge ??
  "Görsel sunucunun kabul ettiği boyuttan büyük. Daha küçük bir dosya deneyin.";

 if (
  status === 413 ||
  /^request entity too large/i.test(raw) ||
  /^request en/i.test(raw)
 ) {
  return tooLarge;
 }

 if (data?.error) return data.error;
 return fallback;
}

export async function readJsonBody(response) {
 const text = await response.text();
 if (!text) return { text, data: null };

 try {
  return { text, data: JSON.parse(text) };
 } catch {
  return { text, data: null };
 }
}
