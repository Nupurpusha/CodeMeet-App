"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/stream.actions";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  const [initializationError, setInitializationError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    let client: StreamVideoClient;
    try {
      client = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        user: {
          id: user.id,
          name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.id,
          image: user.imageUrl,
        },
        tokenProvider: streamTokenProvider,
      });

      setStreamVideoClient(client);
    } catch (error) {
      console.error("Failed to initialize Stream client:", error);
      setInitializationError("Failed to initialize video service");
    }

    return () => {
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, [user, isLoaded]);

  if (initializationError) {
    return <div className="text-red-500 p-4">{initializationError}</div>;
  }

  if (!streamVideoClient) return <LoaderUI />;

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;