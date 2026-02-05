'use client'

interface WorkflowVisualProps {
  isDark?: boolean
}

/**
 * Subtle AI workflow visualization
 * Adapts to light or dark backgrounds
 * Features: thin lines, small nodes, minimal labels, low contrast
 * Accent: one crimson node for subtle visual interest
 */
export function WorkflowVisual({ isDark = false }: WorkflowVisualProps) {
  // Adjust colors based on background
  const textColor = isDark ? '#F5F5F5' : 'currentColor'
  const lineOpacity = isDark ? 0.15 : 0.15
  const nodeOpacity = isDark ? 0.25 : 0.15
  const labelOpacity = isDark ? 0.18 : 0.12
  const gridOpacity = isDark ? 0.08 : 0.05
  const crimsonColor = '#991B1B'
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Grid background with dots pattern */}
        <defs>
          {/* Dot grid pattern */}
          <pattern
            id={`dotGrid-${isDark ? 'dark' : 'light'}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle 
              cx="20" 
              cy="20" 
              r="1" 
              fill={textColor} 
              opacity={gridOpacity}
            />
          </pattern>
          
          {/* Gradient for lines */}
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={textColor} stopOpacity="0" />
            <stop offset="50%" stopColor={textColor} stopOpacity={lineOpacity} />
            <stop offset="100%" stopColor={textColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Background with dots */}
        <rect width="500" height="500" fill={`url(#dotGrid-${isDark ? 'dark' : 'light'})`} />

        {/* Workflow connections - ultra-thin lines */}
        <g stroke={textColor} fill="none" strokeWidth="0.8" opacity={lineOpacity}>
          {/* Primary flow path */}
          <path d="M 100 150 L 200 150 L 200 200 L 250 200" />
          <path d="M 300 150 L 350 150 L 350 200 L 300 200" opacity="0.8" />
          <path d="M 250 250 L 250 300 L 220 320" />
          <path d="M 250 250 L 250 300 L 280 320" opacity="0.8" />
          
          {/* Secondary connections */}
          <line x1="150" y1="150" x2="150" y2="220" opacity="0.6" />
          <line x1="325" y1="175" x2="325" y2="220" opacity="0.6" />
        </g>

        {/* Workflow nodes - minimal and subtle */}
        <g>
          {/* Input nodes */}
          <circle cx="100" cy="150" r="3" fill={textColor} opacity={nodeOpacity} />
          <circle cx="150" cy="150" r="2.5" fill={textColor} opacity={nodeOpacity * 0.7} />
          
          {/* Processing nodes */}
          <circle cx="200" cy="150" r="4" fill={textColor} opacity={nodeOpacity * 1.2} />
          <circle cx="300" cy="150" r="3.5" fill={textColor} opacity={nodeOpacity} />
          
          {/* Analysis nodes */}
          <circle cx="250" cy="200" r="3" fill={textColor} opacity={nodeOpacity} />
          <circle cx="150" cy="240" r="2.5" fill={textColor} opacity={nodeOpacity * 0.8} />
          <circle cx="325" cy="240" r="2.5" fill={textColor} opacity={nodeOpacity * 0.8} />
          
          {/* Central accent node - crimson with soft halo */}
          <circle 
            cx="250" 
            cy="260" 
            r="16" 
            fill={crimsonColor} 
            opacity="0.10"
          />
          <circle 
            cx="250" 
            cy="260" 
            r="6" 
            fill={crimsonColor} 
            opacity="0.85"
          />
          
          {/* Output nodes */}
          <circle cx="220" cy="340" r="3" fill={textColor} opacity={nodeOpacity} />
          <circle cx="280" cy="340" r="3" fill={textColor} opacity={nodeOpacity} />
        </g>

        {/* Minimal labels - barely visible */}
        <g
          fontSize="8"
          fill={textColor}
          opacity={labelOpacity}
          fontFamily="system-ui"
          letterSpacing="0.5"
        >
          <text x="100" y="138" textAnchor="middle">input</text>
          <text x="250" y="188" textAnchor="middle">process</text>
          <text x="250" y="358" textAnchor="middle">output</text>
        </g>

        {/* Subtle data flow indicators */}
        <g opacity="0.15">
          <circle cx="175" cy="150" r="1.5" fill={textColor}>
            <animate
              attributeName="opacity"
              values="0;0.5;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="275" cy="200" r="1.5" fill={textColor}>
            <animate
              attributeName="opacity"
              values="0;0.5;0"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="235" cy="280" r="1.5" fill={crimsonColor}>
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="3s"
              begin="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  )
}
