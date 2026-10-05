import { siteConfig } from '@/config/site';

interface AdBannerProps {
  slot: 'top' | 'between-content' | 'article' | 'sidebar' | 'bottom';
  className?: string;
}

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  // If NEXT_PUBLIC_ADSENSE_ID is provided and configured in production:
  if (siteConfig.adsenseId) {
    return (
      <div className={`w-full overflow-hidden my-6 text-center ${className}`}>
        {/* Placeholder script insertion point for AdSense */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={siteConfig.adsenseId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Development / Clean fallback view
  const heights = {
    top: 'h-24 sm:h-28',
    'between-content': 'h-24 sm:h-28',
    article: 'h-32 sm:h-40',
    sidebar: 'h-64',
    bottom: 'h-24 sm:h-32',
  };

  return (
    <div
      className={`w-full ${heights[slot]} rounded-2xl bg-slate-100 dark:bg-[#111827] border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 my-6 select-none ${className}`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-600 mb-1">
        ADVERTISEMENT
      </span>
      <span className="text-[11px] text-slate-400 dark:text-slate-600">
        Ruang Iklan Google AdSense ({slot})
      </span>
    </div>
  );
}
