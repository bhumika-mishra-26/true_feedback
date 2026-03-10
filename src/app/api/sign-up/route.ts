import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

/**
 * Handles sign up request.
 * Checks if username is already taken by a verified user.
 * Checks if email is already in use by an unverified user.
 * If existing user is found, updates the existing user with new password and verification code.
 * If no existing user is found, creates a new user with given details and sends a verification email.
 * Returns a JSON response with success and message.
 * If an error occurs during registration, returns a JSON response with success set to false and an error message.
 * If an error occurs during sending verification email, returns a JSON response with success set to false and an error message.
 * @param req - Request object
 * @returns JSON response with success and message
 */
export async function POST(req: Request) {
    await dbConnect();
    try {
        const { email, username, password } = await req.json();
        
        // Check if username is already taken by a verified user
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken"
                },
                { status: 400 }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User already exists with this email"
                    },
                    { status: 400 }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); 
                // 1 hour
                await existingUserByEmail.save();
            }
        }
        else {
                // Update existing user with new password and verify code
                const hashedPassword = await bcrypt.hash(password, 10);
                const expirydate=new Date()
                expirydate.setHours(expirydate.getHours()+1)

        //         existingUserByEmail.password = hashedPassword;
        //         existingUserByEmail.verifyCode = verifyCode;
        //         existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour
        //         await existingUserByEmail.save();
        //     }
        // } else {
        //     // Create new user
        //     const hashedPassword = await bcrypt.hash(password, 10);
        //     const expiryDate = new Date();
        //     expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expirydate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            });

            await newUser.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User registered successfully. Please verify your email."
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            { 
                status: 500 
            }
        );
    }
}