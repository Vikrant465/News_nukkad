"use client";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icon";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Switch,
  Image,
  Alert
} from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <Image
      alt="logo"
      src="/favicon.ico.png"
      width={100}
    />
  );
};

export default function Nav() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = useState(false);

  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark =
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = (value) => {
    setIsDark(value);
    if (value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="hidden sm:flex gap-4">
          <AcmeLogo />
          <p className="font-bold text-inherit">News Charcha Official</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            About
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link aria-current="page" href="/blog">
            Blog
          </Link>
        </NavbarItem>
        {isAuthenticated ? (
          <NavbarItem >
            <Link aria-current="page" href="/upload">
              Upload
            </Link>
          </NavbarItem>
        ) :undefined
        }

      </NavbarContent>

      <NavbarContent justify="end" className="items-center gap-4">
        {isAuthenticated ? (
          <>
            <NavbarItem>
              <p className="text-sm font-medium">
                Hello, {session?.user?.name || "User"}
              </p>
            </NavbarItem>
            <NavbarItem>
              <Button color="danger" variant="ghost" onPress={() => signOut()}>
                Sign Out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button color="primary" onPress={() => signIn("google")}>
              Google Login
            </Button>
          </NavbarItem>
        )}
        <NavbarItem>
          <Switch
            isSelected={isDark}
            onValueChange={toggleTheme}
            size="md"
            color="primary"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <SunIcon className={className} />
              ) : (
                <MoonIcon className={className} />
              )
            }
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/" size="lg">
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="primary" href="/blog" size="lg">
            Blog
          </Link>
        </NavbarMenuItem>
        {isAuthenticated ? (
          <NavbarItem >
            <Link aria-current="page" href="/upload">
              Upload
            </Link>
          </NavbarItem>
        ) :undefined
        }
        {isAuthenticated && (
          <NavbarMenuItem>
            <Button
              color="danger"
              variant="light"
              className="w-full"
              onPress={() => signOut()}
            >
              Sign Out
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
