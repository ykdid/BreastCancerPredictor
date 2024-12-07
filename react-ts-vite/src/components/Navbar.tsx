import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear local storage or session
    localStorage.removeItem('user')
    // Navigate to home page
    navigate('/')
  }

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/make-prediction" className="text-xl font-bold  text-pink-500">
                Breast Cancer Predictor
              </Link>   
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/previous-predicts" className="text-sm font-medium text-muted-foreground hover:text-primary px-3 py-2 rounded-md">
                Previous Predicts
            </Link>
            <Link to="/profile" className="text-sm font-medium text-muted-foreground hover:text-primary px-3 py-2 rounded-md">
                Profile
            </Link>
            <Button variant="ghost" onClick={handleLogout} className="text-sm font-medium text-muted-foreground hover:text-primary ml-4">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
