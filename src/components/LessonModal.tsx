"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

// Dummy data voor lessen
const getLessons = (moduleId) => {
  switch (moduleId) {
    case 1:
      return [
        { id: 1, title: "Introductie tot UX", completed: true, xp: 50 },
        { id: 2, title: "Gebruikersonderzoek", completed: true, xp: 70 },
        { id: 3, title: "Contrast & Leesbaarheid", completed: false, xp: 60 },
        {
          id: 4,
          title: "Navigatie & Informatiearchitectuur",
          completed: false,
          xp: 80,
        },
        { id: 5, title: "Toegankelijkheid", completed: false, xp: 90 },
      ];
    case 2:
      return [
        { id: 1, title: "Kleurtheorie", completed: true, xp: 80 },
        { id: 2, title: "Typografie", completed: false, xp: 70 },
        { id: 3, title: "Visual Hierarchy", completed: false, xp: 90 },
        { id: 4, title: "UI Patterns", completed: false, xp: 100 },
        { id: 5, title: "Responsive Design", completed: false, xp: 110 },
        { id: 6, title: "Design Systems", completed: false, xp: 120 },
      ];
    default:
      return [
        { id: 1, title: "Les 1", completed: false, xp: 50 },
        { id: 2, title: "Les 2", completed: false, xp: 60 },
        { id: 3, title: "Les 3", completed: false, xp: 70 },
      ];
  }
};

interface LessonModalProps {
  module: {
    id: number;
    title: string;
    color: string;
    icon: string;
  };
  onClose: () => void;
}

export default function LessonModal({ module, onClose }: LessonModalProps) {
  const lessons = getLessons(module.id);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    // Hier zou je normaal gesproken naar de lespagina navigeren
    // Voor nu sluiten we gewoon de modal
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div
          className={`bg-gradient-to-r ${module.color} p-4 text-white flex justify-between items-center`}
        >
          <div className="flex items-center">
            <span className="text-3xl mr-3">{module.icon}</span>
            <h2 className="text-xl font-bold">{module.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          <h3 className="text-lg font-semibold mb-4">Beschikbare lessen</h3>

          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`p-4 rounded-lg border ${
                  lesson.completed
                    ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800"
                    : "border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600"
                } hover:shadow-md transition-shadow cursor-pointer`}
                onClick={() => handleLessonClick(lesson)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        lesson.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {lesson.completed ? "✓" : index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{lesson.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {lesson.xp} XP
                      </p>
                    </div>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    {lesson.completed ? "Herhalen" : "Starten"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
