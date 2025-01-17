import { notFound, redirect } from "next/navigation";

import { getSupabaseServerClient } from "@/lib/supabase/server";

const MyPage = async () => {
  const supabase = await getSupabaseServerClient();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  console.log(sessionData, sessionError);
  if (!sessionData.session?.user?.id) redirect("/login");
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", sessionData.session.user.id).single();
  console.log(data, error);
  if (!data) notFound();
  return (
    <div>
      MyPage
      <div>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default MyPage;
