'use client';

import React, { useEffect, useState } from 'react';
import { X, Mail, Copy, Check, ExternalLink, Send } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/masoom-data';

/**
 * Intercepts clicks on mailto links site-wide to present an instant email
 * form whose submission redirects directly through the user's mail handler
 * (`mailto:ajay888277@gmail.com`), alongside Gmail Web and copy fallbacks.
 */
export function TwfEmailHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState(
    'Wedding / Stay Enquiry — The Green Heritage Resort'
  );
  const [message, setMessage] = useState(
    'Hello The Green Heritage team,\n\nI would like to enquire about wedding dates, lawns/banquet halls, and room availability.\n\nPreferred Dates:\nEstimated Guests:\nPhone Number:'
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a[href^="mailto:"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.dataset.nativeMailto === 'true') return;

      event.preventDefault();
      setIsOpen(true);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  const formattedBody = senderName.trim()
    ? `${message.trim()}\n\nWarm regards,\n${senderName.trim()}`
    : message.trim();

  const nativeMailtoHref = `mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(formattedBody)}`;

  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    STUDIO_INFO.email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmitMailForm = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = nativeMailtoHref;
    setIsOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[120] bg-[#061208]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="twf-email-modal-title"
    >
      <div
        className="w-full max-w-lg rounded-[22px] bg-[#f7f6f1] text-[#0f1f12] shadow-2xl border border-[#14531e]/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#061208] text-[#f7f6f1] px-5 sm:px-7 py-5 flex items-start justify-between gap-4 border-b border-[#f0b400]/20">
          <div>
            <span
              className="text-xl sm:text-2xl text-[#f0b400] block leading-none"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Direct Email Desk
            </span>
            <h2
              id="twf-email-modal-title"
              className="text-2xl sm:text-3xl font-normal lowercase mt-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              email the green heritage
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close email dialog"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmitMailForm} className="p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white border border-[#14531e]/15 px-3.5 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <Mail className="w-4 h-4 text-[#14531e] shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-[#0f1f12] truncate">
                {STUDIO_INFO.email}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14531e]/8 hover:bg-[#14531e] hover:text-white text-[#14531e] text-[11px] font-medium transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#0f1f12]/65 font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Rohan & Priya"
                className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#0f1f12]/65 font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#0f1f12]/65 font-medium mb-1">
              Message
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0f1f12] focus:outline-none focus:border-[#14531e] resize-none"
            />
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5 border-t border-[#14531e]/15">
            <a
              href={gmailHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#14531e]/8 border border-[#14531e]/20 text-xs uppercase tracking-[0.12em] font-medium text-[#0f1f12] transition-colors"
            >
              <span>Gmail Web</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#14531e] hover:bg-[#0c3a14] border border-[#f0b400]/45 text-white text-xs uppercase tracking-[0.14em] font-medium transition-colors shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#f0b400]" />
              <span>Send via Mail</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
