import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Search, 
  Bookmark, 
  TrendingUp, 
  TrendingDown, 
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react'
import type { User } from '../App'

type HomePageProps = {
  user: User
}

// Mock article data
const TRENDING_ARTICLES = [
  {
    id: 1,
    title: 'AI Chip Wars Heat Up: NVIDIA vs AMD Battle for Supremacy',
    author: 'TechCrunch',
    timestamp: '2 hours ago',
    category: 'Technology',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    isPersonalized: true,
    relatedStocks: [
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corp.',
        price: 495.20,
        changePercent: 8.2,
        type: 'winner'
      },
      {
        symbol: 'INTC',
        name: 'Intel Corporation',
        price: 43.20,
        changePercent: -3.5,
        type: 'loser'
      }
    ]
  },
  {
    id: 2,
    title: 'Obesity Drug Revolution: Eli Lilly\'s New Treatment Shows Promise',
    author: 'Bloomberg Health',
    timestamp: '4 hours ago',
    category: 'Healthcare',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
    isPersonalized: true,
    relatedStocks: [
      {
        symbol: 'LLY',
        name: 'Eli Lilly',
        price: 598.40,
        changePercent: 6.3,
        type: 'winner'
      },
      {
        symbol: 'PFE',
        name: 'Pfizer Inc.',
        price: 28.90,
        changePercent: -2.1,
        type: 'loser'
      }
    ]
  },
  {
    id: 3,
    title: 'Solar Power Breakthrough: New Panels Hit 30% Efficiency',
    author: 'Reuters Energy',
    timestamp: '6 hours ago',
    category: 'Green Energy',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop',
    isPersonalized: true,
    relatedStocks: [
      {
        symbol: 'FSLR',
        name: 'First Solar',
        price: 201.40,
        changePercent: 5.5,
        type: 'winner'
      },
      {
        symbol: 'PLUG',
        name: 'Plug Power Inc.',
        price: 4.85,
        changePercent: -6.8,
        type: 'loser'
      }
    ]
  },
  {
    id: 4,
    title: 'Bitcoin ETF Approval Sends Crypto Stocks Soaring',
    author: 'CNBC Finance',
    timestamp: '1 hour ago',
    category: 'Finance',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    isPersonalized: true,
    relatedStocks: [
      {
        symbol: 'COIN',
        name: 'Coinbase',
        price: 152.40,
        changePercent: 7.8,
        type: 'winner'
      },
      {
        symbol: 'RIOT',
        name: 'Riot Platforms',
        price: 8.45,
        changePercent: -4.2,
        type: 'loser'
      }
    ]
  },
  {
    id: 5,
    title: 'Gaming Industry Boom: Mobile Games Drive Growth',
    author: 'The Verge',
    timestamp: '8 hours ago',
    category: 'Entertainment',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
    isPersonalized: false,
    relatedStocks: [
      {
        symbol: 'RBLX',
        name: 'Roblox',
        price: 38.90,
        changePercent: 4.2,
        type: 'winner'
      },
      {
        symbol: 'ATVI',
        name: 'Activision Blizzard',
        price: 75.30,
        changePercent: -1.4,
        type: 'loser'
      }
    ]
  },
  {
    id: 6,
    title: 'Apple Vision Pro 2 Leaked: Major Updates Expected',
    author: 'MacRumors',
    timestamp: '3 hours ago',
    category: 'Technology',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=400&fit=crop',
    isPersonalized: true,
    relatedStocks: [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 178.50,
        changePercent: 2.3,
        type: 'winner'
      },
      {
        symbol: 'SNAP',
        name: 'Snap Inc.',
        price: 10.25,
        changePercent: -5.7,
        type: 'loser'
      }
    ]
  },
  {
    id: 7,
    title: 'Amazon\'s AI Shopping Assistant Changes E-Commerce',
    author: 'Wall Street Journal',
    timestamp: '5 hours ago',
    category: 'Consumer',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&h=400&fit=crop',
    isPersonalized: false,
    relatedStocks: [
      {
        symbol: 'AMZN',
        name: 'Amazon.com',
        price: 145.80,
        changePercent: 1.9,
        type: 'winner'
      },
      {
        symbol: 'TGT',
        name: 'Target Corp.',
        price: 142.60,
        changePercent: -2.8,
        type: 'loser'
      }
    ]
  },
  {
    id: 8,
    title: 'Tesla Energy Division Surpasses Auto Revenue',
    author: 'Electrek',
    timestamp: '7 hours ago',
    category: 'Green Energy',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop',
    isPersonalized: true,
    relatedStocks: [
      {
        symbol: 'TSLA',
        name: 'Tesla',
        price: 242.80,
        changePercent: 5.7,
        type: 'winner'
      },
      {
        symbol: 'XOM',
        name: 'Exxon Mobil',
        price: 104.30,
        changePercent: -1.9,
        type: 'loser'
      }
    ]
  }
]

// Mock winners and losers data
const WINNERS_LOSERS = {
  winners: [
    { 
      symbol: 'NVDA', 
      name: 'NVIDIA Corp.', 
      price: 495.20, 
      change: 40.62, 
      changePercent: 8.2, 
      relatedArticle: 'AI Chip Announcement',
      volume: '78M',
      marketCap: '$1.22T'
    },
    { 
      symbol: 'LLY', 
      name: 'Eli Lilly', 
      price: 598.40, 
      change: 35.43, 
      changePercent: 6.3, 
      relatedArticle: 'Clinical Trial Success',
      volume: '12M',
      marketCap: '$567B'
    },
    { 
      symbol: 'COIN', 
      name: 'Coinbase', 
      price: 152.40, 
      change: 11.04, 
      changePercent: 7.8, 
      relatedArticle: 'Bitcoin ETF Approval',
      volume: '24M',
      marketCap: '$38B'
    },
    { 
      symbol: 'FSLR', 
      name: 'First Solar', 
      price: 201.40, 
      change: 10.47, 
      changePercent: 5.5, 
      relatedArticle: 'Efficiency Breakthrough',
      volume: '3M',
      marketCap: '$21B'
    },
    { 
      symbol: 'TSLA', 
      name: 'Tesla', 
      price: 242.80, 
      change: 13.07, 
      changePercent: 5.7, 
      relatedArticle: 'Energy Division Growth',
      volume: '95M',
      marketCap: '$770B'
    }
  ],
  losers: [
    { 
      symbol: 'PFE', 
      name: 'Pfizer', 
      price: 28.45, 
      change: -0.61, 
      changePercent: -2.1, 
      relatedArticle: 'Post-Pandemic Revenue',
      volume: '45M',
      marketCap: '$162B'
    },
    { 
      symbol: 'PYPL', 
      name: 'PayPal', 
      price: 61.20, 
      change: -1.44, 
      changePercent: -2.3, 
      relatedArticle: 'Market Share Loss',
      volume: '18M',
      marketCap: '$68B'
    },
    { 
      symbol: 'NKE', 
      name: 'Nike', 
      price: 107.80, 
      change: -2.31, 
      changePercent: -2.1, 
      relatedArticle: 'China Sales Slowdown',
      volume: '8M',
      marketCap: '$167B'
    },
    { 
      symbol: 'DIS', 
      name: 'Disney', 
      price: 91.50, 
      change: -1.11, 
      changePercent: -1.2, 
      relatedArticle: 'Subscriber Growth Stalls',
      volume: '11M',
      marketCap: '$167B'
    },
    { 
      symbol: 'MRNA', 
      name: 'Moderna', 
      price: 95.20, 
      change: -3.35, 
      changePercent: -3.4, 
      relatedArticle: 'Vaccine Revenue Decline',
      volume: '7M',
      marketCap: '$36B'
    }
  ]
}

const INTEREST_FILTERS = [
  { id: 'all', name: 'For You', active: true },
  { id: 'technology', name: 'Technology', active: false },
  { id: 'healthcare', name: 'Healthcare', active: false },
  { id: 'green-energy', name: 'Green Energy', active: false },
  { id: 'finance', name: 'Finance', active: false },
  { id: 'entertainment', name: 'Entertainment', active: false },
  { id: 'consumer', name: 'Consumer', active: false }
]

const AREAS_OF_INTEREST = [
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Innovation driving the future',
    color: '#3B82F6',
    topStocks: [
      { symbol: 'AAPL', price: 178.50, changePercent: 2.3 },
      { symbol: 'MSFT', price: 378.90, changePercent: 1.8 },
      { symbol: 'NVDA', price: 495.20, changePercent: 8.2 }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Biotech',
    icon: '🏥',
    description: 'Investing in human wellness',
    color: '#EF4444',
    topStocks: [
      { symbol: 'JNJ', price: 156.20, changePercent: 0.8 },
      { symbol: 'UNH', price: 524.30, changePercent: 1.2 },
      { symbol: 'LLY', price: 598.40, changePercent: 6.3 }
    ]
  },
  {
    id: 'green-energy',
    name: 'Green Energy & Sustainability',
    icon: '🌱',
    description: 'Building a sustainable future',
    color: '#10B981',
    topStocks: [
      { symbol: 'ENPH', price: 112.30, changePercent: 4.2 },
      { symbol: 'FSLR', price: 201.40, changePercent: 5.5 },
      { symbol: 'TSLA', price: 242.80, changePercent: 5.7 }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Fintech',
    icon: '💰',
    description: 'The future of money',
    color: '#F59E0B',
    topStocks: [
      { symbol: 'JPM', price: 148.60, changePercent: 1.3 },
      { symbol: 'V', price: 256.30, changePercent: 0.9 },
      { symbol: 'COIN', price: 152.40, changePercent: 7.8 }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Media',
    icon: '🎬',
    description: 'Content is king',
    color: '#8B5CF6',
    topStocks: [
      { symbol: 'DIS', price: 91.80, changePercent: 1.5 },
      { symbol: 'NFLX', price: 485.30, changePercent: 2.1 },
      { symbol: 'RBLX', price: 38.90, changePercent: 4.2 }
    ]
  },
  {
    id: 'consumer',
    name: 'Consumer Goods & Retail',
    icon: '🛍️',
    description: 'What people are buying',
    color: '#EC4899',
    topStocks: [
      { symbol: 'AMZN', price: 145.80, changePercent: 1.9 },
      { symbol: 'WMT', price: 159.30, changePercent: 0.6 },
      { symbol: 'NKE', price: 102.40, changePercent: -0.4 }
    ]
  },
  {
    id: 'industrials',
    name: 'Industrials',
    icon: '🏭',
    description: 'Building infrastructure',
    color: '#6366F1',
    topStocks: [
      { symbol: 'CAT', price: 287.50, changePercent: 1.1 },
      { symbol: 'BA', price: 184.20, changePercent: 0.8 },
      { symbol: 'GE', price: 112.60, changePercent: 1.4 }
    ]
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: '🏢',
    description: 'Property & development',
    color: '#14B8A6',
    topStocks: [
      { symbol: 'AMT', price: 198.40, changePercent: 0.5 },
      { symbol: 'PLD', price: 118.90, changePercent: 0.7 },
      { symbol: 'SPG', price: 142.30, changePercent: -0.3 }
    ]
  },
  {
    id: 'communication',
    name: 'Communication Services',
    icon: '📡',
    description: 'Connectivity & media',
    color: '#F97316',
    topStocks: [
      { symbol: 'GOOGL', price: 139.70, changePercent: 1.2 },
      { symbol: 'META', price: 312.80, changePercent: 3.5 },
      { symbol: 'T', price: 19.45, changePercent: -0.2 }
    ]
  }
]

export function HomePage({ user }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<'for-you' | 'the-world'>('for-you')
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([])
  const [starredStocks, setStarredStocks] = useState<string[]>([])

  const toggleBookmark = (articleId: number) => {
    if (bookmarkedArticles.includes(articleId)) {
      setBookmarkedArticles(bookmarkedArticles.filter(id => id !== articleId))
    } else {
      setBookmarkedArticles([...bookmarkedArticles, articleId])
    }
  }

  const toggleStarStock = (symbol: string) => {
    if (starredStocks.includes(symbol)) {
      setStarredStocks(starredStocks.filter(s => s !== symbol))
    } else {
      setStarredStocks([...starredStocks, symbol])
    }
  }

  // Filter articles based on tab selection
  const filteredArticles = activeTab === 'for-you'
    ? TRENDING_ARTICLES.filter(article => {
        // Check if article category matches any of the user's interests
        const articleCategory = article.category.toLowerCase().replace(/\s+/g, '-')
        return user.interests.some(interest => {
          const interestNormalized = interest.toLowerCase().replace(/\s+/g, '-')
          return articleCategory === interestNormalized || 
                 articleCategory.includes(interestNormalized) ||
                 interestNormalized.includes(articleCategory)
        })
      })
    : TRENDING_ARTICLES

  // Filter areas of interest based on user's selected interests
  const userAreasOfInterest = AREAS_OF_INTEREST.filter(area => 
    user.interests.some(interest => 
      interest.toLowerCase().replace(/\s+/g, '-') === area.id ||
      interest.toLowerCase() === area.name.toLowerCase()
    )
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold">Coachfolio</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('for-you')}
              className={`pb-3 px-2 relative transition-colors ${
                activeTab === 'for-you'
                  ? 'text-primary'
                  : 'text-gray-400'
              }`}
            >
              <span>For you</span>
              {activeTab === 'for-you' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('the-world')}
              className={`pb-3 px-2 relative transition-colors ${
                activeTab === 'the-world'
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}
            >
              <span>The world</span>
              {activeTab === 'the-world' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Trending Articles */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Discovered based on your interest</h2>
          </div>
          
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  {/* Image */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Top Section - Category and Bookmark */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className="bg-black/40 text-white border-0 backdrop-blur-sm px-3 py-1.5 rounded-xl"
                    >
                      {article.category}
                    </Badge>

                    <button
                      onClick={() => toggleBookmark(article.id)}
                      className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors"
                    >
                      <Bookmark 
                        className={`w-5 h-5 ${
                          bookmarkedArticles.includes(article.id) 
                            ? 'text-white fill-current' 
                            : 'text-white'
                        }`} 
                      />
                    </button>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl leading-tight">
                      {article.title}
                    </h3>
                  </div>
                </div>

                {/* Metadata and Stocks */}
                <CardContent className="p-4 space-y-3">
                  {/* Author, Time, Read Time */}
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className="text-sm">{article.author}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{article.timestamp}</span>
                    </div>
                    <span>•</span>
                    <span className="text-sm flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  {/* Stock Badges */}
                  <div className="flex flex-wrap gap-2">
                    {article.relatedStocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className={`px-4 py-2 rounded-xl ${
                          stock.type === 'winner'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">${stock.symbol}</span>
                          <span className={stock.type === 'winner' ? 'text-green-600' : 'text-red-600'}>
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Areas of Interest */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Areas of Interest</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {userAreasOfInterest.map((area) => (
              <Card key={area.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" style={{ background: `linear-gradient(135deg, ${area.color}10, ${area.color}20)` }}>
                <div className="space-y-2">
                  <div className="text-3xl">{area.icon}</div>
                  <h3 className="font-medium">{area.name}</h3>
                  <p className="text-xs text-gray-600">{area.description}</p>
                  <div className="pt-2 space-y-1">
                    {area.topStocks.slice(0, 2).map((stock) => (
                      <div key={stock.symbol} className="flex items-center justify-between text-xs">
                        <span className="font-medium">{stock.symbol}</span>
                        <span className={stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom Spacing for Navigation */}
        <div className="h-8" />
      </div>
    </div>
  )
}