import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { logout } from "@/actions/auth";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  // 1. Ambil user login
  const { data: authData } = await supabase.auth.getUser();

  const {data: announcements} = await supabase.from('announcements').select('*')

  console.log('Announcements data:', announcements)
  if (!authData.user) {
    redirect("/login");
  }

  const user = authData.user;

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* USER PROFILE CARD */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* PHOTO */}
        <img
          src={user.user_metadata?.avatar_url ?? "/default-profile.jpg"}
          alt="Profile Photo"
          className="w-full h-52 object-cover"
        />

        {/* CONTENT */}
        <div className="p-6 space-y-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            {user.email || "Email not set"}
          </h1>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium text-gray-700">User ID:</span>{" "}
              {user.id}
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {user.phone || "Not provided"}
            </p>
          </div>

          <div className="pt-2 text-xs text-gray-400 space-y-1">
            <p>
              Created at:{" "}
              {user.created_at
                ? new Date(user.created_at).toLocaleString()
                : "-"}
            </p>
            <p>
              Last sign in:{" "}
              {user.last_sign_in_at
                ? new Date(user.last_sign_in_at).toLocaleString()
                : "-"}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-4 space-y-2">
            <form action="/profile">
              <button
                type="submit"
                className="w-full rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>
            </form>

            <form action={logout}>
              <button
                type="submit"
                className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
        </div>

        {/* ANNOUNCEMENTS SECTION */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Announcements</h2>
          
          {announcements && announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement: any) => (
                <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {announcement.created_at ? new Date(announcement.created_at).toLocaleDateString() : ''}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No announcements available</p>
          )}
        </div>
      </div>
    </main>
  );
}
