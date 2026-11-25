import { MissionCtaContentForm } from "@/components/admin/mission-cta-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";

export default async function AdminMissionCtaContentPage() {
 const missionVision = await getAdminContentBlock("missionVision");

 return <MissionCtaContentForm initial={missionVision} />;
}