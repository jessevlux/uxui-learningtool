"use client";

import { useRouter } from "next/navigation";
import LessonContent from "@/components/LessonContent";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

interface ClientLessonPageProps {
  formattedLessonId: string;
}

export default function ClientLessonPage({
  formattedLessonId,
}: ClientLessonPageProps) {
  const router = useRouter();
  const [error, setError] = useState(false);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white dark:from-[#121212] dark:to-[#181818] dark:text-white p-4">
      <div className="w-full max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          Terug naar dashboard
        </button>

        <LessonContent
          lessonId={formattedLessonId}
          onComplete={() => router.push("/")}
        />
      </div>
    </main>
  );
}
