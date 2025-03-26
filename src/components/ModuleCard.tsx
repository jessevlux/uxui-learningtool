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
    locked: boolean;
  };
  onClick: () => void;
}

export default function ModuleCard({ module, onClick }: ModuleCardProps) {
  return (
    <div
      className={`bg-[#212121] rounded-xl shadow-md overflow-hidden ${
        module.locked
          ? "opacity-70"
          : "cursor-pointer hover:shadow-lg transition-shadow"
      }`}
      onClick={!module.locked ? onClick : undefined}
    >
      <div className={`bg-gradient-to-r ${module.color} p-4 text-white`}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{module.title}</h3>
          <span className="text-3xl">{module.locked ? "🔒" : module.icon}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-300 mb-4 text-sm">
          {module.locked
            ? "Deze module is nog vergrendeld"
            : module.description}
        </p>
        {!module.locked && (
          <>
            <div className="mb-2">
              <div className="flex justify-between mb-1 text-sm">
                <span>Voortgang</span>
                <span>
                  {module.lessonsCompleted}/{module.lessons} lessen
                </span>
              </div>
              <div className="w-full bg-[#121212] rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${module.color} h-2 rounded-full`}
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
            {module.xp > 0 && (
              <div className="flex items-center justify-end text-sm text-gray-400">
                <span className="font-medium">{module.xp} XP verdiend</span>
              </div>
            )}
          </>
        )}
        {module.locked && (
          <div className="flex items-center justify-center mt-2">
            <span className="text-sm text-gray-400">
              Voltooi UX Psychology om te ontgrendelen
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
