'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Star,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Mic,
  MicOff,
  QrCode,
  Printer,
  X,
  MessageSquareHeart,
} from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';

// =========================================================================
// TRANSLITERATION & SPEECH UTILITIES (from REVIEW_SYSTEM_IMPLEMENTATION.md)
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

// Quick Topic Chips
const TOPIC_CHIPS = [
  { id: 'random', label: '🎲 Surprise Me', topic: 'random' },
  { id: 'wedding', label: '💍 Wedding & Lawn', topic: 'Wedding and open lawn reception' },
  { id: 'food', label: '🍲 Delicious Food', topic: 'Catering and food taste' },
  { id: 'haldi', label: '🏊 Poolside Haldi', topic: 'Poolside haldi and photography' },
  { id: 'stay', label: '🏡 Rooms & Stay', topic: 'Family stay and cottages' },
  { id: 'quick', label: '⚡ Quick 1-Liner', topic: 'Lazy quick 1-sentence note' },
];

export function TwfReviewBooster() {
  const [starRating, setStarRating] = useState<number>(5);
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi'>('en');
  const [selectedTopic, setSelectedTopic] = useState<string>('random');
  const [reviewText, setReviewText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showStandeeModal, setShowStandeeModal] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
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
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              const converted =
                selectedLang === 'hi' ? devanagariToLatin(transcript) : transcript;
              setReviewText((prev) => mergeSpeechChunks(prev, converted));
            } else {
              interimTranscript += transcript;
            }
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

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [selectedLang]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type or use Generate Review Idea.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        setIsRecording(false);
      }
    }
  };

  // Generate Review from API
  const handleGenerate = async (topicOverride?: string) => {
    setIsGenerating(true);
    setCopied(false);
    const activeTopic = topicOverride || selectedTopic;

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
      });

      const data = await res.json();
      if (data?.review) {
        setReviewText(data.review);
      }
    } catch (err) {
      console.error('Failed to generate review:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // 1-Tap Copy
  const handleCopyOnly = () => {
    if (!reviewText.trim()) return;
    copyToClipboardRobust(reviewText.trim());
    setCopied(true);
    showToast('Review copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  // 1-Tap Post to Google
  const handlePostToGoogle = () => {
    const textToCopy = reviewText.trim();
    if (!textToCopy) return;

    // 1. Copy text synchronously
    copyToClipboardRobust(textToCopy);
    setCopied(true);
    showToast('Copied! Opening Google Reviews to paste...');

    // 2. Open Google Reviews intent in new tab
    setTimeout(() => {
      window.open(STUDIO_INFO.googleReviewUrl, '_blank', 'noopener,noreferrer');
      setCopied(false);
    }, 600);
  };

  const handleClear = () => {
    setReviewText('');
    setCopied(false);
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0b400]/15 border border-[#f0b400]/35 text-[#f0b400] text-xs font-semibold tracking-wide">
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

        {/* Language Mode Toggle */}
        <div className="flex items-center sm:justify-end gap-2">
          <span className="text-xs text-[#f7f6f1]/70 font-medium">Style:</span>
          <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
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
            <button
              type="button"
              onClick={() => setSelectedLang('hi')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedLang === 'hi'
                  ? 'bg-[#14531e] text-white shadow-sm'
                  : 'text-[#f7f6f1]/70 hover:text-white'
              }`}
            >
              Hinglish (Hindi in English)
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
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tap 'Generate Review Idea' below or write your own honest review here..."
            className="w-full bg-transparent text-[#f7f6f1] placeholder-[#f7f6f1]/40 text-sm sm:text-base leading-relaxed resize-none focus:outline-none"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs text-[#f7f6f1]/60">
            <div className="flex items-center gap-2">
              {hasText ? (
                <span className="inline-flex items-center gap-1.5 text-[#f0b400] font-medium">
                  <MessageSquareHeart className="w-3.5 h-3.5" />
                  Ready to post ({reviewText.length} chars)
                </span>
              ) : (
                <span className="text-[#f7f6f1]/50">Zero formatting needed — real &amp; authentic</span>
              )}
            </div>

            {/* Voice typing button */}
            <button
              type="button"
              onClick={toggleRecording}
              aria-label={isRecording ? 'Stop Voice Recording' : 'Voice Typing'}
              title={isRecording ? 'Listening... click to stop' : 'Tap to speak your review'}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                isRecording
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                  : 'bg-white/5 hover:bg-white/10 text-[#f7f6f1]/70 border border-white/10'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-3 h-3 text-red-400" />
                  <span>Listening...</span>
                </>
              ) : (
                <>
                  <Mic className="w-3 h-3 text-[#f0b400]" />
                  <span>Voice Type</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          ACTION BUTTONS (STRICTLY FUNCTIONAL & CONDITIONALLY DISPLAYED)
          - When text is EMPTY: Only "Generate Review Idea" is visible
          - When text EXISTS: "Post on Google", "Copy", "Try Another", "Clear" appear
          ===================================================================== */}
      <div className="relative z-10 flex flex-wrap items-center gap-3">
        {!hasText ? (
          // ONLY VISIBLE WHEN EMPTY
          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#14531e] to-[#1b6d28] hover:from-[#1b6d28] hover:to-[#228433] text-white border border-[#f0b400]/50 text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-lg shadow-[#14531e]/40 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#f0b400]" />
                <span>Writing Authentic Review...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#f0b400]" />
                <span>Generate Review Idea</span>
              </>
            )}
          </button>
        ) : (
          // VISIBLE WHEN REVIEW TEXT EXISTS
          <>
            {/* Primary Action: 1-Tap Post to Google */}
            <button
              type="button"
              onClick={handlePostToGoogle}
              className="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#14531e] via-[#1a6425] to-[#14531e] hover:brightness-110 text-white border border-[#f0b400] text-xs sm:text-sm uppercase tracking-wider font-bold shadow-xl shadow-[#14531e]/50 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 group"
            >
              <Star className="w-4 h-4 fill-[#f0b400] text-[#f0b400] group-hover:scale-115 transition-transform" />
              <span>Post on Google Reviews (1-Tap)</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#f0b400]" />
            </button>

            {/* Copy Review Only */}
            <button
              type="button"
              onClick={handleCopyOnly}
              className={`px-4 sm:px-5 py-3.5 rounded-full border text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                copied
                  ? 'bg-[#14531e] text-[#f0b400] border-[#f0b400]'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#f0b400]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Try Another Style */}
            <button
              type="button"
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              title="Generate another variation"
              className="px-4 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#f7f6f1]/80 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#f0b400] ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Try Another</span>
            </button>

            {/* Clear Text */}
            <button
              type="button"
              onClick={handleClear}
              title="Clear review"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[#f7f6f1]/60 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* =====================================================================
          RECEPTION DESK PRINTABLE QR STANDEE MODAL
          ===================================================================== */}
      {showStandeeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div
            id="printable-standee"
            className="relative w-full max-w-md bg-white text-[#0f1f12] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#14531e] text-center space-y-4"
          >
            <button
              type="button"
              onClick={() => setShowStandeeModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#0f1f12]/60 hover:text-[#0f1f12] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span
                className="text-2xl text-[#9e6800] block"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                The Green Heritage Resort and Banquet
              </span>
              <h3
                className="text-xl sm:text-2xl text-[#14531e] font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Rate Us on Google Maps
              </h3>
              <p className="text-xs text-[#0f1f12]/70">
                Scan the QR code below with any smartphone camera to share your review!
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-[#f7f6f1] rounded-2xl border-2 border-dashed border-[#14531e]/30 flex flex-col items-center justify-center">
              {/* Google Review Direct QR image */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  STUDIO_INFO.googleReviewUrl
                )}`}
                alt="Scan to Review The Green Heritage Resort on Google Maps"
                width={180}
                height={180}
                className="rounded-xl shadow-md"
              />
              <span className="text-[11px] text-[#0f1f12]/60 mt-2 font-medium">
                Bakarpur, Gobarsahi–Sakri Road · Muzaffarpur
              </span>
            </div>

            <div className="flex items-center justify-center gap-1 text-[#f0b400]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-[#f0b400] text-[#f0b400]" />
              ))}
            </div>

            <p className="text-xs text-[#0f1f12]/65 italic">
              "Your 5-star review helps upcoming wedding families find the right venue in Muzaffarpur."
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
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
