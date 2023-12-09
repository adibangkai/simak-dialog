"use server";

import * as auth from "@/utils/auth";

export async function signOut() {
  return auth.signOut();
}
