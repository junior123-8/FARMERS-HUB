export type BuyerKind = "Co-operative" | "Processor";

export type Buyer = {
  name: string;
  kind: BuyerKind;
  where: string;
  summary: string;
};

export const buyers: Buyer[] = [
  {
    name: "Githunguri Dairy Farmers Co-operative Society",
    kind: "Co-operative",
    where: "Kiambu · Githunguri",
    summary:
      "A long-standing farmer-owned society. Members deliver on collection routes; the society cools and processes milk and pays against volume and quality. Many people know the products under the Fresha name.",
  },
  {
    name: "Limuru Dairy Farmers Co-operative Society",
    kind: "Co-operative",
    where: "Kiambu · Limuru",
    summary:
      "A highland society collecting from farms around Limuru. Worth comparing with Githunguri and with private buyers on pay day, distance, and what they stop from the cheque.",
  },
  {
    name: "Meru Central Dairy Co-operative Union",
    kind: "Co-operative",
    where: "Meru",
    summary:
      "A union of dairy societies on the Meru highlands. Farmers usually meet it through a local society and a cooling or collection point, not through a head office in town.",
  },
  {
    name: "Mukurweini Wakulima Dairy",
    kind: "Co-operative",
    where: "Nyeri · Mukurwe-ini",
    summary:
      "A farmer-owned dairy in Nyeri. Typical of the societies that matter most: close enough that morning milk is still sweet when it arrives.",
  },
  {
    name: "Kinangop Dairy",
    kind: "Processor",
    where: "Nyandarua · Kinangop",
    summary:
      "A buyer used by many farms on the Kinangop plateau. Treat it as a company you sell to. Ask about membership rules only if they offer shares — do not assume a village society structure.",
  },
  {
    name: "New Kenya Co-operative Creameries",
    kind: "Processor",
    where: "Cooling plants in several dairy counties",
    summary:
      "New KCC is a national processor with co-operative roots, not the society at the end of your road. Farmers meet it through collection routes and cooling centres. Confirm the current rate and test rules at the plant or route that would actually take your cans.",
  },
  {
    name: "Brookside Dairy",
    kind: "Processor",
    where: "Collection across many dairy counties",
    summary:
      "A private processor and one of the largest buyers in the country. Useful where their route passes close to the farm. Compare the price after transport and rejections, not the figure quoted in a speech.",
  },
];

export const joinSteps = [
  {
    title: "Start with the centre you can reach while the milk is still cool",
    body: "A famous society an hour away is a worse buyer than a plain one you can reach before the sun is on the cans. Distance is a quality decision.",
  },
  {
    title: "Ask who may deliver",
    body: "Some centres take milk from non-members at a lower price, or only while you apply. Ask the difference, and how many shares they expect.",
  },
  {
    title: "Ask how they test, and what a rejected can does",
    body: "Smell, alcohol, and lactometer are the usual three. Ask whether a failed can is returned, and whether one bad day affects the rest of the month.",
  },
  {
    title: "Ask the pay cycle in plain language",
    body: "Weekly, twice a month, or monthly. Ask what a late month has looked like recently — not what the constitution promises.",
  },
  {
    title: "Ask what they stop from the cheque",
    body: "Dairy meal, AI, transport, shares, and loans are often deducted before you see cash. A high price per litre can still leave a thin envelope.",
  },
  {
    title: "Keep your own litres",
    body: "Write the morning and evening totals. On pay day, match them to the statement before you argue, and before you celebrate.",
  },
];

export const opportunities = [
  {
    title: "The livestock officer in your ward",
    body: "County agriculture offices are the first stop for vaccination dates, tick-control advice, and farmer field schools. Ask which day they are actually in the ward, and go with one written question — a sick cow, a ration, or a birth you are planning.",
  },
  {
    title: "Kenya Dairy Board",
    body: "The Board regulates how milk is handled and traded. If you only deliver to a licensed centre, their rules mostly show up as the tests at the stand. If you want to run a cooler, a milk bar, or a transport route, ask what licence and premises they expect before you spend.",
  },
  {
    title: "Training that earns its bus fare",
    body: "Prefer a short session on mastitis, silage for the dry months, calf rearing, or how to read a milk statement. A general “empowerment” meeting with no animal in it can wait. Co-operative training days are often free for members.",
  },
  {
    title: "Records before you ask for inputs on checkoff",
    body: "A society or sacco that advances dairy meal against future milk will ask, in one way or another, whether these cows exist and whether they milk. A card per cow and last month’s litres make that a short conversation instead of a guess.",
  },
];
