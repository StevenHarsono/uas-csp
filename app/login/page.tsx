import { login } from "@/actions/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">Login</h1>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:border-black focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-black hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
