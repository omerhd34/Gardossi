import { getAdminContentBlock } from "@/lib/content/queries";
import { normalizeInstagramHandle } from "@/lib/instagram-handle";
import { buildSiteContactFromFields } from "@/lib/site-contact-resolve";

function pickContactFields(content) {
 if (!content) return {};

 return {
  phone: content.phone,
  email: content.email,
  instagramHandle: normalizeInstagramHandle(
   content.instagramHandle ?? content.instagramUrl
  ),
  whatsappNumber: content.whatsappNumber,
 };
}

export async function getSiteContactSettings() {
 const contact = await getAdminContentBlock("contact");
 const fields = pickContactFields(contact?.contentTr);

 return buildSiteContactFromFields(fields);
}