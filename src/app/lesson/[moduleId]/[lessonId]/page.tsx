import LessonContent from "@/components/LessonContent";
import { FaArrowLeft } from "react-icons/fa";
import ClientLessonPage from "./ClientLessonPage";

interface PageProps {
  params: Promise<{
    moduleId: string;
    lessonId: string;
  }>;
}

// Server Component
export default async function LessonPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ClientLessonPage formattedLessonId={resolvedParams.lessonId} />;
}
