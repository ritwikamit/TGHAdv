import { NextRequest, NextResponse } from 'next/server';

// Fallback Procedural Generator for 100% Reliability & Zero-Latency
const EN_LAZY_REVIEWS = [
  'attended wedding here, lawn is huge and food was delicious.',
  'food was to good and lawn decoration was really nice.. 5star experience.',
  'superb place for wedding function, decoration and food was v good.',
  'huge open lawn and clean rooms, had a great time with family.',
  'best wedding resort on gobarsahi sakri road, very polite staff.',
  'poolside haldi was awesome and banquet ac was cooling nicely.',
  'everything was well arranged. stage decoration was beautiful.',
  'went for friends reception, car parking is massive so zero rush.',
  'delicious catering and very cooperative staff.. definetly recommend.',
  'beautiful venue with open lawns and spacious rooms for guest stay.',
  'catering and stage decoration 10/10.. staff was v helpful.',
  'great ambiance and spacious parking, enjoyed the wedding reception.'
];

const EN_CASUAL_OPENERS = [
  'went for a family wedding reception last week.',
  'attended friend marriage ceremony here near bakarpur.',
  'celebrated cousin wedding here on gobarsahi-sakri road.',
  'we had a family function and guest stay here.'
];

const EN_CASUAL_DETAILS = [
  'open lawn is massive with nice lighting and food was fresh and hot.',
  'stage decoration was beautiful and dinner buffet had alot of variety.',
  'banquet hall ac was cooling properly and staff was polite.',
  'car parking was huge so zero rush while arriving.',
  'poolside haldi setup looked magical in daytime photos.',
  'bridal room and guest cottages were very neat and spacious.',
  'food taste was authentic and served piping hot without delay.'
];

const EN_CASUAL_CLOSINGS = [
  'really good experience overall.. definetly 5 stars.',
  'definetly recommend for weddings in muzaffarpur.',
  'all our family members loved the arrangements.',
  'no parking issue bcz huge ground and helpful security.',
  'overall 5star hospitality by the green heritage team..'
];

const HI_HINGLISH_REVIEWS = [
  'khana bohot badiya tha aur lawn kafi bada h.. parking me koi problem ni hui.',
  'cousin ki shaadi me gaye the, stage decor aur buffet dono mast tha.',
  'muzaffarpur ka sabse best wedding resort.. lawn aur poolside haldi kafi sundar h.',
  'bohot pyara resort h, rooms saf suthre the aur staff kafi cooperative tha.',
  'food taste bohot authentic tha, paneer tikka aur sweets 1 no.. definetly recommend.',
  'shandar arrangement.. open lawn me 1500+ log aram se adjust ho gaye.',
  'decoration aur lighting bohot khoobsurat thi, ac hall bhi chilled tha.. 5 star service.'
];

const DETAILED_EXPERIENCES = [
  'We hosted our family wedding at The Green Heritage Resort and Banquet in Bakarpur. The entire lawn decoration, varmala stage setup, and lighting were executed wonderfully. Catering was the highlight — chaat counter, paneer starters, and hot gulab jamuns received compliments from all our guests. Parking was well-managed by the valet staff. Highly recommend for any grand celebration in Muzaffarpur!',
  'Attended my best friend’s wedding here. The poolside haldi setup in the morning was vibrant and aesthetic for photos, and the evening reception at the crystal banquet hall was super comfortable with powerful AC cooling. Generous parking ground so no traffic jam while entering from Gobarsahi–Sakri road. Very courteous resort management.',
  'One of the finest banquet venues in Muzaffarpur. The 25+ air-conditioned rooms made it so convenient for outstation relatives to get ready and rest comfortably. Food was served piping hot throughout the dinner, and the lawn space easily accommodated more than a thousand guests without feeling crowded. Beautiful royal entrance and architecture.'
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateProceduralReview(topic?: string, lang: 'en' | 'hi' = 'en'): string {
  if (lang === 'hi') {
    return getRandom(HI_HINGLISH_REVIEWS);
  }

  // Pick random style
  const roll = Math.random();
  if (roll < 0.35) {
    // Lazy 1-liner
    return getRandom(EN_LAZY_REVIEWS);
  } else if (roll < 0.70) {
    // Casual 2-part note
    return `${getRandom(EN_CASUAL_OPENERS)} ${getRandom(EN_CASUAL_DETAILS)} ${getRandom(EN_CASUAL_CLOSINGS)}`;
  } else {
    // Detailed experience
    return getRandom(DETAILED_EXPERIENCES);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      topic = 'general',
      lang = 'en',
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
      // Graceful procedural fallback if API key is not configured locally
      const fallbackText = generateProceduralReview(topic, lang as 'en' | 'hi');
      return NextResponse.json({
        review: fallbackText,
        source: 'procedural-fallback',
        success: true,
      });
    }

    const systemPrompt = `You are an authentic, everyday guest writing a quick Google Maps review for The Green Heritage Resort and Banquet, Muzaffarpur (located at Bakarpur, Gobarsahi–Sakri Road, Muzaffarpur, Bihar).

CORE PHILOSOPHY & CASUAL MOBILE PHONE WRITING:
You must sound like a real human typing on a smartphone keyboard, NOT an AI or a PR marketing team. Google algorithms immediately flag textbook essays.

CRITICAL RULES:
1. UNPREDICTABLE LENGTH & STYLE (ABSOLUTELY NO FIXED TEMPLATE):
   - RANDOM STYLE 1 (LAZY / SHORT 1-LINER ~35% of the time): Just one casual punchy sentence. Focus on only 1 or 2 things (e.g. food taste, lawn size, parking, or general vibe).
     Examples:
     * "khana bohot badiya tha aur lawn kafi bada h.. parking me koi problem ni hui"
     * "food was really good and decoration was nice. best lawn in muzaffarpur."
     * "attended friend's wedding here. great ambiance, spacious parking and polite staff."
     * "everything was well arranged. poolside haldi was awesome."
     * "huge open lawn and clean rooms, had a great time."
     * "catering and stage decoration 10/10.. staff was v helpful."
   - RANDOM STYLE 2 (CASUAL 2-LINER ~35% of the time): 2 natural thoughts, separated by a dot-dot (..) or comma.
     Examples:
     * "went for a family wedding reception last week. open lawn is massive with nice lighting and food was fresh and hot."
     * "stage decoration was beautiful and dinner buffet had alot of variety.. banquet hall ac was cooling properly."
     * "really loved the open lawn and poolside area. car parking was huge so zero rush while arriving."
   - RANDOM STYLE 3 (DETAILED 3-4 LINER ~30% of the time): A thoughtful guest or family member sharing details. Mention specific real venue highlights:
     * 2,000+ capacity open marriage lawn with Jaipur royal look
     * Poolside haldi & mehendi setup with vibrant daylight atmosphere
     * Centrally air-conditioned crystal banquet hall
     * Delicious catering (paneer tikka, dal makhani, hot sweets, live chaat counter)
     * 25+ air-conditioned family stay rooms & bridal dressing cottage
     * Secured parking for 150+ cars and valet assistance
     * Courteous banquet staff and event coordination
2. CASING & PUNCTUATION:
   - Write mostly or completely in lowercase or informal case.
   - Natural punctuation: use '..' or commas or simple periods.
   - Natural human slips / texting shorthand: 'v good', 'to good', 'definetly', 'alot', 'bcz', 'staaf', 'osm', '5star', 'bohot badiya', 'h'.
3. LANGUAGE & SCRIPT:
   - Strictly Latin/English script ONLY.
   - NEVER output Devanagari Hindi characters.
   - If Hindi/Hinglish is requested (${lang === 'hi' ? 'YES, PLEASE WRITE IN CASUAL HINGLISH' : 'write in casual English unless Hinglish fits'}), write in conversational Hinglish with small English letters (e.g. "khana bohot badiya tha aur lawn kafi bada h.. parking me koi dikkat ni hui.. best resort in muzaffarpur").
4. NO AI CLICHÉS:
   - BANNED WORDS: "nestled", "tapestry", "seamless", "testament", "epitome", "breathtaking", "unforgettable extravaganza", "look no further".
5. OUTPUT FORMAT:
   - Output ONLY the review text itself. No introductory pleasantries, no quotation marks, no markdown, no explanations.`;

    const userPrompt =
      action === 'improve' && existingText
        ? `Improve and polish this draft review while keeping it completely human, casual, mostly lowercase, with natural imperfections. Original: "${existingText}"`
        : `Write an authentic ${starRating}-star Google review for The Green Heritage Resort and Banquet. Focus topic (if relevant): ${topic}. Language mode: ${
            lang === 'hi' ? 'Hinglish (Hindi in English letters)' : 'Casual English'
          }. Randomly decide whether to write a short lazy 1-liner, a 2-liner, or a detailed 3-4 sentence review.`;

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
        temperature: 0.95,
        max_tokens: 220,
      }),
    });

    if (!openRouterResponse.ok) {
      console.warn(
        'OpenRouter API returned non-OK status, falling back to procedural generator:',
        openRouterResponse.status
      );
      const fallbackText = generateProceduralReview(topic, lang as 'en' | 'hi');
      return NextResponse.json({
        review: fallbackText,
        source: 'procedural-fallback',
        success: true,
      });
    }

    const data = await openRouterResponse.json();
    const rawContent = data.choices?.[0]?.message?.content?.trim();

    if (!rawContent) {
      const fallbackText = generateProceduralReview(topic, lang as 'en' | 'hi');
      return NextResponse.json({
        review: fallbackText,
        source: 'procedural-fallback',
        success: true,
      });
    }

    // Clean any accidental quotes
    const cleaned = rawContent.replace(/^["']|["']$/g, '').trim();

    return NextResponse.json({
      review: cleaned,
      source: 'openrouter',
      model: data.model || 'openai/gpt-4o-mini',
      success: true,
    });
  } catch (err: unknown) {
    console.error('Error in review generation route:', err);
    // Even in catastrophic network failure, always return an authentic review to user
    const fallbackText = generateProceduralReview();
    return NextResponse.json({
      review: fallbackText,
      source: 'procedural-fallback',
      success: true,
    });
  }
}
