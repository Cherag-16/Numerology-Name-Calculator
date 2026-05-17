'use client'

import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/Header'
import ResultsDisplay from '@/components/ResultsDisplay'


const CHALDEAN_CHART: Record<number, string[]> = {
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
  const [mobileNumber, setMobileNumber] = useState('')


  const nameAnalysis = useMemo(() => {
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

  const mobileAnalysis = useMemo(() => {
    if (!mobileNumber.trim()) {
      return {
        digits: [],
        total: 0,
        reduced: 0,
      }
    }

    const digits: Array<{ digit: string; number: number }> = []
    let total = 0

    for (const digit of mobileNumber) {
      if (/\d/.test(digit)) {
        const num = parseInt(digit)
        digits.push({ digit, number: num })
        total += num
      }
    }

    const reduced = reduceNumber(total)

    return { digits, total, reduced }
  }, [mobileNumber])

  return (  
    <div className="min-h-screen bg-background relative">
      <Header />
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-32 right-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid gap-8 max-w-3xl mx-auto">
          {/* Name Calculator */}
          <Card className="border-primary/15 shadow-md shadow-primary/5 hover:shadow-primary/10 transition-shadow">
            <CardHeader className="bg-gradient-to-br from-primary/8 to-transparent border-b border-primary/10">
              <CardTitle className="text-3xl text-balance text-primary">Enter Your Name</CardTitle>
              <CardDescription className="text-secondary">
                Discover your spiritual numerology number using the ancient Chaldean system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Input
                  placeholder="Type your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg h-12 bg-input border-primary/20 focus-visible:border-primary placeholder:text-muted-foreground/40"
                />
              </div>

              {/* Results Preview */}
              {name.trim() && (
                <div className="space-y-4 pt-4 border-t border-primary/10">
                  <ResultsDisplay analysis={nameAnalysis} />
                </div>
              )}

              {/* Unrecognized Characters Warning */}
              {nameAnalysis.unrecognized.length > 0 &&  (
                <div className="p-4 bg-accent/8 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Note:</span> Characters not recognized in the Chaldean system:{' '}
                    <Badge variant="secondary" className="ml-2">
                      {nameAnalysis.unrecognized.join(', ')}
                    </Badge> 
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mobile Number Calculator */}
          <Card className="border-primary/15 shadow-md shadow-primary/5 hover:shadow-primary/10 transition-shadow">
            <CardHeader className="bg-gradient-to-br from-accent/8 to-transparent border-b border-primary/10">
              <CardTitle className="text-3xl text-balance text-primary">Enter Your Mobile Number</CardTitle>
              <CardDescription className="text-secondary">
                Calculate the numerological value of your mobile phone number
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Input
                  placeholder="Type your mobile number..."
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="text-lg h-12 bg-input border-primary/20 focus-visible:border-primary placeholder:text-muted-foreground/40"
                />
              </div>

              {/* Results Preview */}
              {mobileNumber.trim() && (
                <div className="space-y-4 pt-4 border-t border-primary/10">
                  <ResultsDisplay analysis={mobileAnalysis} isMobile={true} />
                </div>
              )}
            </CardContent>
          </Card>
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
