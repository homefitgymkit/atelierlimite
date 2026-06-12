/* ============================================================
   Atelier Limité, site content
   Curated from the brand's journal source (assets/source/journal).
   Exposed on window for all screen scripts.
   ============================================================ */

/* FAQ, grouped, lightly trimmed from the source answers */
const AL_FAQ = [
  {
    group: "The brand",
    items: [
      { q: "What exactly is Atelier Limité?", a: "A Sydney-based capsule apparel brand that collaborates with emerging artists to produce limited-edition, numbered garments. Each edition features original artwork printed on GOTS-certified organic cotton in three colourways, studio black, atelier white, and raw canvas. Every piece carries the artist's name, a unique edition number, and a certificate of edition. Our founding principle is a 50/50 net profit split with every artist, who keeps full IP. The tagline: wear the artwork." },
      { q: "Is it a gallery or a clothing brand?", a: "Neither entirely. We operate with the economics and ethics of an artist platform, 50/50 split, IP retention, provenance, numbered editions, and the product and distribution infrastructure of an apparel brand. We describe ourselves as a wearable gallery: above fast fashion and hype streetwear, below traditional gallery pricing." },
      { q: "Is Atelier Limité sustainable?", a: "Sustainability is a core design principle. GOTS-certified organic cotton blanks, water-based or discharge inks, never plastisol. Packaging is entirely plastic-free. One tree is planted for every piece sold, from edition one. Domestic shipping is carbon-neutral via Sendle. B Corp certification is targeted for year three. The limited-edition model itself eliminates overproduction, fashion's primary source of waste." },
    ],
  },
  {
    group: "Editions & numbering",
    items: [
      { q: "What does my edition number mean?", a: "Your number is the identity of your piece within the edition. 047/080 means the forty-seventh piece in an edition of exactly eighty. It appears on your neck label strip and your certificate. Numbers are assigned sequentially at the point of order, a low number means you acquired early. No two pieces share a number." },
      { q: "Are editions ever restocked?", a: "Never. Once an edition closes, it is closed permanently, never reprinted, restocked, or made available through any other channel. Restocking would invalidate every certificate already issued: the collector who holds 047/080 would no longer hold piece 47 of exactly 80. The limitation is not a sales mechanic, it is the structural requirement of the model." },
      { q: "Is a lower number more valuable?", a: "Every piece in an edition is equally rare, all eighty pieces in an eighty-piece edition are one of exactly eighty. Lower numbers are not scarcer, but they carry their own quiet significance as a record of early acquisition. In fine-art printmaking there is no universal rule that lower numbers command higher value, the number records position, not quality." },
      { q: "How often are new editions released?", a: "Four editions per year, one per quarter. Each is announced first to private view list members, who receive 48-hour early access before the public opening." },
      { q: "Can I acquire a piece from a past edition?", a: "Closed editions are no longer sold directly once they close, but unsold pieces remain in the archive at full price, never discounted. Collectors may also resell pieces privately; the numbered certificate and label strip serve as the provenance record for any secondary transaction." },
    ],
  },
  {
    group: "The certificate",
    items: [
      { q: "Does the certificate travel with the piece if I sell it?", a: "Yes, and it should. The certificate is bound to the piece, not the original collector. A new collector receives the same provenance record as the first: the edition number, the artist attribution, and the Atelier Limité authentication. Its value is the same for the fifth owner as it was for the first." },
    ],
  },
  {
    group: "Private view list",
    items: [
      { q: "What is the private view list?", a: "Members get 48-hour early access to every edition before its public opening, written in gallery invitation tone. You'll also hear when a new edition opens and the occasional studio note. The name is borrowed from the gallery world, where a private view is an invitation-only preview before a show opens publicly." },
      { q: "Does it guarantee I'll get a piece?", a: "No, it guarantees 48-hour early access, not that pieces will remain when you open the email. Editions are sized to sell through, and members who act early generally secure lower numbers. It is the best available mechanism for being first, but it is an invitation to view the edition early, not a reservation." },
      { q: "How often will you email me?", a: "The heart of the list is the edition opening: every member gets 48-hour early access before the public. Alongside that you may hear from us with studio notes and the occasional offer. Every email is written in the same considered, gallery register." },
    ],
  },
  {
    group: "For artists",
    items: [
      { q: "How does the 50/50 split work?", a: "Net profit is calculated after deducting direct costs only: blank garments, printing, packaging, fulfilment, and platform fees. Artists receive 50% of that figure, paid quarterly with a transparent statement showing every sale and every cost. No management fees, no overhead allocations, no marketing deductions. You retain full IP, we licence the artwork for the specific edition only." },
      { q: "Do I need a large following to collaborate?", a: "No minimum following is required. Our marketing infrastructure, the private view list, social channels, press relationships, and collector community, is the primary commercial engine for each edition. An artist with 300 followers and a compelling practice is considered equally with one who has 30,000. The metric is not the criterion. The work is." },
      { q: "Can I negotiate the split?", a: "No. The 50/50 split is non-negotiable and identical for every artist, regardless of profile or following. No tiers, no introductory rates, no adjustments for larger editions. The non-negotiable nature is deliberate, it means every artist is treated identically, and the commitment cannot be quietly eroded edition by edition." },
    ],
  },
];

/* About / brand story (from what-is + what-makes-different) */
const AL_ABOUT = {
  lead: "Extraordinary artists exist everywhere. Most never reach the audience their work deserves. Atelier Limité exists to close that gap, pairing one artist's work with premium organic cotton, in numbered editions that pay the artist half of everything.",
  principles: [
    { n: "01", t: "Artist-led, structurally", b: "The artist's name leads on every surface; our wordmark is subordinate to it. Not a logo on a blank, a body of work, credited and worn." },
    { n: "02", t: "Fifty / fifty, always", b: "50% of net profit to every artist, every quarter, with a transparent statement. Non-negotiable, identical for everyone. The artist keeps full IP." },
    { n: "03", t: "Genuinely limited", b: "Fixed runs, sequential numbers, a certificate of edition, and a closure that is permanent. No restocks, no urgency mechanics, no manufactured scarcity." },
    { n: "04", t: "Ethical by design", b: "Organic cotton, water-based inks, plastic-free packaging, a tree per piece, carbon-neutral shipping. The ethics are structural, not rhetorical." },
  ],
  vocab: [
    ["Edition closed", "not \u201Csold out\u201D: editions close permanently"],
    ["Acquire / collect", "not \u201Cbuy\u201D: what you hold is numbered and permanent"],
    ["Private view", "not \u201Cnewsletter\u201D: four invitations a year, nothing else"],
    ["Opening", "not \u201Cdrop\u201D: a release is an event, like a show"],
  ],
};

/* Work-with-us (from 5050 + artist-selection) */
const AL_WORK = {
  lead: "We split everything, fifty-fifty. You keep your IP. We handle production, fulfilment, and the gallery. Your work reaches a wider audience, and you're paid every quarter.",
  criteria: [
    { t: "Merit", b: "A compelling artistic practice and work with strong visual conviction. Not a follower count, the work itself." },
    { t: "Translation", b: "Work that can carry meaningfully onto a wearable surface. Any discipline: paint, sculpture, photography, print, music, more." },
    { t: "Story", b: "A practice with a point of view. We are explicitly looking in places the traditional gallery system has not." },
    { t: "Values", b: "Artists who want a fair, transparent, lasting relationship, not a one-off flat-fee licence." },
  ],
  steps: [
    { n: "01", t: "You reach out", b: "Email artists@atelierlimite.com with your practice and a sample of work. Every submission gets a genuine response within two weeks." },
    { n: "02", t: "We talk", b: "If there's a fit, we discuss the edition: the work, the theme, the timeline. Nothing is committed until you're ready." },
    { n: "03", t: "You deliver artwork", b: "Print-ready files, eight weeks before the opening. You approve the final garment sample before anything is produced." },
    { n: "04", t: "The edition opens", b: "We manufacture, market, fulfil, and administer. You promote to your audience if you like. Then you're paid 50%, quarterly." },
  ],
  promises: [
    "No upfront cost, no financial risk if an edition underperforms.",
    "Full IP retained, the licence covers one edition only.",
    "A transparent quarterly statement showing every sale and cost.",
    "No minimum following, no gallery history, no geographic limit.",
  ],
};

Object.assign(window, { AL_FAQ, AL_ABOUT, AL_WORK });
