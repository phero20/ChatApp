"use client";

import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import LoadingLogo from "@/components/shared/LoadingLogo";

export default function Home() {
  return (
    <>
      <Authenticated>
        <UserButton />
        {/* <Content /> */}
      </Authenticated>
      <AuthLoading>
        <LoadingLogo />
      </AuthLoading>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  );
}

