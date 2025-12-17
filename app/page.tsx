import { createSupabaseServerClient } from "@/lib/supabase";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main>
      <h1>Supabase Connected</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
