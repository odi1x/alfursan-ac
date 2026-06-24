# Analytics Usage Guide

You can now use the `trackBranchView` utility anywhere inside your client components. Here's a quick reference on how to import and trigger it when a user interacts with a branch:

```tsx
"use client";

import { trackBranchView } from "@/lib/analytics";

export default function BranchCard({ branchName }) {
  const handleClick = () => {
    // 1. Fire the custom tracking event
    trackBranchView(branchName);

    // 2. Perform your normal logic (e.g., navigating or opening a modal)
    console.log(`User clicked on branch: ${branchName}`);
  };

  return (
    <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      View {branchName}
    </button>
  );
}
```

The general page view tracking has already been fully integrated into the global `layout.tsx` file and will trigger automatically whenever the user navigates routes across your app via Next.js navigation.
