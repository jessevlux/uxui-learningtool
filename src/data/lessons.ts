interface ScenarioExample {
  type: "scenario";
  question: string;
  explanation: string;
  bad: {
    title: string;
    description: string;
    options: string[];
    feedback: string;
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

type Example = ScenarioExample | InteractiveExample | AnalysisExample;

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

export const lessonCategories: Record<string, Category> = {
  "ux-basics": {
    id: "1",
    title: "UX Basics",
    lessons: [
      {
        id: "1-1",
        title: "Introductie tot UX",
        examples: [
          {
            type: "scenario",
            question: "Welke interface is gebruiksvriendelijker?",
            explanation: "Een goede UX maakt taken eenvoudig en intuïtief voor gebruikers.",
            bad: {
              title: "Onoverzichtelijke Interface",
              description: "Een website met:",
              options: [
                "Inconsistente navigatie",
                "Kleine, moeilijk leesbare tekst",
                "Verwarrende labels",
                "Geen duidelijke hiërarchie"
              ],
              feedback: "Een onoverzichtelijke interface frustreert gebruikers en maakt taken onnodig complex."
            },
            good: {
              title: "Gebruiksvriendelijke Interface",
              description: "Een website met:",
              options: [
                "Consistente navigatie",
                "Duidelijk leesbare tekst",
                "Intuïtieve labels",
                "Logische hiërarchie"
              ],
              feedback: "Een heldere interface maakt taken eenvoudig en intuïtief voor gebruikers."
            }
          }
        ]
      }
    ]
  },
  "ux-psychology": {
    id: "3",
    title: "UX Psychology",
    lessons: [
      {
        id: "3-1",
        title: "Hick's Law",
        examples: [
          {
            type: "scenario",
            question: "In een noodsituatie, welk startscherm zou snellere actie mogelijk maken?",
            explanation: "Hick's Law stelt dat de tijd om een beslissing te nemen toeneemt met het aantal keuzemogelijkheden.",
            bad: {
              title: "Overvol Startscherm",
              description: "Een startscherm met:",
              options: [
                "30+ apps verspreid over 4 rijen en 6 kolommen",
                "Geen logische ordening of hiërarchie",
                "Kleine, gelijke iconen met felle kleuren",
                "Belangrijke apps (zoals Bellen) verstopt tussen andere apps",
                "Scrollen nodig om alle apps te zien"
              ],
              feedback: "In een stressvolle situatie kost het 5-10 seconden om de juiste app te vinden, met risico op fouten door de cognitieve overbelasting."
            },
            good: {
              title: "Gefocust Startscherm",
              description: "Een minimalistisch startscherm met:",
              options: [
                "4 grote iconen in een 2x2 raster",
                "Bellen-app prominent linksboven",
                "Logisch gegroepeerde essentiële apps (Bellen, Berichten, Kaarten, Camera)",
                "Duidelijke labels en herkenbare iconen",
                "Neutrale achtergrond voor betere focus"
              ],
              feedback: "De gebruiker vindt direct de juiste app (<1 seconde) en maakt zelfs onder stress de juiste keuze door de duidelijke, beperkte opties."
            }
          }
        ]
      },
      {
        id: "3-2",
        title: "Fitts's Law",
        examples: [
          {
            type: "scenario",
            question: "Welke interface is makkelijker te gebruiken op een mobiel apparaat?",
            explanation: "Fitts's Law stelt dat de tijd om een doel te bereiken afhankelijk is van de afstand en grootte van het doel.",
            bad: {
              title: "Kleine, Verspreide Knoppen",
              description: "Een mobiele interface met:",
              options: [
                "Kleine knoppen (10x10px)",
                "Ver uit elkaar geplaatst",
                "Moeilijk bereikbare hoeken",
                "Inconsistente groottes"
              ],
              feedback: "Kleine, verspreide knoppen zijn moeilijk om nauwkeurig aan te raken."
            },
            good: {
              title: "Optimale Knopplaatsing",
              description: "Een mobiele interface met:",
              options: [
                "Grote knoppen (min. 44x44px)",
                "Gegroepeerd in bereikbare zones",
                "Consistent formaat",
                "Voldoende ruimte tussen knoppen"
              ],
              feedback: "Grote, goed geplaatste knoppen zijn makkelijk aan te raken."
            }
          }
        ]
      },
      {
        id: "3-3-1",
        title: "Hick's Law",
        examples: [
          {
            type: "scenario",
            question: "In een noodsituatie, welk startscherm zou snellere actie mogelijk maken?",
            explanation: "Hick's Law stelt dat de tijd om een beslissing te nemen toeneemt met het aantal keuzemogelijkheden.",
            bad: {
              title: "Te Veel Keuzes (Slechte UX)",
              description: "Een volgepakt startscherm met:",
              options: [
                "30+ app-iconen verspreid over 4 rijen en 6 kolommen",
                "Apps zonder ordening (WhatsApp, Instagram, Spotify, YouTube, etc.)",
                "Bel-app verstopt tussen andere apps",
                "Kleine, gelijke iconen zonder visuele hiërarchie",
                "Felle, contrasterende app-kleuren die afleiden",
                "Scrollen nodig om alle apps te zien"
              ],
              feedback: "De gebruiker verliest 5-10 seconden met zoeken, heeft meer kans op fouten (zoals per ongeluk WhatsApp openen), en raakt overweldigd door cognitieve overload in stressvolle situaties."
            },
            good: {
              title: "Minder Keuzes, Snellere Actie (Goede UX)",
              description: "Een minimalistisch startscherm met:",
              options: [
                "4 grote iconen in een 2x2 raster voor snelle toegang",
                "Bellen-app prominent linksboven als grootste icoon",
                "Logisch gegroepeerde essentiële apps (Bellen, Berichten, Kaarten, Camera)",
                "Grote, herkenbare iconen met duidelijke labels",
                "Neutrale achtergrondkleur voor minimale afleiding"
              ],
              feedback: "De gebruiker vindt direct de juiste app (<1 seconde), blijft gefocust onder stress, en maakt intuïtief de juiste keuze door de duidelijke, beperkte opties."
            }
          }
        ]
      },
      {
        id: "3-4",
        title: "Miller's Law",
        examples: [
          {
            type: "scenario",
            question: "Welke menustructuur is effectiever voor gebruikers?",
            explanation: "Miller's Law stelt dat mensen ongeveer 7 (±2) items tegelijk in hun werkgeheugen kunnen houden.",
            bad: {
              title: "Overbelast Menu",
              description: "Een navigatiemenu met:",
              options: [
                "15 ongerelateerde opties",
                "Geen logische groepering",
                "Alle items op hetzelfde niveau",
                "Complexe terminologie"
              ],
              feedback: "Te veel ongerelateerde opties overweldigen gebruikers."
            },
            good: {
              title: "Gestructureerd Menu",
              description: "Een georganiseerd menu met:",
              options: [
                "3-5 hoofdcategorieën",
                "Logisch gegroepeerde items",
                "Duidelijke hiërarchie",
                "Eenvoudige labels"
              ],
              feedback: "Gegroepeerde informatie is makkelijker te verwerken en te onthouden."
            }
          }
        ]
      },
      {
        id: "3-5",
        title: "Peak-End Rule",
        examples: [
          {
            type: "scenario",
            question: "Welke gebruikerservaring zal een betere indruk achterlaten?",
            explanation: "De Peak-End Rule stelt dat mensen een ervaring vooral beoordelen op basis van het hoogtepunt en het einde.",
            bad: {
              title: "Standaard Checkout",
              description: "Een webshop checkout die eindigt met:",
              options: [
                "Zakelijke bevestigingspagina",
                "Geen persoonlijke boodschap",
                "Geen suggesties voor volgende stappen",
                "Abrupte afsluiting"
              ],
              feedback: "Een neutrale afsluiting laat geen blijvende indruk achter."
            },
            good: {
              title: "Memorabele Checkout",
              description: "Een webshop checkout die eindigt met:",
              options: [
                "Persoonlijk bedankje met naam",
                "Korte animatie of beloning",
                "Duidelijke vervolgstappen",
                "Kleine verrassing (kortingscode)"
              ],
              feedback: "Een positief einde creëert een blijvende goede herinnering."
            }
          }
        ]
      }
    ]
  },
  // ... andere categorieën
}; 