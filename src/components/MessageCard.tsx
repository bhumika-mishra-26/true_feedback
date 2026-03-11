"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Message } from "@/models/User"
import { toast } from "sonner"
import axios from "axios"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { ApiResponse } from "@/types/ApiResponse"

type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {

  const handleDeleteConfirm = async () => {
    try {

      await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)

      toast.success("Message deleted successfully")

      onMessageDelete(message._id.toString())

    } catch (error) {

      toast.error("Failed to delete message")

    }
  }

  return (
    <Card className="mx-auto w-full max-w-sm">

      <CardHeader>

        <CardTitle>{message.content}</CardTitle>

        <AlertDialog>

          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>

            <AlertDialogHeader>

              <AlertDialogTitle>
                Are you absolutely sure?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This will permanently delete this message.
              </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>

              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>

            </AlertDialogFooter>

          </AlertDialogContent>

        </AlertDialog>

        <CardDescription>
          Anonymous message
        </CardDescription>

      </CardHeader>

      <CardContent />

      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>

    </Card>
  )
}

export default MessageCard