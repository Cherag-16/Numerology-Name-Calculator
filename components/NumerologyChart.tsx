import React from 'react'
import { Badge } from '@/components/ui/badge'

interface NumerologyChartProps {
  chart: Record<number, string[]>
}

export default function NumerologyChart({ chart }: NumerologyChartProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(chart)
          .filter(([_, letters]) => letters.length > 0)
          .map(([number, letters]) => (
            <div key={number} className="space-y-2 p-3 bg-muted/30 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground text-sm font-bold min-w-8 justify-center">{number}</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {letters.map((letter) => (
                  <span key={letter} className="text-sm font-medium text-foreground">
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div className="text-xs text-muted-foreground p-2 border-t border-primary/10 pt-3 mt-3">
        <p className="font-semibold mb-1">Chaldean Numerology</p>
        <p>Each letter has a specific vibration associated with ancient numerological principles</p>
      </div>
    </div>
  )
}
