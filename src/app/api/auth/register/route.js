const { NextResponse } = require("next/server");
const dbConnect = require("@/lib/dbConnect");
const User = require("@/models/User");

exports.POST = async (request) => {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      name,
      email,
      shopifyAdminAccessToken,
      apiAccessToken,
      apiKey,
      shopifyDomain,
      password,
      storefrontApi,
      mobile,
    } = body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      name,
      email,
      shopifyAdminAccessToken,
      apiAccessToken,
      apiKey,
      shopifyDomain,
      password: password,
      storefrontApi,
      mobile,
    });

    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user", details: error.message },
      { status: 500 }
    );
  }
};

