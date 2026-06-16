"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

// Packages
export async function createPackage(data: { name: string, price: number, unit: string, sessions: string, note: string | null, featured: boolean, branchId: string }) {
  await checkAuth();
  await prisma.package.create({ data });
  revalidatePath("/");
  revalidatePath(`/branch/[slug]`, "page");
}

export async function updatePackage(id: string, data: { name: string, price: number, unit: string, sessions: string, note: string | null, featured: boolean }) {
  await checkAuth();
  await prisma.package.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath(`/branch/[slug]`, "page");
  revalidatePath(`/admin/packages`, "page");
}

export async function deletePackage(id: string) {
  await checkAuth();
  await prisma.package.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath(`/branch/[slug]`, "page");
}

// Coaches
export async function createCoach(data: { name: string, bio: string, imageUrl: string | null }) {
  await checkAuth();
  await prisma.coach.create({ data });
  revalidatePath("/");
  revalidatePath(`/branch/[slug]`, "page");
}

export async function deleteCoach(id: string) {
  await checkAuth();
  await prisma.coach.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath(`/branch/[slug]`, "page");
}

// Reviews
export async function createReview(data: { author: string, text: string, rating: number }) {
  await checkAuth();
  await prisma.review.create({ data });
  revalidatePath("/");
}

export async function deleteReview(id: string) {
  await checkAuth();
  await prisma.review.delete({ where: { id } });
  revalidatePath("/");
}

// Players
export async function createPlayer(data: { name: string, club: string, year: string, imageUrl: string | null }) {
  await checkAuth();
  await prisma.player.create({ data });
  revalidatePath("/");
}

export async function deletePlayer(id: string) {
  await checkAuth();
  await prisma.player.delete({ where: { id } });
  revalidatePath("/");
}

// Branches
export async function updateBranch(id: string, data: { name: string, landmark: string, phone: string, whatsapp: string, rating: string }) {
  await checkAuth();
  await prisma.branch.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath(`/branch/[slug]`, "page");
}

// Hero
export async function updateHero(id: string, data: { headline: string, subheading: string, bgImageUrl: string | null }) {
  await checkAuth();
  await prisma.hero.update({ where: { id }, data });
  revalidatePath("/");
}

export async function createHero(data: { headline: string, subheading: string, bgImageUrl: string | null }) {
  await checkAuth();
  await prisma.hero.create({ data });
  revalidatePath("/");
}

// Announcements
export async function createAnnouncement(data: { title: string, content: string }) {
  await checkAuth();
  await prisma.announcement.create({ data });
  revalidatePath("/");
}

export async function deleteAnnouncement(id: string) {
  await checkAuth();
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/");
}
