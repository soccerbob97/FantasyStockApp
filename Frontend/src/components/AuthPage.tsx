import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { 
  TrendingUp, 
  Users, 
  Award, 
  BookOpen, 
  ArrowLeft, 
  Check,
  Zap,
  Shield,
  FileText,
  Play,
  Target
} from 'lucide-react'

type AuthPageProps = {
  onLogin: (email: string, password: string) => void
  onSignup: (name: string, email: string, password: string, interests: string[]) => void
}

const LEARNING_STYLES = [
  {
    id: 'individual',
    title: 'Learn on your own',
    description: 'Start with tutorials and practice trades at your own pace',
    icon: BookOpen,
    selected: false
  },
  {
    id: 'team',
    title: 'Join a team challenge',
    description: 'Compete with friends in weekly investment competitions',
    icon: Users,
    selected: true
  },
  {
    id: 'guided',
    title: 'Follow expert strategies',
    description: 'Learn from experienced investors with guided portfolios',
    icon: Target,
    selected: false
  }
]

const INTEREST_AREAS = [
  { id: 'technology', label: 'Technology', icon: '💻', description: 'Innovation driving the future' },
  { id: 'healthcare', label: 'Healthcare & Biotech', icon: '🏥', description: 'Investing in human wellness' },
  { id: 'green-energy', label: 'Green Energy & Sustainability', icon: '🌱', description: 'Building a sustainable future' },
  { id: 'finance', label: 'Finance & Fintech', icon: '💰', description: 'The future of money' },
  { id: 'entertainment', label: 'Entertainment & Media', icon: '🎬', description: 'Content is king' },
  { id: 'consumer', label: 'Consumer Goods & Retail', icon: '🛍️', description: 'What people are buying' },
  { id: 'industrials', label: 'Industrials', icon: '🏭', description: 'Building infrastructure' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏢', description: 'Property & development' },
  { id: 'communication', label: 'Communication Services', icon: '📡', description: 'Connectivity & media' }
]

export function AuthPage({ onLogin, onSignup }: AuthPageProps) {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'auth' | 'area-of-interest' | 'learning-style' | 'portfolio-setup'>('welcome')
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedLearningStyle, setSelectedLearningStyle] = useState('team')
  const [selectedPortfolioOption, setSelectedPortfolioOption] = useState('virtual')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(loginEmail, loginPassword)
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (authMode === 'login') {
      onLogin(loginEmail, loginPassword)
    } else {
      setCurrentStep('area-of-interest')
    }
  }

  const handleInterestAreaNext = () => {
    setCurrentStep('portfolio-setup')
  }

  const handleLearningStyleNext = () => {
    setCurrentStep('portfolio-setup')
  }

  const handleSignupComplete = () => {
    onSignup(signupName, signupEmail, signupPassword, selectedInterests)
  }

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  // Welcome Step
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12">
        <div className="max-w-md mx-auto w-full text-center">
          {/* Illustration */}
          <div className="mb-12">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-green-100 rounded-full"></div>
              <div className="absolute inset-4 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl text-gray-900 mb-16">
            Start your investment journey with Coachfolio
          </h1>

          {/* Features */}
          <div className="space-y-6 mb-16 text-left">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Learn in minutes</h3>
                <p className="text-sm text-gray-600">
                  Start investing with bite-sized lessons and interactive tutorials
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Risk-free practice</h3>
                <p className="text-sm text-gray-600">
                  Practice with virtual money to build confidence before real investing
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Team challenges</h3>
                <p className="text-sm text-gray-600">
                  Compete with friends in weekly investment competitions
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Text */}
          <p className="text-xs text-gray-500 mb-8">
            By continuing, you agree to Coachfolio's Privacy Policy and to receiving updates on Coachfolio.com
          </p>

          {/* Continue Button */}
          <Button 
            onClick={() => setCurrentStep('auth')}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full h-12 text-base"
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // Auth Step
  if (currentStep === 'auth') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-gray-600">
              Join thousands learning to invest
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex rounded-lg border border-gray-200 bg-white p-1 mb-6">
              <button
                className={`flex-1 rounded-md py-2 px-3 text-sm transition-colors ${
                  authMode === 'signup' 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setAuthMode('signup')}
              >
                Sign Up
              </button>
              <button
                className={`flex-1 rounded-md py-2 px-3 text-sm transition-colors ${
                  authMode === 'login' 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setAuthMode('login')}
              >
                Login
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <Label htmlFor="signup-name" className="block text-sm text-gray-700 mb-2">
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full h-11 bg-white"
                    required
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={authMode === 'signup' ? signupEmail : loginEmail}
                  onChange={(e) => authMode === 'signup' 
                    ? setSignupEmail(e.target.value) 
                    : setLoginEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full h-11 bg-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={authMode === 'signup' ? signupPassword : loginPassword}
                  onChange={(e) => authMode === 'signup' 
                    ? setSignupPassword(e.target.value) 
                    : setLoginPassword(e.target.value)
                  }
                  placeholder={authMode === 'signup' ? 'Create a password' : 'Enter your password'}
                  className="w-full h-11 bg-white"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full h-12 text-base mt-6"
              >
                {authMode === 'signup' ? 'Continue' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Area of Interest Step
  if (currentStep === 'area-of-interest') {
    return (
      <div className="min-h-screen bg-white flex flex-col px-6 py-8">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => setCurrentStep('auth')}
              className="text-green-600 mb-4"
            >
              Back
            </button>
            <h1 className="text-2xl text-gray-900 mb-2">Area of interest</h1>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h2 className="text-lg text-gray-900">Which areas are you interested in?</h2>
          </div>

          {/* Interest Areas */}
          <div className="flex-1 space-y-3 mb-6">
            {INTEREST_AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => toggleInterest(area.id)}
                className={`w-full flex items-center px-4 py-3 rounded-full border-2 transition-all ${
                  selectedInterests.includes(area.id)
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                  selectedInterests.includes(area.id)
                    ? 'bg-green-600 border-green-600'
                    : 'bg-white border-gray-400'
                }`}>
                  {selectedInterests.includes(area.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-lg mr-2">{area.icon}</span>
                <span className="text-gray-900">{area.label}</span>
              </button>
            ))}
          </div>

          {/* Next Button */}
          <div className="pb-4">
            <Button 
              onClick={handleInterestAreaNext}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full h-12 text-base"
              disabled={selectedInterests.length === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Learning Style Step
  if (currentStep === 'learning-style') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12">
        <div className="max-w-md mx-auto w-full text-center">
          {/* Illustration */}
          <div className="mb-12">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-blue-100 rounded-full"></div>
              <div className="absolute inset-4 bg-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl text-gray-900 mb-16">
            How would you like to learn?
          </h1>

          {/* Learning Options */}
          <div className="space-y-4 mb-16 text-left">
            {LEARNING_STYLES.map((style) => {
              const Icon = style.icon
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedLearningStyle(style.id)}
                  className={`w-full flex items-start justify-between p-4 rounded-2xl border-2 transition-all ${
                    selectedLearningStyle === style.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900 mb-1">{style.title}</h3>
                      <p className="text-sm text-gray-600">{style.description}</p>
                    </div>
                  </div>
                  {selectedLearningStyle === style.id && (
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-2">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Privacy Text */}
          <p className="text-xs text-gray-500 mb-8">
            By continuing, you agree to Coachfolio's Privacy Policy and to receiving updates on Coachfolio.com
          </p>

          {/* Continue Button */}
          <Button 
            onClick={handleLearningStyleNext}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full h-12 text-base"
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // Portfolio Setup Step
  if (currentStep === 'portfolio-setup') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-12">
        <div className="max-w-md mx-auto w-full text-center">
          {/* Illustration */}
          <div className="mb-12">
            <div className="relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-emerald-100 rounded-full"></div>
              <div className="absolute inset-4 bg-emerald-600 rounded-full flex items-center justify-center">
                <Target className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl text-gray-900 mb-16">
            How would you like to invest?
          </h1>

          {/* Portfolio Options */}
          <div className="space-y-4 mb-16 text-left">
            <button
              onClick={() => setSelectedPortfolioOption('import')}
              className={`w-full flex items-start justify-between p-4 rounded-2xl border-2 transition-all ${
                selectedPortfolioOption === 'import'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 mb-1">Import your portfolio</h3>
                  <p className="text-sm text-gray-600">
                    Connect your brokerage account and import your existing investments
                  </p>
                </div>
              </div>
              {selectedPortfolioOption === 'import' && (
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-2">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => setSelectedPortfolioOption('virtual')}
              className={`w-full flex items-start justify-between p-4 rounded-2xl border-2 transition-all ${
                selectedPortfolioOption === 'virtual'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                  <Play className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 mb-1">Start a new portfolio</h3>
                  <p className="text-sm text-gray-600">
                    Begin with $100K virtual balance and build your first portfolio
                  </p>
                </div>
              </div>
              {selectedPortfolioOption === 'virtual' && (
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-2">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>

          {/* Privacy Text */}
          <p className="text-xs text-gray-500 mb-8">
            By continuing, you agree to Coachfolio's Privacy Policy and to receiving updates on Coachfolio.com
          </p>

          {/* Continue Button */}
          <Button 
            onClick={handleSignupComplete}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full h-12 text-base"
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  return null
}