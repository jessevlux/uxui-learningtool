import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface JakobsLawVisualProps {
  onComplete: () => void;
}

export default function JakobsLawVisual({ onComplete }: JakobsLawVisualProps) {
  const [currentExample, setCurrentExample] = useState<
    "calendar" | "music" | "food"
  >("calendar");
  const [selectedOption, setSelectedOption] = useState<"bad" | "good" | null>(
    null
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleOptionSelect = (option: "bad" | "good") => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleNextStep = () => {
    if (currentExample === "calendar") {
      setCurrentExample("music");
      setSelectedOption(null);
      setShowFeedback(false);
    } else if (currentExample === "music") {
      setCurrentExample("food");
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setHasCompleted(true);
      onComplete();
    }
  };

  if (hasCompleted) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2 text-white">
          {currentExample === "calendar"
            ? "Welke agenda-app is intuïtiever?"
            : currentExample === "music"
            ? "Welke muziek-app is gebruiksvriendelijker?"
            : "Welke bezorg-app is makkelijker te gebruiken?"}
        </h2>
        <p className="text-gray-300 mb-6">
          Jakob's Law: gebruikers brengen de meeste tijd door op andere
          websites. Ze verwachten dat jouw website werkt op dezelfde manier als
          de andere sites die ze al kennen.
        </p>
      </div>

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
            {!showFeedback ? "Optie A" : "Onbekend Patroon"}
          </h3>

          {currentExample === "calendar" ? (
            <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
              {/* Agenda app met onbekende layout */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold text-lg">TimeFlow</div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    ⚙️
                  </div>
                </div>
              </div>

              {/* Onbekende kalender layout */}
              <div className="bg-gray-800 p-3 rounded-lg mb-4">
                <div className="text-white text-sm mb-2">Maart 2024</div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-700 rounded flex items-center justify-center text-white text-xs"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Onbekende agenda items */}
              <div className="space-y-2">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-white text-sm">Team Meeting</div>
                  <div className="text-gray-400 text-xs">14:00 - 15:00</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-white text-sm">Lunch</div>
                  <div className="text-gray-400 text-xs">12:00 - 13:00</div>
                </div>
              </div>
            </div>
          ) : currentExample === "music" ? (
            <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
              {/* Muziek app met onbekende layout */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold text-lg">SoundWave</div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    🔍
                  </div>
                </div>
              </div>

              {/* Onbekende muziek layout */}
              <div className="bg-gray-800 p-3 rounded-lg mb-4">
                <div className="text-white text-sm mb-2">Nu afspelen</div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-xs">0:00</div>
                  <div className="w-32 h-1 bg-gray-700 rounded-full"></div>
                  <div className="text-gray-400 text-xs">3:45</div>
                </div>
              </div>

              {/* Onbekende afspeellijst */}
              <div className="space-y-2">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-white text-sm">Liedje 1</div>
                  <div className="text-gray-400 text-xs">Artiest 1</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-white text-sm">Liedje 2</div>
                  <div className="text-gray-400 text-xs">Artiest 2</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
              {/* Bezorg app met onbekende layout */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold text-lg">FoodFlow</div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    🛒
                  </div>
                </div>
              </div>

              {/* Onbekende restaurant layout */}
              <div className="space-y-3 mb-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-white text-sm mb-1">Restaurant 1</div>
                  <div className="text-gray-400 text-xs mb-2">Italiaans</div>
                  <div className="flex justify-between">
                    <div className="text-gray-400 text-xs">⭐ 4.5</div>
                    <div className="text-gray-400 text-xs">30-45 min</div>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-white text-sm mb-1">Restaurant 2</div>
                  <div className="text-gray-400 text-xs mb-2">Sushi</div>
                  <div className="flex justify-between">
                    <div className="text-gray-400 text-xs">⭐ 4.8</div>
                    <div className="text-gray-400 text-xs">20-35 min</div>
                  </div>
                </div>
              </div>

              {/* Onbekende filters */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-white text-sm mb-2">Filters</div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-400 text-xs">Italiaans</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-400 text-xs">Sushi</span>
                  </div>
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
            {!showFeedback ? "Optie B" : "Bekend Patroon"}
          </h3>

          {currentExample === "calendar" ? (
            <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
              {/* Google Calendar-achtige layout */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold text-lg">
                  Google Calendar
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    ⚙️
                  </div>
                </div>
              </div>

              {/* Bekende kalender layout */}
              <div className="bg-gray-800 p-3 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-white text-sm">Maart 2024</div>
                  <div className="flex gap-2">
                    <button className="text-white text-sm">◀</button>
                    <button className="text-white text-sm">▶</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((day) => (
                    <div
                      key={day}
                      className="text-gray-400 text-xs text-center"
                    >
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-700 rounded flex items-center justify-center text-white text-xs"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bekende agenda items */}
              <div className="space-y-2">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <div className="text-white text-sm">Team Meeting</div>
                  <div className="text-white text-xs">14:00 - 15:00</div>
                </div>
                <div className="bg-green-600 p-3 rounded-lg">
                  <div className="text-white text-sm">Lunch</div>
                  <div className="text-white text-xs">12:00 - 13:00</div>
                </div>
              </div>
            </div>
          ) : currentExample === "music" ? (
            <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
              {/* Spotify-achtige layout */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold text-lg">Spotify</div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    🔍
                  </div>
                </div>
              </div>

              {/* Bekende muziek layout */}
              <div className="bg-gray-800 p-3 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-gray-700 rounded mr-3"></div>
                  <div>
                    <div className="text-white text-sm">Liedje 1</div>
                    <div className="text-gray-400 text-xs">Artiest 1</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-xs">0:00</div>
                  <div className="w-32 h-1 bg-gray-700 rounded-full"></div>
                  <div className="text-gray-400 text-xs">3:45</div>
                </div>
              </div>

              {/* Bekende afspeellijst */}
              <div className="space-y-2">
                <div className="bg-gray-800 p-3 rounded-lg flex items-center">
                  <div className="w-8 h-8 bg-gray-700 rounded mr-3"></div>
                  <div>
                    <div className="text-white text-sm">Liedje 2</div>
                    <div className="text-gray-400 text-xs">Artiest 2</div>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg flex items-center">
                  <div className="w-8 h-8 bg-gray-700 rounded mr-3"></div>
                  <div>
                    <div className="text-white text-sm">Liedje 3</div>
                    <div className="text-gray-400 text-xs">Artiest 3</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-4 border-gray-700 rounded-lg p-3 sm:p-4 mb-4 bg-[#1a1a1a] relative overflow-hidden shadow-lg w-full max-w-[320px] mx-auto">
              {/* Thuisbezorgd-achtige layout */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-bold text-lg">Thuisbezorgd</div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white">
                    🛒
                  </div>
                </div>
              </div>

              {/* Bekende restaurant layout */}
              <div className="space-y-3 mb-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 bg-gray-700 rounded mr-3"></div>
                    <div>
                      <div className="text-white text-sm">Restaurant 1</div>
                      <div className="text-gray-400 text-xs">Italiaans</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-400 text-xs">⭐ 4.5</div>
                    <div className="text-gray-400 text-xs">30-45 min</div>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 bg-gray-700 rounded mr-3"></div>
                    <div>
                      <div className="text-white text-sm">Restaurant 2</div>
                      <div className="text-gray-400 text-xs">Sushi</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-gray-400 text-xs">⭐ 4.8</div>
                    <div className="text-gray-400 text-xs">20-35 min</div>
                  </div>
                </div>
              </div>

              {/* Bekende filters */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-white text-sm mb-2">Filters</div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-700 px-3 py-1 rounded-full text-white text-xs">
                    Italiaans
                  </div>
                  <div className="bg-gray-700 px-3 py-1 rounded-full text-white text-xs">
                    Sushi
                  </div>
                  <div className="bg-gray-700 px-3 py-1 rounded-full text-white text-xs">
                    Pizza
                  </div>
                </div>
              </div>
            </div>
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

              <p className="text-gray-200 mb-4">
                {currentExample === "calendar"
                  ? selectedOption === "good"
                    ? "Deze agenda-app gebruikt bekende patronen zoals een maandkalender met weekdagen, kleurcodering voor verschillende soorten afspraken, en een duidelijke navigatie tussen maanden. Gebruikers weten direct hoe ze moeten navigeren en afspraken moeten toevoegen, omdat ze dit al kennen van andere agenda-apps."
                    : "Deze agenda-app gebruikt een onbekende layout zonder weekdagen en zonder duidelijke navigatie tussen maanden. Gebruikers moeten eerst uitzoeken hoe ze moeten navigeren en afspraken moeten toevoegen."
                  : currentExample === "music"
                  ? selectedOption === "good"
                    ? "Deze muziek-app gebruikt bekende patronen zoals een grote afspeelknop, een voortgangsbalk, en een duidelijke weergave van de huidige track. Gebruikers weten direct hoe ze muziek moeten afspelen en beheren, omdat ze dit al kennen van andere muziek-apps."
                    : "Deze muziek-app gebruikt een onbekende layout zonder duidelijke afspeelcontroles en zonder albumartwork. Gebruikers moeten eerst uitzoeken hoe ze muziek moeten afspelen en beheren."
                  : selectedOption === "good"
                  ? "Deze bezorg-app gebruikt bekende patronen zoals restaurantkaarten met foto's, beoordelingen, en bezorgtijden. Gebruikers weten direct hoe ze restaurants moeten vinden en bestellen, omdat ze dit al kennen van andere bezorg-apps."
                  : "Deze bezorg-app gebruikt een onbekende layout zonder duidelijke restaurantkaarten en zonder foto's. Gebruikers moeten eerst uitzoeken hoe ze restaurants moeten vinden en bestellen."}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleNextStep}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">
                {currentExample === "calendar"
                  ? "Volgende voorbeeld"
                  : currentExample === "music"
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
