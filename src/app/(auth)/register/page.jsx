"use client";

import React from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { username, email, imageUrl, password } = Object.fromEntries(
      formData.entries()
    );

    const { data, error } = await signUp.email({
      name: username,
      email,
      password,
      image: imageUrl || undefined,
    });

    if (error) {
      toast.error("Registration failed");
      return;
    }

    toast.success("Account created!");
    router.push("/login");
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#F2E8DA] dark:bg-[#23150E] p-6">
      <Form
        onSubmit={handleRegister}
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
          name="username"
          type="text"
          validate={(value) => {
            if (value.trim().length < 3) {
              return "Username must be at least 3 characters";
            }
            if (!/^[a-zA-Z0-9_]+$/.test(value)) {
              return "Only letters, numbers, and underscores are allowed";
            }
            return null;
          }}
          className="flex flex-col gap-1.5"
        >
          <Label
            style={{ color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Username
          </Label>
          <Input
            placeholder="e.g. alex_paws"
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
            Profile Photo Link
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
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
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
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
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
            <CheckCheck className="w-4 h-4" />
            Register
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

        <p
          style={{
            marginTop: "1.5rem",
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
