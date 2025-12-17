"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/home");
}

export async function saveProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // ambil user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const nik = formData.get("nik") as string;
  const photo = formData.get("photo") as File | null;

  let photo_url: string | null = null;

  // 1. upload foto kalau ada
  if (photo && photo.size > 0) {
    const fileExt = photo.name.split(".").pop();
    const filePath = `${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, photo, { upsert: true });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    photo_url = data.publicUrl;
  }

  // 2. cek apakah profile sudah ada
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  const payload = {
    id: user.id,
    name,
    address,
    nik,
    ...(photo_url && { photo_url }),
    updated_at: new Date().toISOString(),
  };

  // 3. insert atau update
  if (existingProfile) {
    const { error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", user.id);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase.from("profiles").insert(payload);
    if (error) {
      throw new Error(error.message);
    }
  }

  redirect("/home");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
