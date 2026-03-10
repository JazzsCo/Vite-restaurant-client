import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 page-transition">
            <div className="text-center animate-slide-up">
                <div className="text-8xl font-black gradient-text mb-4">404</div>
                <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link to="/" className="btn-primary inline-flex items-center gap-2">
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}
