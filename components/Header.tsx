import React from 'react'

export default function Header() {
  return (
    <header className="border-b border-primary/20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Numerology Calculator
            </h1>
            <p className="text-lg text-muted-foreground">Discover Your Spiritual Number Through Ancient Chaldean Wisdom</p>
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full" />
        </div>
      </div>
    </header>
  )
}
