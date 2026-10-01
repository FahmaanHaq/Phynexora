import { siteConfig } from "@/config/site";
import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "./BrandIcons";
import { cn } from "@/lib/cn";

const items = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "github", label: "GitHub", Icon: GitHubIcon },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {items.map(({ key, label, Icon }) => {
        const url = siteConfig.social[key];
        const cls = "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted transition-all";
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Phynexora on ${label}`} className={cn(cls, "hover:-translate-y-0.5 hover:border-line-strong hover:text-fg")}>
                <Icon className="h-4 w-4" />
              </a>
            ) : (
              <span aria-label={`${label} — coming soon`} title={`${label} — coming soon`} role="img" className={cn(cls, "opacity-45")}>
                <Icon className="h-4 w-4" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
