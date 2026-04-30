import { InstagramOutlined, TikTokOutlined, YoutubeOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

interface SocialLink {
  href: string;
  icon: ReactNode;
  label: string;
}

interface SocialLinksProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://www.youtube.com/',
    icon: <YoutubeOutlined />,
    label: 'YouTube',
  },
  {
    href: 'https://www.instagram.com/',
    icon: <InstagramOutlined />,
    label: 'Instagram',
  },
  {
    href: 'https://www.tiktok.com/',
    icon: <TikTokOutlined />,
    label: 'TikTok',
  },
];

export function SocialLinks({ className = '', variant = 'light' }: SocialLinksProps) {
  return (
    <div className={`social-links social-links--${variant} ${className}`.trim()}>
      {socialLinks.map((item) => (
        <a
          aria-label={item.label}
          className="social-link"
          href={item.href}
          key={item.label}
          rel="noreferrer"
          target="_blank"
          title={item.label}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
