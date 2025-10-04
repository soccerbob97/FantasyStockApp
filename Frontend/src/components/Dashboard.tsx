import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Award,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { User, Portfolio } from '../App'

type DashboardProps = {
  user: User
  portfolio: Portfolio | null
}

// Mock data for charts and recent activity
const portfolioData = [
  { date: 'Mon', value: 100000 },
  { date: 'Tue', value: 101200 },
  { date: 'Wed', value: 99800 },
  { date: 'Thu', value: 103400 },
  { date: 'Fri', value: 105420 },
]

const recentTrades = [
  { symbol: 'AAPL', action: 'BUY', shares: 10, price: 185, time: '2 hours ago' },
  { symbol: 'GOOGL', action: 'SELL', shares: 5, price: 2850, time: '1 day ago' },
  { symbol: 'MSFT', action: 'BUY', shares: 15, price: 365, time: '2 days ago' },
]

const marketNews = [
  {
    title: 'Tech Stocks Rally on AI Optimism',
    summary: 'Major technology companies see gains as artificial intelligence investment continues to drive market sentiment.',
    time: '1 hour ago',
    category: 'Technology'
  },
  {
    title: 'Federal Reserve Signals Rate Stability',
    summary: 'Central bank maintains current interest rate policy, providing clarity for investors.',
    time: '3 hours ago',
    category: 'Economic Policy'
  },
  {
    title: 'ESG Investing Reaches New Milestone',
    summary: 'Environmental, social, and governance focused funds attract record inflows this quarter.',
    time: '5 hours ago',
    category: 'ESG'
  }
]

export function Dashboard({ user, portfolio }: DashboardProps) {
  const topHolding = portfolio?.holdings?.[0]
  const totalReturn = portfolio ? ((portfolio.totalValue - 100000) / 100000) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">
            Here's how your portfolio is performing today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {user.achievements.length > 0 && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Award className="h-3 w-3" />
              <span>{user.achievements.length} achievements</span>
            </Badge>
          )}
          {user.teamId && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>Team Member</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${portfolio?.totalValue.toLocaleString() || '100,000'}
            </div>
            <div className="flex items-center space-x-1 text-sm">
              {totalReturn >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500" />
              )}
              <span className={totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}>
                {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
              </span>
              <span className="text-muted-foreground">from start</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Available Cash</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${portfolio?.cash.toLocaleString() || '100,000'}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready to invest
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Top Holding</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {topHolding?.symbol || 'None'}
            </div>
            {topHolding && (
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-muted-foreground">{topHolding.shares} shares</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Learning Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((user.completedEducation.length / 10) * 100)}%
            </div>
            <Progress value={(user.completedEducation.length / 10) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Your portfolio value over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Portfolio Value']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
            <CardDescription>Your latest investment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Badge variant={trade.action === 'BUY' ? 'default' : 'secondary'}>
                      {trade.action}
                    </Badge>
                    <div>
                      <p className="font-medium">{trade.symbol}</p>
                      <p className="text-sm text-muted-foreground">
                        {trade.shares} shares @ ${trade.price}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{trade.time}</p>
                </div>
              ))}
              {recentTrades.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No trades yet</p>
                  <Button variant="outline" className="mt-2">
                    Make Your First Trade
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market News */}
      <Card>
        <CardHeader>
          <CardTitle>Market News & Insights</CardTitle>
          <CardDescription>Stay informed with the latest market developments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketNews.map((news, index) => (
              <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {news.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{news.time}</span>
                </div>
                <h3 className="font-medium mb-2">{news.title}</h3>
                <p className="text-sm text-muted-foreground">{news.summary}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3>Explore Investments</h3>
              <p className="text-sm text-muted-foreground">Browse stocks and make trades</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3>Join a Team</h3>
              <p className="text-sm text-muted-foreground">Compete with friends</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="bg-primary/10 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3>Continue Learning</h3>
              <p className="text-sm text-muted-foreground">Take the next lesson</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}