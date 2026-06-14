"use client";

import { useState } from "react";

const ICON_CALL = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="w-[1.4rem] h-[1.4rem]"
  >
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
  </svg>
);

const ICON_WA = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="w-[1.4rem] h-[1.4rem]"
  >
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 7 3.8zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.8a11.6 11.6 0 0 0 4.5 4.3c1.7.8 2.5.9 3.3.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0 0-.2-.1-.5-.1z" />
  </svg>
);

interface BranchContact {
  id: string;
  name: string;
  whatsapp: string;
  phoneIntl: string;
  waMessage: string;
}

export default function ContactBar({
  branch,
  branches,
}: {
  branch?: BranchContact;
  branches?: BranchContact[];
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState<
    "whatsapp" | "call" | null
  >(null);

  const waLink = (b: BranchContact) =>
    `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(b.waMessage)}`;
  const telLink = (b: BranchContact) => `tel:${b.phoneIntl}`;

  const openSheet = (channel: "whatsapp" | "call") => {
    setActiveChannel(channel);
    setSheetOpen(true);
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setActiveChannel(null);
  };

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-60 bg-[rgba(15,15,18,0.92)] backdrop-blur-[14px] border-t border-line px-[16px] pb-[calc(12px+env(safe-area-inset-bottom))] pt-[12px]">
        <div className="w-[min(100%,1060px)] mx-auto grid grid-cols-2 gap-[10px]">
          {branch ? (
            <>
              <a
                className="flex items-center justify-center gap-[9px] font-display font-semibold text-[1rem] rounded-[13px] px-[10px] py-[14px] min-h-[54px] text-white transition-transform duration-120 ease-out active:scale-95 bg-[#1F9D55]"
                href={waLink(branch)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ICON_WA}
                <span>واتساب</span>
              </a>
              <a
                className="flex items-center justify-center gap-[9px] font-display font-semibold text-[1rem] rounded-[13px] px-[10px] py-[14px] min-h-[54px] text-white transition-transform duration-120 ease-out active:scale-95 bg-academy-red border-none"
                href={telLink(branch)}
              >
                {ICON_CALL}
                <span>اتصل الآن</span>
              </a>
            </>
          ) : (
            <>
              <button
                className="flex items-center justify-center gap-[9px] font-display font-semibold text-[1rem] rounded-[13px] px-[10px] py-[14px] min-h-[54px] text-white transition-transform duration-120 ease-out active:scale-95 bg-[#1F9D55]"
                onClick={() => openSheet("whatsapp")}
              >
                {ICON_WA}
                <span>واتساب</span>
              </button>
              <button
                className="flex items-center justify-center gap-[9px] font-display font-semibold text-[1rem] rounded-[13px] px-[10px] py-[14px] min-h-[54px] text-white transition-transform duration-120 ease-out active:scale-95 bg-academy-red border-none"
                onClick={() => openSheet("call")}
              >
                {ICON_CALL}
                <span>اتصل الآن</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sheet Modal */}
      {sheetOpen && branches && (
        <>
          <div
            className="fixed inset-0 z-70 bg-black/40 backdrop-blur-[4px] opacity-100 transition-opacity"
            onClick={closeSheet}
          />
          <div
            className="fixed bottom-0 inset-x-0 z-80 bg-surface border-t border-line rounded-t-[20px] p-[24px_20px_calc(20px+env(safe-area-inset-bottom))] transform transition-transform translate-y-0"
            role="dialog"
            aria-label="اختر الفرع"
          >
            <h3 className="font-display font-[800] text-[1.4rem] mb-[18px]">
              اختر الفرع للتواصل
            </h3>
            <div className="flex flex-col gap-[10px]">
              {branches.map((b) => {
                const link =
                  activeChannel === "whatsapp" ? waLink(b) : telLink(b);
                const isWa = activeChannel === "whatsapp";
                return (
                  <a
                    key={b.id}
                    href={link}
                    target={isWa ? "_blank" : undefined}
                    rel={isWa ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between p-[16px] bg-academy-red border-none rounded-[14px] font-display font-semibold text-[1.05rem] transition-colors active:border-academy-red"
                  >
                    <span>{b.name}</span>
                    <span className="text-muted text-[1.2rem] opacity-70">
                      ←
                    </span>
                  </a>
                );
              })}
            </div>
            <button
              className="mt-[20px] w-full p-[14px] font-display font-semibold text-muted bg-academy-red rounded-[14px]"
              onClick={closeSheet}
            >
              إغلاق
            </button>
          </div>
        </>
      )}
    </>
  );
}
