import React from 'react'
import { Badge } from '@/components/ui/badge'

interface ResultsDisplayProps {
  analysis: {
    characters: Array<{ char: string; number: number }>
    total: number
    reduced: number
    unrecognized: string[]
  }
}

export default function ResultsDisplay({ analysis }: ResultsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Sum Display */}
      <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 space-y-2">
        <p className="text-sm text-muted-foreground font-medium">Total Sum</p>
        <div className="text-3xl font-bold text-primary">{analysis.total}</div>
        <p className="text-xs text-muted-foreground">Raw numerological value</p>
      </div>

      {/* Reduced Number Display */}
      <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 space-y-2">
        <p className="text-sm text-muted-foreground font-medium">Reduced Number</p>
        <div className="text-3xl font-bold text-primary">{analysis.reduced}</div>
        <p className="text-xs text-muted-foreground">Your destiny number</p>
      </div>

      {/* Character Count */}
      <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 space-y-2">
        <p className="text-sm text-muted-foreground font-medium">Characters</p>
        <div className="text-3xl font-bold text-primary">{analysis.characters.length}</div>
        <p className="text-xs text-muted-foreground">Analyzed letters</p>
      </div>
    </div>
  )
}
