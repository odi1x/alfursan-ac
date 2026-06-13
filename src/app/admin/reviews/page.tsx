import prisma from "@/lib/prisma";
import { deleteReview } from "@/app/actions";
import AddReviewForm from "./AddReviewForm";

export default async function ReviewsAdmin() {
  const reviews = await prisma.review.findMany();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold font-display mb-8">إدارة التقييمات</h2>

      <AddReviewForm />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map(r => (
          <div key={r.id} className="bg-surface border border-line p-5 rounded-[16px] flex flex-col gap-3">
            <div className="text-[#FFD666] tracking-[3px] text-[.85rem]" aria-label={`${r.rating} نجوم`}>
              {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
            </div>
            <p className="text-[.9rem] text-[#E7E8EC] line-clamp-3 flex-1">{r.text}</p>
            <div className="text-muted text-[.78rem] font-semibold">{r.author}</div>

            <form action={async () => {
              "use server";
              await deleteReview(r.id);
            }} className="mt-2 pt-3 border-t border-line">
              <button className="text-red-500 text-xs hover:underline">حذف التقييم</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
