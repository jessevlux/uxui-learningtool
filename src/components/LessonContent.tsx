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

// Base Example interface
interface Example {
  type: string;
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

// Add this after your other interface definitions
interface InteractiveExample extends Example {
  type: "interactive";
  question: string;
  explanation: string;
  items: string[];
  categories: {
    name: string;
    description: string;
  }[];
  solution: {
    [category: string]: string[];
  };
  feedback: {
    success: string;
    failure: string;
  };
}

// Update the type union
type ExampleType = {
  type: string;
} & (
  | ScenarioExample
  | InteractiveExample
  | AnalysisExample
  | LayoutExample
  | ContrastExample
  | ButtonsExample
  | FittsExample
  | HicksExample
);

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
  const [selectedOption, setSelectedOption] = useState<"bad" | "good" | null>(
    null
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(
    {}
  );
  const [availableItems, setAvailableItems] = useState<string[]>([]);
  const [interactiveCorrect, setInteractiveCorrect] = useState(false);

  // Zoek de juiste categorie en les op basis van het lessonId
  const findLesson = () => {
    // Controleer eerst of het een directe match is
    for (const categoryKey in lessonCategories) {
      const category = lessonCategories[categoryKey];
      for (const lesson of category.lessons) {
        if (lesson.id === lessonId) {
          return lesson;
        }
      }
    }

    // Als er geen directe match is, probeer het moduleId te extraheren
    const moduleIdMatch = lessonId.match(/^(\d+)-/);
    if (moduleIdMatch) {
      const moduleId = moduleIdMatch[1];
      const category = lessonCategories[`ux-${getModuleName(moduleId)}`];

      if (category) {
        for (const lesson of category.lessons) {
          if (lesson.id === lessonId) {
            return lesson;
          }
        }
      }
    }

    return null;
  };

  // Helper functie om modulenaam te krijgen
  const getModuleName = (moduleId: string) => {
    switch (moduleId) {
      case "1":
        return "basics";
      case "2":
        return "design";
      case "3":
        return "psychology";
      case "4":
        return "process";
      default:
        return "";
    }
  };

  const currentLesson = findLesson();

  useEffect(() => {
    // Reset state wanneer we naar een nieuwe stap gaan
    setSelectedOption(null);
    setShowFeedback(false);

    // Initialiseer drag-and-drop items als het een interactief voorbeeld is
    if (
      currentLesson &&
      currentLesson.examples[currentStep]?.type === "interactive"
    ) {
      const example = currentLesson.examples[
        currentStep
      ] as unknown as InteractiveExample;
      setAvailableItems([...example.items]);
      setSelectedItems(
        Object.fromEntries(example.categories.map((cat) => [cat, []]))
      );
    }
  }, [currentStep, currentLesson]);

  const handleOptionSelect = (option: "bad" | "good") => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleNextStep = () => {
    if (currentStep < currentLesson!.examples.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setInteractiveCorrect(false);
    } else {
      onComplete();
    }
  };

  const handleDrop = (item: string, category: string) => {
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

  const checkSolution = () => {
    const example = currentLesson!.examples[
      currentStep
    ] as unknown as InteractiveExample;
    let isCorrect = true;

    // Controleer of elke categorie de juiste items bevat
    Object.entries(example.solution).forEach(([category, expectedItems]) => {
      const currentItems = selectedItems[category] || [];

      // Controleer of alle verwachte items aanwezig zijn
      expectedItems.forEach((item) => {
        if (!currentItems.includes(item)) {
          isCorrect = false;
        }
      });

      // Controleer of er geen extra items zijn
      if (currentItems.length !== expectedItems.length) {
        isCorrect = false;
      }
    });

    setInteractiveCorrect(isCorrect);
    setShowFeedback(true);
  };

  const renderScenarioExample = (example: ScenarioExample) => {
    // Specifieke check voor zelfscan-kassa voorbeeld
    const isZelfscanExample = example.question.includes("zelfscan-kassa");
    const isNavigationExample = example.question.includes("navigatiebalk");

    const [selectedOption, setSelectedOption] = useState<"bad" | "good" | null>(
      null
    );
    const [showFeedback, setShowFeedback] = useState(false);

    // Ophalen van opties
    const simplifiedBadOptions: string[] =
      "options" in example.bad && Array.isArray(example.bad.options)
        ? (example.bad.options as string[])
        : [];

    const simplifiedGoodOptions: string[] = Array.isArray(example.good.options)
      ? example.good.options
      : [];

    const handleOptionSelect = (option: "bad" | "good") => {
      setSelectedOption(option);
      setShowFeedback(true);
    };

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">
            {isZelfscanExample
              ? "Welke zelfscankassa interface is beter?"
              : example.question}
          </h2>
          <p className="text-gray-300 mb-6">
            {isZelfscanExample
              ? "Hick's Law: meer keuzes = langere beslissingstijd"
              : example.explanation}
          </p>
        </div>

        {/* Keuze tussen de twee voorbeelden - neutrale stijl vóór keuze */}
        <div className="flex flex-col gap-6 mb-8">
          {/* SLECHT VOORBEELD - Keuzeoptie */}
          <div
            className={`bg-[#2a2a2a] p-4 sm:p-6 rounded-lg border ${
              !showFeedback
                ? "border-gray-700 cursor-pointer hover:border-gray-500"
                : selectedOption === "bad"
                ? "border-red-900 bg-red-900/10"
                : "border-gray-700 opacity-70"
            } transition-all ${
              selectedOption === "bad" && showFeedback
                ? "ring-4 ring-red-500"
                : ""
            }`}
            onClick={() => !showFeedback && handleOptionSelect("bad")}
          >
            <h3
              className={`text-xl font-bold mb-2 ${
                !showFeedback ? "text-white" : "text-red-500"
              }`}
            >
              {isZelfscanExample
                ? !showFeedback
                  ? "Optie A"
                  : "Te veel keuzes"
                : example.bad.title}
            </h3>

            {isZelfscanExample ? (
              <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg">
                {/* Producten lijst met expliciete titel */}
                <div className="mb-3 sm:mb-4">
                  <div className="text-xs text-gray-400 mb-1 sm:mb-2">
                    Producten
                  </div>
                  <div className="border border-gray-700 bg-[#222] p-2 rounded text-sm overflow-hidden">
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>2x Melk 1L</span>
                      <span>€2,38</span>
                    </div>
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>1x Brood</span>
                      <span>€2,49</span>
                    </div>
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>3x Appel</span>
                      <span>€1,47</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>1x Kaas 500g</span>
                      <span>€5,99</span>
                    </div>
                  </div>
                </div>

                {/* Verplaatste totaalbalk met afgeronde hoeken */}
                <div className="bg-[#333] text-white p-2 mb-3 sm:mb-4 text-xs sm:text-sm rounded-lg flex justify-between">
                  <span>Artikelen: 7</span>
                  <span className="font-bold">€43,28</span>
                </div>

                {/* Gecombineerde Acties en Betaalmethoden Section */}
                <div className="mb-3 border-b border-gray-700 pb-3">
                  <div className="text-xs text-gray-400 mb-1 sm:mb-2">
                    Acties & Betaalmethoden
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                    <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                      ➕ Product
                    </div>
                    <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                      ➖ Verwijderen
                    </div>
                    <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                      🛒 Winkelwagen
                    </div>
                    <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                      📇 Bonuskaart
                    </div>
                    <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                      🏷️ Kortingscode
                    </div>
                    <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                      💳 PIN
                    </div>
                    <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                      💵 Contant
                    </div>
                    <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                      🎁 Cadeaukaart
                    </div>
                  </div>
                </div>

                {/* Overig Section */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                  <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                    🧾 Kassabon
                  </div>
                  <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                    ❓ Hulp
                  </div>
                  <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                    🏠 Terug
                  </div>
                  <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                    ⚠️ Storing
                  </div>
                  <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                    🅿️ Parkeren
                  </div>
                  <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                    🌐 Taal
                  </div>
                  <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                    ℹ️ Info
                  </div>
                  <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                    ☰ Menu
                  </div>
                </div>
              </div>
            ) : isNavigationExample ? (
              <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-white relative overflow-hidden shadow-lg">
                {/* Overvolle navigatiebalk met eigen branding */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-t">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-bold text-xl flex items-center">
                      <span className="bg-yellow-400 text-purple-800 px-2 py-1 rounded-md mr-1">
                        MEGA
                      </span>
                      <span>Shop</span>
                      <span className="text-yellow-300 ml-1 text-sm">★★★</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-white bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center">
                        🔍
                      </div>
                      <div className="text-white bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center">
                        👤
                      </div>
                      <div className="text-white bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center">
                        🛒
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overvolle navigatiebalk */}
                <div className="bg-gray-100 flex flex-wrap gap-1 py-2 border-b border-gray-300 px-2">
                  {[
                    "Dames",
                    "Heren",
                    "Kinderen",
                    "Sport",
                    "Sale",
                    "Nieuw",
                    "Merken",
                    "Accessoires",
                    "Wintercollectie",
                    "Zomercollectie",
                    "Schoenen",
                    "Kleding",
                    "Tassen",
                    "Outlet",
                    "Cadeaus",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-gray-700 text-sm px-2 py-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Submenu dat verdwijnt */}
                <div className="mt-2 p-2 bg-white rounded border border-gray-300 relative shadow-sm">
                  <div className="absolute top-0 right-0 text-xs text-red-500 bg-red-100 px-1 rounded font-semibold">
                    Verdwijnt bij muisbeweging
                  </div>
                  <div className="text-xs text-gray-700 mb-1 font-bold">
                    Submenu: Heren
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      "T-shirts",
                      "Broeken",
                      "Jassen",
                      "Schoenen",
                      "Accessoires",
                      "Sportkleding",
                      "Ondergoed",
                      "Sokken",
                      "Zwemkleding",
                      "Feestkleding",
                      "Werkkleding",
                      "Pyjama's",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="text-gray-700 text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Afleidende animaties en kleuren */}
                <div className="mt-2 flex justify-between">
                  <div className="text-white text-xs px-2 py-1 bg-red-500 rounded animate-pulse font-bold">
                    SALE! 🔥 TOT 70% KORTING
                  </div>
                  <div className="text-white text-xs px-2 py-1 bg-green-500 rounded font-bold">
                    NIEUW BINNEN ✨
                  </div>
                  <div className="text-white text-xs px-2 py-1 bg-blue-500 rounded font-bold">
                    POPULAIRE ITEMS 👍
                  </div>
                  <div className="text-white text-xs px-2 py-1 bg-purple-500 rounded font-bold">
                    LIMITED EDITION 🌟
                  </div>
                </div>

                {/* Meer flitsende animaties en pop-ups */}
                <div className="mt-2 bg-yellow-100 border border-yellow-500 p-2 rounded-lg animate-pulse">
                  <div className="text-yellow-800 text-sm font-bold flex items-center">
                    <span className="mr-1">🎁</span> Win een gratis item! Meld
                    je nu aan voor de nieuwsbrief!
                  </div>
                </div>

                <div className="text-xs text-gray-600 mt-4 mb-1 font-semibold">
                  Problemen met dit ontwerp:
                </div>
                <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                  <li>Te veel categorieën (15+) zonder hiërarchie</li>
                  <li>Alle items hebben dezelfde grootte en stijl</li>
                  <li>Submenu's verdwijnen bij muisbeweging</li>
                  <li>Afleidende kleuren, pop-ups en animaties</li>
                  <li>Geen duidelijke visuele hiërarchie</li>
                </ul>
              </div>
            ) : (
              <ul className="list-disc pl-5 mb-4 space-y-2">
                {simplifiedBadOptions.map((option, index) => (
                  <li key={index} className="text-gray-300">
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* GOED VOORBEELD - Keuzeoptie */}
          <div
            className={`bg-[#2a2a2a] p-4 sm:p-6 rounded-lg border ${
              !showFeedback
                ? "border-gray-700 cursor-pointer hover:border-gray-500"
                : selectedOption === "good"
                ? "border-green-900 bg-green-900/10"
                : "border-gray-700 opacity-70"
            } transition-all ${
              selectedOption === "good" && showFeedback
                ? "ring-4 ring-green-500"
                : ""
            }`}
            onClick={() => !showFeedback && handleOptionSelect("good")}
          >
            <h3
              className={`text-xl font-bold mb-2 ${
                !showFeedback ? "text-white" : "text-green-500"
              }`}
            >
              {isZelfscanExample
                ? !showFeedback
                  ? "Optie B"
                  : "Duidelijke hiërarchie"
                : example.good.title}
            </h3>

            {isZelfscanExample ? (
              <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative shadow-lg">
                {/* Producten lijst met expliciete titel */}
                <div className="mb-4 sm:mb-5">
                  <div className="text-xs text-gray-400 mb-1 sm:mb-2">
                    Producten
                  </div>
                  <div
                    className="bg-[#222] p-2 rounded border border-gray-700 overflow-hidden"
                    style={{ minHeight: "100px", maxHeight: "150px" }}
                  >
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>2x Melk 1L</span>
                      <span>€2,38</span>
                    </div>
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>1x Brood</span>
                      <span>€2,49</span>
                    </div>
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>3x Appel</span>
                      <span>€1,47</span>
                    </div>
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>1x Kaas 500g</span>
                      <span>€5,99</span>
                    </div>
                  </div>
                </div>

                {/* Verplaatste totaalbalk met afgeronde hoeken */}
                <div className="bg-[#333] text-white p-2 mb-5 text-sm rounded-lg flex justify-between">
                  <span>Artikelen: 7</span>
                  <span className="font-bold">€43,28</span>
                </div>

                {/* Gestructureerde knoppen layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
                  <div className="border border-gray-600 rounded-lg py-1 sm:py-2 px-2 sm:px-3 bg-gray-800 text-center text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                    ➕ Product toevoegen
                  </div>
                  <div className="border border-gray-600 rounded-lg py-1 sm:py-2 px-2 sm:px-3 bg-gray-800 text-center text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                    🏷️ Kortingscode
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="flex gap-2">
                    <div className="border border-gray-600 rounded py-1 sm:py-2 px-2 sm:px-3 bg-gray-800 text-center text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                      ❓ Hulp
                    </div>
                    <div className="border border-gray-600 rounded py-1 sm:py-2 px-2 sm:px-3 bg-gray-800 text-center text-gray-300 text-sm hover:bg-gray-700 transition-colors">
                      ☰ Menu
                    </div>
                  </div>
                  <div className="border-2 border-green-600 rounded-lg py-1 sm:py-2 px-3 sm:px-4 bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors">
                    💳 BETALEN
                  </div>
                </div>
              </div>
            ) : isNavigationExample ? (
              <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative shadow-lg">
                <div className="bg-gray-900 p-3 rounded-t">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-bold text-xl">
                      <span className="border-b-2 border-blue-500">
                        simplify
                      </span>
                    </div>

                    {/* Prominente zoekbalk */}
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-full flex items-center px-3 py-1 border-2 border-blue-500">
                        <span className="text-blue-500 mr-2">🔍</span>
                        <span className="text-gray-500 text-sm">
                          Zoek producten...
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-white hover:text-blue-300 transition-colors">
                        👤
                      </div>
                      <div className="text-white hover:text-blue-300 transition-colors relative">
                        🛒
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          2
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Gestructureerde navigatiebalk */}
                  <div className="flex justify-between py-2 mt-2">
                    {["Heren", "Dames", "Kinderen", "Sale", "Merken"].map(
                      (item, index) => (
                        <div
                          key={index}
                          className="text-white font-semibold text-sm px-3 py-1 hover:bg-blue-800 rounded transition-colors cursor-pointer"
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Submenu dat open blijft */}
                <div className="mt-1 p-3 bg-gray-100 border border-gray-300 relative">
                  <div className="absolute top-1 right-1 text-xs text-blue-700 bg-blue-100 px-1 rounded font-semibold">
                    Blijft open na klikken
                  </div>
                  <div className="text-sm text-gray-800 mb-2 font-semibold border-b border-gray-300 pb-1">
                    Heren &gt; Schoenen
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Sneakers",
                      "Hardloopschoenen",
                      "Voetbalschoenen",
                      "Casual",
                      "Luxe",
                      "Sale",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="text-gray-700 text-sm px-3 py-2 bg-white rounded shadow-sm hover:shadow transition-all cursor-pointer"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Aanbevolen producten sectie */}
                  <div className="mt-3 text-sm text-gray-800 font-semibold">
                    Populaire sneakers
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="bg-white p-2 rounded shadow-sm">
                      <div className="text-blue-600 text-xs font-semibold">
                        Nike Air Max
                      </div>
                      <div className="text-gray-700 text-xs">€129,99</div>
                    </div>
                    <div className="bg-white p-2 rounded shadow-sm">
                      <div className="text-blue-600 text-xs font-semibold">
                        Adidas Ultraboost
                      </div>
                      <div className="text-gray-700 text-xs">€159,99</div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-600 mt-4 mb-1 font-semibold">
                  Voordelen van dit ontwerp:
                </div>
                <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                  <li>Slechts 5 hoofdcategorieën met duidelijke hiërarchie</li>
                  <li>
                    Consistente branding en kleurgebruik (zwart, wit, blauw)
                  </li>
                  <li>
                    Submenu's bevatten maximaal 6 opties met duidelijke ordening
                  </li>
                  <li>
                    Menu blijft open na klikken voor betere gebruikservaring
                  </li>
                  <li>Prominente zoekbalk voor directe toegang</li>
                  <li>Rustige visuele stijl zonder afleidende elementen</li>
                </ul>
              </div>
            ) : (
              <ul className="list-disc pl-5 mb-4 space-y-2">
                {simplifiedGoodOptions.map((option, index) => (
                  <li key={index} className="text-gray-300">
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Feedback onder de voorbeelden */}
        {showFeedback && (
          <div className="mt-8">
            <div
              className={`p-6 rounded-lg border ${
                selectedOption === "good"
                  ? "border-green-900 bg-green-900/20"
                  : "border-red-900 bg-red-900/20"
              }`}
            >
              <h3 className="text-xl font-bold mb-4 text-white">
                {selectedOption === "good" ? "Goed gekozen!" : "Niet optimaal"}
              </h3>

              <div className="mb-6">
                <p className="text-gray-200 mb-4">
                  {selectedOption === "good"
                    ? "Je hebt de betere interface gekozen. Hier is waarom dit een betere keuze is:"
                    : "Deze interface heeft enkele problemen. Hier is waarom de andere optie beter is:"}
                </p>

                <p className="text-gray-200">
                  {selectedOption === "good"
                    ? "feedback" in example.good
                      ? (example.good.feedback as string)
                      : "Deze interface gebruikt duidelijke visuele hiërarchie met slechts 6 knoppen. De meest gebruikte functies zijn direct toegankelijk, terwijl minder gebruikte opties in het menu staan."
                    : "feedback" in example.bad
                    ? (example.bad.feedback as string)
                    : "Deze interface heeft 25 knoppen zonder duidelijke hiërarchie, wat leidt tot langere beslissingstijd volgens Hick's Law."}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleNextStep}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center"
              >
                <span className="mr-2">Volgende</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderInteractiveExample = (example: InteractiveExample) => {
    const isSettingsExample = example.question.includes("instellingenpagina");

    const [availableItems, setAvailableItems] = useState<string[]>(
      example.items || []
    );
    const [selectedItems, setSelectedItems] = useState<{
      [key: string]: string[];
    }>({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [interactiveCorrect, setInteractiveCorrect] = useState(false);

    const handleDrop = (item: string, category: string) => {
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

    const handleItemReturn = (item: string) => {
      // Verwijder het item uit alle categorieën
      const newSelectedItems = { ...selectedItems };
      Object.keys(newSelectedItems).forEach((cat) => {
        newSelectedItems[cat] = newSelectedItems[cat].filter((i) => i !== item);
      });
      setSelectedItems(newSelectedItems);

      // Voeg het item terug toe aan beschikbare items
      setAvailableItems((prev) => [...prev, item]);
    };

    const checkSolution = () => {
      let isCorrect = true;

      // Controleer of elke categorie de juiste items bevat
      Object.entries(example.solution).forEach(([category, expectedItems]) => {
        const currentItems = selectedItems[category] || [];

        // De volgorde maakt niet uit, alleen dat de juiste items in de juiste categorie zitten
        // Controleer of alle verwachte items aanwezig zijn
        if (expectedItems.length !== currentItems.length) {
          isCorrect = false;
          return;
        }

        // Controleer of alle items overeenkomen
        for (const item of expectedItems) {
          if (!currentItems.includes(item)) {
            isCorrect = false;
            return;
          }
        }
      });

      setInteractiveCorrect(isCorrect);
      setShowFeedback(true);
    };

    // Een droppable categorie component
    const DroppableCategory = ({
      category,
      description,
    }: {
      category: string;
      description: string;
    }) => {
      const ref = useRef<HTMLDivElement>(null);
      const [{ isOver }, drop] = useDrop<
        { name: string },
        void,
        { isOver: boolean }
      >(() => ({
        accept: "SETTING_ITEM",
        drop: (item: { name: string }) => handleDrop(item.name, category),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }));

      // Connect the drop to the ref
      drop(ref);

      return (
        <div
          ref={ref}
          className={`p-4 border ${
            isOver ? "border-blue-500 bg-blue-100" : "border-gray-300"
          } rounded-lg mb-4 min-h-[150px]`}
        >
          <h3 className="font-bold text-gray-800 mb-1">{category}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="space-y-2">
            {(selectedItems[category] || []).map((item) => (
              <div
                key={item}
                className="p-2 bg-blue-600 text-white rounded flex justify-between items-center"
                onClick={() => handleItemReturn(item)}
              >
                <span>{item}</span>
                <span className="text-xs text-white cursor-pointer">✕</span>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">
            {example.question}
          </h2>
          <p className="text-gray-300 mb-6">{example.explanation}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Linker kolom: De slecht ingedeelde instellingenpagina */}
          <div className="w-full lg:w-1/3 bg-[#2a2a2a] p-4 rounded-lg">
            <h3 className="font-bold text-white mb-4">
              Instellingen (ongeorganiseerd)
            </h3>

            {availableItems.length === 0 ? (
              <p className="text-gray-400 italic">Alle items zijn ingedeeld</p>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto p-2">
                {availableItems.map((item) => (
                  <DraggableItem key={item} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Rechter kolom: De categorieën waaraan items kunnen worden toegewezen */}
          <div className="w-full lg:w-2/3">
            <h3 className="font-bold text-white mb-4">
              Instellingen organiseren in categorieën
            </h3>
            <p className="text-gray-400 mb-4">
              Sleep de instellingen naar de juiste categorie
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-2">
              {example.categories.map((cat) => (
                <DroppableCategory
                  key={cat.name}
                  category={cat.name}
                  description={cat.description}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  // Reset the exercise
                  setAvailableItems(example.items);
                  setSelectedItems({});
                  setShowFeedback(false);
                }}
                className="px-4 py-2 bg-gray-600 rounded text-white"
              >
                Reset
              </button>

              <button
                onClick={checkSolution}
                className="px-4 py-2 bg-blue-600 rounded text-white"
                disabled={availableItems.length > 0}
              >
                Controleer
              </button>
            </div>
          </div>
        </div>

        {/* Feedback wanneer gecontroleerd */}
        {showFeedback && (
          <div
            className={`p-6 rounded-lg mt-8 ${
              interactiveCorrect
                ? "bg-green-900/20 border border-green-900"
                : "bg-orange-900/20 border border-orange-900"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-white">
              {interactiveCorrect ? "Uitstekend!" : "Bijna goed!"}
            </h3>
            <p className="text-gray-300">
              {interactiveCorrect
                ? example.feedback.success
                : example.feedback.failure}
            </p>

            {!interactiveCorrect && (
              <button
                onClick={() => setShowFeedback(false)}
                className="mt-4 px-4 py-2 bg-orange-700 rounded text-white"
              >
                Probeer opnieuw
              </button>
            )}

            {interactiveCorrect && (
              <button
                onClick={() => handleNextStep()}
                className="mt-4 px-4 py-2 bg-blue-600 rounded text-white flex items-center"
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
            )}
          </div>
        )}
      </div>
    );
  };

  const renderAnalysisExample = (example: AnalysisExample) => {
    return <div>Analysis example not implemented yet</div>;
  };

  const renderExampleContent = (example: ExampleType) => {
    switch (example.type) {
      case "scenario":
        return renderScenarioExample(example as ScenarioExample);
      case "interactive":
        return renderInteractiveExample(example as InteractiveExample);
      case "analysis":
        return renderAnalysisExample(example as AnalysisExample);
      default:
        return <div>Onbekend vraagtype</div>;
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

          {currentLesson.examples.map((example, index) => (
            <div
              key={index}
              className={currentStep === index ? "block" : "hidden"}
            >
              {renderExampleContent(example)}
            </div>
          ))}

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
