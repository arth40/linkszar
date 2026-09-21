import React from 'react';

interface LogoMarkProps {
  size?: number;
  ink?: string;
  accent?: string;
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({
  size = 24,
  ink = '#191712',
  accent = '#3D4FD1',
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect
      x="18"
      y="38"
      width="64"
      height="24"
      rx="12"
      transform="rotate(-20 50 50)"
      stroke={ink}
      strokeWidth="11"
    />
    <rect
      x="18"
      y="38"
      width="64"
      height="24"
      rx="12"
      transform="rotate(20 50 50)"
      stroke={accent}
      strokeWidth="11"
    />
  </svg>
);

interface LogoProps {
  markSize?: number;
  wordmarkClassName?: string;
  ink?: string;
  accent?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  markSize = 22,
  wordmarkClassName = 'text-[18.5px]',
  ink = '#191712',
  accent = '#3D4FD1',
  className = '',
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <LogoMark size={markSize} ink={ink} accent={accent} />
    <span
      className={`font-display font-medium leading-none ${wordmarkClassName}`}
      style={{ color: ink }}
    >
      linkszar
    </span>
  </div>
);

export default Logo;
