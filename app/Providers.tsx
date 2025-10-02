// app/providers.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme/Theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ConvexClientProvider from "@/providers/ConvexCleintProvider";


 
function InnerProviders({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: {
            colorPrimary: "hsl(var(--primary))"
        }
      }}
    >
      <ConvexClientProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster richColors />
      </ConvexClientProvider>
    </ClerkProvider>
  );
}



export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <InnerProviders>{children}</InnerProviders>
    </ThemeProvider>
  );
}