"use server";

import { signIn } from "@/auth";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username,
      password,
      // callbackUrl:"/",
      redirect: false,
    });
    return r;
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return { error: (error as any).type, code: 1 };
    }
    if ((error as any).name === "IsActiveError") {
      return { error: (error as any).type, code: 2 };
    }
    return "error vaildation";
  }
}
