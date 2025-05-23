import React, { useState } from "react";
import FittsLawVisual from "./ux-principles/FittsLawVisual";
import HicksLawVisual from "./ux-principles/HicksLawVisual";
import JakobsLawVisual from "./ux-principles/JakobsLawVisual";

export default function UXPrinciples() {
  const [currentPrinciple, setCurrentPrinciple] = useState<
    "fitts" | "hicks" | "jakobs"
  >("fitts");

  const handleComplete = () => {
    if (currentPrinciple === "fitts") {
      setCurrentPrinciple("hicks");
    } else if (currentPrinciple === "hicks") {
      setCurrentPrinciple("jakobs");
    } else {
      setCurrentPrinciple("fitts");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {currentPrinciple === "fitts" && (
          <FittsLawVisual onComplete={handleComplete} />
        )}
        {currentPrinciple === "hicks" && (
          <HicksLawVisual onComplete={handleComplete} />
        )}
        {currentPrinciple === "jakobs" && (
          <JakobsLawVisual onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}
