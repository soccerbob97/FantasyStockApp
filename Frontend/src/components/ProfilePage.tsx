import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  DollarSign, 
  Users, 
  HelpCircle, 
  FileText, 
  LogOut,
  Trophy,
  Target,
  BookOpen,
  ChevronRight,
  Crown
} from 'lucide-react'
import type { User } from '../App'

type ProfilePageProps = {
  user: User
  onLogout: () => void
}

const SETTINGS_ITEMS = [
  { id: 'notifications', label: 'Notifications', icon: Bell, hasToggle: true },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield, hasToggle: false },
  { id: 'appearance', label: 'Appearance', icon: Palette, hasToggle: false },
  { id: 'trading', label: 'Trading Preferences', icon: DollarSign, hasToggle: false },
  { id: 'team', label: 'Manage Team', icon: Users, hasToggle: false },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, hasToggle: false },
  { id: 'terms', label: 'Terms & Privacy', icon: FileText, hasToggle: false }
]

export function ProfilePage({ user, onLogout }: ProfilePageProps) {
  const userLevel = 3
  const xpCurrent = 450
  const xpRequired = 500
  const xpProgress = (xpCurrent / xpRequired) * 100
  const stocksOwned = 5
  const achievementsUnlocked = user.achievements.length
  const currentRank = 4
  const teamName = 'Market Wizards'

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-white/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-white/20 text-white text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Level Badge */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{userLevel}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-white/80">@{user.email.split('@')[0]}</p>
                {user.teamId && (
                  <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-0">
                    <Users className="w-3 h-3 mr-1" />
                    {teamName}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* XP Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {userLevel} Progress</span>
                <span>{xpCurrent} / {xpRequired} XP</span>
              </div>
              <Progress value={xpProgress} className="bg-white/20" />
              <p className="text-xs text-white/80">{xpRequired - xpCurrent} XP to next level</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stocksOwned}</div>
              <div className="text-xs text-gray-500">Stocks Owned</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{achievementsUnlocked}</div>
              <div className="text-xs text-gray-500">Achievements</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Crown className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">#{currentRank}</div>
              <div className="text-xs text-gray-500">Current Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.achievements.slice(0, 3).map((achievement, index) => (
                <div key={achievement} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium capitalize">{achievement.replace('-', ' ')}</h3>
                    <p className="text-sm text-gray-600">Earned 3 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Share
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                View All Achievements
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span>Learning Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Investment Basics</span>
                  <span>4/5 completed</span>
                </div>
                <Progress value={80} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Risk Management</span>
                  <span>2/5 completed</span>
                </div>
                <Progress value={40} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Market Analysis</span>
                  <span>1/5 completed</span>
                </div>
                <Progress value={20} />
              </div>
              
              <Button variant="outline" className="w-full">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {SETTINGS_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-500" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">Coachfolio v1.0.0</p>
          
          <div className="flex justify-center space-x-6 text-sm">
            <button className="text-primary">Twitter</button>
            <button className="text-primary">Discord</button>
            <button className="text-primary">Support</button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}