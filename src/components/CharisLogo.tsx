import React from 'react';

interface CharisLogoProps {
  variant?: 'full' | 'emblem' | 'wordmark';
  theme?: 'light' | 'dark'; // 'light' has navy text, 'dark' has white text
  className?: string;
  height?: number | string;
  onClick?: () => void;
}

export const CharisLogo: React.FC<CharisLogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  height = 64,
  onClick,
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#071A38';
  const subtextColor = isDark ? '#E2E8F0' : '#0C2340';

  if (variant === 'emblem') {
    return (
      <svg
        viewBox="20 16 300 300"
        style={{ height, width: 'auto' }}
        className={`shrink-0 select-none ${className} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Charis Foundation Nigeria Emblem"
      >
        <defs>
          <linearGradient id="cfEmbCross" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#FBBF24" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="cfEmbBlueFig" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#0284C7" />
            <stop offset="70%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0B2356" />
          </linearGradient>

          <linearGradient id="cfEmbGoldFig" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          <linearGradient id="cfEmbBlueHands" x1="0%" y1="20%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="30%" stopColor="#1E3A8A" />
            <stop offset="75%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#081026" />
          </linearGradient>

          <linearGradient id="cfEmbGoldWings" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <radialGradient id="cfEmbSphereGold" cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#9A3412" />
          </radialGradient>

          <filter id="cfEmbGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="cfEmbShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
          </filter>
        </defs>

        <ellipse cx="168" cy="305" rx="84" ry="7.5" fill="#0A1931" opacity={isDark ? "0.5" : "0.25"} filter="url(#cfEmbShadow)" />

        {/* Radiant Rays */}
        <g fill="url(#cfEmbCross)">
          <polygon points="168,18 164,48 172,48" opacity="0.95" />
          <polygon points="152,24 156,51 161,49" opacity="0.85" />
          <polygon points="184,24 175,49 180,51" opacity="0.85" />
          <polygon points="128,43 151,57 153,52" opacity="0.9" />
          <polygon points="122,64 148,67 148,62" opacity="0.95" />
          <polygon points="128,86 150,77 152,82" opacity="0.85" />
          <polygon points="208,43 183,52 185,57" opacity="0.9" />
          <polygon points="214,64 188,62 188,67" opacity="0.95" />
          <polygon points="208,86 184,82 186,77" opacity="0.85" />
        </g>

        {/* Radiant Cross */}
        <g fill="url(#cfEmbCross)">
          <rect x="162" y="32" width="12" height="76" rx="3" />
          <rect x="143" y="51" width="50" height="12" rx="3" />
        </g>

        {/* Outer Flame Wings */}
        <path d="M168,268 C135,264 88,236 62,176 C46,138 52,98 56,86 C58,102 68,142 98,172 C124,198 152,216 168,268 Z"
              fill="url(#cfEmbGoldWings)" />
        <path d="M168,268 C198,264 240,240 264,188 C278,156 276,122 272,110 C274,126 270,158 244,188 C220,216 188,236 168,268 Z"
              fill="url(#cfEmbGoldWings)" />

        {/* Left Figure (Blue) */}
        <g>
          <circle cx="126" cy="122" r="16.5" fill="url(#cfEmbBlueFig)" />
          <path d="M164,242 C154,228 138,206 120,186 C102,166 94,146 106,128 C114,138 126,152 144,166 C158,144 172,118 174,106 C176,118 168,146 156,178 C150,196 158,218 164,242 Z"
                fill="url(#cfEmbBlueFig)" />
        </g>

        {/* Right Figure (Gold) */}
        <g>
          <circle cx="218" cy="136" r="15" fill="url(#cfEmbSphereGold)" />
          <path d="M166,244 C176,232 192,212 208,190 C222,170 230,152 220,138 C214,148 202,162 188,174 C182,156 178,138 178,124 C180,136 188,156 196,178 C200,192 188,218 166,244 Z"
                fill="url(#cfEmbGoldFig)" />
        </g>

        {/* Hands Base Cradle */}
        <g>
          <path d="M168,292 C146,290 102,274 68,232 C40,198 32,158 28,144 C34,164 48,208 86,242 C120,272 152,284 168,292 Z"
                fill="url(#cfEmbBlueHands)" />
          <path d="M168,292 C150,286 114,264 88,228 C68,200 66,172 68,162 C74,178 88,208 116,234 C142,258 158,276 168,292 Z"
                fill="url(#cfEmbBlueFig)" opacity="0.9" />

          <path d="M168,292 C190,290 234,274 268,232 C296,198 304,158 308,144 C302,164 288,208 250,242 C216,272 184,284 168,292 Z"
                fill="url(#cfEmbBlueHands)" />
          <path d="M168,292 C186,286 222,264 248,228 C268,200 270,172 268,162 C262,178 248,208 220,234 C194,258 178,276 168,292 Z"
                fill="url(#cfEmbBlueFig)" opacity="0.9" />

          <path d="M168,292 C158,280 148,260 152,246 C158,258 164,272 168,292 C172,272 178,258 184,246 C188,260 178,280 168,292 Z"
                fill="url(#cfEmbBlueHands)" />
        </g>
      </svg>
    );
  }

  // Full Official Brand Identity (Emblem + Golden Divider + Typography)
  return (
    <svg
      viewBox="16 16 854 300"
      style={{ height, width: 'auto' }}
      className={`shrink-0 select-none ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Charis Foundation Nigeria Official Logo"
    >
      <defs>
        {/* Crisp Golden Radial & Linear Gradients */}
        <linearGradient id={`cfCrossGrad_${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="35%" stopColor="#FBBF24" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient id={`cfBlueFig_${theme}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="35%" stopColor="#0284C7" />
          <stop offset="70%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0B2356" />
        </linearGradient>

        <linearGradient id={`cfGoldFig_${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="80%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        <linearGradient id={`cfBlueHands_${theme}`} x1="0%" y1="20%" x2="100%" y2="90%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="30%" stopColor="#1E3A8A" />
          <stop offset="75%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#081026" />
        </linearGradient>

        <linearGradient id={`cfGoldWings_${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* High-visibility 3D Golden Orb with Specular Highlight */}
        <radialGradient id={`cfSphereGold_${theme}`} cx="35%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FEF08A" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#9A3412" />
        </radialGradient>

        {/* Glow & Soft Shadow */}
        <filter id={`cfGlowSphere_${theme}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id={`cfDropShadow_${theme}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
        </filter>

        {/* Mask to ensure perfect dot placement on 'i' without interference */}
        <clipPath id={`cfClipDot_${theme}`}>
          {/* Include all areas except the small rectangle where the standard 'i' dot would be */}
          <rect x="0" y="0" width="648" height="340" />
          <rect x="694" y="0" width="300" height="340" />
          <rect x="648" y="108" width="46" height="232" />
        </clipPath>
      </defs>

      {/* ==================== EMBLEM (Left Side) ==================== */}
      <g id="cf-emblem">
        <ellipse cx="168" cy="305" rx="82" ry="7" fill="#0A1931" opacity={isDark ? "0.5" : "0.24"} filter={`url(#cfDropShadow_${theme})`} />

        {/* Radiant Rays */}
        <g fill={`url(#cfCrossGrad_${theme})`}>
          <polygon points="168,18 164,48 172,48" opacity="0.95" />
          <polygon points="152,24 156,51 161,49" opacity="0.85" />
          <polygon points="184,24 175,49 180,51" opacity="0.85" />
          <polygon points="128,43 151,57 153,52" opacity="0.9" />
          <polygon points="122,64 148,67 148,62" opacity="0.95" />
          <polygon points="128,86 150,77 152,82" opacity="0.85" />
          <polygon points="208,43 183,52 185,57" opacity="0.9" />
          <polygon points="214,64 188,62 188,67" opacity="0.95" />
          <polygon points="208,86 184,82 186,77" opacity="0.85" />
        </g>

        {/* Radiant Cross */}
        <g fill={`url(#cfCrossGrad_${theme})`}>
          <rect x="162" y="32" width="12" height="76" rx="3" />
          <rect x="143" y="51" width="50" height="12" rx="3" />
        </g>

        {/* Outer Flame Wings */}
        <path d="M168,268 C135,264 88,236 62,176 C46,138 52,98 56,86 C58,102 68,142 98,172 C124,198 152,216 168,268 Z"
              fill={`url(#cfGoldWings_${theme})`} />
        <path d="M168,268 C198,264 240,240 264,188 C278,156 276,122 272,110 C274,126 270,158 244,188 C220,216 188,236 168,268 Z"
              fill={`url(#cfGoldWings_${theme})`} />

        {/* Left Figure (Blue) */}
        <g>
          <circle cx="126" cy="122" r="16.5" fill={`url(#cfBlueFig_${theme})`} />
          <path d="M164,242 C154,228 138,206 120,186 C102,166 94,146 106,128 C114,138 126,152 144,166 C158,144 172,118 174,106 C176,118 168,146 156,178 C150,196 158,218 164,242 Z"
                fill={`url(#cfBlueFig_${theme})`} />
        </g>

        {/* Right Figure (Gold) */}
        <g>
          <circle cx="218" cy="136" r="15" fill={`url(#cfSphereGold_${theme})`} />
          <path d="M166,244 C176,232 192,212 208,190 C222,170 230,152 220,138 C214,148 202,162 188,174 C182,156 178,138 178,124 C180,136 188,156 196,178 C200,192 188,218 166,244 Z"
                fill={`url(#cfGoldFig_${theme})`} />
        </g>

        {/* Hands Base Cradle */}
        <g>
          <path d="M168,292 C146,290 102,274 68,232 C40,198 32,158 28,144 C34,164 48,208 86,242 C120,272 152,284 168,292 Z"
                fill={`url(#cfBlueHands_${theme})`} />
          <path d="M168,292 C150,286 114,264 88,228 C68,200 66,172 68,162 C74,178 88,208 116,234 C142,258 158,276 168,292 Z"
                fill={`url(#cfBlueFig_${theme})`} opacity="0.9" />

          <path d="M168,292 C190,290 234,274 268,232 C296,198 304,158 308,144 C302,164 288,208 250,242 C216,272 184,284 168,292 Z"
                fill={`url(#cfBlueHands_${theme})`} />
          <path d="M168,292 C186,286 222,264 248,228 C268,200 270,172 268,162 C262,178 248,208 220,234 C194,258 178,276 168,292 Z"
                fill={`url(#cfBlueFig_${theme})`} opacity="0.9" />

          <path d="M168,292 C158,280 148,260 152,246 C158,258 164,272 168,292 C172,272 178,258 184,246 C188,260 178,280 168,292 Z"
                fill={`url(#cfBlueHands_${theme})`} />
        </g>
      </g>

      {/* ==================== VERTICAL GOLDEN DIVIDER ==================== */}
      <rect x="330" y="66" width="6" height="210" rx="3" fill={`url(#cfCrossGrad_${theme})`} />

      {/* ==================== TYPOGRAPHY & LOGOTYPE ==================== */}
      <g id="cf-logotype">
        {/* Main "Charis" Wordmark with standard dot clipped */}
        <text
          x="354"
          y="180"
          clipPath={`url(#cfClipDot_${theme})`}
          fontFamily="'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="124"
          fontWeight="900"
          letterSpacing="-1.5"
          fill={textColor}
        >
          Charis
        </text>

        {/* Signature 3D Glowing Golden Sphere as dot on 'i' */}
        <g filter={`url(#cfGlowSphere_${theme})`}>
          <circle cx="671" cy="78" r="22.5" fill={`url(#cfSphereGold_${theme})`} />
          {/* Inner specular highlight reflection */}
          <ellipse cx="665" cy="71" rx="7" ry="4" fill="#FFFFFF" opacity="0.75" />
        </g>

        {/* "Foundation Nigeria" Secondary Line */}
        <text
          x="356"
          y="238"
          fontFamily="'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="41"
          fontWeight="700"
          letterSpacing="0.4"
          fill={subtextColor}
          style={{ fontSize: '41px' }}
        >
          Foundation Nigeria
        </text>

        {/* Golden Horizontal Baseline Rule */}
        <rect x="356" y="254" width="440" height="7" rx="3.5" fill={`url(#cfCrossGrad_${theme})`} />
      </g>
    </svg>
  );
};
