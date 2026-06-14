import { ImageWithFallback } from "../figma/ImageWithFallback"
import { cn } from "../../lib/utils"

export function Avatar({ src, alt, size = "md", className }: { src: string, alt: string, size?: "sm" | "md" | "lg" | "xl", className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-full shrink-0", 
      {
        "w-8 h-8": size === "sm",
        "w-10 h-10": size === "md",
        "w-16 h-16": size === "lg",
        "w-24 h-24": size === "xl",
      },
      className
    )}>
      <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}
