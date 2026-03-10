import { useState, useCallback, useEffect } from 'react'
import api from '../utils/api'
import { toast } from 'react-hot-toast'

export function useRestaurants() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchRestaurants = useCallback(async () => {
        setLoading(true)
        try {
            const response = await api.get('/api/restaurants')
            setRestaurants(response.data)
            setError(null)
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to fetch restaurants'
            setError(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }, [])

    const addRestaurant = async (data) => {
        setLoading(true)
        try {
            const response = await api.post('/api/restaurants', data)
            setRestaurants((prev) => [...prev, response.data])
            toast.success('Restaurant added successfully! 🍽️')
            return response.data
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to add restaurant'
            toast.error(msg)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const updateRestaurant = async (id, data) => {
        setLoading(true)
        try {
            const response = await api.put(`/api/restaurants/${id}`, data)
            setRestaurants((prev) => prev.map((r) => (r.id === id ? response.data : r)))
            toast.success('Restaurant updated! ✨')
            return response.data
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to update restaurant'
            toast.error(msg)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const deleteRestaurant = async (id) => {
        setLoading(true)
        try {
            await api.delete(`/api/restaurants/${id}`)
            setRestaurants((prev) => prev.filter((r) => r.id !== id))
            toast.success('Restaurant deleted. 🗑️')
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to delete restaurant'
            toast.error(msg)
            throw err
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRestaurants()
    }, [fetchRestaurants])

    return {
        restaurants,
        loading,
        error,
        refresh: fetchRestaurants,
        addRestaurant,
        updateRestaurant,
        deleteRestaurant,
    }
}
