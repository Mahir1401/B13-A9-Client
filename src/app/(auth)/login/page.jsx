"use client";

import React from "react";
import Link from "next/link";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { LogIn } from "lucide-react";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleLogin = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const { email, password } = Object.fromEntries(formData.entries());

  const { data, error } = await signIn.email({
    email,
    password,
  });

  const { data:tokenData,  } = await authClient.token()


  if (error) {
    toast.error("Invalid email or password");
    return;
  }

  toast.success("Logged in successfully!");
  router.push("/");
};

  

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#F2E8DA] dark:bg-[#23150E] p-6">
      <div
        style={{
          maxWidth: "420px",
          width: "100%",
          padding: "2.75rem 2.25rem",
        }}
        className="bg-[#F9F4ED] dark:bg-[#2B1A11] border border-[#3B2418]/15 dark:border-[#F2E8DA]/15 rounded-3xl shadow-sm flex flex-col"
      >
        <div style={{ marginBottom: "1.75rem" }} className="text-center">
          <p
            style={{
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              padding: "0.3rem 1rem",
              marginBottom: "0.75rem",
            }}
            className="inline-block rounded-full text-sm font-bold border border-[#3B2418]/20"
          >
            Welcome <strong style={{ color: "#8EC5FF" }}>Back</strong>
          </p>

          <h2
            style={{ color: "#3B2418" }}
            className="text-3xl font-bold font-[Fraunces] dark:!text-[#F2E8DA] tracking-tight"
          >
            Sign In
          </h2>
        </div>

        <Form onSubmit={handleLogin} className="flex flex-col gap-5">
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
              autoComplete="email"
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
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
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
              autoComplete="current-password"
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

          <Button
            type="submit"
            style={{
              backgroundColor: "#8EC5FF",
              color: "#3B2418",
              padding: "0.85rem 1.5rem",
              marginTop: "0.5rem",
              cursor: "pointer",
            }}
            className="w-full flex items-center justify-center gap-2 font-semibold text-sm rounded-full hover:opacity-90 active:scale-[0.99] transition-all shadow-xs"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        </Form>

        <p
          style={{
            marginTop: "1.5rem",
            color: "rgba(59, 36, 24, 0.75)",
          }}
          className="text-xs text-center"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            style={{ color: "#3B2418" }}
            className="font-semibold underline hover:opacity-80"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
