import React from "react";

interface PcsLogoProps {
  className?: string;
  classNameLogo?: string;
  showText?: boolean;
  textColorClass?: string;
}

export function PcsLogo({ 
  className = "h-9 w-auto", 
  classNameLogo = "",
  showText = true, 
  textColorClass = "text-white"
}: PcsLogoProps) {
  return (
    <div className={`flex items-center gap-2 select-none ${classNameLogo}`}>
      {/* Mathematically precise SVG Vector representation of the official PCS Logo with the Globe "C" shape */}
      <svg 
        viewBox="0 0 160 48" 
        className={`${className} overflow-visible filter drop-shadow-[0_2px_8px_rgba(229,193,88,0.15)] hover:drop-shadow-[0_0_12px_rgba(45,212,191,0.4)] transition-all duration-300`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Clip path for the central globe to mask the grid lines neatly inside the circle */}
          <clipPath id="globe-clip">
            <circle cx="80" cy="24" r="18" />
          </clipPath>
        </defs>

        {/* --- LETTER P --- */}
        <path 
          d="M 16 6 H 34 C 42.5 6 49 12.5 49 20.5 C 49 28.5 42.5 35 34 35 H 25 V 44 H 16 V 6 Z M 25 14 V 27 H 34 C 37.5 27 39.5 25 39.5 20.5 C 39.5 16 37.5 14 34 14 H 25 Z" 
          fill="currentColor"
          className={textColorClass}
        />

        {/* --- LETTER C (Custom Globe integration) --- */}
        {/* Outer subtle shadow/glow ring for the C component */}
        <circle cx="80" cy="24" r="21" fill="#040916" stroke="#1e293b" strokeWidth="0.8" className="opacity-80" />
        
        {/* Golden-orange crescent crescent on the left */}
        <path 
          d="M 80,4 A 20,20 0 0,0 60,24 A 20,20 0 0,0 80,44 A 19,21 0 0,1 62.5,24 A 19,21 0 0,1 80,4 Z" 
          fill="#FB923C" 
        />
        
        {/* Mint-teal/Emerald Globe core */}
        <circle cx="80" cy="24" r="18" fill="#2dd4bf" />

        {/* Intersecting grid lines masked to globe radius */}
        <g clipPath="url(#globe-clip)">
          {/* Longitude lines (valleys and ridges) */}
          <line x1="80" y1="5" x2="80" y2="43" stroke="#070e20" strokeWidth="1" />
          <path d="M 80,5 A 13.5,18 0 0,0 80,43" stroke="#070e20" strokeWidth="1" fill="none" />
          <path d="M 80,5 A 6.5,18 0 0,0 80,43" stroke="#070e20" strokeWidth="1" fill="none" />
          <path d="M 80,5 A 6.5,18 0 0,1 80,43" stroke="#070e20" strokeWidth="1" fill="none" />
          <path d="M 80,5 A 13.5,18 0 0,1 80,43" stroke="#070e20" strokeWidth="1" fill="none" />

          {/* Latitude lines */}
          <line x1="60" y1="24" x2="100" y2="24" stroke="#070e20" strokeWidth="1" />
          <path d="M 60.5,16 Q 80,20 99.5,16" stroke="#070e20" strokeWidth="1" fill="none" />
          <path d="M 64,11.5 Q 80,14.5 96,11.5" stroke="#070e20" strokeWidth="1" fill="none" />
          <path d="M 60.5,32 Q 80,28 99.5,32" stroke="#070e20" strokeWidth="1" fill="none" />
          <path d="M 64,36.5 Q 80,33.5 96,36.5" stroke="#070e20" strokeWidth="1" fill="none" />
        </g>

        {/* --- LETTER S --- */}
        <path 
          d="M 140 15 C 140 10.5 135 7 128 7 C 121 7 116.5 10.5 116.5 15 C 116.5 22.5 140 21.5 140 30 C 140 35.5 135 39 128 39 C 121 39 116.5 35.5 116.5 30 H 125.5 C 125.5 31.5 126.5 33 128 33 C 129.5 33 131 31.5 131 30 C 131 23.5 107.5 22.5 107.5 15 C 107.5 9.5 112 5 128 5 C 137.5 5 149 9.5 149 15 H 140 Z" 
          fill="currentColor"
          className={textColorClass}
        />
      </svg>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span className="text-xs font-black tracking-widest text-white uppercase group-hover:text-gold-400 transition-colors">
            PCS CONSULTANCY
          </span>
          <span className="text-[8px] tracking-wider text-gold-400 font-mono font-bold uppercase mt-0.5">
            PREMIUM DEMAT DESK
          </span>
        </div>
      )}
    </div>
  );
}
