import React from 'react'
import { Button } from './ui/button'
import { 
  Flame, 
  BarChart3, 
  User,
  Clock,
  Search
} from 'lucide-react'
import type { User as UserType } from '../App'

type BottomNavigationProps = {
  currentView: string
  setCurrentView: (view: string) => void
}

const NAV_ITEMS = [
  { 
    id: 'discover', 
    label: 'Discover', 
    icon: Flame,
    activeColor: 'text-primary'
  },
  { 
    id: 'portfolio', 
    label: 'Portfolio', 
    icon: BarChart3,
    activeColor: 'text-primary'
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: User,
    activeColor: 'text-primary'
  }
]

export function BottomNavigation({ currentView, setCurrentView }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-pb">
      <div className="flex items-center justify-around px-4 py-3" style={{ height: '4.5rem' }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 py-2 px-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-full ${isActive ? 'bg-gradient-to-br from-emerald-600 to-emerald-500' : ''}`}>
                <Icon 
                  className={`w-5 h-5 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-500'
                  }`} 
                />
              </div>
              {isActive && (
                <span className={`text-xs font-medium ${item.activeColor}`}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}