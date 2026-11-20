import FeaturedPets from "@/components/FeaturedSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full flex-1 flex flex-col items-center pt-20 pb-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to Pet Adoption
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Find your new best friend today!
        </p>
        <FeaturedPets />
      </main>
    </div>
  );
}
