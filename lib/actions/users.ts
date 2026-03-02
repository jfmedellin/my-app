"use server"

import { supabase } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }

  return data || [];
}

export async function createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select()
    .single();

  if (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }

  revalidatePath("/");
  return data;
}

export async function updateUser(id: number, userData: Partial<Omit<User, "id" | "created_at" | "updated_at">>): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }

  revalidatePath("/");
  return data;
}

export async function deleteUser(id: number): Promise<void> {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }

  revalidatePath("/");
}
