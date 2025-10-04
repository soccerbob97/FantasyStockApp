import React, { useState, useEffect } from 'react'
import { AuthPage } from './components/AuthPage'
import { HomePage } from './components/HomePage'
import { PortfolioPage } from './components/PortfolioPage'
import { ProfilePage } from './components/ProfilePage'
import { BottomNavigation } from './components/BottomNavigation'
import { Toaster } from './components/ui/sonner'

export type User = {
  id: string
  name: string
  email: string
  avatar: string
  interests: string[]
  teamId?: string
  portfolioValue: number
  totalReturn: number
  achievements: string[]
  completedEducation: string[]
}

export type Stock = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  category: string
}

export type Portfolio = {
  userId: string
  cash: number
  totalValue: number
  holdings: Array<{
    symbol: string
    shares: number
    avgPrice: number
    currentPrice: number
  }>
}

export type Team = {
  id: string
  name: string
  members: User[]
  totalValue: number
  weeklyReturn: number
  rank: number
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentView, setCurrentView] = useState<string>('discover')
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)

  // Mock authentication
  const handleLogin = (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      name: 'Alex Rivera',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      interests: ['Technology', 'Green Energy', 'Finance'],
      teamId: 'team-1',
      portfolioValue: 102450,
      totalReturn: 2.45,
      achievements: ['first-trade', 'week-winner', 'diversified-portfolio', 'green-investor', 'tech-guru', 'profit-master', 'risk-taker', 'steady-hand'],
      completedEducation: ['basics-101', 'risk-management', 'portfolio-building', 'market-analysis']
    }
    setCurrentUser(mockUser)
    setCurrentView('discover')
    
    // Initialize portfolio with comprehensive mock data
    setPortfolio({
      userId: mockUser.id,
      cash: 45230,
      totalValue: 102450,
      holdings: [
        { symbol: 'NVDA', shares: 10, avgPrice: 450, currentPrice: 495.20 },
        { symbol: 'AAPL', shares: 15, avgPrice: 175, currentPrice: 178.50 },
        { symbol: 'TSLA', shares: 8, avgPrice: 230, currentPrice: 242.80 },
        { symbol: 'MSFT', shares: 5, avgPrice: 370, currentPrice: 378.90 },
        { symbol: 'LLY', shares: 3, avgPrice: 565, currentPrice: 598.40 }
      ]
    })
  }

  const handleSignup = (name: string, email: string, password: string, interests: string[]) => {
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      interests: interests.length > 0 ? interests : ['Technology', 'Healthcare'],
      portfolioValue: 100000,
      totalReturn: 0,
      achievements: [],
      completedEducation: []
    }
    setCurrentUser(mockUser)
    setCurrentView('discover')
    
    // Initialize starting portfolio
    setPortfolio({
      userId: mockUser.id,
      cash: 100000,
      totalValue: 100000,
      holdings: []
    })
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setPortfolio(null)
    setCurrentView('discover')
  }

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'discover':
        return <HomePage user={currentUser} />
      case 'portfolio':
        return <PortfolioPage user={currentUser} portfolio={portfolio} />
      case 'profile':
        return <ProfilePage user={currentUser} onLogout={handleLogout} />
      default:
        return <HomePage user={currentUser} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        {renderCurrentView()}
      </main>
      <BottomNavigation 
        currentView={currentView} 
        setCurrentView={setCurrentView}
      />
      <Toaster />
    </div>
  )
}