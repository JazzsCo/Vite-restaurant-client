import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Register() {
    const { register: registerUser, loading } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const password = watch('password')

    const onSubmit = async (data) => {
        try {
            await registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
            })
            toast.success('Account created! Welcome to JazzsCo 🍽️')
            navigate('/dashboard', { replace: true })
        } catch (err) {
            toast.error(err.message || 'Registration failed. Please try again.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24 page-transition">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                <div className="glass-card p-8 animate-slide-up">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-orange-400 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-xl shadow-primary-500/30 animate-float">
                            J
                        </div>
                        <h1 className="text-2xl font-bold text-white">Create your account</h1>
                        <p className="text-gray-400 text-sm mt-1">Join JazzsCo Restaurant today</p>
                    </div>

                    <form id="register-form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="reg-name" className="label">Full Name</label>
                            <input
                                id="reg-name"
                                type="text"
                                autoComplete="name"
                                className={`input-field ${errors.name ? 'input-error' : ''}`}
                                placeholder="John Doe"
                                {...register('name', {
                                    required: 'Full name is required',
                                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                                    maxLength: { value: 50, message: 'Name is too long' },
                                })}
                            />
                            {errors.name && <p className="error-text">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.name.message}
                            </p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="reg-email" className="label">Email address</label>
                            <input
                                id="reg-email"
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
                            {errors.email && <p className="error-text">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.email.message}
                            </p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="reg-password" className="label">Password</label>
                            <input
                                id="reg-password"
                                type="password"
                                autoComplete="new-password"
                                className={`input-field ${errors.password ? 'input-error' : ''}`}
                                placeholder="Min. 6 characters"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                })}
                            />
                            {errors.password && <p className="error-text">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.password.message}
                            </p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="reg-confirm-password" className="label">Confirm Password</label>
                            <input
                                id="reg-confirm-password"
                                type="password"
                                autoComplete="new-password"
                                className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                                placeholder="Repeat password"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (v) => v === password || 'Passwords do not match',
                                })}
                            />
                            {errors.confirmPassword && <p className="error-text">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                {errors.confirmPassword.message}
                            </p>}
                        </div>

                        {/* Submit */}
                        <button
                            id="register-submit-btn"
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <div className="spinner" />
                                    Creating account…
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-gray-500 text-xs">ALREADY HAVE AN ACCOUNT?</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <p className="text-center text-sm text-gray-400">
                        <Link to="/login" id="go-to-login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                            Sign in instead
                        </Link>
                    </p>
                </div>

                <p className="text-center text-gray-600 text-xs mt-4">
                    By creating an account, you agree to our Terms &amp; Privacy Policy
                </p>
            </div>
        </div>
    )
}
