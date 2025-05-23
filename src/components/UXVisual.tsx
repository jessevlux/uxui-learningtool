import React from "react";
import FittsLawVisual from "./ux-principles/FittsLawVisual";
import HicksLawVisual from "./ux-principles/HicksLawVisual";
import JakobsLawVisual from "./ux-principles/JakobsLawVisual";

interface UXVisualProps {
  type: "fitts" | "hicks" | "jakobs";
  onComplete: () => void;
}

export default function UXVisual({ type, onComplete }: UXVisualProps) {
  switch (type) {
    case "fitts":
      return <FittsLawVisual onComplete={onComplete} />;
    case "hicks":
      return <HicksLawVisual onComplete={onComplete} />;
    case "jakobs":
      return <JakobsLawVisual onComplete={onComplete} />;
    default:
      return <div>Unsupported UX visual type</div>;
  }
}
