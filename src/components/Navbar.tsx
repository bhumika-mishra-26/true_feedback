"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-white text-black border-b">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link className="text-xl font-bold mb-4 md:mb-0" href="/">
          Mystery Message
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <span className="hidden md:inline font-medium">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="w-full md:w-auto">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;