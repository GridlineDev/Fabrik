const { NextResponse } = require("next/server");
const dbConnect = require("@/lib/dbConnect");
const User = require("@/models/User");

exports.GET = async (request) => {
    try {
        // we can store a super admin
        await dbConnect();

        const data = {
            name: "Tushar Vaghasiya",
            email: "tushar@gmail.com",
            shopifyAdminAccessToken: "shpat_1234567890abcdef1234567890",
            apiAccessToken: "api_abcdef1234567890",
            apiKey: "key_1234567890abcdef",
            shopifyDomain: "johns-store.myshopify.com",
            password: "securePassword123",
            storefrontApi: "storefront_abcdef1234567890",
            mobile: "1234567890",
            role: "super",
            isActive: true,
            address: {
                street: "123 Main St",
                city: "New York",
                state: "NY",
                postalCode: "10001",
                country: "USA"
            },
            profilePicture: "https://example.com/images/john-doe.jpg",
            lastLogin: "2025-04-28T10:30:00.000Z",
            createdAt: "2025-04-28T10:00:00.000Z",
            updatedAt: "2025-04-28T10:30:00.000Z"
        }

        // add data to database first we check the user is exist or not
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Create new user
        const user = new User(data);
        // Save the user to the database
        await user.save();
        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.log("error storeing a super admin");
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}