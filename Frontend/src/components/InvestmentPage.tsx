import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Star,
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'
import type { User, Portfolio, Stock } from '../App'

type InvestmentPageProps = {
  user: User
  portfolio: Portfolio | null
  setPortfolio: (portfolio: Portfolio) => void
}

// Mock stock data
const MOCK_STOCKS: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.43, change: 2.34, changePercent: 1.28, category: 'Tech' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.56, change: -12.45, changePercent: -0.44, category: 'Tech' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 364.78, change: 5.67, changePercent: 1.58, category: 'Tech' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.88, change: -3.22, changePercent: -1.31, category: 'Tech' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 421.33, change: 8.91, changePercent: 2.16, category: 'Tech' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 154.67, change: 1.23, changePercent: 0.80, category: 'Financial' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 167.89, change: 0.45, changePercent: 0.27, category: 'Healthcare' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 152.34, change: -0.78, changePercent: -0.51, category: 'Consumer' },
  { symbol: 'KO', name: 'Coca-Cola Co.', price: 58.76, change: 0.34, changePercent: 0.58, category: 'Consumer' },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 89.45, change: -1.23, changePercent: -1.36, category: 'Entertainment' }
]

const CATEGORIES = ['All', 'Tech', 'Financial', 'Healthcare', 'Consumer', 'Entertainment']

export function InvestmentPage({ user, portfolio, setPortfolio }: InvestmentPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [tradeQuantity, setTradeQuantity] = useState('')
  const [showTradeDialog, setShowTradeDialog] = useState(false)

  // Filter stocks based on search and category
  const filteredStocks = MOCK_STOCKS.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || stock.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleTrade = () => {
    if (!selectedStock || !portfolio) return

    const quantity = parseInt(tradeQuantity)
    const totalCost = quantity * selectedStock.price

    if (tradeType === 'buy') {
      if (portfolio.cash < totalCost) {
        toast.error('Insufficient funds for this trade')
        return
      }

      // Update portfolio with new purchase
      const existingHolding = portfolio.holdings.find(h => h.symbol === selectedStock.symbol)
      let newHoldings

      if (existingHolding) {
        // Update existing holding
        const newAvgPrice = ((existingHolding.avgPrice * existingHolding.shares) + totalCost) / 
                           (existingHolding.shares + quantity)
        newHoldings = portfolio.holdings.map(h => 
          h.symbol === selectedStock.symbol 
            ? { ...h, shares: h.shares + quantity, avgPrice: newAvgPrice, currentPrice: selectedStock.price }
            : h
        )
      } else {
        // Add new holding
        newHoldings = [...portfolio.holdings, {
          symbol: selectedStock.symbol,
          shares: quantity,
          avgPrice: selectedStock.price,
          currentPrice: selectedStock.price
        }]
      }

      const newPortfolio = {
        ...portfolio,
        cash: portfolio.cash - totalCost,
        holdings: newHoldings,
        totalValue: portfolio.totalValue // This would be recalculated in a real app
      }

      setPortfolio(newPortfolio)
      toast.success(`Bought ${quantity} shares of ${selectedStock.symbol}`)
    } else {
      // Handle sell logic
      const holding = portfolio.holdings.find(h => h.symbol === selectedStock.symbol)
      if (!holding || holding.shares < quantity) {
        toast.error('Insufficient shares to sell')
        return
      }

      const newHoldings = portfolio.holdings.map(h => 
        h.symbol === selectedStock.symbol 
          ? { ...h, shares: h.shares - quantity }
          : h
      ).filter(h => h.shares > 0)

      const newPortfolio = {
        ...portfolio,
        cash: portfolio.cash + totalCost,
        holdings: newHoldings,
        totalValue: portfolio.totalValue // This would be recalculated in a real app
      }

      setPortfolio(newPortfolio)
      toast.success(`Sold ${quantity} shares of ${selectedStock.symbol}`)
    }

    setShowTradeDialog(false)
    setTradeQuantity('')
  }

  const openTradeDialog = (stock: Stock, type: 'buy' | 'sell') => {
    setSelectedStock(stock)
    setTradeType(type)
    setShowTradeDialog(true)
  }

  const getHoldingForStock = (symbol: string) => {
    return portfolio?.holdings.find(h => h.symbol === symbol)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Investment Center</h1>
          <p className="text-muted-foreground">
            Explore and trade stocks with your virtual portfolio
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            Cash: ${portfolio?.cash.toLocaleString() || '0'}
          </Badge>
          <Badge variant="outline">
            Portfolio: ${portfolio?.totalValue.toLocaleString() || '0'}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="explore" className="w-full">
        <TabsList>
          <TabsTrigger value="explore">Explore Stocks</TabsTrigger>
          <TabsTrigger value="portfolio">My Holdings</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks by symbol or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stock List */}
          <div className="grid gap-4">
            {filteredStocks.map((stock) => {
              const holding = getHoldingForStock(stock.symbol)
              return (
                <Card key={stock.symbol} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{stock.symbol}</h3>
                            <Badge variant="outline">{stock.category}</Badge>
                            {holding && (
                              <Badge variant="default" className="text-xs">
                                {holding.shares} shares
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{stock.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="font-semibold text-lg">
                            ${stock.price.toFixed(2)}
                          </div>
                          <div className={`flex items-center space-x-1 text-sm ${
                            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change >= 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            <span>
                              ${Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => openTradeDialog(stock, 'buy')}
                          >
                            Buy
                          </Button>
                          {holding && holding.shares > 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openTradeDialog(stock, 'sell')}
                            >
                              Sell
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Holdings</CardTitle>
              <CardDescription>Your current stock positions</CardDescription>
            </CardHeader>
            <CardContent>
              {portfolio?.holdings && portfolio.holdings.length > 0 ? (
                <div className="space-y-4">
                  {portfolio.holdings.map((holding) => {
                    const currentValue = holding.shares * holding.currentPrice
                    const costBasis = holding.shares * holding.avgPrice
                    const gainLoss = currentValue - costBasis
                    const gainLossPercent = (gainLoss / costBasis) * 100

                    return (
                      <div key={holding.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{holding.symbol}</h3>
                          <p className="text-sm text-muted-foreground">
                            {holding.shares} shares @ ${holding.avgPrice.toFixed(2)} avg
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            ${currentValue.toFixed(2)}
                          </div>
                          <div className={`text-sm ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gainLoss >= 0 ? '+' : ''}${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No holdings yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start by buying your first stock!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card>
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
              <CardDescription>Stocks you're interested in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your watchlist is empty</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Click the star icon on any stock to add it to your watchlist
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Trade Dialog */}
      <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedStock?.symbol}
            </DialogTitle>
            <DialogDescription>
              {selectedStock?.name} - ${selectedStock?.price.toFixed(2)} per share
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Number of Shares</Label>
              <Input
                id="quantity"
                type="number"
                value={tradeQuantity}
                onChange={(e) => setTradeQuantity(e.target.value)}
                placeholder="Enter quantity"
                min="1"
              />
            </div>

            {tradeQuantity && selectedStock && (
              <div className="bg-muted p-3 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Shares:</span>
                  <span>{tradeQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per share:</span>
                  <span>${selectedStock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}:</span>
                  <span>${(parseInt(tradeQuantity) * selectedStock.price).toFixed(2)}</span>
                </div>
              </div>
            )}

            {tradeType === 'buy' && portfolio && tradeQuantity && selectedStock && 
             (parseInt(tradeQuantity) * selectedStock.price) > portfolio.cash && (
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Insufficient funds for this trade</span>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowTradeDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleTrade}
                disabled={!tradeQuantity || parseInt(tradeQuantity) <= 0}
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'} Shares
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}