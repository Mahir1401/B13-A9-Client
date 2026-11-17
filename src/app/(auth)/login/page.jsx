'use client';
import React, { useState } from 'react';

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Replace this block with your actual API call (e.g., fetch or axios)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password.');
      }

      const data = await response.json();
      if (onLoginSuccess) onLoginSuccess(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
              padding: "0.3rem 0.9rem",
              marginBottom: "0.75rem",
            }}
            className="inline-block rounded-full text-lg font-bold border border-[#3B2418]/20"
          >
            Welcome <span className="text-[#8EC5FF]">Back</span>
          </p>

          <h2
            style={{ color: "#3B2418" }}
            className="text-3xl font-bold font-[Fraunces] dark:!text-[#F2E8DA] tracking-tight"
          >
            Sign In
          </h2>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              color: "#991B1B",
              backgroundColor: "#FEE2E2",
              border: "1px solid rgba(153, 27, 27, 0.25)",
              padding: "0.75rem 1rem",
              marginBottom: "1.25rem",
            }}
            className="rounded-xl text-xs font-medium text-center"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div style={{ marginBottom: "1.15rem" }} className="flex flex-col">
            <label
              htmlFor="email"
              style={{ marginBottom: "0.4rem", color: "#3B2418" }}
              className="text-xs font-semibold uppercase tracking-wider opacity-80"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              style={{
                padding: "0.7rem 1rem",
                backgroundColor: "#F2E8DA",
                color: "#3B2418",
                border: "1px solid rgba(59, 36, 24, 0.25)",
                boxSizing: "border-box",
              }}
              className="w-full rounded-xl placeholder-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
            />
          </div>

          <div style={{ marginBottom: "1.75rem" }} className="flex flex-col">
            <label
              htmlFor="password"
              style={{ marginBottom: "0.4rem", color: "#3B2418" }}
              className="text-xs font-semibold uppercase tracking-wider opacity-80"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              style={{
                padding: "0.7rem 1rem",
                backgroundColor: "#F2E8DA",
                color: "#3B2418",
                border: "1px solid rgba(59, 36, 24, 0.25)",
                boxSizing: "border-box",
              }}
              className="w-full rounded-xl placeholder-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: "#8EC5FF",
              color: "#3B2418",
              padding: "0.85rem 1.5rem",
              opacity: isLoading ? 0.65 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            className="w-full font-semibold text-sm rounded-full hover:opacity-90 active:scale-[0.99] transition-all shadow-xs"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>

  );
}
