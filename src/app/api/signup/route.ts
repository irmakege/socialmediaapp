import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  // Read data from request body
  const body = await request.json();
  const {username, email, password} = body;

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

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Create a user in DB
  await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
      }
    })

  // Return success message
  return Response.json({})
}