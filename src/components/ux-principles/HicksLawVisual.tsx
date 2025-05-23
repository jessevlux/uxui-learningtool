import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface HicksLawVisualProps {
  onComplete: () => void;
}

export default function HicksLawVisual({ onComplete }: HicksLawVisualProps) {
  const [selectedOption, setSelectedOption] = useState<"bad" | "good" | null>(
    null
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentExample, setCurrentExample] = useState<"kassa" | "navigatie">(
    "kassa"
  );
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleOptionSelect = (option: "bad" | "good") => {
    setSelectedOption(option);
    setShowFeedback(true);
  };

  const handleNextStep = () => {
    if (currentExample === "kassa") {
      setCurrentExample("navigatie");
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
          {currentExample === "kassa"
            ? "Welke zelfscankassa interface is beter?"
            : "Welke navigatiebalk is beter?"}
        </h2>
        <p className="text-gray-300 mb-6">
          Hick's Law: meer keuzes = langere beslissingstijd
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
            {!showFeedback ? "Optie A" : "Te veel keuzes"}
          </h3>

          {currentExample === "kassa" ? (
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
          ) : (
            <div className="border-4 border-gray-700 rounded-lg mb-4 bg-white relative overflow-hidden shadow-lg">
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
                    className={`text-gray-700 text-sm px-2 py-1 rounded transition-colors ${
                      item === "Heren" ? "bg-gray-200" : "hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Submenu dat verdwijnt */}
              <div className="mt-2 p-2 bg-white rounded border border-gray-300 relative shadow-sm mx-2">
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
              <div className="mt-2 mx-2 flex justify-between">
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
              <div className="mt-2 bg-yellow-100 border mx-2 mb-2 border-yellow-500 p-2 rounded-lg animate-pulse">
                <div className="text-yellow-800 text-sm font-bold flex items-center">
                  <span className="mr-1">🎁</span> Win een gratis item! Meld je
                  nu aan voor de nieuwsbrief!
                </div>
              </div>
            </div>
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
            {!showFeedback ? "Optie B" : "Duidelijke hiërarchie"}
          </h3>

          {currentExample === "kassa" ? (
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
          ) : (
            <div className="border-4 border-gray-700 rounded-lg mb-4 bg-white relative shadow-lg">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-t">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-bold text-xl flex items-center">
                    <span className="bg-yellow-400 text-purple-800 px-2 py-1 rounded-md mr-1">
                      MEGA
                    </span>
                    <span>Shop</span>
                    <span className="text-yellow-300 ml-1 text-sm">★★★</span>
                  </div>

                  {/* Prominente zoekbalk */}
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-full flex items-center px-3 py-1 border-2 border-yellow-400">
                      <span className="text-purple-600 mr-2">🔍</span>
                      <span className="text-gray-500 text-sm">
                        Zoek producten...
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-white bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-600 transition-colors">
                      👤
                    </div>
                    <div className="text-white bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-600 transition-colors relative">
                      🛒
                      <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-800 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        2
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gestructureerde navigatiebalk */}
              <div className="bg-gray-100 flex justify-between py-2 px-2 border-b border-gray-300">
                {["Heren", "Dames", "Kinderen", "Sale", "Merken"].map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`text-gray-700 font-semibold text-sm px-3 py-1 rounded transition-colors cursor-pointer ${
                        item === "Heren" ? "bg-gray-200" : "hover:bg-gray-200"
                      }`}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>

              {/* Submenu dat open blijft */}
              <div className="mt-2 p-3 mb-2 bg-white border border-gray-300 relative rounded-md mx-2">
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
                      className="text-gray-700 text-sm px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-all cursor-pointer"
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
                  <div className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition-all">
                    <div className="text-purple-600 text-xs font-semibold">
                      Nike Air Max
                    </div>
                    <div className="text-gray-700 text-xs">€129,99</div>
                  </div>
                  <div className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition-all">
                    <div className="text-purple-600 text-xs font-semibold">
                      Adidas Ultraboost
                    </div>
                    <div className="text-gray-700 text-xs">€159,99</div>
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
                {selectedOption === "good"
                  ? "Deze interface gebruikt duidelijke visuele hiërarchie met slechts 5-6 knoppen. De meest gebruikte functies zijn direct toegankelijk, terwijl minder gebruikte opties in het menu staan."
                  : "Deze interface heeft 15+ opties zonder duidelijke hiërarchie, wat leidt tot langere beslissingstijd volgens Hick's Law. Gebruikers raken overweldigd door te veel keuzes."}
              </p>

              {currentExample === "navigatie" && (
                <div className="mt-4">
                  <div className="text-sm text-gray-200 font-semibold mb-2">
                    {selectedOption === "good"
                      ? "Voordelen van dit ontwerp:"
                      : "Problemen met dit ontwerp:"}
                  </div>
                  <ul className="text-sm text-gray-200 list-disc pl-4 space-y-1">
                    {selectedOption === "good" ? (
                      <>
                        <li>
                          Slechts 5 hoofdcategorieën met duidelijke hiërarchie
                        </li>
                        <li>
                          Consistente branding en kleurgebruik (paars, roze,
                          geel)
                        </li>
                        <li>
                          Submenu's bevatten maximaal 6 opties met duidelijke
                          ordening
                        </li>
                        <li>
                          Menu blijft open na klikken voor betere
                          gebruikservaring
                        </li>
                        <li>Prominente zoekbalk voor directe toegang</li>
                        <li>
                          Rustige visuele stijl zonder afleidende elementen
                        </li>
                      </>
                    ) : (
                      <>
                        <li>Te veel categorieën (15+) zonder hiërarchie</li>
                        <li>Alle items hebben dezelfde grootte en stijl</li>
                        <li>Submenu's verdwijnen bij muisbeweging</li>
                        <li>Afleidende kleuren, pop-ups en animaties</li>
                        <li>Geen duidelijke visuele hiërarchie</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleNextStep}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <span className="mr-2">
                {currentExample === "kassa" ? "Volgende voorbeeld" : "Afronden"}
              </span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
