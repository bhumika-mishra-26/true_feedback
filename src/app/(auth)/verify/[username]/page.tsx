
"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios, { AxiosError } from "axios"

import { verifySchema } from "@/schemas/verifySchema"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const VerifyAccount = () => {

  const router = useRouter()
  const params = useParams<{ username: string }>()

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {

      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code
      })

      toast.success(response.data.message)
      router.replace("/sign-in")

    } catch (error) {

      const axiosError = error as AxiosError<any>

      toast.error(
        axiosError.response?.data.message || "Verification failed"
      )
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Verify Your Account
          </h1>

          <p className="text-gray-600 mb-6">
            Enter the verification code sent to your email
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>

          <FieldGroup>

            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel>Verification Code</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Enter your code"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                </Field>
              )}
            />

          </FieldGroup>

          <Button type="submit" className="w-full mt-6">
            Verify
          </Button>

        </form>

      </div>

    </div>
  )
}

export default VerifyAccount