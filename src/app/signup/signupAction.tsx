"use server";

import { redirect } from "next/navigation";



export default async function signupAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get the data off the form
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  

  
  //  Send to our api route
  const response = await fetch("http://localhost:3000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await response.json();

  // Redirect to login if success
  if (response.ok) {
    
    alert("Signed up successfully!Redirect to Sign In Page");
    redirect("/signin");
  } else {
    return json.error;
  }
}