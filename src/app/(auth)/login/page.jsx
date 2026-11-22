"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { LogIn } from "lucide-react";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const inputClass =
  "w-full rounded-xl border border-border bg-field px-4 py-2.5 text-sm text-field-foreground placeholder:text-field-placeholder focus:outline-none focus:ring-2 focus:ring-focus transition-all";

const labelClass =
  "text-xs font-semibold uppercase tracking-wider text-foreground/80";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    const { error } = await signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }

    await authClient.token();
    toast.success("Logged in successfully!");
    router.push(callbackUrl);
  };

  const handleGoogleSignin = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });

    if (error) {
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-background p-6">
      <div className="flex w-full max-w-[420px] flex-col rounded-3xl border border-border bg-surface px-9 py-11 shadow-sm">
        <div className="mb-7 text-center">
          <p className="mb-3 inline-block rounded-full border border-border bg-background px-4 py-1.5 text-sm font-bold text-surface-foreground">
            Welcome <strong className="text-baby-blue">Back</strong>
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-surface-foreground">
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
            <Label className={labelClass}>Email</Label>
            <Input
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClass}
            />
            <FieldError className="text-xs text-danger" />
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
            <Label className={labelClass}>Password</Label>
            <Input
              placeholder="••••••••"
              autoComplete="current-password"
              className={inputClass}
            />
            <FieldError className="text-xs text-danger" />
          </TextField>

          <Button
            type="submit"
            className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
          >
            <LogIn className="size-4" />
            Sign In
          </Button>
        </Form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-separator" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            or
          </span>
          <div className="h-px flex-1 bg-separator" />
        </div>

        <Button
          type="button"
          onPress={handleGoogleSignin}
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-border bg-cream-light px-6 py-3.5 text-sm font-semibold text-brown shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
        >
          <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
            />
          </svg>
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-xs text-foreground/75">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-foreground underline hover:opacity-80"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}