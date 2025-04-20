// src/hooks/useUserRole.ts

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserRole = () => {
  const { user } = useUser();
  
  if (!user?.id) {
    console.log("No user ID found");
    return { isLoading: true, isInterviewer: false, isCandidate: false };
  }

  const userData = useQuery(api.users.getUserByClerkId, { clerkId: user?.id || "" });

  if (userData === undefined) {
    console.log("Loading user data...");
  }

  return {
    isLoading: userData === undefined,
    isInterviewer: userData?.role === "interviewer",
    isCandidate: userData?.role === "candidate",
  };
};
