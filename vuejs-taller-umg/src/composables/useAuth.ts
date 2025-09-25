import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

interface User {
  id: number
  nombre: string
  email: string
  rol: 'admin' | 'usuario'
}

interface LoginResponse {
  user: User
  token: string
}

const user = ref<User | null>(null)
const token = ref<string | null>(localStorage.getItem('token'))

export const useAuth = () => {
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const initAuth = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (savedToken && savedUser) {
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch {
        logout()
      }
    }
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { data } = await api.post<LoginResponse>('/login', {
        email,
        password
      })

      token.value = data.token
      user.value = data.user

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message ||
        error?.response?.data?.errors?.email?.[0] ||
        'Error al iniciar sesión'
      )
    }
  }

  const logout = async (): Promise<void> => {
    try {
      if (token.value) {
        await api.post('/logout')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
  }

  const getUser = async (): Promise<User> => {
    try {
      const { data } = await api.get<User>('/user')
      user.value = data
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error: any) {
      if (error?.response?.status === 401) {
        logout()
      }
      throw error
    }
  }

  const requireAuth = (): boolean => {
    if (!isAuthenticated.value) {
      router.push('/login')
      return false
    }
    return true
  }

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    initAuth,
    login,
    logout,
    getUser,
    requireAuth
  }
}