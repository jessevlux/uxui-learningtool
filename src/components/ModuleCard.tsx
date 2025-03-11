interface ModuleCardProps {
  module: {
    id: number;
    title: string;
    description: string;
    progress: number;
    lessons: number;
    lessonsCompleted: number;
    xp: number;
    icon: string;
    color: string;
  };
  onClick: () => void;
}

export default function ModuleCard({ module, onClick }: ModuleCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className={`bg-gradient-to-r ${module.color} p-4 text-white`}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{module.title}</h3>
          <span className="text-3xl">{module.icon}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {module.description}
        </p>
        <div className="mb-2">
          <div className="flex justify-between mb-1 text-sm">
            <span>Voortgang</span>
            <span>
              {module.lessonsCompleted}/{module.lessons} lessen
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${module.color} h-2 rounded-full`}
              style={{ width: `${module.progress}%` }}
            ></div>
          </div>
        </div>
        {module.xp > 0 && (
          <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">{module.xp} XP verdiend</span>
          </div>
        )}
      </div>
    </div>
  );
}
