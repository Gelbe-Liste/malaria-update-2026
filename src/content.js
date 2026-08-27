export const pages = [
  {
    id: "intro",
    number: "01",
    nav: "Malaria-Update 2025",
    kicker: "Reisemedizin",
    title: "Malaria-Update 2025",
    subtitle: "WHO-Zahlen, neue Bedrohungen und was deutsche reisemedizinisch tätige Ärzt:innen jetzt praktisch brauchen",
    background: "/assets/images/hero-mosquito.jpg",
    focal: "center 50%",
    tone: "dark",
    align: "left",
    kind: "hero",
    quote: "Therapie-/Prophylaxe-Entscheidungen erfolgen patientenindividuell nach aktuellen Leitlinien (z. B. DTG/RKI) und Fachinformationen [3, 4, 5].",
    attribution: "Redaktion Gelbe Liste"
  },
  {
    id: "kernaussagen",
    number: "02",
    nav: "Kernaussagen",
    kicker: "Kernaussagen in 60 Sekunden",
    title: "282 Mio. Malariafälle 2024",
    subtitle: "+9 Mio. (+3 %) im Vergleich zu 2023 [2]",
    background: "/assets/images/cases-country.png",
    focal: "center center",
    tone: "light",
    align: "left",
    kind: "stats",
    stats: [
      { value: "64,0", label: "Fälle pro 1.000 Risikopersonen 2024 (+2 %)" },
      { value: "62,7", label: "Fälle pro 1.000 Risikopersonen 2023" }
    ],
    quote: "Fünf Länder bündeln fast die Hälfte der Fälle (49,5 %) [2]",
    bullets: ["24,3 % Nigeria", "12,5 % DR Kongo", "4,7 % Uganda", "4,4 % Äthiopien", "3,6 % Mosambik"]
  },
  {
    id: "bedrohungen",
    number: "03",
    nav: "Neue Bedrohungen",
    kicker: "Kernaussagen in 60 Sekunden",
    title: "610.000 Todesfälle 2024",
    subtitle: "+12.000 gegenüber 2023 [2]",
    background: "/assets/images/pathogens.jpg",
    focal: "center center",
    tone: "dark",
    align: "right",
    kind: "standard",
    blocks: [
      {
        heading: "Neue Bedrohungslage (biologisch)",
        text: "Artemisinin-Teilverzögerungsresistenz ist in Afrika in 4 Ländern bestätigt (u. a. Ruanda, Uganda) und in 4 weiteren verdächtig [2]."
      },
      {
        heading: "Diagnostik-Risiko",
        text: "Parasiten mit pfhrp2/3-Deletionen können HRP2-Schnelltests unterlaufen. WHO-Empfehlung: bei >5 % falsch-negativen HRP2-RDTs Umstieg auf Pf-LDH-basierte Strategien [2]."
      },
      {
        heading: "Reisemedizin in Deutschland – die Praxis bleibt klar",
        text: "Expositionsprophylaxe + risikoadaptierte Chemoprophylaxe oder Standby [3, 4, 5]. Atovaquon/Proguanil ist in der reisemedizinischen Praxis eine sehr häufige Standardoption – vor allem für Kurz- und Last-Minute-Reisen [3, 6, 7]."
      }
    ]
  },
  {
    id: "who-zahlen",
    number: "04",
    nav: "WHO-Zahlen 2024",
    kicker: "World Malaria Report 2025",
    title: "Die WHO-Zahlen 2024: Was sich global verändert",
    background: "/assets/images/cases-areas.png",
    focal: "center center",
    tone: "light",
    align: "left",
    kind: "standard",
    paragraphs: [
      "Der World Malaria Report 2025 zeichnet kein lineares „Erfolg-nach-unten“-Narrativ, sondern eine Gleichzeitigkeit: Innovation wirkt, aber Systembrüche und biologische Anpassungen holen Fortschritte ein. 2024 registriert die WHO wieder mehr Fälle und mehr Todesfälle als im Vorjahr – der Zuwachs ist stark auf einzelne Länder und Krisenkontexte konzentriert [2]."
    ],
    heading: "Die wichtigsten Trends",
    bullets: [
      "Fallanstieg konzentriert: Drei Länder erklären 58 % des Anstiegs 2023→2024: Äthiopien (+2,9 Mio.), Madagaskar (+1,9 Mio.), Jemen (+378.000) [2].",
      "Todesanstieg konzentriert: Drei Länder erklären 85 % des Anstiegs: Madagaskar (+4.900), Äthiopien (+3.800), Jemen (+932) [2].",
      "Treiber: WHO nennt u. a. Konflikt und extreme Klimaereignisse als Faktoren, die Versorgung und Prävention unterbrechen [2].",
      "Finanzierung als systemische Engstelle: 2024 decken globale Mittel nur 42 % des Bedarfs zur Zielerreichung; 2025 verschärfen abrupte Kürzungen externer Hilfen die Lage [2]."
    ]
  },
  {
    id: "deutschland",
    number: "05",
    nav: "Relevanz für Deutschland",
    kicker: "Praxisrelevanz",
    title: "Warum das für Deutschland relevant ist",
    background: "/assets/images/malaria-map.png",
    focal: "center center",
    tone: "dark",
    align: "right",
    kind: "standard",
    paragraphs: [
      "Für Ärzt:innen in Deutschland ist Malaria in der Regel importierte Malaria (Reise- und Rückkehrermedizin). Gerade deshalb ist der WHO-Report relevant – nicht als „Fernproblem“, sondern als Risikohintergrund für Beratung, Diagnostik und Triage [2]."
    ],
    numbered: [
      "Mehr Transmission global erhöht das Grundrisiko für Reisende – insbesondere bei Afrika-Reisen [2].",
      "Versorgungsunterbrechungen in Endemiegebieten erhöhen die Wahrscheinlichkeit, dass Reisende vor Ort suboptimal versorgt werden – was Anamnese und Nachsorge komplexer macht [2].",
      "Diagnostik-Fallstricke (z. B. HRP2-RDT-Limitationen) sind für deutsche Praxen relevant, wenn Patient:innen „negativ getestet“ aus dem Ausland zurückkommen, aber klinisch passen [2]."
    ]
  },
  {
    id: "beratung",
    number: "06",
    nav: "Praxisblock 1",
    kicker: "Praxisblock 1",
    title: "Reisemedizinische Beratung – die Risiko-Logik",
    background: "/assets/images/globe-stethoscope.jpg",
    focal: "center center",
    tone: "dark",
    align: "left",
    kind: "steps",
    intro: "Wie wird aus Zielgebiet, Reiseprofil, Saison, Höhenlage und „Access-to-care“ eine saubere Entscheidung? Dieser Block gibt eine kompakte Entscheidungslogik für die Beratung: Immer Expositionsprophylaxe – und je nach Risiko Chemoprophylaxe oder Standby [3, 4, 5].",
    steps: [
      { title: "Schritt 1: Exposition einschätzen", items: ["Region (Land und Subregion), Saison (Regenzeit), Höhenlage, urban/remote", "Reiseart (Rucksack/Outdoor/Nachtaktivität vs. Resort/Business)", "Unterkunft (Netz/Klimaanlage/geschlossene Räume)"] },
      { title: "Schritt 2: Patient:innenprofil", items: ["Schwangerschaft, Kinder, Immunsuppression", "Komedikation (z. B. Antikoagulation), Nieren-/Leberfunktion", "Adhärenz realistisch?"] },
      { title: "Schritt 3: Zugang zu medizinischer Versorgung („Access-to-care“)", quote: "Diese Frage entscheidet oft zwischen Chemoprophylaxe und Standby/Notfall-Selbst-Behandlung: Ist eine adäquate Diagnostik/Therapie binnen 24–48 Stunden realistisch erreichbar? Die DTG nutzt genau diese Logik für die Frage, wann eine Notfall-Selbst-Behandlung überhaupt verordnet werden sollte [3]." }
    ]
  },
  {
    id: "chemoprophylaxe",
    number: "07",
    nav: "Praxisblock 2",
    kicker: "Praxisblock 2",
    title: "Chemo-Prophylaxe – Atovaquon/ Proguanil als Standard-Option",
    subtitle: "„Gold-Standard“ in der Praxis, aber individuell",
    background: "/assets/images/pills-map.jpg",
    focal: "center center",
    tone: "light",
    align: "right",
    kind: "standard",
    paragraphs: [
      "In der Reisemedizin wird Atovaquon/Proguanil (A/P) sehr häufig als Standardoption eingesetzt – vor allem, weil es für viele Reisekonstellationen praktisch ist: kurzer Vorlauf, tägliche Einnahme, kurzer Nachlauf und gute Verträglichkeit. Die DTG beschreibt A/P explizit als besonders geeignet für Last-Minute- und Kurzreisen in Gebiete mit P. falciparum-Risiko [3]."
    ],
    heading: "Warum A/P in der Beratung so oft vorn liegt",
    bullets: [
      "Schneller Start: Beginn typischerweise 1–2 Tage vor Reise (Last-Minute-tauglich) [3, 6, 7].",
      "Kurzer Nachlauf: Einnahme bis 7 Tage nach Verlassen des Risikogebiets [3, 6, 7].",
      "Praktikabilität: tägliche Routine, häufig gute Verträglichkeit [6, 7]."
    ],
    quote: "Atovaquon/Proguanil ist in der reisemedizinischen Praxis eine sehr häufige Standardoption der Chemoprophylaxe. Die konkrete Auswahl erfolgt jedoch immer zielgebiets- und patientenindividuell nach aktuellen Empfehlungen und Fachinformationen [3, 4, 5].",
    note: "Wichtiger Hinweis: Nicht empfohlen bzw. eingeschränkt je nach Situation (z. B. schwere Niereninsuffizienz, bestimmte Schwangerschafts-/Stillkonstellationen; Interaktionen z. B. mit Warfarin sind zu beachten) [3, 5, 6, 7]."
  },
  {
    id: "standby",
    number: "08",
    nav: "Praxisblock 3",
    kicker: "Praxisblock 3",
    title: "Standby-Therapie / Notfall-Selbst-Behandlung",
    subtitle: "Wann sie sinnvoll ist und warum A/P auch hier wichtig ist",
    background: "/assets/images/medical-supplies.jpg",
    focal: "center center",
    tone: "dark",
    align: "left",
    kind: "standard",
    paragraphs: [
      "Viele deutsche Kolleg:innen nutzen Standby als pragmatische Lösung bei geringerem Risiko, wenn zugleich medizinische Versorgung nicht zuverlässig erreichbar ist. Die DTG beschreibt hierfür klare Kriterien und betont: Notfall-Selbst-Behandlung ist eine Ausnahme-Strategie und ersetzt nicht die ärztliche Abklärung [3]."
    ],
    heading: "Wann Standby (NSB) überhaupt in Frage kommt",
    quote: "Wenn Malaria-Risiko besteht, aber eine ärztliche Diagnostik/Therapie innerhalb von 48 Stunden nicht sicher erreichbar ist – insbesondere bei längeren Aufenthalten oder unklarer Versorgungslage [3, 5].",
    blocks: [
      {
        heading: "Was als Standby verwendet wird",
        text: "Die DTG nennt als NSB-Optionen u. a. Atovaquon/Proguanil oder Artemether/Lumefantrin. Für Reisen nach Teilen Südostasiens wird A/P als NSB hervorgehoben [3]."
      }
    ],
    note: "Standby/Notfall-Selbst-Behandlung nur nach ärztlicher Einweisung: Bei Fieber (≥38 °C) möglichst sofort ärztliche Hilfe suchen. Standby nur einsetzen, wenn eine qualifizierte Abklärung innerhalb von 48 Stunden nicht erreichbar ist [5]."
  },
  {
    id: "rueckkehrerfieber",
    number: "09",
    nav: "Praxisblock 4",
    kicker: "Praxisblock 4",
    title: "Rückkehrer-Fieber – Diagnostik, typische Fallstricke, „rote Flaggen“",
    background: "/assets/images/thermometer.jpg",
    focal: "center center",
    tone: "light",
    align: "right",
    kind: "standard",
    paragraphs: [
      "Hier entscheidet sich Relevanz für Deutschland: Die meisten Ärzt:innen sehen Malaria nicht täglich, aber sie müssen sie schnell erkennen [4]."
    ],
    quote: "Fieber nach Aufenthalt in einem Malariagebiet ist ein medizinischer Notfall, bis Malaria ausgeschlossen ist. Das gilt besonders bei Rückkehr aus Afrika und auch dann, wenn im Ausland „ein Schnelltest negativ“ war [2, 4].",
    heading: "Warum „negativer Schnelltest“ nicht reicht",
    blocks: [
      {
        heading: "Diagnostik-Risiko",
        text: "Die WHO beschreibt pfhrp2/3-Deletionen als biologische Bedrohung, weil HRP2-basierte Schnelltests dadurch falsch negativ werden können. Bei relevanter Rate falsch-negativer HRP2-RDTs empfiehlt WHO eine Pf-LDH-basierte Strategie [2]."
      }
    ],
    note: "Praktische Übersetzung: Wenn Anamnese und Klinik passen, nicht beruhigen lassen! Weiter abklären, ggf. wiederholen und tropenmedizinische Expertise einholen [4]."
  },
  {
    id: "resistenzen",
    number: "10",
    nav: "Resistenzen & Diagnostik",
    kicker: "Neue Bedrohungslage",
    title: "Resistenzen & Diagnostik-Evasion",
    subtitle: "Was Ärzt:innen wissen sollten – ohne Alarmismus",
    background: "/assets/images/laboratory.jpg",
    focal: "center center",
    tone: "dark",
    align: "left",
    kind: "standard",
    blocks: [
      {
        heading: "Artemisinin-Teilverzögerungsresistenz: neue Realität in Afrika",
        text: "Der WHO-Report dokumentiert: Vier Länder haben bestätigte Artemisinin-Teilverzögerungsresistenz (Eritrea, Ruanda, Uganda, Tansania), vier weitere zeigen verdächtige Signale (Äthiopien, Namibia, Sudan, Sambia). Klinisch ist bislang vor allem verzögerte Parasiten-Clearance beschrieben; ACTs bleiben vielerorts wirksam, solange Partnerdrugs tragen – genau deshalb ist Surveillance entscheidend [2]."
      },
      {
        heading: "Frühe Signale bei Partnerdrug-Wirksamkeit: wachsam bleiben",
        text: "WHO berichtet, dass in einzelnen Studienstandorten Behandlungsausfälle >10 % (z. B. für Artemether/Lumefantrin) beobachtet wurden, ohne dass Lumefantrin-Resistenz eindeutig bestätigt ist [2]."
      }
    ],
    quote: "Die Botschaft ist nicht „Panik“, sondern: Therapieausfälle ernst nehmen, Methodik beachten, Qualität der TES stärken [2]."
  },
  {
    id: "literatur",
    number: "11",
    nav: "Literatur & Download",
    kicker: "Literatur & Quellenangaben",
    title: "Weiterlesen und herunterladen",
    background: "/assets/images/plasmodium-map.png",
    focal: "center center",
    tone: "light",
    align: "right",
    kind: "sources"
  },
  {
    id: "app",
    number: "12",
    nav: "Gelbe Liste App",
    kicker: "Gelbe Liste",
    title: "Wissen für den Alltag – auch mobil",
    subtitle: "Gelbe Liste App – mobile Lösung für Ärzte, Apotheker & medizinische Fachkreise",
    background: "/assets/images/app-thumbnail.jpg",
    focal: "center center",
    tone: "dark",
    align: "left",
    kind: "video"
  },
  {
    id: "impressum",
    number: "13",
    nav: "Impressum",
    kicker: "Rechtliche Angaben",
    title: "Impressum",
    tone: "light",
    align: "left",
    kind: "imprint"
  }
];

export const sources = [
  "World Health Organization. World malaria report 2025: addressing the threat of antimalarial drug resistance. Geneva: WHO; 2025.",
  "World Health Organization. World malaria report 2025: addressing the threat of antimalarial drug resistance. 4 Dec 2025.",
  "Rothe C, Veit O, Rosenbusch D, Bühler S, Feldt T, Frühwein M, et al. Empfehlungen zur Malariaprophylaxe. Flugmed Tropenmed Reisemed. 2024;31(4):165–206.",
  "Deutsche Gesellschaft für Tropenmedizin, Reisemedizin und Globale Gesundheit (DTG). DTG-Empfehlungen Malaria. 2024.",
  "Robert Koch-Institut. RKI-Ratgeber: Malaria.",
  "Auswärtiges Amt (Gesundheitsdienst). Malaria: Empfehlungen zur Vorbeugung und Notfallselbstbehandlung. 2022.",
  "Centers for Disease Control and Prevention. Malaria. In: CDC Yellow Book. 2025.",
  "Centers for Disease Control and Prevention. Choosing a drug to prevent malaria. 2024."
];

export const sourceLinks = [
  "https://iris.who.int/items/45093170-6d1f-4a8b-b34e-beef35776cbd",
  "https://www.who.int/publications/i/item/9789240117822",
  "https://doi.org/10.1055/a-2351-8414",
  "https://www.dtg.org/images/Startseite-Download-Box/2024_DTG_Empfehlungen_Malaria.pdf",
  "https://www.rki.de/DE/Aktuelles/Publikationen/RKI-Ratgeber/Ratgeber/Ratgeber_Malaria.html",
  "https://www.auswaertiges-amt.de/resource/blob/200176/2118770c95ac9a07dab343e6cb3ebed9/malariamerkblatt-data.pdf",
  "https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/malaria.html",
  "https://www.cdc.gov/malaria/hcp/drug-malaria/index.html"
];
