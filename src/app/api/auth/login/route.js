const { NextResponse } = require("next/server");
const dbConnect = require("@/lib/dbConnect");
const User = require("@/models/User");
import Admin from "@/models/Admin";

exports.POST = async (request) => {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    // Find user
    const user = await Admin.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (password !== user.password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return success response (in production, include JWT or session)
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to login", details: error.message },
      { status: 500 }
    );
  }
};