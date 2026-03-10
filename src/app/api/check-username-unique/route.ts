// // import dbConnect from "@/lib/dbConnect"
// // import {z} from "zod"
// // import UserModel from "@/models/User"
// // import usernameValidation from "@/schemas/signUpSchema"
// // const  UsernameQuerySchema=z.object({
// //     username:usernameValidation
// // })
// // export async function GET(request:Request) {
// //     await dbConnect();
// //     const url=new URL(request.url);
// //     const username=url.searchParams.get('username');
// //     if(!username)
// //     {
// //         return new Response(
// //             JSON.stringify({
// //                 success: false,
// //             }),
// //             { status: 400 }
// //         );
// //     }
// //     const user=await UserModel.findOne({username:username});
// //     if(user)
// //     {
// //         return new Response(
// //             JSON.stringify({
// //                 success: false,
// //             }),
// //             { status: 400 }
// //         );
// //     }
// //     return new Response(
// //         JSON.stringify({
// //             success: true,
// //         }),
// //         { status: 200 }
// //     );
// // }       


// import dbConnect from "@/lib/dbConnect"
// import {z} from "zod"
// import UserModel from "@/models/User"
// import {usernameValidation}   from "@/schemas/signUpSchema"

// const UsernameQuerySchema = z.object({
//     username: usernameValidation
// })

// export async function GET(request: Request) {
//     await dbConnect();
//     try{
    
//     const {searchParams} = new URL(request.url);
//     const queryParam={
//         username:searchParams.get('username')
//     }
//     //validate with zod 
//     const result=UsernameQuerySchema.safeParse(queryParam);
//     console.log(result)
//     if(!result.success)
//     {
//         const usernameErrors=result.error.format().username?._errors||[];
//         return Response.json(
//             {
//                 success: false,
//                 message: usernameErrors?.length>0?usernameErrors.join(','):"Invalid queryParams"
//             },
//             {
//                 status: 400
//             }
//         )
//     }
//     const {username}
//   =result.data
//   const existingVerifiedUser=await UserModel.findOne({username,isVerified:true}) 
//   if(existingVerifiedUser)
//   {
//     return Response.json(
//         {
//             success: false,
//             message: "Username is already taken"
//         },
//         {
//             status: 400
//         }
//     )
//   }
//   return Response.json(
//     {
//         success: true,
//         message: "Username is unique"
//     },
//     {
//         status: 200
//     })
// }
// catch(error)
// {
    
//   console.error("Errror checking username", error)
//   return Response.json(
//     {
//         success: false,
//         message: "Error checking username"
//     }
//     {
//         status: 500
//     }
//   )
// }


// }
import dbConnect from "@/lib/dbConnect"
import { z } from "zod"
import UserModel from "@/models/User"
import { usernameValidation } from "@/schemas/signUpSchema"

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    if(request.method!=='GET')
    {
        return Response.json(
            
            {
                success: false,
                message: "Method not allowed"
            },
            {
                status: 405
            }   
        )
    }

    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username')
        }
        // validate with zod 
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result)
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(',') : "Invalid queryParams"
                },
                {
                    status: 400
                }
            )
        }
        const { username } = result.data
        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })
        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken"
                },
                {
                    status: 400
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: "Username is unique"
            },
            {
                status: 200
            })
    }
    catch (error) {
        console.error("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {
                status: 500
            }
        )
    }
}
    