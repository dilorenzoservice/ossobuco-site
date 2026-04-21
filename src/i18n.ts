export type Lang = "it" | "en";

export const translations = {
  it: {
    // Navbar
    nav: {
      chiSiamo: "Chi Siamo",
      fantastici: "Da Non Perdere",
      menu: "Menù",
      galleria: "Galleria",
      recensioni: "Recensioni",
      contatti: "Contatti",
      prenota: "Prenota",
    },
    // Hero
    hero: {
      sub: "Steakhouse & Restaurant",
      location: "Cerignola, Puglia",
      cta: "Prenota il tuo Tavolo",
      socialProof: "★★★★★\u2002 4.8 · 200+ recensioni su Google",
    },
    // Chi Siamo tabs
    chiSiamo: {
      label: "La nostra storia",
      tab1: "I Fondatori",
      tab2: "Premi",
      tab3: "La Filosofia",
      founders: {
        title: "Due anime, una visione",
        subtitle: "Emanuele & Francesca",
        emanuele: {
          role: "Fondatore & Chef",
          bio: "Emanuele vive la cucina come una religione. Ogni taglio è studiato, ogni brace calibrata, ogni frollatura rispettata fino all'ultimo giorno. Non cucina per sfamare — cucina per far innamorare. La sua ossessione per la qualità è il cuore pulsante di Ossobuco.",
          quote: "\"La carne non mente. Se la tratti bene, te lo restituisce nel piatto.\"",
        },
        francesca: {
          role: "Fondatrice & Responsabile Sala",
          bio: "Francesca trasforma ogni tavolo in un luogo dove ci si sente a casa. Con uno sguardo sa già di cosa hai bisogno, con un sorriso fa dimenticare il mondo fuori. L'accoglienza per lei non è un lavoro — è un talento naturale.",
          quote: "\"Un cliente soddisfatto non torna solo per il cibo. Torna per come lo abbiamo fatto sentire.\"",
        },
      },
      premi: {
        title: "Riconoscimenti",
        subtitle: "Il talento premiato",
        list: [
          {
            anno: "2026",
            nome: "Crunchy Competition",
            posizione: "2° Posto",
            piatto: "Black Dragon",
            desc: "Il nostro panino Black Dragon ha conquistato il secondo posto alla Crunchy Competition 2026 — uno dei contest dedicati ai migliori burger artigianali d'Italia.",
          },
        ],
      },
      filosofia: {
        label: "La nostra filosofia",
        title: "Il Verbo della Carne",
        manifesto: "Selezionare. Frollare. Grigliare.",
        body: "Non esistono scorciatoie quando ami quello che fai. Da Ossobuco ogni bistecca inizia il suo viaggio settimane prima di arrivare sul tuo piatto — selezionata tra le migliori razze bovine del mondo, affidata alla pazienza della frollatura, rispettata in ogni singola fibra. La brace non è un metodo di cottura. È un rito. È il momento in cui tutto quello che abbiamo costruito incontra il calore e si trasforma in qualcosa di indimenticabile. Vieni a sederti. Lascia che il fuoco faccia il resto.",
        stats: [
          { value: "120", label: "Giorni max di frollatura" },
          { value: "7+", label: "Razze bovine selezionate" },
          { value: "100%", label: "Passione in ogni piatto" },
        ],
      },
    },
    // Fantastici 4
    fantastici: {
      label: "Dal nostro cuore",
      title: "Da Non Perdere",
      subtitle: "I piatti che hanno reso Ossobuco una leggenda a Cerignola",
      cta: "Prenota un Tavolo",
      items: [
        {
          tag: "Il Re",
          name: "Tomahawk Irlandese",
          desc: "Il taglio che ha scritto la storia di Ossobuco. Frollato con pazienza, grigliato sul fuoco vivo — ogni morso è un viaggio che non dimenticherai.",
        },
        {
          tag: "Homemade",
          name: "Tiramisù della Casa",
          desc: "Fatto ogni giorno con le mani, come una volta. Cremoso, intenso, irresistibile. Il modo perfetto per chiudere una serata straordinaria.",
        },
        {
          tag: "Chef's Pick",
          name: "Tartare di Scottona",
          desc: "Carne di prima scelta lavorata a coltello, su crema di patate affumicate e gocce di gorgonzola. Cruda, audace, perfetta.",
        },
        {
          tag: "Best Seller",
          name: "Mr. Bacon Burger",
          desc: "200g di manzo, doppio bacon croccante, cheddar fuso e la nostra salsa segreta. Il burger che ha fatto innamorare mezza Cerignola.",
        },
      ],
    },
    // Menu
    menu: {
      label: "La nostra proposta",
      title: "Sfoglia il Nostro Menù",
      sub: "Dall'antipasto al dolce, ogni piatto racconta una storia — prezzi inclusi.",
      cta: "Apri il Menù",
      ctaNote: "PDF · piatti e prezzi completi",
    },
    // Galleria
    galleria: {
      label: "Il nostro mondo",
      title: "La Galleria",
      sub: "Scatti dal nostro mondo fatto di brace, impasti e mixology.",
      cta: "Ti è venuta fame? Prenota ora",
      filters: {
        tutti: "Tutti",
        cibo: "🥩 Cibo",
        drink: "🍸 Drink",
      },
    },
    // Recensioni
    recensioni: {
      label: "Le voci dei nostri ospiti",
      title: "Dicono di Noi",
      cta: "Leggi tutte le recensioni",
      deliveroo: "Ordina su Deliveroo",
      aggregateLabel: "recensioni verificate su Google",
    },
    // Contatti
    contatti: {
      label: "Ti aspettiamo",
      title: "Vieni a Trovarci",
      indirizzo: "Indirizzo",
      orari: "Orari",
      orariVal: "Lun–Ven & Dom: 19:00–00:00 | Sab: 19:00–01:30",
      cell: "WhatsApp / Cellulare",
      fisso: "Telefono fisso",
      cta: "Prenota su WhatsApp",
      ctaNote: "Risposta garantita entro 2 ore · oppure chiama: 0885 325669",
    },
    // Footer
    footer: {
      tagline: "Love at First Cut",
      copy: "© 2025 Ossobuco Steakhouse & Restaurant — Tutti i diritti riservati",
      credit: "Creato da",
    },
    // Intro
    intro: {
      scroll: "Scorri",
      tagline: "Love at First Cut",
      steakhouse: "Steakhouse",
    },
  },

  en: {
    nav: {
      chiSiamo: "About Us",
      fantastici: "Must Try",
      menu: "Menu",
      galleria: "Gallery",
      recensioni: "Reviews",
      contatti: "Contact",
      prenota: "Book Now",
    },
    hero: {
      sub: "Steakhouse & Restaurant",
      location: "Cerignola, Puglia — Italy",
      cta: "Book Your Table",
      socialProof: "★★★★★\u2002 4.8 · 200+ reviews on Google",
    },
    chiSiamo: {
      label: "Our story",
      tab1: "The Founders",
      tab2: "Awards",
      tab3: "Philosophy",
      founders: {
        title: "Two souls, one vision",
        subtitle: "Emanuele & Francesca",
        emanuele: {
          role: "Founder & Chef",
          bio: "Emanuele lives the kitchen as a religion. Every cut is studied, every ember calibrated, every aging process respected to the last day. He doesn't cook to feed — he cooks to make you fall in love. His obsession with quality is the beating heart of Ossobuco.",
          quote: "\"Meat never lies. Treat it well, and it gives everything back on the plate.\"",
        },
        francesca: {
          role: "Founder & Front of House",
          bio: "Francesca turns every table into a place where you feel at home. With a glance she already knows what you need, with a smile she makes you forget the world outside. Hospitality for her isn't a job — it's a natural gift.",
          quote: "\"A happy guest doesn't come back just for the food. They come back for how we made them feel.\"",
        },
      },
      premi: {
        title: "Awards",
        subtitle: "Talent recognised",
        list: [
          {
            anno: "2026",
            nome: "Crunchy Competition",
            posizione: "2nd Place",
            piatto: "Black Dragon",
            desc: "Our Black Dragon sandwich won second place at the Crunchy Competition 2026 — one of Italy's most prestigious artisan burger contests.",
          },
        ],
      },
      filosofia: {
        label: "Our philosophy",
        title: "The Gospel of Meat",
        manifesto: "Select. Age. Grill.",
        body: "There are no shortcuts when you love what you do. At Ossobuco every steak begins its journey weeks before it reaches your plate — selected from the world's finest breeds, entrusted to the patience of dry aging, respected in every single fibre. The grill is not a cooking method. It is a ritual. It is the moment when everything we have built meets the heat and transforms into something unforgettable. Come and sit down. Let the fire do the rest.",
        stats: [
          { value: "120", label: "Max days of dry aging" },
          { value: "7+", label: "Selected cattle breeds" },
          { value: "100%", label: "Passion in every dish" },
        ],
      },
    },
    fantastici: {
      label: "From our heart",
      title: "Must Try",
      subtitle: "The dishes that made Ossobuco a legend in Cerignola",
      cta: "Book a Table",
      items: [
        {
          tag: "The King",
          name: "Irish Tomahawk",
          desc: "The cut that wrote Ossobuco's history. Patiently aged, grilled over live fire — every bite is a journey you won't forget.",
        },
        {
          tag: "Homemade",
          name: "House Tiramisù",
          desc: "Made by hand every day, the old-fashioned way. Creamy, intense, irresistible. The perfect way to end an extraordinary evening.",
        },
        {
          tag: "Chef's Pick",
          name: "Scottona Tartare",
          desc: "Hand-cut premium beef on smoked potato cream with gorgonzola drops. Raw, bold, perfect.",
        },
        {
          tag: "Best Seller",
          name: "Mr. Bacon Burger",
          desc: "200g beef patty, double crispy bacon, melted cheddar and our secret sauce. The burger that won over half of Cerignola.",
        },
      ],
    },
    menu: {
      label: "Our offering",
      title: "Browse Our Menu",
      sub: "From starters to dessert, every dish tells a story — prices included.",
      cta: "Open Menu",
      ctaNote: "PDF · full dishes and prices",
    },
    galleria: {
      label: "Our world",
      title: "Gallery",
      sub: "Shots from our world of embers, dough and mixology.",
      cta: "Hungry for more? Book now",
      filters: {
        tutti: "All",
        cibo: "🥩 Food",
        drink: "🍸 Drinks",
      },
    },
    recensioni: {
      label: "Our guests' voices",
      title: "What They Say",
      cta: "Read all reviews",
      deliveroo: "Order on Deliveroo",
      aggregateLabel: "verified reviews on Google",
    },
    contatti: {
      label: "We're waiting for you",
      title: "Come Find Us",
      indirizzo: "Address",
      orari: "Opening Hours",
      orariVal: "Mon–Fri & Sun: 7:00pm–12:00am | Sat: 7:00pm–1:30am",
      cell: "WhatsApp / Mobile",
      fisso: "Landline",
      cta: "Book on WhatsApp",
      ctaNote: "Reply guaranteed within 2 hours · or call: 0885 325669",
    },
    footer: {
      tagline: "Love at First Cut",
      copy: "© 2025 Ossobuco Steakhouse & Restaurant — All rights reserved",
      credit: "Created by",
    },
    intro: {
      scroll: "Scroll",
      tagline: "Love at First Cut",
      steakhouse: "Steakhouse",
    },
  },
} as const;

export type Translations = typeof translations.it;
