import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";   
import { ApiResponse } from "@/types/ApiResponse";
import * as React from 'react';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystery message | Verification Code',
            react: React.createElement(VerificationEmail, {
                username,
                otp: verifyCode,
            }),
        });

        if (error) {
            console.error("Resend API Error:", error);
            return {
                success: false,
                message: error.message || 'Error sending verification email'
            };
        }

        return {
            success: true,
            message: 'Verification email sent successfully'
        };
    } catch (emailError) {
        console.error("Unexpected error sending verification email", emailError);
        return { 
            success: false, 
            message: "Error sending verification email" 
        };
    }
}




