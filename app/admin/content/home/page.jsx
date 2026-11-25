import { HomeContentForm } from "@/components/admin/home-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";

export default async function AdminHomeContentPage() {
 const [homeHero, homeBrandExperience, homeShowcase] = await Promise.all([
  getAdminContentBlock("homeHero"),
  getAdminContentBlock("homeBrandExperience"),
  getAdminContentBlock("homeShowcase"),
 ]);

 return (
  <HomeContentForm
   initialHero={homeHero}
   initialBrand={homeBrandExperience}
   initialShowcase={homeShowcase}
  />
 );
}