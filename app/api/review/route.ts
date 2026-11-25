import { NextRequest, NextResponse } from 'next/server';

// =========================================================================
// HIGH-ENTROPY PROCEDURAL REVIEW GENERATOR (ZERO-TEMPLATE, ZERO "ATTENDED")
// 100% Lowercase, Human Texting Slang, Diverse Archetypes
// =========================================================================

const HI_FOOD_FIRST = [
  'khana to good tha specially paneer starters aur garam jalebi..',
  'buffet me alot of variety thi aur sab piping hot serve hua..',
  'food taste 1 number tha, live chaat counter aur sweets sabko pasand aayi..',
  'dinner spread bohot mast tha, snacks se lekar desserts tak 10/10..',
  'catering bht badiya thi, paneer tikka aur dal makhani ekdam lajawab..',
  'food was delicious aur buffet arrangement me koi rush ni tha..',
  'catering aur snacks counter 1 number tha, sabhi guests tareef kar rahe the..'
];

const HI_VENUE_FIRST = [
  'open lawn kafi bada h aur stage decor bohot sundar tha..',
  'lawn space is huge 1500+ log aram se attend kar sakte h without any rush..',
  'resort ka entrance royal jaipur look jaisa h, kafi photogenic h..',
  'ac banquet hall chilled tha aur chandeliers lighting osm lag rahi thi..',
  'stage decoration to good aur ambient lighting night me bht pyari thi..',
  'open lawn ka vibe bohot shandar h, varmala stage setup royal tha..',
  'varmala stage aur lawn lighting night me ekdam magical lag raha tha..'
];

const HI_POOLSIDE_FIRST = [
  'poolside haldi setup dekh ke maza aa gaya, photos bht mast aayi..',
  'pool side view aur lighting badiya lagti h night me..',
  'daytime poolside haldi function ke liye ye jagah muzaffarpur me best h..',
  'poolside area ka decoration bht aesthetic tha, family photos super cute aayi..',
  'poolside haldi was osm aur open lawn kafi spacious h..'
];

const HI_PARKING_FIRST = [
  'parking area bht bada h to gaadi lagane me koi issue ni hua..',
  'valet parking staaf helpful tha.. car parking ground kafi spacious h..',
  'gobarsahi sakri road pe itna bada parking space milna bohot convenient h..',
  'parking ki koi tension ni bcz ground bohot bada h aur security alert thi..',
  'parking space is massive to zero rush while arriving..'
];

const HI_ROOMS_FIRST = [
  'cottages and rooms saf suthre the.. ladies ko ready hone me koi dikkat ni hui..',
  'ac rooms kafi comfortable and spacious the, outstation relatives aram se ruke..',
  'bridal suite aur family rooms bilkul clean aur well maintained the..',
  'guest stay rooms chilled the aur hygiene 10/10 thi..'
];

const HI_DIRECT_VERDICTS = [
  'muzaffarpur ka sabse sundar wedding venue..',
  'best wedding lawn in muzaffarpur, khana aur staaf dono 10/10..',
  'shandar resort h, decoration aur food taste bohot mast tha..',
  'superb catering and quick valet parking.. definetly 5 stars from our side..',
  'bhai ki shadi k liye best choice tha, zero complaints..',
  'kal raat reception party me the yaha, maza aa gaya sabko..',
  'family celebration ke liye ek no venue h..',
  'sab arrangement time pe tha aur ac hall me cooling bht achi thi..',
  'royal feeling aati h idhar enter karte hi.. 5star experience..'
];

const HI_FOLLOW_UPS = [
  'lawn kafi spacious h aur lighting night me shandar lagti h.',
  'khana fresh aur garam tha sabhi relatives khush the.',
  'parking me koi jhanjhat ni hua aur staff bhi helpful tha.',
  'photos lene ke liye bohot saare aesthetic spots h yaha.',
  'banquet hall ac was cooling properly throughout dinner.',
  'rooms saf the aur ladies ko ready hone me bohot aram raha.',
  'service fast thi aur catering team ne sab time pe serve kiya.',
  'ambience bohot peaceful aur photogenic h.'
];

const HI_CLOSERS = [
  'definetly recommend for muzaffarpur weddings.',
  '5star service overall.. badiya experience.',
  'muzaffarpur me best option h for grand wedding celebration.',
  'sab kuch smoothly ho gya.. fully satisfied with green heritage team.',
  'definetly 5 stars from our whole family..',
  'overall bohot acha experience raha.. 10/10.',
  'best resort on gobarsahi road.. recommend karunga sabko.',
  'memorable evening for all of us..'
];

const EN_FOOD_FIRST = [
  'food taste was authentic and served piping hot without delay..',
  'catering was to good specially paneer tikka and hot sweets..',
  'dinner spread had alot of tasty options, all guests appreciated it..',
  'chaat counter and main course was delicious throughout the event..',
  'live food counters and desserts were outstanding..',
  'catering quality was 10/10, hot snacks and quick service..'
];

const EN_VENUE_FIRST = [
  'open lawn is massive with nice lighting and royal jaipur look..',
  'stage decoration was beautiful and crystal banquet hall was super chilled..',
  'the open marriage lawn can easily accommodate 1500+ guests without rush..',
  'night ambiance with lawn lighting looked royal and grand..',
  'crystal banquet hall has powerful ac cooling and beautiful chandeliers..',
  'lawn space is enormous and varmala stage setup was grand..'
];

const EN_POOLSIDE_FIRST = [
  'poolside haldi setup looked magical in daytime photos..',
  'poolside area is vibrant and photogenic for morning ceremonies..',
  'loved the poolside decoration and aesthetic daylight vibes..',
  'poolside haldi was osm and daytime photo spots are really pretty..'
];

const EN_PARKING_FIRST = [
  'car parking ground is massive so zero traffic rush while arriving..',
  'valet parking and security management made entry completely hassle-free..',
  'huge dedicated parking space on gobarsahi-sakri road is a big plus..',
  'hassle free parking and very courteous security team..'
];

const EN_ROOMS_FIRST = [
  'bridal room and guest cottages were very neat and spacious..',
  'ac rooms made it comfortable for outstation relatives to rest and dress up..',
  'cottages are well maintained and washrooms were spotless..',
  'family stay rooms were clean with powerful air conditioning..'
];

const EN_DIRECT_VERDICTS = [
  'best wedding resort on gobarsahi sakri road, very polite staaf..',
  'superb place for wedding function, decoration and food was v good..',
  'one of the finest banquet venues in muzaffarpur..',
  'everything was well arranged from welcome entry to dinner buffet..',
  'hosted family reception here and everything went smoothly..',
  'celebrated wedding here and all guests were full of praise..',
  'royal ambience and top tier hospitality in muzaffarpur..'
];

const EN_FOLLOW_UPS = [
  'lawn was spacious and decor was executed with great attention to detail.',
  'dinner buffet had great variety and prompt refill service.',
  'valet staff was polite and guided everyone smoothly.',
  'ample photo spots for both daylight and evening ceremonies.',
  'banquet cooling was great despite the summer heat.',
  'management ensured everything started on schedule.'
];

const EN_CLOSERS = [
  'really good experience overall.. definetly 5 stars.',
  'definetly recommend for weddings in muzaffarpur.',
  'all our family members loved the arrangements.',
  'overall 5star hospitality by the green heritage team..',
  'zero complaints, wonderful experience for our family.',
  'worth every rupee for a grand celebration.'
];

const DYNAMIC_PERSPECTIVES = [
  'Perspective: Food lover who was blown away by paneer starters, live chaat, and dinner buffet. Do not start with attended.',
  'Perspective: Guest impressed by massive open lawn, royal jaipur architecture, and stage lighting. Do not start with attended.',
  'Perspective: Haldi/mehendi guest raving about the poolside morning vibe and Instagram photos. Do not start with attended.',
  'Perspective: Guest who arrived by car and loved the huge stress-free parking and valet staff. Do not start with attended.',
  'Perspective: Relative who stayed overnight in the clean cottages with cold AC cooling. Do not start with attended.',
  'Perspective: Lazy young guest writing a punchy 1-sentence compliment with casual slang. Do not start with attended.',
  'Perspective: Family host thanking the polite management for smooth event execution. Do not start with attended.',
  'Perspective: Spontaneous direct praise stating why this is the #1 venue in Muzaffarpur. Do not start with attended.'
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateProceduralReview(topic?: string, lang: 'en' | 'hi' = 'hi'): string {
  const isHi = lang === 'hi';
  const foodFirst = isHi ? HI_FOOD_FIRST : EN_FOOD_FIRST;
  const venueFirst = isHi ? HI_VENUE_FIRST : EN_VENUE_FIRST;
  const poolsideFirst = isHi ? HI_POOLSIDE_FIRST : EN_POOLSIDE_FIRST;
  const parkingFirst = isHi ? HI_PARKING_FIRST : EN_PARKING_FIRST;
  const roomsFirst = isHi ? HI_ROOMS_FIRST : EN_ROOMS_FIRST;
  const directVerdicts = isHi ? HI_DIRECT_VERDICTS : EN_DIRECT_VERDICTS;
  const followUps = isHi ? HI_FOLLOW_UPS : EN_FOLLOW_UPS;
  const closers = isHi ? HI_CLOSERS : EN_CLOSERS;

  // Multi-archetype structural selector
  let mold = Math.floor(Math.random() * 7);

  if (topic === 'food' || topic === 'catering and food taste') mold = 1;
  else if (topic === 'haldi' || topic === 'poolside haldi and photography') mold = 3;
  else if (topic === 'stay' || topic === 'family stay and cottages') mold = 5;
  else if (topic === 'wedding' || topic === 'wedding and open lawn reception') mold = 2;
  else if (topic === 'quick') mold = Math.random() < 0.5 ? 0 : 6;

  switch (mold) {
    case 0:
      return `${getRandom(directVerdicts)} ${getRandom(followUps)} ${getRandom(closers)}`.toLowerCase().trim();
    case 1:
      return `${getRandom(foodFirst)} ${Math.random() < 0.5 ? getRandom(venueFirst) : getRandom(parkingFirst)} ${getRandom(closers)}`.toLowerCase().trim();
    case 2:
      return `${getRandom(venueFirst)} ${getRandom(foodFirst)} ${getRandom(closers)}`.toLowerCase().trim();
    case 3:
      return `${getRandom(poolsideFirst)} ${getRandom(followUps)} ${getRandom(closers)}`.toLowerCase().trim();
    case 4:
      return `${getRandom(parkingFirst)} ${getRandom(foodFirst)} ${getRandom(closers)}`.toLowerCase().trim();
    case 5:
      return `${getRandom(roomsFirst)} ${getRandom(venueFirst)} ${getRandom(closers)}`.toLowerCase().trim();
    case 6:
    default:
      return `${getRandom(directVerdicts)} ${getRandom(followUps)}`.toLowerCase().trim();
  }
}

function localPolish(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/([.,!?])(?=[a-zA-Z])/g, '$1 ');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      topic = 'general',
      lang = 'hi',
      starRating = 5,
      existingText = '',
      action = 'generate',
    } = body;

    // Check OpenRouter API Key (Supports ReviewBotTGH configured by user in Vercel)
    const apiKey =
      process.env.ReviewBotTGH ||
      process.env.OPENROUTER_API_KEY ||
      process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    if (!apiKey) {
      if (action === 'improve' && existingText) {
        return NextResponse.json({
          review: localPolish(existingText),
          source: 'local-polish',
          success: true,
        });
      }
      const fallbackText = generateProceduralReview(topic, lang as 'en' | 'hi');
      return NextResponse.json({
        review: fallbackText,
        source: 'procedural-fallback',
        success: true,
      });
    }

    const systemPrompt = `You are an authentic, everyday guest writing a quick Google Maps review for The Green Heritage Resort and Banquet, Muzaffarpur (Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur, Bihar).

CRITICAL ANTI-PATTERN RULE (STRICTLY ENFORCED):
- NEVER start the review with "attended", "i attended", "went to", or formulaic "attended my [friend/cousin/relative]'s wedding". This is an artificial AI cliché and is strictly prohibited.
- Real people start with diverse hooks: the food, the lawn, the poolside, the parking, the royal feel, a direct exclamation, or host context.

STARTING DIVERSITY EXAMPLES:
- Start with food: "khana bohot badiya tha...", "paneer tikka aur live chaat counter mast the...", "food taste was authentic..."
- Start with lawn/decor: "lawn is massive...", "open lawn ka vibe night me bohot royal lagta h...", "stage setup to good tha..."
- Start with poolside/haldi: "poolside haldi setup dekh ke maza aa gaya...", "poolside haldi was osm and daytime photos..."
- Start with rooms/stay: "cottages aur ac rooms kafi clean the...", "bridal dressing suite was very neat..."
- Start with parking/staff: "parking area itna bada h ki car lagane me zero rush...", "valet staaf was polite..."
- Start with direct punch: "muzaffarpur ka sabse sundar banquet...", "shandar resort h...", "best wedding lawn in muzaffarpur..."
- Start with host context: "bhai ki shadi k liye ye resort book kiya tha...", "kal raat reception party me the yaha..."

RANDOMIZE LENGTH & STYLE UNPREDICTABLY:
- Style 1 (Short punchy ~8-15 words): Just one punchy casual sentence.
- Style 2 (Casual 2-liner ~15-28 words): 2 natural thoughts connected with '..', comma, or 'aur'.
- Style 3 (Detailed 3-liner ~30-45 words): 3 natural sentences covering specific real venue highlights (2000+ lawn capacity, crystal banquet hall, poolside haldi, 25+ cottages, valet parking).

CASING & TONE:
- Write strictly in lowercase (all small letters).
- Natural texting shorthand: 'v good', 'to good', 'definetly', 'osm', 'staaf', 'bcz', '5star', 'bht badiya', 'h'.
- Strictly Latin/English script ONLY. Never output Devanagari Hindi characters.
- If Hinglish is requested (${lang === 'hi' ? 'YES, WRITE IN CASUAL HINGLISH' : 'write in casual English'}), write in conversational Hinglish with English letters.
- Output ONLY the review text itself. No quotation marks, no introductions, no markdown.`;

    const randomPerspective = getRandom(DYNAMIC_PERSPECTIVES);
    const userPrompt =
      action === 'improve' && existingText
        ? `Improve and polish this draft review while keeping it completely human, casual, strictly all small letters (lowercase), with natural imperfections. Original: "${existingText}"`
        : `Write an authentic ${starRating}-star Google review for The Green Heritage Resort and Banquet.
Focus topic: ${topic}.
Language: ${lang === 'hi' ? 'Hinglish (Hindi in English letters)' : 'Casual English'}.
${randomPerspective}
Randomly pick length: sometimes 1 short punchy sentence, sometimes 2 sentences, sometimes 3 sentences. STRICTLY DO NOT START WITH "ATTENDED". Strictly write in all lowercase letters.`;

    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://thegreenheritageresort.in',
        'X-Title': 'The Green Heritage Resort Review Bot',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 1.05,
        presence_penalty: 0.65,
        frequency_penalty: 0.3,
        max_tokens: 220,
      }),
    });

    if (!openRouterResponse.ok) {
      console.warn(
        'OpenRouter API returned non-OK status, falling back:',
        openRouterResponse.status
      );
      const fallbackText =
        action === 'improve' && existingText
          ? localPolish(existingText)
          : generateProceduralReview(topic, lang as 'en' | 'hi');
      return NextResponse.json({
        review: fallbackText,
        source: action === 'improve' ? 'local-polish' : 'procedural-fallback',
        success: true,
      });
    }

    const data = await openRouterResponse.json();
    const rawContent = data.choices?.[0]?.message?.content?.trim();

    if (!rawContent) {
      const fallbackText =
        action === 'improve' && existingText
          ? localPolish(existingText)
          : generateProceduralReview(topic, lang as 'en' | 'hi');
      return NextResponse.json({
        review: fallbackText,
        source: action === 'improve' ? 'local-polish' : 'procedural-fallback',
        success: true,
      });
    }

    // Clean quotes & enforce all small letters
    let cleaned = rawContent.replace(/^["']|["']$/g, '').trim().toLowerCase();

    // Safety guard: ensure no review starts with formulaic "attended"
    if (/^(i\s+)?attended\b/i.test(cleaned)) {
      const stripped = cleaned.replace(/^(i\s+)?attended\s+(a\s+|an\s+|the\s+|my\s+)?(friend['’]?s?|cousin['’]?s?|relative['’]?s?|brother['’]?s?|sister['’]?s?|family)?\s*(wedding|marriage|reception|function|ceremony|here|party)?[\s,.:;–-]*/i, '').trim();
      cleaned = stripped.length > 20 ? stripped : generateProceduralReview(topic, lang as 'en' | 'hi');
    }

    return NextResponse.json({
      review: cleaned,
      source: 'openrouter',
      model: data.model || 'openai/gpt-4o-mini',
      success: true,
    });
  } catch (err: unknown) {
    console.error('Error in review generation route:', err);
    const fallbackText = generateProceduralReview();
    return NextResponse.json({
      review: fallbackText,
      source: 'procedural-fallback',
      success: true,
    });
  }
}
