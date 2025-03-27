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
            question: "Welke zelfscan-kassa interface is effectiever?",
            explanation: "Hick's Law stelt dat de beslissingstijd toeneemt met het aantal keuzes. Bekijk deze twee zelfscan-kassa interfaces:",
            bad: {
              title: "Chaotische Zelfscan Interface",
              description: "Een zelfscan-kassa met te veel keuzes:",
              options: [
                "💳 Betalen met PIN (klein, grijs)",
                "💵 Betalen met Contant (klein, grijs)",
                "💰 Betalen met Creditcard (klein, grijs)",
                "🎁 Betalen met Cadeaukaart (klein, grijs)",
                "➕ Product toevoegen (klein, blauw)",
                "➖ Product verwijderen (klein, rood)",
                "🏷️ Kortingscode invoeren (klein, groen)",
                "📇 Bonuskaart scannen (klein, paars)",
                "❓ Hulp vragen (klein, oranje)",
                "🏠 Terug naar start (klein, grijs)",
                "ℹ️ Info bekijken (klein, grijs)",
                "🌐 Taal wijzigen (klein, grijs)",
                "🔊 Geluid aan/uit (klein, grijs)",
                "🔆 Helderheid aanpassen (klein, grijs)",
                "🔤 Lettergrootte (klein, grijs)",
                "🧾 Kassabon opties (klein, grijs)",
                "🛒 Winkelwagen bekijken (klein, blauw)",
                "💲 Prijscheck (klein, grijs)",
                "📞 Klantenservice bellen (klein, rood)",
                "⚠️ Storingmelding (klein, oranje)",
                "❌ Afbreken (klein, rood)",
                "🅿️ Parkeerkaart (klein, grijs)",
                "🎫 Zegels sparen (klein, groen)",
                "💳 Klantenkaart (klein, paars)",
                "☰ Menu (klein, grijs)"
              ],
              feedback: "Deze interface heeft 25 knoppen van gelijke grootte, verspreid over het scherm. De verschillende kleuren en iconen maken het verwarrend. In een rij met wachtende mensen achter zich, raakt de gebruiker gefrustreerd door de traagheid van het systeem. Dit leidt tot langere afrekentijd, meer frustratie en kans op fouten."
            },
            good: {
              title: "Gestructureerde Zelfscan Interface",
              description: "Een zelfscan-kassa met duidelijke hiërarchie:",
              options: [
                "💳 BETALEN (groot, groene knop, bovenaan gecentreerd)",
                "➕ Product toevoegen (middelgroot, blauwe knop, links midden)",
                "🏷️ Kortingscode invoeren (middelgroot, blauwe knop, rechts midden)",
                "❓ Hulp vragen (klein, grijze knop, linksonder)",
                "🏠 Terug naar start (klein, grijze knop, middenonder)",
                "☰ Menu (klein, grijze knop, rechtsonder)"
              ],
              feedback: "Deze interface gebruikt duidelijke visuele hiërarchie met slechts 6 knoppen. De 'Betalen' knop is prominent aanwezig en betaalmethodes worden automatisch gedetecteerd. De meest gebruikte functies zijn direct toegankelijk, terwijl minder gebruikte opties in het menu staan. Dit zorgt voor sneller afrekenen, minder stress en intuïtieve bediening."
            }
          },
          {
            type: "scenario",
            question: "Welke zelfscan-kassa interface is effectiever?",
            explanation: "Hick's Law stelt dat de beslissingstijd toeneemt met het aantal keuzes. Bekijk deze twee zelfscan-kassa interfaces:",
            bad: {
              title: "Chaotische Zelfscan Interface",
              description: "Een zelfscan-kassa met te veel keuzes:",
              options: [
                "💳 Betalen met PIN (klein, grijs)",
                "💵 Betalen met Contant (klein, grijs)",
                "💰 Betalen met Creditcard (klein, grijs)",
                "🎁 Betalen met Cadeaukaart (klein, grijs)",
                "➕ Product toevoegen (klein, blauw)",
                "➖ Product verwijderen (klein, rood)",
                "🏷️ Kortingscode invoeren (klein, groen)",
                "📇 Bonuskaart scannen (klein, paars)",
                "❓ Hulp vragen (klein, oranje)",
                "🏠 Terug naar start (klein, grijs)",
                "ℹ️ Info bekijken (klein, grijs)",
                "🌐 Taal wijzigen (klein, grijs)",
                "🔊 Geluid aan/uit (klein, grijs)",
                "🔆 Helderheid aanpassen (klein, grijs)",
                "🔤 Lettergrootte (klein, grijs)",
                "🧾 Kassabon opties (klein, grijs)",
                "🛒 Winkelwagen bekijken (klein, blauw)",
                "💲 Prijscheck (klein, grijs)",
                "📞 Klantenservice bellen (klein, rood)",
                "⚠️ Storingmelding (klein, oranje)",
                "❌ Afbreken (klein, rood)",
                "🅿️ Parkeerkaart (klein, grijs)",
                "🎫 Zegels sparen (klein, groen)",
                "💳 Klantenkaart (klein, paars)",
                "☰ Menu (klein, grijs)"
              ],
              feedback: "Deze interface heeft 25 knoppen van gelijke grootte, verspreid over het scherm zonder logische ordening. De verschillende kleuren en iconen maken het verwarrend. In een rij met wachtende mensen achter zich, raakt de gebruiker gefrustreerd door de traagheid van het systeem. Dit leidt tot langere afrekentijd, meer frustratie en kans op fouten."
            },
            good: {
              title: "Gestructureerde Zelfscan Interface",
              description: "Een zelfscan-kassa met duidelijke hiërarchie:",
              options: [
                "💳 BETALEN (groot, groene knop, bovenaan gecentreerd)",
                "➕ Product toevoegen (middelgroot, blauwe knop, links midden)",
                "🏷️ Kortingscode invoeren (middelgroot, blauwe knop, rechts midden)",
                "❓ Hulp vragen (klein, grijze knop, linksonder)",
                "🏠 Terug naar start (klein, grijze knop, middenonder)",
                "☰ Menu (klein, grijze knop, rechtsonder)"
              ],
              feedback: "Deze interface gebruikt duidelijke visuele hiërarchie met slechts 6 knoppen. De 'Betalen' knop is prominent aanwezig en betaalmethodes worden automatisch gedetecteerd. De meest gebruikte functies zijn direct toegankelijk, terwijl minder gebruikte opties in het menu staan. Dit zorgt voor sneller afrekenen, minder stress en intuïtieve bediening."
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
        id: "3-3",
        title: "Jakob's Law",
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