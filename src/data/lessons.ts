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
  categories: {
    name: string;
    description: string;
  }[];
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

// UX Visual examples voor interactieve visualisaties
interface UxVisualExample {
  type: "ux-visual";
  subtype: "hicks" | "fitts" | "jakobs" | "millers";
  title: string;
  description: string;
}

type Example = ScenarioExample | InteractiveExample | AnalysisExample | UxVisualExample;

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
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
        description: "Ervaar zelf hoe het aantal keuzes de beslissingstijd beïnvloedt.",
        category: "ux-principles",
        examples: [
          {
            type: "ux-visual",
            subtype: "hicks",
            title: "Hick's Law in de praktijk",
            description: "Ervaar zelf hoe het aantal keuzes de beslissingstijd beïnvloedt.",
          },
          {
            type: "interactive",
            task: "Verbeter de instellingenpagina van de 'SuperApp'",
            description: "Je werkt als UX-designer bij een populaire app. Gebruikers klagen dat de instellingenpagina onoverzichtelijk is. Pas Hick's Law toe om de cognitieve belasting te verminderen door de 28 instellingen in logische categorieën te groeperen.",
            items: [
              "Account gegevens",
              "Wachtwoord wijzigen",
              "E-mail adres wijzigen",
              "Profielfoto",
              "Privacyinstellingen",
              "Zichtbaarheid profiel",
              "Gegevens downloaden",
              "Account verwijderen",
              "Pushmeldingen",
              "E-mailnotificaties",
              "SMS-meldingen",
              "Stille modus",
              "Taal instellen",
              "Thema wijzigen",
              "Tekstgrootte",
              "Contrast",
              "Betaalmethodes",
              "Factureringsgeschiedenis",
              "Abonnementen",
              "Kortingscodes",
              "Apparaatbeheer",
              "Verbindingen",
              "Bluetooth",
              "Wifi-instellingen",
              "Helpcentrum",
              "Feedback geven",
              "Veelgestelde vragen",
              "Contact opnemen"
            ],
            categories: [
              {
                name: "Account & Privacy",
                description: "Persoonlijke gegevens en privacy-instellingen"
              },
              {
                name: "Notificaties",
                description: "Meldingen en communicatie-instellingen"
              },
              {
                name: "Weergave",
                description: "Visuele en taal-instellingen"
              },
              {
                name: "Betalingen",
                description: "Betaalmethodes en abonnementen"
              },
              {
                name: "Apparaat",
                description: "Hardware en verbindingsinstellingen"
              },
              {
                name: "Help & Support",
                description: "Hulp en contactmogelijkheden"
              }
            ],
            solution: {
              "Account & Privacy": [
                "Account gegevens",
                "Wachtwoord wijzigen",
                "E-mail adres wijzigen",
                "Profielfoto",
                "Privacyinstellingen",
                "Zichtbaarheid profiel",
                "Gegevens downloaden",
                "Account verwijderen"
              ],
              "Notificaties": [
                "Pushmeldingen",
                "E-mailnotificaties",
                "SMS-meldingen",
                "Stille modus"
              ],
              "Weergave": [
                "Taal instellen",
                "Thema wijzigen",
                "Tekstgrootte",
                "Contrast"
              ],
              "Betalingen": [
                "Betaalmethodes",
                "Factureringsgeschiedenis",
                "Abonnementen",
                "Kortingscodes"
              ],
              "Apparaat": [
                "Apparaatbeheer",
                "Verbindingen",
                "Bluetooth",
                "Wifi-instellingen"
              ],
              "Help & Support": [
                "Helpcentrum",
                "Feedback geven",
                "Veelgestelde vragen",
                "Contact opnemen"
              ]
            },
            feedback: {
              correct: "Uitstekend! Je hebt de gebruikerservaring van SuperApp aanzienlijk verbeterd. Door de 28 instellingen te groeperen in 6 logische categorieën, heb je de cognitieve belasting verminderd. Gebruikers hoeven nu eerst maar uit 6 opties te kiezen in plaats van uit 28. Binnen elke categorie zijn de opties ook beperkt tot 4-8 items, wat binnen de aanbevolen limiet van 7±2 valt. Uit gebruikerstests blijkt dat de tijd om een instelling te vinden met 64% is afgenomen en de gebruikerstevredenheid met 42% is gestegen. Deze toepassing van Hick's Law maakt de interface veel gebruiksvriendelijker en versnelt de beslissingstijd.",
              incorrect: "Je bent op de goede weg, maar sommige items staan nog niet in de meest logische categorie. Gebruikerstests tonen aan dat mensen bepaalde instellingen niet kunnen vinden in de categorieën waar jij ze hebt geplaatst. Probeer opnieuw door te denken aan welke items natuurlijk bij elkaar horen en hoe een gebruiker zou zoeken naar deze opties."
            }
          }
        ]
      },
      {
        id: "3-2",
        title: "Fitts's Law",
        description: "De tijd die nodig is om een doel te bereiken hangt af van de afstand tot het doel en de grootte van het doel.",
        category: "ux-principles",
        examples: [
          {
            type: "ux-visual",
            subtype: "fitts",
            title: "Fitts's Law in de praktijk",
            description: "Ervaar zelf hoe de grootte en afstand van doelen de gebruiksvriendelijkheid beïnvloeden.",
          },
        ],
      },
      {
        id: "3-3",
        title: "Jakob's Law",
        description: "Gebruikers brengen het grootste deel van hun tijd door op andere websites. Ze verwachten dat jouw website op dezelfde manier werkt als de andere websites die ze kennen.",
        category: "ux-principles",
        examples: [
          {
            type: "ux-visual",
            subtype: "jakobs",
            title: "Jakob's Law in de praktijk",
            description: "Ervaar zelf hoe gebruikers verwachtingen hebben van interfaces op basis van hun ervaring met andere websites.",
          },
        ]
      },
      {
        id: "3-4",
        title: "Miller's Law",
        description: "De gemiddelde persoon kan slechts 7 (±2) items in hun werkgeheugen houden.",
        category: "ux-principles",
        examples: [
          {
            type: "ux-visual",
            subtype: "millers",
            title: "Miller's Law in de praktijk",
            description: "Ervaar zelf hoe het beperkte werkgeheugen van gebruikers hun interactie met interfaces beïnvloedt.",
          },
        ]
      },
      {
        id: "3-5",
        title: "Peak-End Rule",
        description: "Mensen beoordelen een ervaring vooral op basis van het hoogtepunt en het einde van die ervaring.",
        category: "ux-principles",
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