import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { saveProfile } from "@/actions/auth";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();

  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Edit Profile
        </h1>

        <form action={saveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              placeholder="Your name"
              defaultValue={profile?.name ?? ""}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              name="address"
              placeholder="Your address"
              defaultValue={profile?.address ?? ""}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIK
            </label>
            <input
              name="nik"
              placeholder="Your NIK"
              defaultValue={profile?.nik ?? ""}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Photo
            </label>
            <input
              type="file"
              name="photo"
              className="mt-1 w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
