export type Topic = "Feeding" | "Breeding" | "Disease" | "Hygiene" | "Management";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  topic: Topic;
  minutes: number;
  summary: string;
  image?: { src: string; alt: string; caption: string };
  takeaways: string[];
  thisWeek: string[];
  sections: ArticleSection[];
};

export const topics: Topic[] = [
  "Feeding",
  "Breeding",
  "Disease",
  "Hygiene",
  "Management",
];

export const articles: Article[] = [
  {
    slug: "feeding-the-milking-cow",
    title: "Feeding the cow that is actually milking",
    topic: "Feeding",
    minutes: 7,
    summary:
      "Water, napier, and dairy meal — how they fit together, and the mistakes that quietly drop litres.",
    image: {
      src: "/images/napier.jpg",
      alt: "Freshly chopped napier grass beside a scoop of dairy meal on a wooden board",
      caption: "Forage first. Dairy meal covers the litres that napier cannot carry.",
    },
    takeaways: [
      "A cow in milk needs clean water all day — often 60 to 80 litres.",
      "Cut napier before the stems go woody, and chop it so less is wasted.",
      "A starting point for dairy meal is about 1 kg for every 2 litres above what good forage supports.",
      "Steam up in the last three weeks before calving. Do not improvise calcium.",
    ],
    thisWeek: [
      "Bag one cow’s napier for a day so you know what “enough” looks like.",
      "Wash the water trough and refill it before morning milking.",
      "Write down kilograms of dairy meal used and litres produced.",
    ],
    sections: [
      {
        heading: "Water before milk",
        paragraphs: [
          "A cow in milk drinks before she eats, and eats before she milks. In the Kenyan highlands a typical lactating cow needs on the order of 60 to 80 litres of clean water a day, and more when the shed is hot or yield is high.",
          "A half-empty drum that has turned green is not “some water”. Wash the trough. Let her drink at will, including overnight if you zero-graze. Litres fall within a day when water is short, and they do not bounce back the hour the drum is refilled.",
        ],
      },
      {
        heading: "Cut napier while it is still young",
        paragraphs: [
          "Napier grass carries most small herds. Cut it around knee to waist height, before the stems harden and the feed value drops. A large cow may take 40 to 70 kilograms of fresh napier in a day. Chop it. Long stems get pulled out and wasted, and that waste is labour you already spent.",
          "If the grass is very wet, wilt it for a few hours so she is not filling up on water. In the dry months, do not wait until the napier stand is finished. A small silage pit — or well-packed bags of grass chopped in the rains — is what keeps January and February from wiping out the yield you built in the long rains.",
        ],
      },
      {
        heading: "Forage does not finish the ration",
        paragraphs: [
          "Napier on its own is short of protein. Close the gap with a legume in the field (desmodium, lucerne, calliandra) or with sweet-potato vines, or with dairy meal. A practical order is forage free-choice, then meal for the milk that forage cannot carry.",
          "A field starting point many extension officers use: about 1 kilogram of dairy meal, around 16 percent crude protein, for every 2 litres above the first 5 to 8 litres that decent forage is supporting. It is a starting point, not a law. For a fortnight, watch yield, body condition, and the dung. Tight dark dung and a falling yield can mean too little meal or tired forage. Loose, pale dung often means too much meal and too little fibre.",
        ],
      },
      {
        heading: "Minerals, and the weeks around calving",
        paragraphs: [
          "Keep a dairy mineral lick under cover, with salt, calcium, and phosphorus, where dung cannot cake it. Cows use it if they can reach it.",
          "The last three weeks before calving are the transition. A little extra meal then — steaming up — helps her into milk without stripping her own body. Do not suddenly load calcium before calving unless a vet who has seen the cow has told you to. A cow that goes down after calving, feels cold over the ears, or has a dry muzzle needs a vet the same hour. That is milk-fever territory, and a home mixture is a common way to make it worse.",
        ],
        bullets: [
          "Offer fibre before dairy meal, not instead of a real forage base.",
          "Keep meal off a damp floor. Mould is not a bargain.",
          "Change one thing at a time — ration or milker, not both on the same morning — so you can see what worked.",
          "Judge the bag by litres, body condition, and cost per litre, not by the printing on it.",
        ],
      },
    ],
  },
  {
    slug: "breeding-and-calving",
    title: "Heat, service, and a calf every year",
    topic: "Breeding",
    minutes: 6,
    summary:
      "How to spot heat, when to call for AI, and the card that stops a cow going a year without a calf.",
    image: {
      src: "/images/calf.jpg",
      alt: "A young Friesian calf lying in clean straw inside a wooden pen",
      caption: "The milk plan is a calf roughly once a year, from a cow that was served on time.",
    },
    takeaways: [
      "Aim to serve a clean, eating cow by 60 to 80 days after calving.",
      "The sign that counts is standing to be mounted. Then use the morning-afternoon rule.",
      "Traceable AI is safer than a borrowed bull.",
      "Write the service the same day. Expect the calf about 280 days later.",
    ],
    thisWeek: [
      "Mark any cow more than 80 days calved who has not been served.",
      "Keep a pencil and a card where you milk, not in the house.",
      "Ask your AI provider which sire codes they actually have this month.",
    ],
    sections: [
      {
        heading: "A calf is the milk plan",
        paragraphs: [
          "Milk follows calving. On a small Kenyan herd a useful target is a calf about once a year: a calving interval of 12 to 14 months. Longer than that, you are feeding a passenger. The clock starts at calving. Aim to catch a heat and serve her by about 60 to 80 days after she calves, once any discharge has cleared and she is eating well.",
        ],
      },
      {
        heading: "What heat actually looks like",
        paragraphs: [
          "The cycle is about 21 days. The sign that matters most is standing to be mounted and not walking away. Also watch for restlessness, a sudden drop in that morning’s milk, a clear mucus string, a swollen vulva, and mud or scuffs on the flanks.",
          "Tie a note on the shed the morning you see it. Memory is a poor breeding record, and a missed heat is three more weeks of meal with no calf to show for it.",
        ],
      },
      {
        heading: "Serve about twelve hours after standing heat",
        paragraphs: [
          "Heat seen in the morning is served that afternoon. Heat seen in the evening is served the next morning. Call the inseminator when you are sure, not after you come back from the market. If the cow has already gone quiet and will not stand, you are late — note the date anyway so you can watch for the next cycle in about three weeks.",
        ],
      },
      {
        heading: "AI, a bull, and a breed you can feed",
        paragraphs: [
          "Artificial insemination from a licensed provider, with semen you can trace, brings better genetics and avoids walking a bull’s diseases through the shed. Kenya Animal Genetic Resources Centre and other licensed suppliers are the usual sources. A bull is simpler on a far farm and genuinely dangerous in a small zero-grazing unit. If you use one, keep him off cows that are still dirty after calving, and do not borrow a bull of unknown health.",
          "Choose the breed for your feed, not for a poster. Friesians give more milk and demand more meal and stricter tick control. Ayrshires suit many highland zero-grazing units. Jerseys and Guernseys are smaller, with richer milk. Where heat, ticks, and distance make a pure Friesian expensive to keep alive, ask about Sahiwal blood and other crosses.",
        ],
      },
      {
        heading: "One card on the wall",
        paragraphs: [
          "Gestation is about 280 days — nine months and roughly ten days. Each cow needs a card with her identity, last calving date, every heat, every service date, the sire code, and the expected calving. When that month arrives, steam her up and bed a clean calving pen.",
          "A calf that gets at least two litres of first-milking colostrum within two hours of birth has a different life from one that waits until evening. Dip the navel with iodine the same day.",
        ],
        bullets: [
          "Identity or tag, and date of birth if you know it.",
          "Calving dates, heats, and service dates with the sire code.",
          "Expected calving, counted about 280 days from service.",
          "Treatments, and the date her milk may rejoin the can.",
        ],
      },
    ],
  },
  {
    slug: "diseases-to-prevent",
    title: "The illnesses that take the milk first",
    topic: "Disease",
    minutes: 7,
    summary:
      "Mastitis, ticks, and the withdrawal period. What to do every week, and what should not wait for market day.",
    takeaways: [
      "Strip the first squirts into a cup every milking. Mastitis milk never enters the can.",
      "Honour the antibiotic withdrawal and write the date she rejoins the can.",
      "Thorough tick control on a fixed day is how you keep East Coast fever out.",
      "A new animal stays separate. Vaccinate when the county campaign comes.",
    ],
    thisWeek: [
      "Use a strip cup tomorrow and look, don’t glance.",
      "Check the date any treated cow is allowed back into the can.",
      "Look for ticks on ears and the tail head. If you find them, spray day is late.",
    ],
    sections: [
      {
        heading: "Mastitis is the everyday thief",
        paragraphs: [
          "A hot, swollen quarter, clots, flakes, or watery milk is mastitis until someone qualified says otherwise. It is also the most common way a cow loses a quarter for good. Before you milk, strip three squirts from each teat into a strip cup — not onto the floor, where it splashes back, and not into the can.",
          "Milk a sick quarter last, into its own container. Keep that milk away from calves if the cow is on antibiotics. Call a veterinarian rather than buying “the usual syringe” from a shop counter. Finish the course they prescribe. Stopping when the milk looks normal is how a quarter becomes chronic.",
        ],
      },
      {
        heading: "The withdrawal period is not a suggestion",
        paragraphs: [
          "Every antibiotic has days when that cow’s milk must stay out of the can. Read the label with the vet and write the return date on her card. Dairies and co-operatives test for residues. One treated cow can spoil a shared can and get your number suspended. The lost litres belong in the calculator for that week — hiding them only hides the cost.",
        ],
      },
      {
        heading: "Ticks and East Coast fever",
        paragraphs: [
          "East Coast fever is carried by brown ear ticks and kills grade cattle quickly. The prevention is dull, which is why it works: spray or dip on a fixed day, with an acaricide your vet or livestock officer still trusts, and cover the ears, udder, tail head, and between the legs. A weak mix used “to save chemical” is how resistance starts.",
          "Swollen glands in front of the shoulder, a high fever, and difficult breathing are a same-day vet call. Do not wait to see if she eats after dark. This guide will not name a dose. The animal in front of you, and a person licensed to treat her, decide that.",
        ],
      },
      {
        heading: "Waves of disease, and animals you buy",
        paragraphs: [
          "Lumpy skin disease and foot-and-mouth move through an area in waves. When the county or your vet announces vaccination, take the date seriously and present the whole herd they ask for. Isolate any animal you buy for at least two weeks, away from the milking cows if you can. A cheap cow from the market is expensive if she arrives with a fever.",
        ],
      },
      {
        heading: "Calves and worms",
        paragraphs: [
          "Iodine on the navel the day she is born, colostrum early, and a dry pen will do more than a tonic. Deworm on a plan matched to your rainfall — often two or three times a year, more often if animals graze wet ground. Repeating a timid dose of the same product every month trains the worms. It does not clear them. Ask the livestock officer what is still working in your ward.",
        ],
      },
    ],
  },
  {
    slug: "milk-hygiene",
    title: "Milk that passes the collection centre",
    topic: "Hygiene",
    minutes: 6,
    summary:
      "From the teat to the can: the habits that keep milk sweet, and the ones buyers send home.",
    image: {
      src: "/images/cans.jpg",
      alt: "Three plain aluminium milk cans standing on a damp concrete floor at dawn",
      caption: "Aluminium you can scrub, dried upside down, beats a plastic jerrycan every time.",
    },
    takeaways: [
      "Wash and dry the teats. Use one towel per cow.",
      "Milk into aluminium or steel, scrub the can the same day, and dry it upside down.",
      "If you have no cooler, speed and shade are your cooler.",
      "No water, no antibiotic milk, no mastitis milk, and no colostrum in the can.",
    ],
    thisWeek: [
      "Scrub the cans the moment they come back, not at the next milking.",
      "Boil the filter cloth and dry it in the sun.",
      "Time how long cans sit before they reach shade or the centre.",
    ],
    sections: [
      {
        heading: "Clean hands, clean teats, a dry udder",
        paragraphs: [
          "Wash your hands. Wash the udder with clean water and dry it with a towel for that cow only, then wash the towel and dry it in the sun. A shared wet cloth moves mastitis from cow to cow. Manure on the teat ends up in the can. So does water running off a dirty udder — a buyer will call that adulteration even when you never added water on purpose.",
        ],
      },
      {
        heading: "Equipment you can actually scrub",
        paragraphs: [
          "Milk into aluminium or stainless steel. Plastic jerrycans scratch, hold old milk in the seams, and warm up quickly. Scrub cans with hot water and a real detergent as soon as they return, then stand them upside down to dry. A can that still smells of yesterday will fail an alcohol test before the cow is the problem. Boil the filter cloth every day. A grey cloth is not “still all right”.",
        ],
      },
      {
        heading: "Time is the cooling system you already have",
        paragraphs: [
          "Milk sours in the sun. A farm without a cooler has one tool, and it is speed. Agree a collection time and keep it. If the rider is late, keep lids on, cans in the shade, and cans off the soil. Do not top a warm evening can up with the next morning’s milk and hope the test is kind.",
        ],
      },
      {
        heading: "How a centre decides",
        paragraphs: [
          "Most collection points use smell, an alcohol test, and a lactometer. Sour milk clots in alcohol. Watered milk fails the lactometer. Both get sent home, and you have already paid for the meal that made those litres. Arguing with the tester does not change the clot in the tube.",
        ],
      },
      {
        heading: "One can is everybody’s reputation",
        paragraphs: [
          "If you deliver with neighbours, milk may be mixed at the centre or already in a shared churn. Antibiotic milk, mastitis milk, and colostrum are not private problems. The thick first milk after calving belongs to the calf. Keep it out of the can for as long as your buyer specifies — often the first several days — and ask them rather than guessing. Kenya Dairy Board rules sit behind the centre’s tests. If you start selling past your own gate in a bigger way, ask what handling rules apply before you buy another can.",
        ],
      },
    ],
  },
  {
    slug: "running-the-farm",
    title: "Run the herd as a small business",
    topic: "Management",
    minutes: 7,
    summary:
      "The notebook, the cost of one litre, and the decisions that separate a busy shed from a paying one.",
    image: {
      src: "/images/hero-farm.jpg",
      alt: "Friesian cows eating napier in a timber zero-grazing shed, with aluminium cans on the apron",
      caption: "The shed is the business: floor, forage, cans, and a record of what each cow gave.",
    },
    takeaways: [
      "One page per cow: calving, service, milk, and treatments.",
      "Break-even is your cash costs divided by the litres you actually sold.",
      "A dry place to lie prevents more mastitis than a new slogan.",
      "Do not let a late milk cheque empty the dairy-meal store.",
    ],
    thisWeek: [
      "Open or update one card for each cow in milk.",
      "Put last month’s meal bill and the price you were paid into the calculator.",
      "Walk where the cows lie. If your boots stay wet, so do their udders.",
    ],
    sections: [
      {
        heading: "A pocket notebook beats a system you will abandon",
        paragraphs: [
          "Give every cow a name or a tag and one page: birth date if you know it, calvings, heats, services, treatments with the day her milk may rejoin the can, and a simple milk total. You cannot improve a cow you cannot point to. When yield drops for three mornings, the page tells you whether to look for heat, illness, or an empty trough.",
        ],
      },
      {
        heading: "Know what one litre costs you",
        paragraphs: [
          "Milk in the can is not yet money. Money is what remains after dairy meal, fodder you paid for, wages, the vet, AI, and transport. Divide those cash costs by the litres you were paid for — not the litres you hoped to sell. That figure is your break-even price. If the centre pays less than that, the herd is eating itself, however full the cans look.",
          "Use the calculator with the price on your last statement. Put family labour in if you want the true picture, or leave it at zero and remember the result is then flattering. A loan repayment is a real cost too, even though the calculator leaves a separate line in your own notebook for it.",
        ],
      },
      {
        heading: "The floor is a health decision",
        paragraphs: [
          "Zero-grazing saves land and makes feeding consistent. It also parks cows in their own mess if the floor is flat and wet. A slope, a dry place to lie, and manure taken out daily will do more for mastitis than changing breed. Compost the manure or take it back to the napier. A heap beside the milk stand is a flavour problem and a fly problem.",
          "Milk at the same two hours every day. An irregular clock lowers yield and invites mastitis. The person who milks matters as much as the cow: rushed stripping, wet teats, and a can set down in mud are management, not bad luck.",
        ],
      },
      {
        heading: "A late cheque becomes a feeding problem",
        paragraphs: [
          "Many co-operatives pay once a month. The cow needs meal every day. Stop the meal because the cheque is late and litres drop within days. They take weeks to return even after the bags are back. Keep a buffer of meal, or a cash float that is not spent on anything else, enough for a few weeks of concentrate.",
          "Checkoff — meal, AI, or shares deducted from the milk cheque — can be useful credit. Read the statement line by line. A deduction you do not understand is how a “good price per litre” becomes a thin envelope.",
        ],
      },
      {
        heading: "When to stop keeping a cow",
        paragraphs: [
          "Cull for a reason you can say out loud: a quarter that keeps returning mastitis, a cow that will not hold to service after fair chances and a fair ration, or a yield that does not cover her own meal month after month. Selling her while she can still walk onto a truck is a decision. Waiting until she cannot rise is a loss. Replace her with a heifer you planned for, not with whatever is cheapest on Saturday.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function relatedArticles(slug: string): Article[] {
  const current = getArticle(slug);
  if (!current) return articles.slice(0, 2);
  const others = articles.filter((article) => article.slug !== slug);
  const same = others.filter((article) => article.topic === current.topic);
  const rest = others.filter((article) => article.topic !== current.topic);
  return [...same, ...rest].slice(0, 2);
}
