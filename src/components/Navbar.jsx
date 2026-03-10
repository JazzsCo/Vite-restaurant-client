import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300">
                            J
                        </div>
                        <span className="font-bold text-lg tracking-tight">
                            <span className="gradient-text">Jazzs</span>
                            <span className="text-gray-400 font-light">Co</span>
                        </span>
                    </Link>

                    {/* Nav links (authenticated) */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="btn-ghost text-sm hidden sm:block">
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-3 ml-2">
                                    <div className="hidden sm:flex flex-col items-end">
                                        <span className="text-xs text-gray-400">Welcome back</span>
                                        <span className="text-sm font-semibold text-white truncate max-w-[120px]">
                                            {user?.name}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-orange-400 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-primary-500/20">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <button
                                        id="logout-btn"
                                        onClick={handleLogout}
                                        className="btn-secondary text-sm px-4 py-2"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn-ghost text-sm">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
