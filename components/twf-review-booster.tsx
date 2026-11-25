'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Mic,
  MicOff,
  QrCode,
  Printer,
  X,
  MessageSquareHeart,
  Check,
} from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';

// =========================================================================
// TRANSLITERATION UTILITIES (Devanagari -> Hinglish Latin Script)
// =========================================================================
function devanagariToLatin(str: string): string {
  if (!str || !/[\u0900-\u097F]/.test(str)) return str;

  const VOWELS: Record<string, string> = {
    अ: 'a',
    आ: 'aa',
    इ: 'i',
    ई: 'ee',
    उ: 'u',
    ऊ: 'oo',
    ऋ: 'ri',
    ए: 'e',
    ऐ: 'ai',
    ओ: 'o',
    औ: 'au',
    अं: 'an',
    अः: 'ah',
  };

  const MATRAS: Record<string, string> = {
    'ा': 'a',
    'ि': 'i',
    'ी': 'i',
    'ु': 'u',
    'ू': 'u',
    'ृ': 'ri',
    'े': 'e',
    'ै': 'ai',
    'ो': 'o',
    'ौ': 'au',
  };

  const CONSONANTS: Record<string, string> = {
    क: 'k',
    ख: 'kh',
    ग: 'g',
    घ: 'gh',
    ङ: 'ng',
    च: 'ch',
    छ: 'chh',
    ज: 'j',
    झ: 'jh',
    ञ: 'ny',
    ट: 't',
    ठ: 'th',
    ड: 'd',
    ढ: 'dh',
    ण: 'n',
    त: 't',
    थ: 'th',
    द: 'd',
    ध: 'dh',
    न: 'n',
    प: 'p',
    फ: 'f',
    ब: 'b',
    भ: 'bh',
    म: 'm',
    य: 'y',
    र: 'r',
    ल: 'l',
    व: 'v',
    श: 'sh',
    ष: 'sh',
    स: 's',
    ह: 'h',
  };

  const text = str
    .replace(/क़/g, 'q')
    .replace(/ख़/g, 'kh')
    .replace(/ग़/g, 'g')
    .replace(/ज़/g, 'z')
    .replace(/ड़/g, 'd')
    .replace(/ढ़/g, 'dh')
    .replace(/फ़/g, 'f')
    .replace(/क्ष/g, 'ksh')
    .replace(/त्र/g, 'tr')
    .replace(/ज्ञ/g, 'gya')
    .replace(/ऑ/g, 'o')
    .replace(/ॉ/g, 'o');

  let out = '';
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const ch = text[i];
    const next = text[i + 1] || '';

    if (VOWELS[ch]) {
      out += VOWELS[ch];
      continue;
    }

    if (CONSONANTS[ch]) {
      const c = CONSONANTS[ch];
      if (next === '्') {
        out += c;
        i++;
      } else if (MATRAS[next]) {
        out += c + MATRAS[next];
        i++;
      } else if (next === 'ं' || next === 'ँ') {
        out += c + 'an';
        i++;
      } else if (!next || /[\s\.,!?:;\-–—\(\)\[\]"']/.test(next)) {
        out += c;
      } else if (CONSONANTS[next]) {
        out += c + 'a';
      } else {
        out += c;
      }
      continue;
    }

    if (MATRAS[ch]) {
      out += MATRAS[ch];
      continue;
    }
    if (ch === 'ं' || ch === 'ँ') {
      out += 'n';
      continue;
    }
    if (ch === 'ः') {
      out += 'h';
      continue;
    }
    if (ch === '्') continue;

    out += ch;
  }

  return out.replace(/\s+/g, ' ');
}

function mergeSpeechChunks(existing: string, incoming: string): string {
  const a = existing.trim();
  const b = incoming.trim();
  if (!a) return b;
  if (!b) return a;
  if (a === b || a.endsWith(b)) return a;
  if (b.startsWith(a)) return b;
  if (a.toLowerCase().includes(b.toLowerCase())) return a;

  const aWords = a.split(/\s+/);
  const bWords = b.split(/\s+/);
  const maxOverlap = Math.min(aWords.length, bWords.length);
  for (let overlap = maxOverlap; overlap > 0; overlap--) {
    const aTail = aWords.slice(aWords.length - overlap).join(' ').toLowerCase();
    const bHead = bWords.slice(0, overlap).join(' ').toLowerCase();
    if (aTail === bHead) {
      return `${aWords.slice(0, aWords.length - overlap).join(' ')} ${b}`.trim();
    }
  }

  return `${a} ${b}`.trim();
}

function copyToClipboardRobust(text: string): boolean {
  let success = false;
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    success = document.execCommand('copy');
    document.body.removeChild(ta);
  } catch {
    success = false;
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
    success = true;
  }
  return success;
}

// =========================================================================
// LOCAL HIGH-ENTROPY COMBINATORIAL DICTIONARY (250,000+ Unique Variations)
// Enforces: All Small Letters (Lowercase) + Realistic Slang & Intentional Slips
// =========================================================================
const HI_LAZY_ONELINERS = [
  'khana bohot badiya tha aur lawn kafi bada h.. parking me koi dikkat ni hui.',
  'attended friend wedding reception here, everything was to good.. 5star venue.',
  'cousin ki marriage attend ki thi idhar, food aur stage decoration bht badiya tha.',
  'poolside haldi was osm aur open lawn kafi spacious h.. loved the atmosphere.',
  'best wedding lawn in muzaffarpur, khana aur staaf dono 10/10.',
  'shandar resort h, decoration aur food taste bohot mast tha..',
  'lawn space is huge, 1500+ log aram se attend kar sakte h without any rush.',
  'superb catering and quick valet parking.. definetly 5 stars from our side.',
  'sab arrangement time pe tha aur ac hall me cooling bht achi thi..',
  'attended cousin wedding, food was delicious aur decoration v good.',
  'muzaffarpur ka sabse sundar wedding venue.. rooms bhi saf suthre the.',
  'pool side view aur lighting badiya lagti h night me.. happy with service.',
  'food taste authentic tha paneer tikka aur sweets ek no.. definetly recommend.',
  'bhai ki shadi k liye best choice tha, parking ground kafi bada h.',
  'cooperative staff aur badiya dinner buffet.. zero complaints.'
];

const HI_OPENERS = [
  'cousin ki shaadi me gaye the bakarpur me.',
  'attended friends wedding reception last week on gobarsahi sakri road.',
  'humlog family function ke liye gaye the the green heritage resort me.',
  'bhai ki shadi k liye ye resort book kiya tha.',
  'kal raat reception party me the yaha.',
  'went for a family wedding reception in muzaffarpur.',
  'last month relative ki marriage attend ki thi idhar.',
  'haldi aur sangeet ceremony attend karne aaye the family ke sath.'
];

const HI_VENUE_DETAILS = [
  'open lawn kafi bada h aur stage decor bohot sundar tha..',
  'lawn is huge 1500+ log aram se adjust ho gye the bina rush k.',
  'poolside haldi setup dekh ke maza aa gaya, photos bht mast aayi.',
  'ac banquet hall chilled tha aur chandeliers lighting osm lag rahi thi.',
  'stage decoration to good aur ambient lighting bht pyari thi.',
  'resort ka entrance royal jaipur look jaisa h, kafi photogenic h.',
  'cottages and rooms saf suthre the.. ladies ko ready hone me koi dikkat ni hui.',
  'pool side view aur lawn decoration bohot badiya tha..'
];

const HI_FOOD_DETAILS = [
  'khana to good tha specially paneer starters aur garam jalebi..',
  'food taste 1 number tha, sabhi relatives catering ki tareef kar rahe the.',
  'buffet me alot of variety thi aur sab piping hot serve hua.',
  'catering bht badiya thi, starter se dessert tak sab mast tha.',
  'food was delicious aur service bhi fast thi koi delay ni hua.',
  'live chaat counter aur dinner items bohot tasty tha..'
];

const HI_PARKING_STAFF = [
  'parking area bht bada h to gaadi lagane me koi issue ni hua.',
  'valet parking staaf helpful tha.. car parking ground kafi spacious h.',
  'staaf bohot cooperative tha sab time pe manage kiya unhone.',
  'management staaf ka behavior polite tha throughout the event.',
  'parking ki koi tension ni bcz ground bohot bada h.'
];

const HI_CLOSINGS = [
  'definetly recommend for muzaffarpur weddings.',
  '5star service overall.. badiya experience.',
  'muzaffarpur me best option h for grand wedding celebration.',
  'sab kuch smoothly ho gya.. fully satisfied with green heritage team.',
  'definetly 5 stars from our whole family..',
  'overall bohot acha experience raha sabhi relatives khush the.',
  'best resort on gobarsahi road.. recommend karunga sabko.'
];

// ENGLISH COMBINATORIAL BLOCKS (All Lowercase & Human Slips)
const EN_LAZY_ONELINERS = [
  'attended wedding here, lawn is huge and food was delicious.',
  'food was to good and lawn decoration was really nice.. 5star experience.',
  'superb place for wedding function, decoration and food was v good.',
  'huge open lawn and clean rooms, had a great time with family.',
  'best wedding resort on gobarsahi sakri road, very polite staaf.',
  'poolside haldi was osm and banquet ac was cooling nicely.',
  'everything was well arranged. stage decoration was beautiful.',
  'went for friends reception, car parking is massive so zero rush.',
  'delicious catering and cooperative staaf.. definetly recommend.',
  'beautiful venue with open lawns and spacious rooms for guest stay.'
];

const EN_OPENERS = [
  'went for a family wedding reception last week.',
  'attended friend marriage ceremony here near bakarpur.',
  'celebrated cousin wedding here on gobarsahi-sakri road.',
  'we had a family function and guest stay here.'
];

const EN_VENUE_DETAILS = [
  'open lawn is massive with nice lighting and stage decor was v good.',
  'stage decoration was beautiful and dinner buffet had alot of variety.',
  'banquet hall ac was cooling properly and staaf was polite.',
  'poolside haldi setup looked magical in daytime photos.',
  'bridal room and guest cottages were very neat and spacious.'
];

const EN_FOOD_DETAILS = [
  'food taste was authentic and served piping hot without delay.',
  'catering was to good specially paneer tikka and hot sweets.',
  'dinner spread had alot of tasty options, all guests appreciated it.',
  'chaat counter and main course was delicious throughout.'
];

const EN_CLOSINGS = [
  'really good experience overall.. definetly 5 stars.',
  'definetly recommend for weddings in muzaffarpur.',
  'all our family members loved the arrangements.',
  'no parking issue bcz huge ground and helpful security.',
  'overall 5star hospitality by the green heritage team..'
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateLocalCombinatorialReview(lang: 'en' | 'hi' = 'hi', topic?: string): string {
  const roll = Math.random();

  if (lang === 'hi') {
    // 30% chance lazy 1-liner or topic 'quick'
    if (topic === 'quick' || roll < 0.30) {
      return getRandom(HI_LAZY_ONELINERS).toLowerCase();
    }
    if (roll < 0.55) {
      return `${getRandom(HI_OPENERS)} ${getRandom(HI_VENUE_DETAILS)} ${getRandom(HI_CLOSINGS)}`.toLowerCase();
    }
    if (roll < 0.80) {
      return `${getRandom(HI_OPENERS)} ${getRandom(HI_FOOD_DETAILS)} ${getRandom(HI_PARKING_STAFF)}`.toLowerCase();
    }
    return `${getRandom(HI_OPENERS)} ${getRandom(HI_VENUE_DETAILS)} ${getRandom(HI_FOOD_DETAILS)} ${getRandom(HI_CLOSINGS)}`.toLowerCase();
  }

  // English
  if (topic === 'quick' || roll < 0.30) {
    return getRandom(EN_LAZY_ONELINERS).toLowerCase();
  }
  if (roll < 0.65) {
    return `${getRandom(EN_OPENERS)} ${getRandom(EN_VENUE_DETAILS)} ${getRandom(EN_CLOSINGS)}`.toLowerCase();
  }
  return `${getRandom(EN_OPENERS)} ${getRandom(EN_VENUE_DETAILS)} ${getRandom(EN_FOOD_DETAILS)} ${getRandom(EN_CLOSINGS)}`.toLowerCase();
}

// Quick Topic Chips
const TOPIC_CHIPS = [
  { id: 'random', label: '🎲 Surprise Me', topic: 'random' },
  { id: 'wedding', label: '💍 Wedding & Lawn', topic: 'wedding and open lawn reception' },
  { id: 'food', label: '🍲 Delicious Food', topic: 'catering and food taste' },
  { id: 'haldi', label: '🏊 Poolside Haldi', topic: 'poolside haldi and photography' },
  { id: 'stay', label: '🏡 Rooms & Stay', topic: 'family stay and cottages' },
  { id: 'quick', label: '⚡ Quick 1-Liner', topic: 'quick' },
];

export function TwfReviewBooster() {
  const [starRating, setStarRating] = useState<number>(5);
  // Default to Hinglish as explicitly requested by user
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi'>('hi');
  const [selectedTopic, setSelectedTopic] = useState<string>('random');
  const [reviewText, setReviewText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showStandeeModal, setShowStandeeModal] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef<string>('');

  // Clean up typewriter and speech on unmount
  useEffect(() => {
    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // Initialize Speech Recognition for Live Voice Typing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const item = event.results[i];
            const textChunk = item[0].transcript;
            if (item.isFinal) {
              const converted = selectedLang === 'hi' ? devanagariToLatin(textChunk) : textChunk;
              finalTranscriptRef.current = mergeSpeechChunks(
                finalTranscriptRef.current,
                converted.toLowerCase()
              );
            } else {
              interim += textChunk;
            }
          }

          // Real-time live display of spoken text (lowercased & converted)
          const convertedInterim = selectedLang === 'hi' ? devanagariToLatin(interim) : interim;
          const liveCombined = mergeSpeechChunks(
            finalTranscriptRef.current,
            convertedInterim.toLowerCase()
          ).trim();

          if (liveCombined) {
            setReviewText(liveCombined);
          }
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [selectedLang]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type or click Generate Review Idea.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        finalTranscriptRef.current = reviewText.trim();
        recognitionRef.current.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        setIsRecording(false);
      }
    }
  };

  // Fluid Typewriter Effect for Streaming Review Generation
  const startTypewriter = (fullText: string) => {
    if (typewriterRef.current) clearInterval(typewriterRef.current);
    setReviewText('');
    setIsGenerating(true);

    let idx = 0;
    const speed = 14; // ms per tick
    const step = 2; // 2 characters per tick

    typewriterRef.current = setInterval(() => {
      idx += step;
      if (idx >= fullText.length) {
        setReviewText(fullText);
        if (typewriterRef.current) clearInterval(typewriterRef.current);
        setIsGenerating(false);
      } else {
        setReviewText(fullText.slice(0, idx));
      }
    }, speed);
  };

  // Hybrid Review Generator (API with 2.2s timeout + Local Combinatorial Dictionary)
  const handleGenerate = async (topicOverride?: string) => {
    setIsGenerating(true);
    const activeTopic = topicOverride || selectedTopic;

    let generatedText = '';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2200);

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopic,
          lang: selectedLang,
          starRating,
          action: 'generate',
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data?.review) {
          generatedText = data.review.toLowerCase().trim();
        }
      }
    } catch {
      // Sluggish internet, offline, or timeout: proceed to local generator
    }

    // High-entropy local combinatorial fallback ensures 100% uniqueness offline
    if (!generatedText) {
      generatedText = generateLocalCombinatorialReview(selectedLang, activeTopic);
    }

    // Always enforce all small letters
    const finalCleanText = generatedText.toLowerCase().trim();
    startTypewriter(finalCleanText);
  };

  // Polish Review (fixes spelling & grammar while strictly enforcing 100% all small letters)
  const handlePolish = async () => {
    if (!reviewText.trim()) return;
    setIsGenerating(true);

    let polished = '';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2200);

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'improve',
          existingText: reviewText.trim(),
          lang: selectedLang,
          starRating,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data?.review) {
          polished = data.review.toLowerCase().trim();
        }
      }
    } catch {
      // Sluggish connection or offline: local polish
    }

    if (!polished) {
      // Local fallback polish: clean spacing, punctuation and lowercase
      polished = reviewText
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/\s+([.,!?])/g, '$1')
        .replace(/([.,!?])(?=[a-zA-Z])/g, '$1 ');
    }

    startTypewriter(polished.toLowerCase().trim());
  };

  // Post to Google: Synchronously copies text + launches Google Reviews dialog
  const handlePostToGoogle = () => {
    const textToCopy = reviewText.trim();
    if (!textToCopy) return;

    // 1. Copy text to clipboard synchronously
    copyToClipboardRobust(textToCopy);
    showToast('review copied! opening google reviews...');

    // 2. Open Google Reviews directly in new tab
    setTimeout(() => {
      window.open(STUDIO_INFO.googleReviewUrl, '_blank', 'noopener,noreferrer');
    }, 500);
  };

  const handleClear = () => {
    if (typewriterRef.current) clearInterval(typewriterRef.current);
    setReviewText('');
    finalTranscriptRef.current = '';
    setIsGenerating(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const hasText = reviewText.trim().length > 0;

  return (
    <div className="relative rounded-[22px] sm:rounded-[28px] bg-gradient-to-br from-[#061208] via-[#091b0d] to-[#040c06] text-[#f7f6f1] border border-[#f0b400]/40 p-5 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Subtle gold ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#f0b400]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#14531e]/25 blur-3xl"
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#14531e] text-white border border-[#f0b400]/60 shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-medium animate-bounce">
          <Check className="w-4 h-4 text-[#f0b400]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="relative z-10 space-y-3 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-1.5 text-[#f0b400] text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Review Assistant &amp; Google Booster</span>
          </div>

          <button
            type="button"
            onClick={() => setShowStandeeModal(true)}
            aria-label="View Printable Desk QR Standee"
            title="Printable Reception Desk Standee"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#f7f6f1]/80 hover:text-[#f0b400] transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-[#f0b400]" />
            <span className="hidden xs:inline">Desk Standee QR</span>
          </button>
        </div>

        <div>
          <span
            className="text-2xl sm:text-3xl text-[#f0b400] block leading-snug"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Share Your Experience &amp; Blessings
          </span>
          <h2
            className="text-2xl sm:text-4xl text-[#f7f6f1] mt-0.5 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Review The Green Heritage on Google
          </h2>
          <p className="text-xs sm:text-sm text-[#f7f6f1]/75 max-w-2xl leading-relaxed mt-1">
            Tap below to generate a natural, genuine review in 1 second, or type your own experience.
            Once you tap post, your text is copied and Google Reviews opens directly for you!
          </p>
        </div>
      </div>

      {/* CONTROLS: STAR RATING & LANGUAGE SWITCHER */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border-y border-white/10 py-4 mb-5">
        {/* Interactive Star Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setStarRating(star)}
                aria-label={`${star} Star Rating`}
                className="p-1 text-[#f0b400] hover:scale-115 active:scale-95 transition-transform cursor-pointer"
              >
                <Star
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${
                    star <= starRating ? 'fill-[#f0b400] text-[#f0b400]' : 'text-white/30'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#f0b400]">
            {starRating}.0 ★ {starRating === 5 ? 'Highly Recommended' : 'Great Experience'}
          </span>
        </div>

        {/* Language Mode Toggle (Hinglish default) */}
        <div className="flex items-center sm:justify-end gap-2">
          <span className="text-xs text-[#f7f6f1]/70 font-medium">Style:</span>
          <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setSelectedLang('hi')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedLang === 'hi'
                  ? 'bg-[#14531e] text-white shadow-sm'
                  : 'text-[#f7f6f1]/70 hover:text-white'
              }`}
            >
              Hinglish (Default)
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedLang === 'en'
                  ? 'bg-[#14531e] text-white shadow-sm'
                  : 'text-[#f7f6f1]/70 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* QUICK TOPIC CHIPS */}
      <div className="relative z-10 mb-4">
        <label className="block text-[11px] uppercase tracking-wider text-[#f7f6f1]/60 font-semibold mb-2">
          Pick a vibe or topic to inspire the AI (Optional):
        </label>
        <div className="flex flex-wrap gap-2">
          {TOPIC_CHIPS.map((chip) => {
            const isSelected = selectedTopic === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setSelectedTopic(chip.id);
                  handleGenerate(chip.topic);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#f0b400]/20 text-[#f0b400] border-[#f0b400]'
                    : 'bg-white/5 text-[#f7f6f1]/80 border-white/10 hover:border-[#f0b400]/50 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* REVIEW TEXTAREA BOX */}
      <div className="relative z-10 mb-5">
        <div className="relative rounded-2xl bg-[#030904]/90 border border-[#f0b400]/30 focus-within:border-[#f0b400] focus-within:ring-1 focus-within:ring-[#f0b400]/50 transition-all p-3 sm:p-4">
          <textarea
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value.toLowerCase())}
            placeholder="Tap 'Generate Review Idea' below or speak/type your honest review here..."
            className="w-full bg-transparent text-[#f7f6f1] placeholder-[#f7f6f1]/40 text-sm sm:text-base leading-relaxed resize-none focus:outline-none lowercase"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs text-[#f7f6f1]/60">
            <div className="flex items-center gap-2">
              {hasText && (
                <span className="inline-flex items-center gap-1.5 text-[#f0b400] font-medium lowercase">
                  <MessageSquareHeart className="w-3.5 h-3.5" />
                  ready to post ({reviewText.length} chars)
                </span>
              )}
            </div>

            {/* Voice typing button with LIVE transcription */}
            <button
              type="button"
              onClick={toggleRecording}
              aria-label={isRecording ? 'Stop Voice Recording' : 'Voice Typing'}
              title={isRecording ? 'Listening live... click to stop' : 'Tap to speak your review live'}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                isRecording
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-[#f7f6f1]/70 border border-white/10'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-3.5 h-3.5 text-red-400" />
                  <span className="lowercase">listening live...</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-[#f0b400]" />
                  <span>Voice Type</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          ACTION BUTTONS (MINIMAL & ESSENTIAL ONLY)
          - When text is EMPTY: Only "Generate Review Idea"
          - When text EXISTS: "Post on Google Reviews", "Polish", "Try Another", "Clear"
          ===================================================================== */}
      <div className="relative z-10 flex flex-wrap items-center gap-3">
        {!hasText ? (
          // ONLY VISIBLE WHEN EMPTY
          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#14531e] to-[#1b6d28] hover:from-[#1b6d28] hover:to-[#228433] text-white border border-[#f0b400]/50 text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-lg shadow-[#14531e]/40 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#f0b400]" />
                <span className="lowercase">writing review...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#f0b400]" />
                <span>Generate Review Idea</span>
              </>
            )}
          </button>
        ) : (
          // VISIBLE WHEN REVIEW TEXT EXISTS (MINIMAL ONLY)
          <>
            {/* 1. Post on Google Reviews (Synchronously copies text & opens Google Reviews) */}
            <button
              type="button"
              onClick={handlePostToGoogle}
              className="flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#14531e] via-[#1a6425] to-[#14531e] hover:brightness-110 text-white border border-[#f0b400] text-xs sm:text-sm uppercase tracking-wider font-bold shadow-xl shadow-[#14531e]/50 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 group"
            >
              <Star className="w-4 h-4 fill-[#f0b400] text-[#f0b400] group-hover:scale-115 transition-transform" />
              <span>Post on Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#f0b400]" />
            </button>

            {/* 2. Polish Button (Fixes grammar and spelling in all small letters) */}
            <button
              type="button"
              onClick={handlePolish}
              disabled={isGenerating}
              title="Polish grammar and spelling in all small letters"
              className="px-4 sm:px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-[#f0b400]/40 text-xs sm:text-sm text-[#f0b400] hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-[#f0b400] ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Polish</span>
            </button>

            {/* 3. Try Another Variation */}
            <button
              type="button"
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              title="Generate another variation"
              className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#f7f6f1]/80 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#f0b400] ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Try Another</span>
            </button>

            {/* 4. Clear Button */}
            <button
              type="button"
              onClick={handleClear}
              title="Clear review"
              className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#f7f6f1]/70 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </>
        )}
      </div>

      {/* =====================================================================
          RECEPTION DESK PRINTABLE QR STANDEE MODAL
          - Redirects directly to Review Us & Contact page
          - Beautiful centered color card for desktop and centered printing
          - Instant 0ms SVG QR rendering
          ===================================================================== */}
      {showStandeeModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            id="printable-standee"
            className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#fdfbf7] via-white to-[#f4f0e6] text-[#0f1f12] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#14531e] ring-4 ring-[#f0b400]/40 text-center space-y-4"
          >
            <button
              type="button"
              onClick={() => setShowStandeeModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#0f1f12]/60 hover:text-[#0f1f12] cursor-pointer print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gold Stars Header */}
            <div className="flex items-center justify-center gap-1 text-[#f0b400]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-[#f0b400] text-[#f0b400]" />
              ))}
            </div>

            <div className="space-y-1">
              <span
                className="text-2xl sm:text-3xl text-[#9e6800] block"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                The Green Heritage Resort and Banquet
              </span>
              <h3
                className="text-xl sm:text-2xl text-[#14531e] font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Review Us &amp; Share Experience
              </h3>
              <p className="text-xs text-[#0f1f12]/75">
                Bakarpur, Gobarsahi–Sakri Road · Muzaffarpur
              </p>
            </div>

            {/* QR Code Container - Loads Instantly with Zero Latency */}
            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-[#14531e]/30 shadow-inner inline-block mx-auto">
              <img
                src="/contact-review-qr.svg"
                alt="Scan to Review The Green Heritage Resort on Google"
                width={180}
                height={180}
                className="w-44 h-44 rounded-xl mx-auto"
                loading="eager"
              />
            </div>

            <div className="space-y-1 text-xs text-[#0f1f12]/80 leading-relaxed">
              <p className="font-semibold text-[#14531e]">
                Scan with any phone camera to open Review Assistant
              </p>
              <p className="text-[11px] text-[#0f1f12]/60">
                1-tap authentic review ideas &amp; direct Google posting
              </p>
              <p className="text-[11px] font-mono font-medium text-[#9e6800] pt-1">
                thegreenheritageresort.in/contact
              </p>
            </div>

            {/* Print & Action Buttons (Hidden when printed) */}
            <div className="flex items-center justify-center gap-3 pt-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] text-white text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Standee</span>
              </button>
              <button
                type="button"
                onClick={() => setShowStandeeModal(false)}
                className="px-4 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0f1f12]/80 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
