


"use client"

import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import Link from "next/link"

import { signUpSchema } from "@/schemas/signUpSchema"
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

const Page = () => {

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [debouncedUsername] = useDebounceValue(username, 500)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  // username availability check
  useEffect(() => {

    const checkUsernameUnique = async () => {

      if (!debouncedUsername) return

      setIsCheckingUsername(true)
      setUsernameMessage("")

      try {

        const response = await axios.get(
          `/api/check-username-unique?username=${debouncedUsername}`
        )

        setUsernameMessage(response.data.message)

      } catch (error) {

        setUsernameMessage("Error checking username")

      } finally {

        setIsCheckingUsername(false)

      }

    }

    checkUsernameUnique()

  }, [debouncedUsername])


  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {

    setIsSubmitting(true)

    try {

      const response = await axios.post("/api/sign-up", data)

      toast.success(response.data.message)

      router.replace(`/verify/${data.username}`)

    } catch (error) {

      const axiosError = error as AxiosError<any>

      toast.error(
        axiosError.response?.data.message || "Signup failed"
      )

    } finally {

      setIsSubmitting(false)

    }

  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">

        <div className="text-center">

          <h1 className="text-4xl font-extrabold mb-4">
            Join Mystery Message
          </h1>

          <p>Sign up to start your anonymous adventure</p>

        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <FieldGroup>

            {/* USERNAME */}

            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel>Username</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Enter username"
                    autoComplete="off"
                    onChange={(e) => {
                      field.onChange(e)
                      setUsername(e.target.value)
                    }}
                  />

                  {isCheckingUsername && (
                    <p className="text-sm text-gray-500">
                      Checking username...
                    </p>
                  )}

                  {usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage.includes("available")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                </Field>

              )}
            />

            {/* EMAIL */}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel>Email</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Enter email"
                    autoComplete="email"
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
                    autoComplete="new-password"
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
            disabled={isSubmitting || isCheckingUsername}
          >

            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Sign Up"
            )}

          </Button>

        </form>

        <div className="text-center mt-4">

          <p>
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-blue-500 hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>

      </div>

    </div>

  )

}

export default Page