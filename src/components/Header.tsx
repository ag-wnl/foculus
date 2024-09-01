import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="grid grid-cols-2">
      <div className="text-left">foculus</div>
      <div className="text-right">
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
