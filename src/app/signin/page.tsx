"use client";

import { useFormState } from "react-dom";
import signinAction from "./signinAction";

export default function Login() {
  const [error, formAction] = useFormState(signinAction, undefined);

  return (
    <div>
      <h1>Sign In</h1>
      <form action={formAction}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Sign In</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
  