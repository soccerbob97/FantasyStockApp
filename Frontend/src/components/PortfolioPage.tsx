import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  PieChart,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts'
import type { User, Portfolio } from '../App'

type PortfolioPageProps = {
  user: User
  portfolio: Portfolio | null
}

// Mock data for charts
const portfolioData = [
  { day: 'Mon', value: 97000 },
  { day: 'Tue', value: 98500 },
  { day: 'Wed', value: 99750 },
  { day: 'Thu', value: 101200 },
  { day: 'Fri', value: 102450 },
]

const sectorData = [
  { name: 'Technology', value: 40, color: '#3B82F6' },
  { name: 'Healthcare', value: 23, color: '#EF4444' },
  { name: 'Green Energy', value: 18, color: '#10B981' },
  { name: 'Finance', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 7, color: '#9333EA' }
]

const MACRO_PULSE = [
  { label: 'Inflation (CPI)', value: '3.2%', trend: 'down', description: 'Decreased from last month' },
  { label: 'Interest Rate', value: '5.25%', trend: 'stable', description: 'Fed holds rates steady' },
  { label: 'GDP Growth', value: '2.4%', trend: 'up', description: 'Q3 beats expectations' },
  { label: 'Unemployment', value: '3.8%', trend: 'stable', description: 'Job market remains strong' }
]

export function PortfolioPage({ user, portfolio }: PortfolioPageProps) {
  const [showBalance, setShowBalance] = useState(true)
  const [expandedHolding, setExpandedHolding] = useState<string | null>(null)

  const totalReturn = portfolio ? ((portfolio.totalValue - 100000) / 100000) * 100 : 2.5
  const todayChange = 2450
  const todayChangePercent = 2.4
  const weekChange = 5670
  const weekChangePercent = 5.8
  const monthChange = 8920
  const monthChangePercent = 9.2

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-xl font-semibold">Portfolio</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium opacity-90">Portfolio Value</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold">
                  {showBalance ? `$${portfolio?.totalValue.toLocaleString() || '100,000'}` : '••••••'}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  {totalReturn >= 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-lg">
                    {showBalance ? `${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)}%` : '••••'}
                  </span>
                  <span className="text-sm opacity-75">all time</span>
                </div>
              </div>
              
              {/* Mini Chart */}
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="rgba(255,255,255,0.8)" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Today</div>
              <div className={`font-semibold ${todayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {showBalance ? `${todayChange >= 0 ? '+' : ''}$${Math.abs(todayChange).toFixed(2)}` : '••••'}
              </div>
              <div className={`text-xs ${todayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {showBalance ? `${todayChangePercent >= 0 ? '+' : ''}${todayChangePercent.toFixed(2)}%` : '••••'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">This Week</div>
              <div className={`font-semibold ${weekChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {showBalance ? `${weekChange >= 0 ? '+' : ''}$${Math.abs(weekChange).toFixed(2)}` : '••••'}
              </div>
              <div className={`text-xs ${weekChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {showBalance ? `${weekChangePercent >= 0 ? '+' : ''}${weekChangePercent.toFixed(2)}%` : '••••'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Cash</div>
              <div className="font-semibold">
                {showBalance ? `$${portfolio?.cash.toLocaleString() || '100,000'}` : '••••••'}
              </div>
              <div className="text-xs text-gray-500">Available</div>
            </CardContent>
          </Card>
        </div>

        {/* My Investments */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Investments</h2>
            <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-500">
              <Plus className="w-4 h-4 mr-2" />
              Add Stock
            </Button>
          </div>
          
          {portfolio?.holdings && portfolio.holdings.length > 0 ? (
            <div className="space-y-3">
              {portfolio.holdings.map((holding) => {
                const currentValue = holding.shares * holding.currentPrice
                const costBasis = holding.shares * holding.avgPrice
                const gainLoss = currentValue - costBasis
                const gainLossPercent = (gainLoss / costBasis) * 100
                const isExpanded = expandedHolding === holding.symbol

                return (
                  <Card key={holding.symbol} className="overflow-hidden">
                    <CardContent 
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedHolding(isExpanded ? null : holding.symbol)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {holding.symbol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{holding.symbol}</h3>
                            <p className="text-sm text-gray-600">
                              {holding.shares} shares • ${holding.avgPrice.toFixed(2)} avg
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">
                            {showBalance ? `$${currentValue.toFixed(2)}` : '••••••'}
                          </div>
                          <div className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {showBalance ? (
                              <>
                                {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                              </>
                            ) : '••••••'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Portfolio Percentage Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Portfolio allocation</span>
                          <span>{((currentValue / (portfolio?.totalValue || 1)) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={(currentValue / (portfolio?.totalValue || 1)) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-4">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Buy More
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                              Sell
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium mb-2">Start investing</h3>
              <p className="text-gray-600 text-sm mb-4">
                Build your portfolio with your first stock purchase
              </p>
              <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500">
                <Plus className="w-4 h-4 mr-2" />
                Buy Your First Stock
              </Button>
            </Card>
          )}
        </section>

        {/* Portfolio Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 w-5" />
              <span>Portfolio Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 42 42" className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  {sectorData.map((sector, index) => {
                    const offset = sectorData.slice(0, index).reduce((sum, s) => sum + s.value, 0)
                    const circumference = 2 * Math.PI * 15.915
                    const strokeDasharray = `${(sector.value / 100) * circumference} ${circumference}`
                    const strokeDashoffset = -((offset / 100) * circumference)
                    
                    return (
                      <circle
                        key={sector.name}
                        cx="21"
                        cy="21"
                        r="15.915"
                        fill="transparent"
                        stroke={sector.color}
                        strokeWidth="3"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    )
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {showBalance ? `$${portfolio?.totalValue.toLocaleString() || '100K'}` : '••••••'}
                    </div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {sectorData.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: sector.color }}
                    />
                    <span className="text-sm">{sector.name}</span>
                  </div>
                  <span className="text-sm font-medium">{sector.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Macro Pulse */}
        <section>
          <h2 className="text-lg font-semibold mb-4">📊 Macro Pulse</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {MACRO_PULSE.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{item.label}</h4>
                        {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-600" />}
                        {item.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-600" />}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <div className={`text-lg font-bold ${
                      item.trend === 'up' ? 'text-green-600' : 
                      item.trend === 'down' ? 'text-red-600' : 
                      'text-gray-900'
                    }`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Performance Stats */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="space-y-1">
                <p className="text-xs text-gray-600">Today's Change</p>
                <p className="text-xl font-bold text-green-600">
                  +${todayChange.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">+{todayChangePercent}%</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="space-y-1">
                <p className="text-xs text-gray-600">Week's Change</p>
                <p className="text-xl font-bold text-blue-600">
                  +${weekChange.toLocaleString()}
                </p>
                <p className="text-sm text-blue-600">+{weekChangePercent}%</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50">
              <div className="space-y-1">
                <p className="text-xs text-gray-600">Month's Change</p>
                <p className="text-xl font-bold text-teal-600">
                  +${monthChange.toLocaleString()}
                </p>
                <p className="text-sm text-teal-600">+{monthChangePercent}%</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-gray-50 to-slate-50">
              <div className="space-y-1">
                <p className="text-xs text-gray-600">Cash Available</p>
                <p className="text-xl font-bold text-gray-900">
                  ${portfolio?.cash.toLocaleString() || '45,230'}
                </p>
                <p className="text-sm text-gray-600">Ready to invest</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}