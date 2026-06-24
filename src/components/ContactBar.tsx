"use client";

import { useState } from "react";
import { trackContact } from "@/lib/analytics";

const ICON_CALL = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[21px] h-[21px] shrink-0">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/>
  </svg>
);

const ICON_WA = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[21px] h-[21px] shrink-0">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 7 3.8zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.8a11.6 11.6 0 0 0 4.5 4.3c1.7.8 2.5.9 3.3.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0 0-.2-.1-.5-.1z"/>
  </svg>
);

type Branch = {
  id: string;
  name: string;
  phone: string;
  phoneIntl: string;
  whatsapp: string;
  waMessage: string;
};

export default function ContactBar({ branches, currentBranchId }: { branches: Branch[], currentBranchId?: string }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetChannel, setSheetChannel] = useState<"call" | "whatsapp">("call");

  const waLink = (b: Branch) => `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(b.waMessage)}`;
  const telLink = (b: Branch) => `tel:${b.phoneIntl}`;

  const openSheet = (channel: "call" | "whatsapp") => {
    setSheetChannel(channel);
    setSheetOpen(true);
  };

  const closeSheet = () => setSheetOpen(false);

  const handleDirectContact = (channel: "whatsapp" | "call") => {
    const b = branches.find(b => b.id === currentBranchId) || branches[0];
    trackContact(channel, b.name, b.phone);
  };

  const handleSheetContact = (channel: "whatsapp" | "call", b: Branch) => {
    trackContact(channel, b.name, b.phone);
    closeSheet();
  };

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-[60] bg-[rgba(15,15,18,.92)] backdrop-blur-[14px] border-t border-line pb-[calc(12px+env(safe-area-inset-bottom))] pt-[12px] px-[16px]">
        <div className="w-[min(100%,1060px)] mx-auto grid grid-cols-2 gap-[10px] sm:grid-cols-[280px_280px] sm:justify-center">
          {currentBranchId ? (
            <>
              {/* Branch Page */}
              <a
                href={waLink(branches.find(b => b.id === currentBranchId) || branches[0])}
                target="_blank"
                rel="noopener"
                onClick={() => handleDirectContact("whatsapp")}
                className="flex items-center justify-center gap-[9px] font-display font-semibold text-[1rem] rounded-[13px] px-[10px] py-[14px] min-h-[54px] text-white transition-transform duration-150 active:scale-97 bg-[#1FA855] shadow-[0_8px_24px_rgba(31,168,85,.3)]"
              >
                {ICON_WA}<span>واتساب</span>
              </a>
              <a
                href={telLink(branches.find(b => b.id === currentBranchId) || branches[0])}
                onClick={() => handleDirectContact("call")}
                className="flex items-center justify-center gap-[9px] font-display font-semibold text-[1rem] rounded-[13px] px-[10px] py-[14px] min-h-[54px] text-white transition-transform duration-150 active:scale-97 bg-academy-red shadow-[0_8px_24px_rgba(226,7,19,.32)]"
              >
                {ICON_CALL}<span>اتصل الآن</span>
              </a>
            </>
          ) : (
            <>
              {/* Home Page */}
              <button
                onClick={() => openSheet("whatsapp")}
                className="flex items-center justify-center gap-[9px] font-display font-semibold text-[1rem] rounded-[13px] px-[10px] py-[14px] min-h-[54px] text-white transition-transform duration-150 active:scale-97 bg-[#1FA855] shadow-[0_8px_24px_rgba(31,168,85,.3)]"
              >
                {ICON_WA}<span>واتساب</span>
              </button>
              <button
                onClick={() => openSheet("call")}
                className="flex items-center justify-center gap-[9px] font-display font-semibold text-[1rem] rounded-[13px] px-[10px] py-[14px] min-h-[54px] text-white transition-transform duration-150 active:scale-97 bg-academy-red shadow-[0_8px_24px_rgba(226,7,19,.32)]"
              >
                {ICON_CALL}<span>اتصل الآن</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sheet Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-200 ${sheetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSheet}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 inset-x-0 z-[71] bg-surface-2 rounded-t-[22px] border border-line border-b-0 px-[20px] pb-[calc(26px+env(safe-area-inset-bottom))] pt-[22px] transition-transform duration-250 ${sheetOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <h3 className="font-display font-[700] text-[1.15rem] text-center mb-[16px]">اختر الفرع للتواصل</h3>
        <div className="flex flex-col gap-[10px]">
          {branches.map(b => (
            <a
              key={b.id}
              href={sheetChannel === "whatsapp" ? waLink(b) : telLink(b)}
              target={sheetChannel === "whatsapp" ? "_blank" : undefined}
              rel={sheetChannel === "whatsapp" ? "noopener" : undefined}
              onClick={() => handleSheetContact(sheetChannel, b)}
              className="flex items-center justify-between bg-surface border border-line rounded-[14px] px-[18px] py-[16px] font-display font-semibold text-[1.02rem] w-full text-start after:content-['⟵'] after:text-academy-red"
            >
              <span>{b.name}<small className="block font-body font-normal text-muted text-[.76rem]">{b.phone}</small></span>
            </a>
          ))}
        </div>
        <button onClick={closeSheet} className="block mx-auto mt-[14px] text-muted text-[.85rem]">إغلاق</button>
      </div>
    </>
  );
}
