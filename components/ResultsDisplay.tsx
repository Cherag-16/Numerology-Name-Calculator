import React from 'react'

interface ResultsDisplayProps {
  analysis: {
    total: number
    reduced: number
    characters?: Array<{ char: string; number: number }>
    digits?: Array<{ digit: string; number: number }>
  }
  isMobile?: boolean
}

export default function ResultsDisplay({ analysis, isMobile = false }: ResultsDisplayProps) {
  const itemCount = isMobile ? analysis.digits?.length ?? 0 : analysis.characters?.length ?? 0
  const itemLabel = isMobile ? 'Digits' : 'Characters'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Sum Display */}
      <div className="p-5 bg-primary/8 rounded-lg border border-primary/15 space-y-2">
        <p className="text-sm text-foreground/70 font-medium">Total Sum</p>
        <div className="text-4xl font-bold text-primary">{analysis.total}</div>
        <p className="text-xs text-foreground/50">Raw numerological value</p>
      </div>

      {/* Reduced Number Display */}
      <div className="p-5 bg-secondary/8 rounded-lg border border-secondary/15 space-y-2">
        <p className="text-sm text-foreground/70 font-medium">Reduced Number</p>
        <div className="text-4xl font-bold text-secondary">{analysis.reduced}</div>
        <p className="text-xs text-foreground/50">Your destiny number</p>
      </div>

      {/* Character/Digit Count */}
      <div className="p-5 bg-accent/8 rounded-lg border border-accent/15 space-y-2">
        <p className="text-sm text-foreground/70 font-medium">{itemLabel}</p>
        <div className="text-4xl font-bold text-accent">{itemCount}</div>
        <p className="text-xs text-foreground/50">Analyzed {itemLabel.toLowerCase()}</p>
      </div>
    </div>
  )
}
