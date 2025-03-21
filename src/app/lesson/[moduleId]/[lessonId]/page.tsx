import LessonContent from "@/components/LessonContent";
import { FaArrowLeft } from "react-icons/fa";
import ClientLessonPage from "./ClientLessonPage";

// Server Component
export default function LessonPage({
  params,
}: {
  params: { moduleId: string; lessonId: string };
}) {
  const formattedLessonId = `${params.moduleId}-${params.lessonId}`;

  return <ClientLessonPage formattedLessonId={formattedLessonId} />;
}
