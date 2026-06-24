// src/lib/analytics.ts

// Global type declarations for third-party analytics scripts
declare global {
  interface Window {
    // Meta (Facebook) Pixel
    fbq?: (...args: unknown[]) => void;
    // Google Analytics (gtag)
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    // Snapchat Pixel
    snaptr?: (...args: unknown[]) => void;
  }
}

/**
 * Tracks a page view across Meta, Google, and Snapchat.
 * @param url The current URL path being viewed.
 */
export const trackPageView = (url: string) => {
  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }

  // Google Analytics
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    process.env.NEXT_PUBLIC_GOOGLE_TAG_ID
  ) {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_TAG_ID, {
      page_path: url,
    });
  }

  // Snapchat Pixel
  if (typeof window !== "undefined" && window.snaptr) {
    window.snaptr("track", "PAGE_VIEW");
  }
};

/**
 * Tracks when a user views or interacts with a specific academy branch.
 * @param branchName The name of the branch viewed.
 */
export const trackBranchView = (branchName: string) => {
  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "BranchView", { branch_name: branchName });
  }

  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "branch_view", {
      event_category: "engagement",
      event_label: branchName,
      branch_name: branchName,
    });
  }

  // Snapchat Pixel
  if (typeof window !== "undefined" && window.snaptr) {
    window.snaptr("track", "CUSTOM_EVENT_1", {
      description: "Branch View",
      item_category: branchName,
    });
  }
};

/**
 * Tracks when a user initiates contact with a specific branch.
 * @param channel The communication channel ("whatsapp" | "call")
 * @param branchName The name of the branch contacted.
 * @param phoneNumber The phone number the user will contact.
 */
export const trackContact = (channel: "whatsapp" | "call", branchName: string, phoneNumber: string) => {
  // Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "ContactInitiated", {
      channel: channel,
      branch_name: branchName,
      phone_number: phoneNumber
    });
  }

  // Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "contact_initiated", {
      event_category: "contact",
      event_label: branchName,
      channel: channel,
      branch_name: branchName,
      phone_number: phoneNumber
    });
  }

  // Snapchat Pixel
  if (typeof window !== "undefined" && window.snaptr) {
    window.snaptr("track", "CUSTOM_EVENT_2", {
      description: "Contact Initiated",
      item_category: channel,
    });
  }
};
