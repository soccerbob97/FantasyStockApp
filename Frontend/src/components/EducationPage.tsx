import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock, 
  Star, 
  Award,
  Clock,
  Users,
  TrendingUp,
  Shield,
  DollarSign,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'
import type { User } from '../App'

type EducationPageProps = {
  user: User
}

// Educational content structure
const LEARNING_PATHS = [
  {
    id: 'basics',
    title: 'Investing Basics',
    description: 'Start your investment journey with fundamental concepts',
    icon: BookOpen,
    difficulty: 'Beginner',
    duration: '2 hours',
    modules: [
      { id: 'basics-101', title: 'What is Investing?', duration: '15 min', completed: true },
      { id: 'stocks-intro', title: 'Introduction to Stocks', duration: '20 min', completed: true },
      { id: 'market-basics', title: 'How Markets Work', duration: '25 min', completed: false },
      { id: 'portfolio-intro', title: 'Building Your First Portfolio', duration: '30 min', completed: false },
      { id: 'basics-quiz', title: 'Knowledge Check', duration: '10 min', completed: false }
    ]
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'Learn to protect your investments and manage risk',
    icon: Shield,
    difficulty: 'Intermediate',
    duration: '3 hours',
    modules: [
      { id: 'risk-intro', title: 'Understanding Risk', duration: '20 min', completed: true },
      { id: 'diversification', title: 'Diversification Strategies', duration: '25 min', completed: false },
      { id: 'portfolio-allocation', title: 'Asset Allocation', duration: '30 min', completed: false },
      { id: 'risk-assessment', title: 'Risk Assessment Tools', duration: '35 min', completed: false },
      { id: 'risk-quiz', title: 'Risk Management Quiz', duration: '15 min', completed: false }
    ]
  },
  {
    id: 'market-analysis',
    title: 'Market Analysis',
    description: 'Technical and fundamental analysis techniques',
    icon: TrendingUp,
    difficulty: 'Advanced',
    duration: '4 hours',
    modules: [
      { id: 'fundamental-analysis', title: 'Fundamental Analysis', duration: '45 min', completed: false },
      { id: 'technical-analysis', title: 'Technical Analysis', duration: '45 min', completed: false },
      { id: 'market-indicators', title: 'Key Market Indicators', duration: '30 min', completed: false },
      { id: 'company-valuation', title: 'Company Valuation', duration: '40 min', completed: false },
      { id: 'analysis-quiz', title: 'Analysis Mastery Quiz', duration: '20 min', completed: false }
    ]
  },
  {
    id: 'esg-investing',
    title: 'ESG Investing',
    description: 'Sustainable and responsible investing principles',
    icon: Globe,
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    modules: [
      { id: 'esg-intro', title: 'What is ESG?', duration: '20 min', completed: false },
      { id: 'esg-metrics', title: 'ESG Metrics & Ratings', duration: '25 min', completed: false },
      { id: 'impact-investing', title: 'Impact Investing', duration: '30 min', completed: false },
      { id: 'esg-portfolio', title: 'Building an ESG Portfolio', duration: '35 min', completed: false },
      { id: 'esg-quiz', title: 'ESG Knowledge Check', duration: '15 min', completed: false }
    ]
  }
]

const QUICK_LESSONS = [
  {
    title: 'Market Orders vs Limit Orders',
    duration: '5 min',
    category: 'Trading',
    description: 'Learn the difference between market and limit orders'
  },
  {
    title: 'Reading Stock Charts',
    duration: '8 min',
    category: 'Analysis',
    description: 'Basic chart patterns and what they mean'
  },
  {
    title: 'Dollar-Cost Averaging',
    duration: '6 min',
    category: 'Strategy',
    description: 'A simple strategy to reduce risk over time'
  },
  {
    title: 'Understanding P/E Ratios',
    duration: '7 min',
    category: 'Valuation',
    description: 'How to use price-to-earnings ratios in analysis'
  }
]

const MARKET_SCENARIOS = [
  {
    title: 'Bull Market Strategy',
    description: 'Learn how to invest during rising markets',
    difficulty: 'Intermediate',
    participants: 234,
    scenario: 'The market has been rising for 6 months. How do you adjust your portfolio?'
  },
  {
    title: 'Market Crash Response',
    description: 'Navigate through market downturns',
    difficulty: 'Advanced', 
    participants: 156,
    scenario: 'Markets drop 20% in two weeks. What\'s your strategy?'
  },
  {
    title: 'Earnings Season',
    description: 'Trade around quarterly earnings announcements',
    difficulty: 'Intermediate',
    participants: 189,
    scenario: 'It\'s earnings season and volatility is high. How do you position your portfolio?'
  }
]

// Quiz questions for demonstration
const SAMPLE_QUIZ = {
  question: "What is diversification in investing?",
  options: [
    "Putting all money in one stock",
    "Spreading investments across different assets to reduce risk",
    "Only investing in technology stocks",
    "Investing only in bonds"
  ],
  correct: 1,
  explanation: "Diversification involves spreading investments across different types of assets, sectors, and companies to reduce the overall risk of your portfolio."
}

export function EducationPage({ user }: EducationPageProps) {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string>('')
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [currentModule, setCurrentModule] = useState<string | null>(null)

  const completedModules = user.completedEducation.length
  const totalModules = LEARNING_PATHS.reduce((sum, path) => sum + path.modules.length, 0)
  const progressPercentage = (completedModules / totalModules) * 100

  const handleQuizSubmit = () => {
    setShowQuizResult(true)
    const isCorrect = parseInt(selectedQuizAnswer) === SAMPLE_QUIZ.correct
    
    if (isCorrect) {
      toast.success('Correct! Great job!')
    } else {
      toast.error('Not quite right. Keep learning!')
    }
  }

  const startModule = (moduleId: string) => {
    setCurrentModule(moduleId)
    // In a real app, this would navigate to the actual module content
    toast.success('Module started! Great work on continuing your education.')
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Financial Education</h1>
          <p className="text-muted-foreground">
            Build your investment knowledge with interactive lessons and simulations
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Overall Progress</div>
          <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
          <Progress value={progressPercentage} className="w-32 mt-1" />
        </div>
      </div>

      {/* Achievement Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-purple-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Learning Streak: 7 days</h3>
                <p className="text-sm text-muted-foreground">
                  Keep it up! Complete 3 more days to earn the "Dedicated Learner" badge
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Points Earned</div>
              <div className="text-xl font-bold">450</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="paths" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="quick">Quick Lessons</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="paths" className="space-y-4">
          <div className="grid gap-6">
            {LEARNING_PATHS.map((path) => {
              const Icon = path.icon
              const completedInPath = path.modules.filter(m => 
                user.completedEducation.includes(m.id)
              ).length
              const pathProgress = (completedInPath / path.modules.length) * 100

              return (
                <Card key={path.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{path.title}</CardTitle>
                          <CardDescription>{path.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(path.difficulty)}>
                          {path.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {path.duration}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress: {completedInPath}/{path.modules.length} modules</span>
                        <span>{Math.round(pathProgress)}% complete</span>
                      </div>
                      <Progress value={pathProgress} />
                      
                      <div className="space-y-2">
                        {path.modules.map((module, index) => {
                          const isCompleted = user.completedEducation.includes(module.id)
                          const isLocked = index > 0 && !user.completedEducation.includes(path.modules[index - 1].id)
                          
                          return (
                            <div key={module.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                              <div className="flex items-center space-x-3">
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : isLocked ? (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Play className="h-5 w-5 text-primary" />
                                )}
                                <div>
                                  <h4 className="font-medium">{module.title}</h4>
                                  <p className="text-sm text-muted-foreground">{module.duration}</p>
                                </div>
                              </div>
                              {!isCompleted && !isLocked && (
                                <Button size="sm" onClick={() => startModule(module.id)}>
                                  Start
                                </Button>
                              )}
                              {isCompleted && (
                                <Badge variant="outline">Completed</Badge>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="quick" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Bite-Sized Lessons</CardTitle>
              <CardDescription>
                Short lessons you can complete in under 10 minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUICK_LESSONS.map((lesson, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{lesson.category}</Badge>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                      <h3 className="font-medium mb-1">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
                      <Button size="sm" className="w-full">
                        <Play className="h-3 w-3 mr-2" />
                        Start Lesson
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Scenario Simulations</CardTitle>
              <CardDescription>
                Practice your skills in realistic market conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MARKET_SCENARIOS.map((scenario, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{scenario.title}</h3>
                            <Badge className={getDifficultyColor(scenario.difficulty)}>
                              {scenario.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{scenario.description}</p>
                          <p className="text-sm font-medium">{scenario.scenario}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {scenario.participants} participants
                            </span>
                          </div>
                        </div>
                        <Button>
                          Start Simulation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sample Quiz Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Try a Sample Quiz</h3>
                      <p className="text-sm text-muted-foreground">Test your knowledge</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Knowledge Check</DialogTitle>
                <DialogDescription>Test your understanding of basic concepts</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">{SAMPLE_QUIZ.question}</h3>
                  <RadioGroup value={selectedQuizAnswer} onValueChange={setSelectedQuizAnswer}>
                    {SAMPLE_QUIZ.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {showQuizResult && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">{SAMPLE_QUIZ.explanation}</p>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    onClick={handleQuizSubmit}
                    disabled={!selectedQuizAnswer || showQuizResult}
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificates & Achievements</CardTitle>
              <CardDescription>
                Earn certificates to showcase your financial knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Investment Fundamentals</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete the Investing Basics learning path
                    </p>
                    <div className="space-y-2">
                      <Progress value={40} />
                      <p className="text-sm">2/5 modules completed</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Risk Management Expert</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Master risk management principles
                    </p>
                    <div className="space-y-2">
                      <Progress value={20} />
                      <p className="text-sm">1/5 modules completed</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">ESG Investing Specialist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Become an expert in sustainable investing
                    </p>
                    <div className="space-y-2">
                      <Progress value={0} />
                      <p className="text-sm">0/5 modules completed</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Market Analysis Pro</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Advanced technical and fundamental analysis
                    </p>
                    <div className="space-y-2">
                      <Progress value={0} />
                      <p className="text-sm">0/5 modules completed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}