"use server";

import { signIn } from "@/auth";

export async function authenticate(email: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: email,
      password,
      // callbackUrl:"/",
      redirect: false,
    });
    return r;
  } catch (error) {
    return "error vaildation";
  }
}
