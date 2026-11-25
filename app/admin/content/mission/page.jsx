import { MissionContentForm } from "@/components/admin/mission-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";

export default async function AdminMissionContentPage() {
 const missionVision = await getAdminContentBlock("missionVision");

 return <MissionContentForm initial={missionVision} />;
}