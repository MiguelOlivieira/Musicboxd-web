import { Star, StarHalf } from "lucide-react"

export function StarRating({ rating, className }: { rating: number, className?: string }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={`flex items-center space-x-0.5 text-[#7b3fe4] ${className}`}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="w-4 h-4 fill-current" />;
        }
        if (i === fullStars && hasHalfStar) {
          return <StarHalf key={i} className="w-4 h-4 fill-current" />;
        }
        return <Star key={i} className="w-4 h-4 text-zinc-600" />;
      })}
    </div>
  )
}
