import React, { useState, useRef } from "react";
import { FaArrowRight, FaClock, FaTrophy } from "react-icons/fa";

interface FittsLawVisualProps {
  onComplete: () => void;
}

interface ButtonPosition {
  x: number;
  y: number;
}

export default function FittsLawVisual({ onComplete }: FittsLawVisualProps) {
  const [selectedOption, setSelectedOption] = useState<"bad" | "good" | null>(
    null
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentExample, setCurrentExample] = useState<
    "reaction" | "banking" | "food"
  >("reaction");
  const [hasCompleted, setHasCompleted] = useState(false);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTest, setCurrentTest] = useState<"small" | "large">("small");
  const [clicksRemaining, setClicksRemaining] = useState(5);
  const [testResults, setTestResults] = useState<{
    small: number[];
    large: number[];
  }>({
    small: [],
    large: [],
  });
  const [showComparison, setShowComparison] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isTestStarted, setIsTestStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionSelect = (option: "bad" | "good") => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const getRandomPosition = () => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const container = containerRef.current;
    const buttonSize = currentTest === "small" ? 40 : 80;
    const spacing = currentTest === "small" ? 200 : 100;
    const maxX = container.clientWidth - buttonSize;
    const maxY = container.clientHeight - buttonSize;

    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };
  };

  const startReactionTest = () => {
    setReactionTime(null);
    setButtonPosition(getRandomPosition());
    setStartTime(Date.now());
    setIsTestStarted(true);
  };

  const handleTargetClick = () => {
    if (!startTime) return;

    const endTime = Date.now();
    const time = endTime - startTime;
    setReactionTime(time);

    // Update test results
    setTestResults((prev) => ({
      ...prev,
      [currentTest]: [...prev[currentTest], time],
    }));

    // Update clicks remaining
    const newClicksRemaining = clicksRemaining - 1;
    setClicksRemaining(newClicksRemaining);

    if (newClicksRemaining === 0) {
      if (currentTest === "small") {
        // Switch to large buttons test
        setCurrentTest("large");
        setClicksRemaining(5);
        setTestResults((prev) => ({ ...prev, large: [] }));
        setIsTestStarted(false);
      } else {
        // Both tests complete, show comparison
        setShowComparison(true);
      }
    } else {
      // Start next click
      startReactionTest();
    }
  };

  const handleNextStep = () => {
    if (currentExample === "reaction") {
      setCurrentExample("banking");
      setSelectedOption(null);
      setShowFeedback(false);
    } else if (currentExample === "banking") {
      setCurrentExample("food");
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setHasCompleted(true);
      onComplete();
    }
  };

  const calculateAverage = (times: number[]) => {
    return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  };

  if (hasCompleted) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2 text-white">
          {currentExample === "reaction"
            ? "Test je reactietijd met Fitts's Law"
            : currentExample === "banking"
            ? "Welke mobiele bankieren app is makkelijker te gebruiken?"
            : "Welke food delivery app is gebruiksvriendelijker?"}
        </h2>
        <p className="text-gray-300 mb-6">
          Fitts's Law: de tijd om een doel te bereiken hangt af van de afstand
          en grootte van het doel
        </p>
      </div>

      {currentExample === "reaction" ? (
        <div className="flex flex-col items-center">
          <div className="w-full bg-[#2a2a2a] p-6 rounded-lg">
            <div className="text-center mb-6">
              <p className="text-gray-300 mb-4">
                {!showComparison
                  ? currentTest === "small"
                    ? `Test 1: Klik 5 keer op de kleine knoppen (${clicksRemaining} over)`
                    : `Test 2: Klik 5 keer op de grote knoppen (${clicksRemaining} over)`
                  : "Vergelijking van de resultaten"}
              </p>
              {reactionTime && !showComparison && (
                <div className="mb-4">
                  <p className="text-xl text-white">
                    Je reactietijd:{" "}
                    <span className="font-bold">{reactionTime}ms</span>
                  </p>
                </div>
              )}
              {showComparison && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Vergelijking:
                  </h3>
                  <p className="text-gray-300">
                    Kleine knoppen (ver uit elkaar):{" "}
                    <span className="font-bold">
                      {calculateAverage(testResults.small)}ms
                    </span>
                  </p>
                  <p className="text-gray-300">
                    Grote knoppen (dicht bij elkaar):{" "}
                    <span className="font-bold">
                      {calculateAverage(testResults.large)}ms
                    </span>
                  </p>
                  <p className="text-gray-300 mt-2">
                    Verschil:{" "}
                    <span className="font-bold">
                      {Math.abs(
                        calculateAverage(testResults.small) -
                          calculateAverage(testResults.large)
                      )}
                      ms
                    </span>
                  </p>
                  <p className="text-gray-300 mt-4">
                    Dit laat zien hoe de grootte en afstand van doelen invloed
                    hebben op je reactietijd. Dit principe is belangrijk bij het
                    ontwerpen van gebruiksvriendelijke interfaces.
                  </p>
                </div>
              )}
            </div>

            {!showComparison && (
              <>
                <div
                  ref={containerRef}
                  className="relative h-[400px] bg-gray-800 rounded-lg mb-4"
                >
                  {isTestStarted && (
                    <button
                      onClick={handleTargetClick}
                      className="absolute rounded-full bg-green-500 hover:bg-green-600 cursor-pointer flex items-center justify-center text-2xl font-bold"
                      style={{
                        width: currentTest === "small" ? "40px" : "80px",
                        height: currentTest === "small" ? "40px" : "80px",
                        left: `${buttonPosition.x}px`,
                        top: `${buttonPosition.y}px`,
                      }}
                    ></button>
                  )}
                </div>

                <button
                  onClick={startReactionTest}
                  className="w-full py-3 rounded-lg text-white font-bold bg-blue-600 hover:bg-blue-700"
                >
                  Start Test
                </button>
              </>
            )}
          </div>

          <button
            onClick={handleNextStep}
            className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center"
          >
            <span className="mr-2">Volgende voorbeeld</span>
            <FaArrowRight />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* SLECHT VOORBEELD */}
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
              className={`text-xl font-bold mb-4 ${
                !showFeedback ? "text-white" : "text-red-500"
              }`}
            >
              {!showFeedback ? "Optie A" : "Moeilijk Bereikbaar"}
            </h3>

            {currentExample === "banking" ? (
              <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
                {/* Bankieren App Interface */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-bold text-lg">ING Bank</div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      👤
                    </div>
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      ⚙️
                    </div>
                  </div>
                </div>

                {/* Kleine, verspreide knoppen */}
                <div className="flex justify-between mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded flex flex-col items-center justify-center text-white">
                    <span className="text-base">💰</span>
                    <span className="text-[8px] mt-0.5 opacity-70">
                      Overmaken
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-orange-500 rounded flex flex-col items-center justify-center text-white">
                    <span className="text-base">💳</span>
                    <span className="text-[8px] mt-0.5 opacity-70">
                      Betalen
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-orange-500 rounded flex flex-col items-center justify-center text-white">
                    <span className="text-base">📱</span>
                    <span className="text-[8px] mt-0.5 opacity-70">Tikkie</span>
                  </div>
                  <div className="w-10 h-10 bg-orange-500 rounded flex flex-col items-center justify-center text-white">
                    <span className="text-base">📊</span>
                    <span className="text-[8px] mt-0.5 opacity-70">Sparen</span>
                  </div>
                </div>

                {/* Rekeningoverzicht */}
                <div className="bg-gray-800 p-3 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-white text-sm">Betaalrekening</div>
                    <div className="text-white text-lg font-bold">
                      €1.234,56
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">
                    NL91 INGB 0001 2345 67
                  </div>
                </div>

                {/* Recente Transacties */}
                <div className="bg-gray-800 p-3 rounded-lg mb-4">
                  <div className="text-white text-sm mb-3">
                    Recente transacties
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white text-sm">Albert Heijn</div>
                        <div className="text-gray-400 text-xs">Vandaag</div>
                      </div>
                      <div className="text-red-500 text-sm">-€45,67</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white text-sm">Salaris</div>
                        <div className="text-gray-400 text-xs">Gisteren</div>
                      </div>
                      <div className="text-green-500 text-sm">+€2.500,00</div>
                    </div>
                  </div>
                </div>

                {/* Kleine actieknoppen */}
                <div className="flex justify-between">
                  <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-center text-white text-sm">
                    <span className="mr-1">🏠</span>
                    Home
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-center text-white text-sm">
                    <span className="mr-1">📊</span>
                    Overzicht
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
                {/* Food Delivery App */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-bold text-lg">
                    Thuisbezorgd
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      👤
                    </div>
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      🛒
                    </div>
                  </div>
                </div>

                {/* Kleine restaurant knoppen */}
                <div className="space-y-3 mb-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-white text-sm mb-1">McDonald's</div>
                    <div className="text-gray-400 text-xs mb-2">
                      ⭐ 4.5 • 15-25 min
                    </div>
                    <div className="w-20 h-7 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                      Bestellen
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-white text-sm mb-1">Burger King</div>
                    <div className="text-gray-400 text-xs mb-2">
                      ⭐ 4.2 • 20-30 min
                    </div>
                    <div className="w-20 h-7 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                      Bestellen
                    </div>
                  </div>
                </div>

                {/* Kleine actieknoppen */}
                <div className="flex justify-between">
                  <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-white">
                    🔍
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-white">
                    ⚡
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-white">
                    🛒
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-white">
                    ⚙️
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* GOED VOORBEELD */}
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
              className={`text-xl font-bold mb-4 ${
                !showFeedback ? "text-white" : "text-green-500"
              }`}
            >
              {!showFeedback ? "Optie B" : "Gebruiksvriendelijk"}
            </h3>

            {currentExample === "banking" ? (
              <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
                {/* Bankieren App Interface */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-bold text-lg">ING Bank</div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      👤
                    </div>
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      ⚙️
                    </div>
                  </div>
                </div>

                {/* Account Selector */}
                <div className="bg-gray-800 p-3 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-white text-sm">Betaalrekening</div>
                    <div className="text-white text-lg font-bold">
                      €1.234,56
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs">
                    NL91 INGB 0001 2345 67
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-orange-500 p-3 rounded-lg flex flex-col items-center justify-center text-white">
                    <span className="text-lg">💰</span>
                    <span className="text-[10px] mt-1 opacity-70">
                      Overmaken
                    </span>
                  </div>
                  <div className="bg-orange-500 p-3 rounded-lg flex flex-col items-center justify-center text-white">
                    <span className="text-lg">💳</span>
                    <span className="text-[10px] mt-1 opacity-70">Betalen</span>
                  </div>
                  <div className="bg-orange-500 p-3 rounded-lg flex flex-col items-center justify-center text-white">
                    <span className="text-lg">📱</span>
                    <span className="text-[10px] mt-1 opacity-70">Tikkie</span>
                  </div>
                  <div className="bg-orange-500 p-3 rounded-lg flex flex-col items-center justify-center text-white">
                    <span className="text-lg">📊</span>
                    <span className="text-[10px] mt-1 opacity-70">Sparen</span>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-800 p-3 rounded-lg mb-4">
                  <div className="text-white text-sm mb-3">
                    Recente transacties
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white text-sm">Albert Heijn</div>
                        <div className="text-gray-400 text-xs">Vandaag</div>
                      </div>
                      <div className="text-red-500 text-sm">-€45,67</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white text-sm">Salaris</div>
                        <div className="text-gray-400 text-xs">Gisteren</div>
                      </div>
                      <div className="text-green-500 text-sm">+€2.500,00</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="flex justify-between">
                  <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-center text-white text-sm">
                    <span className="mr-1">🏠</span>
                    Home
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-center text-white text-sm">
                    <span className="mr-1">📊</span>
                    Overzicht
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
                {/* Food Delivery App */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-bold text-lg">
                    Thuisbezorgd
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      👤
                    </div>
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                      🛒
                    </div>
                  </div>
                </div>

                {/* Grote restaurant kaarten */}
                <div className="space-y-3 mb-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-white text-sm mb-1">McDonald's</div>
                    <div className="text-gray-400 text-xs mb-2">
                      ⭐ 4.5 • 15-25 min
                    </div>
                    <div className="bg-blue-600 p-3 rounded-lg text-white text-sm text-center">
                      Bestellen
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="text-white text-sm mb-1">Burger King</div>
                    <div className="text-gray-400 text-xs mb-2">
                      ⭐ 4.2 • 20-30 min
                    </div>
                    <div className="bg-blue-600 p-3 rounded-lg text-white text-sm text-center">
                      Bestellen
                    </div>
                  </div>
                </div>

                {/* Grote actieknoppen */}
                <div className="flex justify-between">
                  <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-center text-white text-sm">
                    <span className="mr-1">🔍</span>
                    Zoeken
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-center text-white text-sm">
                    <span className="mr-1">⚡</span>
                    Filters
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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

              <p className="text-gray-200 mb-4">
                {currentExample === "banking"
                  ? selectedOption === "good"
                    ? "Deze bankieren app heeft grote, goed geplaatste knoppen die makkelijk te raken zijn. De belangrijkste acties zoals 'Overmaken' en 'Betalen' zijn prominent aanwezig en binnen bereik. De knoppen zijn groot genoeg om nauwkeurig te klikken, wat fouten voorkomt bij het bankieren."
                    : "Deze bankieren app heeft kleine, verspreide knoppen die moeilijk te raken zijn. De belangrijkste acties zijn ver uit elkaar geplaatst en de knoppen zijn te klein voor nauwkeurige interactie, wat kan leiden tot fouten bij het bankieren."
                  : selectedOption === "good"
                  ? "Deze food delivery app heeft grote, goed geplaatste knoppen die makkelijk te raken zijn. De restaurant kaarten zijn prominent aanwezig en de bestelknoppen zijn groot genoeg om nauwkeurig te klikken. Dit maakt het bestellen sneller en foutloos."
                  : "Deze food delivery app heeft kleine, verspreide knoppen die moeilijk te raken zijn. De restaurant kaarten zijn te klein en de bestelknoppen zijn moeilijk te raken, wat kan leiden tot fouten bij het bestellen."}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleNextStep}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">
                {currentExample === "banking"
                  ? "Volgende voorbeeld"
                  : "Afronden"}
              </span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
