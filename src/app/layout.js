import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import DashboardSidebar from "@/components/DashboardSidebar";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata = {
  title: "Paws & Homes — Find Your Furry Friend a Forever Home",
  description: "A warm, cozy pet adoption platform connecting pets with loving families.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <PageTransition>
        <Navbar />
        <main className="w-full flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <Toaster />
      </PageTransition>
      </body>
    </html>
  );
}

