'use client'

/**
 * Subtle AI workflow visualization
 * Features: thin lines, small nodes, minimal labels, low contrast
 * Accent: one crimson node for subtle visual interest
 */
export function WorkflowVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ultra-subtle grid background */}
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              opacity="0.05"
            />
          </pattern>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="500" height="500" fill="url(#grid)" />

        {/* Workflow connections - ultra-thin lines with fade effect */}
        <g stroke="url(#fadeGradient)" fill="none" strokeWidth="0.8">
          {/* Primary flow path */}
          <path 
            d="M 100 150 L 200 150 L 200 200 L 250 200" 
            opacity="0.3"
          />
          <path 
            d="M 300 150 L 350 150 L 350 200 L 300 200" 
            opacity="0.25"
          />
          <path 
            d="M 250 250 L 250 300 L 220 320" 
            opacity="0.3"
          />
          <path 
            d="M 250 250 L 250 300 L 280 320" 
            opacity="0.25"
          />
          
          {/* Secondary connections */}
          <line x1="150" y1="150" x2="150" y2="220" opacity="0.15" />
          <line x1="325" y1="175" x2="325" y2="220" opacity="0.15" />
        </g>

        {/* Workflow nodes - minimal and subtle */}
        <g>
          {/* Input nodes */}
          <circle cx="100" cy="150" r="3" fill="currentColor" opacity="0.15" />
          <circle cx="150" cy="150" r="2.5" fill="currentColor" opacity="0.1" />
          
          {/* Processing nodes */}
          <circle cx="200" cy="150" r="4" fill="currentColor" opacity="0.2" />
          <circle cx="300" cy="150" r="3.5" fill="currentColor" opacity="0.18" />
          
          {/* Analysis nodes */}
          <circle cx="250" cy="200" r="3" fill="currentColor" opacity="0.15" />
          <circle cx="150" cy="240" r="2.5" fill="currentColor" opacity="0.12" />
          <circle cx="325" cy="240" r="2.5" fill="currentColor" opacity="0.12" />
          
          {/* Central accent node - subtle crimson with glow */}
          <circle 
            cx="250" 
            cy="260" 
            r="12" 
            fill="#991B1B" 
            opacity="0.08"
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <circle 
            cx="250" 
            cy="260" 
            r="5" 
            fill="#991B1B" 
            opacity="0.5"
          />
          <circle 
            cx="250" 
            cy="260" 
            r="2.5" 
            fill="#7F1D1D" 
            opacity="0.8"
          />
          
          {/* Output nodes */}
          <circle cx="220" cy="340" r="3" fill="currentColor" opacity="0.15" />
          <circle cx="280" cy="340" r="3" fill="currentColor" opacity="0.15" />
        </g>

        {/* Minimal labels - barely visible */}
        <g
          fontSize="8"
          fill="currentColor"
          opacity="0.12"
          fontFamily="system-ui"
          letterSpacing="0.5"
        >
          <text x="100" y="138" textAnchor="middle">input</text>
          <text x="250" y="188" textAnchor="middle">process</text>
          <text x="250" y="358" textAnchor="middle">output</text>
        </g>

        {/* Subtle data flow indicators */}
        <g opacity="0.08">
          <circle cx="175" cy="150" r="1.5" fill="currentColor">
            <animate
              attributeName="opacity"
              values="0;0.3;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="275" cy="200" r="1.5" fill="currentColor">
            <animate
              attributeName="opacity"
              values="0;0.3;0"
              dur="3s"
              begin="1s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="235" cy="280" r="1.5" fill="#991B1B">
            <animate
              attributeName="opacity"
              values="0;0.5;0"
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
