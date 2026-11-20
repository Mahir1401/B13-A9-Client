"use client";
import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, email, imageUrl, password, confirmPassword } =
      Object.fromEntries(formData.entries());

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const { data, error } = await signUp.email({
      name,
      email,
      password,
      image: imageUrl || undefined,
    });

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Account created!");
    router.push("/login");
  };

  const handleGoogleSignIn = async () => {
    await signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Google sign-in failed");
        },
      }
    );
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#F2E8DA] dark:bg-[#23150E] p-6">
      <Form
        onSubmit={handleRegister}
        onReset={() => setPassword("")}
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "2.75rem 2.25rem",
        }}
        className="bg-[#F9F4ED] dark:bg-[#2B1A11] border border-[#3B2418]/15 dark:border-[#F2E8DA]/15 rounded-3xl shadow-sm flex flex-col gap-5"
      >
        <div className="mb-1 text-center">
          <p
            style={{
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              padding: "0.3rem 1rem",
              marginBottom: "0.75rem",
            }}
            className="inline-block rounded-full text-sm font-bold border border-[#3B2418]/20"
          >
            Join <strong style={{ color: "#8EC5FF" }}>PetNest</strong>
          </p>
          <h2
            style={{ color: "#3B2418" }}
            className="text-3xl font-bold font-[Fraunces] dark:!text-[#F2E8DA] tracking-tight"
          >
            Create an Account
          </h2>
        </div>

        <TextField
          isRequired
          minLength={3}
          name="name"
          type="text"
          validate={(value) => {
            if (value.trim().length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
          className="flex flex-col gap-1.5"
        >
          <Label
            style={{ color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Name
          </Label>
          <Input
            placeholder="e.g. Alex Paws"
            style={{
              padding: "0.7rem 1rem",
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
          />
          <FieldError className="text-xs text-red-600 dark:text-red-400" />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
          className="flex flex-col gap-1.5"
        >
          <Label
            style={{ color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Email
          </Label>
          <Input
            placeholder="you@example.com"
            style={{
              padding: "0.7rem 1rem",
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
          />
          <FieldError className="text-xs text-red-600 dark:text-red-400" />
        </TextField>

        <TextField
          name="imageUrl"
          type="url"
          validate={(value) => {
            if (!value) return null;
            try {
              const parsed = new URL(value);
              if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
                return "Link must start with http:// or https://";
              }
              return null;
            } catch {
              return "Please enter a valid image URL";
            }
          }}
          className="flex flex-col gap-1.5"
        >
          <Label
            style={{ color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Photo URL
          </Label>
          <Input
            placeholder="https://example.com"
            style={{
              padding: "0.7rem 1rem",
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
          />
          <FieldError className="text-xs text-red-600 dark:text-red-400" />
        </TextField>

        <TextField
          isRequired
          minLength={6}
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
          validate={(value) => {
            if (value.length < 6) {
              return "Password must be at least 6 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[a-z]/.test(value)) {
              return "Password must contain at least one lowercase letter";
            }
            return null;
          }}
          className="flex flex-col gap-1.5"
        >
          <Label
            style={{ color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Password
          </Label>
          <Input
            placeholder="••••••••"
            style={{
              padding: "0.7rem 1rem",
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
          />
          <Description
            style={{ color: "rgba(59, 36, 24, 0.65)" }}
            className="text-xs"
          >
            At least 6 characters with 1 uppercase and 1 lowercase letter
          </Description>
          <FieldError className="text-xs text-red-600 dark:text-red-400" />
        </TextField>

        <TextField
          isRequired
          name="confirmPassword"
          type="password"
          validate={(value) => {
            if (value !== password) {
              return "Passwords do not match";
            }
            return null;
          }}
          className="flex flex-col gap-1.5"
        >
          <Label
            style={{ color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Confirm Password
          </Label>
          <Input
            placeholder="••••••••"
            style={{
              padding: "0.7rem 1rem",
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="w-full rounded-xl placeholder:text-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
          />
          <FieldError className="text-xs text-red-600 dark:text-red-400" />
        </TextField>

        <div className="flex gap-2.5 mt-2">
          <Button
            type="submit"
            style={{
              backgroundColor: "#8EC5FF",
              color: "#3B2418",
              padding: "0.8rem 1.25rem",
            }}
            className="flex-1 flex items-center justify-center gap-2 font-semibold text-sm rounded-full hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
          >
            <CheckCheck className="w-4 h-4" /> Register
          </Button>
          <Button
            type="reset"
            variant="secondary"
            style={{
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              padding: "0.8rem 1.25rem",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="rounded-full text-sm font-semibold hover:opacity-80 transition-all cursor-pointer"
          >
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-3 my-0.5">
          <div className="h-px flex-1 bg-[#3B2418]/15 dark:bg-[#F2E8DA]/15" />
          <span
            style={{ color: "rgba(59, 36, 24, 0.6)" }}
            className="text-xs uppercase font-semibold tracking-wider"
          >
            or
          </span>
          <div className="h-px flex-1 bg-[#3B2418]/15 dark:bg-[#F2E8DA]/15" />
        </div>

        <Button
          type="button"
          onPress={handleGoogleSignIn}
          style={{
            backgroundColor: "#FFFFFF",
            color: "#3B2418",
            padding: "0.8rem 1.25rem",
            border: "1px solid rgba(59, 36, 24, 0.25)",
          }}
          className="w-full flex items-center justify-center gap-2.5 font-semibold text-sm rounded-full hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <p
          style={{
            marginTop: "0.75rem",
            color: "rgba(59, 36, 24, 0.75)",
          }}
          className="text-xs text-center"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "#3B2418" }}
            className="font-semibold underline hover:opacity-80"
          >
            Log in
          </Link>
        </p>
      </Form>
    </section>
  );
}
