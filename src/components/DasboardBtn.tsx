"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole"; 

function DasboardBtn() {
  const { isCandidate, isLoading } = useUserRole();

  
  if (isLoading || isCandidate) return null;

  return (
    <Link href="/dasboard">
      <Button className="gap-2 font-medium" size="sm">
        <SparklesIcon className="size-4" />
        Dashboard
      </Button>
    </Link>
  );
}

export default DasboardBtn;

