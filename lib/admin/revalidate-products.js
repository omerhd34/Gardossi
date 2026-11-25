import { revalidatePath } from "next/cache";

export function revalidateProductPages() {
 revalidatePath("/", "layout");
 revalidatePath("/urunler", "layout");
}