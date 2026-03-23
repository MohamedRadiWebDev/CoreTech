import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { SocialLinks } from '@/types';

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
} as const;

export function SocialIconLinks({ links }: { links?: SocialLinks }) {
  if (!links) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {Object.entries(iconMap).map(([key, Icon]) => {
        const href = links[key as keyof SocialLinks];
        if (!href) return null;
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={key}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
