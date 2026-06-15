export function getClubColorClass(clubName: string): string {
  const name = clubName.toLowerCase();

  if (name.includes("أهلي") || name.includes("ahli")) return "bg-[#1F9D55]";
  if (name.includes("نصر") || name.includes("nassr")) return "bg-[#FFD666] !text-[#004DAA]";
  if (name.includes("اتحاد") || name.includes("ittihad")) return "bg-[#FCE101] !text-black";
  if (name.includes("هلال") || name.includes("hilal")) return "bg-[#004DAA]";
  if (name.includes("شباب") || name.includes("shabab")) return "bg-[#FFFFFF] !text-black";
  if (name.includes("اتفاق") || name.includes("ettifaq")) return "bg-[#00603A]";
  if (name.includes("تعاون") || name.includes("taawoun")) return "bg-[#FFDD00] !text-black";
  if (name.includes("فيحاء") || name.includes("fayha")) return "bg-[#FF6600]";
  if (name.includes("ضمك") || name.includes("damac")) return "bg-[#D31027]";
  if (name.includes("خليج") || name.includes("khaleej")) return "bg-[#FBD913] !text-black";
  if (name.includes("رائد") || name.includes("raed")) return "bg-[#D31027]";
  if (name.includes("وحدة") || name.includes("wehda")) return "bg-[#C2242B]";
  if (name.includes("أبها") || name.includes("abha")) return "bg-[#003B5C]";
  if (name.includes("طائي") || name.includes("tai")) return "bg-[#7A7A7A]";
  if (name.includes("أخدود") || name.includes("okhdood")) return "bg-[#008DD2]";
  if (name.includes("رياض") || name.includes("riyadh")) return "bg-[#D31027]";
  if (name.includes("حزم") || name.includes("hazem")) return "bg-[#003B5C]";
  if (name.includes("قادسية") || name.includes("qadsiah")) return "bg-[#D31027]";

  return "bg-academy-red"; // Default fallback
}
