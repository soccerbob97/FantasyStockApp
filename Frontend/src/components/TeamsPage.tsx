import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { 
  Users, 
  Crown, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Search,
  MessageCircle,
  Trophy,
  Calendar
} from 'lucide-react'
import { toast } from 'sonner'
import type { User, Team } from '../App'

type TeamsPageProps = {
  user: User
}

// Mock team data
const MOCK_TEAMS: Team[] = [
  {
    id: 'team-1',
    name: 'The Bulls',
    members: [
      { id: '1', name: 'Alex Thompson', email: 'alex@email.com', avatar: '', interests: [], portfolioValue: 105420, totalReturn: 5.42, achievements: [], completedEducation: [] },
      { id: '2', name: 'Sarah Chen', email: 'sarah@email.com', avatar: '', interests: [], portfolioValue: 108230, totalReturn: 8.23, achievements: [], completedEducation: [] },
      { id: '3', name: 'Mike Johnson', email: 'mike@email.com', avatar: '', interests: [], portfolioValue: 95670, totalReturn: -4.33, achievements: [], completedEducation: [] },
      { id: '4', name: 'Emma Davis', email: 'emma@email.com', avatar: '', interests: [], portfolioValue: 112450, totalReturn: 12.45, achievements: [], completedEducation: [] }
    ],
    totalValue: 421770,
    weeklyReturn: 5.44,
    rank: 1
  },
  {
    id: 'team-2',
    name: 'Tech Titans',
    members: [
      { id: '5', name: 'David Kim', email: 'david@email.com', avatar: '', interests: [], portfolioValue: 103450, totalReturn: 3.45, achievements: [], completedEducation: [] },
      { id: '6', name: 'Lisa Wang', email: 'lisa@email.com', avatar: '', interests: [], portfolioValue: 98760, totalReturn: -1.24, achievements: [], completedEducation: [] },
      { id: '7', name: 'James Wilson', email: 'james@email.com', avatar: '', interests: [], portfolioValue: 106890, totalReturn: 6.89, achievements: [], completedEducation: [] }
    ],
    totalValue: 309100,
    weeklyReturn: 3.03,
    rank: 2
  },
  {
    id: 'team-3',
    name: 'Green Investors',
    members: [
      { id: '8', name: 'Anna Martinez', email: 'anna@email.com', avatar: '', interests: [], portfolioValue: 101230, totalReturn: 1.23, achievements: [], completedEducation: [] },
      { id: '9', name: 'Tom Brown', email: 'tom@email.com', avatar: '', interests: [], portfolioValue: 104560, totalReturn: 4.56, achievements: [], completedEducation: [] },
      { id: '10', name: 'Grace Lee', email: 'grace@email.com', avatar: '', interests: [], portfolioValue: 99870, totalReturn: -0.13, achievements: [], completedEducation: [] },
      { id: '11', name: 'Ryan Taylor', email: 'ryan@email.com', avatar: '', interests: [], portfolioValue: 102340, totalReturn: 2.34, achievements: [], completedEducation: [] }
    ],
    totalValue: 408000,
    weeklyReturn: 2.0,
    rank: 3
  }
]

const AVAILABLE_TEAMS = [
  { id: 'team-4', name: 'Future Traders', members: 2, avgReturn: 1.5, description: 'Looking for new members to join our growing team!' },
  { id: 'team-5', name: 'Market Makers', members: 3, avgReturn: 3.2, description: 'Experienced traders welcome. Focus on long-term growth.' },
  { id: 'team-6', name: 'ESG Focus', members: 1, avgReturn: 2.8, description: 'Sustainable investing enthusiasts.' }
]

export function TeamsPage({ user }: TeamsPageProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [teamDescription, setTeamDescription] = useState('')
  
  const userTeam = MOCK_TEAMS.find(team => team.id === user.teamId)
  const isTeamLeader = userTeam?.members[0]?.id === user.id

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error('Please enter a team name')
      return
    }
    
    toast.success(`Team "${teamName}" created successfully!`)
    setShowCreateDialog(false)
    setTeamName('')
    setTeamDescription('')
  }

  const handleJoinTeam = (teamId: string, teamName: string) => {
    toast.success(`Joined team "${teamName}" successfully!`)
    setShowJoinDialog(false)
  }

  const handleLeaveTeam = () => {
    toast.success('Left team successfully')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Teams & Competition</h1>
          <p className="text-muted-foreground">
            Join forces with friends and compete in weekly challenges
          </p>
        </div>
        <div className="flex space-x-2">
          {!user.teamId && (
            <>
              <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Find Team
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join a Team</DialogTitle>
                    <DialogDescription>
                      Browse available teams and find the perfect match
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {AVAILABLE_TEAMS.map((team) => (
                      <Card key={team.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h3 className="font-medium">{team.name}</h3>
                              <p className="text-sm text-muted-foreground">{team.description}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {team.members}/6 members
                                </span>
                                <span className="flex items-center">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  {team.avgReturn}% avg return
                                </span>
                              </div>
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => handleJoinTeam(team.id, team.name)}
                            >
                              Join
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Team
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Team</DialogTitle>
                    <DialogDescription>
                      Start your own investment team and invite friends
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="team-name">Team Name</Label>
                      <Input
                        id="team-name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter team name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team-description">Description (Optional)</Label>
                      <Input
                        id="team-description"
                        value={teamDescription}
                        onChange={(e) => setTeamDescription(e.target.value)}
                        placeholder="Describe your team's investment strategy"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateTeam}>
                        Create Team
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      {userTeam ? (
        /* User's Team Dashboard */
        <div className="space-y-6">
          {/* Team Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>{userTeam.name}</span>
                  {userTeam.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                  <Badge variant={userTeam.rank <= 3 ? "default" : "secondary"}>
                    Rank #{userTeam.rank}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Team portfolio value: ${userTeam.totalValue.toLocaleString()}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Weekly Return</div>
                  <div className={`font-semibold ${userTeam.weeklyReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {userTeam.weeklyReturn >= 0 ? '+' : ''}{userTeam.weeklyReturn}%
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Team Chat
                </Button>
                {isTeamLeader && (
                  <Button variant="outline" size="sm">
                    Manage Team
                  </Button>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Performance and contributions of team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userTeam.members.map((member, index) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{member.name}</h3>
                          {index === 0 && <Crown className="h-4 w-4 text-yellow-500" />}
                          {member.id === user.id && <Badge variant="outline">You</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${member.portfolioValue.toLocaleString()}
                      </div>
                      <div className={`text-sm ${member.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {member.totalReturn >= 0 ? '+' : ''}{member.totalReturn}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Team Activity</CardTitle>
              <CardDescription>Latest trades and achievements from team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Sarah Chen</span> bought 25 shares of NVDA
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="outline">+$2,340</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>ED</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Emma Davis</span> earned "Diversified Portfolio" achievement
                    </p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>

                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Mike Johnson</span> completed "Risk Management 101" lesson
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  <Badge variant="outline">Education</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* No Team State */
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl mb-2">Join the Competition</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Team up with friends to learn investing together and compete in weekly challenges. 
            Teams of 4-6 members work best for collaborative learning.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setShowJoinDialog(true)}>
              <Search className="h-4 w-4 mr-2" />
              Find Team
            </Button>
            <Button variant="outline" onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          </div>
        </div>
      )}

      {/* Current Competition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>This Week's Challenge</span>
          </CardTitle>
          <CardDescription>
            Compete in weekly challenges to earn points and recognition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-primary/10 to-purple-100 p-6 rounded-lg">
            <h3 className="font-medium mb-2">ESG Portfolio Challenge</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Build a portfolio focused on Environmental, Social, and Governance (ESG) criteria. 
              Teams will be judged on both returns and ESG score.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <span>Ends in: 3 days</span>
                <span>•</span>
                <span>42 teams participating</span>
              </div>
              <Button size="sm">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Rankings Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Top Teams This Week</CardTitle>
          <CardDescription>See how teams are performing in the current competition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_TEAMS.slice(0, 5).map((team) => (
              <div key={team.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                    <span className="text-sm font-medium">#{team.rank}</span>
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center space-x-2">
                      <span>{team.name}</span>
                      {team.rank === 1 && <Crown className="h-4 w-4 text-yellow-500" />}
                      {team.id === user.teamId && <Badge variant="outline">Your Team</Badge>}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {team.members.length} members
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${team.totalValue.toLocaleString()}
                  </div>
                  <div className={`text-sm ${team.weeklyReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {team.weeklyReturn >= 0 ? '+' : ''}{team.weeklyReturn}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}