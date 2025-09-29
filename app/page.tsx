import { Button } from "@/components/ui/button";
import { SignUp, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton />
    </div>
  );
}
