import Image from "next/image";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <Dashboard />
    </main>
  );
}
