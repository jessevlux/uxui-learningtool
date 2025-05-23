"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ModuleCard from "./ModuleCard";
import LessonModal from "./LessonModal";
import { FaMoon, FaSun, FaFire, FaTrophy, FaUser } from "react-icons/fa";

// Dummy data voor de modules
const modules = [
  {
    id: 3,
    title: "UX Psychology",
    description: "Begrijp hoe gebruikers denken en beslissingen nemen",
    progress: 0,
    lessons: 5,
    lessonsCompleted: 0,
    xp: 0,
    icon: "🧩",
    color: "from-green-500 to-teal-600",
    locked: false,
  },
  {
    id: 1,
    title: "UX Basics",
    description: "Leer de fundamentele principes van User Experience design",
    progress: 0,
    lessons: 5,
    lessonsCompleted: 0,
    xp: 0,
    icon: "🧠",
    color: "from-purple-500 to-indigo-600",
    locked: true,
  },
  {
    id: 2,
    title: "UI Design",
    description: "Ontdek hoe je aantrekkelijke en functionele interfaces maakt",
    progress: 0,
    lessons: 5,
    lessonsCompleted: 0,
    xp: 0,
    icon: "🎨",
    color: "from-blue-500 to-cyan-600",
    locked: true,
  },
  {
    id: 4,
    title: "UX Process",
    description: "Leer het volledige UX-ontwerpproces van begin tot eind",
    progress: 0,
    lessons: 7,
    lessonsCompleted: 0,
    xp: 0,
    icon: "🔄",
    color: "from-orange-500 to-amber-600",
    locked: true,
  },
];

// Dummy data voor de gebruiker
const userData = {
  name: "UX Leerling",
  xp: 200,
  level: 3,
  streak: 5,
  lastLesson: {
    moduleId: 1,
    lessonId: 3,
    title: "Contrast & Leesbaarheid",
  },
  badges: [
    { id: 1, name: "UX Beginner", icon: "🌱" },
    { id: 2, name: "Streak Master", icon: "🔥" },
  ],
};

// Definieer een interface voor het module type
interface Module {
  id: number;
  title: string;
  description: string;
  progress: number;
  lessons: number;
  lessonsCompleted: number;
  xp: number;
  icon: string;
  color: string;
}

interface DashboardProps {
  onDarkModeChange?: (isDark: boolean) => void;
}

export default function Dashboard({ onDarkModeChange }: DashboardProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Update HTML class
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Call the parent component's callback if provided
    if (onDarkModeChange) {
      onDarkModeChange(newDarkMode);
    }
  };

  // Effect voor het instellen van dark mode op basis van systeemvoorkeur
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleModuleClick = (moduleId: number) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module) {
      setSelectedModule(module);
      setShowLessonModal(true);
    }
  };

  const handleContinueLastLesson = () => {
    const module = modules.find((m) => m.id === userData.lastLesson.moduleId);
    if (module) {
      setSelectedModule(module);
      setShowLessonModal(true);
    }
  };

  return (
    <div className="w-full max-w-6xl p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
            <span className="text-xl font-bold">UX</span>
          </div>
          <h1 className="text-xl font-bold">UX/UI Learning</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 dark:bg-[#212121] text-gray-800 dark:text-gray-200">
            <FaUser />
          </button>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Welkom terug, {userData.name}!
        </h2>
        <div className="bg-white dark:bg-[#212121] rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Je huidige niveau
              </p>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">
                  Level {userData.level}
                </span>
                <FaTrophy className="text-yellow-500" />
              </div>
            </div>
            <div className="flex items-center">
              <FaFire className="text-red-500 mr-2" />
              <span className="font-semibold">
                {userData.streak} dagen streak!
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">XP: {userData.xp}/300</span>
              <span className="text-sm font-medium">
                {Math.round((userData.xp / 300) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#121212] rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                style={{ width: `${(userData.xp / 300) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onClick={() => handleModuleClick(module.id)}
            />
          ))}
        </div>
      </section>

      {/* Badges Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Jouw badges</h2>
        <div className="flex flex-wrap gap-4">
          {userData.badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white dark:bg-[#212121] rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <span className="font-medium text-sm">{badge.name}</span>
            </div>
          ))}
          <div className="bg-gray-100 dark:bg-[#212121] rounded-lg shadow-md p-4 flex flex-col items-center border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-3xl mb-2 text-gray-400">?</div>
            <span className="font-medium text-sm text-gray-500 dark:text-gray-400">
              Volgende badge
            </span>
          </div>
        </div>
      </section>

      {/* Daily Reminder */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xl mb-1">
            Vandaag nog geen les gedaan!
          </h3>
          <p>Houd je streak vast en leer iets nieuws vandaag.</p>
        </div>
        <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors">
          Start een les
        </button>
      </section>

      {/* Lesson Modal */}
      {showLessonModal && selectedModule && (
        <LessonModal
          module={selectedModule}
          onClose={() => setShowLessonModal(false)}
        />
      )}
    </div>
  );
}
