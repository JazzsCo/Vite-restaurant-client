import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useRestaurants } from '../hooks/useRestaurants'

export default function Login() {
    const { login, loading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dashboard'

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await login(data)
            toast.success('Welcome back! 🎉')
            navigate(from, { replace: true })
        } catch (err) {
            toast.error(err.message || 'Login failed. Please try again.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 page-transition">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="glass-card p-8 animate-slide-up">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-orange-400 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-xl shadow-primary-500/30 animate-float">
                            J
                        </div>
                        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                        <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <form id="login-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="login-email" className="label">Email address</label>
                            <input
                                id="login-email"
                                type="email"
                                autoComplete="email"
                                className={`input-field ${errors.email ? 'input-error' : ''}`}
                                placeholder="you@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="error-text">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="login-password" className="label">Password</label>
                            <input
                                id="login-password"
                                type="password"
                                autoComplete="current-password"
                                className={`input-field ${errors.password ? 'input-error' : ''}`}
                                placeholder="••••••••"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                })}
                            />
                            {errors.password && (
                                <p className="error-text">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit-btn"
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <div className="spinner" />
                                    Signing in…
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-gray-500 text-xs">OR</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-gray-400">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" id="go-to-register" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Bottom note */}
                <p className="text-center text-gray-600 text-xs mt-4">
                    By signing in, you agree to our Terms &amp; Privacy Policy
                </p>
            </div>
        </div>
    )
}
