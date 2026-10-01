import type { BlogPost } from "@/content/blog";
import { cn } from "@/lib/cn";

const tones = {
  blue: "from-[#1d4ed8] via-[#3b5bdb] to-[#0b1230]",
  violet: "from-[#6d28d9] via-[#4f46e5] to-[#0b1230]",
  cyan: "from-[#0891b2] via-[#2563eb] to-[#0b1230]",
};

/** Branded generated cover used when a post has no cover image. */
export function BlogCover({ post, className, large }: { post: BlogPost; className?: string; large?: boolean }) {
  if (post.coverImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={post.coverImage.src} alt={post.coverImage.alt} loading="lazy" className={cn("h-full w-full object-cover", className)} />;
  }
  return (
    <div role="img" aria-label={`Cover illustration for ${post.title}`} className={cn("relative h-full w-full overflow-hidden bg-gradient-to-br", tones[post.coverTone], className)}>
      <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/20" />
      <div aria-hidden="true" className="absolute -right-2 top-6 h-28 w-28 rounded-full border border-white/25" />
      <svg aria-hidden="true" viewBox="0 0 200 100" className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-60" preserveAspectRatio="none">
        <path d="M0 80 C40 70 60 40 100 50 S160 20 200 30" fill="none" stroke="white" strokeOpacity=".5" strokeWidth="1" />
        <circle cx="100" cy="50" r="2.5" fill="white" />
        <circle cx="160" cy="31" r="2" fill="white" fillOpacity=".7" />
      </svg>
      <span className={cn("absolute left-5 top-5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur", large && "left-8 top-8 text-xs")}>{post.category}</span>
    </div>
  );
}
