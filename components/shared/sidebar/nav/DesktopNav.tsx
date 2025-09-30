"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme.toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/useNavigation";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";

const DesktopNav = () => {
  const paths = useNavigation();

  return (
    <Card
      className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16
  lg:px-2 lg:py-4
  "
    >
      <nav>
        <ul className="flex flex-col items-center gap-4">
          {paths.map((path, id) => (
            <li key={id} className="relative ">
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant={path.active ? "default" : "outline"}
                    >
                      {path.icon}
                    </Button>
                    {path.count ? (
                      <Badge
                        variant="secondary"
                        className="absolute left-5 bottom-5 px-2"
                      >
                        {path.count}
                      </Badge>
                    ) : null}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>

        <Authenticated>
          <UserButton />
        </Authenticated>
      </div>
    </Card>
  );
};

export default DesktopNav;
