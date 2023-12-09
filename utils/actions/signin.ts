"use server";

import * as auth from "@/utils/auth";

export async function signIn() {
  return auth.signIn("github");
}
