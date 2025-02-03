import HomePage from "@/features/homePage/components/HomePage";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase.from("rewards").select("*");
  console.log(data, error);
  return (
    <HomePage />
  );
}
