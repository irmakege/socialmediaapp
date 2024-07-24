import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export async function POST(request: Request) {

  // Extract data sent in
  const body = await request.json();
  const { email, password } = body;

  // Validate data
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json(
      {
        error: "Invalid email or password"
      },
      {
        status: 400
      }
    );
  }
  // Lookup the user
  const user = await prisma.user.findFirst({
    where: { email },
    select: { id: true, email: true, password: true, role: true },
  });
  if (!user) {
    return Response.json(
      {
        error: "Invalid user"
      },
      {
        status: 400
      }
    );
  }

  // Compare password
  const isCorrectPassword = bcrypt.compareSync(password, user.password);

  if (!isCorrectPassword) {
    return Response.json(
      {
        error: "Invalid password",
      },
      { status: 400 }
    );
  }

  // Determine redirect target based on user role
  const redirectTarget = user.role === 'user' ? `/home/${user.id}` : '/admin';

  // Create jwt token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("72h")
    .setSubject(user.id.toString())
    .sign(secret);

  
  // Respond with it
  return Response.json({ token: jwt, redirect: redirectTarget});
}