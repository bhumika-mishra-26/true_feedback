"use client";

import { useCallback, useEffect, useState } from "react";
import { Message } from "@/models/User";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "next-auth";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/MessageCard";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const { watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  // Delete message from UI
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((m) => m._id.toString() !== messageId));
  };

  // Fetch accept messages setting
  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages || false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch message settings"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // Fetch messages
  const fetchMessages = useCallback(
    async (refresh = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success("Messages refreshed");
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(
          axiosError.response?.data.message || "Failed to fetch messages"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Switch change
  const handleSwitchChange = async () => {
    try {
      setIsSwitchLoading(true);
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      if (response.data.success) {
        setValue("acceptMessages", !acceptMessages);
        toast.success(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Failed to update message preference"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  };

  // Load data
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchMessages, fetchAcceptMessages]);

  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && session?.user) {
      const user = session.user as User;
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      setProfileUrl(`${baseUrl}/u/${user.username}`);
    }
  }, [session]);

  if (!session || !session.user) {
    return <div className="text-center mt-10">Please Login</div>;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile link copied");
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      {/* Profile Link */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy your unique link</h2>

        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="border p-2 w-full mr-2 rounded"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      {/* Switch */}
      <div className="mb-4 flex items-center">
        <Switch
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>

      <Separator />

      {/* Refresh Button */}
      <Button
        className="mt-4"
        variant="outline"
        onClick={() => fetchMessages(true)}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>

      {/* Messages */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id.toString()}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
    </div>
  );
};

export default Page;
