"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaMobile,
  FaList,
  FaShoppingCart,
  FaMemory,
  FaSmile,
} from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { lessonCategories } from "@/data/lessons";
import HicksLawVisual from "./ux-principles/HicksLawVisual";
import FittsLawVisual from "./ux-principles/FittsLawVisual";
import JakobsLawVisual from "./ux-principles/JakobsLawVisual";

// Base Example interface
interface Example {
  type:
    | "scenario"
    | "interactive"
    | "analysis"
    | "ux-visual"
    | "layout"
    | "contrast"
    | "buttons"
    | "fitts"
    | "hicks";
}

interface ScenarioExample extends Example {
  type: "scenario";
  question: string;
  explanation: string;
  bad: {
    title: string;
    description: string;
    options?: string[];
    feedback?: string;
    data?: {
      version_a: {
        description: string;
        conversion_rate: string;
        avg_time_to_purchase: string;
        cart_abandonment: string;
      };
      version_b: {
        description: string;
        conversion_rate: string;
        avg_time_to_purchase: string;
        cart_abandonment: string;
      };
    };
  };
  good: {
    title: string;
    description: string;
    options: string[];
    feedback: string;
  };
}

interface AnalysisExample extends Example {
  type: "analysis";
  case_study: {
    title: string;
    description: string;
    data: {
      version_a: {
        description: string;
        conversion_rate: string;
        avg_time_to_purchase: string;
        cart_abandonment: string;
      };
      version_b: {
        description: string;
        conversion_rate: string;
        avg_time_to_purchase: string;
        cart_abandonment: string;
      };
    };
  };
  question: string;
  correct_analysis: string[];
  feedback: string;
}

interface LayoutExample extends Example {
  type: "layout";
  bad: {
    title: string;
    layout: string;
    feedback: string;
  };
  good: {
    title: string;
    layout: string;
    feedback: string;
  };
}

interface ContrastExample extends Example {
  type: "contrast";
  bad: {
    title: string;
    background: string;
    textColor: string;
    feedback: string;
  };
  good: {
    title: string;
    background: string;
    textColor: string;
    feedback: string;
  };
}

interface ButtonsExample extends Example {
  type: "buttons";
  bad: {
    title: string;
    style: string;
    feedback: string;
  };
  good: {
    title: string;
    style: string;
    feedback: string;
  };
}

interface FittsExample extends Example {
  type: "fitts";
  bad: {
    title: string;
    buttonSize: string;
    buttonPosition: string;
    feedback: string;
  };
  good: {
    title: string;
    buttonSize: string;
    buttonPosition: string;
    feedback: string;
  };
}

interface HicksExample extends Example {
  type: "hicks";
  bad: {
    title: string;
    options: number;
    layout: string;
    feedback: string;
  };
  good: {
    title: string;
    options: number;
    layout: string;
    feedback: string;
  };
}

// Pas de InteractiveExample interface aan
interface InteractiveExample extends Example {
  type: "interactive";
  task: string; // Teruggezet van question
  description: string; // Teruggezet van explanation
  items: string[];
  categories: {
    name: string;
    description: string;
  }[];
  solution: {
    [category: string]: string[];
  };
  feedback: {
    correct: string; // Teruggezet van success
    incorrect: string; // Teruggezet van failure
  };
}

// Add UxVisualExample interface
interface UxVisualExample extends Example {
  type: "ux-visual";
  subtype: "hicks" | "fitts" | "jakobs" | "millers";
}

// Update the type union
type ExampleType =
  | ScenarioExample
  | InteractiveExample
  | AnalysisExample
  | LayoutExample
  | ContrastExample
  | ButtonsExample
  | FittsExample
  | HicksExample
  | UxVisualExample;

interface Lesson {
  id: string;
  title: string;
  examples: ExampleType[];
}

interface Category {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface LessonContentProps {
  onComplete: () => void;
  lessonId: string;
}

// Voeg een nieuwe interface toe voor drag-and-drop items
interface DraggableItemProps {
  id: string;
  text: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onDrop: (item: string, category: string) => void;
  category?: string;
}

// Voeg een nieuwe interface toe voor drag-and-drop categorieën
interface DroppableContainerProps {
  category: string;
  items: string[];
  onDrop: (item: string, category: string) => void;
  selectedItems: Record<string, string[]>;
}

// Draggable item component
const DraggableItem = ({ item }: { item: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "SETTING_ITEM",
    item: { name: item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Connect the drag to the ref
  drag(ref);

  return (
    <div
      ref={ref}
      className={`p-2 bg-blue-700 text-white rounded mb-2 cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {item}
    </div>
  );
};

// Droppable container component
const DroppableContainer = ({
  category,
  items,
  onDrop,
  selectedItems,
}: DroppableContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "MENU_ITEM",
    drop: (item: { id: string; text: string }) => {
      onDrop(item.text, category);
      return { name: category };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Connect the drop to the ref
  drop(ref);

  return (
    <div
      ref={ref}
      className={`min-h-[200px] border-2 border-dashed rounded-lg p-3 ${
        isOver
          ? "border-blue-500 bg-blue-50"
          : selectedItems[category]?.length
          ? "border-green-300 bg-green-50"
          : "border-gray-300"
      } transition-colors`}
    >
      <div className="space-y-2">
        {selectedItems[category]?.map((item, index) => (
          <DraggableItem key={item} item={item} />
        ))}
        {selectedItems[category]?.length === 0 && (
          <div className="flex items-center justify-center h-full min-h-[100px]">
            <p className="text-sm text-gray-500 italic">
              Sleep items naar deze categorie
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function LessonContent({
  onComplete,
  lessonId,
}: LessonContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"bad" | "good" | null>(
    null
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(
    {}
  );
  const [availableItems, setAvailableItems] = useState<string[]>([]);
  const [interactiveCorrect, setInteractiveCorrect] = useState(false);
  const [sourceItems, setSourceItems] = useState<string[]>([]);
  const [categorizedItems, setCategorizedItems] = useState<
    Record<string, string[]>
  >({});

  // Zoek de juiste categorie en les op basis van het lessonId
  const findLesson = (): Lesson | undefined => {
    if (!lessonId) return undefined;

    for (const category of Object.values(lessonCategories)) {
      const lesson = category.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return lesson;
      }
    }
    return undefined;
  };

  const currentLesson = findLesson();

  // Initialize state when component mounts or example changes
  useEffect(() => {
    if (currentLesson?.examples[currentStep]) {
      const example = currentLesson.examples[currentStep];
      if (example.type === "interactive") {
        const interactiveExample = example as InteractiveExample;
        setSourceItems(interactiveExample.items || []);
        setCategorizedItems(
          Object.fromEntries(
            interactiveExample.categories.map((cat) => [cat.name, []])
          )
        );
        setAvailableItems([...interactiveExample.items]);
        setSelectedItems(
          Object.fromEntries(
            interactiveExample.categories.map((cat) => [cat.name, []])
          )
        );
      }
    }
  }, [currentStep, currentLesson]);

  const handleNextStep = () => {
    if (!currentLesson) return;

    // Reset all state when moving to next step
    setSelectedOption(null);
    setShowFeedback(false);
    setInteractiveCorrect(false);
    setSourceItems([]);
    setCategorizedItems({});
    setSelectedItems({});
    setAvailableItems([]);

    if (currentStep < (currentLesson.examples.length ?? 0) - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleOptionSelect = (option: "bad" | "good") => {
    if (!currentLesson) return;

    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleDrop = (item: string, category: string) => {
    if (!currentLesson) return;

    // Verwijder het item uit de beschikbare items
    setAvailableItems((prev) => prev.filter((i) => i !== item));

    // Verwijder het item uit alle categorieën
    const newSelectedItems = { ...selectedItems };
    Object.keys(newSelectedItems).forEach((cat) => {
      newSelectedItems[cat] = newSelectedItems[cat] || [];
      newSelectedItems[cat] = newSelectedItems[cat].filter((i) => i !== item);
    });

    // Initialiseer de categorie als die nog niet bestaat
    if (!newSelectedItems[category]) {
      newSelectedItems[category] = [];
    }

    // Voeg het item toe aan de nieuwe categorie
    newSelectedItems[category] = [...newSelectedItems[category], item];

    setSelectedItems(newSelectedItems);
  };

  const handleItemReturn = (item: string, sourceCategory: string) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev };
      newSelectedItems[sourceCategory] = newSelectedItems[
        sourceCategory
      ].filter((i) => i !== item);
      return newSelectedItems;
    });
  };

  const checkSolution = () => {
    if (!currentLesson) return;

    const example = currentLesson.examples[currentStep];
    if (!example || example.type !== "interactive") return;

    const interactiveExample = example as InteractiveExample;
    let isCorrect = true;

    if (sourceItems.length > 0) {
      isCorrect = false;
    } else {
      Object.entries(interactiveExample.solution).forEach(
        ([category, expectedItems]) => {
          const currentItems = categorizedItems[category] || [];
          const sortedExpected = [...expectedItems].sort();
          const sortedCurrent = [...currentItems].sort();

          if (
            JSON.stringify(sortedExpected) !== JSON.stringify(sortedCurrent)
          ) {
            isCorrect = false;
          }
        }
      );

      Object.keys(categorizedItems).forEach((category) => {
        if (!interactiveExample.solution[category]) {
          if (categorizedItems[category].length > 0) {
            isCorrect = false;
          }
        }
      });
    }

    setInteractiveCorrect(isCorrect);
    setShowFeedback(true);
  };

  const renderScenarioExample = (example: ScenarioExample) => {
    if (!example) return <div>No scenario example found</div>;

    const { question, explanation, bad, good } = example;

    return (
      <div className="space-y-6">
        <div className="bg-[#2A2A2A] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">{question}</h2>
          <p className="text-gray-300 mb-6">{explanation}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#333333] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-red-400">
                {bad.title}
              </h3>
              <p className="text-gray-300 mb-4">{bad.description}</p>
              {bad.options && (
                <ul className="space-y-2 mb-4">
                  {bad.options.map((option, index) => (
                    <li key={index} className="text-gray-400 flex items-start">
                      <span className="mr-2">•</span>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => handleOptionSelect("bad")}
                className={`w-full py-2 px-4 rounded-lg ${
                  selectedOption === "bad"
                    ? "bg-red-600 text-white"
                    : "bg-red-900/50 text-red-400 hover:bg-red-900"
                }`}
              >
                Bekijk slecht voorbeeld
              </button>
            </div>

            <div className="bg-[#333333] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-green-400">
                {good.title}
              </h3>
              <p className="text-gray-300 mb-4">{good.description}</p>
              <ul className="space-y-2 mb-4">
                {good.options.map((option, index) => (
                  <li key={index} className="text-gray-400 flex items-start">
                    <span className="mr-2">•</span>
                    {option}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleOptionSelect("good")}
                className={`w-full py-2 px-4 rounded-lg ${
                  selectedOption === "good"
                    ? "bg-green-600 text-white"
                    : "bg-green-900/50 text-green-400 hover:bg-green-900"
                }`}
              >
                Bekijk goed voorbeeld
              </button>
            </div>
          </div>
        </div>

        {showFeedback && (
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {selectedOption === "bad" ? bad.title : good.title}
            </h3>
            <p className="text-gray-300">
              {selectedOption === "bad" ? bad.feedback : good.feedback}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderInteractiveExample = (example: InteractiveExample) => {
    if (!example) return <div>No interactive example found</div>;

    const { task, description, items, categories, solution, feedback } =
      example;

    const SourceDraggableItem = ({ item }: { item: string }) => {
      const ref = useRef<HTMLDivElement>(null);
      const [{ isDragging }, drag] = useDrag({
        type: "ITEM",
        item: { type: "ITEM", id: item },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

      drag(ref);

      return (
        <div
          ref={ref}
          className={`p-2 bg-[#333333] rounded-lg cursor-move ${
            isDragging ? "opacity-50" : ""
          }`}
        >
          {item}
        </div>
      );
    };

    const DroppableCategory = ({
      category,
      description,
    }: {
      category: string;
      description: string;
    }) => {
      const ref = useRef<HTMLDivElement>(null);
      const [{ isOver }, drop] = useDrop({
        accept: "ITEM",
        drop: (item: { id: string }) => handleDrop(item.id, category),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        }),
      });

      drop(ref);

      return (
        <div
          ref={ref}
          className={`p-4 rounded-lg ${
            isOver ? "bg-[#3A3A3A]" : "bg-[#2A2A2A]"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2 text-white">{category}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <div className="space-y-2">
            {selectedItems[category]?.map((item, index) => (
              <div
                key={index}
                className="p-2 bg-[#333333] rounded-lg flex justify-between items-center"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleItemReturn(item, category)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const handleDrop = (item: string, targetCategory: string) => {
      setSelectedItems((prev) => {
        const newSelectedItems = { ...prev };
        // Remove from all categories first
        Object.keys(newSelectedItems).forEach((cat) => {
          newSelectedItems[cat] = newSelectedItems[cat].filter(
            (i) => i !== item
          );
        });
        // Add to target category
        newSelectedItems[targetCategory] = [
          ...(newSelectedItems[targetCategory] || []),
          item,
        ];
        return newSelectedItems;
      });
    };

    const handleItemReturn = (item: string, sourceCategory: string) => {
      setSelectedItems((prev) => {
        const newSelectedItems = { ...prev };
        newSelectedItems[sourceCategory] = newSelectedItems[
          sourceCategory
        ].filter((i) => i !== item);
        return newSelectedItems;
      });
    };

    const checkSolution = () => {
      const isCorrect = Object.entries(solution).every(
        ([category, items]) =>
          selectedItems[category]?.length === items.length &&
          items.every((item) => selectedItems[category]?.includes(item))
      );
      setInteractiveCorrect(isCorrect);
      setShowFeedback(true);
    };

    const resetExercise = () => {
      setSelectedItems(
        Object.fromEntries(categories.map((cat) => [cat.name, []]))
      );
      setInteractiveCorrect(false);
      setShowFeedback(false);
    };

    return (
      <div className="space-y-6">
        <div className="bg-[#2A2A2A] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">{task}</h2>
          <p className="text-gray-300 mb-6">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#333333] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Beschikbare items
              </h3>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <SourceDraggableItem key={index} item={item} />
                ))}
              </div>
            </div>

            <div className="bg-[#333333] p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Categorieën
              </h3>
              <div className="space-y-4">
                {categories.map((cat, index) => (
                  <DroppableCategory
                    key={index}
                    category={cat.name}
                    description={cat.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {showFeedback && (
          <div className="bg-[#2A2A2A] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {interactiveCorrect ? "Correct!" : "Niet helemaal correct"}
            </h3>
            <p className="text-gray-300 mb-6">
              {interactiveCorrect ? feedback.correct : feedback.incorrect}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={resetExercise}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
              >
                Opnieuw proberen
              </button>
              <button
                onClick={handleNextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
              >
                <span className="mr-2">Volgende</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {!showFeedback && (
          <div className="flex justify-end">
            <button
              onClick={checkSolution}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Controleer oplossing
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderAnalysisExample = (example: AnalysisExample) => {
    if (!example) return <div>No analysis example found</div>;

    return <div>Analysis example not implemented yet</div>;
  };

  const renderExampleContent = (example: ExampleType) => {
    if (!example) return <div>No example found</div>;

    switch (example.type) {
      case "scenario":
        return renderScenarioExample(example);
      case "interactive":
        return renderInteractiveExample(example);
      case "analysis":
        return renderAnalysisExample(example);
      case "ux-visual":
        if (example.subtype === "hicks") {
          return <HicksLawVisual onComplete={handleNextStep} />;
        } else if (example.subtype === "fitts") {
          return <FittsLawVisual onComplete={handleNextStep} />;
        } else if (example.subtype === "jakobs") {
          return <JakobsLawVisual onComplete={handleNextStep} />;
        }
        return <div>Unsupported UX visual type</div>;
      case "layout":
        return <div>Layout example</div>;
      case "contrast":
        return <div>Contrast example</div>;
      case "buttons":
        return <div>Buttons example</div>;
      case "fitts":
        return <div>Fitts example</div>;
      case "hicks":
        return <div>Hicks example</div>;
      default:
        return <div>Unsupported example type</div>;
    }
  };

  if (!currentLesson) {
    return (
      <div className="bg-[#212121] p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Les niet gevonden
        </h1>
        <p className="text-gray-300">
          De les met ID {lessonId} kon niet worden gevonden.
        </p>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="bg-[#212121] p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-white">
            {currentLesson.title}
          </h1>

          {currentLesson.examples[currentStep] && (
            <div>
              {renderExampleContent(currentLesson.examples[currentStep])}
            </div>
          )}

          {showFeedback && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
              >
                <span className="mr-2">
                  {currentStep < (currentLesson?.examples.length ?? 0) - 1
                    ? "Volgende"
                    : "Afronden"}
                </span>
                {currentStep < (currentLesson?.examples.length ?? 0) - 1 ? (
                  <FaArrowRight />
                ) : (
                  <FaCheck />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
