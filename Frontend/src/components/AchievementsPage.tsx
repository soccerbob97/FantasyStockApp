import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Award, 
  Star, 
  Trophy, 
  Target, 
  TrendingUp,
  Users,
  BookOpen,
  Shield,
  Zap,
  Crown,
  Medal,
  Lock,
  Check,
  Share2
} from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '../App'

type AchievementsPageProps = {
  user: User
}

// Achievement categories and data
const ACHIEVEMENT_CATEGORIES = [
  { id: 'trading', name: 'Trading', icon: TrendingUp, color: 'text-green-600' },
  { id: 'education', name: 'Education', icon: BookOpen, color: 'text-blue-600' },
  { id: 'social', name: 'Social', icon: Users, color: 'text-purple-600' },
  { id: 'portfolio', name: 'Portfolio', icon: Shield, color: 'text-orange-600' },
  { id: 'special', name: 'Special', icon: Star, color: 'text-yellow-600' }
]

const ALL_ACHIEVEMENTS = [
  // Trading Achievements
  {
    id: 'first-trade',
    category: 'trading',
    name: 'First Trade',
    description: 'Complete your first stock purchase',
    rarity: 'Common',
    points: 50,
    unlocked: true,
    progress: 100,
    maxProgress: 1,
    icon: Target,
    unlockedDate: '2024-10-01'
  },
  {
    id: 'profitable-trader',
    category: 'trading',
    name: 'Profitable Trader',
    description: 'Make 5 profitable trades in a row',
    rarity: 'Uncommon',
    points: 150,
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    icon: TrendingUp
  },
  {
    id: 'day-trader',
    category: 'trading',
    name: 'Day Trader',
    description: 'Complete 10 trades in a single day',
    rarity: 'Rare',
    points: 250,
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    icon: Zap
  },
  
  // Education Achievements
  {
    id: 'knowledge-seeker',
    category: 'education',
    name: 'Knowledge Seeker',
    description: 'Complete your first educational module',
    rarity: 'Common',
    points: 75,
    unlocked: true,
    progress: 100,
    maxProgress: 1,
    icon: BookOpen,
    unlockedDate: '2024-09-28'
  },
  {
    id: 'scholar',
    category: 'education',
    name: 'Scholar',
    description: 'Complete 10 educational modules',
    rarity: 'Uncommon',
    points: 200,
    unlocked: false,
    progress: 7,
    maxProgress: 10,
    icon: Award
  },
  {
    id: 'master-learner',
    category: 'education',
    name: 'Master Learner',
    description: 'Complete all learning paths',
    rarity: 'Epic',
    points: 500,
    unlocked: false,
    progress: 2,
    maxProgress: 4,
    icon: Crown
  },

  // Social Achievements
  {
    id: 'team-player',
    category: 'social',
    name: 'Team Player',
    description: 'Join your first team',
    rarity: 'Common',
    points: 50,
    unlocked: true,
    progress: 100,
    maxProgress: 1,
    icon: Users,
    unlockedDate: '2024-09-30'
  },
  {
    id: 'week-winner',
    category: 'social',
    name: 'Week Winner',
    description: 'Help your team win a weekly challenge',
    rarity: 'Rare',
    points: 300,
    unlocked: true,
    progress: 100,
    maxProgress: 1,
    icon: Trophy,
    unlockedDate: '2024-10-02'
  },
  {
    id: 'social-butterfly',
    category: 'social',
    name: 'Social Butterfly',
    description: 'Share 5 achievements on social media',
    rarity: 'Uncommon',
    points: 125,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    icon: Share2
  },

  // Portfolio Achievements
  {
    id: 'diversified-portfolio',
    category: 'portfolio',
    name: 'Diversified Portfolio',
    description: 'Hold stocks from 5 different sectors',
    rarity: 'Uncommon',
    points: 175,
    unlocked: true,
    progress: 100,
    maxProgress: 5,
    icon: Shield,
    unlockedDate: '2024-10-03'
  },
  {
    id: 'portfolio-builder',
    category: 'portfolio',
    name: 'Portfolio Builder',
    description: 'Reach $150,000 portfolio value',
    rarity: 'Rare',
    points: 250,
    unlocked: false,
    progress: 105420,
    maxProgress: 150000,
    icon: Target
  },
  {
    id: 'diamond-hands',
    category: 'portfolio',
    name: 'Diamond Hands',
    description: 'Hold a position for 30+ days through volatility',
    rarity: 'Epic',
    points: 400,
    unlocked: false,
    progress: 0,
    maxProgress: 30,
    icon: Medal
  },

  // Special Achievements
  {
    id: 'early-adopter',
    category: 'special',
    name: 'Early Adopter',
    description: 'Join Coachfolio in the first month',
    rarity: 'Legendary',
    points: 1000,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    icon: Star
  }
]

const MILESTONES = [
  { points: 0, title: 'Newcomer', icon: Target, unlocked: true },
  { points: 500, title: 'Apprentice', icon: Award, unlocked: true },
  { points: 1000, title: 'Trader', icon: TrendingUp, unlocked: false },
  { points: 2500, title: 'Investor', icon: Shield, unlocked: false },
  { points: 5000, title: 'Expert', icon: Crown, unlocked: false },
  { points: 10000, title: 'Master', icon: Trophy, unlocked: false }
]

export function AchievementsPage({ user }: AchievementsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const userPoints = ALL_ACHIEVEMENTS
    .filter(achievement => achievement.unlocked)
    .reduce((sum, achievement) => sum + achievement.points, 0)

  const unlockedAchievements = ALL_ACHIEVEMENTS.filter(a => a.unlocked)
  const totalAchievements = ALL_ACHIEVEMENTS.length

  const filteredAchievements = selectedCategory === 'all' 
    ? ALL_ACHIEVEMENTS 
    : ALL_ACHIEVEMENTS.filter(a => a.category === selectedCategory)

  const currentMilestone = MILESTONES.filter(m => m.points <= userPoints).pop() || MILESTONES[0]
  const nextMilestone = MILESTONES.find(m => m.points > userPoints)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'Uncommon': return 'bg-green-100 text-green-800 border-green-300'
      case 'Rare': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Epic': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const shareAchievement = (achievement: any) => {
    // In a real app, this would integrate with social media APIs
    toast.success(`Achievement "${achievement.name}" shared!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Achievements & Progress</h1>
          <p className="text-muted-foreground">
            Track your learning journey and celebrate milestones
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total Points</div>
          <div className="text-3xl font-bold text-primary">{userPoints.toLocaleString()}</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Achievements Earned</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{Math.round((unlockedAchievements.length / totalAchievements) * 100)}%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userPoints}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Crown className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{currentMilestone.title}</div>
            <div className="text-sm text-muted-foreground">Current Rank</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Milestone Progress */}
      {nextMilestone && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5" />
              <span>Progress to Next Milestone</span>
            </CardTitle>
            <CardDescription>
              Earn more points to unlock the "{nextMilestone.title}" rank
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{currentMilestone.title}</span>
                <span>{nextMilestone.title}</span>
              </div>
              <Progress 
                value={((userPoints - currentMilestone.points) / (nextMilestone.points - currentMilestone.points)) * 100} 
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{userPoints} points</span>
                <span>{nextMilestone.points - userPoints} points to go</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList>
          <TabsTrigger value="achievements">All Achievements</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Button>
            {ACHIEVEMENT_CATEGORIES.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-1"
                >
                  <Icon className="h-3 w-3" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => {
              const Icon = achievement.icon
              const progressPercent = (achievement.progress / achievement.maxProgress) * 100

              return (
                <Card 
                  key={achievement.id} 
                  className={`relative ${achievement.unlocked ? 'border-2' : ''} ${
                    achievement.unlocked ? getRarityColor(achievement.rarity) : 'opacity-75'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-white/50' : 'bg-muted'}`}>
                        <Icon className={`h-6 w-6 ${achievement.unlocked ? 'text-current' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                        {achievement.unlocked ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

                    {achievement.unlocked ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-600 font-medium">Completed!</span>
                          <span className="font-medium">+{achievement.points} pts</span>
                        </div>
                        {achievement.unlockedDate && (
                          <p className="text-xs text-muted-foreground">
                            Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                          </p>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => shareAchievement(achievement)}
                        >
                          <Share2 className="h-3 w-3 mr-2" />
                          Share
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress value={progressPercent} />
                        <p className="text-xs text-muted-foreground">
                          {achievement.points} points when completed
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements in Progress</CardTitle>
              <CardDescription>Keep working towards these goals!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ALL_ACHIEVEMENTS.filter(a => !a.unlocked && a.progress > 0).map((achievement) => {
                  const Icon = achievement.icon
                  const progressPercent = (achievement.progress / achievement.maxProgress) * 100

                  return (
                    <div key={achievement.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="bg-muted p-2 rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{achievement.name}</h3>
                          <Badge className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                            <span>{Math.round(progressPercent)}%</span>
                          </div>
                          <Progress value={progressPercent} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rank Milestones</CardTitle>
              <CardDescription>Progress through the ranks as you earn points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MILESTONES.map((milestone, index) => {
                  const Icon = milestone.icon
                  const isUnlocked = milestone.points <= userPoints
                  const isNext = !isUnlocked && (index === 0 || MILESTONES[index - 1].points <= userPoints)

                  return (
                    <div 
                      key={milestone.points} 
                      className={`flex items-center space-x-4 p-4 border rounded-lg ${
                        isUnlocked ? 'bg-primary/5 border-primary' : isNext ? 'border-dashed' : 'opacity-50'
                      }`}
                    >
                      <div className={`p-3 rounded-lg ${isUnlocked ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {milestone.points.toLocaleString()} points
                            </span>
                            {isUnlocked && <Check className="h-4 w-4 text-green-500" />}
                            {!isUnlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>
                        {isNext && (
                          <div className="mt-2">
                            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                              <span>Progress to next rank</span>
                              <span>{userPoints}/{milestone.points}</span>
                            </div>
                            <Progress value={(userPoints / milestone.points) * 100} />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}