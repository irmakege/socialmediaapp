import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const isLoggedIn = cookies().get("Authorization");

  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <li>
            <Link href="/protected">Dashboard</Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}