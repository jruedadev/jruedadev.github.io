import { useEffect, useState } from 'react';
import logoDark from '@/assets/logo-dark.svg';
import logoLight from '@/assets/logo-light.svg';
import logoCompactDark from '@/assets/logo-compact-dark.svg';
import logoCompactLight from '@/assets/logo-compact-light.svg';

interface LogoProps {
  className?: string;
  forceCompact?: boolean;
}

export const Logo = ({ className, forceCompact = false }: LogoProps) => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark') ||
    !document.documentElement.classList.contains('light')
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(
        document.documentElement.classList.contains('dark') ||
        !document.documentElement.classList.contains('light')
      );
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showCompact = forceCompact || isMobile;

  if (showCompact) {
    return (
      <img
        src={isDark ? logoCompactDark : logoCompactLight}
        alt="jrueda.dev"
        className={className ?? 'h-8 w-auto'}
      />
    );
  }

  return (
    <img
      src={isDark ? logoDark : logoLight}
      alt="jrueda.dev"
      className={className ?? 'h-10 w-auto'}
    />
  );
};