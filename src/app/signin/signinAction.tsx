"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signinAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get the data off the form
  const email = formData.get("email");
  const password = formData.get("password");

  //  Send to our api route
  const res = await fetch(process.env.ROOT_URL + "/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();
  const redirectTarget = json.redirect;

  cookies().set("Authorization", json.token, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
    path: "/",
    sameSite: "strict",
  });

  // Redirect to login if success
  if (res.ok) {
    redirect(redirectTarget);
  } else {
    return json.error;
  }
}