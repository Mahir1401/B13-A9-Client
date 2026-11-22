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

const inputClass =
  "w-full rounded-xl border border-border bg-field px-4 py-2.5 text-sm text-field-foreground placeholder:text-field-placeholder focus:outline-none focus:ring-2 focus:ring-focus transition-all";

const labelClass =
  "text-xs font-semibold uppercase tracking-wider text-foreground/80";

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
    <section className="flex min-h-screen w-full items-center justify-center bg-background p-6">
      <Form
        onSubmit={handleRegister}
        onReset={() => setPassword("")}
        className="flex w-full max-w-[420px] flex-col gap-5 rounded-3xl border border-border bg-surface px-9 py-11 shadow-sm"
      >
        <div className="mb-1 text-center">
          <p className="mb-3 inline-block rounded-full border border-border bg-background px-4 py-1.5 text-sm font-bold text-surface-foreground">
            Join <strong className="text-baby-blue">PetNest</strong>
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-surface-foreground">
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
          <Label className={labelClass}>Name</Label>
          <Input placeholder="e.g. Alex Paws" className={inputClass} />
          <FieldError className="text-xs text-danger" />
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
          <Label className={labelClass}>Email</Label>
          <Input placeholder="you@example.com" className={inputClass} />
          <FieldError className="text-xs text-danger" />
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
          <Label className={labelClass}>Photo URL</Label>
          <Input placeholder="https://example.com" className={inputClass} />
          <FieldError className="text-xs text-danger" />
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
          <Label className={labelClass}>Password</Label>
          <Input placeholder="••••••••" className={inputClass} />
          <Description className="text-xs text-muted">
            At least 6 characters with 1 uppercase and 1 lowercase letter
          </Description>
          <FieldError className="text-xs text-danger" />
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
          <Label className={labelClass}>Confirm Password</Label>
          <Input placeholder="••••••••" className={inputClass} />
          <FieldError className="text-xs text-danger" />
        </TextField>

        <div className="mt-2 flex gap-2.5">
          <Button
            type="submit"
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
          >
            <CheckCheck className="size-4" /> Register
          </Button>
          <Button
            type="reset"
            variant="secondary"
            className="cursor-pointer rounded-full border border-border bg-background px-5 py-3.5 text-sm font-semibold text-foreground transition-all hover:opacity-80"
          >
            Reset
          </Button>
        </div>

        <div className="my-0.5 flex items-center gap-3">
          <div className="h-px flex-1 bg-separator" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            or
          </span>
          <div className="h-px flex-1 bg-separator" />
        </div>

        <Button
          type="button"
          onPress={handleGoogleSignIn}
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-border bg-cream-light px-5 py-3.5 text-sm font-semibold text-brown shadow-xs transition-all hover:opacity-90 active:scale-[0.99]"
        >
          <svg className="size-4" viewBox="0 0 24 24">
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

        <p className="mt-3 text-center text-xs text-foreground/75">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-foreground underline hover:opacity-80"
          >
            Log in
          </Link>
        </p>
      </Form>
    </section>
  );
}