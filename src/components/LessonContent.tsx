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

interface ScenarioExample {
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

interface InteractiveExample {
  type: "interactive";
  task: string;
  description: string;
  items: string[];
  categories: string[];
  solution: Record<string, string[]>;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

interface AnalysisExample {
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

interface LayoutExample {
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

interface ContrastExample {
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

interface ButtonsExample {
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

interface FittsExample {
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

interface HicksExample {
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

type Example =
  | ScenarioExample
  | InteractiveExample
  | AnalysisExample
  | LayoutExample
  | ContrastExample
  | ButtonsExample
  | FittsExample
  | HicksExample;

interface Lesson {
  id: string;
  title: string;
  examples: Example[];
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
const DraggableItem = ({ id, text, onDrop, category }: DraggableItemProps) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "MENU_ITEM",
    item: { id, text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef as unknown as React.RefObject<HTMLDivElement>}
      className={`p-3 rounded-lg ${
        category
          ? "bg-blue-100 border border-blue-200"
          : "bg-white border border-gray-200 shadow-sm"
      } cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      } transition-all hover:shadow-md`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <span className="text-sm font-medium text-gray-700">{text}</span>
      </div>
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
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "MENU_ITEM",
    drop: (item: { id: string; text: string }) => {
      onDrop(item.text, category);
      return { name: category };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
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
          <DraggableItem
            key={item}
            id={item}
            text={item}
            index={index}
            moveItem={() => {}}
            onDrop={onDrop}
            category={category}
          />
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
      const example = currentLesson.examples[currentStep] as InteractiveExample;
      setAvailableItems([...example.items]);
      setSelectedItems(
        Object.fromEntries(example.categories.map((cat) => [cat, []]))
      );
    }
  }, [currentStep, currentLesson]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
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
    const example = currentLesson!.examples[currentStep] as InteractiveExample;
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

    // Vereenvoudigde opties met type check
    const simplifiedBadOptions: string[] = isZelfscanExample
      ? [
          "💳 PIN",
          "💵 Contant",
          "💰 Creditcard",
          "🎁 Cadeaukaart",
          "➕ Product",
          "➖ Verwijderen",
          "🏷️ Kortingscode",
          "📇 Bonuskaart",
          "❓ Hulp",
          "🏠 Terug",
          "ℹ️ Info",
          "🌐 Taal",
          "🔊 Geluid",
          "🔆 Helderheid",
          "🔤 Lettergrootte",
          "🧾 Kassabon",
          "🛒 Winkelwagen",
          "💲 Prijscheck",
          "📞 Klantenservice",
          "⚠️ Storing",
          "❌ Afbreken",
          "🅿️ Parkeren",
          "🎫 Zegels",
          "💳 Klantenkaart",
          "☰ Menu",
        ]
      : "options" in example.bad && Array.isArray(example.bad.options)
      ? (example.bad.options as string[])
      : [];

    const simplifiedGoodOptions: string[] = isZelfscanExample
      ? [
          "💳 BETALEN",
          "➕ Product",
          "🏷️ Kortingscode",
          "❓ Hulp",
          "🏠 Terug",
          "☰ Menu",
        ]
      : Array.isArray(example.good.options)
      ? example.good.options
      : [];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">
            {isZelfscanExample ? "Welke kassa is beter?" : example.question}
          </h2>
          <p className="text-gray-300 mb-6">
            {isZelfscanExample
              ? "Hick's Law: meer keuzes = langere beslissingstijd"
              : example.explanation}
          </p>
        </div>

        {/* SLECHT VOORBEELD - aanpassing van layout en hoogte */}
        <div className="border-4 border-gray-700 rounded-lg p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg">
          {/* Producten lijst met expliciete titel */}
          <div className="mb-4">
            <div className="text-xs text-gray-400 mb-2">Producten</div>
            <div className="border border-gray-700 bg-[#222] p-1 rounded text-xs overflow-hidden">
              <div className="flex justify-between text-gray-400 mb-1">
                <span>2x Melk 1L</span>
                <span>€2,38</span>
              </div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>1x Brood</span>
                <span>€2,49</span>
              </div>
              <div className="flex justify-between text-gray-400 mb-1">
                <span>3x Appel</span>
                <span>€1,47</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>1x Kaas 500g</span>
                <span>€5,99</span>
              </div>
            </div>
          </div>

          {/* Verplaatste totaalbalk met afgeronde hoeken */}
          <div className="bg-[#333] text-white p-2 mb-4 text-sm rounded-lg flex justify-between">
            <span>Artikelen: 7</span>
            <span className="font-bold">€43,28</span>
          </div>

          {/* Product acties Section - onder elkaar */}
          <div className="mb-3 border-b border-gray-700 pb-3">
            <div className="text-xs text-gray-400 mb-2">Acties</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-blue-700 rounded p-2 text-sm bg-blue-900/20 text-center text-blue-400">
                ➕ Product
              </div>
              <div className="border border-red-700 rounded p-2 text-sm bg-red-900/20 text-center text-red-400">
                ➖ Verwijderen
              </div>
              <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                💲 Prijscheck
              </div>
              <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                🛒 Winkelwagen
              </div>
              <div className="border border-purple-700 rounded p-2 text-sm bg-purple-900/20 text-center text-purple-400">
                📇 Bonuskaart
              </div>
              <div className="border border-green-700 rounded p-2 text-sm bg-green-900/20 text-center text-green-400">
                🏷️ Kortingscode
              </div>
            </div>
          </div>

          {/* Betaal Section */}
          <div className="mb-3 border-b border-gray-700 pb-3">
            <div className="text-xs text-gray-400 mb-2">Betaalmethoden</div>
            <div className="grid grid-cols-4 gap-2">
              <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                💳 PIN
              </div>
              <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                💵 Contant
              </div>
              <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                💰 Creditcard
              </div>
              <div className="border border-gray-600 rounded p-2 text-sm bg-[#333] text-center text-gray-300">
                🎁 Cadeaukaart
              </div>
            </div>
          </div>

          {/* Overig Section */}
          <div className="grid grid-cols-4 gap-2">
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

        {/* Feedback sectie voor slecht voorbeeld */}
        <div className="bg-red-900/30 p-3 rounded border border-red-800 mb-8">
          <p className="text-gray-200">
            {isZelfscanExample
              ? "Probleem: 25 knoppen zonder duidelijke hiërarchie → traag, frustrerend, foutgevoelig"
              : "feedback" in example.bad
              ? (example.bad.feedback as string)
              : "Geen feedback beschikbaar"}
          </p>
        </div>

        {/* GOED VOORBEELD - Realistischer zelfscan layout */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg border border-green-900 mb-8">
          <h3 className="text-xl font-bold mb-2 text-green-500">
            {isZelfscanExample ? "Duidelijke hiërarchie" : example.good.title}
          </h3>

          {isZelfscanExample ? (
            <div className="border-4 border-gray-700 rounded-lg p-4 mb-4 bg-[#1a1a1a] relative shadow-lg">
              {/* Productlijst met expliciete titel */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">Producten</div>
                <div className="bg-[#222] p-2 rounded border border-gray-700 overflow-hidden">
                  <div className="flex justify-between text-gray-300 mb-1 text-sm">
                    <span>2x Melk 1L</span>
                    <span>€2,38</span>
                  </div>
                  <div className="flex justify-between text-gray-300 mb-1 text-sm">
                    <span>1x Brood</span>
                    <span>€2,49</span>
                  </div>
                  <div className="flex justify-between text-gray-300 mb-1 text-sm">
                    <span>3x Appel</span>
                    <span>€1,47</span>
                  </div>
                  <div className="flex justify-between text-gray-300 mb-1 text-sm">
                    <span>1x Kaas 500g</span>
                    <span>€5,99</span>
                  </div>
                </div>
              </div>

              {/* Verplaatste totaalbalk met afgeronde hoeken */}
              <div className="bg-[#333] text-white p-2 mb-4 text-sm rounded-lg flex justify-between">
                <span>Artikelen: 7</span>
                <span className="font-bold">€43,28</span>
              </div>

              {/* Belangrijkste acties */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="border border-blue-600 rounded-lg py-2 px-3 bg-blue-900/20 text-center text-blue-400 hover:bg-blue-900/30 transition-colors">
                  ➕ Product toevoegen
                </div>
                <div className="border border-blue-600 rounded-lg py-2 px-3 bg-blue-900/20 text-center text-blue-400 hover:bg-blue-900/30 transition-colors">
                  🏷️ Kortingscode
                </div>
              </div>

              {/* Footer met navigatie en betalen */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="border border-gray-600 rounded py-2 px-3 bg-gray-800 text-center text-gray-300 hover:bg-gray-700 transition-colors">
                    ❓ Hulp
                  </div>
                  <div className="border border-gray-600 rounded py-2 px-3 bg-gray-800 text-center text-gray-300 hover:bg-gray-700 transition-colors">
                    ☰ Menu
                  </div>
                </div>
                <div className="border-2 border-green-600 rounded-lg py-2 px-4 bg-green-600 text-white font-bold hover:bg-green-700 transition-colors">
                  💳 BETALEN
                </div>
              </div>
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

          {/* Feedback sectie */}
          <div className="bg-green-900/30 p-3 rounded border border-green-800">
            <p className="text-gray-200">
              {isZelfscanExample
                ? "Oplossing: 6 knoppen met duidelijke visuele hiërarchie → sneller, minder stress, intuïtief"
                : "feedback" in example.good
                ? (example.good.feedback as string)
                : "Geen feedback beschikbaar"}
            </p>
          </div>
        </div>

        {/* Show feedback button */}
        {!showFeedback && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowFeedback(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">Volgende</span>
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderInteractiveExample = (example: InteractiveExample) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">{example.task}</h3>
        <p className="text-gray-700 mb-6">{example.description}</p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium mb-2">Hick's Law toepassen:</h4>
          <p className="text-gray-700">
            Volgens Hick's Law neemt de beslissingstijd toe met het aantal
            keuzemogelijkheden. Groepeer daarom menu-items logisch en beperk het
            aantal opties op elk niveau.
          </p>
        </div>

        <DndProvider backend={HTML5Backend}>
          <div className="mb-6">
            <h4 className="font-medium mb-2">Beschikbare items:</h4>
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg min-h-[80px]">
              {availableItems.map((item, index) => (
                <DraggableItem
                  key={item}
                  id={item}
                  text={item}
                  index={index}
                  moveItem={() => {}}
                  onDrop={handleDrop}
                />
              ))}
              {availableItems.length === 0 && (
                <p className="text-gray-500 italic">
                  Sleep alle items naar de juiste categorie
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {example.categories.map((category) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{category}</h4>
                <p className="text-xs text-gray-500 mb-2">
                  {category === "Hoofdmenu"
                    ? "Meest gebruikte opties (max 4-5)"
                    : category === "Submenu"
                    ? "Secundaire opties"
                    : "Situationele opties"}
                </p>
                <DroppableContainer
                  category={category}
                  items={[]}
                  onDrop={handleDrop}
                  selectedItems={selectedItems}
                />
              </div>
            ))}
          </div>
        </DndProvider>

        {!showFeedback && availableItems.length === 0 && (
          <div className="flex justify-center">
            <button
              onClick={checkSolution}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Controleer antwoord
            </button>
          </div>
        )}

        {showFeedback && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              interactiveCorrect ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <p className="text-gray-800">
              {interactiveCorrect
                ? example.feedback.correct
                : example.feedback.incorrect}
            </p>
            {!interactiveCorrect && (
              <div className="mt-2 p-3 bg-white rounded border">
                <p className="font-medium mb-1">Tip:</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>
                    Plaats de meest gebruikte items in het hoofdmenu (max 4-5)
                  </li>
                  <li>Groepeer gerelateerde items samen in submenu's</li>
                  <li>
                    Contextuele menu's zijn voor situatie-specifieke opties
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderAnalysisExample = (example: AnalysisExample) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4">{example.case_study.title}</h3>
        <p className="text-gray-700 mb-6">{example.case_study.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Versie A</h4>
            <div className="mb-4 p-3 bg-white rounded border">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 15 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-1 rounded text-xs text-center"
                  >
                    Variant {i + 1}
                  </div>
                ))}
                <div className="col-span-5 text-center text-xs text-gray-500 mt-1">
                  ... en nog 30 varianten
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-2">
              {example.case_study.data.version_a.description}
            </p>
            <ul className="space-y-1">
              <li className="flex items-center">
                <span className="font-medium mr-2">Conversie:</span>
                <span className="text-red-600">
                  {example.case_study.data.version_a.conversion_rate}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Tijd tot aankoop:</span>
                <span className="text-red-600">
                  {example.case_study.data.version_a.avg_time_to_purchase}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Winkelwagen verlaten:</span>
                <span className="text-red-600">
                  {example.case_study.data.version_a.cart_abandonment}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Versie B</h4>
            <div className="mb-4 p-3 bg-white rounded border">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-blue-100 p-1 rounded text-xs text-center"
                  >
                    Variant {i + 1}
                  </div>
                ))}
                <div className="col-span-5 text-center mt-2">
                  <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                    Toon meer varianten
                  </button>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-2">
              {example.case_study.data.version_b.description}
            </p>
            <ul className="space-y-1">
              <li className="flex items-center">
                <span className="font-medium mr-2">Conversie:</span>
                <span className="text-green-600">
                  {example.case_study.data.version_b.conversion_rate}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Tijd tot aankoop:</span>
                <span className="text-green-600">
                  {example.case_study.data.version_b.avg_time_to_purchase}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium mr-2">Winkelwagen verlaten:</span>
                <span className="text-green-600">
                  {example.case_study.data.version_b.cart_abandonment}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="font-medium mb-4">{example.question}</h4>
          {!showFeedback && (
            <button
              onClick={() => setShowFeedback(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Toon analyse
            </button>
          )}
          {showFeedback && (
            <>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                {example.correct_analysis.map((point, index) => (
                  <li key={index} className="text-gray-700">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="bg-green-50 p-4 rounded">
                <p className="text-gray-800">{example.feedback}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderExampleContent = (example: Example) => {
    switch (example.type) {
      case "scenario":
        return renderScenarioExample(example);
      case "interactive":
        return renderInteractiveExample(example);
      case "analysis":
        return renderAnalysisExample(example);
      default:
        return <div>Onbekend voorbeeld type</div>;
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
    <div className="bg-[#212121] p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-white">
        {currentLesson.title}
      </h1>

      {currentLesson.examples.map((example, index) => (
        <div key={index} className={currentStep === index ? "block" : "hidden"}>
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
              {currentStep < currentLesson.examples.length - 1
                ? "Volgende"
                : "Afronden"}
            </span>
            {currentStep < currentLesson.examples.length - 1 ? (
              <FaArrowRight />
            ) : (
              <FaCheck />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
