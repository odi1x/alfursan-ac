"use client";

import { usePathname } from "next/navigation";
import ContactBar from "./ContactBar";

type Branch = {
  id: string;
  name: string;
  phone: string;
  phoneIntl: string;
  whatsapp: string;
  waMessage: string;
  slug?: string;
};

export default function ContactBarWrapper({ branches }: { branches: Branch[] }) {
  const pathname = usePathname();

  // Hide on admin routes completely
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  // Determine if we are on a specific branch page
  // Notice we need slug from branches to match it. Let's update layout.tsx to fetch slug as well.
  const branchMatch = pathname.match(/\/branch\/([^\/]+)/);
  const currentBranchId = branchMatch ? branches.find(b => b.slug === branchMatch[1])?.id : undefined;

  return <ContactBar branches={branches} currentBranchId={currentBranchId} />;
}
