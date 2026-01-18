'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/Header'
import NumerologyChart from '@/components/NumerologyChart'
import ResultsDisplay from '@/components/ResultsDisplay'
import CharacterMapping from '@/components/CharacterMapping'

const CHALDEAN_CHART = {
  1: ['A', 'I', 'J', 'Q', 'Y'],
  2: ['B', 'K', 'R'],
  3: ['C', 'G', 'L', 'S'],
  4: ['D', 'M', 'T'],
  5: ['E', 'H', 'N', 'X'],
  6: ['U', 'V', 'W'],
  7: ['O', 'Z'],
  8: ['F', 'P'],
  9: [],
}

export default function Home() {
  const [name, setName] = useState('')
  const [showChart, setShowChart] = useState(true)

  const analysis = useMemo(() => {
    if (!name.trim()) {
      return {
        characters: [],
        total: 0,
        reduced: 0,
        unrecognized: [],
      }
    }

    const upperName = name.toUpperCase()
    const characters: Array<{ char: string; number: number }> = []
    const unrecognized: string[] = []
    let total = 0

    for (const char of upperName) {
      if (char === ' ') continue

      let found = false
      for (const [num, letters] of Object.entries(CHALDEAN_CHART)) {
        if (letters.includes(char)) {
          characters.push({ char, number: parseInt(num) })
          total += parseInt(num)
          found = true
          break
        }
      }

      if (!found && char !== ' ') {
        unrecognized.push(char)
      }
    }

    const reduced = reduceNumber(total)

    return { characters, total, reduced, unrecognized }
  }, [name])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          {/* Main Input Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Input Column */}
            <div className="md:col-span-2">
              <Card className="border-primary/20 h-full">
                <CardHeader>
                  <CardTitle className="text-3xl text-balance">Enter Your Name</CardTitle>
                  <CardDescription>
                    Discover your spiritual numerology number using the ancient Chaldean system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Input
                      placeholder="Type your name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-lg h-12 bg-card border-primary/30 focus-visible:border-primary"
                    />
                  </div>

                  {/* Results Preview */}
                  {name.trim() && (
                    <div className="space-y-4 pt-4 border-t border-primary/20">
                      <ResultsDisplay analysis={analysis} />
                    </div>
                  )}

                  {/* Unrecognized Characters Warning */}
                  {analysis.unrecognized.length > 0 && (
                    <div className="p-3 bg-muted/50 rounded-lg border border-primary/10">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Note:</span> Characters not recognized in the Chaldean system:{' '}
                        <Badge variant="secondary" className="ml-2">
                          {analysis.unrecognized.join(', ')}
                        </Badge>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Chart Column */}
            <div className="md:col-span-1">
              <Card className="border-primary/20 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Chaldean Chart</span>
                    <button
                      onClick={() => setShowChart(!showChart)}
                      className="text-xs font-normal text-primary hover:text-primary/80 transition-colors"
                    >
                      {showChart ? 'Hide' : 'Show'}
                    </button>
                  </CardTitle>
                </CardHeader>
                {showChart && (
                  <CardContent>
                    <NumerologyChart chart={CHALDEAN_CHART} />
                  </CardContent>
                )}
              </Card>
            </div>
          </div>

          {/* Character Mapping Section */}
          {name.trim() && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Character-to-Number Breakdown</CardTitle>
                <CardDescription>
                  Detailed mapping of each character in your name to its numerological value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CharacterMapping characters={analysis.characters} total={analysis.total} />
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

// Helper function to reduce numbers to single digit
function reduceNumber(num: number): number {
  if (num < 10) return num
  const sum = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  return reduceNumber(sum)
}
