import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
           id: "credentials",
           name: "Credentials",
           credentials:{
            email:{
                label: "eamil",
                type: "text"
            },
            password: {
                label: "Password",
                type: "password"
            }
        },
        async authorize(credentials: any):Promise<any> {
            await dbConnect();
            try{
              const user=  await UserModel.findOne({
                    $or:[
                        {email: credentials.identifier},
                        {username: credentials.identifier}
                    ]
                })
                if(!user)
                {
                    throw new Error("User not found")
                }
                if(!user.isVerified)
                {
                    throw new Error("User is not verified")
                }
                const isValidPassword = await bcrypt.compare(credentials.password, user.password)
                if(!isValidPassword)
                {
                    throw new Error("Invalid password")
                }
                return user
            }

            catch(err:any){
               throw new Error(err)
            }

           }
            })
        ],
        callbacks:{
            async session ({session,token}){
                if(token)
                {
                    session.user._id=token._id;
                    session.user.isVerified=token.isVerified;
                    session.user.isAcceptingMessages=token.isAcceptingMessages;
                    session.user.username=token.username
                    
                }
                
                return session

            },
            async jwt ({token,user}){
                if(user)
                {
                    token._id=user._id
                    token.isVerified=user.isVerified
                    token.isAcceptingMessages=user.isAcceptingMessages
                
                    
                    token.username=user.username
                }


                
                return token
            }

        },
        pages:{
            signIn: "/sign-in"

        },
        session:{
            strategy: "jwt"

        },
        secret: process.env.NEXTAUTH_SECRET
        }

    



