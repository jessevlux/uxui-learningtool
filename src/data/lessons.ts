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
            question: "Welke navigatiebalk is effectiever voor een e-commerce website?",
            explanation: "Hick's Law stelt dat de beslissingstijd toeneemt met het aantal keuzes. Bekijk deze twee navigatie-ontwerpen:",
            bad: {
              title: "Overvolle Navigatiebalk",
              description: "Een e-commerce website met te veel navigatie-opties:",
              options: [
                "Dames (zelfde grootte als andere items)",
                "Heren (zelfde grootte als andere items)",
                "Kinderen (zelfde grootte als andere items)",
                "Sport (zelfde grootte als andere items)",
                "Sale (zelfde grootte als andere items)",
                "Nieuw (zelfde grootte als andere items)",
                "Merken (zelfde grootte als andere items)",
                "Accessoires (zelfde grootte als andere items)",
                "Wintercollectie (zelfde grootte als andere items)",
                "Zomercollectie (zelfde grootte als andere items)",
                "Schoenen (zelfde grootte als andere items)",
                "Kleding (zelfde grootte als andere items)",
                "Tassen (zelfde grootte als andere items)",
                "Outlet (zelfde grootte als andere items)",
                "Cadeaus (zelfde grootte als andere items)",
                "Submenu's verdwijnen bij muisbeweging",
                "Veel animaties en kleuren in de navigatie",
                "Geen duidelijke visuele hiërarchie"
              ],
              feedback: "Deze navigatiebalk bevat meer dan 15 categorieën zonder duidelijke prioriteit. Alle items hebben dezelfde grootte en stijl, waardoor niets uitspringt. Submenu's die verdwijnen bij muisbeweging zorgen voor frustratie. De vele kleuren en animaties leiden af in plaats van te helpen. Dit resulteert in een hogere bounce-rate en lagere conversies omdat gebruikers overweldigd raken en de site verlaten."
            },
            good: {
              title: "Gestructureerde Navigatiebalk",
              description: "Een e-commerce website met duidelijke navigatie-hiërarchie:",
              options: [
                "Heren (groot, vetgedrukt, contrasterend)",
                "Dames (groot, vetgedrukt, contrasterend)",
                "Kinderen (groot, vetgedrukt, contrasterend)",
                "Sale (groot, vetgedrukt, contrasterend)",
                "Merken (groot, vetgedrukt, contrasterend)",
                "Submenu met max. 6 opties per categorie",
                "Klikbaar menu dat open blijft tot sluiten",
                "Prominente zoekbalk in de navigatie"
              ],
              feedback: "Deze navigatiebalk bevat slechts 5 hoofdcategorieën met duidelijke visuele hiërarchie. De belangrijkste opties zijn vetgedrukt en contrasterend, terwijl minder belangrijke opties in submenu's zijn geplaatst. Elk submenu bevat maximaal 6 opties, wat binnen de cognitieve belastingslimiet valt. Het menu blijft open na klikken, wat gebruikers de tijd geeft om keuzes te maken. De prominente zoekbalk biedt directe toegang voor doelgerichte gebruikers. Dit resulteert in snellere navigatie, minder frustratie en hogere conversies."
            }
          },
          {
            type: "interactive",
            question: "Optimaliseer de instellingenpagina van deze app",
            explanation: "Pas Hick's Law toe om deze overvolle instellingenpagina te verbeteren door items te groeperen in logische categorieën.",
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
                name: "Account",
                description: "Persoonlijke accountgegevens en -instellingen"
              },
              {
                name: "Privacy & Beveiliging",
                description: "Instellingen voor uw privacy en veiligheid"
              },
              {
                name: "Meldingen",
                description: "Beheer hoe en wanneer u meldingen ontvangt"
              },
              {
                name: "Weergave",
                description: "Pas het uiterlijk van de app aan"
              },
              {
                name: "Betaling & Abonnementen",
                description: "Financiële instellingen en abonnementsbeheer"
              },
              {
                name: "Apparaat & Connectiviteit",
                description: "Apparaat- en verbindingsinstellingen"
              },
              {
                name: "Ondersteuning",
                description: "Hulp en ondersteuning"
              }
            ],
            solution: {
              "Account": ["Account gegevens", "Wachtwoord wijzigen", "E-mail adres wijzigen", "Profielfoto"],
              "Privacy & Beveiliging": ["Privacyinstellingen", "Zichtbaarheid profiel", "Gegevens downloaden", "Account verwijderen"],
              "Meldingen": ["Pushmeldingen", "E-mailnotificaties", "SMS-meldingen", "Stille modus"],
              "Weergave": ["Taal instellen", "Thema wijzigen", "Tekstgrootte", "Contrast"],
              "Betaling & Abonnementen": ["Betaalmethodes", "Factureringsgeschiedenis", "Abonnementen", "Kortingscodes"],
              "Apparaat & Connectiviteit": ["Apparaatbeheer", "Verbindingen", "Bluetooth", "Wifi-instellingen"],
              "Ondersteuning": ["Helpcentrum", "Feedback geven", "Veelgestelde vragen", "Contact opnemen"]
            },
            feedback: {
              correct: "Uitstekend! Door de 28 instellingen te groeperen in 7 logische categorieën, heb je de cognitieve belasting verminderd. De gebruiker hoeft nu eerst maar uit 7 opties te kiezen in plaats van uit 28. Binnen elke categorie zijn de opties ook beperkt tot 4 items, wat binnen de aanbevolen limiet van 7±2 valt. Deze toepassing van Hick's Law maakt de interface veel gebruiksvriendelijker en versnelt de beslissingstijd.",
              incorrect: "Je bent op de goede weg, maar sommige items staan nog niet in de meest logische categorie. Probeer opnieuw door te denken aan welke items natuurlijk bij elkaar horen en hoe een gebruiker zou zoeken naar deze opties."
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