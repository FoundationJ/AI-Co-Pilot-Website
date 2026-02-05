'use client'

/**
 * Subtle AI workflow visualization
 * Features: thin lines, small nodes, minimal labels, low contrast
 * Accent: one crimson node for subtle visual interest
 */
export function WorkflowVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center opacity-40">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle grid pattern */}
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.1"
            />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#grid)" />

        {/* Workflow connections - thin lines */}
        <g stroke="currentColor" fill="none" strokeWidth="1" opacity="0.2">
          {/* Horizontal flow */}
          <line x1="80" y1="120" x2="160" y2="120" />
          <line x1="200" y1="120" x2="280" y2="120" />
          
          {/* Vertical connections */}
          <line x1="180" y1="140" x2="180" y2="200" />
          <line x1="280" y1="140" x2="280" y2="200" />
          
          {/* Diagonal flow */}
          <line x1="180" y1="220" x2="240" y2="260" />
          <line x1="280" y1="220" x2="240" y2="260" />
          
          {/* Lower flow */}
          <line x1="240" y1="280" x2="240" y2="320" />
        </g>

        {/* Workflow nodes */}
        <g>
          {/* Standard nodes - very subtle */}
          <circle cx="80" cy="120" r="4" fill="currentColor" opacity="0.15" />
          <circle cx="180" cy="120" r="5" fill="currentColor" opacity="0.2" />
          <circle cx="280" cy="120" r="4" fill="currentColor" opacity="0.15" />
          <circle cx="180" cy="220" r="4" fill="currentColor" opacity="0.15" />
          <circle cx="280" cy="220" r="4" fill="currentColor" opacity="0.15" />
          <circle cx="240" cy="340" r="4" fill="currentColor" opacity="0.15" />
          
          {/* Accent node - subtle crimson */}
          <circle 
            cx="240" 
            cy="270" 
            r="6" 
            fill="#991B1B" 
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          <circle 
            cx="240" 
            cy="270" 
            r="3" 
            fill="#991B1B" 
            opacity="0.9"
          />
        </g>

        {/* Minimal labels - very subtle */}
        <g
          fontSize="9"
          fill="currentColor"
          opacity="0.15"
          fontFamily="system-ui"
        >
          <text x="70" y="110" textAnchor="middle">input</text>
          <text x="180" y="110" textAnchor="middle">process</text>
          <text x="280" y="110" textAnchor="middle">analyze</text>
          <text x="240" y="355" textAnchor="middle">output</text>
        </g>
      </svg>
    </div>
  )
}
