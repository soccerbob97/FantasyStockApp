import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { 
  Trophy, 
  Crown, 
  Medal, 
  TrendingUp, 
  Users, 
  Calendar,
  Star,
  Target,
  Award
} from 'lucide-react'
import type { User } from '../App'

type LeaderboardPageProps = {
  user: User
}

// Mock leaderboard data
const TEAM_LEADERBOARD = [
  { rank: 1, name: 'The Bulls', totalValue: 421770, weeklyReturn: 5.44, members: 4, avatar: '' },
  { rank: 2, name: 'Tech Titans', totalValue: 419230, weeklyReturn: 4.92, members: 3, avatar: '' },
  { rank: 3, name: 'Green Investors', totalValue: 408000, weeklyReturn: 4.20, members: 4, avatar: '' },
  { rank: 4, name: 'Market Makers', totalValue: 395670, weeklyReturn: 3.95, members: 5, avatar: '' },
  { rank: 5, name: 'Future Traders', totalValue: 387450, weeklyReturn: 3.74, members: 3, avatar: '' },
  { rank: 6, name: 'Dividend Kings', totalValue: 382190, weeklyReturn: 3.28, members: 4, avatar: '' },
  { rank: 7, name: 'Risk Takers', totalValue: 376540, weeklyReturn: 2.95, members: 5, avatar: '' },
  { rank: 8, name: 'ESG Focus', totalValue: 371230, weeklyReturn: 2.81, members: 2, avatar: '' }
]

const INDIVIDUAL_LEADERBOARD = [
  { rank: 1, name: 'Emma Davis', totalValue: 118450, weeklyReturn: 6.89, team: 'The Bulls', avatar: '' },
  { rank: 2, name: 'Sarah Chen', totalValue: 116230, weeklyReturn: 6.23, team: 'The Bulls', avatar: '' },
  { rank: 3, name: 'James Wilson', totalValue: 114890, weeklyReturn: 5.95, team: 'Tech Titans', avatar: '' },
  { rank: 4, name: 'David Kim', totalValue: 113450, weeklyReturn: 5.67, team: 'Tech Titans', avatar: '' },
  { rank: 5, name: 'Alex Thompson', totalValue: 112420, weeklyReturn: 5.42, team: 'The Bulls', avatar: '' },
  { rank: 6, name: 'Lisa Wang', totalValue: 111760, weeklyReturn: 5.18, team: 'Tech Titans', avatar: '' },
  { rank: 7, name: 'Tom Brown', totalValue: 110560, weeklyReturn: 4.95, team: 'Green Investors', avatar: '' },
  { rank: 8, name: 'Anna Martinez', totalValue: 109230, weeklyReturn: 4.72, team: 'Green Investors', avatar: '' }
]

const WEEKLY_CHALLENGES = [
  {
    name: 'ESG Portfolio Challenge',
    description: 'Build a sustainable portfolio with high ESG scores',
    timeLeft: '3 days',
    participants: 42,
    status: 'active',
    reward: '500 points + ESG Champion badge'
  },
  {
    name: 'Risk Management Master',
    description: 'Maintain portfolio volatility under 15% while achieving 3%+ returns',
    timeLeft: 'Completed',
    participants: 38,
    status: 'completed',
    reward: '300 points + Risk Manager badge'
  },
  {
    name: 'Sector Rotation Challenge',
    description: 'Predict and invest in the best performing sector each week',
    timeLeft: 'Next week',
    participants: 0,
    status: 'upcoming',
    reward: '400 points + Market Analyst badge'
  }
]

const ACHIEVEMENTS_SHOWCASE = [
  { name: 'First Trade', description: 'Complete your first stock purchase', rarity: 'Common', unlocked: 156 },
  { name: 'Week Winner', description: 'Lead your team to a weekly challenge victory', rarity: 'Rare', unlocked: 23 },
  { name: 'Portfolio Diversifier', description: 'Hold stocks from 5+ different sectors', rarity: 'Uncommon', unlocked: 67 },
  { name: 'ESG Champion', description: 'Build a portfolio with 90%+ ESG score', rarity: 'Epic', unlocked: 8 },
  { name: 'Diamond Hands', description: 'Hold a position for 30+ days through volatility', rarity: 'Legendary', unlocked: 3 }
]

export function LeaderboardPage({ user }: LeaderboardPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  
  const userTeamRank = TEAM_LEADERBOARD.find(team => team.name === 'The Bulls')?.rank || 0
  const userRank = INDIVIDUAL_LEADERBOARD.find(person => person.name === user.name)?.rank || 0

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">#{rank}</div>
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800'
      case 'Uncommon': return 'bg-green-100 text-green-800'
      case 'Rare': return 'bg-blue-100 text-blue-800'
      case 'Epic': return 'bg-purple-100 text-purple-800'
      case 'Legendary': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Leaderboards & Competition</h1>
          <p className="text-muted-foreground">
            See how you and your team rank among all players
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {userRank > 0 && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Trophy className="h-3 w-3" />
              <span>Your Rank: #{userRank}</span>
            </Badge>
          )}
          {userTeamRank > 0 && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>Team Rank: #{userTeamRank}</span>
            </Badge>
          )}
        </div>
      </div>

      {/* Your Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Your Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {getRankIcon(userRank)}
              <div>
                <div className="text-2xl font-bold">#{userRank}</div>
                <div className="text-sm text-muted-foreground">Individual</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Team Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {getRankIcon(userTeamRank)}
              <div>
                <div className="text-2xl font-bold">#{userTeamRank}</div>
                <div className="text-sm text-muted-foreground">Team</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Points Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">This week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="teams">Team Rankings</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Leaderboard</CardTitle>
              <CardDescription>Top performing teams this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {TEAM_LEADERBOARD.map((team) => (
                  <div 
                    key={team.rank} 
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      team.name === 'The Bulls' ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {getRankIcon(team.rank)}
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {team.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{team.name}</h3>
                            {team.name === 'The Bulls' && <Badge variant="outline">Your Team</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {team.members} members
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${team.totalValue.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">
                        +{team.weeklyReturn}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Leaderboard</CardTitle>
              <CardDescription>Top performing individual investors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {INDIVIDUAL_LEADERBOARD.map((person) => (
                  <div 
                    key={person.rank} 
                    className={`flex items-center justify-between p-4 border rounded-lg ${
                      person.name === user.name ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {getRankIcon(person.rank)}
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{person.name}</h3>
                            {person.name === user.name && <Badge variant="outline">You</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Team: {person.team}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${person.totalValue.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">
                        +{person.weeklyReturn}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid gap-4">
            {WEEKLY_CHALLENGES.map((challenge, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>{challenge.name}</span>
                    </CardTitle>
                    <Badge 
                      variant={
                        challenge.status === 'active' ? 'default' : 
                        challenge.status === 'completed' ? 'secondary' : 'outline'
                      }
                    >
                      {challenge.status}
                    </Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {challenge.timeLeft}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {challenge.participants} participants
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Reward:</span> {challenge.reward}
                      </div>
                    </div>
                    {challenge.status === 'active' && (
                      <Button size="sm">
                        Join Challenge
                      </Button>
                    )}
                    {challenge.status === 'upcoming' && (
                      <Button size="sm" variant="outline">
                        Set Reminder
                      </Button>
                    )}
                  </div>
                  {challenge.status === 'active' && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Showcase</CardTitle>
              <CardDescription>Rare achievements earned by top players</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACHIEVEMENTS_SHOWCASE.map((achievement, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-medium">{achievement.name}</h3>
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {achievement.unlocked} players earned this
                      </span>
                      {user.achievements.includes(achievement.name.toLowerCase().replace(' ', '-')) && (
                        <Badge variant="outline">Earned</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User's Achievement Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Your Achievement Progress</CardTitle>
              <CardDescription>Track your progress towards earning new badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Market Maven</h3>
                    <span className="text-sm text-muted-foreground">3/5 trades</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Make 5 profitable trades in a row
                  </p>
                  <Progress value={60} />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Team Player</h3>
                    <span className="text-sm text-muted-foreground">2/3 weeks</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Help your team win 3 weekly challenges
                  </p>
                  <Progress value={67} />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Knowledge Seeker</h3>
                    <span className="text-sm text-muted-foreground">7/10 lessons</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Complete 10 educational modules
                  </p>
                  <Progress value={70} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}