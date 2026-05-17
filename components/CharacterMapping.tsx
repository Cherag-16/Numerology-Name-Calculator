import React from 'react'
import { Badge } from '@/components/ui/badge'

interface CharacterMappingProps {
  characters: Array<{ char: string; number: number }>
  total: number
}

export default function CharacterMapping({ characters, total }: CharacterMappingProps) {
  if (characters.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No characters to display</div>
  }

  return (
    <div className="space-y-6">
      {/* Visual Breakdown */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {characters.map((char, index) => (
            <div key={index} className="group">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg border border-primary/20 hover:border-primary/50 transition-all">
                <span className="font-serif text-lg font-bold text-foreground">{char.char}</span>
                <span className="text-xs text-muted-foreground">→</span>
                <Badge className="bg-primary text-primary-foreground">{char.number}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculation Display */}
      <div className="p-4 bg-card border border-primary/20 rounded-lg space-y-3">
        <div className="text-sm font-mono">
          <div className="flex flex-wrap items-center gap-2 text-foreground">
            <span>Calculation:</span>
            {characters.map((char, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-primary font-bold">+</span>}
                <span className="px-2 py-1 bg-primary/10 rounded text-primary font-bold">{char.number}</span>
              </React.Fragment>
            ))}
            <span className="text-primary font-bold">=</span>
            <span className="px-3 py-1 bg-primary/20 rounded text-primary font-bold text-lg">{total}</span>
          </div>
        </div>

        {/* Step-by-step reduction */}
        <ReductionProcess total={total} />
      </div>
    </div>
  )
}

function ReductionProcess({ total }: { total: number }) {
  const steps: number[] = []
  let current = total

  while (current >= 10) {
    steps.push(current)
    current = current
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  steps.push(current)

  if (steps.length <= 1) {
    return null
  }

  return (
    <div className="pt-3 border-t border-primary/10 space-y-2">
      <p className="text-sm text-muted-foreground font-semibold">Reduction to Single Digit:</p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-primary font-bold">→</span>}
            <span className="px-2 py-1 bg-muted/50 rounded text-foreground font-mono">
              {step}
              {index < steps.length - 1 && ` (${step.toString().split('').join(' + ')})`}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
