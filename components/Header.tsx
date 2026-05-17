import React from 'react'

export default function Header() {
  return (
    <header className="border-b border-primary/20 bg-gradient-to-r from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Decorative subtle elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="space-y-2">
            <div className="text-sm tracking-widest uppercase text-primary/70 font-semibold">ॐ Hindu Vedic Numerology ॐ</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance text-orange-400">
              Numerology Calculator
            </h1>
            <p className="text-base text-secondary">Discover Your Spiritual Number Through Ancient Chaldean Wisdom</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="text-xl text-primary">☆</span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </div>
    </header>
  )
}
