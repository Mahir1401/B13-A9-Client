'use client';
import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#F2E8DA] dark:bg-[#23150E] p-6">
      <form
        onSubmit={handleSubmit}
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
            Join <span className="text-[#8EC5FF]">PetNest</span>
          </p>

          <h2
            style={{ color: "#3B2418" }}
            className="text-3xl font-bold font-[Fraunces] dark:!text-[#F2E8DA] tracking-tight"
          >
            Create an Account
          </h2>
        </div>

        <div style={{ marginBottom: "1.15rem" }} className="flex flex-col">
          <label
            style={{ marginBottom: "0.4rem", color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="e.g. alex_paws"
            required
            style={{
              padding: "0.7rem 1rem",
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="w-full rounded-xl placeholder-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
          />
        </div>

        <div style={{ marginBottom: "1.15rem" }} className="flex flex-col">
          <label
            style={{ marginBottom: "0.4rem", color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            style={{
              padding: "0.7rem 1rem",
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="w-full rounded-xl placeholder-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
          />
        </div>

        <div style={{ marginBottom: "1.75rem" }} className="flex flex-col">
          <label
            style={{ marginBottom: "0.4rem", color: "#3B2418" }}
            className="text-xs font-semibold uppercase tracking-wider opacity-80"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            style={{
              padding: "0.7rem 1rem",
              backgroundColor: "#F2E8DA",
              color: "#3B2418",
              border: "1px solid rgba(59, 36, 24, 0.25)",
            }}
            className="w-full rounded-xl placeholder-[#3B2418]/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2418]/30 transition-all"
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#8EC5FF",
            color: "#3B2418",
            padding: "0.85rem 1.5rem",
          }}
          className="w-full font-semibold text-sm rounded-full hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
        >
          Register
        </button>
      </form>
    </section>


  );
}
