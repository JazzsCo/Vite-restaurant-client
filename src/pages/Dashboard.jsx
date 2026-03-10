import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRestaurants } from '../hooks/useRestaurants'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function Dashboard() {
    const { user, logout } = useAuth()
    const { restaurants, loading: listLoading, addRestaurant, updateRestaurant, deleteRestaurant } = useRestaurants()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const handleLogout = () => {
        logout()
        toast.success('See you soon! 👋')
        navigate('/login')
    }

    const openModal = (restaurant = null) => {
        if (restaurant) {
            setEditingId(restaurant.id)
            setValue('name', restaurant.name)
            setValue('cuisine', restaurant.cuisine)
            setValue('rating', restaurant.rating)
        } else {
            setEditingId(null)
            reset()
        }
        setIsModalOpen(true)
    }

    const onSubmit = async (data) => {
        try {
            if (editingId) {
                await updateRestaurant(editingId, data)
            } else {
                await addRestaurant(data)
            }
            setIsModalOpen(false)
            reset()
        } catch (err) {
            // Error handled in hook
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this restaurant?')) {
            await deleteRestaurant(id)
        }
    }

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 page-transition">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative max-w-6xl mx-auto space-y-8 animate-slide-up">
                {/* Header Section */}
                <div className="glass-card p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-orange-400 flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-primary-500/30 flex-shrink-0">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Welcome back,</p>
                            <h1 className="text-2xl font-bold text-white">{user?.name || 'User'}</h1>
                            <p className="text-gray-500 text-xs mt-0.5">{user?.email}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => openModal()}
                            className="btn-primary text-sm px-5 py-2"
                        >
                            + Add Restaurant
                        </button>
                        <button
                            onClick={handleLogout}
                            className="btn-secondary text-sm px-5 py-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass-card-hover p-5 text-center">
                        <div className="text-3xl mb-2">🍽️</div>
                        <div className="text-2xl font-black gradient-text">{restaurants.length}</div>
                        <div className="text-gray-400 text-xs mt-1">Total Restaurants</div>
                    </div>
                    <div className="glass-card-hover p-5 text-center">
                        <div className="text-3xl mb-2">⭐</div>
                        <div className="text-2xl font-black gradient-text">
                            {restaurants.length > 0 ? (restaurants.reduce((acc, r) => acc + r.rating, 0) / restaurants.length).toFixed(1) : '0.0'}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">Avg Rating</div>
                    </div>
                </div>

                {/* Restaurants List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Manage Restaurants</h2>
                    {listLoading && restaurants.length === 0 ? (
                        <div className="flex justify-center p-12"><div className="spinner !w-8 !h-8" /></div>
                    ) : restaurants.length === 0 ? (
                        <div className="glass-card p-12 text-center text-gray-400">
                            No restaurants found. Start by adding one!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {restaurants.map((restaurant) => (
                                <div key={restaurant.id} className="glass-card p-6 flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{restaurant.name}</h3>
                                            <p className="text-gray-400 text-sm">{restaurant.cuisine}</p>
                                        </div>
                                        <div className="bg-primary-500/10 text-primary-400 px-2 py-1 rounded-md text-sm font-bold">
                                            ⭐ {restaurant.rating}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-auto">
                                        <button
                                            onClick={() => openModal(restaurant)}
                                            className="btn-secondary text-xs px-3 py-1.5 flex-1"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(restaurant.id)}
                                            className="btn-ghost text-xs px-3 py-1.5 flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm page-transition">
                    <div className="glass-card w-full max-w-md p-8 animate-slide-up border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingId ? 'Edit Restaurant' : 'Add New Restaurant'}
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="label">Restaurant Name</label>
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    className={`input-field ${errors.name ? 'input-error' : ''}`}
                                    placeholder="e.g. Jazzs Palace"
                                />
                            </div>
                            <div>
                                <label className="label">Cuisine Type</label>
                                <input
                                    {...register('cuisine', { required: 'Cuisine is required' })}
                                    className={`input-field ${errors.cuisine ? 'input-error' : ''}`}
                                    placeholder="e.g. Italian, Burmese"
                                />
                            </div>
                            <div>
                                <label className="label">Rating (0 - 5)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register('rating', {
                                        required: 'Rating is required',
                                        min: { value: 0, message: 'Min rating is 0' },
                                        max: { value: 5, message: 'Max rating is 5' }
                                    })}
                                    className={`input-field ${errors.rating ? 'input-error' : ''}`}
                                />
                                {errors.rating && <p className="error-text">{errors.rating.message}</p>}
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary flex-1"
                                >
                                    {editingId ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
