// "use client"

// import { useForm, Controller } from "react-hook-form"
// import * as z from "zod"
// import { useEffect, useState } from "react"
// import { useDebounceValue } from "usehooks-ts"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import axios, { AxiosError } from "axios"
// import Link from "next/link"

// import { signInSchema } from "@/schemas/signInSchema"
// import { zodResolver } from "@hookform/resolvers/zod"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"

// import { Loader2 } from "lucide-react"
// import { signIn } from "next-auth/react"

// const Page = () => {

//   const router = useRouter()

  
//   const [isSubmitting, setIsSubmitting] = useState(false)

  
//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
  
//       email: "",
//       password: "",
//     },
//   })

//   // username availability check
  


//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {

//    await signIn("credentials", {  
//     identifier:data.identifier,
// password:data.password,
// })
//   }

//   return (

//     <div className="flex justify-center items-center min-h-screen bg-gray-50">

//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

//         <div className="text-center">

//           <h1 className="text-4xl font-extrabold mb-4">
//             Join Mystery Message
//           </h1>

//           <p>Sign up to start your anonymous adventure</p>

//         </div>

//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6"
//         >

//           <FieldGroup>

//             {/* USERNAME */}

           

//             {/* PASSWORD */}

//             <Controller
//               name="identifier"
//               control={form.control}
//               render={({ field, fieldState }) => (

//                 <Field data-invalid={fieldState.invalid}>

//                   <FieldLabel>Password</FieldLabel>

//                   <Input
//                     {...field}
//                     type="password"
//                     placeholder="Enter password"
//                     autoComplete="new-password"
//                   />

//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}

//                 </Field>

//               )}
//             />

//           </FieldGroup>

//           <Button
//             type="submit"
//             className="w-full"
//             disabled={isSubmitting || isCheckingUsername}
//           >

//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait...
//               </>
//             ) : (
//               "Sign Up"
//             )}

//           </Button>

//         </form>

//         <div className="text-center mt-4">

//           <p>
//             Already a member?{" "}
//             <Link
//               href="/sign-in"
//               className="text-blue-500 hover:underline"
//             >
//               Sign In
//             </Link>
//           </p>

//         </div>

//       </div>

//     </div>

//   )

// }

// export default Page
"use client"

import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

import { signInSchema } from "@/schemas/signInSchema"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"

const Page = () => {

  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {

    setIsSubmitting(true)

    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    })

    setIsSubmitting(false)

    if (result?.error) {
      toast.error("Invalid credentials")
    } else {
      toast.success("Login successful")
      router.replace("/dashboard")
    }

  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

        <div className="text-center">

<h1>Join Mystery Message</h1>

          <h1 className="text-2xl font-extrabold mb-4">
            Sign In 
          </h1>

          {/* <p>Login to your account</p> */}

        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <FieldGroup>

            {/* IDENTIFIER */}

            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel>Email / Username</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Enter email or username"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                </Field>

              )}
            />

            {/* PASSWORD */}

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel>Password</FieldLabel>

                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter password"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                </Field>

              )}
            />

          </FieldGroup>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >

            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Sign In"
            )}

          </Button>

        </form>

        <div className="text-center mt-4">

          <p>
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>

    </div>

  )

}

export default Page